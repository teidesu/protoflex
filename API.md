# Protoflex
Welcome to Protoflex documentation!  

# Quick start:

## Reading (deserializing)

```javascript
const PB = require('protoflex')
console.log(PB.fromHex('082a').int32(1))  // 42
```

or via [JSON API](#json-api) (*not recommended*, [why?](#from-message-to-json)):

```javascript
const PB = require('protoflex')
console.log(PB.fromHex('082a').toJSON()) // { '1': '42' }
```

## Writing (serializing)

```javascript
const PB = require('protoflex')
let msg = PB
    .create()
    .int32(1, 42)
console.log(msg.serialize())  // [0x08, 0x2a]
```

or via [JSON API](#json-api):

```javascript
const PB = require('protoflex')
let msg = PB.fromJson({
    1: 42
})
console.log(msg.serialize())  // [0x08, 0x2a]
```

# Main helper functions
```javascript
const PB = require('protoflex')
```
then you can do:

## `.create()`
Returns a new empty `InputMessage`, refer to [Functional API](#writing-in-functional-style)

## `.parse(data: number[])`
Parses array of bytes as a `OutputMessage`, refer to [Functional API](#reading-in-functional-style)

## `.fromHex(object)`
Parses string as hexadecimal to `OutputMessage` refer to [Functional API](#reading-in-functional-style)

## `.fromJson(object)`
Creates an `InputMessage` from JSON, refer to [JSON API](#json-api)

## `require('protoflex/utils')`
See API reference for [utils.d.ts](./modules/_utils_d_.html)

# Functional API
## Reading in functional style
There are `.<type>(key, ?index = 0)` methods for all (supported) Protobuf types,
where `<type>` is a Protobuf type (e.g. `int32`), which return value in the
given field interpreted as given type.  
For convenience, there's also `hex` type that returns `bytes` as a hexadecimal string

You can use `.get(key, type, ?index)`, which works exactly the same.

Also, there are some service methods:

### `.repeated(key, type)`
Declare some field as repeated.

Protobuf version 3 declares a new, more efficient way to store repeated
elements by storing them in a single length-delimited field.
However, this increases the complexity of parsing them — it is not actually
possible without knowing the type of items.
Thus, to provide possibility of parsing those fields, this method is available.

This method internally converts the packed repeated to a normal repeated
(of course, if it was packed in the first place):

```javascript
msg.array(1, 'int32') // field is not varint
msg.repeated(1, 'int32').array(1, 'int32') // ok
```

### `.known()`
In Protobuf, when a field has its default value (e.g. `0` for numbers, 
empty strings, messages, etc), it may not be present in wire. Thus, to handle
these cases, you can either `try/catch` calls, or use `.known(...items)`. 

It accepts varargs of:
 - `number` will be interpreted as a known-for-sure untyped field key
 - `number[]` will be interpreted as a known-for-sure untyped field keys
 - `{ <key>: string }` will be interpreted as: `<key>` field is of the given type
 - `{ <key>: string[] }` will be interpreted as: `<key>` field is one of the given types

### `.array(key, type)`
Returns array of fields with key `key` interpreted as `type`

### `.iter(key, type)`
Returns iterator of items in `key` field interpreted as `type`, which is compatible
with both `for..of` and `.next()` flows.

### `.length(key)`
Returns number of items with given key

### `.has(key, ?index, ?ignoreKnown)`
Returns if message has field with key `key` and index `index`.  
If `ignoreKnown` is set, will return `false` for fields that are declared in `.known()` but
not present in actual message.

### `.type(key, ?index)`
Returns type of has field with key `key` and index `index`.

### `.toJSON()`
Converts message to JSON, refer to [JSON API](#json-api)

### `.toInput()`
Converts the message to InputMessage, to allow modifying it.

**Note**: You likely won't be able to use `InputMessage.get`, 
because types will be erased down to primitives. If you will need to get the
field values later, keep the original message at hand.

**Note**: When converted back to the wire, it may not be exactly the same 
as the original message, even if no changes were made. Particularly, order of the
fields may not be preserved, empty fields may be removed 
(use `InputMessage.keepDefault` to avoid that), and non-packed
primitives may get packed. Still, the resulting message should stay
*compatible* with the original one.

#### Packed repeated
If your message contains packed repeated fields, you have to declare
them using `.repeated()` *before* using `.toInput()` to make them available
in the input message. 

## Writing in functional style

Similarly, there are `.<type>(key, value, ?index = 0)` methods for all
(supported) Protobuf types, where `<type>` is a Protobuf type (e.g. `int32`), 
which return the very same message to support chaining. Example:

```javascript
let msg = PB.create()
    .int32(1, 42)
    .int32(2, 44)
    .toWire()
```

Similarly you can write nested messages:
```javascript
let msg = PB.create()
    .int32(1, 42)
    .message(1, (msg) => {
        msg
            .string(1, 'such flex')
            .string(2, 'much wow')
    })
    .int32(2, 44)
    .toWire()
```

### Repeated
#### Adding items
There are two ways of adding repeated items:

If you are adding items one-by-one, you can use `.append(key, value, ?type)` method,
which works similarly to `.push()` method of native arrays
(but can't handle multiple items at once)
```javascript
let msg = PB.create()
    .append(1, 42, 'int32')
    .append(1, 43, 'int32')
    .append(1, 44, 'int32')
    .array(1, 'int32') // [42, 43, 44]
```
Type argument is optional, but is strongly recommended.

Alternatively, you can use `index` parameter in `.<type>` methods:
```javascript
let msg = PB.create()
    .int32(1, 42, 0)
    .int32(1, 43, 1)
    .int32(1, 44, 2)
    .array(1, 'int32') // [42, 43, 44]
```
This way you can set items randomly

> Note that even though it can be used as a sparse, when serializing, empty fields are ignored,
> and resulting message will not have same order. 
>
> Example: `[1, undefined, 1]` will be encoded as `[1, 1]`, and thus re-decoded as `[1, 1]` 


#### Deleting items

For removing items there's a `.clear(key, ?index)` method. Negative `index`es are supported
(-1 is last, -2 is pre-last etc.), and when it is missing, the whole array is cleared:
```javascript
let msg = PB.create()
    .int32(1, 42, 0)
    .int32(1, 43, 1)
    .int32(1, 44, 2)
    .int32(1, 45, 3)
msg.array(1, 'int32') // [42, 43, 44, 45]
msg.clear(1, -1).array(1, 'int32') // [42, 43, 44]
msg.clear(1, 1).array(1, 'int32') // [42, 44]
msg.clear(1).array(1, 'int32') // []
```

> Note that empty arrays are ignored when serializing to the wire
> because of how Protobuf works

#### Accessing items

Let's say you have this Protoflex object:
```javascript
let msg = PB.create()
    .append(1, 42, 'int32')
    .append(1, 43, 'int32')
    .append(1, 44, 'int32')
    .array(1, 'int32') // [42, 43, 44]
```

You can access array items in two ways, first is `index` parameter in `.get()` method, and
second is `.array(key, ?type)` method, which accepts a `key` and optionally field type.

So, code for accessing `N`th item will look like this:
```javascript
let eq = msg.array(1, 'int32')[N] === msg.get(1, 'int32', N) // true
```
However, for random access you should use `.get()` method, and fot iterating - `.iter()`

#### Iterating over items

Continuing with same object from previous part, you may also want to iterate over all values.
This is also possible with `.iter(key, ?editable, ?type)` method. You may wonder about
`editable` parameter, but it is pretty straightforward. When it is `true`, iterables
are `{ get() {...}, set() {...} }` item references, and when `false` iterables are simply
field values. By default they are not editable.

It can be used both in `for..of` and as a plain iterator (`.next()`):
```javascript
for (let it of msg.iter(1)) {
    console.log(it) // 42, 43, 44 consequently
}

for (let it of msg.iter(1, true)) {
    console.log(it.get()) // 42, 43, 44 consequently
    it.set(it.get() + 1)
}
console.log(msg.array(1, 'int32')) // [43, 44, 45]
```

### Keep default

When serializing to the wire, by default fields with default values
(that is, `0` for numbers, empty messages, arrays, strings, etc.):

```typescript
const msg = PB.fromJson({ 1: 0 }).toHex()
console.log(PB.fromHex(msg)) // {}
```

In some cases this is not desirable (e.g. when targeting some broken decoders),
and you can force Protoflex to write default values to the wire as well:

```typescript
const msg = PB.fromJson({ 1: 0 }).keepDefault().toHex()
console.log(PB.fromHex(msg)) // { 1: 0 }
```


# JSON API

## From message to JSON
Protoflex provides a convenient JSON API. Basically, it enables you to treat
Protobuf messages just like plain Javascript objects. However, it implies some
limitations: there are no type/presence checks.

As you have already seen in [Quick Start](#quick-start), JSON API returns plain JS objects
with numbers as keys (which are however treated as strings by JS engine) and
values. All number values are represented as a string, and only primitive types
are parsed. Also, parsing nested messages or repeated integers/fractions may be
inaccurate because of how Protobuf handles them.

Another thing is using JSON API to convert from output message to input
(i.e. `PB.fromJson(msg.toJSON())`). This **should never be done**! 
Not only the points mentioned before are still valid, fixed32/64 types
will be written to the wire as varint, and will make the message **incompatible**
with the original one.

Instead, use `msg.toInput()`, which tries to preserve as much information
as possible for a *compatible* serialization.

## From JSON to message
This direction of conversion is much more flexible than the opposite.

As input, JSON API takes a plain JS object (or JSON in string) like this:
```javascript
let a = fromJson({
    1: 'hi',
    2: 42
})
```
> Note that Protoflex ignores any non-numeric keys.

### JSON API types
By default, Protobuf types are inferred from input type:

JS type | Inferred Protobuf type
---|---
`number` | `int32` if whole number, else `float` (note that `.0` does not make number a fraction)
`string` | `string`
`boolean` | `bool`
`BigInt` | `int64`
`Buffer`, `Uint8Array` | `bytes`
`Long` | `int64` or `uint64`, depending on `.unsigned`
`<plain object>` | `message`

#### Explicit types
Surely, you may want to cast a value to some explicit type, 
so this syntax is supported:
```javascript
let a = fromJson({
    1: 'hi',
    2: {
        uint32: 42
    }
})
```

Here, field `2` will have type `uint32` instead of default `int32`. 

#### Difference between explicit types and sub-messages
You may now wonder how Protoflex differs sub-messages and this syntax. 

Actually, everything is quite straightforward: if Protoflex encounters 
a key with a **special meaning**, it is treated how intended
(those keys are all supported protobuf types, `value` and `unpacked`, more about it below).

If it encounters protobuf type as a key, its value is treated as this type.  
If it encounters `value` as a key, its value is treated like it was put simply as 
value in message (meaning the type will be inferred).  
Otherwise, it is treated like a sub-message.
> Modifiers like `unpacked` _(more can be added without breaking compatibility)_
> do not affect inferred type.

> Putting `value` has **higher priority** that putting a type, and putting
> multiple types will result in undefined behaviour

### Repeated fields
Encoding arrays aka `repeated` fields using JSON API is also very intuitive: 
```javascript
let a = fromJson({
    1: 'hi',
    2: [42, 43]
})
```

Here, field `2` will be repeated in resulting message twice with given values.

### Unpacked fields
As you might know, some repeated fields in protobuf can 
be packed (see [here](https://developers.google.com/protocol-buffers/docs/encoding#packed)), 
which could be unsupported by target deserializer. Thus, you can declare it using a
modifier `unpacked`:

```javascript
let a = fromJson({
    1: 'hi',
    2: {
        value: [42, 43],
        unpacked: true
    }
})
```
A bit larger code, but it is needed rarely anyway.

# API reference:
 - `protoflex`: [index.d.ts#protoflex](./modules/_index_d_.protoflex.html)
 - `protoflex/utils`: [utils.d.ts](./modules/_utils_d_.html)
