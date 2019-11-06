function Promise (executor) {
    const self = this
    this.data = undefined
    this.status = 'pending'
    this.resolveList = []
    this.rejectList = []

    function resolve (value) {
        if (self.status === 'pending') {
            self.status = 'resolved'
            self.data = value
            for (let i = 0; i < self.resolveList.length; i++) {
                self.resolveList[i](self.data)
            }
        }
    }

    function reject (value) {
        if (self.status === 'pending') {
            self.status = 'rejected'
            self.data = value
            for (let i = 0; i < self.resolveList.length; i++) {
                self.resolveList[i](self.data)
            }
        }
    }

    executor(resolve, reject)
}

Promise.prototype.then = function (onResolved, onRejected) {
    const self = this
    if (self.status === 'resolved') {
        return new Promise(function(resolve, reject) {
            try {
                let x = onResolved(self.data)
                if (x instanceof Promise) {
                    return x.then(resolve, reject)
                }
                resolve(x)
            } catch (err) {
                reject(err)
            }
        })
    }
}