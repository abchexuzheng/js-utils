// 对象深拷贝

function deepClone (obj, map = new WeekMap()) {
    if (typeof obj === 'object') {
        const type = getType(obj)
        let newObject
        // 处理循环引用
        if (map.get(obj)) {
            return map.get(obj)
        }

        if (deepMap.includes(type)) {
            newObject = getInit(obj)
        }

        // 克隆set
        if (type === setTag) {
            target.forEach(value => {
                newObject.add(clone(value,map));
            });
            return newObject;
        }

        // 克隆map
        if (type === mapTag) {
            target.forEach((value, key) => {
                newObject.set(key, clone(value,map));
            });
            return newObject;
        }

        for (let item in obj) {           
            newObject[item] = deepClone(obj[item])
        }
        map.set(newObject)
        return newObject
    } else {
        return obj
    }
}

// 获取类型
function getType(target) {
    return Object.prototype.toString.call(target)
}

// 根据constructor生成新的对象
function getInit(target) {
    const Constructor = target.constructor
    return new Constructor()
}

const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

const deepMap = [mapTag, setTag, arrayTag, objectTag]

function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}