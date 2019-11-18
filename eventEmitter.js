class EventEmitter {
    constructor () {
        this._events = new Map()
    }
}

// 事件触发
EventEmitter.prototype.emit = function (type, ...args) {
    const fn = this._events.get(type)
    if (fn instanceof Array) {
        for (let item of fn) {
            item.apply(this, args)
        }
    } 
}

// 添加事件
EventEmitter.prototype.addEventListener = function (type, fn) {
    const events = this._events.get(type)
    if (!this._events.get(type)) {
        this._events.set(type, [fn])
    } else {
        events.push(fn)
    }
}

// 移除事件
EventEmitter.prototype.removeListener = function (type, fn) {
    const events = this._events.get(type)
    for (let [index, item] of events.entries) {
        if (item === fn) {
            events.splice(index, 1)
        }
    }
}