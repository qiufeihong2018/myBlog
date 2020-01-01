# 重读MDN-Object
## Object.assign()
Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

### 语法
```
Object.assign(target, ...sources)
```
#### 参数
1. target
目标对象。
2. sources
源对象。
#### 返回值
目标对象。

### 例子
官网上的例子我就不说了，说些平时遇到过的和官网上没有的

#### 添加属性
还可以给实例对象添加属性

```JS
class A{constructor(b,c){Object.assign(this,{b,c})}}
let a=new A(12312,312312)
console.log(a)
//A {b: 12312, c: 312312}


class A{constructor(b,c){}}
let a=new A(12312,312312)
console.log(a)
// A {}
```
#### 针对数组
Object.assign()针对数组做了一番变化：
1. 全是数组
后面的数组在相同位置上会将前面的数组替换。
2. 数组在后
数组的值在对象中抢占位置，返回对象
3. 数组在前
对象的值跟在数组后面，返回数组

看例子
```js
console.log(Object.assign(['a','b','c'],['d','e']))
// ["d", "e", "c"]

console.log(Object.assign({d:'abc'},[2312312,31231,3123123]))
// {0: 2312312, 1: 31231, 2: 3123123, d: "abc"}

console.log(Object.assign(['a','b','c'],{d:'abc'}))
//  ["a", "b", "c", d: "abc"]

```
总而言之，所有的类型都是随目标对象。

#### 浅拷贝
看例子
```js
const o1={a:0}
const o2=Object.assign(o1)
o1.a=1
console.log(o2)
// {a: 1}
```
这就说明Object.assign()只拷贝了该属性的引用，而没不是深拷贝，还是同一个位置，并没有创建了一个量空间。

## Object.create()
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 （请打开浏览器控制台以查看运行结果。）

### 语法

```js
Object.create(proto[, propertiesObject])
```
#### 参数
1. proto
新创建对象的原型对象。
2. propertiesObject
可选。如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
#### 返回值
一个新对象，带着指定的原型对象和属性。
#### 例外
如果propertiesObject参数是 null 或非原始包装对象，则抛出一个 TypeError 异常。
```js
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = "Matthew"; // "name"是 "me"的属性,不是"person"的属性
me.isHuman = true; // 可以重写继承的属性

me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"

```
### 用 Object.create实现类式继承
```js
// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'
```

###使用 Object.create 的 propertyObject参数
```js
//创建一个可写的,可枚举的,可配置的属性p
o2 = Object.create({}, {
  p: {
    value: 42, 
    writable: true,
    enumerable: true,
    configurable: true 
  } 
});
```

## Object.defineProperties()
Object.defineProperties() 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

### 描述
Object.defineProperties本质上定义了obj 对象上props的可枚举属性相对应的所有属性。

```js
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});
```

## Object.defineProperty()
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

## Object.entries()
Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。

```js
const a = {
  a: 'somestring',
  b: 42
};

for (let [key, value] of Object.entries(a)) {
  console.log(`${key}: ${value}`);
}

// expected output:
// "a: somestring"
// "b: 42"
// order is not guaranteed

```

## Object.freeze()
Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

```js
const a = {
  prop: 42
};

Object.freeze(a);

a.prop = 33;
// Throws an error in strict mode

console.log(a.prop);
// expected output: 42

```

## Object.fromEntries()
 Object.fromEntries() 方法把键值对列表转换为一个对象。与entries相反
```js
const a = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

const obj = Object.fromEntries(a);

console.log(obj);
// expected output: Object { foo: "bar", baz: 42 }

```
## 参考文献
[Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路