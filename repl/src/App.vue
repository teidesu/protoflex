<template>
    <div class="container">
        <h2 class="page-title">Protoflex REPL</h2>
        <div class="columns">
            <div class="column" v-show="left">
                <b-tabs position="is-centered" v-model="tab">
                    <b-tab-item icon="book-open-outline" label="Parsing">
                        <b-field label="Protobuf data">
                            <b-input type="textarea" class="is-family-monospace" v-model="inputData"/>
                        </b-field>
                        <b-field label="Parse as">
                            <div class="buttons">
                                <b-button @click="asHex">Hex</b-button>
                                <b-button @click="asB64">Base64</b-button>
                                <b-button @click="asRaw">Raw</b-button>
                            </div>
                        </b-field>
                    </b-tab-item>
                    <b-tab-item icon="code-braces" label="Serializing">
                        <b-button @click="jsonToPB">To Protobuf message</b-button>
                        <b-button @click="jsonToHex">To Hex</b-button>
                        <b-button @click="jsonToFile">Download as binary</b-button>
                        <CodeMirror
                                v-model="inputJson"
                                :options="cmOptions"
                                class="json-input"
                                ref="editor"
                        />
                    </b-tab-item>
                </b-tabs>
                <b-message type="is-info">
                    <b>Common</b>
                    <p>You can use REPL without using left pane, Protoflex is in <code>PB</code> and utils are in <code>PB.utils</code>
                    </p>
                    <b>Parsing</b>
                    <p>Your object is in <code>$</code>, to get full info use <code>$.dump()</code></p>
                    <b>Creating</b>
                    <p>Code in editor is evaluated as JS, you can use stuff like <i>variables</i> and <i>functions</i>,
                        and object is read from <code>$</code> variable</p>
                    <p>To export your object: <code>$.toHex()</code>, <code>$.download()</code></p>
                    <p><a href="/protoflex/api/">Full API documentation</a></p>
                </b-message>
            </div>
            <div class="column">
                <Repl ref="repl" :globals="{ PB }" :class="left ? '' : 'repl-full-width'">
                    <b-button class="hide-btn" @click="left = !left">{{left ? '< hide' : '> show'}}</b-button>
                </Repl>
            </div>
        </div>
    </div>
</template>

<script>
// code is mess but idc
import PB from '../..'

import protoflexUtils from '../../utils'

PB.utils = protoflexUtils

import Repl from './components/Repl'
import dumper from './output-dumper'
import { encode } from './base64-helper'

let download = (filename, buffer) => {
    let el = document.createElement('a')
    el.setAttribute('href', 'data:application/x-protobuf;base64,' + encode(buffer))
    el.setAttribute('download', filename)

    el.style.display = 'none'
    document.body.appendChild(el)
    el.click()
    document.body.removeChild(el)
}

const ellipsisMiddle = (s, len) => {
    if (s.length <= len) return s
    let l = (len - 3) / 2
    return s.substring(0, l % 1 === 0 ? l : Math.round(l)) + '...' + s.substring(s.length - l)
}

export default {
    name: 'app',
    components: {
        Repl,
        CodeMirror: () => import('./cm-bundle')
    },
    data: () => ({
        PB,
        inputData: '',
        inputJson: '$ = {\n  \n};',
        tab: 0,
        left: true,
        cmOptions: {
            mode: 'text/javascript',
            theme: 'default',
            viewportMargin: Infinity,
            lint: true,
            lineNumbers: true,
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            autoCloseBrackets: true,
            styleActiveLine: true,
            extraKeys: {
                'Ctrl-Space': 'autocomplete'
            }
        }
    }),
    methods: {
        asHex () {
            let it = {
                expr: `$ = PB.fromHex('${ellipsisMiddle(this.inputData, 25)}')`,
            }
            this.$refs.repl.addResult(it)
            try {
                this.$refs.repl.sandbox.window.$ = PB.fromHex(this.inputData)
            } catch (e) {
                this.$set(it, 'error', e)
            }
        },
        asB64 () {
            let it = {
                expr: `$ = parse('${ellipsisMiddle(this.inputData, 25)}')`,
            }
            this.$refs.repl.addResult(it)
            try {
                this.$refs.repl.sandbox.window.$ = PB.parse(PB.utils.toByteArray(atob(this.inputData)))
            } catch (e) {
                this.$set(it, 'error', e)
            }
        },
        asRaw () {
            let it = {
                expr: `$ = parse('${ellipsisMiddle(this.inputData, 25)}')`,
            }
            this.$refs.repl.addResult(it)
            try {
                this.$refs.repl.sandbox.window.$ = PB.parse(PB.utils.toByteArray(this.inputData))
            } catch (e) {
                this.$set(it, 'error', e)
            }
        },
        jsonToPB () {
            let it = {
                expr: `$ = PB.fromJson({...})`,
            }
            this.$refs.repl.addResult(it)

            let $

            try {
                eval(this.inputJson)
                if (!$) {
                    throw Error('$ not found, please check if it is present in your code.')
                }
                this.$refs.repl.sandbox.window.$ = PB.fromJson($)
            } catch (e) {
                this.$set(it, 'error', e)
            }
        },
        jsonToHex () {
            let it = {
                expr: `PB.fromJson({...}).toHex()`,
            }
            this.$refs.repl.addResult(it)

            let $

            try {
                eval(this.inputJson)
                if (!$) {
                    throw Error('$ not found, please check if it is present in your code.')
                }
                let result = PB.fromJson($).toHex()
                this.$set(it, 'result', JSON.stringify(result))
            } catch (e) {
                this.$set(it, 'error', e)
            }
        },
        jsonToFile () {
            let it = {
                expr: `PB.fromJson({...}).download()`,
            }
            this.$refs.repl.addResult(it)

            let $

            try {
                eval(this.inputJson)
                if (!$) {
                    throw Error('$ not found, please check if it is present in your code.')
                }
                PB.fromJson($).download()
            } catch (e) {
                this.$set(it, 'error', e)
            }
        }
    },
    watch: {
        left (v) {
            localStorage.left = v
        },
        tab () { // idk
            setTimeout(() => this.$refs.editor.cminstance.refresh(), 100)
        }
    },
    mounted () {
        PB.OutputMessage.prototype._dump = dumper._dump
        PB.OutputMessage.prototype._dump_ = dumper.dump
        const self = this
        PB.OutputMessage.prototype.dump = function (h, i, s) {
            self.$refs.repl.addResult({ console: true, html: PB.OutputMessage.prototype._dump_.call(this, true, i, s) })
        }

        PB.InputMessage.prototype.download = function (filename = 'protoflex.bin') {
            download(filename, this.toWire())
        }

        if (!localStorage.left) {
            localStorage.left = 'true'
        }

        this.left = localStorage.left === 'true'
    },
}
</script>

<style>
@import url(dump.css);

.page-title {
    font-size: 21px;
    font-weight: 500;
    text-align: center;
    border-bottom: 1px solid #dbdbdb;
    margin: 8px 25%;
    padding: 4px;
}

.is-family-monospace textarea, .is-family-monospace input {
    font-family: monospace !important;
}

.json-input {
    height: auto;
    font-size: 12px;
    margin-top: 4px;
}

.hide-btn {
    margin-right: 8px;
}

.repl-full-width {
    width: 100% !important;
    max-width: 100% !important;
}
</style>
