function sortNum(a, b) {
    return a - b
}

function f(total, arr) {
    var sum = 0
    arr.sort(sortNum)
    arr.forEach(num => {
        if (num <= total) {
            total -= num
            sum += num
        } else {
            return sum
        }
    })
    return sum
}

console.log(f(100, [50, 50]))//100
console.log(f(188, [50, 42, 9, 15, 105, 63, 14, 30]))//160

