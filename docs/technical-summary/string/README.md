# String

## String.fromCharCode()
静态 String.fromCharCode() 方法返回由指定的UTF-16代码单元序列创建的字符串。
```js
console.log(String.fromCharCode(189, 43, 190, 61));// expected output: "½+¾="
console.log(String.fromCharCode(65, 66, 67));  // returns "ABC"
console.log(String.fromCharCode(0x2014) )// returns "—"
console.log(String.fromCharCode(0x12014) ) // also returns "—"; the digit 1 is truncated and ignored
```

## String.fromCodePoint()
String.fromCodePoint() 静态方法返回使用指定的代码点序列创建的字符串。
```js
console.log(String.fromCodePoint(9731, 9733, 9842, 0x2F804));
// expected output: "☃★♲你"
String.fromCodePoint(42);       // "*"
String.fromCodePoint(65, 90);   // "AZ"
String.fromCodePoint(0x404);    // "\u0404"
String.fromCodePoint(0x2F804);  // "\uD87E\uDC04"
String.fromCodePoint(194564);   // "\uD87E\uDC04"
String.fromCodePoint(0x1D306, 0x61, 0x1D307) // "\uD834\uDF06a\uD834\uDF07"

String.fromCodePoint('_');      // RangeError
String.fromCodePoint(Infinity); // RangeError
String.fromCodePoint(-1);       // RangeError
String.fromCodePoint(3.14);     // RangeError
String.fromCodePoint(3e-2);     // RangeError
String.fromCodePoint(NaN);      // RangeError
// String.fromCharCode() 方法不能单独获取在高代码点位上的字符
// 另一方面，下列的示例中，可以返回 4 字节，也可以返回 2 字节的字符
// (也就是说，它可以返回单独的字符，使用长度 2 代替 1!） 
console.log(String.fromCodePoint(0x2F804)); // or 194564 in decimal
```

## String.prototype.charAt()
charAt() 方法从一个字符串中返回指定的字符。

### 语法
str.charAt(index)
#### 参数
index

一个介于0 和字符串长度减1之间的整数。 (0~length-1)
如果没有提供索引，charAt() 将使用0。
### 描述
字符串中的字符从左向右索引，第一个字符的索引值为 0，最后一个字符（假设该字符位于字符串 stringName 中）的索引值为 stringName.length - 1。 如果指定的 index 值超出了该范围，则返回一个空字符串。

```js
var anyString = "Brave new world";

console.log("The character at index 0   is '" + anyString.charAt(0)   + "'");> "The character at index 0   is 'B'"
console.log("The character at index 1   is '" + anyString.charAt(1)   + "'");> "The character at index 1   is 'r'"
console.log("The character at index 2   is '" + anyString.charAt(2)   + "'");> "The character at index 2   is 'a'"
console.log("The character at index 3   is '" + anyString.charAt(3)   + "'");> "The character at index 3   is 'v'"
console.log("The character at index 4   is '" + anyString.charAt(4)   + "'");> "The character at index 4   is 'e'"
console.log("The character at index 999 is '" + anyString.charAt(999) + "'");> "The character at index 999 is ''"
```

## String.prototype.charCodeAt()
charCodeAt() 方法返回0到65535之间的整数，表示给定索引处的UTF-16代码单元 (在 Unicode 编码单元表示一个单一的 UTF-16 编码单元的情况下，UTF-16 编码单元匹配 Unicode 编码单元。但在——例如 Unicode 编码单元 > 0x10000 的这种——不能被一个 UTF-16 编码单元单独表示的情况下，只能匹配 Unicode 代理对的第一个编码单元) 。如果你想要整个代码点的值，使用 codePointAt()。

```js
var sentence = 'The quick brown fox jumps over the lazy dog.';

var index = 4;

console.log('The character code ' + sentence.charCodeAt(index) + ' is equal to ' + sentence.charAt(index));
// expected output: "The character code 113 is equal to q"

```

### 语法
str.charCodeAt(index)
#### 参数
index

一个大于等于 0，小于字符串长度的整数。如果不是一个数值，则默认为 0。

#### 返回值
返回值是一表示给定索引处（String中index索引处）字符的 UTF-16 代码单元值的数字；如果索引超出范围，则返回 NaN。

## String.prototype.codePointAt()
codePointAt() 方法返回 一个 Unicode 编码点值的非负整数。

### 语法
str.codePointAt(pos)
#### 参数
pos

这个字符串中需要转码的元素的位置。
#### 返回值
返回值是在字符串中的给定索引的编码单元体现的数字，如果在索引处没找到元素则返回 undefined 。

```js
console.log('ABC'.codePointAt(1));          // 66
console.log('\uD800\uDC00'.codePointAt(0)); // 65536
console.log('XYZ'.codePointAt(42)); // undefined
```

## String.prototype.concat()
concat() 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。
###语法
str.concat(string2, string3[, ..., stringN])
####参数
string2...stringN

和原字符串连接的多个字符串
```js
var hello = "Hello, ";
console.log(hello.concat("Kevin", " have a nice day.")); /* Hello, Kevin have a nice day. */
```

## String.prototype.endsWith()
endsWith()方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。
```js
const str1 = 'Cats are the best!';

console.log(str1.endsWith('best', 17));
// expected output: true

const str2 = 'Is this a question';

console.log(str2.endsWith('?'));
// expected output: false
var str = "To be, or not to be, that is the question.";

alert( str.endsWith("question.") );  // true
alert( str.endsWith("to be") );      // false
alert( str.endsWith("to be", 19) );  // true
```

## String.prototype.includes()

includes() 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。

###语法
str.includes(searchString[, position])
####参数
searchString

要在此字符串中搜索的字符串。

position

可选。从当前字符串的哪个索引位置开始搜寻子字符串，默认值为0。
#### 返回值
如果当前字符串包含被搜寻的字符串，就返回 true；否则返回 false。

```js
var str = 'To be, or not to be, that is the question.';

console.log(str.includes('To be'));       // true
console.log(str.includes('question'));    // true
console.log(str.includes('nonexistent')); // false
console.log(str.includes('To be', 1));    // false
console.log(str.includes('TO BE'));       // false
```

## String.prototype.indexOf()

indexOf() 方法返回调用  String 对象中第一次出现的指定值的索引，开始在 fromIndex进行搜索。

如果未找到该值，则返回-1。

### 语法
str.indexOf(searchValue[, fromIndex])
####参数
searchValue

一个字符串表示被查找的值。

fromIndex 可选

表示调用该方法的字符串中开始查找的位置。可以是任意整数。默认值为 0。如果 fromIndex < 0 则查找整个字符串（如同传进了 0）。如果 fromIndex >= str.length，则该方法返回 -1。当被查找的字符串是一个空字符串，fromIndex <= 0时返回0，0 < fromIndex <= str.length时返回fromIndex，fromIndex > str.length时返回str.length。
#### 返回值
指定值的第一次出现的索引; 如果没有找到 -1。

```js
"Blue Whale".indexOf("Blue");     // returns  0
"Blue Whale".indexOf("Blute");    // returns -1
"Blue Whale".indexOf("Whale", 0); // returns  5
"Blue Whale".indexOf("Whale", 5); // returns  5
"Blue Whale".indexOf("", 9);      // returns  9
"Blue Whale".indexOf("", 10);     // returns 10
"Blue Whale".indexOf("", 11);     // returns 10
```
## String.prototype.lastIndexOf()
lastIndexOf() 方法返回指定值在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1。从该字符串的后面向前查找，从 fromIndex 处开始。

### 语法
str.lastIndexOf(searchValue[, fromIndex])
####参数
searchValue

一个字符串，表示被查找的值。

fromIndex

从调用该方法字符串的此位置处开始查找。可以是任意整数。默认值为 str.length。如果为负值，则被看作 0。如果 fromIndex > str.length，则 fromIndex 被看作 str.length。

```js
"canal".lastIndexOf("a")   // returns 3
"canal".lastIndexOf("a",2) // returns 1
"canal".lastIndexOf("a",0) // returns -1 我就奇怪为啥是-1
"canal".lastIndexOf("x")   // returns -1
```

## String.prototype.localeCompare()
localeCompare() 方法返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。

新的 locales 、 options 参数能让应用程序定制函数的行为即指定用来排序的语言。  locales 和 options 参数是依赖于具体实现的，在旧的实现中这两个参数是完全被忽略的。

```js
// The letter "a" is before "c" yielding a negative value
console.log('a'.localeCompare('c')); 
// -2 or -1 (or some other negative value)

// Alphabetically the word "check" comes after "against" yielding a positive value
console.log('check'.localeCompare('against')); 
 
// 2 or 1 (or some other positive value)

// "a" and "a" are equivalent yielding a neutral value of zero
console.log('a'.localeCompare('a')); 
// 0
```

###描述
返回一个数字表示是否 引用字符串 在排序中位于 比较字符串 的前面，后面，或者二者相同。

当 引用字符串 在 比较字符串 前面时返回 -1
当 引用字符串 在 比较字符串 后面时返回 1
相同位置时返回 0
切勿依赖于 -1 或 1 这样特定的返回值。不同浏览器之间（以及不同浏览器版本之间） 返回的正负数的值各有不同，因为W3C规范中只要求返回值是正值和负值，而没有规定具体的值。一些浏览器可能返回-2或2或其他一些负的、正的值。

## String.prototype.match()
match() 方法检索返回一个字符串匹配正则表达式的的结果。

### 语法
str.match(regexp)
####参数
regexp

一个正则表达式对象。如果传入一个非正则表达式对象，则会隐式地使用 new RegExp(obj) 将其转换为一个 RegExp 。如果你没有给出任何参数并直接使用match() 方法 ，你将会得到一 个包含空字符串的 Array ：[""] 。
#### 返回值

如果使用g标志，则将返回与完整正则表达式匹配的所有结果（Array），但不会返回捕获组，或者未匹配 null。

如果未使用g标志，则仅返回第一个完整匹配及其相关的捕获组（Array）。 在这种情况下，返回的项目将具有如下所述的其他属性，或者未匹配 null。

#### 附加属性
如上所述，匹配的结果包含如下所述的附加特性。

groups: 一个捕获组数组 或 undefined（如果没有定义命名捕获组）。
index: 匹配的结果的开始位置
input: 搜索的字符串.

一个Array，其内容取决于global（g）标志的存在与否，如果未找到匹配则为null。

```js
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);

console.log(matches_array);
// ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']


var str = "Nothing will come of nothing.";

str.match();   // returns [""]



var str1 = "NaN means not a number. Infinity contains -Infinity and +Infinity in JavaScript.",
    str2 = "My grandfather is 65 years old and My grandmother is 63 years old.",
    str3 = "The contract was declared null and void.";
str1.match("number");   // "number" 是字符串。返回["number"]
str1.match(NaN);        // NaN的类型是number。返回["NaN"]
str1.match(Infinity);   // Infinity的类型是number。返回["Infinity"]
str1.match(+Infinity);  // 返回["Infinity"]
str1.match(-Infinity);  // 返回["-Infinity"]
str2.match(65);         // 返回["65"]
str2.match(+65);        // 有正号的number。返回["65"]
str3.match(null);       // 返回["null"]
```

## String.prototype.matchAll()
matchAll() 方法返回一个包含所有匹配正则表达式及分组捕获结果的迭代器。

更好地获取分组捕获
```js
var regexp = /t(e)(st(\d?))/g;
var str = 'test1test2';
console.log(str.match(regexp)); // Array ['test1', 'test2']

let array = [...str.matchAll(regexp)];
console.log(array[0])// ['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', length: 4]
console.log(array[1])// ['test2', 'e', 'st2', '2', index: 5, input: 'test1test2', length: 4]


```

## String.prototype.normalize()

normalize() 方法会按照指定的一种 Unicode 正规形式将当前字符串正规化.

## String.prototype.padEnd()
padEnd()  方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。

###语法
str.padEnd(targetLength [, padString])
####参数
targetLength

当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。

padString 可选

填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "（U+0020）。
####返回值
在原字符串末尾填充指定的填充字符串直到目标长度所形成的新字符串。


```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

## String.prototype.padStart()
padStart() 方法用另一个字符串填充当前字符串(重复，如果需要的话)，以便产生的字符串达到给定的长度。填充从当前字符串的开始(左侧)应用的。

语法同padEnd()
```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

## String.prototype.repeat()
repeat() 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

```js
"abc".repeat(-1)     // RangeError: repeat count must be positive and less than inifinity
"abc".repeat(0)      // ""
"abc".repeat(1)      // "abc"
"abc".repeat(2)      // "abcabc"
"abc".repeat(3.5)    // "abcabcabc" 参数count将会被自动转换成整数.
"abc".repeat(1/0)    // RangeError: repeat count must be positive and less than inifinity

({toString : () => "abc", repeat : String.prototype.repeat}).repeat(2)   
//"abcabc",repeat是一个通用方法,也就是它的调用者可以不是一个字符串对象.
```