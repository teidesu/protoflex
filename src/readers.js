const LongBits = require('./longbits')

function lazyReadVarint () {
    let offset = this.offset
    while (this.data[this.offset++] & 0x80) {}
    return offset
}

function readVarint (offset, data, length = data.length) {
    let ret = new LongBits(0, 0)
    let i = 0
    if (length - offset > 4) {
        for (; i < 4; ++i) {
            ret.lo = (ret.lo | (data[offset] & 0x7f) << i * 7) >>> 0
            if (data[offset++] < 0x80) {
                return ret
            }
        }
        ret.lo = (ret.lo | (data[offset] & 0x7f) << 28) >>> 0
        ret.hi = (ret.hi | (data[offset] & 0x7f) >> 4) >>> 0
        if (data[offset++] < 0x80) {
            return ret
        }
        i = 0
    } else {
        for (; i < 3; ++i) {
            if (offset >= length) {
                throw RangeError('Unexpected end while reading varint')
            }
            ret.lo = (ret.lo | (data[offset] & 0x7f) << i * 7) >>> 0
            if (data[offset++] < 0x80) {
                return ret
            }
        }
        ret.lo = (ret.lo | (data[offset] & 0x7f) << i * 7) >>> 0
        return ret
    }
    if (length - offset > 4) {
        for (; i < 5; ++i) {
            ret.hi = (ret.hi | (data[offset] & 0x7f) << i * 7 + 3) >>> 0
            if (data[offset++] < 0x80) {
                return ret
            }
        }
    } else {
        for (; i < 5; ++i) {
            if (offset >= length) {
                throw RangeError('Unexpected end while reading varint')
            }
            ret.hi = (ret.hi | (data[offset] & 0x7f) << i * 7 + 3) >>> 0
            if (data[offset++] < 0x80) {
                return ret
            }
        }
    }
    throw Error('Invalid varint encoding')
}

function fullyReadVarint () {
    let offset = lazyReadVarint.call(this)
    return readVarint(offset, this.data, this.length)
}

function readFixed32 () {
    return this.data[this.offset++] |
        this.data[this.offset++] << 8 |
        this.data[this.offset++] << 16 |
        this.data[this.offset++] << 24

}

function readFixed64 () {
    let lo = readFixed32.call(this)
    let hi = readFixed32.call(this)
    return new LongBits(lo, hi)
}

function readLengthDelimited () {
    let len = fullyReadVarint.call(this).toNumber(true)
    let start = this.offset
    return {
        start,
        end: this.offset += len,
        length: len,
    }
}

module.exports = {
    readVarint,
    readFixed32,
    readFixed64,
    readLengthDelimited,
    lazyReadVarint,
    fullyReadVarint,
}
