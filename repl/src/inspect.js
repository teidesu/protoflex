import util from 'util'

let sym

if (typeof Symbol !== 'undefined') {
    sym = Symbol.for('nodejs.util.inspect.custom')
}

export default function inspect (obj) {
    if (typeof obj === 'object' && 'toJSON' in obj) {
        obj = obj.toJSON()
    }
    if (sym && obj[sym]) {
        obj = obj[sym]()
    }
    return typeof obj === 'string' ? obj : util.inspect(obj, { compact: false, depth: Infinity })
}
