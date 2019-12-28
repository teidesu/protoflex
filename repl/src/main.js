import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-light.css'

import CM from 'codemirror/src/codemirror'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/javascript-lint'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/selection/active-line'
import { JSHINT } from 'jshint'

window.JSHINT = JSHINT

hljs.registerLanguage('javascript', javascript)

Vue.directive('hljs', {
    deep: true,
    bind: function (el, binding) {
        // on first bind, highlight all targets
        let targets = el.querySelectorAll('code')
        targets.forEach((target) => {
            // if a value is directly assigned to the directive, use this
            // instead of the element content.
            if (binding.value) {
                target.textContent = binding.value
            }
            hljs.highlightBlock(target)
        })
    },
    componentUpdated: function (el, binding) {
        // after an update, re-fill the content and then highlight
        let targets = el.querySelectorAll('code')
        targets.forEach((target) => {
            if (binding.value) {
                target.textContent = binding.value
                hljs.highlightBlock(target)
            }
        })
    },
})

Vue.use(Buefy)
Vue.use(VueCodemirror, {
    options: {
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
})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
