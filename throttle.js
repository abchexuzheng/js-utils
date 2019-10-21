// 防抖函数原理:规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

function throttle (fn, delay) {
    let flag = true
    return () => {
        if (flag = false) {
            return
        }
        flag = false
        setTimeout((...args) => {
            flag = true
            fn.apply(args)
        }, delay)
    }
}