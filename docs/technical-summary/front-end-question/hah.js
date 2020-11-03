function deepCopy(obj) {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                result[key] = deepCopy(obj[key]); // 递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}
let a = [1, 2, 3, [4, 5]]
let b = []
b = deepCopy(a)
b[3].push(6)
b.push(4)
console.log(a)
console.log(b)
// [ 1, 2, 3, [ 4, 5 ] ]
// [ 1, 2, 3, [ 4, 5, 6 ], 4 ]