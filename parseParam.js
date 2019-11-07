function parseParam (url) {
    const search = /.+\?(.+)$/.exec()[1]
    const params = search.split('&')
    const paramsMap = {}
    for (let item of params) {
        if (/=/.test(item)) {
            const [key, value] = item.split('=')
            value = decodeURIComponent(value)
            if (/^\d+$/.test(value)) {
                value = parseInt(value)
            }
            if (paramsMap.hasOwnProperty(key)) {
                value = [].concat(paramsMap[key], value)
            }
            paramsMap[key] = value
        } else {
            paramsMap[item] = true
        }
    }
}