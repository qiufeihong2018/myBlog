# Object

## Object.assign()
Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

```js
const target = { a: 1, b: 2 };
const source1 = { b: 4, c: 5 };
const source2 = { b: 5, c: 3, d:3 };

const returnedTarget = Object.assign(target, source1,source2);

console.log(target);
// expected output: Object { a: 1, b: 5, c: 3, d: 3 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 5, c: 3, d: 3 }

```

### 语法
```
Object.assign(target, ...sources)
```
1. 参数
- target
目标对象。
- sources
源对象。
2. 返回值
目标对象。


### 描述
如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。

Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。

String类型和 Symbol 类型的属性都会被拷贝。

在出现错误的情况下，例如，如果属性不可写，会引发TypeError，如果在引发错误之前添加了任何属性，则可以更改target对象。

注意，Object.assign 不会在那些source对象值为 null 或 undefined 的时候抛出错误。


## Object.create()
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 （请打开浏览器控制台以查看运行结果。）

```js
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"

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