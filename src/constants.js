const VARINT_TYPES = [
    'int32',
    'int64',
    'uint32',
    'uint64',
    'sint32',
    'sint64',
    'varint',
    'bool',
]
const PACKABLE_TYPES = [
    ...VARINT_TYPES,
    'fixed32',
    'fixed64',
    'sfixed32',
    'sfixed64',
    'double',
    'float',
]

const PROTOBUF_TYPES = [
    'int32',
    'int64',
    'uint32',
    'uint64',
    'sint32',
    'sint64',
    'bool',
    'fixed32',
    'fixed64',
    'sfixed32',
    'sfixed64',
    'bytes',
    'string',
    'message',
    'double',
    'float',
]

const WIRE_TYPES = {
    varint: 0,
    fixed64: 1,
    lengthDelimited: 2,
    fixed32: 5,
}

const WIRE_TYPES_NAMES = [
    'varint',
    'fixed64',
    'lengthDelimited',
    undefined,
    undefined,
    'fixed32',
]
const DEFAULT_VALUES = {
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
    float: 0,
}


module.exports = {
    TWO_TO_20: 1048576,
    TWO_TO_23: 8388608,
    TWO_TO_32: 4294967296,
    TWO_TO_33: 8589934592,
    TWO_TO_52: 4503599627370496,
    TWO_TO_63: 9223372036854775808,
    TWO_TO_64: 18446744073709551616,

    VARINT_TYPES,
    PACKABLE_TYPES,
    WIRE_TYPES,
    WIRE_TYPES_NAMES,
    PROTOBUF_TYPES,
    DEFAULT_VALUES,

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
    MAX_DOUBLE: 1.7976931348623157e+308,
}
