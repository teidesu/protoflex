const {
    joinDouble,
    joinFloat,
    zigZagDecode,
} = require('./math')
const {
    keyByMultiple,
    fromByteArray,
    toHex,
} = require('./utils')
const {
    VARINT_TYPES,
    PACKABLE_TYPES,
} = require('./constants')
const {
    readVarint,
    readFixed32,
    readFixed64,
    lazyReadVarint,
} = require('./readers')
const Deserializer = require('./deserializer')
const InputMessage = require('./input-message')
const LongBits = require('./longbits')
const Long = require('long')
const { outputToJson } = require('./json-api')

class OutputMessage {
    constructor (data, fields = []) {
        this.data = data
        this.fields = keyByMultiple(fields, 'key')
        this._cache = {}
        this._knownFields = {}
    }

    _assertHas (key, index = 0) {
        let has = this.has(key, index)
        if (!has) {
            this._throwHas(key, index)
        }
        return has
    }

    _checkType (key, index, type, sub = false) {
        this._assertHas(key, index)
        // check for sub type
        if (sub) {
            if (key in this._knownFields &&
                (this._knownFields[key].indexOf('any') > -1 || this._knownFields[key].indexOf(type) > -1)
            ) {
                return true
            } else {
                return key in this._knownFields ? this._knownFields[key].indexOf(type) > -1 : true
            }
        }
        return type === this._typeToWireType(this.type(key, index))

    }

    _assertType (key, index, type, sub = false) {
        if (!this._checkType(key, index, type, sub)) {
            throw Error(`Field ${key} is not of type ${type}`)
        }
        return true
    }

    _cached (func, key, index, getter) {
        let tag = `${func}(${key};${index})`
        if (!(tag in this._cache)) {
            this._cache[tag] = getter()
        }
        return this._cache[tag]
    }

    _throwHas (key, index) {
        throw Error(`Object does not have ${key}:${index} field`)
    }

    _typeToWireType (type) {
        if (VARINT_TYPES.indexOf(type) > -1) {
            return 'varint'
        }
        if (type === 'fixed32' || type === 'fixed64') return type
        return 'lengthDelimited'
    }

    known (...fields) {
        fields.forEach(it => {
            if (typeof it === 'number') {
                this._knownFields[it] = ['any']
            } else if (Array.isArray((it))) {
                this.known(...it)
            } else if (typeof it === 'object') {
                for (let key in it) {
                    if (it.hasOwnProperty(key)) {
                        let val = it[key]
                        if (!Array.isArray(val)) val = [val]
                        this._knownFields[key] = val
                    }
                }
            }
        })
        return this
    }

    has (key, index = 0, ignoreKnown = false) {
        let has = key in this.fields && index in this.fields[key]
        if (!ignoreKnown && key in this._knownFields) {
            return true
        }
        return has
    }

    length (key) {
        return this._assertHas(key) && this.fields[key].length
    }

    type (key, index = 0) {
        if (this.has(key, index, true)) {
            return this.fields[key][index].type
        } else if (key in this._knownFields) {
            return this._knownFields[key][0]
        } else {
            this._throwHas(key, index)
        }
    }

    array (key, type) {
        if (this.has(key, 0, true)) {
            let ret = []
            let i = 0
            for (let k = 0; k < this.length(key); k++) {
                ret[i++] = this.get(key, type, k)
            }
            return ret
        } else if (key in this._knownFields) {
            return []
        } else {
            this._throwHas(key, 0)
        }
    }

    iter (key, type) {
        if (this.has(key, 0, true)) {
            let index = 0
            const self = this
            const length = this.length(key)

            let ret = {
                next () {
                    if (index >= length) {
                        return { done: true, value: undefined }
                    }

                    let value = self.get(key, type, index)

                    index += 1

                    return {
                        value,
                        done: false,
                    }
                },
            }

            if (typeof Symbol !== 'undefined' && Symbol.iterator) {
                ret[Symbol.iterator] = () => ret
            }

            return ret
        } else if (key in this._knownFields) {
            return {
                next () {
                    return { value: undefined, done: true }
                },
            }
        } else {
            this._throwHas(key, 0)
        }
    }

    get (key, type, index = 0) {
        return this._assertHas(key, index) && this[type].call(this, key, index)
    }

    string (key, index = 0) {
        this._assertType(key, index, 'lengthDelimited')
        this._assertType(key, index, 'string', true)
        if (!this.has(key, index, true)) {
            return ''
        }
        let it = this.fields[key][index].value
        if (!('_string' in this.fields[key][index])) {
            this.fields[key][index]._string = fromByteArray(this.data, it.start, it.end)
        }
        return this.fields[key][index]._string
    }

    bytes (key, index = 0) {
        this._assertType(key, index, 'lengthDelimited')
        this._assertType(key, index, 'bytes', true)
        if (!this.has(key, index, true)) {
            return []
        }
        if (!('_buffer' in this.fields[key][index])) {
            let it = this.fields[key][index].value
            this.fields[key][index]._buffer = this.data.slice(it.start, it.end)
        }
        return this.fields[key][index]._buffer
    }

    hex (key, index = 0) {
        return toHex(this.bytes(key, index))
    }

    message (key, index = 0) {
        this._assertType(key, index, 'lengthDelimited')
        this._assertType(key, index, 'message', true)
        if (!this.has(key, index, true)) {
            return new OutputMessage()
        }
        if (!('_message' in this.fields[key][index])) {
            let it = this.fields[key][index].value
            let deserializer = new Deserializer(this.data)
            deserializer.offset = it.start
            deserializer.length = it.end
            this.fields[key][index]._message = new OutputMessage(this.data, deserializer.parse())
        }
        return this.fields[key][index]._message
    }

    fixed32 (key, index = 0) {
        this._assertType(key, index, 'fixed32')
        if (!this.has(key, index, true)) {
            return 0
        }
        return this.fields[key][index].value >>> 0
    }

    fixed64 (key, index = 0) {
        this._assertType(key, index, 'fixed64')
        if (!this.has(key, index, true)) {
            return Long(0, 0)
        }
        return this.fields[key][index].value.toLong(false)
    }

    float (key, index = 0) {
        this._assertType(key, index, 'float', true)
        return this._cached('float', key, index, () => joinFloat(this.fixed32(key, index)))
    }

    double (key, index = 0) {
        this._assertType(key, index, 'fixed64')
        this._assertType(key, index, 'float', true)
        return this._cached('double', key, index, () => joinDouble(
            this.fields[key][index].value.lo,
            this.fields[key][index].value.hi,
        ))
    }

    _varint (key, index = 0) {
        if (!this.has(key, index, true)) {
            return LongBits.zero
        }
        this._assertType(key, index, 'varint')
        if (!('_varint' in this.fields[key][index])) {
            let offset = this.fields[key][index].value
            this.fields[key][index]._varint = readVarint(offset, this.data)
        }
        return this.fields[key][index]._varint
    }

    int32 (key, index = 0) {
        this._assertType(key, index, 'int32', true)
        return this._varint(key, index).toNumber()
    }

    int64 (key, index = 0) {
        this._assertType(key, index, 'int64', true)
        return this._varint(key, index, true).toLong(false)
    }

    uint32 (key, index = 0) {
        this._assertType(key, index, 'uint32', true)
        return this._varint(key, index).toNumber(true)
    }

    uint64 (key, index = 0) {
        this._assertType(key, index, 'uint64', true)
        return this._varint(key, index).toLong(true)
    }

    bool (key, index = 0) {
        this._assertType(key, index, 'bool', true)
        return !!this._varint(key, index).toNumber()
    }

    sint32 (key, index = 0) {
        this._assertType(key, index, 'sint32', true)
        return this._cached('sint32', key, index, () => zigZagDecode(this.int32(key, index)))
    }

    sint64 (key, index = 0) {
        this._assertType(key, index, 'sint64', true)
        return this._cached('sint64', key, index, () => this._varint(key, index).clone().zzDecode().toLong())
    }

    sfixed32 (key, index = 0) {
        this._assertType(key, index, 'sfixed32', true)
        if (!this.has(key, index, true)) {
            return 0
        }
        return this.fields[key][index].value
    }

    sfixed64 (key, index = 0) {
        this._assertType(key, index, 'fixed64')
        if (!this.has(key, index, true)) {
            return Long(0, 0)
        }
        this._assertType(key, index, 'sfixed64', true)
        return this.fixed64(key, index)
    }

    _processPacked (type, item, output) {
        let state = {
            offset: item.value.start,
            data: this.data,
            length: item.value.end,
        }
        if (VARINT_TYPES.indexOf(type) > -1) {
            while (state.offset < state.length) {
                let value = lazyReadVarint.apply(state)
                output.push({
                    value,
                    type: 'varint',
                })
            }
        } else if (
            type === 'fixed32' ||
            type === 'float' ||
            type === 'sfixed32' ||
            type === 'fixed64' ||
            type === 'double' ||
            type === 'sfixed64'
        ) {
            while (state.offset < state.length) {
                let val = (type === 'fixed32' || type === 'float' || type === 'sfixed32'
                    ? readFixed32
                    : readFixed64).apply(state)
                output.push({
                    value: val,
                    type: type === 'fixed32' || type === 'float' || type === 'sfixed32' ? 'fixed32' : 'fixed64',
                })
            }
        }
    }

    repeated (key, type, lengthDelimitedIndex = -1) {
        this._assertHas(key)
        if (!this.has(key, 0, true)) {
            return []
        }
        if (PACKABLE_TYPES.indexOf(type) === -1) return // forwards-compatibility
        let newFields = []
        if (lengthDelimitedIndex !== -1) {
            let item = this.fields[key][lengthDelimitedIndex]
            if (item.type === 'lengthDelimited') {
                this._processPacked(type, item, newFields)
            }
        } else {
            for (let i = 0; i < this.fields[key].length; i++) {
                let item = this.fields[key][i]
                if (item.type === 'lengthDelimited') {
                    this._processPacked(type, item, newFields)
                } else {
                    // data is not packed
                    newFields.push(item)
                }
            }
        }
        this.fields[key] = newFields
        return this
    }

    toJSON () {
        return outputToJson(this)
    }

    toInput () {
        const msg = new InputMessage()
        const fields = {}

        for (let key in this.fields) {
            const values = this.fields[key]
            fields[key] = []

            for (let i = 0; i < values.length; i++) {
                const val = values[i]

                if (val.type === 'varint') {
                    fields[key].push({
                        type: 'varint',
                        value: val._varint ? val._varint : readVarint(val.value, this.data),
                    })
                } else if (val.type === 'lengthDelimited') {
                    const obj = {
                        type: 'lengthDelimited',
                        value: val._buffer ? val._buffer : this.data.slice(val.value.start, val.value.end),
                    }
                    obj.tryToInput = () => new OutputMessage(obj.value, new Deserializer(obj.value).parse()).toInput()
                    fields[key].push(obj)
                } else {
                    fields[key].push(val)
                }
            }
        }
        msg.fields = fields

        return msg
    }
}


if (typeof Symbol !== 'undefined') {
    OutputMessage.prototype[Symbol.for('nodejs.util.inspect.custom')] = OutputMessage.prototype.toJSON
}


module.exports = OutputMessage
