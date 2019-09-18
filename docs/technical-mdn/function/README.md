# 重读MDN-Function

## Function.length
length 属性指明函数的形参个数。
```js
function func1() {}

function func2(a, b, c, d) {}

console.log(func1.length);
// expected output: 0

console.log(func2.length);
// expected output: 4

console.log((function(...args) {}).length); 
// 0, 未计算REST参数

console.log((function(a, b = 1, c) {}).length);
//只有第一个参数之前的参数
//计算默认值a
```

## Function.prototype
Function.prototype 属性存储了 Function 的原型对象。

Function对象继承自 Function.prototype 属性。因此，Function.prototype 不能被修改。


## Function.name
function.name 属性返回函数实例的名称。

返回函数名
```js

function func1() {}
console.log(func1.name)
//> "func1"
```
构造函数返回anonymous(匿名)

```js

console.log((new Function).name)
//> "anonymous"

```
Function.bind() 所创建的函数将会在函数的名称前加上"bound " 

```js
function foo() {}; 
console.log(foo.bind({}).name); 
//> "bound foo"

```
当通过 get 和 set 访问器来存取属性时, "get" 或 "set" 会出现在函数名称前。

```js
var o = { 
  get foo(){}, 
  set foo(x){} 
}; 

var descriptor = Object.getOwnPropertyDescriptor(o, "foo"); 
descriptor.get.name; // "get foo" 
descriptor.set.name; // "set foo";

```
如果Symbol 被用于函数名称，并且这个symbol具有相应的描述符，那么方法的名字就是方括号中的描述符。

```js
var sym1 = Symbol("foo"); 
var sym2 = Symbol(); 
var o = { 
  [sym1]: function(){}, 
  [sym2]: function(){} 
}; 
console.log(sym1)
console.log(sym2)
console.log(o)
console.log(o[sym1].name)
console.log(o[sym2].name)
// > Symbol(foo)
// > Symbol()
// > Object {  }
// > "[foo]"
// > ""
```

## Function.prototype.apply()
apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。

注意：call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。


在调用一个存在的函数时，你可以为其指定一个 this 对象。 this 指当前对象，也就是正在调用这个函数的对象。 使用 apply， 你可以只写一次这个方法然后在另一个对象中继承它，而不用在新对象中重复写该方法。

apply 与 call() 非常相似，不同之处在于提供参数的方式。apply 使用参数数组而不是一组参数列表。apply 可以使用数组字面量（array literal），如 fun.apply(this, ['eat', 'bananas'])，或数组对象， 如  fun.apply(this, new Array('eat', 'bananas'))。

你也可以使用 arguments对象作为 argsArray 参数。 arguments 是一个函数的局部变量。 它可以被用作被调用对象的所有未指定的参数。 这样，你在使用apply函数的时候就不需要知道被调用对象的所有参数。 你可以使用arguments来把所有的参数传递给被调用对象。 被调用对象接下来就负责处理这些参数。

从 ECMAScript 第5版开始，可以使用任何种类的类数组对象，就是说只要有一个 length 属性和(0..length-1)范围的整数属性。例如现在可以使用 NodeList 或一个自己定义的类似 {'length': 2, '0': 'eat', '1': 'bananas'} 形式的对象。

###语法
func.apply(thisArg, [argsArray])
####参数
thisArg
可选的。在 func 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
argsArray
可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或  undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。 浏览器兼容性 请参阅本文底部内容。
####返回值
调用有指定this值和参数的函数的结果。

用 apply 将数组添加到另一个数组

```js
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

## Function.prototype.bind()
bind()方法创建一个新的函数，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

bind() 函数会创建一个新绑定函数（bound function，BF）。绑定函数是一个exotic function object（怪异函数对象，ECMAScript 2015中的术语），它包装了原函数对象。调用绑定函数通常会导致执行包装函数。
绑定函数具有以下内部属性：
[[BoundTargetFunction]] - 包装的函数对象
[[BoundThis]] - 在调用包装函数时始终作为this值传递的值。
[[BoundArguments]] - 列表，在对包装函数做任何调用都会优先用列表元素填充参数列表。
[[Call]] - 执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个this值和一个包含通过调用表达式传递给函数的参数的列表。
当调用绑定函数时，它调用[[BoundTargetFunction]]上的内部方法[[Call]]，就像这样Call(boundThis, args)。其中，boundThis是[[BoundThis]]，args是[[BoundArguments]]加上通过函数调用传入的参数列表。

绑定函数也可以使用new运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的this值会被忽略，但前置参数仍会提供给模拟函数。

### 语法
function.bind(thisArg[, arg1[, arg2[, ...]]])
####参数
thisArg
调用绑定函数时作为this参数传递给目标函数的值。 如果使用new运算符构造绑定函数，则忽略该值。当使用bind在setTimeout中创建一个函数（作为回调提供）时，作为thisArg传递的任何原始值都将转换为object。如果bind函数的参数列表为空，执行作用域的this将被视为新函数的thisArg。
arg1, arg2, ...
当目标函数被调用时，预先添加到绑定函数的参数列表中的参数。
#### 返回值
返回一个原函数的拷贝，并拥有指定的this值和初始参数。

### 创建绑定函数

bind() 最简单的用法是创建一个函数，不论怎么调用，这个函数都有同样的 this 值。JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，期望方法中的 this 是原来的对象（比如在回调中传入这个方法）。如果不做特殊处理的话，一般会丢失原来的对象。基于这个函数，用原始的对象创建一个绑定函数，
```js
this.x = 9;    // 在浏览器中，this指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   
// 返回9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81

```

### 偏函数
bind()的另一个最简单的用法是使一个函数拥有预设的初始参数。只要将这些参数（如果有的话）作为bind()的参数写在this后面。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。

### 配合 setTimeout

在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window （或global）对象。当类的方法中需要 this 指向类的实例时，你可能需要显式地把 this 绑定到回调函数，就不会丢失该实例的引用。

### 作为构造函数使用的绑定函数
绑定函数自动适应于使用 new 操作符去构造一个由目标函数创建的新实例。当一个绑定函数是用来构建一个值的，原来提供的 this 就会被忽略。不过提供的参数列表仍然会插入到构造函数调用时的参数列表之前。

## Function.prototype.call()

call() 允许为不同的对象分配和调用属于一个对象的函数/方法。

call() 提供新的 this 值给当前调用的函数/方法。你可以使用 call 来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

### 使用 call 方法调用父构造函数
在一个子构造函数中，你可以通过调用父构造函数的 call 方法来实现继承，类似于 Java 中的写法。下例中，使用 Food 和 Toy 构造函数创建的对象实例都会拥有在 Product 构造函数中添加的 name 属性和 price 属性,但 category 属性是在各自的构造函数中定义的。

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}
let fun=new Food('cheese', 5)
console.log(fun.name,fun.price,fun.category);
// expected output: "cheese" 5 "food"

```
###使用 call 方法调用匿名函数
```js
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log('#' + i + ' ' + this.species
                  + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}
// > "#0 Lion: King"
// > "#1 Whale: Fail"
```
### 使用 call 方法调用函数并且指定上下文的 'this'
```js
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours

```
### 使用 call 方法调用函数并且不指定第一个参数（argument）
```js
var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen
// 注意：在严格模式下，this 的值将会是 undefined。

'use strict';

var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call(); // Cannot read the property of 'sData' of undefined
```

## Function.prototype.toString()

toString() 方法返回一个表示当前函数源代码的字符串。

Function对象覆盖了从Object继承来的toString 方法。对于用户定义的 Function 对象，toString方法返回一个字符串，其中包含用于定义函数的源文本段。

在Function需要转换为字符串时，通常会自动调用函数的 toString 方法。

若 this 不是 Function 对象，则 toString() 方法将抛出 TypeError  ("Function.prototype.toString called on incompatible object") 异常，比如 Proxy 对象就会抛出异常。

Function.prototype.toString.call('foo'); // TypeError
如果是在内置函数或由 Function.prototype.bind 返回的函数上调用 toString()，则toString() 返回原生代码字符串，如下

"function () {\n    [native code]\n}"
若是在由 Function 构造器生成的函数上调用 toString() ，则 toString() 返回创建后的函数源码，包括形参和函数体，函数名为 "anonymous"。

```js
function sum(a, b) {
  return a + b;
}

console.log(sum.toString());
// expected output: "function sum(a, b) {
//                     return a + b;
//                   }"

console.log(Math.abs.toString());
// expected output: "function abs() { [native code] }"

```
## 参考文献
[Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路