(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("PB", [], factory);
	else if(typeof exports === 'object')
		exports["PB"] = factory();
	else
		root["PB"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var VARINT_TYPES = ['int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'varint', 'bool'];
var PACKABLE_TYPES = [].concat(VARINT_TYPES, ['fixed32', 'fixed64', 'sfixed32', 'sfixed64', 'double', 'float']);
var PROTOBUF_TYPES = ['int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'bool', 'fixed32', 'fixed64', 'sfixed32', 'sfixed64', 'bytes', 'string', 'message', 'double', 'float'];
var WIRE_TYPES = {
  varint: 0,
  fixed64: 1,
  lengthDelimited: 2,
  fixed32: 5
};
var WIRE_TYPES_NAMES = ['varint', 'fixed64', 'lengthDelimited', undefined, undefined, 'fixed32'];
var DEFAULT_VALUES = {
  int32: 0,
  int64: 0,
  uint32: 0,
  uint64: 0,
  sint32: 0,
  sint64: 0,
  bool: false,
  fixed32: 0,
  fixed64: 0,
  sfixed32: 0,
  sfixed64: 0,
  bytes: '',
  string: '',
  message: null,
  double: 0,
  float: 0
};
module.exports = {
  TWO_TO_20: 1048576,
  TWO_TO_23: 8388608,
  TWO_TO_32: 4294967296,
  TWO_TO_33: 8589934592,
  TWO_TO_52: 4503599627370496,
  TWO_TO_63: 9223372036854775808,
  TWO_TO_64: 18446744073709551616,
  VARINT_TYPES: VARINT_TYPES,
  PACKABLE_TYPES: PACKABLE_TYPES,
  WIRE_TYPES: WIRE_TYPES,
  WIRE_TYPES_NAMES: WIRE_TYPES_NAMES,
  PROTOBUF_TYPES: PROTOBUF_TYPES,
  DEFAULT_VALUES: DEFAULT_VALUES,
  MIN_UINT32: 0,
  MAX_UINT32: 0xFFFFFFFF,
  MIN_INT32: -0x80000000,
  MAX_INT32: 0x7FFFFFFF,
  MIN_INT64: '-9223372036854775808',
  MAX_INT64: '9223372036854775807',
  MIN_UINT64: 0,
  MAX_UINT64: '18446744073709551615',
  MAX_FLOAT: 3.4028234663852886e+38,
  MIN_FLOAT: 1.1754943508222875e-38,
  MIN_DOUBLE: 2.2250738585072014e-308,
  MAX_DOUBLE: 1.7976931348623157e+308
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = Long;

/**
 * wasm optimizations, to do native i64 multiplication and divide
 */
var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
  ])), {}).exports;
} catch (e) {
  // no wasm support :(
}

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */
function Long(low, high, unsigned) {

    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */
    this.low = low | 0;

    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */
    this.high = high | 0;

    /**
     * Whether unsigned or not.
     * @type {boolean}
     */
    this.unsigned = !!unsigned;
}

// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.

/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */
Long.prototype.__isLong__;

Object.defineProperty(Long.prototype, "__isLong__", { value: true });

/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */
function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
}

/**
 * Tests if the specified object is a Long.
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 */
Long.isLong = isLong;

/**
 * A cache of the Long representations of small integer values.
 * @type {!Object}
 * @inner
 */
var INT_CACHE = {};

/**
 * A cache of the Long representations of small unsigned integer values.
 * @type {!Object}
 * @inner
 */
var UINT_CACHE = {};

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    } else {
        value |= 0;
        if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}

/**
 * Returns a Long representing the given 32 bit integer value.
 * @function
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromInt = fromInt;

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromNumber(value, unsigned) {
    if (isNaN(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return fromNumber(-value, unsigned).neg();
    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}

/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @function
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromNumber = fromNumber;

/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}

/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @function
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromBits = fromBits;

/**
 * @function
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @inner
 */
var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */
function fromString(str, unsigned, radix) {
    if (str.length === 0)
        throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
    if (typeof unsigned === 'number') {
        // For goog.math.long compatibility
        radix = unsigned,
        unsigned = false;
    } else {
        unsigned = !! unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');

    var p;
    if ((p = str.indexOf('-')) > 0)
        throw Error('interior hyphen');
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 8));

    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i),
            value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}

/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @function
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */
Long.fromString = fromString;

/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromValue(val, unsigned) {
    if (typeof val === 'number')
        return fromNumber(val, unsigned);
    if (typeof val === 'string')
        return fromString(val, unsigned);
    // Throws for non-objects, converts non-instanceof Long:
    return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}

/**
 * Converts the specified value to a Long using the appropriate from* function for its type.
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long}
 */
Long.fromValue = fromValue;

// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_16_DBL = 1 << 16;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_24_DBL = 1 << 24;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

/**
 * @type {!Long}
 * @const
 * @inner
 */
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

/**
 * @type {!Long}
 * @inner
 */
var ZERO = fromInt(0);

/**
 * Signed zero.
 * @type {!Long}
 */
Long.ZERO = ZERO;

/**
 * @type {!Long}
 * @inner
 */
var UZERO = fromInt(0, true);

/**
 * Unsigned zero.
 * @type {!Long}
 */
Long.UZERO = UZERO;

/**
 * @type {!Long}
 * @inner
 */
var ONE = fromInt(1);

/**
 * Signed one.
 * @type {!Long}
 */
Long.ONE = ONE;

/**
 * @type {!Long}
 * @inner
 */
var UONE = fromInt(1, true);

/**
 * Unsigned one.
 * @type {!Long}
 */
Long.UONE = UONE;

/**
 * @type {!Long}
 * @inner
 */
var NEG_ONE = fromInt(-1);

/**
 * Signed negative one.
 * @type {!Long}
 */
Long.NEG_ONE = NEG_ONE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

/**
 * Maximum signed value.
 * @type {!Long}
 */
Long.MAX_VALUE = MAX_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

/**
 * Maximum unsigned value.
 * @type {!Long}
 */
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MIN_VALUE = fromBits(0, 0x80000000|0, false);

/**
 * Minimum signed value.
 * @type {!Long}
 */
Long.MIN_VALUE = MIN_VALUE;

/**
 * @alias Long.prototype
 * @inner
 */
var LongPrototype = Long.prototype;

/**
 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
 * @returns {number}
 */
LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
};

/**
 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
 * @returns {number}
 */
LongPrototype.toNumber = function toNumber() {
    if (this.unsigned)
        return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};

/**
 * Converts the Long to a string written in the specified radix.
 * @param {number=} radix Radix (2-36), defaults to 10
 * @returns {string}
 * @override
 * @throws {RangeError} If `radix` is out of range
 */
LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');
    if (this.isZero())
        return '0';
    if (this.isNegative()) { // Unsigned Longs are never negative
        if (this.eq(MIN_VALUE)) {
            // We need to change the Long value before it can be negated, so we remove
            // the bottom-most digit in this base and then recurse to do the rest.
            var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
        } else
            return '-' + this.neg().toString(radix);
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
        rem = this;
    var result = '';
    while (true) {
        var remDiv = rem.div(radixToPower),
            intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
            digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
            return digits + result;
        else {
            while (digits.length < 6)
                digits = '0' + digits;
            result = '' + digits + result;
        }
    }
};

/**
 * Gets the high 32 bits as a signed integer.
 * @returns {number} Signed high bits
 */
LongPrototype.getHighBits = function getHighBits() {
    return this.high;
};

/**
 * Gets the high 32 bits as an unsigned integer.
 * @returns {number} Unsigned high bits
 */
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
};

/**
 * Gets the low 32 bits as a signed integer.
 * @returns {number} Signed low bits
 */
LongPrototype.getLowBits = function getLowBits() {
    return this.low;
};

/**
 * Gets the low 32 bits as an unsigned integer.
 * @returns {number} Unsigned low bits
 */
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
};

/**
 * Gets the number of bits needed to represent the absolute value of this Long.
 * @returns {number}
 */
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative()) // Unsigned Longs are never negative
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;
    for (var bit = 31; bit > 0; bit--)
        if ((val & (1 << bit)) != 0)
            break;
    return this.high != 0 ? bit + 33 : bit + 1;
};

/**
 * Tests if this Long's value equals zero.
 * @returns {boolean}
 */
LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
};

/**
 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
 * @returns {boolean}
 */
LongPrototype.eqz = LongPrototype.isZero;

/**
 * Tests if this Long's value is negative.
 * @returns {boolean}
 */
LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
};

/**
 * Tests if this Long's value is positive.
 * @returns {boolean}
 */
LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
};

/**
 * Tests if this Long's value is odd.
 * @returns {boolean}
 */
LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
};

/**
 * Tests if this Long's value is even.
 * @returns {boolean}
 */
LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
};

/**
 * Tests if this Long's value equals the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.equals = function equals(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
        return false;
    return this.high === other.high && this.low === other.low;
};

/**
 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.eq = LongPrototype.equals;

/**
 * Tests if this Long's value differs from the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(/* validates */ other);
};

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.neq = LongPrototype.notEquals;

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ne = LongPrototype.notEquals;

/**
 * Tests if this Long's value is less than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThan = function lessThan(other) {
    return this.comp(/* validates */ other) < 0;
};

/**
 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lt = LongPrototype.lessThan;

/**
 * Tests if this Long's value is less than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(/* validates */ other) <= 0;
};

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lte = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.le = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is greater than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(/* validates */ other) > 0;
};

/**
 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gt = LongPrototype.greaterThan;

/**
 * Tests if this Long's value is greater than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(/* validates */ other) >= 0;
};

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gte = LongPrototype.greaterThanOrEqual;

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ge = LongPrototype.greaterThanOrEqual;

/**
 * Compares this Long's value with the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.compare = function compare(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.eq(other))
        return 0;
    var thisNeg = this.isNegative(),
        otherNeg = other.isNegative();
    if (thisNeg && !otherNeg)
        return -1;
    if (!thisNeg && otherNeg)
        return 1;
    // At this point the sign bits are the same
    if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
    // Both are positive if at least one is unsigned
    return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
};

/**
 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.comp = LongPrototype.compare;

/**
 * Negates this Long's value.
 * @returns {!Long} Negated Long
 */
LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
    return this.not().add(ONE);
};

/**
 * Negates this Long's value. This is an alias of {@link Long#negate}.
 * @function
 * @returns {!Long} Negated Long
 */
LongPrototype.neg = LongPrototype.negate;

/**
 * Returns the sum of this and the specified Long.
 * @param {!Long|number|string} addend Addend
 * @returns {!Long} Sum
 */
LongPrototype.add = function add(addend) {
    if (!isLong(addend))
        addend = fromValue(addend);

    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the difference of this and the specified Long.
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
};

/**
 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
 * @function
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.sub = LongPrototype.subtract;

/**
 * Returns the product of this and the specified Long.
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero())
        return ZERO;
    if (!isLong(multiplier))
        multiplier = fromValue(multiplier);

    // use wasm support if present
    if (wasm) {
        var low = wasm.mul(this.low,
                           this.high,
                           multiplier.low,
                           multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (multiplier.isZero())
        return ZERO;
    if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;

    if (this.isNegative()) {
        if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
        else
            return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();

    // If both longs are small, use float multiplication
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
 * @function
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.mul = LongPrototype.multiply;

/**
 * Returns this Long divided by the specified. The result is signed if this Long is signed or
 *  unsigned if this Long is unsigned.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);
    if (divisor.isZero())
        throw Error('division by zero');

    // use wasm support if present
    if (wasm) {
        // guard against signed division overflow: the largest
        // negative number / -1 would be 1 larger than the largest
        // positive number, due to two's complement.
        if (!this.unsigned &&
            this.high === -0x80000000 &&
            divisor.low === -1 && divisor.high === -1) {
            // be consistent with non-wasm code path
            return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (!this.unsigned) {
        // This section is only relevant for signed longs and is derived from the
        // closure library as a whole.
        if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.eq(MIN_VALUE))
                return ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shr(1);
                approx = halfThis.div(divisor).shl(1);
                if (approx.eq(ZERO)) {
                    return divisor.isNegative() ? ONE : NEG_ONE;
                } else {
                    rem = this.sub(divisor.mul(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                }
            }
        } else if (divisor.eq(MIN_VALUE))
            return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative())
                return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
            return this.div(divisor.neg()).neg();
        res = ZERO;
    } else {
        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (!divisor.unsigned)
            divisor = divisor.toUnsigned();
        if (divisor.gt(this))
            return UZERO;
        if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
            return UONE;
        res = UZERO;
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    rem = this;
    while (rem.gte(divisor)) {
        // Approximate the result of division. This may be a little greater or
        // smaller than the actual value.
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

        // We will tweak the approximate result by changing it in the 48-th digit or
        // the smallest non-fractional digit, whichever is larger.
        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
            delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

        // Decrease the approximation until it is smaller than the remainder.  Note
        // that if it is too large, the product overflows and is negative.
            approxRes = fromNumber(approx),
            approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
        }

        // We know the answer can't be zero... and actually, zero would cause
        // infinite recursion since we would make no progress.
        if (approxRes.isZero())
            approxRes = ONE;

        res = res.add(approxRes);
        rem = rem.sub(approxRem);
    }
    return res;
};

/**
 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.div = LongPrototype.divide;

/**
 * Returns this Long modulo the specified.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);

    // use wasm support if present
    if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    return this.sub(this.div(divisor).mul(divisor));
};

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.mod = LongPrototype.modulo;

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.rem = LongPrototype.modulo;

/**
 * Returns the bitwise NOT of this Long.
 * @returns {!Long}
 */
LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
};

/**
 * Returns the bitwise AND of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.and = function and(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};

/**
 * Returns the bitwise OR of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.or = function or(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};

/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.xor = function xor(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
    else
        return fromBits(0, this.low << (numBits - 32), this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shl = LongPrototype.shiftLeft;

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
    else
        return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
};

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr = LongPrototype.shiftRight;

/**
 * Returns this Long with bits logically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    numBits &= 63;
    if (numBits === 0)
        return this;
    else {
        var high = this.high;
        if (numBits < 32) {
            var low = this.low;
            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
        } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
        else
            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
    }
};

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shru = LongPrototype.shiftRightUnsigned;

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;

/**
 * Converts this Long to signed.
 * @returns {!Long} Signed long
 */
LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned)
        return this;
    return fromBits(this.low, this.high, false);
};

/**
 * Converts this Long to unsigned.
 * @returns {!Long} Unsigned long
 */
LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned)
        return this;
    return fromBits(this.low, this.high, true);
};

/**
 * Converts this Long to its byte representation.
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {!Array.<number>} Byte representation
 */
LongPrototype.toBytes = function toBytes(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
};

/**
 * Converts this Long to its little endian byte representation.
 * @returns {!Array.<number>} Little endian byte representation
 */
LongPrototype.toBytesLE = function toBytesLE() {
    var hi = this.high,
        lo = this.low;
    return [
        lo        & 0xff,
        lo >>>  8 & 0xff,
        lo >>> 16 & 0xff,
        lo >>> 24       ,
        hi        & 0xff,
        hi >>>  8 & 0xff,
        hi >>> 16 & 0xff,
        hi >>> 24
    ];
};

/**
 * Converts this Long to its big endian byte representation.
 * @returns {!Array.<number>} Big endian byte representation
 */
LongPrototype.toBytesBE = function toBytesBE() {
    var hi = this.high,
        lo = this.low;
    return [
        hi >>> 24       ,
        hi >>> 16 & 0xff,
        hi >>>  8 & 0xff,
        hi        & 0xff,
        lo >>> 24       ,
        lo >>> 16 & 0xff,
        lo >>>  8 & 0xff,
        lo        & 0xff
    ];
};

/**
 * Creates a Long from its byte representation.
 * @param {!Array.<number>} bytes Byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {Long} The corresponding Long value
 */
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};

/**
 * Creates a Long from its little endian byte representation.
 * @param {!Array.<number>} bytes Little endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
    return new Long(
        bytes[0]       |
        bytes[1] <<  8 |
        bytes[2] << 16 |
        bytes[3] << 24,
        bytes[4]       |
        bytes[5] <<  8 |
        bytes[6] << 16 |
        bytes[7] << 24,
        unsigned
    );
};

/**
 * Creates a Long from its big endian byte representation.
 * @param {!Array.<number>} bytes Big endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
    return new Long(
        bytes[4] << 24 |
        bytes[5] << 16 |
        bytes[6] <<  8 |
        bytes[7],
        bytes[0] << 24 |
        bytes[1] << 16 |
        bytes[2] <<  8 |
        bytes[3],
        unsigned
    );
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function keyByMultiple(arr, key) {
  var ret = {};
  arr.forEach(function (v) {
    if (v[key] in ret) {
      ret[v[key]].push(v);
    } else {
      ret[v[key]] = [v];
    }
  });
  return ret;
}

function toHex(ar) {
  if (typeof ar === 'string') {
    ar = toByteArray(ar);
  }

  var ret = '';

  for (var i = 0; i < ar.length; i++) {
    if (ar[i] > 255 || ar[i] < 0) throw RangeError("".concat(ar[i], " is not in range [0, 255]"));
    var t = ar[i].toString(16);
    ret += t.length > 1 ? t : '0' + t;
  }

  return ret;
}

function fromHex(str) {
  if (str.length % 2 !== 0) throw Error('Invalid hex');
  var ret = [];

  for (var i = 0, j = 0; j < str.length; i++, j += 2) {
    var v = parseInt(str[j] + str[j + 1], 16);

    if (isNaN(v)) {
      throw Error('Invalid hex');
    }

    ret[i] = v;
  }

  return ret;
}

function toByteArray(str) {
  var ret = [];
  var j = 0;

  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);

    if (c < 0x80) {
      ret[j++] = c;
    } else if (c < 0x800) {
      ret[j++] = 0xc0 | c >> 6;
      ret[j++] = 0x80 | c & 0x3f;
    } else if (c < 0xd800 || c >= 0xe000) {
      ret[j++] = 0xe0 | c >> 12;
      ret[j++] = 0x80 | c >> 6 & 0x3f;
      ret[j++] = 0x80 | c & 0x3f;
    } else {
      // pair
      i++;
      c = 0x10000 + ((c & 0x3ff) << 10 | str.charCodeAt(i) & 0x3ff);
      ret[j++] = 0xf0 | c >> 18;
      ret[j++] = 0x80 | c >> 12 & 0x3f;
      ret[j++] = 0x80 | c >> 6 & 0x3f;
      ret[j++] = 0x80 | c & 0x3f;
    }
  }

  return ret;
}

function fromByteArray(bytes) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : bytes.length;
  if (!bytes) return '';
  var out = [];
  var j = 0;

  for (var i = start; i < end; i++) {
    var c1 = bytes[i];
    if (c1 > 0xff) throw Error('Invalid byte array');

    if (c1 < 0x80) {
      out[j++] = String.fromCharCode(c1);
    } else if (c1 > 0xbf && c1 < 0xe0) {
      var c2 = bytes[++i];
      out[j++] = String.fromCharCode((c1 & 0x1f) << 6 | c2 & 0x3f);
    } else if (c1 > 0xdf && c1 < 0xf0) {
      var _c = bytes[++i];
      var c3 = bytes[++i];
      out[j++] = String.fromCharCode((c1 & 0xf) << 12 | (_c & 0x3f) << 6 | c3 & 0x3f);
    } else {
      // pair
      var _c2 = bytes[++i];
      var _c3 = bytes[++i];
      var c4 = bytes[++i];
      var u = ((c1 & 0x07) << 18 | (_c2 & 0x3f) << 12 | (_c3 & 0x3f) << 6 | c4 & 0x3f) - 0x10000;
      out[j++] = String.fromCharCode(0xd800 | u >> 10);
      out[j++] = String.fromCharCode(0xdc00 | u & 0x3ff);
    }
  }

  return out.join('');
}

module.exports = {
  keyByMultiple: keyByMultiple,
  toByteArray: toByteArray,
  fromByteArray: fromByteArray,
  toHex: toHex,
  fromHex: fromHex
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(0),
    TWO_TO_32 = _require.TWO_TO_32;

var Long = __webpack_require__(1);

var LongBits =
/*#__PURE__*/
function () {
  function LongBits(lo, hi) {
    _classCallCheck(this, LongBits);

    this.lo = lo >>> 0;
    this.hi = hi >>> 0;
  }

  _createClass(LongBits, [{
    key: "toNumber",
    value: function toNumber() {
      var unsigned = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0;
        var hi = ~this.hi >>> 0;

        if (!lo) {
          hi = hi + 1 >>> 0;
        }

        return -(lo + hi * TWO_TO_32);
      }

      return this.lo + this.hi * TWO_TO_32;
    }
  }, {
    key: "toLong",
    value: function toLong(unsigned) {
      return new Long(this.lo, this.hi, unsigned);
    }
  }, {
    key: "zzEncode",
    value: function zzEncode() {
      var mask = this.hi >>> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    }
  }, {
    key: "zzDecode",
    value: function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new LongBits(this.lo, this.hi);
    }
  }], [{
    key: "fromNumber",
    value: function fromNumber(value) {
      if (value === 0) {
        return zero;
      }

      var sign = value < 0;

      if (sign) {
        value = -value;
      }

      var lo = value >>> 0;
      var hi = (value - lo) / TWO_TO_32 >>> 0;

      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;

        if (++lo > TWO_TO_32) {
          lo = 0;

          if (++hi > TWO_TO_32) {
            hi = 0;
          }
        }
      }

      return new LongBits(lo, hi);
    }
  }, {
    key: "from",
    value: function from(value) {
      if (typeof value === 'number') {
        return LongBits.fromNumber(value);
      }

      if (typeof value === 'string') {
        value = Long.fromString(value);
      }

      if (value.low || value.high) {
        return new LongBits(value.low >>> 0, value.high >>> 0);
      } else if (value.lo || value.hi) {
        return new LongBits(value.lo >>> 0, value.hi >>> 0);
      } else {
        return zero;
      }
    }
  }]);

  return LongBits;
}();

var zero = new LongBits(0, 0);

zero.toNumber = function () {
  return 0;
};

zero.zzEncode = zero.zzDecode = function () {
  return this;
};

zero.length = function () {
  return 1;
};

LongBits.zero = zero;
module.exports = LongBits;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Long = __webpack_require__(1);

var _require = __webpack_require__(0),
    PROTOBUF_TYPES = _require.PROTOBUF_TYPES,
    DEFAULT_VALUES = _require.DEFAULT_VALUES;

var _require2 = __webpack_require__(2),
    toByteArray = _require2.toByteArray,
    fromByteArray = _require2.fromByteArray;

var LongBits = __webpack_require__(3);

function inferTypeByValue(value) {
  if (value === null || value === undefined || typeof value === 'number' && isNaN(value)) {
    return null;
  }

  if (typeof Buffer !== 'undefined' && value instanceof Buffer || typeof Uint8Array !== 'undefined' && value instanceof Uint8Array) {
    return 'bytes';
  }

  if (Array.isArray(value)) {
    return 'repeated';
  }

  if (typeof value === 'string') {
    return 'string';
  }

  if (typeof value === 'number') {
    return value % 1 === 0 ? 'int32' : 'float';
  }

  if (typeof value === 'bigint') {
    return 'int64';
  }

  if (typeof value === 'boolean') {
    return 'bool';
  }

  if (value.constructor.name === 'Object') {
    for (var key in value) {
      if (value.hasOwnProperty(key) && key !== 'unpacked') {
        if (key === 'value') {
          return inferTypeByValue(value.value);
        }

        if (PROTOBUF_TYPES.indexOf(key) > -1) {
          return key;
        }

        return 'message';
      }
    }

    return 'message';
  }

  if (value instanceof Long) {
    return value.unsigned ? 'uint64' : 'int64';
  }

  return null;
}

function _coerceInputTo(value, type) {
  if (type === 'message') {
    return jsonToInput(value);
  }

  if (type === 'repeated') {
    var ret = [];

    for (var p = 0; p < value.length; p++) {
      var val = value[p];

      var _type = inferTypeByValue(val);

      if (val && val.constructor.name === 'Object' && _type !== 'message') {
        val = val[_type];
      }

      ret[p] = {
        type: _type,
        value: _coerceInputTo(val, _type)
      };
    }

    return ret;
  }

  if (typeof Buffer !== 'undefined' && value instanceof Buffer || typeof Uint8Array !== 'undefined' && value instanceof Uint8Array) {
    return Array.from(value);
  }

  if ((type === 'int64' || type === 'uint64' || type === 'sint64' || type === 'fixed64') && !(value instanceof Long)) {
    return typeof value === 'number' ? Long.fromNumber(value, type === 'uint64') : typeof value === 'bigint' ? Long.fromString(value.toString(), type === 'uint64') : Long.fromString(value, type === 'uint64');
  }

  if (type === 'int32' || type === 'uint32' || type === 'sint32' || type === 'fixed32') {
    return parseInt(value);
  }

  if (type === 'bytes') {
    if (!Array.isArray(value)) {
      return toByteArray(value);
    }

    return value;
  }

  if (type === 'string') {
    if (Array.isArray(value)) {
      return fromByteArray(value);
    }

    return value;
  }

  if (value && value.constructor.name === 'Object' && type !== 'message') {
    return value[type];
  }

  return value;
}

function jsonToInput(json) {
  if (typeof json === 'string') {
    json = JSON.parse(json);
  }

  var ret = {};
  var unpacked = [];

  for (var j in json) {
    if (json.hasOwnProperty(j)) {
      if (!isNaN(parseInt(j))) {
        if (!ret[j]) {
          ret[j] = [];
        }

        var type = inferTypeByValue(json[j]);
        if (type === null) continue;
        var value = json[j];

        if (value && value.constructor.name === 'Object' && type !== 'message') {
          if (value.unpacked) {
            unpacked[unpacked.length] = j;
          }

          value = 'value' in value ? value.value : value[type];
        }

        value = _coerceInputTo(value, type);

        if (type === 'repeated') {
          for (var i = 0; i < value.length; i++) {
            ret[j][ret[j].length] = value[i];
          }
        } else {
          ret[j][ret[j].length] = {
            type: type,
            value: value
          };
        }
      }
    }
  }

  return {
    fields: ret,
    unpacked: unpacked
  };
}

function inputToJson(msg, constructor) {
  var ret = {};
  var fields = msg.fields;

  for (var key in fields) {
    if (fields.hasOwnProperty(key)) {
      if (!ret[key]) {
        ret[key] = [];
      }

      for (var index = 0; index < fields[key].length; index++) {
        var field = fields[key][index];
        if (field === undefined) continue; // sparse

        var value = field.value;

        if (value instanceof Long) {
          value = value.toString();
        }

        if (value instanceof constructor) {
          value = inputToJson(value, constructor);
        }

        var itype = inferTypeByValue(value);

        if (itype !== field.type) {
          value = _defineProperty({}, field.type, value);
        }

        ret[key][ret[key].length] = value;
      }
    }
  }

  for (var _key in ret) {
    if (ret.hasOwnProperty(_key)) {
      if (ret[_key].length === 1) {
        ret[_key] = ret[_key][0];
      } else if (msg._unpacked[_key]) {
        ret[_key] = {
          unpacked: true,
          value: ret[_key]
        };
      }
    }
  }

  return ret;
}

function outputToJson(msg) {
  var ret = {};
  var fields = msg.fields;

  for (var key in fields) {
    if (fields.hasOwnProperty(key)) {
      if (!ret[key]) {
        ret[key] = [];
      }

      for (var i = 0; i < fields[key].length; i++) {
        var f = fields[key][i];
        var v = f.value;

        if (f.type === 'lengthDelimited') {
          v = msg.data.slice(v.start, v.end);

          try {
            v = outputToJson(msg.message(key, i));
          } catch (e) {
            v = fromByteArray(v);
          }
        }

        if (f.type === 'varint') {
          v = msg._varint(key, i);
        }

        if (v instanceof LongBits) {
          v = v.toLong().toString();
        }

        ret[key][ret[key].length] = v;
      }
    }
  }

  for (var _key2 in msg._knownFields) {
    if (msg._knownFields.hasOwnProperty(_key2) && msg._knownFields[_key2].length) {
      var typ = msg._knownFields[_key2][0];

      if (!(_key2 in ret)) {
        var val = DEFAULT_VALUES[typ];
        if (typeof val === 'number') val += '';
        if (val instanceof LongBits) val = val.toLong();
        if (val instanceof Long) val = val.toString();
        ret[_key2] = [val];
      }
    }
  }

  for (var _key3 in ret) {
    if (ret.hasOwnProperty(_key3) && ret[_key3].length === 1) {
      ret[_key3] = ret[_key3][0];
    }
  }

  return ret;
}

module.exports = {
  jsonToInput: jsonToInput,
  outputToJson: outputToJson,
  inputToJson: inputToJson
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(0),
    TWO_TO_52 = _require.TWO_TO_52,
    TWO_TO_32 = _require.TWO_TO_32,
    TWO_TO_23 = _require.TWO_TO_23,
    TWO_TO_20 = _require.TWO_TO_20,
    MIN_FLOAT = _require.MIN_FLOAT,
    MAX_FLOAT = _require.MAX_FLOAT,
    MIN_DOUBLE = _require.MIN_DOUBLE,
    MAX_DOUBLE = _require.MAX_DOUBLE;

function zigZagDecode(val) {
  var isBigint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!isBigint) {
    return val & 0x1 ? val >> 1 ^ ~0 : val >> 1;
  }

  return val.and(0x1) ? val.shiftRight(1).xor(~0) : val.shiftRight(1);
}

function joinDouble(lo, hi) {
  var sign = (hi >> 31) * 2 + 1;
  var exp = hi >> 20 & 0x7ff;
  var mant = TWO_TO_32 * (hi & 0xfffff) + lo;

  if (exp === 0x7ff) {
    if (mant) {
      return NaN;
    } else {
      return sign * Infinity;
    }
  }

  if (exp === 0) {
    return sign * Math.pow(2, -1074) * mant;
  } else {
    return sign * Math.pow(2, exp - 1075) * (mant + TWO_TO_52);
  }
}

function joinFloat(lo) {
  var sign = (lo >> 31) * 2 + 1;
  var exp = lo >> 23 & 0x7ff;
  var mant = lo & 0x7fffff;

  if (exp === 0xff) {
    if (mant) {
      return NaN;
    } else {
      return sign * Infinity;
    }
  }

  if (exp === 0) {
    return sign * Math.pow(2, -149) * mant;
  } else {
    return sign * Math.pow(2, exp - 150) * (mant + TWO_TO_23);
  }
}

function splitFloat(value) {
  var sign = value < 0 ? 1 : 0;

  if (sign) {
    value = -value;
  }

  var exp;
  var mant;

  if (value === 0) {
    return 1 / value < 0 ? 0x80000000 : 0;
  }

  if (isNaN(value)) {
    return 0x7FFFFFFF;
  }

  if (value > MAX_FLOAT) {
    return (sign << 31 | 0x7F800000) >>> 0;
  }

  if (value < MIN_FLOAT) {
    mant = Math.round(value / Math.pow(2, -149));
    return (sign << 31 | mant) >>> 0;
  }

  exp = Math.floor(Math.log(value) / Math.LN2);
  mant = value * Math.pow(2, -exp);
  mant = Math.round(mant * TWO_TO_23) & 0x7FFFFF;
  return (sign << 31 | exp + 127 << 23 | mant) >>> 0;
}

function splitDouble(value) {
  var sign = value < 0 ? 1 : 0;

  if (sign) {
    value = -value;
  }

  var exp;
  var mant;
  var mantHigh;
  var mantLow;

  if (value === 0) {
    return {
      hi: 1 / value < 0 ? 0x80000000 : 0,
      lo: 0
    };
  }

  if (isNaN(value)) {
    return {
      hi: 0x7FFFFFFF,
      lo: 0xFFFFFFFF
    };
  }

  if (value > MAX_DOUBLE) {
    return {
      hi: (sign << 31 | 0x7FF00000) >>> 0,
      lo: 0
    };
  }

  if (value < MIN_DOUBLE) {
    mant = value / Math.pow(2, -149);
    mantHigh = value / TWO_TO_32;
    return {
      hi: (sign << 31 | mantHigh) >>> 0,
      lo: mant >>> 0
    };
  }

  var maxDoubleExponent = 1023;
  var minDoubleExponent = -1022;
  var x = value;
  exp = 0;

  if (x >= 2) {
    while (x >= 2 && exp < maxDoubleExponent) {
      exp++;
      x = x / 2;
    }
  } else {
    while (x < 1 && exp > minDoubleExponent) {
      x = x * 2;
      exp--;
    }
  }

  mant = value * Math.pow(2, -exp);
  mantHigh = mant * TWO_TO_20 & 0xFFFFF;
  mantLow = mant * TWO_TO_52 >>> 0;
  return {
    hi: (sign << 31 | exp + 1023 << 20 | mantHigh) >>> 0,
    lo: mantLow
  };
}

module.exports = {
  splitDouble: splitDouble,
  splitFloat: splitFloat,
  joinDouble: joinDouble,
  joinFloat: joinFloat,
  zigZagDecode: zigZagDecode
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var LongBits = __webpack_require__(3);

function lazyReadVarint() {
  var offset = this.offset;

  while (this.data[this.offset++] & 0x80) {}

  return offset;
}

function readVarint(offset, data) {
  var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : data.length;
  var ret = new LongBits(0, 0);
  var i = 0;

  if (length - offset > 4) {
    for (; i < 4; ++i) {
      ret.lo = (ret.lo | (data[offset] & 0x7f) << i * 7) >>> 0;

      if (data[offset++] < 0x80) {
        return ret;
      }
    }

    ret.lo = (ret.lo | (data[offset] & 0x7f) << 28) >>> 0;
    ret.hi = (ret.hi | (data[offset] & 0x7f) >> 4) >>> 0;

    if (data[offset++] < 0x80) {
      return ret;
    }

    i = 0;
  } else {
    for (; i < 3; ++i) {
      if (offset >= length) {
        throw RangeError('Unexpected end while reading varint');
      }

      ret.lo = (ret.lo | (data[offset] & 0x7f) << i * 7) >>> 0;

      if (data[offset++] < 0x80) {
        return ret;
      }
    }

    ret.lo = (ret.lo | (data[offset] & 0x7f) << i * 7) >>> 0;
    return ret;
  }

  if (length - offset > 4) {
    for (; i < 5; ++i) {
      ret.hi = (ret.hi | (data[offset] & 0x7f) << i * 7 + 3) >>> 0;

      if (data[offset++] < 0x80) {
        return ret;
      }
    }
  } else {
    for (; i < 5; ++i) {
      if (offset >= length) {
        throw RangeError('Unexpected end while reading varint');
      }

      ret.hi = (ret.hi | (data[offset] & 0x7f) << i * 7 + 3) >>> 0;

      if (data[offset++] < 0x80) {
        return ret;
      }
    }
  }

  throw Error('Invalid varint encoding');
}

function fullyReadVarint() {
  var offset = lazyReadVarint.call(this);
  return readVarint(offset, this.data, this.length);
}

function readFixed32() {
  return this.data[this.offset++] | this.data[this.offset++] << 8 | this.data[this.offset++] << 16 | this.data[this.offset++] << 24;
}

function readFixed64() {
  var lo = readFixed32.call(this);
  var hi = readFixed32.call(this);
  return new LongBits(lo, hi);
}

function readLengthDelimited() {
  var len = fullyReadVarint.call(this).toNumber(true);
  var start = this.offset;
  return {
    start: start,
    end: this.offset += len,
    length: len
  };
}

module.exports = {
  readVarint: readVarint,
  readFixed32: readFixed32,
  readFixed64: readFixed64,
  readLengthDelimited: readLengthDelimited,
  lazyReadVarint: lazyReadVarint,
  fullyReadVarint: fullyReadVarint
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(0),
    WIRE_TYPES_NAMES = _require.WIRE_TYPES_NAMES;

var _require2 = __webpack_require__(6),
    readFixed32 = _require2.readFixed32,
    readFixed64 = _require2.readFixed64,
    readLengthDelimited = _require2.readLengthDelimited,
    lazyReadVarint = _require2.lazyReadVarint,
    fullyReadVarint = _require2.fullyReadVarint;

var Deserializer =
/*#__PURE__*/
function () {
  function Deserializer(data) {
    _classCallCheck(this, Deserializer);

    if (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer) {
      data = new Uint8Array(data);
    }

    if (!(Array.isArray(data) || typeof Buffer !== 'undefined' && data instanceof Buffer || typeof Uint8Array !== 'undefined' && data instanceof Uint8Array)) {
      throw Error('Input for deserializer must be an array/buffer');
    }

    this.data = data;
    this.offset = 0;
    this.length = data.length;
  }

  _createClass(Deserializer, [{
    key: "parse",
    value: function parse() {
      var ret = [];

      while (this.offset < this.length) {
        var field = this._parseField();

        ret.push(field);
      }

      if (this.offset > this.length) {
        throw Error('Buffer exhausted');
      }

      return ret;
    }
  }, {
    key: "_parseField",
    value: function _parseField() {
      var header = this._parseHeader();

      var type = header.type;
      var key = header.key;
      var start = this.offset;
      var func = {
        0: lazyReadVarint,
        1: readFixed64,
        2: readLengthDelimited,
        5: readFixed32
      }[type];

      if (!func) {
        throw Error('Unknown wire type: ' + type);
      }

      var value = func.call(this);
      return {
        key: key,
        value: value,
        type: WIRE_TYPES_NAMES[type]
      };
    }
  }, {
    key: "_parseHeader",
    value: function _parseHeader() {
      var value = fullyReadVarint.call(this).toNumber(true);
      return {
        type: value & 0x07,
        key: value >> 3
      };
    }
  }]);

  return Deserializer;
}();

module.exports = Deserializer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var OutputMessage = __webpack_require__(9);

var InputMessage = __webpack_require__(10);

var Deserializer = __webpack_require__(7);

var ja = __webpack_require__(4);

var utils = __webpack_require__(2);

var parse = function parse(v) {
  return new OutputMessage(v, new Deserializer(v).parse());
};

var create = function create() {
  return new InputMessage();
};

function _prepareJsonInput(ip, j) {
  for (var key in j.fields) {
    if (j.fields.hasOwnProperty(key)) {
      for (var i = 0; i < j.fields[key].length; i++) {
        if (j.fields[key][i].type === 'message') {
          var _ip = new InputMessage();

          j.fields[key][i].value = _prepareJsonInput(_ip, j.fields[key][i].value);
        }
      }
    }
  }

  ip.unpacked(j.unpacked);
  ip.fields = j.fields;
  return ip;
}

var fromJson = function fromJson(j) {
  var ip = new InputMessage();
  var data = ja.jsonToInput(j);
  ip = _prepareJsonInput(ip, data);
  return ip;
};

var fromHex = function fromHex(h) {
  return parse(utils.fromHex(h));
};

module.exports = {
  OutputMessage: OutputMessage,
  InputMessage: InputMessage,
  parse: parse,
  fromHex: fromHex,
  create: create,
  fromJson: fromJson
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(5),
    joinDouble = _require.joinDouble,
    joinFloat = _require.joinFloat,
    zigZagDecode = _require.zigZagDecode;

var _require2 = __webpack_require__(2),
    keyByMultiple = _require2.keyByMultiple,
    fromByteArray = _require2.fromByteArray,
    toHex = _require2.toHex;

var _require3 = __webpack_require__(0),
    VARINT_TYPES = _require3.VARINT_TYPES,
    PACKABLE_TYPES = _require3.PACKABLE_TYPES;

var _require4 = __webpack_require__(6),
    readVarint = _require4.readVarint,
    readFixed32 = _require4.readFixed32,
    readFixed64 = _require4.readFixed64,
    lazyReadVarint = _require4.lazyReadVarint;

var Deserializer = __webpack_require__(7);

var LongBits = __webpack_require__(3);

var Long = __webpack_require__(1);

var _require5 = __webpack_require__(4),
    outputToJson = _require5.outputToJson;

var OutputMessage =
/*#__PURE__*/
function () {
  function OutputMessage(data) {
    var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, OutputMessage);

    this.data = data;
    this.fields = keyByMultiple(fields, 'key');
    this._cache = {};
    this._knownFields = {};
  }

  _createClass(OutputMessage, [{
    key: "_assertHas",
    value: function _assertHas(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var has = this.has(key, index);

      if (!has) {
        this._throwHas(key, index);
      }

      return has;
    }
  }, {
    key: "_checkType",
    value: function _checkType(key, index, type) {
      var sub = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      this._assertHas(key, index); // check for sub type


      if (sub) {
        if (key in this._knownFields && (this._knownFields[key].indexOf('any') > -1 || this._knownFields[key].indexOf(type) > -1)) {
          return true;
        } else {
          return key in this._knownFields ? this._knownFields[key].indexOf(type) > -1 : true;
        }
      }

      return type === this._typeToWireType(this.type(key, index));
    }
  }, {
    key: "_assertType",
    value: function _assertType(key, index, type) {
      var sub = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (!this._checkType(key, index, type, sub)) {
        throw Error("Field ".concat(key, " is not of type ").concat(type));
      }

      return true;
    }
  }, {
    key: "_cached",
    value: function _cached(func, key, index, getter) {
      var tag = "".concat(func, "(").concat(key, ";").concat(index, ")");

      if (!(tag in this._cache)) {
        this._cache[tag] = getter();
      }

      return this._cache[tag];
    }
  }, {
    key: "_throwHas",
    value: function _throwHas(key, index) {
      throw Error("Object does not have ".concat(key, ":").concat(index, " field"));
    }
  }, {
    key: "_typeToWireType",
    value: function _typeToWireType(type) {
      if (VARINT_TYPES.indexOf(type) > -1) {
        return 'varint';
      }

      if (type === 'fixed32' || type === 'fixed64') return type;
      return 'lengthDelimited';
    }
  }, {
    key: "known",
    value: function known() {
      var _this = this;

      for (var _len = arguments.length, fields = new Array(_len), _key = 0; _key < _len; _key++) {
        fields[_key] = arguments[_key];
      }

      fields.forEach(function (it) {
        if (typeof it === 'number') {
          _this._knownFields[it] = ['any'];
        } else if (Array.isArray(it)) {
          _this.known.apply(_this, _toConsumableArray(it));
        } else if (_typeof(it) === 'object') {
          for (var key in it) {
            if (it.hasOwnProperty(key)) {
              var val = it[key];
              if (!Array.isArray(val)) val = [val];
              _this._knownFields[key] = val;
            }
          }
        }
      });
      return this;
    }
  }, {
    key: "has",
    value: function has(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var ignoreKnown = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var has = key in this.fields && index in this.fields[key];

      if (!ignoreKnown && key in this._knownFields) {
        return true;
      }

      return has;
    }
  }, {
    key: "length",
    value: function length(key) {
      return this._assertHas(key) && this.fields[key].length;
    }
  }, {
    key: "type",
    value: function type(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (this.has(key, index, true)) {
        return this.fields[key][index].type;
      } else if (key in this._knownFields) {
        return this._knownFields[key][0];
      } else {
        this._throwHas(key, index);
      }
    }
  }, {
    key: "array",
    value: function array(key, type) {
      if (this.has(key, 0, true)) {
        var ret = [];
        var i = 0;

        for (var k = 0; k < this.length(key); k++) {
          ret[i++] = this.get(key, type, k);
        }

        return ret;
      } else if (key in this._knownFields) {
        return [];
      } else {
        this._throwHas(key, 0);
      }
    }
  }, {
    key: "iter",
    value: function iter(key, type) {
      if (this.has(key, 0, true)) {
        var index = 0;
        var self = this;
        var length = this.length(key);
        var ret = {
          next: function next() {
            if (index >= length) {
              return {
                done: true,
                value: undefined
              };
            }

            var value = self.get(key, type, index);
            index += 1;
            return {
              value: value,
              done: false
            };
          }
        };

        if (typeof Symbol !== 'undefined' && Symbol.iterator) {
          ret[Symbol.iterator] = function () {
            return ret;
          };
        }

        return ret;
      } else if (key in this._knownFields) {
        return {
          next: function next() {
            return {
              value: undefined,
              done: true
            };
          }
        };
      } else {
        this._throwHas(key, 0);
      }
    }
  }, {
    key: "get",
    value: function get(key, type) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return this._assertHas(key, index) && this[type].call(this, key, index);
    }
  }, {
    key: "string",
    value: function string(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'lengthDelimited');

      this._assertType(key, index, 'string', true);

      if (!this.has(key, index, true)) {
        return '';
      }

      var it = this.fields[key][index].value;

      if (!('_string' in this.fields[key][index])) {
        this.fields[key][index]._string = fromByteArray(this.data, it.start, it.end);
      }

      return this.fields[key][index]._string;
    }
  }, {
    key: "bytes",
    value: function bytes(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'lengthDelimited');

      this._assertType(key, index, 'bytes', true);

      if (!this.has(key, index, true)) {
        return [];
      }

      if (!('_buffer' in this.fields[key][index])) {
        var it = this.fields[key][index].value;
        this.fields[key][index]._buffer = this.data.slice(it.start, it.end);
      }

      return this.fields[key][index]._buffer;
    }
  }, {
    key: "hex",
    value: function hex(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return toHex(this.bytes(key, index));
    }
  }, {
    key: "message",
    value: function message(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'lengthDelimited');

      this._assertType(key, index, 'message', true);

      if (!this.has(key, index, true)) {
        return new OutputMessage();
      }

      if (!('_message' in this.fields[key][index])) {
        var it = this.fields[key][index].value;
        var deserializer = new Deserializer(this.data);
        deserializer.offset = it.start;
        deserializer.length = it.end;
        this.fields[key][index]._message = new OutputMessage(this.data, deserializer.parse());
      }

      return this.fields[key][index]._message;
    }
  }, {
    key: "fixed32",
    value: function fixed32(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'fixed32');

      if (!this.has(key, index, true)) {
        return 0;
      }

      return this.fields[key][index].value >>> 0;
    }
  }, {
    key: "fixed64",
    value: function fixed64(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'fixed64');

      if (!this.has(key, index, true)) {
        return Long(0, 0);
      }

      return this.fields[key][index].value.toLong(false);
    }
  }, {
    key: "float",
    value: function float(key) {
      var _this2 = this;

      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'float', true);

      return this._cached('float', key, index, function () {
        return joinFloat(_this2.fixed32(key, index));
      });
    }
  }, {
    key: "double",
    value: function double(key) {
      var _this3 = this;

      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'fixed64');

      this._assertType(key, index, 'float', true);

      return this._cached('double', key, index, function () {
        return joinDouble(_this3.fields[key][index].value.lo, _this3.fields[key][index].value.hi);
      });
    }
  }, {
    key: "_varint",
    value: function _varint(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (!this.has(key, index, true)) {
        return LongBits.zero;
      }

      this._assertType(key, index, 'varint');

      if (!('_varint' in this.fields[key][index])) {
        var offset = this.fields[key][index].value;
        this.fields[key][index]._varint = readVarint(offset, this.data);
      }

      return this.fields[key][index]._varint;
    }
  }, {
    key: "int32",
    value: function int32(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'int32', true);

      return this._varint(key, index).toNumber();
    }
  }, {
    key: "int64",
    value: function int64(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'int64', true);

      return this._varint(key, index, true).toLong(false);
    }
  }, {
    key: "uint32",
    value: function uint32(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'uint32', true);

      return this._varint(key, index).toNumber(true);
    }
  }, {
    key: "uint64",
    value: function uint64(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'uint64', true);

      return this._varint(key, index).toLong(true);
    }
  }, {
    key: "bool",
    value: function bool(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'bool', true);

      return !!this._varint(key, index).toNumber();
    }
  }, {
    key: "sint32",
    value: function sint32(key) {
      var _this4 = this;

      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'sint32', true);

      return this._cached('sint32', key, index, function () {
        return zigZagDecode(_this4.int32(key, index));
      });
    }
  }, {
    key: "sint64",
    value: function sint64(key) {
      var _this5 = this;

      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'sint64', true);

      return this._cached('sint64', key, index, function () {
        return _this5._varint(key, index).clone().zzDecode().toLong();
      });
    }
  }, {
    key: "sfixed32",
    value: function sfixed32(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'sfixed32', true);

      if (!this.has(key, index, true)) {
        return 0;
      }

      return this.fields[key][index].value;
    }
  }, {
    key: "sfixed64",
    value: function sfixed64(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this._assertType(key, index, 'fixed64');

      if (!this.has(key, index, true)) {
        return Long(0, 0);
      }

      this._assertType(key, index, 'sfixed64', true);

      return this.fixed64(key, index);
    }
  }, {
    key: "_processPacked",
    value: function _processPacked(type, item, output) {
      var state = {
        offset: item.value.start,
        data: this.data,
        length: item.value.end
      };

      if (VARINT_TYPES.indexOf(type) > -1) {
        while (state.offset < state.length) {
          var value = lazyReadVarint.apply(state);
          output.push({
            value: value,
            type: 'varint'
          });
        }
      } else if (type === 'fixed32' || type === 'float' || type === 'sfixed32' || type === 'fixed64' || type === 'double' || type === 'sfixed64') {
        while (state.offset < state.length) {
          var val = (type === 'fixed32' || type === 'float' || type === 'sfixed32' ? readFixed32 : readFixed64).apply(state);
          output.push({
            value: val,
            type: type === 'fixed32' || type === 'float' || type === 'sfixed32' ? 'fixed32' : 'fixed64'
          });
        }
      }
    }
  }, {
    key: "repeated",
    value: function repeated(key, type) {
      var lengthDelimitedIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

      this._assertHas(key);

      if (!this.has(key, 0, true)) {
        return [];
      }

      if (PACKABLE_TYPES.indexOf(type) === -1) return; // forwards-compatibility

      var newFields = [];

      if (lengthDelimitedIndex !== -1) {
        var item = this.fields[key][lengthDelimitedIndex];

        if (item.type === 'lengthDelimited') {
          this._processPacked(type, item, newFields);
        }
      } else {
        for (var i = 0; i < this.fields[key].length; i++) {
          var _item = this.fields[key][i];

          if (_item.type === 'lengthDelimited') {
            this._processPacked(type, _item, newFields);
          } else {
            // data is not packed
            newFields.push(_item);
          }
        }
      }

      this.fields[key] = newFields;
      return this;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return outputToJson(this);
    }
  }]);

  return OutputMessage;
}();

if (typeof Symbol !== 'undefined') {
  OutputMessage.prototype[Symbol.for('nodejs.util.inspect.custom')] = OutputMessage.prototype.toJSON;
}

module.exports = OutputMessage;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Long = __webpack_require__(1);

var _require = __webpack_require__(0),
    MIN_INT32 = _require.MIN_INT32,
    MIN_INT64 = _require.MIN_INT64,
    MIN_UINT32 = _require.MIN_UINT32,
    MIN_UINT64 = _require.MIN_UINT64,
    MAX_INT32 = _require.MAX_INT32,
    MAX_INT64 = _require.MAX_INT64,
    MAX_UINT32 = _require.MAX_UINT32,
    MAX_UINT64 = _require.MAX_UINT64;

var Serializer = __webpack_require__(11);

var ja = __webpack_require__(4);

var _require2 = __webpack_require__(2),
    _toHex = _require2.toHex;
/**
 * @class protoflex.InputMessage
 */


var InputMessage =
/*#__PURE__*/
function () {
  function InputMessage() {
    _classCallCheck(this, InputMessage);

    this.fields = {};
    this._parent = null;
    this._unpacked = {};
  }

  _createClass(InputMessage, [{
    key: "has",
    value: function has(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return key in this.fields && index in this.fields[key];
    }
  }, {
    key: "get",
    value: function get(key) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (!this.has(key)) {
        throw Error("Message does not have ".concat(key, ":").concat(index));
      }

      if (typeof type === 'number' && index === 0) {
        index = type;
        type = null;
      }

      var it = this.fields[key][index];

      if (type !== null && type !== it.type) {
        throw Error("".concat(key, ":").concat(index, " is not ").concat(type));
      } else {
        return it.value;
      }
    }
  }, {
    key: "array",
    value: function array(key) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!this.has(key)) {
        throw Error("Message does not have ".concat(key));
      }

      var ret = [];

      for (var i = 0; i < this.fields[key].length; i++) {
        var it = this.fields[key][i];

        if (it === undefined) {
          ret[i] = undefined;
        } else if (type !== null && it.type !== type) {
          throw Error("".concat(key, ":").concat(i, " is not ").concat(type));
        } else {
          ret[i] = it.value;
        }
      }

      return ret;
    }
  }, {
    key: "iter",
    value: function iter(key) {
      var editable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!this.has(key)) {
        throw Error("Message does not have ".concat(key));
      }

      var index = 0;
      var self = this;
      var length = self.fields[key].length;
      var ret = {
        next: function next() {
          if (index >= length) {
            return {
              done: true,
              value: undefined
            };
          }

          if (self.fields[key].length !== length) {
            throw Error('Data size changed during iteration');
          }

          var typ = self.fields[key][index].type;

          if (type !== null && typ !== type) {
            throw Error("".concat(key, ":").concat(index, " is not ").concat(type));
          }

          var value;

          if (editable) {
            var ind = index;
            value = {
              get: function get() {
                return self.fields[key][ind].value;
              },
              set: function set(v) {
                self[typ](key, v, ind);
              }
            };
          } else {
            value = self.fields[key][index].value;
          }

          index += 1;
          return {
            value: value,
            done: false
          };
        }
      };

      if (typeof Symbol !== 'undefined' && Symbol.iterator) {
        ret[Symbol.iterator] = function () {
          return ret;
        };
      }

      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (key === null) {
        this.fields = {};
      } else if (key in this.fields) {
        if (index !== null) {
          if (index < 0) {
            index = this.fields[key].length + index;
          }

          if (index < 0 || index >= this.fields[key].length) {
            throw RangeError('Out of array bounds');
          }

          this.fields[key].splice(index, 1);
        } else {
          this.fields[key] = [];
        }
      }

      return this;
    }
  }, {
    key: "append",
    value: function append(key, value) {
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!this.has(key)) {
        if (type === null) {
          throw Error('First item in array must have type set explicitly');
        }

        this._addField(key, 0, value, type);
      } else {
        var items = this.fields[key];
        var last = items[items.length - 1];

        if (type !== null && type !== last.type) {
          throw Error("Previous item(s) in array have type ".concat(last.type, ", not ").concat(type));
        }

        if (type === null) type = last.type;

        this._addField(key, items.length, value, type);
      }

      return this;
    }
  }, {
    key: "string",
    value: function string(key, value) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      this._addField(key, index, value + '', 'string');

      return this;
    }
  }, {
    key: "bytes",
    value: function bytes(key, value) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (Array.isArray(value) || typeof Buffer !== 'undefined' && value instanceof Buffer) {
        this._addField(key, index, Array.from(value), 'bytes');

        return this;
      }

      throw Error("".concat(value ? value.constructor.name : value, " cannot be cast to bytes."));
    }
  }, {
    key: "bool",
    value: function bool(key, value) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      this._addField(key, index, !!value, 'bool');

      return this;
    }
  }, {
    key: "float",
    value: function float(key, value) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      this._addField(key, index, value, 'float');

      return this;
    }
  }, {
    key: "double",
    value: function double(key, value) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      this._addField(key, index, value, 'double');

      return this;
    }
  }, {
    key: "fixed32",
    value: function fixed32(key, value) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      this._addField(key, index, value, 'fixed32');

      return this;
    }
  }, {
    key: "sfixed32",
    value: function sfixed32(key, value) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      this._addField(key, index, value, 'sfixed32');

      return this;
    }
  }, {
    key: "fixed64",
    value: function fixed64(key, value) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (!(value instanceof Long)) {
        value = Long.fromValue(value);
      }

      this._addField(key, index, value, 'fixed64');

      return this;
    }
  }, {
    key: "sfixed64",
    value: function sfixed64(key, value) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (!(value instanceof Long)) {
        value = Long.fromValue(value);
      }

      this._addField(key, index, value, 'sfixed64');

      return this;
    }
  }, {
    key: "message",
    value: function message(key) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var msg = new InputMessage();
      msg._parent = this;

      this._addField(key, index, msg, 'message');

      return msg;
    }
  }, {
    key: "parent",
    value: function parent() {
      return this._parent;
    }
  }, {
    key: "end",
    value: function end() {
      if (this._parent === null) {
        throw Error('Root doesn\'t have parent');
      }

      return this._parent;
    }
  }, {
    key: "unpacked",
    value: function unpacked() {
      for (var _len = arguments.length, fields = new Array(_len), _key = 0; _key < _len; _key++) {
        fields[_key] = arguments[_key];
      }

      for (var i = 0; i < fields.length; i++) {
        if (Array.isArray(fields[i])) {
          this.unpacked.apply(this, _toConsumableArray(fields[i]));
        } else {
          this._unpacked[fields[i]] = 1;
        }
      }

      return this;
    }
  }, {
    key: "_addField",
    value: function _addField(key, index, value, type) {
      if (!(key in this.fields)) {
        this.fields[key] = [];
      }

      if (Array.isArray(value) && type !== 'bytes') {
        if (index !== 0) {
          throw Error('index != 0 when inserting multiple values');
        }

        this.fields[key] = value.map(function (it) {
          return {
            type: type,
            value: it
          };
        });
      } else {
        this.fields[key][index] = {
          value: value,
          type: type
        };
      }
    }
  }, {
    key: "toWire",
    value: function toWire() {
      return new Serializer(this).run();
    }
  }, {
    key: "serialize",
    value: function serialize() {
      return this.toWire();
    }
  }, {
    key: "toHex",
    value: function toHex() {
      return _toHex(this.toWire());
    }
  }, {
    key: "toBuffer",
    value: function toBuffer() {
      if (typeof Buffer === 'undefined') {
        throw Error('Buffer is not supported in current environment');
      }

      return Buffer.from(this.toWire());
    }
  }, {
    key: "toUint8Array",
    value: function toUint8Array() {
      if (typeof Uint8Array === 'undefined') {
        throw Error('Uint8Array is not supported in current environment');
      }

      return new Uint8Array(this.toWire());
    }
  }, {
    key: "toArrayBuffer",
    value: function toArrayBuffer() {
      return this.toUint8Array().buffer;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return ja.inputToJson(this, InputMessage);
    }
  }]);

  return InputMessage;
}(); // varints


InputMessage._varints = [{
  name: 'int32',
  from: MIN_INT32,
  to: MAX_INT32
}, {
  name: 'int64',
  from: MIN_INT64,
  to: MAX_INT64,
  long: true
}, {
  name: 'uint32',
  from: MIN_UINT32,
  to: MAX_UINT32
}, {
  name: 'uint64',
  from: MIN_UINT64,
  to: MAX_UINT64,
  long: true,
  unsigned: true
}, {
  name: 'sint32',
  from: MIN_INT32,
  to: MAX_INT32
}, {
  name: 'sint64',
  from: MIN_INT64,
  to: MAX_INT64,
  long: true
}];

InputMessage._varints.forEach(function (item) {
  InputMessage.prototype[item.name] = function _addVarintField(key, value) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (typeof value === 'bigint') {
      value = value.toString(10);
    }

    if (typeof value === 'string') {
      value = item.long ? Long.fromString(value, item.unsigned) : parseInt(value, 10);
    }

    if (item.long) {
      if (!(value instanceof Long)) {
        value = Long.fromNumber(value, item.unsigned);
      }
    } else if (value < item.from || value > item.to) {
      throw RangeError("".concat(value, " is outside ").concat(item.name, " range."));
    }

    this._addField(key, index, value, item.name);

    return this;
  };
});

if (typeof Symbol !== 'undefined') {
  InputMessage.prototype[Symbol.for('nodejs.util.inspect.custom')] = InputMessage.prototype.toJSON;
}

module.exports = InputMessage;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(12),
    writeNumberVarint = _require.writeNumberVarint,
    writeLongVarint = _require.writeLongVarint,
    writeFixed64 = _require.writeFixed64,
    writeFixed32 = _require.writeFixed32,
    writeLengthDelimited = _require.writeLengthDelimited;

var _require2 = __webpack_require__(2),
    toByteArray = _require2.toByteArray;

var _require3 = __webpack_require__(5),
    splitFloat = _require3.splitFloat,
    splitDouble = _require3.splitDouble;

var _require4 = __webpack_require__(0),
    WIRE_TYPES = _require4.WIRE_TYPES,
    VARINT_TYPES = _require4.VARINT_TYPES;

var Long = __webpack_require__(1);

var LongBits = __webpack_require__(3);

var writers = {
  varint: writeLongVarint,
  fixed32: writeFixed32,
  fixed64: writeFixed64,
  lengthDelimited: writeLengthDelimited
};

var Serializer =
/*#__PURE__*/
function () {
  function Serializer(msg) {
    _classCallCheck(this, Serializer);

    this.msg = msg;
    this.data = [];
    this.pos = 0;
  }

  _createClass(Serializer, [{
    key: "_getPrimitiveType",
    value: function _getPrimitiveType(type) {
      if (VARINT_TYPES.indexOf(type) > -1) {
        return 'varint';
      }

      if (type === 'fixed32' || type === 'fixed64') {
        return type;
      }

      if (type === 'float' || type === 'sfixed32') {
        return 'fixed32';
      }

      if (type === 'double' || type === 'sfixed64') {
        return 'fixed64';
      }

      if (type === 'string' || type === 'bytes' || type === 'message') {
        return 'lengthDelimited';
      }

      throw Error("Can't find primitive for ".concat(type));
    }
  }, {
    key: "_coerceTo",
    value: function _coerceTo(field, type) {
      var value = field.value;

      if (type === 'lengthDelimited') {
        switch (field.type) {
          case 'message':
            return new Serializer(value).run();

          case 'string':
            return toByteArray(value);

          case 'bytes':
          case 'lengthDelimited':
            return field.value;

          default:
            throw Error("".concat(field.type, " cannot be coerced to ").concat(type));
        }
      }

      if (field.type === 'sint32' || field.type === 'sint64') {
        return LongBits.from(value).zzEncode();
      }

      if (field.type === 'float') {
        return splitFloat(value);
      }

      if (field.type === 'double') {
        return splitDouble(value);
      }

      if (field.type === 'bool' && type === 'varint') {
        return !!field.value;
      }

      return field.value;
    }
  }, {
    key: "_coerce",
    value: function _coerce(field) {
      var type = this._getPrimitiveType(field.type);

      return {
        type: type,
        value: this._coerceTo(field, type)
      };
    }
  }, {
    key: "_preProcess",
    value: function _preProcess() {
      var ret = [];
      var packed = {}; // temp storage for further packing repeateds

      var j = 0;

      for (var i in this.msg.fields) {
        if (this.msg.fields.hasOwnProperty(i)) {
          var vals = this.msg.fields[i];

          for (var k = 0; k < vals.length; k++) {
            var field = vals[k];
            if (field === undefined) continue; // sparse

            field = this._coerce(field);
            var _field = field,
                type = _field.type,
                value = _field.value;

            if (type === 'lengthDelimited' && value.length === 0) {
              // l-delim has 0 length, thus skipping.
              continue;
            }

            if ((type === 'varint' || type === 'fixed32' || type === 'fixed64') && !this.msg._unpacked[i]) {
              // packing this boi
              if (!(i in packed)) {
                packed[i] = [];
              }

              packed[i].push(field);
            } else {
              ret[j++] = {
                type: type,
                value: value,
                key: i
              };
            }
          }
        }
      } // second pass for packed


      for (var _i in packed) {
        if (packed.hasOwnProperty(_i)) {
          if (packed[_i].length > 1) {
            var obj = {
              data: [],
              pos: 0
            };

            for (var _k = 0; _k < packed[_i].length; _k++) {
              var _packed$_i$_k = packed[_i][_k],
                  _type = _packed$_i$_k.type,
                  _value = _packed$_i$_k.value;

              if (_type === 'varint' && typeof _value === 'number') {
                writeNumberVarint.call(obj, _value);
              } else {
                var writer = writers[_type];
                writer.call(obj, _value);
              }
            }

            ret[j++] = {
              key: _i,
              type: 'lengthDelimited',
              value: obj.data
            };
          } else {
            var _packed$_i$ = packed[_i][0],
                _type2 = _packed$_i$.type,
                _value2 = _packed$_i$.value;
            ret[j++] = {
              type: _type2,
              value: _value2,
              key: _i
            };
          }
        }
      }

      return ret;
    }
  }, {
    key: "run",
    value: function run() {
      var preprocessed = this._preProcess();

      for (var i = 0; i < preprocessed.length; i++) {
        var _preprocessed$i = preprocessed[i],
            key = _preprocessed$i.key,
            type = _preprocessed$i.type,
            value = _preprocessed$i.value;

        if (!value || value.length === 0) {
          continue;
        } // header


        writeNumberVarint.call(this, key * 8 + WIRE_TYPES[type]);

        if (type === 'varint' && typeof value === 'number') {
          writeNumberVarint.call(this, value);
        } else {
          var writer = writers[type];
          writer.call(this, value);
        }
      }

      return this.data;
    }
  }]);

  return Serializer;
}();

module.exports = Serializer;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Long = __webpack_require__(1);

var LongBits = __webpack_require__(3);

function writeNumberVarint(val) {
  if (val === 0) {
    this.data[this.pos] = val;
  }

  if (val < 0) {
    // filling 9 bytes
    for (var i = 0; i < 9; i++) {
      this.data[this.pos++] = val & 0x7f | 0x80;
      val >>= 7;
    } // and 10th byte: sign


    this.data[this.pos++] = 0x1;
  } else {
    while (val > 127) {
      this.data[this.pos++] = val & 0x7f | 0x80;
      val >>>= 7;
    }

    this.data[this.pos++] = val;
  }
}

function writeLongVarint(val) {
  if (val instanceof Long) {
    val = LongBits.from(val);
  }

  while (val.hi) {
    this.data[this.pos++] = val.lo & 127 | 128;
    val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
    val.hi >>>= 7;
  }

  while (val.lo > 0x7f) {
    this.data[this.pos++] = val.lo & 127 | 128;
    val.lo = val.lo >>> 7;
  }

  this.data[this.pos++] = val.lo;
}

function writeFixed32(val) {
  this.data[this.pos++] = val & 0xff;
  this.data[this.pos++] = val >>> 8 & 0xff;
  this.data[this.pos++] = val >>> 16 & 0xff;
  this.data[this.pos++] = val >>> 24 & 0xff;
}

function writeFixed64(val) {
  var bits = LongBits.from(val);
  writeFixed32.call(this, bits.lo);
  writeFixed32.call(this, bits.hi);
}

function writeLengthDelimited(val) {
  writeNumberVarint.call(this, val.length);

  for (var i = 0; i < val.length; i++) {
    this.data[this.pos++] = val[i];
  }
}

module.exports = {
  writeLongVarint: writeLongVarint,
  writeNumberVarint: writeNumberVarint,
  writeFixed32: writeFixed32,
  writeFixed64: writeFixed64,
  writeLengthDelimited: writeLengthDelimited
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=protoflex.js.map