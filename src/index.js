const OutputMessage = require('./output-message')
const InputMessage = require('./input-message')
const Deserializer = require('./deserializer')
const ja = require('./json-api')
const utils = require('./utils')

const parse = v => new OutputMessage(v, new Deserializer(v).parse())
const create = () => new InputMessage()

function _prepareJsonInput (ip, j) {
    for (let key in j.fields) {
        if (j.fields.hasOwnProperty(key)) {
            for (let i = 0; i < j.fields[key].length; i++) {
                if (j.fields[key][i].type === 'message') {
                    let ip = new InputMessage()
                    j.fields[key][i].value = _prepareJsonInput(ip, j.fields[key][i].value)
                }
            }
        }
    }

    ip.unpacked(j.unpacked)
    ip.fields = j.fields

    return ip
}

const fromJson = j => {
    let ip = new InputMessage()
    let data = ja.jsonToInput(j)
    ip = _prepareJsonInput(ip, data)
    return ip
}

const fromHex = h => parse(utils.fromHex(h))

module.exports = {
    OutputMessage,
    InputMessage,
    parse,
    fromHex,
    create,
    fromJson,
}
