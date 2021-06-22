const Long = require('long')
const { PROTOBUF_TYPES, DEFAULT_VALUES } = require('./constants')
const { toByteArray, fromByteArray } = require('./utils')
const LongBits = require('./longbits')

function inferTypeByValue (value) {
    if (value === null || value === undefined || (typeof value === 'number' && isNaN(value))) {
        return null
    }
    if (typeof Buffer !== 'undefined' && value instanceof Buffer || typeof Uint8Array !== 'undefined' && value
        instanceof Uint8Array) {
        return 'bytes'
    }
    if (Array.isArray(value)) {
        return 'repeated'
    }
    if (typeof value === 'string') {
        return 'string'
    }
    if (typeof value === 'number') {
        return value % 1 === 0 ? 'int32' : 'float'
    }
    if (typeof value === 'bigint') {
        return 'int64'
    }
    if (typeof value === 'boolean') {
        return 'bool'
    }
    if (value.constructor.name === 'Object') {
        for (let key in value) {
            if (value.hasOwnProperty(key) && key !== 'unpacked') {
                if (key === 'value') {
                    return inferTypeByValue(value.value)
                }
                if (PROTOBUF_TYPES.indexOf(key) > -1) {
                    return key
                }
                return 'message'
            }
        }
        return 'message'
    }
    if (value instanceof Long) {
        return value.unsigned ? 'uint64' : 'int64'
    }
    return null
}

function _coerceInputTo (value, type) {
    if (type === 'message') {
        return jsonToInput(value)
    }
    if (type === 'repeated') {
        let ret = []
        for (let p = 0; p < value.length; p++) {
            let val = value[p]
            let type = inferTypeByValue(val)
            if (val && val.constructor.name === 'Object' && type !== 'message') {
                val = val[type]
            }
            ret[p] = {
                type,
                value: _coerceInputTo(val, type),
            }
        }
        return ret
    }
    if (typeof Buffer !== 'undefined' && value instanceof Buffer || typeof Uint8Array !== 'undefined' && value
        instanceof Uint8Array) {
        return Array.from(value)
    }
    if ((type === 'int64' || type === 'uint64' || type === 'sint64' || type === 'fixed64') && !(value
        instanceof Long)) {
        return typeof value === 'number' ? Long.fromNumber(value, type === 'uint64') :
               typeof value === 'bigint' ?
               Long.fromString(value.toString(), type === 'uint64') :
               Long.fromString(value, type === 'uint64')
    }
    if (type === 'int32' || type === 'uint32' || type === 'sint32' || type === 'fixed32') {
        return parseInt(value)
    }
    if (type === 'bytes') {
        if (!Array.isArray(value)) {
            return toByteArray(value)
        }
        return value
    }
    if (type === 'string') {
        if (Array.isArray(value)) {
            return fromByteArray(value)
        }
        return value
    }
    if (value && value.constructor.name === 'Object' && type !== 'message') {
        return value[type]
    }
    return value
}

function jsonToInput (json) {
    if (typeof json === 'string') {
        json = JSON.parse(json)
    }

    let ret = {}
    let unpacked = []

    for (let j in json) {
        if (json.hasOwnProperty(j)) {
            if (!isNaN(parseInt(j))) {
                if (!ret[j]) {
                    ret[j] = []
                }
                let type = inferTypeByValue(json[j])
                if (type === null) continue
                let value = json[j]
                if (value && value.constructor.name === 'Object' && type !== 'message') {
                    if (value.unpacked) {
                        unpacked[unpacked.length] = j
                    }
                    value = 'value' in value ? value.value : value[type]
                }

                value = _coerceInputTo(value, type)

                if (type === 'repeated') {
                    for (let i = 0; i < value.length; i++) {
                        ret[j][ret[j].length] = value[i]
                    }
                } else {
                    ret[j][ret[j].length] = {
                        type,
                        value,
                    }
                }
            }
        }
    }

    return {
        fields: ret,
        unpacked,
    }
}

function inputToJson (msg, constructor) {
    let ret = {}
    let fields = msg.fields

    for (let key in fields) {
        if (fields.hasOwnProperty(key)) {
            if (!ret[key]) {
                ret[key] = []
            }

            for (let index = 0; index < fields[key].length; index++) {
                let field = fields[key][index]
                if (field === undefined) continue // sparse

                let value = field.value

                if (value instanceof Long) {
                    value = value.toString()
                }

                if (value instanceof constructor) {
                    value = inputToJson(value, constructor)
                }

                let itype = inferTypeByValue(value)

                if (itype !== field.type) {
                    value = {
                        [field.type]: value
                    }
                }

                ret[key][ret[key].length] = value
            }
        }
    }

    for (let key in ret) {
        if (ret.hasOwnProperty(key)) {
            if (ret[key].length === 1) {
                ret[key] = ret[key][0]
            } else if (msg._unpacked[key]) {
                ret[key] = {
                    unpacked: true,
                    value: ret[key],
                }
            }
        }
    }

    return ret
}

function outputToJson (msg) {
    let ret = {}
    let fields = msg.fields

    for (let key in fields) {
        if (fields.hasOwnProperty(key)) {
            if (!ret[key]) {
                ret[key] = []
            }
            for (let i = 0; i < fields[key].length; i++) {
                let f = fields[key][i]
                let v = f.value
                if (f.type === 'lengthDelimited') {
                    v = msg.data.slice(v.start, v.end)
                    try {
                        v = outputToJson(msg.message(key, i))
                    } catch (e) {
                        v = fromByteArray(v)
                    }
                }
                if (f.type === 'varint') {
                    v = msg._varint(key, i)
                }
                if (v instanceof LongBits) {
                    v = v.toLong().toString()
                }

                ret[key][ret[key].length] = v
            }
        }
    }

    for (let key in msg._knownFields) {
        if (msg._knownFields.hasOwnProperty(key) && msg._knownFields[key].length) {
            let typ = msg._knownFields[key][0]
            if (!(key in ret)) {
                let val = DEFAULT_VALUES[typ]
                if (typeof val === 'number') val += ''
                if (val instanceof LongBits) val = val.toLong()
                if (val instanceof Long) val = val.toString()
                ret[key] = [val]
            }
        }
    }

    for (let key in ret) {
        if (ret.hasOwnProperty(key) && ret[key].length === 1) {
            ret[key] = ret[key][0]
        }
    }
    return ret
}

module.exports = {
    jsonToInput,
    outputToJson,
    inputToJson,
}
