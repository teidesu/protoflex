const {
    writeNumberVarint,
    writeLongVarint,
    writeFixed64,
    writeFixed32,
    writeLengthDelimited,
} = require('./writers')
const { toByteArray } = require('./utils')
const { splitFloat, splitDouble } = require('./math')
const { WIRE_TYPES, VARINT_TYPES } = require('./constants')
const Long = require('long')
const LongBits = require('./longbits')
const writers = {
    varint: writeLongVarint,
    fixed32: writeFixed32,
    fixed64: writeFixed64,
    lengthDelimited: writeLengthDelimited,
}

class Serializer {
    constructor (msg, keepDefault = false) {
        this.msg = msg
        this.data = []
        this.pos = 0
        this.keepDefault = keepDefault
    }

    _getPrimitiveType (type) {
        if (VARINT_TYPES.indexOf(type) > -1) {
            return 'varint'
        }
        if (type === 'fixed32' || type === 'fixed64') {
            return type
        }
        if (type === 'float' || type === 'sfixed32') {
            return 'fixed32'
        }
        if (type === 'double' || type === 'sfixed64') {
            return 'fixed64'
        }
        if (type === 'string' || type === 'bytes' || type === 'message' || type === 'lengthDelimited') {
            return 'lengthDelimited'
        }
        throw Error(`Can't find primitive for ${type}`)
    }

    _coerceTo (field, type) {
        let value = field.value
        if (type === 'lengthDelimited') {
            switch (field.type) {
            case 'message':
                return new Serializer(value).run()
            case 'string':
                return toByteArray(value)
            case 'bytes':
            case 'lengthDelimited':
                return field.value
            default:
                throw Error(`${field.type} cannot be coerced to ${type}`)
            }
        }
        if (field.type === 'sint32' || field.type === 'sint64') {
            return LongBits.from(value).zzEncode()
        }
        if (field.type === 'float') {
            return splitFloat(value)
        }
        if (field.type === 'double') {
            return splitDouble(value)
        }
        if (field.type === 'bool' && type === 'varint') {
            return !!field.value
        }
        return field.value
    }

    _coerce (field) {
        let type = this._getPrimitiveType(field.type)
        return {
            type,
            value: this._coerceTo(field, type),
        }
    }

    _preProcess () {
        let ret = []
        let packed = {}  // temp storage for further packing repeateds
        let j = 0

        for (let i in this.msg.fields) {
            if (this.msg.fields.hasOwnProperty(i)) {
                let vals = this.msg.fields[i]
                for (let k = 0; k < vals.length; k++) {
                    let field = vals[k]
                    if (field === undefined) continue // sparse
                    field = this._coerce(field)
                    let { type, value } = field

                    if (type === 'lengthDelimited' && value.length === 0 && !this.keepDefault) {
                        // l-delim has 0 length, thus skipping.
                        continue
                    }

                    if ((type === 'varint' || type === 'fixed32' || type === 'fixed64') && !this.msg._unpacked[i]) {
                        // packing this boi
                        if (!(i in packed)) {
                            packed[i] = []
                        }
                        packed[i].push(field)
                    } else {
                        ret[j++] = {
                            type,
                            value,
                            key: i,
                        }
                    }
                }
            }
        }

        // second pass for packed
        for (let i in packed) {
            if (packed.hasOwnProperty(i)) {
                if (packed[i].length > 1) {
                    let obj = {
                        data: [],
                        pos: 0,
                    }
                    for (let k = 0; k < packed[i].length; k++) {
                        let { type, value } = packed[i][k]
                        if (type === 'varint' && typeof value === 'number') {
                            writeNumberVarint.call(obj, value)
                        } else {
                            let writer = writers[type]
                            writer.call(obj, value)
                        }
                    }
                    ret[j++] = {
                        key: i,
                        type: 'lengthDelimited',
                        value: obj.data,
                    }
                } else {
                    let { type, value } = packed[i][0]
                    ret[j++] = {
                        type,
                        value,
                        key: i,
                    }
                }
            }
        }

        return ret
    }

    run () {
        let preprocessed = this._preProcess()

        for (let i = 0; i < preprocessed.length; i++) {
            let { key, type, value } = preprocessed[i]

            if (!this.keepDefault && (!value || value.length === 0 || (value.lo === 0 && value.hi === 0))) {
                continue
            }

            // header
            writeNumberVarint.call(this, key * 8 + WIRE_TYPES[type])

            if (type === 'varint' && typeof value === 'number') {
                writeNumberVarint.call(this, value)
            } else {
                let writer = writers[type]
                writer.call(this, value)
            }
        }

        return this.data
    }
}

module.exports = Serializer
