const chai = require('chai')
const expect = chai.expect
const ja = require('../src/json-api')
const PB = require('..')
const { toHex, fromHex } = require('../utils')

describe('jsonToInput', () => {
    it('should convert key-value pairs', () => {
        expect(ja.jsonToInput({
            1: 35,
            2: 'hello',
        }).fields).to.eql({
            1: [
                { type: 'int32', value: 35 },
            ],
            2: [
                { type: 'string', value: 'hello' },
            ],
        })
    })

    it('should convert repeateds', () => {
        expect(ja.jsonToInput({
            1: [
                42,
                5,
            ],
            2: [
                'hi',
                'hello',
            ],
        }).fields).to.eql({
            1: [
                { type: 'int32', value: 42 },
                { type: 'int32', value: 5 },
            ],
            2: [
                { type: 'string', value: 'hi' },
                { type: 'string', value: 'hello' },
            ],
        })
    })

    it('should convert nested messages', () => {
        expect(ja.jsonToInput({
            1: 42,
            2: {
                1: 'hi!',
            },
        }).fields).to.eql({
            1: [
                { type: 'int32', value: 42 },
            ],
            2: [
                {
                    type: 'message', value: {
                        fields: {
                            1: [
                                { type: 'string', value: 'hi!' },
                            ],
                        },
                        unpacked: []
                    },
                },
            ],
        })
    })

    it('should convert repeated nested messages', () => {
        expect(ja.jsonToInput({
            1: 42,
            2: [
                { 1: 'hi!' },
                { 1: 'hello!' },
            ],
        }).fields).to.eql({
            1: [
                { type: 'int32', value: 42 },
            ],
            2: [
                {
                    type: 'message', value: {
                        fields: {
                        1: [
                            { type: 'string', value: 'hi!' },
                        ],
                    },
                    unpacked: []
                    },
                }, {
                    type: 'message', value: {
                        fields: {
                        1: [
                            { type: 'string', value: 'hello!' },
                        ],
                        },
                        unpacked: []
                    },
                },
            ],
        })
    })

    it('should support explicit types', () => {
        expect(ja.jsonToInput({
            1: {
                uint32: 35,
            },
            2: {
                string: 'hello',
            },
            3: 555,
        }).fields).to.eql({
            1: [
                { type: 'uint32', value: 35 },
            ],
            2: [
                { type: 'string', value: 'hello' },
            ],
            3: [
                { type: 'int32', value: 555 },
            ],
        })
    })

    it('should support explicit types in repeateds', () => {
        expect(ja.jsonToInput({
            1: [
                { uint32: 35 },
                { uint32: '36' },
            ],
            2: {
                string: 'hello',
            },
            3: 555,
        }).fields).to.eql({
            1: [
                { type: 'uint32', value: 35 },
                { type: 'uint32', value: 36 },
            ],
            2: [
                { type: 'string', value: 'hello' },
            ],
            3: [
                { type: 'int32', value: 555 },
            ],
        })
    })
    it('should support unpacked values', () => {
        let msg = PB.fromJson({
            1: 'one',
            2: {
                unpacked: true,
                value: [
                    23,
                    34,
                    45
                ]
            },
            3: {
                1: {
                    unpacked: true,
                    value: [
                        23,
                        34,
                        45
                    ]
                }
            }
        })
        expect(msg._unpacked).to.eql({
            2: 1
        })
    })

    it('should convert json to InputMessage', () => {
        let msg = PB.fromJson({
            1: {
                value: 'ipsum'
            },
            2: 123810923812n,
            3: {
                bytes: [0xff, 0xae],
            },
            4: {
                1: [244, 56],
                2: [
                    {
                        1: 'ipsum',
                    },
                    {
                        1: 'lorem',
                    },
                ],
            },
        }).toWire()
        expect(toHex(msg))
            .to.eq('0a05697073756d1a02ffae221712070a05697073756d12070a056c6f72656d0a03f4013810a48ad39dcd03')
    })

    it('should convert OutputMessage to json', () => {
        let msg = PB.parse(fromHex('0a05697073756d221212070a05697073756d12070a056c6f72656d10a48ad39dcd03'))
        expect(msg.toJSON()).to.eql({
            '1': 'ipsum',
            '2': '123810923812',
            '4': {
                '2': [
                    {
                        '1': 'ipsum',
                    },
                    {
                        '1': 'lorem',
                    },
                ],
            },
        })
    })

    it('should respect missing known fields', () => {
        let msg = PB.parse([0x08, 0x2a])
        msg.known({
            1: 'int32',
            2: ['int32', 'string'],
            3: 'string',
            4: 'int32'
        })

        expect(msg.toJSON()).to.eql({
            '1': '42',
            '2': '0',
            '3': '',
            '4': '0'
        })
    })

    it('should convert InputMessage to json', () => {
        let obj = {
            1: 'ipsum',
            2: {
                int64: '123810923812'
            },
            4: {
                1: [244, 56],
                2: [
                    {
                        1: 'ipsum',
                    },
                    {
                        1: 'lorem',
                    },
                ],
            },
        }
        expect(PB.fromJson(obj).toJSON()).eql(obj)
    })
})


