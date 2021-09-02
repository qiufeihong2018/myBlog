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
### Array.reduce
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
### 对象属性同名省略
以前：
```js
const name="qfh"
const age=26
const person={
name:name,
age:age
}
console.log(person)
```
现在：
```js
const name="qfh"
const age=26
const person={
name,
age
}
console.log(person)
```
### promise
表示“承诺”，一旦改变了状态，就不会发生改变。

成功：
```js
function getList(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('hello')
        },2000)
    })
}
getList().then(res=>{
    console.log(res)
})
.catch((err)=>{
    console.log(err)
})
```

失败：
```js
function getList(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('hello')
        },2000)
    })
}
getList().then(res=>{
    console.log(res)
})
.catch((err)=>{
    console.log(err)
})
```
#### all方法：
1. 接受一个promise数组，数组中有非promise选项，将此项当做成功；
2. 如果全部成功，则返回成功结果的数组；
3. 如果有一个失败，则返回这个失败结果。

都成功:
```js
function out(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(`我是${time}毫秒~`)
        },time)
    })
}

Promise.all([out(1000),out(4000),out(3000),out(2000)])
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})

// 成功： 过了4秒后输出： ["我是1000毫秒~", "我是4000毫秒~", "我是3000毫秒~", "我是2000毫秒~"]
```

有个失败：
```js
function out(time,tag){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            tag?resolve(`我是${time}毫秒~`):reject(`我是${time}毫秒!`)
        },time)
    })
}

Promise.all([out(1000,true),out(4000,true),out(3000),out(2000)])
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})


// 失败：2秒后，输出“我是2000毫秒!”
```

#### race方法
1. 接受一个promise数组，数组中有非promise选项，将此项当做成功；
2. 哪个最快得到结果就输出哪个。

```js
function out(time,tag){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            tag?resolve(`我是${time}毫秒~`):reject(`我是${time}毫秒!`)
        },time)
    })
}

Promise.race([out(3000,true),out(4000,true),out(1000),out(2000)])
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})

// 失败：1秒后，输出“我是1000毫秒!”
```
### class
以前使用构造函数生成对象：
```js
function person(name){
    this.name=name
}
// 如果是箭头函数，打印就是undefined
// person.prototype.alertName=()=>{
person.prototype.alertName=function(){
    console.log(this.name)
}

const one=new person('qfh')
one.alertName()
// qfh
```
现在用es6 class实现构造函数：
```js
class person{
    constructor(name){
        this.name=name
    }
    alertName(){
        console.log(this.name)
    }
}
const one=new person('qfh')
one.alertName()
// qfh
```
静态属性和方法实例都不能调用
```js
class person{
    constructor(name){
        this.name=name
    }
    static age=26
    static alertName(){
        console.log(this.name)
    }
}
const one=new person('qfh')
one.alertName()
// one.alertName is not a function
console.log(one.age)
// undefined
```
用extends实现继承
```js
class person{
    constructor(name,age){
        this.name=name
        this.age=age
    }
    alertName(){
        console.log(this.name)
    }
}
class GoodPerson extends person{
    alertAge(){
        console.log(this.age)
    }
}
const leiFeng=new GoodPerson('qfh',26)
leiFeng.alertAge()
// 26
leiFeng.alertName()
// qfh
```

### 解构赋值
以前
```js
const person = {
    name: 'qfh',
    age: 26,
    pet: 'cat'
}
const name = person.name
const age = person.age
const pet = person.pet
console.log(name, age, pet)
VM82:9 qfh 26 cat
```

现在
```js
const person = {
    name: 'qfh',
    age: 26,
    pet: 'cat'
}
const {
    name,
    age,
    pet
} = person
console.log(name, age, pet)
// qfh 26 cat
```

嵌套解构
```js
const person = {
    name: 'qfh',
    age: 26,
    pet: {
        name: 'paofu',
        age: 1
    }
}
const {
    pet: {
        name,
        age
    }
} = person
console.log(name, age)
// VM158:15 paofu 1
```

重命名
```js
const person = {
    name: 'qfh',
    age: 26,
    pet: {
        name: 'paofu',
        age: 1
    }
}
const {
    pet: {
        name: petName,
        age
    }
} = person
console.log(petName, age)
// VM221:15 paofu 1
```
## ES7
## ES8
## ES10
## ES11
## ES12