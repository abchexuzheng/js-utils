// 实现call

Function.prototype.myCall = function() {
    const context = Object([].shift.call(arguments)) || window
    context.fn = this
    const args = []
    for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    const result = context.fn(...args)
    delete context.fn
    return result
}