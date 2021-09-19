const Long = require('long')
const LongBits = require('./longbits')

function writeNumberVarint (val) {
    if (val === 0) {
        this.data[this.pos] = val
    }
    if (val < 0) {
        // filling 9 bytes
        for (let i = 0; i < 9; i++) {
            this.data[this.pos++] = (val & 0x7f) | 0x80
            val >>= 7
        }
        // and 10th byte: sign
        this.data[this.pos++] = 0x1
    } else {
        while (val > 127) {
            this.data[this.pos++] = (val & 0x7f) | 0x80
            val >>>= 7
        }
        this.data[this.pos++] = val
    }
}

function writeLongVarint (val) {
    if (val instanceof Long) {
        val = LongBits.from(val)
    }
    while (val.hi) {
        this.data[this.pos++] = val.lo & 127 | 128
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0
        val.hi >>>= 7
    }
    while (val.lo > 0x7f) {
        this.data[this.pos++] = val.lo & 127 | 128
        val.lo = val.lo >>> 7
    }
    this.data[this.pos++] = val.lo
}

function writeFixed32 (val) {
    this.data[this.pos++] = val & 0xff
    this.data[this.pos++] = val >>> 8 & 0xff
    this.data[this.pos++] = val >>> 16 & 0xff
    this.data[this.pos++] = val >>> 24 & 0xff
}

function writeFixed64 (val) {
    let bits = LongBits.from(val)
    writeFixed32.call(this, bits.lo)
    writeFixed32.call(this, bits.hi)
}

function writeLengthDelimited (val) {
    writeNumberVarint.call(this, val.length)
    for (let i = 0; i < val.length; i++) {
        this.data[this.pos++] = val[i]
    }
}

module.exports = {
    writeLongVarint,
    writeNumberVarint,
    writeFixed32,
    writeFixed64,
    writeLengthDelimited,
}
