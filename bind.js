Function.prototype.myBind = function (context) {
    const self = this
    const args = [].slice.call(arguments, 1)
    const fNOP = function () {}
    const fbind = function () {
        const args2 = [].slice.call(arguments)
        return self.apply(this instanceof fbind ? this : context, args.concat(args2))
    }
    fNOP.prototype = this.prototype
    fbind.prototype = new fNOP()
    return fbind
}