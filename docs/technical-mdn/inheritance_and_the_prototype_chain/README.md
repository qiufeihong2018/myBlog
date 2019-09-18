# 重读MDN-继承与原型链
对于使用过基于类的语言 (如 Java 或 C++) 的开发人员来说，JavaScript 有点令人困惑，因为它是动态的，并且本身不提供一个 class 实现。（在 ES2015/ES6 中引入了 class 关键字，但那只是语法糖，JavaScript 仍然是基于原型的）。

当谈到继承时，JavaScript 只有一种结构：对象。每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。

几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。

##基于原型链的继承
### 继承属性
JavaScript 对象是动态的属性“包”（指其自己的属性）。JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

```js
// 让我们从一个自身拥有属性a和b的函数里创建一个对象o：
let f = function () {
   this.a = 1;
   this.b = 2;
}
/* 这么写也一样
function f() {
  this.a = 1;
  this.b = 2;
}
*/
let o = new f(); // {a: 1, b: 2}

// 在f函数的原型上定义属性
f.prototype.b = 3;
f.prototype.c = 4;

// 不要在 f 函数的原型上直接定义 f.prototype = {b:3,c:4};这样会直接打破原型链
// o.[[Prototype]] 有属性 b 和 c
//  (其实就是 o.__proto__ 或者 o.constructor.prototype)
// o.[[Prototype]].[[Prototype]] 是 Object.prototype.
// 最后o.[[Prototype]].[[Prototype]].[[Prototype]]是null
// 这就是原型链的末尾，即 null，
// 根据定义，null 就是没有 [[Prototype]]。

// 综上，整个原型链如下: 

// {a:1, b:2} ---> {b:3, c:4} ---> Object.prototype---> null

console.log(o.a); // 1
// a是o的自身属性吗？是的，该属性的值为 1

console.log(o.b); // 2
// b是o的自身属性吗？是的，该属性的值为 2
// 原型上也有一个'b'属性，但是它不会被访问到。
// 这种情况被称为"属性遮蔽 (property shadowing)"

console.log(o.c); // 4
// c是o的自身属性吗？不是，那看看它的原型上有没有
// c是o.[[Prototype]]的属性吗？是的，该属性的值为 4

console.log(o.d); // undefined
// d 是 o 的自身属性吗？不是，那看看它的原型上有没有
// d 是 o.[[Prototype]] 的属性吗？不是，那看看它的原型上有没有
// o.[[Prototype]].[[Prototype]] 为 null，停止搜索
// 找不到 d 属性，返回 undefined
```

### 继承方法
JavaScript 并没有其他基于类的语言所定义的“方法”。在 JavaScript 里，任何函数都可以添加到对象上作为对象的属性。函数的继承与其他的属性继承没有差别，包括上面的“属性遮蔽”（这种情况相当于其他语言的方法重写）。

当继承的函数被调用时，this 指向的是当前继承的对象，而不是继承的函数所在的原型对象。
```js
var o = {
  a: 2,
  m: function(){
    return this.a + 1;
  }
};

console.log(o.m()); // 3
// 当调用 o.m 时，'this' 指向了 o.

var p = Object.create(o);
// p是一个继承自 o 的对象

p.a = 4; // 创建 p 的自身属性 'a'
console.log(p.m()); // 5
// 调用 p.m 时，'this' 指向了 p
// 又因为 p 继承了 o 的 m 函数
// 所以，此时的 'this.a' 即 p.a，就是 p 的自身属性 'a'
```
## 在 JavaScript 中使用原型
函数（function）是允许拥有属性的

所有的函数会有一个特别的属性 —— prototype 。

```js
function doSomething(){}
console.log( doSomething.prototype );
// {
//     constructor: {
//         arguments: null
//         caller: null
//         length: 0
//         name: "doSomething"
//         prototype: {constructor: ƒ}
//         __proto__: ƒ ()
//         [[FunctionLocation]]: VM224:1
//         [[Scopes]]: Scopes[1]
//     },
//     __proto__:{
//         constructor: ƒ Object()
//         hasOwnProperty: ƒ hasOwnProperty()
//         isPrototypeOf: ƒ isPrototypeOf()
//         propertyIsEnumerable: ƒ         propertyIsEnumerable()
//         toLocaleString: ƒ toLocaleString()
//         toString: ƒ toString()
//         valueOf: ƒ valueOf()
//         __defineGetter__: ƒ __defineGetter__()
//         __defineSetter__: ƒ __defineSetter__()
//         arguments: (...)
//         caller: (...)
//         length: 2
//         name: "__defineSetter__"
//         __proto__: ƒ ()
//         [[Scopes]]: Scopes[0]
//         __lookupGetter__: ƒ __lookupGetter__()
//         __lookupSetter__: ƒ __lookupSetter__()
//         get __proto__: ƒ __proto__()
//         set __proto__: ƒ __proto__()
//     }
// }
```

给doSomething函数的原型对象添加新属性
```js
function doSomething(){}
doSomething.prototype.foo = "bar";
console.log( doSomething.prototype );
// {
//     foo: "bar"
//     constructor: ƒ doSomething()
//     __proto__: Object
// }

```
通过new操作符来创建基于这个原型对象的doSomething实例。使用new操作符，只需在调用doSomething函数语句之前添加new。这样，便可以获得这个函数的一个实例对象。一些属性就可以添加到该原型对象中。


```js
function doSomething(){}
doSomething.prototype.foo = "bar"; // add a property onto the prototype
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value"; // add a property onto the object
console.log( doSomeInstancing );
// {
//     prop: "some value"
//     __proto__{
//         foo: "bar"
//         constructor: ƒ doSomething()
//         __proto__: Object
//     }
// }

```

如上所示, doSomeInstancing 中的__proto__是 doSomething.prototype. 但这是做什么的呢？当你访问doSomeInstancing 中的一个属性，浏览器首先会查看doSomeInstancing 中是否存在这个属性。

如果 doSomeInstancing 不包含属性信息, 那么浏览器会在 doSomeInstancing 的 __proto__ 中进行查找(同 doSomething.prototype). 如属性在 doSomeInstancing 的 __proto__ 中查找到，则使用 doSomeInstancing 中 __proto__ 的属性。

否则，如果 doSomeInstancing 中 __proto__ 不具有该属性，则检查doSomeInstancing 的 __proto__ 的  __proto__ 是否具有该属性。默认情况下，任何函数的原型属性 __proto__ 都是 window.Object.prototype. 因此, 通过doSomeInstancing 的 __proto__ 的  __proto__  ( 同 doSomething.prototype 的 __proto__ (同  Object.prototype)) 来查找要搜索的属性。

如果属性不存在 doSomeInstancing 的 __proto__ 的  __proto__ 中， 那么就会在doSomeInstancing 的 __proto__ 的  __proto__ 的  __proto__ 中查找。然而, 这里存在个问题：doSomeInstancing 的 __proto__ 的  __proto__ 的  __proto__ 其实不存在。因此，只有这样，在 __proto__ 的整个原型链被查看之后，这里没有更多的 __proto__ ， 浏览器断言该属性不存在，并给出属性值为 undefined 的结论。

```js
function doSomething(){}
doSomething.prototype.foo = "bar";
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value";
console.log("doSomeInstancing.prop:      " + doSomeInstancing.prop);
console.log("doSomeInstancing.foo:       " + doSomeInstancing.foo);
console.log("doSomething.prop:           " + doSomething.prop);
console.log("doSomething.foo:            " + doSomething.foo);
console.log("doSomething.prototype.prop: " + doSomething.prototype.prop);
console.log("doSomething.prototype.foo:  " + doSomething.prototype.foo);
// doSomeInstancing.prop:      some value
// doSomeInstancing.foo:       bar
// doSomething.prop:           undefined
// doSomething.foo:            undefined
// doSomething.prototype.prop: undefined
// doSomething.prototype.foo:  bar

```
## 使用不同的方法来创建对象和生成原型链

### 使用语法结构创建的对象

### 使用构造器创建的对象
在 JavaScript 中，构造器其实就是一个普通的函数。当使用 new 操作符 来作用这个函数时，它就可以被称为构造方法（构造函数）。

### 使用 Object.create 创建的对象
ECMAScript 5 中引入了一个新方法：Object.create()。可以调用这个方法来创建一个新对象。新对象的原型就是调用 create 方法时传入的第一个参数：
```js
var a = {a: 1}; 
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined, 因为d没有继承Object.prototype
```
###使用 class 关键字创建的对象
ECMAScript6 引入了一套新的关键字用来实现 class。使用基于类语言的开发人员会对这些结构感到熟悉，但它们是不同的。JavaScript 仍然基于原型。这些新的关键字包括 class, constructor，static，extends 和 super。

### 性能
在原型链上查找属性比较耗时，对性能有副作用，这在性能要求苛刻的情况下很重要。另外，试图访问不存在的属性时会遍历整个原型链。

遍历对象的属性时，原型链上的每个可枚举属性都会被枚举出来。要检查对象是否具有自己定义的属性，而不是其原型链上的某个属性，则必须使用所有对象从 Object.prototype 继承的 hasOwnProperty 方法。下面给出一个具体的例子来说明它：
```js
console.log(g.hasOwnProperty('vertices'));
// true

console.log(g.hasOwnProperty('nope'));
// false

console.log(g.hasOwnProperty('addVertex'));
// false

console.log(g.__proto__.hasOwnProperty('addVertex'));
// true
```
hasOwnProperty 是 JavaScript 中唯一一个处理属性并且不会遍历原型链的方法。

注意：检查属性是否为 undefined 是不能够检查其是否存在的。该属性可能已存在，但其值恰好被设置成了 undefined。

## 结论
在编写使用它的复杂代码之前，理解原型继承模型是至关重要的。此外，请注意代码中原型链的长度，并在必要时将其分解，以避免可能的性能问题。此外，原生原型不应该被扩展，除非它是为了与新的 JavaScript 特性兼容。

## 参考文献
[继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路