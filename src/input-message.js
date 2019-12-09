const Long = require('long')
const {
    MIN_INT32,
    MIN_INT64,
    MIN_UINT32,
    MIN_UINT64,
    MAX_INT32,
    MAX_INT64,
    MAX_UINT32,
    MAX_UINT64,
} = require('./constants')
const Serializer = require('./serializer')
const ja = require('./json-api')
const { toHex } = require('./utils')

/**
 * @class protoflex.InputMessage
 */
class InputMessage {
    constructor () {
        this.fields = {}
        this._parent = null
        this._unpacked = {}
    }

    has (key, index = 0) {
        return key in this.fields && index in this.fields[key]
    }

    get (key, type = null, index = 0) {
        if (!this.has(key)) {
            throw Error(`Message does not have ${key}:${index}`)
        }
        if (typeof type === 'number' && index === 0) {
            index = type
            type = null
        }
        let it = this.fields[key][index]
        if (type !== null && type !== it.type) {
            throw Error(`${key}:${index} is not ${type}`)
        } else {
            return it.value
        }
    }

    array (key, type = null) {
        if (!this.has(key)) {
            throw Error(`Message does not have ${key}`)
        }

        let ret = []
        for (let i = 0; i < this.fields[key].length; i++) {
            let it = this.fields[key][i]
            if (it === undefined) {
                ret[i] = undefined
            } else if (type !== null && it.type !== type) {
                throw Error(`${key}:${i} is not ${type}`)
            } else {
                ret[i] = it.value
            }
        }
        return ret
    }

    iter (key, editable = false, type = null) {
        if (!this.has(key)) {
            throw Error(`Message does not have ${key}`)
        }

        let index = 0
        let self = this
        let length = self.fields[key].length

        let ret = {
            next() {
                if (index >= length) {
                    return { done: true, value: undefined }
                }

                if (self.fields[key].length !== length) {
                    throw Error('Data size changed during iteration')
                }
                let typ = self.fields[key][index].type

                if (type !== null && typ !== type) {
                    throw Error(`${key}:${index} is not ${type}`)
                }

                let value
                if (editable) {
                    let ind = index

                    value = {
                        get() {
                            return self.fields[key][ind].value
                        },
                        set(v) {
                            self[typ](key, v, ind)
                        }
                    }
                } else {
                    value = self.fields[key][index].value
                }

                index += 1

                return {
                    value,
                    done: false
                }
            }
        }

        if (typeof Symbol !== 'undefined' && Symbol.iterator) {
            ret[Symbol.iterator] = () => ret
        }

        return ret
    }

    clear (key = null, index = null) {
        if (key === null) {
            this.fields = {}
        } else if (key in this.fields) {
            if (index !== null) {
                if (index < 0) {
                    index = this.fields[key].length + index
                }

                if (index < 0 || index >= this.fields[key].length) {
                    throw RangeError('Out of array bounds')
                }

                this.fields[key].splice(index, 1)
            } else {
                this.fields[key] = []
            }
        }
        return this
    }

    append (key, value, type = null) {
        if (!this.has(key)) {
            if (type === null) {
                throw Error('First item in array must have type set explicitly')
            }
            this._addField(key, 0, value, type)
        } else {
            let items = this.fields[key]
            let last = items[items.length - 1]
            if (type !== null && type !== last.type) {
                throw Error(`Previous item(s) in array have type ${last.type}, not ${type}`)
            }
            if (type === null) type = last.type
            this._addField(key, items.length, value, type)
        }
        return this
    }

    string (key, value, index = 0) {
        this._addField(key, index, value + '', 'string')
        return this
    }

    bytes (key, value, index = 0) {
        if (Array.isArray(value) || (typeof Buffer !== 'undefined' && value instanceof Buffer)) {
            this._addField(key, index, Array.from(value), 'bytes')
            return this
        }
        throw Error(`${value ? value.constructor.name : value} cannot be cast to bytes.`)
    }

    bool (key, value, index = 0) {
        this._addField(key, index, !!value, 'bool')
        return this
    }

    float (key, value, index = 0) {
        this._addField(key, index, value, 'float')
        return this
    }

    double (key, value, index = 0) {
        this._addField(key, index, value, 'double')
        return this
    }

    fixed32 (key, value, index = 0) {
        this._addField(key, index, value, 'fixed32')
        return this
    }

    sfixed32 (key, value, index = 0) {
        this._addField(key, index, value, 'sfixed32')
        return this
    }

    fixed64 (key, value, index = 0) {
        if (!(value instanceof Long)) {
            value = Long.fromValue(value)
        }
        this._addField(key, index, value, 'fixed64')
        return this
    }

    sfixed64 (key, value, index = 0) {
        if (!(value instanceof Long)) {
            value = Long.fromValue(value)
        }
        this._addField(key, index, value, 'sfixed64')
        return this
    }

    message (key, index = 0) {
        let msg = new InputMessage()
        msg._parent = this
        this._addField(key, index, msg, 'message')
        return msg
    }

    parent () {
        return this._parent
    }

    end () {
        if (this._parent === null) {
            throw Error('Root doesn\'t have parent')
        }
        return this._parent
    }

    unpacked (...fields) {
        for (let i = 0; i < fields.length; i++) {
            if (Array.isArray(fields[i])) {
                this.unpacked(...fields[i])
            } else {
                this._unpacked[fields[i]] = 1
            }
        }
        return this
    }

    _addField (key, index, value, type) {
        if (!(key in this.fields)) {
            this.fields[key] = []
        }
        if (Array.isArray(value) && type !== 'bytes') {
            if (index !== 0) {
                throw Error('index != 0 when inserting multiple values')
            }
            this.fields[key] = value.map(it => ({
                type,
                value: it,
            }))
        } else {
            this.fields[key][index] = {
                value,
                type,
            }
        }
    }

    toWire () {
        return new Serializer(this).run()
    }

    serialize () {
        return this.toWire()
    }

    toHex () {
        return toHex(this.toWire())
    }

    toBuffer () {
        if (typeof Buffer === 'undefined') {
            throw Error('Buffer is not supported in current environment')
        }
        return Buffer.from(this.toWire())
    }

    toUint8Array () {
        if (typeof Uint8Array === 'undefined') {
            throw Error('Uint8Array is not supported in current environment')
        }
        return new Uint8Array(this.toWire())
    }

    toArrayBuffer () {
        return this.toUint8Array().buffer
    }

    toJSON () {
        return ja.inputToJson(this, InputMessage)
    }
}

// varints
InputMessage._varints = [
    { name: 'int32', from: MIN_INT32, to: MAX_INT32 },
    { name: 'int64', from: MIN_INT64, to: MAX_INT64, long: true },
    { name: 'uint32', from: MIN_UINT32, to: MAX_UINT32 },
    { name: 'uint64', from: MIN_UINT64, to: MAX_UINT64, long: true, unsigned: true },
    { name: 'sint32', from: MIN_INT32, to: MAX_INT32 },
    { name: 'sint64', from: MIN_INT64, to: MAX_INT64, long: true },
]

InputMessage._varints.forEach((item) => {
    InputMessage.prototype[item.name] = function _addVarintField (key, value, index = 0) {
        if (typeof value === 'bigint') {
            value = value.toString(10)
        }
        if (typeof value === 'string') {
            value = item.long ? Long.fromString(value, item.unsigned) : parseInt(value, 10)
        }
        if (item.long) {
            if (!(value instanceof Long)) {
                value = Long.fromNumber(value, item.unsigned)
            }
        } else if (value < item.from || value > item.to) {
            throw RangeError(`${value} is outside ${item.name} range.`)
        }
        this._addField(key, index, value, item.name)
        return this
    }
})

if (typeof Symbol !== 'undefined') {
    InputMessage.prototype[Symbol.for('nodejs.util.inspect.custom')] = InputMessage.prototype.toJSON
}

module.exports = InputMessage
