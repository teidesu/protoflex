const { TWO_TO_52, TWO_TO_32, TWO_TO_23, TWO_TO_20, MIN_FLOAT, MAX_FLOAT, MIN_DOUBLE, MAX_DOUBLE } = require('./constants')

function zigZagDecode (val, isBigint = false) {
    if (!isBigint) {
        return val & 0x1 ? (val >> 1) ^ (~0) : val >> 1
    }
    return val.and(0x1) ? val.shiftRight(1).xor(~0) : val.shiftRight(1)
}

function joinDouble (lo, hi) {
    let sign = (hi >> 31) * 2 + 1
    let exp = (hi >> 20) & 0x7ff
    let mant = TWO_TO_32 * (hi & 0xfffff) + lo

    if (exp === 0x7ff) {
        if (mant) {
            return NaN
        } else {
            return sign * Infinity
        }
    }

    if (exp === 0) {
        return sign * Math.pow(2, -1074) * mant
    } else {
        return sign * Math.pow(2, exp - 1075) * (mant + TWO_TO_52)
    }
}

function joinFloat (lo) {
    let sign = (lo >> 31) * 2 + 1
    let exp = (lo >> 23) & 0x7ff
    let mant = lo & 0x7fffff

    if (exp === 0xff) {
        if (mant) {
            return NaN
        } else {
            return sign * Infinity
        }
    }

    if (exp === 0) {
        return sign * Math.pow(2, -149) * mant
    } else {
        return sign * Math.pow(2, exp - 150) * (mant + TWO_TO_23)
    }
}

function splitFloat (value) {
    let sign = value < 0 ? 1 : 0
    if (sign) {
        value = -value
    }
    let exp
    let mant

    if (value === 0) {
        return 1 / value < 0 ? 0x80000000 : 0
    }

    if (isNaN(value)) {
        return 0x7FFFFFFF
    }

    if (value > MAX_FLOAT) {
        return ((sign << 31) | (0x7F800000)) >>> 0
    }

    if (value < MIN_FLOAT) {
        mant = Math.round(value / Math.pow(2, -149))
        return ((sign << 31) | mant) >>> 0
    }

    exp = Math.floor(Math.log(value) / Math.LN2)
    mant = value * Math.pow(2, -exp)
    mant = Math.round(mant * TWO_TO_23) & 0x7FFFFF

    return ((sign << 31) | ((exp + 127) << 23) | mant) >>> 0
}

function splitDouble (value) {
    let sign = value < 0 ? 1 : 0
    if (sign) {
        value = -value
    }
    let exp
    let mant
    let mantHigh
    let mantLow

    if (value === 0) {
        return { hi: 1 / value < 0 ? 0x80000000 : 0, lo: 0 }
    }

    if (isNaN(value)) {
        return { hi: 0x7FFFFFFF, lo: 0xFFFFFFFF }
    }

    if (value > MAX_DOUBLE) {
        return { hi: ((sign << 31) | (0x7FF00000)) >>> 0, lo: 0 }
    }

    if (value < MIN_DOUBLE) {
        mant = value / Math.pow(2, -149)
        mantHigh = value / TWO_TO_32
        return {
            hi: ((sign << 31) | mantHigh) >>> 0,
            lo: mant >>> 0,
        }
    }

    let maxDoubleExponent = 1023
    let minDoubleExponent = -1022
    let x = value
    exp = 0
    if (x >= 2) {
        while (x >= 2 && exp < maxDoubleExponent) {
            exp++
            x = x / 2
        }
    } else {
        while (x < 1 && exp > minDoubleExponent) {
            x = x * 2
            exp--
        }
    }
    mant = value * Math.pow(2, -exp)

    mantHigh = (mant * TWO_TO_20) & 0xFFFFF
    mantLow = (mant * TWO_TO_52) >>> 0

    return {
        hi: ((sign << 31) | ((exp + 1023) << 20) | mantHigh) >>> 0,
        lo: mantLow
    }
}

module.exports = {
    splitDouble,
    splitFloat,
    joinDouble,
    joinFloat,
    zigZagDecode,
}
