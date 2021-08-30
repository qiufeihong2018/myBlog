# ECMASCRIPT总结
## ES6
### let const
没出现这个之前，变量声明一直用的是var。

出现这个很好的增加了局部声明的功能，降低了内存消耗。

let 局部声明变量；
const 局部声明常量，一般不可以改变。


### 默认参数
```js
function person(name,age){
    var name=name||'qfh'
    var age=age||26
    console.log(`${name}今年${age}岁了`)
}
person()
```
改成es6写法:
```js
function person(name='qfh',age=26){
    console.log(`${name}今年${age}岁了`)
}
person()
```
### 扩展运算符
...是扩展运算符
```js
let arr1=[1,2,3]
let arr2=[1,2,3]
let arr3=[1,2,3]

console.log(arr1.concat(arr2).concat(arr3))
// 扩展运算符
console.log([...arr1,...arr2,...arr3])
```
### 剩余参数
一个函数传入的参数个数是不确定的，就可以使用剩余参数
```js
function person(name,...params){
    console.log(name);
    console.log(params)
    }
    person('qfh',1,2,3,4,5)
//   qfh
// [1, 2, 3, 4, 5]
```
### 模板字符串
$可以连接变量和字符串。
```js
const name="qfh"
const age=26
console.log(`我叫${name}，今年${age}岁`)
```
### Object.keys
可以用它来获取对象的键key的数组。
```js
const person={name:'qfh',age:26}
undefined
const keys=Object.keys(person)
undefined
console.log(keys)
//  ["name", "age"]
```
### 箭头函数
普通函数：
```js
function person(){
    return this
}
person()
```
可以改变成箭头函数：
```js
const person=()=>{
    return this
}
person()
```
普通函数和箭头函数的区别：
1. 普通函数的this指向调用者，默认指向Window对象
2. 箭头函数的this继承来的，默认指向定义它时所处的对象
3. 箭头函数不可以作为构造函数，不能new
4. 箭头函数没有自己的this
5. 箭头函数没有arguments对象
6. 箭头函数没有原型对象

### Array.forEach
数组遍历方法
```js
const arr = [1, 2, 3]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数
arr.forEach((item, index, arr) => {
  console.log(item, index, arr)
})
// VM136:6 1 0 (3) [1, 2, 3]
// VM136:6 2 1 (3) [1, 2, 3]
// VM136:6 3 2 (3) [1, 2, 3]
```
### Array.map
返回一个处理过后的新数组
```js
const arr = [1, 2, 3]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数
const newArr=arr.map((item, index, arr) => {return item*item
})
// (3) [1, 4, 9]
```
### Array.filter
用来过滤的方法，返回新数组。
```js
const arr = [1, 2, 3]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数
const newArr=arr.filter((item, index, arr) => {return item>1
})
// (2) [2, 3]
```
### Array.some
有一个是真的就返回真的
```js
const arr = [1, 2, 3]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数
const tag=arr.some((item, index, arr) => {return item===1
})
// true
```
### Array.every
全部都是真才返回真
```js
const arr = [1, 2, 3]

// 三个参数：遍历项 索引 数组本身
// 配合箭头函数
const tag=arr.every((item, index, arr) => {return item===1
})
// false
```
#### Array.reduce
高阶函数，

第一个参数是callback函数，pre为上次return的值，next为本次遍历的项

第二个参数为初始值，也是第一个pre

```js
// 统计每个值出现的次数
const arr=['a','b','c','a','b','d','e','a']

let obj=arr.reduce((pre,next)=>{
if(pre[next]){
    pre[next]+=1
}else{
    pre[next]=1   
}
return pre
},{})
// {a: 3, b: 2, c: 1, d: 1, e: 1}
```
## ES7
## ES8
## ES10
## ES11
## ES12