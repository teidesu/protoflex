import Long from 'long'

export default {
    _dump (html = false, indentSize = 2, indent = 0) {
        let str = ''

        let ind = (raw, ...args) => {
            let s = ''
            for (let i = 0; i < args.length; i++) {
                s += raw[i] + args[i]
            }
            s += raw[raw.length - 1]

            let spaces = ''
            for (let i = 0; i < indent; i++) {
                spaces += ' '
            }

            return s.split('\n').map(i => spaces + i).join('\n') + '\n'
        }

        let tab = () => indent += indentSize
        let stab = () => indent -= indentSize

        if (html) {
            str += ind`<div class="protoflex-dump">`
        }

        for (let key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                for (let index = 0; index < this.fields[key].length; index++) {
                    if (html) {
                        str +=
                            ind`<div class="protoflex-dump-field" data-type=${JSON.stringify(this.fields[key][index].type)}>`
                    }
                    let possibleTypes = key in this._knownFields
                                        ? this._knownFields[key]
                                        : DUMPER_POSSIBLE_TYPES[this.fields[key][index].type]

                    if (this.fields[key][index].type === 'lengthDelimited' && this.fields[key][index].value.length
                        === 0) {
                        possibleTypes = ['string', 'bytes']
                    }

                    if (html) {
                        str +=
                            ind`<div class="protoflex-dump-header">Field <span class="protoflex-dump-header__key">${key}</span>, index <span class="protoflex-dump-header__index">${index}</span>:</div>`
                    } else {
                        str += ind`Field ${key}, index ${index}:`
                    }
                    tab()
                    if (html) {
                        str +=
                            ind`<div class="protoflex-dump-type">(primitive: <span class="protoflex-dump-type__primitive">${this.fields[key][index].type}</span>, possible types: <span class="protoflex-dump-type__possibles">${possibleTypes.join(
                                ', ')}</span>)</div>`
                    } else {
                        str +=
                            ind`(primitive: ${this.fields[key][index].type}, possible types: ${possibleTypes.join(', ')})`
                    }
                    for (let i = 0; i < possibleTypes.length; i++) {
                        let type = possibleTypes[i]
                        if (type === 'packed') {
                            let possiblePackedTypes = [].concat.apply([], DUMPER_POSSIBLE_TYPES.packed
                                .filter(it => this.fields[key][index].value.length % it.div === 0)
                                .map(i => i.types))
                            if (!possiblePackedTypes.length) {
                                if (html) {
                                    str +=
                                        ind`<div class="protoflex-dump-subtype" data-subtype=${JSON.stringify(type)}>as <span class="protoflex-dump-subtype__type">packed</span>: <span class="protoflex-dump-subtype__error">nothing matches</span></div>`
                                } else {
                                    str += ind`as packed: nothing matches`

                                }
                                continue
                            }

                            if (html) {
                                str +=
                                    ind`<div class="protoflex-dump-subtype" data-subtype=${JSON.stringify(type)}>as <span class="protoflex-dump-subtype__type">packed</span>:`
                            } else {
                                str += ind`as packed:`
                            }
                            tab()

                            if (html) {
                                str +=
                                    ind`<div class="protoflex-dump-type">(possible: <span class="protoflex-dump-type__possibles">${possiblePackedTypes.join(
                                        ', ')}</span>)</div>`
                            } else {
                                str += ind`(possible: ${possiblePackedTypes.join(', ')})`
                            }
                            for (let j = 0; j < possiblePackedTypes.length; j++) {
                                let ptype = possiblePackedTypes[j]

                                let oldFields = this.fields[key]
                                let s, err = false
                                try {
                                    this.repeated(key, ptype, index)
                                    s = `[${this.array(key, ptype).join(', ')}]`
                                } catch (e) {
                                    s = e
                                    err = true
                                }

                                if (html) {
                                    str +=
                                        ind`<div class="protoflex-dump-subtype">as <span class="protoflex-dump-subtype__type">${ptype}[]</span>: <div class="protoflex-dump-subtype__${err
                                                                                                                                                                                       ? 'error'
                                                                                                                                                                                       : 'value'}">${s}</div></div>`
                                } else {
                                    str += ind`as ${ptype}[]: ${s}`
                                }

                                this.fields[key] = oldFields
                            }
                            stab()
                            if (html) {
                                str += ind`</div>`
                            }
                        } else {
                            try {
                                let res = this[type](key, index)
                                if (type === 'message') {
                                    res = '\n' + res._dump(html, indentSize, indent)
                                } else if (res instanceof Long || typeof res === 'bigint') {
                                    res = res.toString()
                                } else if (typeof res !== 'object') {
                                    res = JSON.stringify(res)
                                }
                                if (html) {
                                    str +=
                                        ind`<div class="protoflex-dump-subtype" data-subtype=${JSON.stringify(type)}>as <span class="protoflex-dump-subtype__type">${type}</span>: <div class="protoflex-dump-subtype__value">${res}</div></div>`
                                } else {
                                    str += ind`as ${type}: ${res}`
                                }
                            } catch (e) {
                                if (html) {
                                    str +=
                                        ind`<div class="protoflex-dump-subtype" data-subtype=${JSON.stringify(type)}>as <span class="protoflex-dump-subtype__type">${type}</span>: <div class="protoflex-dump-subtype__error">${e}</div></div>`
                                } else {
                                    str += ind`as ${type}: ${e}`
                                }
                            }
                        }
                    }
                    stab()
                    if (html) {
                        str += ind`</div>`
                    }
                }
            }
        }

        if (html) {
            str += ind`</div>`
        }

        return str.trimEnd()
    },

    dump (html = 1, indentSize = 2, indent = 0) {
        return this._dump(html, indentSize, indent)
    },
}

const DUMPER_POSSIBLE_TYPES = {
    varint: ['int64', 'uint64', 'sint64'],
    fixed32: ['fixed32', 'sfixed32', 'float'],
    lengthDelimited: ['hex', 'string', 'message', 'packed'],
    fixed64: ['fixed64', 'sfixed64', 'double'],
    packed: [
        { div: 1, types: ['int64', 'uint64', 'sint64'] },
        { div: 4, types: ['fixed32', 'sfixed32', 'float'] },
        { div: 8, types: ['fixed64', 'sfixed64', 'double'] },
    ],
}
