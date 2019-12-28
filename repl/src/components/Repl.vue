<template>
    <div class="repl-output" ref="output">
        <div class="repl-header level">
            <div class="level-left">
                <slot/>
                <h2>Output</h2>
            </div>
            <div class="level-right">
                <b-button icon-right="backup-restore" style="margin-right: 4px" @click="resetSandbox"/>
                <b-button icon-right="broom" @click="clear"/>
            </div>
        </div>
        <div class="repl-history">
            <div class="repl-history-item" v-for="(it, i) in items" :key="i">
                <div class="repl-history-item__console" v-if="it.console" v-html="it.html"></div>
                <pre class="repl-history-item__code" v-hljs v-else><code class="javascript">{{it.expr}}</code></pre>
                <b-message class="is-family-monospace repl-history-item__response" v-if="'result' in it">
                    <pre v-hljs><code class="javascript">{{it.result}}</code></pre>
                </b-message>
                <b-message type="is-danger" class="is-family-monospace repl-history-item__error" v-if="'error' in it">
                    <pre><code>{{it.error}}</code></pre>
                </b-message>
            </div>
        </div>
        <div class="repl-spacer" v-if="items.length"></div>
        <div class="repl-placeholder" v-else>
            <h1>🐓</h1>
            <h2>Nothing here but us chickens.</h2>
        </div>
        <div class="repl-input">
            <b-field>
                <b-input
                        class="is-expanded is-family-monospace repl-input__field"
                        @keydown.native.enter="evaluate"
                        @keydown.native.up="fromHistoryEvent($event, 1)"
                        @keydown.native.down="fromHistoryEvent($event, -1)"
                        v-model="input"
                        type="textarea"
                        :style="{ height: 48 + Math.min(inputLines * 24, 192) + 'px' }"
                />
                <p class="control">
                    <b-button icon-right="send" @click="evaluate" :disabled="this.input.length === 0"/>
                </p>
            </b-field>
        </div>
    </div>
</template>

<script>
import { LogList } from '../collections'
import Sandbox from '../sandbox'
import inspect from '../inspect'

export default {
    name: 'Repl',
    props: {
        globals: {
            type: Object,
            default: () => ({}),
        },
    },
    data: () => ({
        items: [],
        input: '',
        inputLines: 0,
        history: new LogList(),
        historyPosition: -1,

        sandbox: null,
    }),
    methods: {
        resetSandbox () {
            this.sandbox = new Sandbox()
            Object.assign(this.sandbox.window, this.globals)
            const self = this
            this.sandbox.window.console = {
                log (...args) {
                    let str = args.map(i => inspect(i))

                    self.addResult({
                        console: true,
                        html: `<pre><code>${str.join(' ')}</code></pre>`,
                    })
                },
            }
            this.sandbox.window.clear = this.clear.bind(this)
            this.clear()
        },
        clear () {
            this.items = []
        },
        evaluate (ev) {
            if (!(ev && (ev.shiftKey || ev.ctrlKey)) && this.input.length) {
                if (ev) {
                    ev.preventDefault()
                    ev.stopPropagation()
                }

                this.runCode(this.input)


                this.history.unshift(this.input)
                this.historyPosition = -1
                this.input = ''
            }
        },
        runCode (expr) {
            let item = {
                expr,
            }
            this.addResult(item)

            try {
                let res = this.sandbox.evaluate(expr)
                if (res) {
                    this.$set(item, 'result', inspect(res))
                }
                this.sandbox.window.$_ = res
            } catch (e) {
                this.$set(item, 'error', e)
            }
        },
        addResult (res) {
            this.items.push(res)
        },
        fromHistoryEvent (ev, delta) {
            // need to get current caret line.
            let line = ev.target.value.substr(0, ev.target.selectionStart).split('\n').length - 1
            if (line === 0 && delta > 0 || line === this.inputLines && delta < 0) {
                this.fromHistory(delta)
            }
        },
        fromHistory (delta) {
            if (this.historyPosition >= this.history.length - 1 && delta > 0 || this.historyPosition === -1 && delta
                < 0) {
                return
            }
            this.historyPosition += delta
            if (this.historyPosition <= -1) {
                this.historyPosition = -1
                this.input = ''
            } else {
                this.input = this.history.get(this.historyPosition)
            }
        },
    },
    watch: {
        input (v) {
            let i = v.match(/\n/g)
            this.inputLines = (i || []).length
        },
        items () {
            setTimeout(() => this.$refs.output.scrollTop = this.$refs.output.scrollHeight, 10)
        }
    },
    mounted () {
        this.resetSandbox()
    },
}
</script>

<style>
.repl-output {
    background: #ededed;
    display: flex;
    flex-direction: column;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    height: 85vh;
    max-height: 85vh;
    width: 45vw;
    max-width: 45vw;
    overflow: auto;
    position: relative;
}

.repl-output pre {
    padding: 8px;
}

.repl-spacer {
    flex-grow: 1;
}

.repl-header.level {
    margin: 0 !important;
    padding: 8px 16px;
    border-bottom: 1px solid #dbdbdb;
    position: sticky;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 1px 8px -1px #555;
}

.repl-input {
    position: sticky;
    background: #fff;
    top: 0;
    left: 0;
    bottom: 0;
    border-top: 1px solid #dbdbdb;
    box-shadow: 0 -1px 8px -1px #555;
}

.repl-input textarea, .repl-input button {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    height: 48px;
    min-height: 48px !important;
    max-height: 384px !important;

    background: #fff;
}

.repl-input button {
    width: 48px;
}

.repl-history-item pre {
    background: transparent !important;
    font-size: 14px;
    color: #010101;
}

.repl-history-item .message {
    margin: 4px !important;
}

.repl-history-item .message-body {
    padding: 8px;
    overflow-y: auto;
    max-width: 100%;
}

.repl-placeholder {
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;

    color: #000000;
    font-size: 24px;
}

.repl-history-item {
    border-bottom: 1px solid #dbdbdb;
    padding: 4px 0;
    background-color: #fdfdfd;
}

.repl-history-item__code {
    background-color: #fdfdfd;
}

.repl-history-item:first-child {
    padding-top: 12px;
}
.repl-history-item:last-child {
    padding-bottom: 18px;
}

.repl-input__field textarea {
    resize: none;
    height: 100%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: auto;
}

.hljs {
    background: transparent !important;
    padding: 0 !important;
}
</style>
