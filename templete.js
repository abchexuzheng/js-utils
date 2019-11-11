// 模版引擎

function render (templete, data) {
    const reg = /\{\{(\w+)\}\}/g
    if (reg.test(templete)) {
        const word = reg.exec(templete)[1]
        const str = reg.replace(templete, data[word])
        return render(str, data)
    } else {
        return templete
    }
}
