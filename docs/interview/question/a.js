// let a = {
//     i: 1,
//     toString () {
//         return a.i++
//     }
// }
//
// if(a == 1 && a == 2 && a == 3) {
//     console.log(1);
// }
//
// let a = {
//     i: 1,
//     valueOf () {
//         return a.i++
//     }
// }
//
// if(a == 1 && a == 2 && a == 3) {
//     console.log(1);
// }
//
// var a = [1,2,3];
// a.join = a.shift;
// if(a == 1 && a == 2 && a == 3) {
//     console.log(1);
// }
//
// let a = {
//     [Symbol.toPrimitive]: (i => () => ++i) (0)
// };
// if(a == 1 && a == 2 && a == 3) {
//     console.log(1);
// }
//
// Object.defineProperty(window, 'a', {
//     get: function() {
//         return this.value = this.value ? (this.value += 1) : 1;
//     }
// });
// if(a == 1 && a == 2 && a == 3) {
//     console.log(1);
// }

// var aﾠ = 1;
// var a = 2;
// var a = 3;
// if (aﾠ == 1 && a == 2 && ﾠa == 3) {
//     console.log(1)
// }
