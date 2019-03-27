let arr = [1, 2, [3, 4, [5, [6, 7]], 8], 9, 10, [11, [12, 13]]]
// some() 方法测试是否至少有一个元素通过由提供的函数实现的测试。
// 用扩展运算符一层层剥离数组
const flatten = (arr) => {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

console.log(flatten(arr))//[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]

// reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
let arr = [1, 2, [3, 4, [5, [6, 7]], 8], 9, 10, [11, [12, 13]]]
const flatten = array => array.reduce((acc, cur) => (Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur]), [])
console.log(flatten(arr))
