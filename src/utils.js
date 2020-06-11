const { readVarint } = require('./readers')
const { writeNumberVarint, writeLongVarint } = require('./writers')

function keyByMultiple (arr, key) {
    let ret = {}
    arr.forEach((v) => {
        if (v[key] in ret) {
            ret[v[key]].push(v)
        } else {
            ret[v[key]] = [v]
        }
    })
    return ret
}


function toHex (ar) {
    if (typeof ar === 'string') {
        ar = toByteArray(ar)
    }
    let ret = ''
    for (let i = 0; i < ar.length; i++) {
        if (ar[i] > 255 || ar[i] < 0) throw RangeError(`${ar[i]} is not in range [0, 255]`)
        let t = ar[i].toString(16)
        ret += t.length > 1 ? t : '0' + t
    }
    return ret
}

function fromHex (str) {
    if (str.length % 2 !== 0) throw Error('Invalid hex')
    let ret = []
    for (let i = 0, j = 0; j < str.length; i++, j += 2) {
        let v = parseInt(str[j] + str[j + 1], 16)
        if (isNaN(v)) {
            throw Error('Invalid hex')
        }
        ret[i] = v
    }
    return ret
}

function toByteArray (str) {
    let ret = []
    let j = 0
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i)
        if (c < 0x80) {
            ret[j++] = c
        } else if (c < 0x800) {
            ret[j++] = 0xc0 | (c >> 6)
            ret[j++] = 0x80 | (c & 0x3f)
        } else if (c < 0xd800 || c >= 0xe000) {
            ret[j++] = 0xe0 | (c >> 12)
            ret[j++] = 0x80 | ((c >> 6) & 0x3f)
            ret[j++] = 0x80 | (c & 0x3f)
        } else {
            // pair
            i++
            c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff))

            ret[j++] = 0xf0 | (c >> 18)
            ret[j++] = 0x80 | ((c >> 12) & 0x3f)
            ret[j++] = 0x80 | ((c >> 6) & 0x3f)
            ret[j++] = 0x80 | (c & 0x3f)
        }
    }
    return ret
}

function fromByteArray (bytes, start = 0, end = bytes.length) {
    if (!bytes) return ''
    let out = []
    let j = 0

    for (let i = start; i < end; i++) {
        let c1 = bytes[i]
        if (c1 > 0xff) throw Error('Invalid byte array')

        if (c1 < 0x80) {
            out[j++] = String.fromCharCode(c1)
        } else if (c1 > 0xbf && c1 < 0xe0) {
            let c2 = bytes[++i]
            out[j++] = String.fromCharCode(
                (c1 & 0x1f) << 6 | c2 & 0x3f
            )
        } else if (c1 > 0xdf && c1 < 0xf0) {
            let c2 = bytes[++i]
            let c3 = bytes[++i]
            out[j++] = String.fromCharCode((c1 & 0xf) << 12 | (c2 & 0x3f) << 6 | c3 & 0x3f)
        } else {
            // pair
            let c2 = bytes[++i]
            let c3 = bytes[++i]
            let c4 = bytes[++i]
            let u = (
                (c1 & 0x07) << 18 |
                (c2 & 0x3f) << 12 |
                (c3 & 0x3f) << 6 |
                (c4 & 0x3f)
            ) - 0x10000
            out[j++] = String.fromCharCode(0xd800 | (u >> 10))
            out[j++] = String.fromCharCode(0xdc00 | (u & 0x3ff))

        }
    }

    return out.join('')
}

function _readVarint (bytes) {
    return readVarint(0, bytes).toLong()
}

function writeVarint (number) {
    let ret = []
    let obj = {
        data: ret,
        pos: 0
    }

    if (typeof number === 'number') {
        writeNumberVarint.call(obj, number)
    } else {
        writeLongVarint.call(obj, number)
    }

    return ret
}

module.exports = {
    keyByMultiple,

    readVarint: _readVarint,
    writeVarint,

    toByteArray,
    fromByteArray,
    toHex,
    fromHex,
}
