const chai = require('chai')
const expect = chai.expect
const u = require('../src/utils')

describe('fromHex', () => {
    it('should work with empty strings', () => {
        expect(u.fromHex('')).to.eql([])
    })

    it('should work with one-byte strings', () => {
        expect(u.fromHex('ff')).to.eql([255])
    })

    it('should work with multiple-byte strings', () => {
        expect(u.fromHex('ff032a')).to.eql([255, 3, 42])
    })

    it('should throw error for invalid hex', () => {
        expect(() => u.fromHex('a')).to.throw(Error)
        expect(() => u.fromHex('ze')).to.throw(Error)
    })
})

describe('toHex', () => {
    it('should work with empty arrays', () => {
        expect(u.toHex([])).to.eql('')
    })

    it('should work with one-byte arrays', () => {
        expect(u.toHex([255])).to.eql('ff')
    })

    it('should work with multiple-byte arrays', () => {
        expect(u.toHex([255, 3, 42])).to.eql('ff032a')
    })

    it('should throw error for invalid byte arrays', () => {
        expect(() => u.toHex([420])).to.throw(Error)
    })

    it('should work with strings', () => {
        expect(u.toHex('4')).to.eql('34')
    })

    if (typeof Buffer !== 'undefined') {
        it('should work with buffers', () => {
            expect(u.toHex(Buffer.from([255, 4, 5]))).to.eql('ff0405')
        })
    }
})

describe('toByteArray', () => {
    it('should work with empty strings', () => {
        expect(u.toHex(u.toByteArray(''))).to.eql('')
    })

    it('should work with ascii strings', () => {
        expect(u.toHex(u.toByteArray('hello!'))).to.eql('68656c6c6f21')
    })

    it('should work with non-ascii strings', () => {
        expect(u.toHex(u.toByteArray('прывiтанне!'))).to.eql('d0bfd180d18bd0b269d182d0b0d0bdd0bdd0b521')
    })

    it('should work with emojis', () => {
        expect(u.toHex(u.toByteArray('🤟🏽'))).to.eql('f09fa49ff09f8fbd')
    })
})


describe('fromByteArray', () => {
    it('should work with empty strings', () => {
        expect(u.fromByteArray(u.fromHex(''))).to.eql('')
    })

    it('should work with ascii strings', () => {
        expect(u.fromByteArray(u.fromHex('68656c6c6f21'))).to.eql('hello!')
    })

    it('should work with non-ascii strings', () => {
        expect(u.fromByteArray(u.fromHex('d0bfd180d18bd0b269d182d0b0d0bdd0bdd0b521'))).to.eql('прывiтанне!')
    })

    it('should work with emojis', () => {
        expect(u.fromByteArray(u.fromHex('f09fa49ff09f8fbd'))).to.eql('🤟🏽')
    })

    it('should throw error for bad byte arrays', () => {
        expect(() => u.fromByteArray([420])).to.throw(Error)
    })
})


