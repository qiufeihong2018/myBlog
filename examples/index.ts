interface isObj {
    name: string,
    age: number
}

function A(obj: isObj) {
    console.log(obj)
}
A({
    name: 'qfh',
    age: 21231231,
    sex:'men'
})