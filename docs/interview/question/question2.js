var arrFirst = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
var arrSecond = ["J", "K", "L", "M", "N", "O", "P", "Q", "R"]
var arrThird = ["S", "T", "U", "V", "W", "X", "Y", "Z", "*"]
var arrTotal = new Array()
arrTotal.push(arrFirst, arrSecond, arrThird)
// 要进行编码的数组
var arrTotalSecond = new Array()

// 数组集合左移m个单位
function moveArrList(m) {
    return arrTotal.slice(-m).concat(arrTotal.slice(0, -m))
}

// 每个数组左移d个单位
function moveArr(d) {
    arrTotal.forEach(item => {
        arrTotalSecond.push(item.slice(-d).concat(item.slice(0, -d)))
    })
    return arrTotalSecond
}

function f(m, d, arr) {
    var newArr = new Array()
    m -= 1
    d -= 1
    moveArrList(m)
    moveArr(d)
    arr.forEach(string => {
        arrTotalSecond.forEach(arr => {
            newArr.push(arr.indexOf(string))
        })
    })
    return newArr
}

console.log(f(1, 1, ['H', 'I']))//[ 7, -1, -1, 8, -1, -1 ]
