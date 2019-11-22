// 发布订阅管理中心
class Dep {
    constructor () {
        this.subs = [] // 订阅者列表
    }
    addSub (target) {
        this.subs.push(target)
    }
    // 触发订阅者回调
    notify () {
        this.subs.forEach(item => {
            item.update()
        })
    }
}

Dep.target = null

// 监听者
class Observer {
    constructor (data) {
        this.data = data
        Object.keys(data).forEach(item => this.convert(item))
    }
    convert (key) {
        const dep = new Dep()
        observe(this.data[key])
        Object.defineProperty(this.data, key, {
            get () {
                const target = Dep.target
                if (target) {
                    dep.addSub(target)
                }
            },
            set (newValue) {
                if (newValue === this.data[key]) {
                    return
                }
                this.data[key] = newValue
                observe(this.data[key])
                dep.notify()
            }
        })
    }
}

function observe (data) {
    if (typeof data === 'object') {
        return new Observer(data)
    }
}

// 订阅者
class Watcher {
    constructor (data, exp, cb) {
        this.get()
        this.cb = cb
    }
    get () {
        Dep.target = this
        this.value = data[exp]
    }
    update () {
        if (typeof cb === 'function') {
            this.cb()
        }
    }
}