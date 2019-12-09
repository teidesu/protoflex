class Sandbox {
    constructor () {
        this.iframe = document.createElement('iframe')
        this.iframe.style.display = 'none'
        document.body.appendChild(this.iframe)

        this.window = this.iframe.contentWindow
        this.document = this.iframe.contentDocument

        this.document.open()
        this.document.write(`<script>var MSIE/*@cc_on =1@*/;_e=MSIE?this:{eval:function(s){return window.eval(s)}}</script>`)
        this._eval = this.window._e
        delete this.window._e

        this.window.loadScript = this.loadScript
    }

    evaluate (expr) {
        return this._eval.eval(expr)
    }

    loadScript (src) {
        return new Promise((resolve, reject) => {
            this.evaluate(`_s = document.createElement('script');_s.setAttribute('type','text/javascript');_s.setAttribute('src',${JSON.stringify(src)}`)
            this.window._s.onload = resolve
            this.window._s.onerror = reject
            this.window._s.onreadystatechange = (s) => {
                if (this.window._s === 'complete' || this.window._s === 'loaded') {
                    resolve()
                }
            }
            this.evaluate('document.getElementsByTagName(\'head\')[0].appendChild(_s);delete _s;')
        })
    }

    dispose () {
        document.body.removeChild(this.iframe)
    }
}


export default Sandbox
