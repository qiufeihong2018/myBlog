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
## Array.prototype.fill()
fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
```js
var array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]
```

### 语法
```js
arr.fill(value[, start[, end]])
```
- value
用来填充数组元素的值。

- start 可选
起始索引，默认值为0。

- end 可选
终止索引，默认值为 this.length。

### 描述
ill 方法接受三个参数 value, start 以及 end. start 和 end 参数是可选的, 其默认值分别为 0 和 this 对象的 length 属性值。

如果 start 是个负数, 则开始索引会被自动计算成为 length+start, 其中 length 是 this 对象的 length 属性值。如果 end 是个负数, 则结束索引会被自动计算成为 length+end。

fill 方法故意被设计成通用方法, 该方法不要求 this 是数组对象。

fill 方法是个可变方法, 它会改变调用它的 this 对象本身, 然后返回它, 而并不是返回一个副本。

当一个对象被传递给 fill方法的时候, 填充数组的是这个对象的引用。

## Array.prototype.filter()
filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 

```js

var arr = [12,1,3,445,67,45];

const result = arr.filter(n => n > 44);

console.log(result);
//> Array [445, 67, 45]
```
### 语法
```js
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
```
- callback
用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。它接受以下三个参数：
- element
数组中当前正在处理的元素。
- index可选
正在处理的元素在数组中的索引。
- array可选
调用了 filter 的数组本身。
- thisArg可选
执行 callback 时，用于 this 的值。

### 描述

filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或等价于 true 的值的元素创建一个新数组。callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。

callback 被调用时传入三个参数：

- 元素的值
- 元素的索引
- 被遍历的数组本身

如果为 filter 提供一个 thisArg 参数，则它会被作为 callback 被调用时的 this 值。否则，callback 的 this 值在非严格模式下将是全局对象，严格模式下为 undefined。callback 函数最终观察到的 this 值是根据通常函数所看到的 "this"的规则确定的。

filter 不会改变原数组，它返回过滤后的新数组。

filter 遍历的元素范围在第一次调用 callback 之前就已经确定了。在调用 filter 之后被添加到数组中的元素不会被 filter 遍历到。如果已经存在的元素被改变了，则他们传入 callback 的值是 filter 遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。

## Array.prototype.find()
 find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
 ```js
arr.find(callback[, thisArg])
 ```

- callback
在数组每一项上执行的函数，接收 3 个参数：
- element
当前遍历到的元素。
- index可选
当前遍历到的索引。
- array可选
数组本身。
- thisArg可选
执行回调时用作this 的对象。

### 描述
find方法对数组中的每一项元素执行一次 callback 函数，直至有一个 callback 返回 true。当找到了这样一个元素后，该方法会立即返回这个元素的值，否则返回 undefined。注意 callback 函数会为数组中的每个索引调用即从 0 到 length - 1，而不仅仅是那些被赋值的索引，这意味着对于稀疏数组来说，该方法的效率要低于那些只遍历有值的索引的方法。

callback函数带有3个参数：当前元素的值、当前元素的索引，以及数组本身。

如果提供了 thisArg参数，那么它将作为每次 callback函数执行时的this ，如果未提供，则使用 undefined。

find方法不会改变数组。

在第一次调用 callback函数时会确定元素的索引范围，因此在 find方法开始执行之后添加到数组的新元素将不会被 callback函数访问到。如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。被删除的元素仍旧会被访问到。

## Array.prototype.findIndex()
findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

以下示例查找数组中素数的元素的索引（如果不存在素数，则返回-1）。
```js
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2
```
### 语法
```js
arr.findIndex(callback[, thisArg])
```

- callback
针对数组中的每个元素, 都会执行该回调函数, 执行时会自动传入下面三个参数:
- element
当前元素。
- index
当前元素的索引。
- array
调用findIndex的数组。
- thisArg
可选。执行callback时作为this对象的值.

### 描述
findIndex方法对数组中的每个数组索引0..length-1（包括）执行一次callback函数，直到找到一个callback函数返回真实值（强制为true）的值。如果找到这样的元素，findIndex会立即返回该元素的索引。如果回调从不返回真值，或者数组的length为0，则findIndex返回-1。 与某些其他数组方法（如Array#some）不同，在稀疏数组中，即使对于数组中不存在的条目的索引也会调用回调函数。

回调函数调用时有三个参数：元素的值，元素的索引，以及被遍历的数组。

如果一个 thisArg 参数被提供给 findIndex, 它将会被当作this使用在每次回调函数被调用的时候。如果没有被提供，将会使用undefined。

findIndex不会修改所调用的数组。

在第一次调用callback函数时会确定元素的索引范围，因此在findIndex方法开始执行之后添加到数组的新元素将不会被callback函数访问到。如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。被删除的元素仍然会被访问到。

## Array.prototype.flat()
flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

使用 reduce 与 concat可以替代
### 语法
```js
var newArray = arr.flat(depth)
```
depth 可选
指定要提取嵌套数组的结构深度，默认值为 1。

### 示例
- 扁平化嵌套数组
```js
var arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity 作为深度，展开任意深度的嵌套数组
arr3.flat(Infinity); 
// [1, 2, 3, 4, 5, 6]
```
- 扁平化与空项
```js

var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]
```

## Array.prototype.flatMap()
flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 和 深度值1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。

### 语法
```js
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])
```

- callback
可以生成一个新数组中的元素的函数，可以传入三个参数：
 
- currentValue
当前正在数组中处理的元素
- index可选
可选的。数组中正在处理的当前元素的索引。
- array可选
可选的。被调用的 map 数组
- thisArg可选
可选的。执行 callback 函数时 使用的this 值。

## Array.prototype.forEach()

forEach() 方法对数组的每个元素执行一次提供的函数。

### 语法
```
arr.forEach(callback[, thisArg]);
```

- callback
为数组中每个元素执行的函数，该函数接收三个参数：
- currentValue
数组中正在处理的当前元素。
- index可选
数组中正在处理的当前元素的索引。
- array可选
forEach() 方法正在操作的数组。
- thisArg可选
可选参数。当执行回调函数时用作 this 的值(参考对象)。

### 描述
forEach 方法按升序为数组中含有效值的每一项执行一次callback 函数，那些已删除或者未初始化的项将被跳过（例如在稀疏数组上）。

callback 函数会被依次传入三个参数：

数组当前项的值
数组当前项的索引
数组对象本身
如果 thisArg 参数有值，则每次 callback 函数被调用的时候，this 都会指向 thisArg 参数上的这个对象。如果省略了 thisArg 参数,或者赋值为 null 或 undefined，则 this 指向全局对象。callback 函数最终可观察到 this 值，这取决于函数观察到 this 的常用规则。

forEach 遍历的范围在第一次调用 callback 前就会确定。调用 forEach 后添加到数组中的项不会被 callback 访问到。如果已经存在的值被改变，则传递给 callback 的值是 forEach 遍历到他们那一刻的值。已删除的项不会被遍历到。如果已访问的元素在迭代时被删除了（例如使用 shift()），之后的元素将被跳过 - 参见下面的示例。

forEach() 为每个数组元素执行callback函数；不像 map() 或者 reduce()，它总是返回 undefined 值，并且不可链式调用。典型用例是在一个链的最后执行副作用。

forEach() 被调用时，不会改变原数组（即调用它的数组），即使传递的参数里的 callback被调用时可能会改变原数组。（译注：此处说法似不够准确，可参考EMCA语言规范：'forEach does not directly mutate the object on which it is called but the object may be mutated by the calls to callbackfn.'，即forEach不直接改变调用它的对象，但是对象可能会被callback改变。）

注意： 没有办法中止或者跳出 forEach() 循环，除了抛出一个异常。如果你需要这样，使用 forEach() 方法是错误的。

若你需要提前终止循环，你可以使用：

简单循环
for...of 循环
Array.prototype.every()
Array.prototype.some()
Array.prototype.find()
Array.prototype.findIndex()
这些数组方法可以对数组元素判断，以便确定是否需要继续遍历：every()，some()，find()，findIndex()

译者注：若条件允许，也可以使用 filter() 提前过滤出需要遍历的部分，再用 forEach() 处理。

## Array.prototype.includes()
includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

### 语法
```
arr.includes(valueToFind[, fromIndex])
```

valueToFind
需要查找的元素值。

Note:  使用 includes()比较字符串和字符时是区分大小写。

fromIndex 可选
从fromIndex 索引处开始查找 valueToFind。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。

## Array.prototype.indexOf()
indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
### 语法

```js
arr.indexOf(searchElement)
arr.indexOf(searchElement[, fromIndex = 0])
```
- searchElement
  
要查找的元素

- fromIndex
  
开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.

### 描述
indexOf 使用strict equality (无论是 ===, 还是 triple-equals操作符都基于同样的方法)进行判断 searchElement与数组中包含的元素之间的关系。

## Array.prototype.join()

join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

### 语法
```
arr.join([separator])
```

separator
指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果省略()，数组元素用逗号分隔。默认为 ","。如果separator是空字符串("")，则所有元素之间都没有任何字符。


### 描述
所有的数组元素被转换成字符串，再用一个分隔符将这些字符串连接起来。

如果一个元素为 undefined 或 null，它会被转换为空字符串。

## Array.prototype.keys()
 keys() 方法返回一个包含数组中每个索引键的Array Iterator对象。
### 语法

```
arr.keys()
```

```js
var arr = ["a", , "c"];
var denseKeys = [...arr.keys()];
console.log(denseKeys);  // [0, 1, 2]
```

## Array.prototype.lastIndexOf()
lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。

### 语法
```js
arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])
```
- searchElement
被查找的元素。
- fromIndex
从此位置开始逆向查找。默认为数组的长度减 1，即整个数组都被查找。如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。

## Array.prototype.map()

map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

### 语法
```js
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])

```
- callback
  
生成新数组元素的函数，使用三个参数：
- currentValue
  
callback 数组中正在处理的当前元素。
- index{{optional_inline}
  
callback 数组中正在处理的当前元素的索引。
- array{{optional_inline}}
  
callback  map 方法被调用的数组。
- thisArg{{optional_inline}}
  
执行 callback 函数时使用的this 值。
### 描述



如果 `thisArg` 参数有值，则每次 `callback` `函数被调用的时候，this` 都会指向 `thisArg` 参数上的这个对象。如果省略了 `thisArg` 参数,或者赋值为 `null` 或 `undefined，则` `this` 指向全局对象 。

map 不修改调用它的原数组本身（当然可以在 `callback` 执行时改变原数组）。

使用 map 方法处理数组时，数组元素的范围是在 `callback` 方法第一次调用之前就已经确定了。在 map 方法执行的过程中：原数组中新增加的元素将不会被 `callback` 访问到；若已经存在的元素被改变或删除了，则它们的传递到 `callback` 的值是 `map` 方法遍历到它们的那一时刻的值；而被删除的元素将不会被访问到。

## Array.prototype.pop()
pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

### 语法
```
arr.pop()
```

- 返回值
从数组中删除的元素(当数组为空时返回undefined)。

### 描述
pop 方法从一个数组中删除并返回最后一个元素。

pop 方法有意具有通用性。该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。pop方法根据 length属性来确定最后一个元素的位置。如果不包含length属性或length属性不能被转成一个数值，会将length置为0，并返回undefined。

如果你在一个空数组上调用 pop()，它返回  undefined。

## Array.prototype.push()
push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

### 语法
```js
arr.push(element1, ..., elementN)
```

- 参数
elementN
被添加到数组末尾的元素。
- 返回值
当调用该方法时，新的 length 属性值将被返回。

### 描述
push方法将值追加到数组中。

push 方法有意具有通用性。该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。

唯一的原生类数组（array-like）对象是 Strings，尽管如此，它们并不适用该方法，因为字符串是不可改变的。

- 添加元素到数组
- 合并两个数组
- 像数组一样使用对象

## Array.prototype.reduce()
reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
### 语法

```js
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

- callback
执行数组中每个值的函数，包含四个参数：
- accumulator
累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）。

- currentValue
数组中正在处理的元素。
- currentIndex可选
数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则为1。
- array可选
调用reduce()的数组
- initialValue可选
作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
### 描述

reduce为数组中的每一个元素依次执行callback函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：

accumulator 累计器
currentValue 当前值
currentIndex 当前索引
array 数组
回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。

注意：如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。

如果数组为空且没有提供initialValue，会抛出TypeError 。如果数组仅有一个元素（无论位置如何）并且没有提供initialValue， 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。



## Array.prototype.reduceRight()
reduceRight() 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
### 语法
```
arr.reduceRight(callback[, initialValue])
```

参数
- callback
一个回调函数，用来操作数组中的每个元素，可接受四个参数：
- previousValue
上一次调用回调的返回值，或提供的 initialValue
- currentValue
当前被处理的元素
- index
当前处理元素的索引
- array
调用 reduce 的数组
- initialValue
可作为第一次调用回调 callback 的第一个参数
返回值
执行之后的返回值

## Array.prototype.reverse()
reverse() 方法将数组中元素的位置颠倒,并返回该数组。该方法会改变原数组。

## Array.prototype.shift()
shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。


### 描述
shift 方法移除索引为 0 的元素(即第一个元素)，并返回被移除的元素，其他元素的索引值随之减 1。如果 length 属性的值为 0 (长度为 0)，则返回 undefined。

shift 方法并不局限于数组：这个方法能够通过 call 或 apply 方法作用于类似数组的对象上。但是对于没有 length 属性（从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。

## Array.prototype.slice()

slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

### 语法
arr.slice([begin[, end]])
1. 参数
- begin 可选
提取起始处的索引，从该索引开始提取原数组元素，默认为 0。
如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。
如果省略 begin，则 slice 从索引 0 开始。
如果 begin 大于原数组的长度，则会返回空数组。
- end 可选
提取终止处的索引，在该索引处结束提取原数组元素，默认为 0。slice 会提取原数组中索引从 begin 到 end 的所有元素（包含 begin，但不包含 end）。
slice(1,4) 会提取原数组中从第二个元素开始一直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。
如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1) 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。
如果 end 被省略，则slice 会一直提取到原数组末尾。
如果 end 大于数组的长度，slice 也会一直提取到原数组末尾。

2. 返回值
一个含有被提取元素的新数组。

### 描述
slice 不会修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：

如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。
如果向两个数组任一中添加了新元素，则另一个不会受到影响。

## Array.prototype.some()
 some() 方法测试是否至少有一个元素可以通过被提供的函数方法。该方法返回一个Boolean类型的值。

### 语法
```js
arr.some(callback(element[, index[, array]])[, thisArg])
```

1. 参数
- callback
用来测试每个元素的函数，接受三个参数：
- element
数组中正在处理的元素。
- index 可选
数组中正在处理的元素的索引值。
- array可选
some()被调用的数组。
- thisArg可选
执行 callback 时使用的 this 值。
2. 返回值
如果回调函数返回至少一个数组元素的truthy值，则返回true；否则为false。


### 描述
some() 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，some() 将会立即返回 true。否则，some() 返回 false。callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。

callback 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。

将会把它传给被调用的 callback，作为 this 值。否则，在非严格模式下将会是全局对象，严格模式下是 undefined。

some() 被调用时不会改变数组。

some() 遍历的元素的范围在第一次调用 callback. 时就已经确定了。在调用 some() 后被添加到数组中的值不会被 callback 访问到。如果数组中存在且还未被访问到的元素被 callback 改变了，则其传递给 callback 的值是 some() 访问到它那一刻的值。
## Array.prototype.sort()
sort() 方法用原地算法对数组的元素进行排序，并返回数组。排序算法现在是稳定的。默认排序顺序是根据字符串Unicode码点。

由于它取决于具体实现，因此无法保证排序的时间和空间复杂性。

### 语法
```js
arr.sort([compareFunction])
```
1. 参数
- compareFunction 可选
用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
- firstEl
第一个用于比较的元素。
- secondEl
第二个用于比较的元素。
2. 返回值
排序后的数组。请注意，数组已原地排序，并且不进行复制。

### 描述
如果没有指明 compareFunction ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 compareFunction），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。

如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

```js
const arr=[10,20,3,1,4,88]
arr.sort((a,b)=>{return a-b})
// [1, 3, 4, 10, 20, 88]
arr.sort((a,b)=>{return b-a})
//  [88, 20, 10, 4, 3, 1]
```

## Array.prototype.splice()
splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
###语法
```
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```
1. 参数
- start​
指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。
- deleteCount 可选
整数，表示要移除的数组元素的个数。
如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。
如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。
- item1, item2, ... 可选
要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。
2. 返回值
由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

## Array.prototype.toLocaleString()
toLocaleString() 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。
```js

var array1 = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
var localeString = array1.toLocaleString('en', {timeZone: "UTC"});

console.log(localeString);
// expected output: "1,a,12/21/1997, 2:12:00 PM",
// This assumes "en" locale and UTC timezone - your results may vary
```

### 语法
```js
arr.toLocaleString([locales[,options]]);
```
1. 参数
- locales 可选
带有BCP 47语言标记的字符串或字符串数组，关于locales参数的形式与解释，请看Intl页面。
- options 可选
一个可配置属性的对象，对于数字 Number.prototype.toLocaleString()，对于日期Date.prototype.toLocaleString().
2. 返回值
表示数组元素的字符串。

## Array.prototype.toSource()

非标准
该特性是非标准的，请尽量不要在生产环境中使用它！

返回一个字符串,代表该数组的源代码.


```js
var arr=new Array(1,2,3,4,5)
arr.toSource()
```
## Array.prototype.toString()
toString() 返回一个字符串，表示指定的数组及其元素。 


### 描述
Array对象覆盖了Object的 toString 方法。对于数组对象，toString 方法连接数组并返回一个字符串，其中包含用逗号分隔的每个数组元素。

当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法。

## Array.prototype.unshift()
unshift() 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。

```js
var array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// expected output: 5

console.log(array1);
// expected output: Array [4, 5, 1, 2, 3]
```

### 语法
```
arr.unshift(element1, ..., elementN)
```
1. 参数
- elementN
要添加到数组开头的元素或多个元素。
2. 返回值
当一个对象调用该方法时，返回其 length 属性值。

### 描述
unshift 方法会在调用它的类数组对象的开始位置插入给定的参数。

unshift 特意被设计成具有通用性；这个方法能够通过 call 或 apply 方法作用于类数组对象上。不过对于没有 length 属性（代表从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。

注意, 如果传入多个参数，它们会被以块的形式插入到对象的开始位置，它们的顺序和被作为参数传入时的顺序一致。 于是，传入多个参数调用一次 unshift ，和传入一个参数调用多次 unshift (例如，循环调用)，它们将得到不同的结果。例如:
```
let arr = [4,5,6];
arr.unshift(1,2,3);
console.log(arr); // [1, 2, 3, 4, 5, 6]

arr = [4,5,6]; // 重置数组
arr.unshift(1);
arr.unshift(2);
arr.unshift(3);
console.log(arr); // [3, 2, 1, 4, 5, 6]
```
## Array.prototype.values()
values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.values();

for (const value of iterator) {
  console.log(value); // expected output: "a" "b" "c"
}

```
### 示例
1. 使用 for...of 循环进行迭代
```js
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();
// 您的浏览器必须支持 for..of 循环
// 以及 let —— 将变量作用域限定在 for 循环中
for (let letter of eArr) {
  console.log(letter);
}
```
2. 另一种迭代方式
```js
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();
console.log(eArr.next().value); // w
console.log(eArr.next().value); // y
console.log(eArr.next().value); // k
console.log(eArr.next().value); // o
console.log(eArr.next().value); // p
```

## Array.prototype[@@iterator]()
@@iterator 属性和 Array.prototype.values() 属性的初始值均为同一个函数对象。

### 语法
```
arr[Symbol.iterator]()
```
1. 返回值
数组的 iterator 方法，默认情况下与 values() 返回值相同

## 参考文献


[Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)