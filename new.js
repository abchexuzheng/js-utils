// 模拟new

function createNewObject () {
    const obj = {}
    const constructor = [].shift.call(arguments)
    obj.__proto__ = constructor.prototype
    const ret = constructor.apply(obj, arguments)
    return typeof ret === 'object' ? ret : obj
}