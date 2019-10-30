function instance (l, r) {
    const R = r.prototype
    l = l.__proto__
    while (true) {
        if (l === R) {
            return true
        } else if (l === null) {
            return false
        }
        l = l.__proto__
    }
}