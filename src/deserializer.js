const {
    WIRE_TYPES_NAMES,
} = require('./constants')
const {
    readFixed32,
    readFixed64,
    readLengthDelimited,
    lazyReadVarint,
    fullyReadVarint
} = require('./readers')

class Deserializer {
    constructor (data) {
        if (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer) {
            data = new Uint8Array(data)
        }
        if (!(Array.isArray(data)
            || (typeof Buffer !== 'undefined' && data instanceof Buffer)
            || (typeof Uint8Array !== 'undefined' && data instanceof Uint8Array)
        )) {
            throw Error('Input for deserializer must be an array/buffer')
        }
        this.data = data
        this.offset = 0
        this.length = data.length
    }

    parse () {
        let ret = []
        while (this.offset < this.length) {
            const field = this._parseField()
            ret.push(field)
        }
        if (this.offset > this.length) {
            throw Error('Buffer exhausted')
        }
        return ret
    }

    _parseField () {
        let header = this._parseHeader()
        let type = header.type
        let key = header.key
        let start = this.offset
        let func = {
            0: lazyReadVarint,
            1: readFixed64,
            2: readLengthDelimited,
            5: readFixed32,
        }[type]
        if (!func) {
            throw Error('Unknown wire type: ' + type)
        }
        let value = func.call(this)
        return {
            key,
            value,
            type: WIRE_TYPES_NAMES[type],
        }
    }

    _parseHeader () {
        let value = fullyReadVarint.call(this).toNumber(true)

        return {
            type: value & 0x07,
            key: value >> 3
        }
    }
}

module.exports = Deserializer
