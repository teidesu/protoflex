const chai = require('chai')
const expect = chai.expect
const Long = require('long')
const PB = require('../src/index')
const { toHex, toByteArray } = require('../src/utils')
const {
    writeNumberVarint,
    writeLongVarint,
    writeFixed32,
    writeFixed64,
    writeLengthDelimited,
} = require('../src/writers')

describe('api', () => {
    describe('read/write', () => {
        let msg = PB.create()

        it('varints', () => {
            PB.InputMessage._varints.forEach(({ name, long, from, to }, i) => {
                expect(msg[name](i, 42)).to.eq(msg) // chaining
                let v = msg.get(i)
                if (long) {
                    expect(v).to.have.instanceOf(Long)
                    expect(v.eq(42))
                } else {
                    expect(v).to.eq(42)
                }
                if (!long) {
                    expect(() => msg[name](i, -Infinity)).to.throw(RangeError, name)
                    expect(() => msg[name](i, Infinity)).to.throw(RangeError, name)
                }
            })
        })

        it('string()', () => {
            msg.string(1, 'hi')
            msg.string(2, 42)
            msg.string(3, null)

            expect(msg.get(1)).to.eq('hi')
            expect(msg.get(2)).to.eq('42')
            expect(msg.get(3)).to.eq('null')
        })

        it('bytes()', () => {
            let val = [0xaa, 0xbb, 0xcc]
            msg.bytes(1, val)
            msg.bytes(3, Buffer.from('aabbcc', 'hex'))

            expect(msg.get(1)).to.eql(val)
            expect(msg.get(3)).to.eql(val)

            expect(() => msg.bytes(1, null)).to.throw(Error, 'null cannot be cast to bytes')
            expect(() => msg.bytes(1, 42)).to.throw(Error, 'Number cannot be cast to bytes')
        })

        it('array()', () => {
            msg.string(0, 'hi')
            msg.string(0, 'hello', 1)
            expect(msg.array(0)).to.eql(['hi', 'hello'])

            expect(() => msg.array(0, 'int32')).to.throw(Error, 'is not int32')
            msg.clear(0)
            expect(() => msg.array(0)).to.throw(Error, 'Message does not have 0')
        })

        it('iter()', () => {
            msg.clear()
            msg
                .append(1, 0, 'int32')
                .append(1, 1)
                .append(1, 2)
                .append(1, 3)
                .append(1, 4)

            let i = 0

            for (let it of msg.iter(1)) {
                expect(it).to.be.eq(i++)
            }

            i = 0

            for (let it of msg.iter(1, true)) {
                expect(it.get()).to.be.eq(i++)
                it.set(it.get() + 1)
                expect(it.get()).to.be.eq(i)
            }

            expect(msg.array(1)).to.eql([1, 2, 3, 4, 5])

            expect(() => {
                for (let it of msg.iter(1)) {
                    msg.append(1, 5)
                }
            }).to.throw(Error, 'size changed')
        })

        it('clear()', () => {
            msg = PB.create()
            expect(msg.fields).to.eql({})
            msg.string(1, 'foo')
            expect(msg.fields).to.eql({ 1: [{ type: 'string', value: 'foo' }] })
            msg.clear()
            expect(msg.fields).to.eql({})


            msg.string(1, 'foo')
            msg.string(2, 'bar')
            expect(msg.get(1)).to.eq('foo')
            expect(msg.get(2)).to.eq('bar')
            msg.clear(1)
            expect(msg.has(1)).to.be.false
            expect(msg.has(2)).to.be.true

            msg.string(1, 'foo')
            msg.string(1, 'foosh', 1)
            msg.string(1, 'foosh', 2)
            msg.string(1, 'foosh', 3)

            expect(msg.get(1)).to.eq('foo')
            expect(msg.get(1, 1)).to.eq('foosh')
            expect(msg.get(1, 2)).to.eq('foosh')
            expect(msg.get(1, 3)).to.eq('foosh')
            expect(msg.get(2)).to.eq('bar')
            msg.clear(1, 1)
            msg.clear(1, -1)
            expect(msg.has(1, 1)).to.be.true
            expect(msg.has(1, 2)).to.be.false
            expect(msg.has(1, 3)).to.be.false
            expect(msg.has(1)).to.be.true
            expect(msg.has(2)).to.be.true
        })

        it('get()', () => {
            msg.clear()
            msg.string(0, 'hello')
            msg.string(0, 'hello1', 1)
            expect(msg.get(0)).to.eq('hello')
            expect(msg.get(0, 0)).to.eq('hello')
            expect(msg.get(0, 1)).to.eq('hello1')
            expect(msg.get(0, 'string')).to.eq('hello')
            expect(msg.get(0, 'string', 1)).to.eq('hello1')

            expect(() => msg.get(0, 'int32')).to.throw(Error, '0:0 is not int32')
            expect(() => msg.get(0, 'int32', 0)).to.throw(Error, '0:0 is not int32')
        })

        it('append()', () => {
            msg.clear()
            msg.string(0, 'hello')
            msg.append(0, 'hi')
            expect(msg.array(0)).to.eql(['hello', 'hi'])

            msg
                .clear(0)
                .append(0, 'hello', 'string')
                .append(0, 'hi')

            expect(msg.array(0)).to.eql(['hello', 'hi'])

            msg.clear(0)
            msg.append(0, 'hello', 'string')
            expect(() => msg.append(0, 42, 'int32')).to.throw(Error, 'in array have type string, not int32')

            expect(() => msg.append(1, 'hi')).to.throw(Error, 'First item in array must have type set explicitly')
        })

        it('.<type>() with index as sparse', () => {
            msg.clear()
            msg.int32(1, 1, 0).int32(1, 1, 2)

            expect(msg.array(1)).to.eql([1, undefined, 1])

            expect(msg.toWire()).to.eql([10, 2, 1, 1])
        })

        it('message()', () => {
            msg.clear()
                .message(1)
                .string(1, 'hi!')
                .message(2)
                .int32(1, 42)
                .int32(2, 42)
                .end()
                .end()

            expect(msg.get(1, 'message')).to.be.instanceOf(PB.InputMessage)
            expect(msg.get(1, 'message').get(1)).to.eq('hi!')
            expect(msg.get(1, 'message').get(2, 'message')).to.be.instanceOf(PB.InputMessage)
            expect(msg.get(1, 'message').get(2, 'message').get(1, 'int32'))
                .to.eq(msg.get(1, 'message').get(2, 'message').get(2, 'int32'))
        })
    })
})

describe('writers', () => {
    const call = (func, arg) => {
        const sandbox = {
            data: [],
            pos: 0,
        }
        func.call(sandbox, arg)
        return toHex(sandbox.data)
    }

    describe('varint', () => {
        it('should correctly encode positive 32-bit numbers', () => {
            expect(call(writeNumberVarint, 0)).to.eq('00')
            expect(call(writeNumberVarint, 8)).to.eq('08')
            expect(call(writeNumberVarint, 42)).to.eq('2a')
            expect(call(writeNumberVarint, 300)).to.eq('ac02')
            expect(call(writeNumberVarint, 42424242)).to.eq('b2af9d14')
        })

        it('should correctly encode negative 32-bit numbers', () => {
            expect(call(writeNumberVarint, -424242)).to.eq('ce8de6ffffffffffff01')
            expect(call(writeNumberVarint, -123681212)).to.eq('c48c83c5ffffffffff01')
        })

        it('should correctly encode positive 64-bit numbers', () => {
            expect(call(writeLongVarint, Long.fromString('0'))).to.eq('00')
            expect(call(writeLongVarint, Long.fromString('424242424242424242'))).to.eq('b293fb9ccbc7cdf105')
            expect(call(writeLongVarint, Long.fromString('1293162973122938122', true))).to.eq('8a8ab98df69b8ff911')
            expect(call(writeLongVarint, Long.fromString('1331629731229381123', true))).to.eq('83e49af2f6c5b9bd12')
        })

        it('should correctly encode negative 64-bit numbers', () => {
            expect(call(writeLongVarint, Long.fromString('-424242424242424242'))).to.eq('ceec84e3b4b8b28efa01')
            expect(call(writeLongVarint, Long.fromString('-12931629731229381'))).to.eq('bba2839c85d883e9ff01')
        })
    })

    describe('fixed', () => {
        it('should correctly encode fixed32', () => {
            expect(call(writeFixed32, 0)).to.eq('00000000')
            expect(call(writeFixed32, 1)).to.eq('01000000')
            expect(call(writeFixed32, 0)).to.eq('00000000')
            expect(call(writeFixed32, 42)).to.eq('2a000000')
            expect(call(writeFixed32, 42424242)).to.eq('b2578702')
        })

        it('should correctly encode fixed64', () => {
            expect(call(writeFixed64, 1)).to.eq('0100000000000000')
            expect(call(writeFixed64, 0)).to.eq('0000000000000000')
            expect(call(writeFixed64, 42)).to.eq('2a00000000000000')
            expect(call(writeFixed64, 42424242)).to.eq('b257870200000000')
            expect(call(writeFixed64, Long.fromString('4242424242424242'))).to.eq('b2c9f45d76120f00')
            expect(call(writeFixed64, Long.fromString('12937192831123121'))).to.eq('b1fe16ef4ef62d00')
        })
    })

    it('length-delimited', () => {
        expect(call(writeLengthDelimited, [0x2a, 0x3b, 0x4c])).to.eq('032a3b4c')
        expect(call(writeLengthDelimited, toByteArray('foo'))).to.eq('03666f6f')
        expect(call(writeLengthDelimited, toByteArray('bar'))).to.eq('03626172')
        expect(call(writeLengthDelimited, toByteArray('lorem ipsum dolor sit amet')))
            .to
            .eq('1a6c6f72656d20697073756d20646f6c6f722073697420616d6574')
        expect(call(writeLengthDelimited, toByteArray('hi\x00and this is cedilla ç 🤟🏽')))
            .to
            .eq('22686900616e64207468697320697320636564696c6c6120c3a720f09fa49ff09f8fbd')
    })
})

describe('serializing to wire', () => {
    it('should serialize simple messages', () => {
        let d = PB.create()
            .int32(1, 42)
            .toWire()
        expect(toHex(d)).to.eq('082a')

        d = PB.create()
            .int32(1, 42)
            .int32(2, 42)
            .toWire()
        expect(toHex(d)).to.eq('082a102a')

        d = PB.create()
            .int32(1, 42)
            .string(2, 'bar')
            .toWire()
        expect(toHex(d)).to.eq('1203626172082a')
        // note the order -- string comes before int32 even though it both has bigger key and was declared later
        // this is due to packability of int32. according to protobuf spec, this is perfectly valid
    })

    it('should write fractions', () => {
        expect(toHex(
            PB.create()
                .float(1, 4242.4242)
                .toWire()
        )).to.eq('0d65938445')
        expect(toHex(
            PB.create()
                .double(1, 42424242.42424242)
                .toWire()
        )).to.eq('0936d96493bd3a8441')
    })

    it('should write fixeds', () => {
        expect(toHex(
            PB.create()
                .fixed32(1, 42424242)
                .toWire()
        )).to.eq('0db2578702')
        expect(toHex(
            PB.create()
                .sfixed32(1, 281311923)
                .toWire()
        )).to.eq('0db37ac410')
        expect(toHex(
            PB.create()
                .sfixed32(1, -281311923)
                .toWire()
        )).to.eq('0d4d853bef')

        expect(toHex(
            PB.create()
                .fixed64(1, 42424242)
                .toWire()
        )).to.eq('09b257870200000000')
        expect(toHex(
            PB.create()
                .sfixed64(1, 281311923)
                .toWire()
        )).to.eq('09b37ac41000000000')
        expect(toHex(
            PB.create()
                .sfixed64(1, -281311923)
                .toWire()
        )).to.eq('094d853befffffffff')

        expect(toHex(
            PB.create()
                .fixed64(1, '2813119231234')
                .toWire()
        )).to.eq('0902f5f8fa8e020000')
        expect(toHex(
            PB.create()
                .sfixed64(1, '-2813119231234')
                .toWire()
        )).to.eq('09fe0a070571fdffff')
    })

    it('should ignore fields with default values', () => {
        expect(toHex(
            PB.create()
                .int32(1, 0)
                .toWire(),
        )).to.eq('')
        expect(toHex(
            PB.create()
                .bool(1, false)
                .toWire(),
        )).to.eq('')
        expect(toHex(
            PB.create()
                .string(1, '')
                .toWire(),
        )).to.eq('')
        expect(toHex(
            PB.create()
                .bytes(1, [])
                .toWire(),
        )).to.eq('')
    })

    it('should write repeated fields', () => {
        expect(toHex(
            PB.create()
                .string(1, '1', 0)
                .string(1, '2', 1)
                .string(1, '3', 2)
                .toWire(),
        )).to.eq('0a01310a01320a0133')
    })

    it('should write repeated packed fields', () => {
        expect(toHex(
            PB.create()
                .int32(1, 1, 0)
                .int32(1, 2, 1)
                .int32(1, 3, 2)
                .toWire(),
        )).to.eq('0a03010203')
    })

    it('should respect .unpacked()', () => {
        expect(toHex(
            PB.create()
                .unpacked(1)
                .int32(1, 1, 0)
                .int32(1, 2, 1)
                .int32(1, 3, 2)

                .int32(2, 1, 0)
                .int32(2, 2, 1)
                .toWire(),
        )).to.eq('08010802080312020102')
    })

    it('should handle nested messages', () => {
        expect(toHex(
            PB.create()
                .message(1).int32(1, 1).end()
                .int32(2, 1)
                .toWire(),
        )).to.eq('0a0208011001')
    })

    it('should handle repeated nested messages', () => {
        expect(toHex(
            PB.create()
                .message(1, 0).int32(1, 1).end()
                .message(1, 1).int32(1, 2).end()
                .int32(2, 1)
                .toWire(),
        )).to.eq('0a0208010a0208021001')
    })
})
