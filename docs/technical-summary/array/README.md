# Array

JavaScript的 Array 对象是用于构造数组的全局对象，数组是类似于列表的高阶对象。

## Array.length
length 是Array的实例属性。返回或设置一个数组中的元素个数。该值是一个无符号 32-bit 整数，并且总是大于数组最高项的下标。
```
var a=[1,2,3,4,5]

console.log(a.length)
```
最高项下标是4,但是个数是5,所以取最后一项必须是n-1,n表示数组个数

```js
var a = new Array(4294967296); // 2的32次方 = 4294967296 
var b = new Array(-100) // 负号

console.log(a.length); // Error: Invalid array length
console.log(b.length); // Error: Invalid array length



var c = []; 
c.length = Math.pow(2,32)-1; //set array length less than 2 to the 32nd power 
console.log(c.length); 

// 4294967295
```
- 当通过改变length属性值来扩展数组时，实际元素的数目将会增加。例如：将一个拥有 3 个元素的数组的 length 属性值设为 5 时，那么这个数组将会包含5个元素，后两个值将会是 undefined 。
- 可以设置length值来截取数组长度。

```js
var a=[1,2,3]
console.log(a)//> Array [1, 2, 3]
a.length=5
console.log(a)//> Array [1, 2, 3, undefined, undefined]
a.length=1
console.log(a)//> Array [1]
```
## Array.prototype
Array.prototype  属性表示 Array 构造函数的原型，并允许您向所有Array对象添加新的属性和方法。
### 描述
鲜为人知的事实：Array.prototype 本身也是一个 Array。
### 属性
- Array.prototype.constructor
所有的数组实例都继承了这个属性，它的值就是 Array，表明了所有的数组都是由 Array 构造出来的。
- Array.prototype.length
上面说了，因为 Array.prototype 也是个数组，所以它也有 length 属性，这个值为 0，因为它是个空数组。
### 方法
#### 会改变自身
- Array.prototype.copyWithin() 
在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。

- Array.prototype.fill() 
将数组中指定区间的所有元素的值，都替换成某个固定的值。

- Array.prototype.pop()
删除数组的最后一个元素，并返回这个元素。

- Array.prototype.push()
在数组的末尾增加一个或多个元素，并返回数组的新长度。

- Array.prototype.reverse()
颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。

- Array.prototype.shift()
删除数组的第一个元素，并返回这个元素。

- Array.prototype.sort()
对数组元素进行排序，并返回当前数组。

- Array.prototype.splice()
在任意的位置给数组添加或删除任意个元素。

- Array.prototype.unshift()
在数组的开头增加一个或多个元素，并返回数组的新长度。

#### 不会改变自身
- Array.prototype.concat()
返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。

- Array.prototype.includes() 
判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。

- Array.prototype.join()
连接所有数组元素组成一个字符串。

- Array.prototype.slice()
抽取当前数组中的一段元素组合成一个新数组。

- Array.prototype.toSource() 
返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 Object.prototype.toSource() 方法。

- Array.prototype.toString()
返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。

- Array.prototype.toLocaleString()
返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 Object.prototype.toLocaleString() 方法。

- Array.prototype.indexOf()
返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

- Array.prototype.lastIndexOf()
返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。

#### 遍历方法

- Array.prototype.forEach()
为数组中的每个元素执行一次回调函数。

- Array.prototype.entries() 
返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。

- Array.prototype.every()
如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。

- Array.prototype.some()
如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。

- Array.prototype.filter()
将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。

- Array.prototype.find() 
找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。

- Array.prototype.findIndex() 
找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。

- Array.prototype.keys() 
返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。

- Array.prototype.map()
返回一个由回调函数的返回值组成的新数组。

- Array.prototype.reduce()
从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

- Array.prototype.reduceRight()
从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

- Array.prototype.values() 
返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。
## Array.from()
Array.from() 方法从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例。
### 语法
Array.from(arrayLike[, mapFn[, thisArg]])

- arrayLike

想要转换成数组的伪数组对象或可迭代对象。

- mapFn (可选参数)

如果指定了该参数，新数组中的每个元素会执行该回调函数。

- thisArg (可选参数)

可选参数，执行回调函数 mapFn 时 this 对象。

### 描述
Array.from() 可以通过以下方式来创建数组对象：

- 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）
- 可迭代对象（可以获取对象中的元素,如 Map和 Set 等）
  
Array.from() 方法有一个可选参数 mapFn，让你可以在最后生成的数组上再执行一次 map 方法后再返回。也就是说 Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg), 除非创建的不是可用的中间数组。 这对一些数组的子类,如  typed arrays 来说很重要, 因为中间数组的值在调用 map() 时需要是适当的类型。

from() 的 length 属性为 1 ，即Array.from.length === 1。

在 ES2015 中， Class 语法允许我们为内置类型（比如 Array）和自定义类新建子类（比如叫 SubArray）。这些子类也会继承父类的静态方法，比如 SubArray.from()，调用该方法后会返回子类 SubArray 的一个实例，而不是 Array 的实例。


```js
console.log(Array.from('foo'));
//> Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
//> Array [2, 4, 6]
```

## Array.isArray()
Array.isArray() 用于确定传递的值是否是一个 Array。如果对象是 Array，则为true; 否则为false。

```js
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype); 

// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({ __proto__: Array.prototype });
```

当检测Array实例时, Array.isArray 优于 instanceof,因为Array.isArray能检测iframes.

```js
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
```

## Array.of()

Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

 Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组（注意：这是指一个有7个空位(empty)的数组，而不是由7个undefined组成的数组）。

```js
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```
## Array.prototype.concat()
concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

### 描述
concat方法创建一个新的数组，它由被调用的对象中的元素组成，每个参数的顺序依次是该参数的元素（如果参数是数组）或参数本身（如果参数不是数组）。它不会递归到嵌套数组参数中。

concat方法不会改变this或任何作为参数提供的数组，而是返回一个浅拷贝，它包含与原始数组相结合的相同元素的副本。 原始数组的元素将复制到新数组中，如下所示：

对象引用（而不是实际对象）：concat将对象引用复制到新数组中。 原始数组和新数组都引用相同的对象。 也就是说，如果引用的对象被修改，则更改对于新数组和原始数组都是可见的。 这包括也是数组的数组参数的元素。
数据类型如字符串，数字和布尔（不是String，Number 和 Boolean 对象）：concat将字符串和数字的值复制到新数组中。

简单地说,就是跟着原来的变

## Array.prototype.copyWithin()
copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

### 语法 
arr.copyWithin(target[, start[, end]])

- target
0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。
如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
- start
0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。
如果 start 被忽略，copyWithin 将会从0开始复制。
- end
0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。
如果 end 被忽略，copyWithin 方法将会一直复制至数组结尾（默认为 arr.length）。

### 描述
参数 target、start 和 end 必须为整数。

如果 start 为负，则其指定的索引位置等同于 length+start，length 为数组的长度。end 也是如此。

copyWithin 方法不要求其 this 值必须是一个数组对象；除此之外，copyWithin 是一个可变方法，它可以改变 this 对象本身，并且返回它，而不仅仅是它的拷贝。

copyWithin 就像 C 和 C++ 的 memcpy 函数一样，且它是用来移动 Array 或者 TypedArray 数据的一个高性能的方法。复制以及粘贴序列这两者是为一体的操作;即使复制和粘贴区域重叠，粘贴的序列也会有拷贝来的值。

copyWithin 函数被设计为通用式的，其不要求其 this 值必须是一个数组对象。

copyWithin 是一个可变方法，它不会改变 this 的长度 length，但是会改变 this 本身的内容，且需要时会创建新的属性。

### 例子
```js
let numbers = [1, 2, 3, 4, 5];

numbers.copyWithin(-2);
// [1, 2, 3, 1, 2]

numbers.copyWithin(0, 3);
// [4, 5, 3, 4, 5]

numbers.copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]

numbers.copyWithin(-2, -3, -1);
// [1, 2, 3, 3, 4]

[].copyWithin.call({length: 5, 3: 1}, 0, 3);
// {0: 1, 3: 1, length: 5}

// ES2015 Typed Arrays are subclasses of Array
var i32a = new Int32Array([1, 2, 3, 4, 5]);

i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// On platforms that are not yet ES2015 compliant: 
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

## Array.prototype.entries()
entries() 方法返回一个新的Array Iterator(迭代器)对象，该对象包含数组中每个索引的键/值对。

```js
var array1 = ['a', 'b', 'c'];

var iterator1 = array1.entries();

console.log(iterator1.next().value);
// expected output: Array [0, "a"]

console.log(iterator1.next().value);
// expected output: Array [1, "b"]
```

## Array.prototype.every()
every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
```js
var arr = [1,2,3,4,5];

console.log(arr.every(function(a){
return a>=1}));

```

### 描述
every 方法为数组中的每个元素执行一次 callback 函数，直到它找到一个会使 callback 返回 falsy 的元素。如果发现了一个这样的元素，every 方法将会立即返回 false。否则，callback 为每一个元素返回 true，every 就会返回 true。callback 只会为那些已经被赋值的索引调用。不会为那些被删除或从未被赋值的索引调用。

callback 在被调用时可传入三个参数：元素值，元素的索引，原数组。

如果为 every 提供一个 thisArg 参数，则该参数为调用 callback 时的 this 值。如果省略该参数，则 callback 被调用时的 this 值，在非严格模式下为全局对象，在严格模式下传入 undefined。详见 this 条目。

every 不会改变原数组。

every 遍历的元素范围在第一次调用 callback 之前就已确定了。在调用 every 之后添加到数组中的元素不会被 callback 访问到。如果数组中存在的元素被更改，则他们传入 callback 的值是 every 访问到他们那一刻的值。那些被删除的元素或从来未被赋值的元素将不会被访问到。

every 和数学中的"所有"类似，当所有的元素都符合条件才会返回true。正因如此，若传入一个空数组，无论如何都会返回 true。

## 参考文献

[Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)