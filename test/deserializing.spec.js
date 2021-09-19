const chai = require('chai')
const expect = chai.expect
const PB = require('../src/index')
const { fromHex, fromByteArray } = require('../src/utils')
const { fullyReadVarint } = require('../src/readers')
const Long = require('long')
const { readVarintAndLength } = require('../src/readers')

describe('varints', () => {
    const test = (dat, ret, offy = 0) => {
        if (typeof dat === 'string') {
            dat = fromHex(dat)
        }
        let mock = {
            data: dat,
            offset: offy,
            length: dat.length,
        }
        let val = fullyReadVarint.call(mock).toLong()
        expect(
            val.eq(ret)
        ).to.eq(true, `${val} != ${ret}`)
    }

    it('should read one-byte varints', () => {
        test('08', 8)
    })

    it('should read two-byte varints', () => {
        test('ac02', 300)
    })

    it('should read many bytes varints', () => {
        test('b2af9d14', 42424242)
    })

    it('should read varint with offset', () => {
        test('012a08', 42, 1)
    })

    it('should work with negative varints', () => {
        test('c48c83c5ffffffffff01', -123681212)
    })

    it('should work with unsigned varints', () => {
        test('8a8ab98df69b8ff911', '1293162973122938122')
    })

    it('should detect varint lengths', () => {
        let [value, length] = readVarintAndLength(0, fromHex('ac02ffff'))
        expect(value.toNumber()).to.eq(300)
        expect(length).to.eq(2)
    })
})

describe('single-value messages', () => {
    const test = (cases, typ, approx = false) => {
        for (let [buf, val] of cases) {
            let msg = fromHex(buf)
            let dat = PB.parse(msg)
            let v = dat[typ](1)
            if (v instanceof Long) {
                expect(v.eq(val)).to.eq(true, `${v} != ${val}`)
            } else {
                let to = expect(v).to
                if (approx) {
                    to.approximately(val, approx, buf)
                } else {
                    to.equal(val, buf)
                }
            }
        }
    }

    it('should handle single-fixed32 messages', () => {
        test([
            ['0db2578702', 42424242],
            ['0d00000000', 0],
        ], 'fixed32')
    })

    it('should handle single-fixed64 messages', () => {
        test([
            ['09b2c9f45d76120f00', 4242424242424242],
            ['09b1fe16ef4ef62d00', '12937192831123121'],
            ['090000000000000000', 0],
        ], 'fixed64')
    })

    it('should handle single-sfixed32 messages', () => {
        test([
            ['0db37ac410', 281311923],
            ['0d4d853bef', -281311923]
        ], 'sfixed32')
    })

    it('should handle single-sfixed64 messages', () => {
        test([
            ['0902f5f8fa8e020000', '2813119231234'],
            ['09fe0a070571fdffff', '-2813119231234'],
        ], 'sfixed64')
    })

    it('should handle single-double messages', () => {
        test([
            ['0936d96493bd3a8441', 42424242.42424242],
            ['090000000000000000', 0.0],
        ], 'double', 0.02)
    })

    it('should handle single-float messages', () => {
        test([
            ['0d65938445', 4242.4242],
            ['0d00000000', 0],
        ], 'float', 0.2)
    })

    it('should handle single-int32 messages', () => {
        test([
            ['08b2f219', 424242],
            ['08ce8de6ffffffffffff01', -424242],
            ['08d6ffffffffffffffff01', -42],
            ['082a', 42],
            ['0800', 0],
        ], 'int32')
    })

    it('should handle single-int64 messages', () => {
        test([
            ['08b2f219', 424242],
            ['08ce8de6ffffffffffff01', -424242],
            ['08d6ffffffffffffffff01', -42],
            ['082a', 42],
            ['08b293fb9ccbc7cdf105', '424242424242424242'],
            ['08ceec84e3b4b8b28efa01', '-424242424242424242'],
            ['088a8ab98df69b8ff911', '1293162973122938122'],
            ['08bba2839c85d883e9ff01', '-12931629731229381'],
            ['0800', 0],
        ], 'int64')
    })

    it('should handle single-uint64 messages', () => {
        test([
            ['08b2f219', 424242],
            ['082a', 42],
            ['08b293fb9ccbc7cdf105', '424242424242424242'],
            ['0883e49af2f6c5b9bd12', '1331629731229381123'],
            ['0800', 0],
        ], 'uint64')
    })

    it('should handle single-sint32 messages', () => {
        test([
            ['0854', 42],
            ['0853', -42],
            ['08e4e433', 424242],
            ['08e3e433', -424242],
            ['08ea94b4a401', 172393781],
            ['08e994b4a401', -172393781],
            ['0800', 0],
        ], 'sint32')
    })

    it('should handle single-sint64 messages', () => {
        test([
            ['0854', 42],
            ['0853', -42],
            ['08e4e433', 424242],
            ['08e3e433', -424242],
            ['08ea94b4a401', 172393781],
            ['08e994b4a401', -172393781],
            ['08e6a9e9cee1d6d3cb03', '129381023810923123'],
            ['08e5a9e9cee1d6d3cb03', '-129381023810923123'],
            ['0800', 0],
        ], 'sint64')
    })


    it('should handle single-bool messages', () => {
        test([
            ['0801', true],
            ['0800', false],
        ], 'bool')
    })

    it('should handle single-string messages', () => {
        test([
            ['0a03666f6f', 'foo'],
            ['0a03626172', 'bar'],
            ['0a1a6c6f72656d20697073756d20646f6c6f722073697420616d6574', 'lorem ipsum dolor sit amet'],
            ['0a22686900616e64207468697320697320636564696c6c6120c3a720f09fa49ff09f8fbd', 'hi\x00and this is cedilla ç 🤟🏽'],
        ], 'string')
    })

    it('should handle single-bytes messages', () => {
        let msg = fromHex('0a19686900616e64207468697320697320636564696c6c6120c3a7')
        let dat = PB.parse(msg)
        expect(fromByteArray(dat.bytes(1))).to.equal('hi\x00and this is cedilla ç')
    })
})

describe('known fields', () => {
    let dat = PB.parse([])
    dat.known({
        2: 'int32',
        3: 'string',
        4: 'bytes',
        5: 'message',
        6: 'any',
        7: 'array',
    })

    it('should work for unknown types', () => {
        expect(() => dat.int32(6)).not.to.throw(Error)
        expect(() => dat.int64(6)).not.to.throw(Error)
        expect(() => dat.bytes(6)).not.to.throw(Error)
        expect(() => dat.string(6)).not.to.throw(Error)
    })

    it('should return default value for numerics', () => {
        expect(dat.int32(2)).to.eq(0)
    })

    it('should return default value for arrays', () => {
        expect(dat.array(7, 'int32')).to.eql([])
    })

    it('should return default value for strings', () => {
        expect(dat.string(3)).to.eq('')
    })

    it('should return default value for bytes', () => {
        expect(dat.bytes(4).toString('hex')).to.eq('')
    })

    it('should return default value for message', () => {
        let sub = dat.message(5)
        expect(sub).to.be.an.instanceOf(PB.OutputMessage)
        sub.known(3)
        expect(sub.string(3)).to.eq('')
    })

    it('should work with .has() checks', () => {
        expect(dat.has(2)).to.be.true
    })

    it('should work with .type() checks', () => {
        expect(dat.type(2)).to.equal('int32')
    })

    it('should throw error for invalid types', () => {
        expect(() => dat.int64(2)).to.throw(Error)
        expect(() => dat.int64(3)).to.throw(Error)
        expect(() => dat.bytes(3)).to.throw(Error)
        expect(() => dat.int64(4)).to.throw(Error)
        expect(() => dat.string(4)).to.throw(Error)
        expect(() => dat.int64(5)).to.throw(Error)
    })

    it('should work for repeateds', () => {
        let dat = PB.parse([])
        dat.known({
            1: 'int32',
        })
        expect(dat.array(1, 'int32')).to.eql([])
        dat = PB.parse([0x0a, 0x03, 0x03, 0x04, 0x05])
        dat.known({
            1: 'int32',
        })
        dat.repeated(1, 'int32')
        expect(dat.array(1, 'int32')).to.eql([3, 4, 5])
    })
})

describe('repeated fields & nested messages', () => {
    it('should handle repeated unpacked varint fields', () => {
        let msg = fromHex('080308040805')
        let dat = PB.parse(msg)
        expect(dat.array(1, 'int32')).to.eql([3, 4, 5])
    })

    it('should handle repeated strings', () => {
        let msg = fromHex('0a03666f6f0a03666f6f0a03666f6f')
        let dat = PB.parse(msg)
        expect(dat.array(1, 'string')).to.eql(['foo', 'foo', 'foo'])
    })

    it('should handle repeated packed varint fields', () => {
        let msg = fromHex('0a03030405')
        let dat = PB.parse(msg)
        dat.repeated(1, 'int32')
        expect(dat.array(1, 'int32')).to.eql([3, 4, 5])
    })

    it('should handle repeated packed fixed32 fields', () => {
        let msg = fromHex('0a0c030000000400000005000000')
        let dat = PB.parse(msg)
        dat.repeated(1, 'fixed32')
        expect(dat.array(1, 'fixed32')).to.eql([3, 4, 5])
    })

    it('should handle repeated packed float fields', () => {
        let msg = fromHex('0a10cdcccc3d9a99993f333313409a995940')
        let dat = PB.parse(msg)
        dat.repeated(1, 'float')
        dat.array(1, 'float').forEach((it, i) => expect(it).to.be.approximately(parseFloat(`${i}.${i + 1}`), 0.01))
    })

    it('should handle repeated packed fixed64 fields', () => {
        let msg = fromHex('0a18030000000000000004000000000000000500000000000000')
        let dat = PB.parse(msg)
        dat.repeated(1, 'fixed64')
        expect(dat.array(1, 'fixed64').map((i, j) => i.eq(j + 3))).to.eql([true, true, true])
    })

    it('should handle nested messages', () => {
        let msg = fromHex('0a02082a')
        let dat = PB.parse(msg)
        let sub = dat.message(1)
        expect(sub.int32(1)).to.eql(42)
    })

    it('should handle repeated inside nested messages', () => {
        let msg = fromHex('0a050a03030405')
        let dat = PB.parse(msg)
        let sub = dat.message(1)
        sub.repeated(1, 'int32')
        expect(sub.array(1, 'int32')).to.eql([3, 4, 5])
    })

    it('should handle repeated nested messages', () => {
        let msg = fromHex('0a000a0208010a020802')
        let dat = PB.parse(msg)

        // per-item access
        for (let i = 0; i < 3; i++) {
            let sub = dat.message(1, i)
            sub.known({
                1: 'int32',
            })
            expect(sub.int32(1)).to.equal(i)
        }
        // array access
        let j = 0
        for (let i of dat.array(1, 'message')) {
            expect(i.int32(1)).to.equal(j++)
        }
    })

    it('should iterate over repeateds', () => {
        let msg = PB.parse(fromHex('080108020803'))
        let i = 1

        for (let it of msg.iter(1, 'int32')) {
            expect(it).to.eq(i++)
        }
    })
})

describe('complex messages', () => {
    it('should work with google checkin request', () => {
        // real protobuf that is used in production in google internals
        let data = fromHex('10001a2a312d39323961306463613065656535'
            + '35353133323830313731613835383564613764636433373030663822'
            + 'e3010abf010a4567656e657269635f7838362f676f6f676c655f7364'
            + '6b5f7838362f67656e657269635f7838363a342e342e322f4b4b2f33'
            + '3037393138333a656e672f746573742d6b657973120672616e636875'
            + '1a0b67656e657269635f7838362a07756e6b6e6f776e320e616e6472'
            + '6f69642d676f6f676c654085b586064a0b67656e657269635f783836'
            + '50135a19416e64726f69642053444b206275696c7420666f72207838'
            + '366207756e6b6e6f776e6a0e676f6f676c655f73646b5f7838367000'
            + '100032063331303236303a06333130323630420b6d6f62696c653a4c'
            + '54453a48003205656e5f555338f0b4dfa6b99ab8838e01520f333538'
            + '3234303035313131313131305a006210416d65726963612f4e65775f'
            + '596f726b70037a1c37315136526e3244445a6c317a50445661616545'
            + '484974642b59673da00100b00100')
        let msg = PB.parse(data)
        expect(msg.has(1)).to.be.false
        expect(msg.has(2)).to.be.true
        expect(msg.has(3)).to.be.true
        expect(msg.has(4)).to.be.true
        expect(msg.has(6)).to.be.true
        expect(msg.string(3)).to.eq('1-929a0dca0eee55513280171a8585da7dcd3700f8')
        expect(msg.uint64(7, 0).eq(Long.fromString('10234114402585926256', true))).to.be.true
        expect(msg.string(10)).to.eq('358240051111110')
        expect(msg.string(12)).to.eq('America/New_York')

        let sub = msg.message(4).message(1)
        expect(sub).to.have.instanceOf(PB.OutputMessage)
        expect(sub.string(6)).to.eq('android-google')
        expect(sub.int32(8)).to.eq(12688005)
    })
})

