const { TWO_TO_32 } = require('./constants')
const Long = require('long')

class LongBits {
    constructor (lo, hi) {
        this.lo = lo >>> 0
        this.hi = hi >>> 0
    }

    toNumber (unsigned = false) {
        if (!unsigned && this.hi >>> 31) {
            let lo = ~this.lo + 1 >>> 0
            let hi = ~this.hi >>> 0
            if (!lo) {
                hi = hi + 1 >>> 0
            }
            return -(lo + hi * TWO_TO_32)
        }
        return this.lo + this.hi * TWO_TO_32
    }

    toLong (unsigned) {
        return new Long(this.lo, this.hi, unsigned)
    }

    zzEncode () {
        let mask = this.hi >>> 31
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0
        this.lo = (this.lo << 1 ^ mask) >>> 0
        return this
    }

    zzDecode () {
        let mask = -(this.lo & 1)
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0
        this.hi = (this.hi >>> 1 ^ mask) >>> 0
        return this
    }

    clone () {
        return new LongBits(this.lo, this.hi)
    }

    static fromNumber (value) {
        if (value === 0) {
            return zero
        }
        let sign = value < 0
        if (sign) {
            value = -value
        }
        let lo = value >>> 0
        let hi = (value - lo) / TWO_TO_32 >>> 0
        if (sign) {
            hi = ~hi >>> 0
            lo = ~lo >>> 0
            if (++lo > TWO_TO_32) {
                lo = 0
                if (++hi > TWO_TO_32) {
                    hi = 0
                }
            }
        }
        return new LongBits(lo, hi)
    }

    static from (value) {
        if (typeof value === 'number') {
            return LongBits.fromNumber(value)
        }
        if (typeof value === 'string') {
            value = Long.fromString(value)
        }
        if (value.low || value.high) {
            return new LongBits(value.low >>> 0, value.high >>> 0)
        } else if (value.lo || value.hi) {
            return new LongBits(value.lo >>> 0, value.hi >>> 0)
        } else {
            return zero
        }
    }
}

const zero = new LongBits(0, 0)
zero.toNumber = () => 0
zero.zzEncode = zero.zzDecode = function() {
    return this
}
zero.length = () => 1

LongBits.zero = zero

module.exports = LongBits
