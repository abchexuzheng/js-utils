// 数据双向绑定

// defineProperty
function binding (dataObj, key, dom) {
    Object.defineProperty(dataObj, key, {
        set: function (newValue) {
            dom.innerText = newValue
        }
    })
    dom.addEventListener('click', function (e) {
        dataObj[key] = e.target.value
    })
}

// proxy
function bindingProxy () {
    const handle = {
        set(target, key, value) {
            target[key] = value
            dom.innerText = value
        }
    }
    const proxy = new Proxy(dataObj, handle)
}