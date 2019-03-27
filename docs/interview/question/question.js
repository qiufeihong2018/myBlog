var b = 10;
(function b() {
    b = 20;
    console.log(b);// [Function: b]
    console.log(window.b)// 10
})();

var b = 10;
(function b() {
    'use strict'
    b = 20;
    console.log(b)
})() // "Uncaught TypeError: Assignment to constant variable."

var b = 10;
(function b() {
    window.b = 20;
    console.log(b); // [Function b]
    console.log(window.b); // 20是必然的
})();

var b = 10;
(function b() {
    var b = 20; // IIFE内部变量
    console.log(b); // 20
    console.log(window.b); // 10
})();

var test = (function (i) {
    return function () {
        console.log(i * 2)//4
    }
})(2)
test(5)

console.log(v1)//undefined
var v1=100
function f() {
    console.log(v1)//undefined
    var v1=200
    console.log(v1)//200
}
f()
console.log(v1)//100
