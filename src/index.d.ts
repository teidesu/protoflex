import * as Long from 'long'
import * as utils from './utils'

export = protoflex

declare namespace protoflex {

    type BufferLike = number[] | ArrayLike<number> | ArrayBufferLike | Buffer | Uint8Array

    /** Represents a Protobuf `float` type */
    type PB_Float = 'float'
    /** Represents a Protobuf `double` type */
    type PB_Double = 'double'
    /** Represents a Protobuf `int32` type */
    type PB_Int32 = 'int32'
    /** Represents a Protobuf `int64` type */
    type PB_Int64 = 'int64'
    /** Represents a Protobuf `uint32` type */
    type PB_UInt32 = 'uint32'
    /** Represents a Protobuf `uint64` type */
    type PB_UInt64 = 'uint64'
    /** Represents a Protobuf `sint32` type */
    type PB_SInt32 = 'sint32'
    /** Represents a Protobuf `sint64` type */
    type PB_SInt64 = 'sint64'
    /** Represents a Protobuf `fixed32` type */
    type PB_Fixed32 = 'fixed32'
    /** Represents a Protobuf `sfixed32` type */
    type PB_SFixed32 = 'sfixed32'
    /** Represents a Protobuf `fixed64` type */
    type PB_Fixed64 = 'fixed64'
    /** Represents a Protobuf `sfixed64` type */
    type PB_SFixed64 = 'sfixed64'
    /** Represents a Protobuf `bool` type */
    type PB_Bool = 'bool'
    /** Represents a Protobuf `string` type */
    type PB_String = 'string'
    /** Represents a Protobuf `bytes` type */
    type PB_Bytes = 'bytes'
    /** Represents a Protobuf `message` type */
    type PB_Message = 'message'

    /** Represents types that are available as Number */
    type PB_Number = PB_Int32 | PB_UInt32 | PB_SInt32 | PB_Fixed32 | PB_SFixed32
    /** Represents types that are available as Long */
    type PB_Long = PB_Int64 | PB_UInt64 | PB_SInt64 | PB_Fixed64 | PB_SFixed64
    /** Represents types that are encoded as a varint */
    type PB_Varint = PB_Int32 | PB_UInt32 | PB_SInt32 | PB_Int64 | PB_UInt64 | PB_SInt64 | PB_Bool
    /** Represents numbers that are not integers */
    type PB_Fraction = PB_Float | PB_Double

    /** Common type representing all possible Protobuf types */
    type PB_Type = PB_Float | PB_Double | PB_Int32 | PB_Int64 | PB_UInt32 | PB_UInt64 | PB_SInt32 | PB_SInt64 |
        PB_Fixed32 | PB_SFixed32 | PB_Fixed64 | PB_SFixed64 | PB_Bool | PB_String | PB_Bytes | PB_Message

    type Dict<V> = { [key: string]: V }

    /**
     * Represents a single field
     */
    type MessageField = {
        /**
         * Field type
         */
        type: PB_Type,
        /**
         * Field value
         */
        value: any,
        /**
         * Field key. Is missing when field key is inferred from context (e.g. object key)
         */
        key?: number
    }

    interface IterableReference<T> {
        /**
         * Get value by reference
         */
        get (): T

        /**
         * Set value by reference
         *
         * @param value  New value
         */
        set (value: T): void
    }

    /**
     * Represents a single message that was created by Protoflex and can be
     * serialized to wire.
     */
    class InputMessage {
        constructor ()

        /**
         * Contains all fields ever added to the message.
         */
        fields: Dict<MessageField[]>

        /**
         * Holds a reference to parent message for chaining API
         *
         * @see [[InputMessage.parent]]
         */
        private _parent?: InputMessage

        /**
         * Get a field value by key and optionally index
         *
         * @param key  Field key
         * @param index  Field value
         */
        get (key: number, index?: number): any

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type: PB_Fraction, index?: number): number

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type: PB_Number, index?: number): Long

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type: PB_Bool, index?: number): boolean

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type: PB_Bytes, index?: number): number[]

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type: PB_String, index?: number): string

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type: PB_Message, index?: number): InputMessage

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type?: any, index?: number): any


        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array
         */
        array (key: number, type: PB_Fraction): number[]

        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array
         */
        array (key: number, type: PB_Number): Long[]

        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array
         */
        array (key: number, type: PB_Bool): boolean[]

        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array
         */
        array (key: number, type: PB_Bytes): number[][]

        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array
         */
        array (key: number, type: PB_String): string[]

        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array
         */
        array (key: number, type: PB_Message): InputMessage[]

        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array (if not passed type checking is skipped)
         */
        array (key: number, type?: any): any[]


        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables
         */
        iter (key: number, editable: false, type: PB_Fraction): Iterator<number>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables
         */
        iter (key: number, editable: false, type: PB_Number): Iterator<Long>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables
         */
        iter (key: number, editable: false, type: PB_Bool): Iterator<boolean>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables
         */
        iter (key: number, editable: false, type: PB_Bytes): Iterator<number[]>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables
         */
        iter (key: number, editable: false, type: PB_String): Iterator<string>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables
         */
        iter (key: number, editable: false, type: PB_Message): Iterator<InputMessage>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables (if not passed type checking is skipped)
         */
        iter (key: number, editable?: false, type?: any): Iterator<any>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables
         */
        iter (key: number, editable: true, type: PB_Fraction): Iterator<IterableReference<number>>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables
         */
        iter (key: number, editable: true, type: PB_Number): Iterator<IterableReference<Long>>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables
         */
        iter (key: number, editable: true, type: PB_Bool): Iterator<IterableReference<boolean>>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables
         */
        iter (key: number, editable: true, type: PB_Bytes): Iterator<IterableReference<number[]>>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables
         */
        iter (key: number, editable: true, type: PB_String): Iterator<IterableReference<string>>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables
         */
        iter (key: number, editable: true, type: PB_Message): Iterator<IterableReference<InputMessage>>

        /**
         * Get an iterator of fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param editable  Whether to return items by reference
         * @param type  Expected type of iterables (if not passed type checking is skipped)
         */
        iter (key: number, editable: true, type?: any): Iterator<IterableReference<any>>


        /**
         * Add an item to the end of array at given key with type check
         *
         * @param key Array key
         * @param value Newly added value
         * @param type Newly added item type
         * @returns `this`
         */
        append (key: number, value: number, type: PB_Number | PB_Fraction): InputMessage

        /**
         * Add an item to the end of array at given key with type check
         *
         * @param key Array key
         * @param value Newly added value
         * @param type Newly added item type
         * @returns `this`
         */
        append (key: number, value: Long, type: PB_Long): InputMessage

        /**
         * Add an item to the end of array at given key with type check
         *
         * @param key Array key
         * @param value Newly added value
         * @param type Newly added item type
         * @returns `this`
         */
        append (key: number, value: boolean, type: PB_Bool): InputMessage

        /**
         * Add an item to the end of array at given key with type check
         *
         * @param key Array key
         * @param value Newly added value
         * @param type Newly added item type
         * @returns `this`
         */
        append (key: number, value: number[], type: PB_Bytes): InputMessage

        /**
         * Add an item to the end of array at given key with type check
         *
         * @param key Array key
         * @param value Newly added value
         * @param type Newly added item type
         * @returns `this`
         */
        append (key: number, value: string, type: PB_String): InputMessage

        /**
         * Add an item to the end of array at given key with type check
         *
         * @param key Array key
         * @param value Newly added value
         * @param type Newly added item type
         * @returns `this`
         */
        append (key: number, value: InputMessage, type: PB_Message): InputMessage

        /**
         * Add an item to the end of array at given key with type check
         *
         * @param key Array key
         * @param value Newly added value
         * @param type Newly added item type
         * @returns `this`
         */
        append (key: number, value: any, type: any): InputMessage

        /**
         * Add an item to the end of array at given key without type check
         *
         * @param key Array key
         * @param value Newly added value
         * @returns `this`
         */
        append (key: number, value: any): InputMessage

        /**
         * Clears whole message removing all fields ever added to it
         *
         * @returns `this`
         */
        clear (): InputMessage

        /**
         * Removes message's fields with given key
         *
         * @param key  Message key to be cleared
         * @returns `this`
         */
        clear (key: number): InputMessage

        /**
         * Removes message's field with given key and index
         *
         * @param key  Message key
         * @param index  Key index to be removed
         * @returns `this`
         */
        clear (key: number, index: number): InputMessage

        /**
         * Adds a string field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        string (key: number, value: any, index?: number): InputMessage

        /**
         * Adds a bytes field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        bytes (key: number, value: BufferLike, index?: number): InputMessage

        /**
         * Adds a bool field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        bool (key: number, value: any, index?: number): InputMessage

        /**
         * Adds a int32 field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        int32 (key: number, value: number | string | Long, index?: number): InputMessage

        /**
         * Adds a int64 field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        int64 (key: number, value: number | string | Long, index?: number): InputMessage

        /**
         * Adds a uint32 field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        uint32 (key: number, value: number | string | Long, index?: number): InputMessage

        /**
         * Adds a uint64 field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        uint64 (key: number, value: number | string | Long, index?: number): InputMessage

        /**
         * Adds a sint32 field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        sint32 (key: number, value: number | string | Long, index?: number): InputMessage

        /**
         * Adds a sint64 field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        sint64 (key: number, value: number | string | Long, index?: number): InputMessage

        /**
         * Adds a float field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        float (key: number, value: number, index?: number): InputMessage

        /**
         * Adds a double field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        double (key: number, value: number, index?: number): InputMessage

        /**
         * Adds a fixed32 field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        fixed32 (key: number, value: number, index?: number): InputMessage

        /**
         * Adds a sfixed32 field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        sfixed32 (key: number, value: number, index?: number): InputMessage

        /**
         * Adds a fixed64 field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        fixed64 (key: number, value: number | string | Long, index?: number): InputMessage

        /**
         * Adds a sfixed64 field to resulting message with key `key` and optional index
         *
         * @param key  Key of newly added field
         * @param value  Value of newly added field
         * @param index  Index in array of newly added field.
         * @returns `this`
         */
        sfixed64 (key: number, value: number | string | Long, index?: number): InputMessage

        /**
         * Adds a sub-message field to resulting message with key `key` and optional index.
         * Returns newly created message, parent can be referenced using `.parent()`
         *
         * @see [[InputMessage.parent]]
         * @param key  Key of newly added message
         * @param index  Index of newly added message
         * @returns newly created message
         */
        message (key: number, index?: number): InputMessage

        /**
         * Adds a sub-message field to resulting message with key `key` and optional index.
         * Calls `callback` with the message to allow you to populate it
         *
         * @param key  Key of newly added message
         * @param callback  Callback function for the new message
         * @param index  Index of newly added message
         */
        message (key: number, callback: (msg: InputMessage) => void, index?: number): void

        /**
         * Edit am existing sub-message field in the resulting message with key `key` and optional index.
         * Returns that message, parent can be referenced using `.parent()`.
         *
         * Use this instead of [[get]] when using [[OutputMessage.toInput]]
         *
         * @see [[InputMessage.parent]]
         * @param key  Key of the message field
         * @param index  Index of newly message field
         * @returns message to be edited
         */
        editMessage (key: number, index?: number): InputMessage

        /**
         * Edit am existing sub-message field in the resulting message with key `key` and optional index.
         * Returns that message, parent can be referenced using `.parent()`.
         *
         * Use this instead of [[get]] when using [[OutputMessage.toInput]]
         *
         * @param key  Key of the message field
         * @param callback  Callback function for the message
         * @param index  Index of newly message field
         */
        editMessage (key: number, callback: (msg: InputMessage) => void, index?: number): void

        /**
         * Get message's parent.
         *
         * @returns parent message or null if current message is root.
         */
        parent (): InputMessage | null

        /**
         * Similarly to [[InputMessage.parent]], returns parent message
         * Throws error when message is root.
         *
         * @returns parent message
         */
        end (): InputMessage

        /**
         * By default, all packable fields (varints and fixed32/64) in resulting stream
         * will be packed as seen [here](https://developers.google.com/protocol-buffers/docs/encoding#packed).
         * To provide backwards-compatibility with proto2, some fields can be explicitly
         * declared unpacked.
         *
         * @param fields  Field keys. Varargs accepting either numbers or a number array.
         * @returns `this`
         */
        unpacked (...fields: (number | number[])[]): InputMessage

        /**
         * Serialize [[InputMessage]] to array of bytes
         */
        toWire (): number[]

        /**
         * Serialize [[InputMessage]] to array of bytes, alias to [[InputMessage.toWire]]
         */
        serialize (): number[]

        /**
         * Serialize [[InputMessage]] to [Buffer](https://nodejs.org/api/buffer.html)
         */
        toBuffer (): Buffer

        /**
         * Serialize [[InputMessage]] to
         * [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
         */
        toUint8Array (): Uint8Array

        /**
         * Serialize [[InputMessage]] to
         * [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
         */
        toArrayBuffer (): Uint8Array

        /**
         * Serialize [[InputMessage]] to hexadecimal string
         */
        toHex (): string

        /**
         * Converts [[InputMessage]] to JSON API compatible representation.
         */
        toJSON (): any

        /**
         * Whether to keep default values in the wire
         * (0 for ints, empty for messages/bytes/strings).
         *
         * Defaults to `false`, to minimize resulting length.
         *
         * @param [value=true]  Whether to keep the default
         */
        keepDefault (value?: boolean): this
    }

    type KnownField = number | { [key: string]: PB_Type | PB_Type[] }

    /**
     * Describes a single message that was parsed by Protoflex and
     * can be read.
     */
    class OutputMessage {
        constructor (data: BufferLike, fields?: MessageField[])

        /**
         * Protobuf wire data.
         * Mutation of this array after initialization will lead to unexpected behaviour
         */
        readonly data: BufferLike

        /**
         * Lazily-initialized fields dictionary
         */
        fields: Dict<MessageField[]>

        /**
         * Registers some fields (by key) that are known-for-sure to be present in message.
         * For example, in protobuf `int32` fields with value 0 are not in wire, so this is the only
         * way to get information about those fields.
         * You can use either a number or object with number keys and type(s) as a value.
         * Multiple calls to the function will extend existing mappings for new keys and overwrite for existing
         *
         * Example (assuming `msg` is some [[OutputMessage]]):
         * ```javascript
         * msg.int32(1) // Error: no such field
         * msg.known(1).int32(1) // 0
         * msg.known(1).int64(1) // Long(0)
         * msg.known({ 1: 'int32' }).int32(1) // 0
         * msg.known({ 1: 'int32' }).int64(1) // Error: field is not int64
         * msg.known({ 1: ['int32', 'int64'] }).int32(1) // 0
         * msg.known({ 1: ['int32', 'int64'] }).int64(1) // Long(0)
         * ```
         *
         * @param fields  Information about known fields.
         * @returns `this`
         */
        known (...fields: (KnownField | KnownField[])[]): OutputMessage

        /**
         * Protobuf version 3 declares a new, more efficient way to store repeated
         * elements by storing them in a single length-delimited field.
         * However, this increases the complexity of parsing them — it is not actually
         * possible without knowing the type of items.
         * Thus, to provide possibility of parsing those fields, this method is available.
         * This method only does stuff internally and returns `this`
         *
         * Usage:
         * ```javascript
         * msg.repeated(1, 'int32').array(1, 'int32')
         * ```
         *
         * @param key  Key of field which is supposed to be repeated
         * @param type  Type of repeated field.
         */
        repeated (key: number, type: PB_Type): OutputMessage

        /**
         * Returns whether message has `key` field at `index` index.
         *
         * @param key  Field key
         * @param index  Field index
         * @param ignoreKnown  Whether to ignore known fields (see [[OutputMessage.known]])
         */
        has (key: number, index?: number, ignoreKnown?: boolean): boolean

        /**
         * Returns number of items in message for `key` key.
         * Throws error if key is not present.
         *
         * @param key  Key to lookup
         */
        length (key: number): number

        /**
         * Returns type of field with `key` key and `index` index.
         * **Note:** Message is invalid according to protobuf specs if
         * field has different type at the same key, but it is not in protoflex.
         *
         * @param key
         * @param index
         */
        type (key: number, index?: number): PB_Type


        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array
         */
        array (key: number, type: PB_Number | PB_Fraction): number[]

        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array
         */
        array (key: number, type: PB_Long): Long[]

        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array
         */
        array (key: number, type: PB_Bool): boolean[]

        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array
         */
        array (key: number, type: PB_Bytes): number[][]

        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array
         */
        array (key: number, type: PB_String): string[]

        /**
         * Get an array of fields with given key
         *
         * @param key  Key of items to be added into result
         * @param type  Expected type of items in array
         */
        array (key: number, type: PB_Message): OutputMessage[]

        /**
         * Get an iterator over fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param type  Expected type of iterables
         */
        iter (key: number, type: PB_Number | PB_Fraction): Iterator<number>

        /**
         * Get an iterator over fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param type  Expected type of iterables
         */
        iter (key: number, type: PB_Long): Iterator<Long>

        /**
         * Get an iterator over fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param type  Expected type of iterables
         */
        iter (key: number, type: PB_Bool): Iterator<boolean>

        /**
         * Get an iterator over fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param type  Expected type of iterables
         */
        iter (key: number, type: PB_Bytes): Iterator<number[]>

        /**
         * Get an iterator over fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param type  Expected type of iterables
         */
        iter (key: number, type: PB_String): Iterator<string>

        /**
         * Get an iterator over fields with given key
         *
         * @param key  Key of items to be iterated over
         * @param type  Expected type of iterables
         */
        iter (key: number, type: PB_Message): Iterator<OutputMessage>

        /**
         * Get a field value by key and optionally index
         *
         * @param key  Field key
         * @param index  Field value
         */
        get (key: number, index?: number): any

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type: PB_Number | PB_Fraction, index?: number): number

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type: PB_Long, index?: number): Long

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type: PB_Bool, index?: number): boolean

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type: PB_Bytes, index?: number): number[]

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type: PB_String, index?: number): string

        /**
         * Get a field value by key, type and optionally index
         *
         * @param key  Field key
         * @param type  Field type
         * @param index  Field value
         */
        get (key: number, type: PB_Message, index?: number): OutputMessage

        /**
         * Returns field value with key `key` and optionally index interpreted as a `string`
         * @param key  Field key
         * @param index  Optional array index
         */
        string (key: number, index?: number): string

        /**
         * Returns field value with key `key` and optionally index interpreted as a `bytes`
         * @param key  Field key
         * @param index  Optional array index
         */
        bytes (key: number, index?: number): number[]

        /**
         * Returns field value with key `key` and optionally index interpreted as a `message`
         * @param key  Field key
         * @param index  Optional array index
         */
        message (key: number, index?: number): OutputMessage

        /**
         * Returns field value with key `key` and optionally index interpreted as a `fixed32`
         * @param key  Field key
         * @param index  Optional array index
         */
        fixed32 (key: number, index?: number): number

        /**
         * Returns field value with key `key` and optionally index interpreted as a `fixed64`
         * @param key  Field key
         * @param index  Optional array index
         */
        fixed64 (key: number, index?: number): Long

        /**
         * Returns field value with key `key` and optionally index interpreted as a `sfixed32`
         * @param key  Field key
         * @param index  Optional array index
         */
        sfixed32 (key: number, index?: number): number

        /**
         * Returns field value with key `key` and optionally index interpreted as a `sfixed64`
         * @param key  Field key
         * @param index  Optional array index
         */
        sfixed64 (key: number, index?: number): Long

        /**
         * Returns field value with key `key` and optionally index interpreted as a `float`
         * @param key  Field key
         * @param index  Optional array index
         */
        float (key: number, index?: number): number

        /**
         * Returns field value with key `key` and optionally index interpreted as a `double`
         * @param key  Field key
         * @param index  Optional array index
         */
        double (key: number, index?: number): number

        /**
         * Returns field value with key `key` and optionally index interpreted as a `int32`
         * @param key  Field key
         * @param index  Optional array index
         */
        int32 (key: number, index?: number): number

        /**
         * Returns field value with key `key` and optionally index interpreted as a `int64`
         * @param key  Field key
         * @param index  Optional array index
         */
        int64 (key: number, index?: number): Long

        /**
         * Returns field value with key `key` and optionally index interpreted as a `uint32`
         * @param key  Field key
         * @param index  Optional array index
         */
        uint32 (key: number, index?: number): number

        /**
         * Returns field value with key `key` and optionally index interpreted as a `uint64`
         * @param key  Field key
         * @param index  Optional array index
         */
        uint64 (key: number, index?: number): Long

        /**
         * Returns field value with key `key` and optionally index interpreted as a `sint32`
         * @param key  Field key
         * @param index  Optional array index
         */
        sint32 (key: number, index?: number): number

        /**
         * Returns field value with key `key` and optionally index interpreted as a `sint64`
         * @param key  Field key
         * @param index  Optional array index
         */
        sint64 (key: number, index?: number): Long

        /**
         * Returns field value with key `key` and optionally index interpreted as a `bool`
         * @param key  Field key
         * @param index  Optional array index
         */
        bool (key: number, index?: number): boolean

        /**
         * Converts [[OutputMessage]] to JSON API compatible object.
         * Will only contain one inferred value for each field, and is not
         * recommended overall.
         */
        toJSON (): any

        /**
         * Coverts [[OutputMessage]] to [[InputMessage]].
         *
         * **Note**: you likely won't be able to use
         * [[InputMessage.get]], because types will be
         * erased down to primitives. If you will need
         * to get the field values later, keep the
         * original message at hand.
         *
         * **Note**: when converted back to the wire,
         * it may not be exactly the same as the original message,
         * even if no changes were made. Particularly, order of the
         * fields may not be preserved, empty fields may be removed
         * (use [[InputMessage.keepDefault]] to avoid that),
         * and non-packed primitives may get packed. Still,
         * the resulting message should stay *compatible* with the
         * original one.
         */
        toInput (): InputMessage
    }

    /**
     * Create an empty Protobuf message
     */
    function create (): InputMessage

    /**
     * Create a Protobuf message using JSON API
     *
     * @param data  String or JSON API object
     */
    function fromJson (data: any): InputMessage

    /**
     * Parse given data as a Protobuf message
     *
     * @param data  Buffer/byte array containing Protobuf message
     */
    function parse (data: BufferLike): OutputMessage

    /**
     * Parse given hexadecimal string as a Protobuf message
     *
     * @param data  Hexadecimal string
     */
    function fromHex (data: string): OutputMessage
}
