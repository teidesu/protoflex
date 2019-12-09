# Protoflex
![downloads](https://img.shields.io/npm/dm/protoflex) 
![version](https://img.shields.io/npm/v/protoflex) 
![.min.js file size](https://img.shields.io/github/size/teidesu/protoflex/dist/protoflex.min.js)

Protoflex is a modern JavaScript library for working with arbitrary Protobuf data.

Online REPL: [here](https://teidesu.github.io/protoflex/repl)

# Why?
There were 2 main reasons for creating Protoflex:
 - Debugging/reversing Protobuf HTTP(s) APIs
 - Using Protobuf in relatively small scripts

So, Protoflex does its best to fit them both. 

**WARNING**: this library is in early development stage and may contain 
bugs, thus **not recommended for production apps**

# Quick start:
## Reading (deserializing)
```javascript
const PB = require('protoflex')
const data = require('protoflex/utils').fromHex('082a')
console.log(PB.parse(data).int32(1))  // 42
```
or via [JSON API](#json-api):
```javascript
const PB = require('protoflex')
const data = require('protoflex/utils').fromHex('082a')
console.log(PB.parse(data).toJSON()) // { '1': '42' }
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

# API Documentation:
Full API reference can be found here: 
[https://teidesu.github.io/protoflex/api](https://teidesu.github.io/protoflex/api)
