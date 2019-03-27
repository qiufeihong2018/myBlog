let arrA = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
let arrB = ['A', 'B', 'C', 'D'].map(item => {
    return item + 3
})
let arrC = [...arrA, ...arrB].sort().map(item => {
    if (item.includes('3')) {
        return item.split('')[0]
    }
    return item
})
console.log(arrC)
// [ 'A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D' ]
