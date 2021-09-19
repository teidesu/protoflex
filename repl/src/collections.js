export class LinkedList {
    constructor () {
        this._first = null
        this._last = null
        this.length = 0
    }

    push (item) {
        let value = {
            prev: null,
            next: null,
            value: item,
        }

        if (this._first === null) {
            this._first = this._last = value
        } else {
            value.prev = this._last
            this._last.next = this._last = value
        }
        this.length++
    }

    pop (index = this.length - 1) {
        if (index < 0 || index >= this.length) return undefined
        let ret
        if (index === 0) {
            ret = this._first
            this._first = this._first.next
            this._first.prev = null
        } else if (index === this.length - 1) {
            ret = this._last
            this._last = this._last.prev
            this._last.prev = null
        } else {
            ret = this._get(index)
            let prev = ret.prev
            let next = ret.next

            prev.next = next
            next.prev = prev
        }

        this.length -= 1

        return ret.value
    }

    shift () {
        return this.pop(0)
    }

    unshift (item) {
        let value = {
            prev: null,
            next: null,
            value: item,
        }

        if (this._first === null) {
            this._first = this._last = value
        } else {
            value.next = this._first
            this._first.prev = this._first = value
        }

        this.length++
    }

    _get (index) {
        index = parseInt(index)
        if (index === undefined || isNaN(index)) return {}
        if (index === 0) {
            return this._first
        }
        if (index === this.length - 1) {
            return this._last
        }
        if (index >= this.length) {
            return {}
        }

        if (index < this.length / 2) {
            let cur = this._first
            for (let i = 0; i < index; i++) {
                cur = cur.next
            }
            return cur
        } else {
            let cur = this._last
            for (let i = 0; i < this.length - index - 1; i++) {
                cur = cur.prev
            }
            return cur
        }
    }

    toArray () {
        if (this.length === 0) {
            return []
        }
        let cur = this._first
        let r = [cur.value]
        while (cur.next !== null) {
            r[r.length] = cur.next.value
            cur = cur.next
        }
        return r
    }

    join (sep) {
        return this.toArray().join(sep)
    }

    toString () {
        return this.toArray().toString()
    }

    get (index) {
        return this._get(index).value
    }

    last () {
        return this._last.value
    }

    first () {
        return this._first.value
    }

    clear () {
        this._first = null
        this._last = null
        // and let GC do its work

        this.length = 0
    }
}

export class LogList extends LinkedList {
    constructor (capacity = 50) {
        super()

        this.capacity = capacity
    }

    unshift (item) {
        super.unshift(item)
        this._checkCapacity()
    }

    push (item) {
        throw Error('cant be used')
    }

    pop (item) {
        throw Error('cant be used')
    }

    shift (item) {
        throw Error('cant be used')
    }

    _checkCapacity () {
        while (this.length > this.capacity) {
            // removing first element
            this._first = this._first.next
            this._first.prev = null
        }
    }
}
