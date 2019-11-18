const data = {
    a: '123'
}

const target = null
function walk (data) {
    for (const i in data) {
        const value = data[i]
        // 判断该字段是否可以继续遍历
        if (Object.prototype.toString.call(value) === '[Object Object]') {
            walk(value)
        }
        const dep = []
        Object.defineProperties(data, i, {
            set(newValue) {
                if (newValue === value) {
                    return
                }
                dep.forEach(fn => fn())        
            },
            get() {
                dep.push(target)
                return value
            }
        })
    }
}

walk(data)

function $watch (exp, fn) {
    target = fn
    if (typeof exp === 'function') {
        exp()
        return
    }
    let obj = data
    if (/\./.test(exp)) {
        keys = exp.split('.')
        keys.forEach(item => obj = obj[item])
        return
    }
    data[exp]
}