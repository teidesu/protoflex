import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/atom-one-light.css'

hljs.registerLanguage('javascript', javascript)

Vue.directive('hljs', {
    deep: true,
    bind: function (el, binding) {
        let targets = el.querySelectorAll('code')
        targets.forEach((target) => {
            if (binding.value) {
                target.textContent = binding.value
            }
            hljs.highlightBlock(target)
        })
    },
    componentUpdated: function (el, binding) {
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

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
