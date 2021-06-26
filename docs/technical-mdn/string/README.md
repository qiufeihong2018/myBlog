# 重读MDN-String

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

## String.prototype.replace()
replace() 方法返回一个由替换值（replacement）替换一些或所有匹配的模式（pattern）后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。

原字符串不会改变。

### 语法
str.replace(regexp|substr, newSubStr|function)

#### 参数
regexp (pattern)

一个RegExp 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。

substr (pattern)
一个将被 newSubStr 替换的 字符串。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。

newSubStr (replacement)
用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。参考下面的使用字符串作为参数。

function (replacement)
一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。参考下面的指定一个函数作为参数。
#### 返回值
一个部分或全部匹配由替代模式所取代的新的字符串。
### 描述
该方法并不改变调用它的字符串本身，而只是返回一个新的替换后的字符串。

在进行全局的搜索替换时，正则表达式需包含 g 标志。

在 replace() 中使用 global 和 ignore 选项

下面的例子中,正则表达式包含有全局替换(g)和忽略大小写(i)的选项,这使得replace方法用'oranges'替换掉了所有出现的"apples".

```js
var re = /apples/gi;
var str = "Apples are round, and apples are juicy.";
var newstr = str.replace(re, "oranges");

// oranges are round, and oranges are juicy.
console.log(newstr);
```

## String.prototype.search()

search() 方法执行正则表达式和 String 对象之间的一个搜索匹配。

### 语法
str.search(regexp)
####参数
regexp
一个正则表达式（regular expression）对象。如果传入一个非正则表达式对象 obj，则会使用 new RegExp(obj) 隐式地将其转换为正则表达式对象。
#### 返回值
如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1。

###描述
当你想要知道字符串中是否存在某个模式（pattern）时可使用 search()，类似于正则表达式的 test() 方法。当要了解更多匹配信息时，可使用 match()（但会更慢一些），该方法类似于正则表达式的 exec() 方法。

## String.prototype.slice()
slice() 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。

###语法
str.slice(beginIndex[, endIndex])
####参数
beginIndex

从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 strLength + beginIndex 看待，这里的strLength 是字符串的长度（例如， 如果 beginIndex 是 -3 则看作是：strLength - 3）

endIndex

可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice() 会一直提取到字符串末尾。如果该参数为负数，则被看作是 strLength + endIndex，这里的 strLength 就是字符串的长度(例如，如果 endIndex 是 -3，则是, strLength - 3)。

####返回值
返回一个从原字符串中提取出来的新字符串

###描述
slice() 从一个字符串中提取字符串并返回新字符串。在一个字符串中的改变不会影响另一个字符串。也就是说，slice 不会修改原字符串（只会返回一个包含了原字符串中部分字符的新字符串）。

slice() 提取的新字符串包括beginIndex但不包括 endIndex。下面有两个例子。

例 1：str.slice(1, 4) 提取第二个字符到第四个字符（被提取字符的索引值（index）依次为 1、2，和 3）。

例 2：str.slice(2, -1) 提取第三个字符到倒数第一个字符。

## String.prototype.split()
split() 方法使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。

### 语法
str.split([separator[, limit]])
Tip: 如果空字符串("")被用作分隔符，则字符串会在每个字符之间分割。

#### 参数

separator

指定表示每个拆分应发生的点的字符串。separator 可以是一个字符串或正则表达式。 如果纯文本分隔符包含多个字符，则必须找到整个字符串来表示分割点。如果在str中省略或不出现分隔符，则返回的数组包含一个由整个字符串组成的元素。如果分隔符为空字符串，则将str原字符串中每个字符的数组形式返回。

limit

一个整数，限定返回的分割片段数量。当提供此参数
时，split 方法会在指定分隔符的每次出现时分割该字符串，但在限制条目已放入数组时停止。如果在达到指定限制之前达到字符串的末尾，它可能仍然包含少于限制的条目。新数组中不返回剩下的文本。
#### 返回值
返回源字符串以分隔符出现位置分隔而成的一个 Array 

## String.prototype.startsWith()
startsWith() 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。



### 语法
str.startsWith(searchString[, position])

#### 参数

searchString

要搜索的子字符串。

position 可选

在 str 中搜索 searchString 的开始位置，默认值为 0，也就是真正的字符串开头处。
#### 返回值
如果在字符串的开头找到了给定的字符则返回true;否则, 返回false.


```js
var str = "To be, or not to be, that is the question.";

alert(str.startsWith("To be"));         // true
alert(str.startsWith("not to be"));     // false
alert(str.startsWith("not to be", 10)); // true
```

## String.prototype.substring()

substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。


### 语法
str.substring(indexStart[, indexEnd])
####参数

indexStart

需要截取的第一个字符的索引，该字符作为返回的字符串的首字母。

indexEnd

可选。一个 0 到字符串长度之间的整数，以该数字为索引的字符不包含在截取的字符串内。
####返回值
包含给定字符串的指定部分的新字符串。


##描述
substring 提取从 indexStart 到 indexEnd（不包括）之间的字符。特别地：

如果 indexStart 等于 indexEnd，substring 返回一个空字符串。
如果省略 indexEnd，substring 提取字符一直到字符串末尾。
如果任一参数小于 0 或为 NaN，则被当作 0。
如果任一参数大于 stringName.length，则被当作 stringName.length。
如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样。

```js

var anyString = "Mozilla";

// 输出 "Moz"
console.log(anyString.substring(0,3));
console.log(anyString.substring(3,0));
console.log(anyString.substring(3,-3));
console.log(anyString.substring(3,NaN));
console.log(anyString.substring(-2,3));
console.log(anyString.substring(NaN,3));

// 输出 "lla"
console.log(anyString.substring(4,7));
console.log(anyString.substring(7,4));

// 输出 ""
console.log(anyString.substring(4,4));

// 输出 "Mozill"
console.log(anyString.substring(0,6));

// 输出 "Mozilla"
console.log(anyString.substring(0,7));
console.log(anyString.substring(0,10));
```
## String.prototype.toLocaleLowerCase()
toLocaleLowerCase()方法根据任何特定于语言环境的案例映射，返回调用字符串值转换为小写的值。

### 描述
toLocaleLowerCase()方法返回调用该方法的字符串被转换成小写之后的值，转换规则根据任何本地化特定的大小写映射。toLocaleLowerCase()并不会影响字符串自身的值。在大多数情况下，该方法产生的结果和调用toLowerCase()的结果相同，但是在某些本地环境中，比如土耳其语，它的大小写映射并不遵循在Unicode中的默认的大小写映射，因此会有一个不同的结果。

## String.prototype.toLocaleUpperCase()
toLocaleUpperCase() 使用本地化（locale-specific）的大小写映射规则将输入的字符串转化成大写形式并返回结果字符串。

### 描述
同toLocaleLowerCase

## String.prototype.toLowerCase()
toLowerCase() 会将调用该方法的字符串值转为小写形式，并返回。
## String.prototype.toUpperCase()

toUpperCase() 将调用该方法的字符串值转换为大写形式，并返回。


##String.prototype.toSource()
toSource() 方法返回一个代表对象的源代码。

## String.prototype.toString()

toString() 方法返回指定对象的字符串形式。

### 描述
String 对象覆盖了Object 对象的 toString 方法；并没有继承 Object.toString()。对于 String 对象，toString 方法返回该对象的字符串形式，和 String.prototype.valueOf() 方法返回值一样。

## String.prototype.trim()
trim() 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR）。

```js
var orig = '   foo  ';
console.log(orig.trim()); // 'foo'

// 另一个.trim()例子，只从一边删除

var orig = 'foo    ';
console.log(orig.trim()); // 'foo'
```

## String.prototype.trimRight()
trimRight() 方法从一个字符串的右端移除空白字符。
## String.prototype.trimLeft()
trimStart() 方法从字符串的开头删除空格。trimLeft()是此方法的别名。

## String.prototype.valueOf()
valueOf() 方法返回一个String对象的原始值（primitive value）。


String 对象的 valueOf 方法返回一个String对象的原始值。该值等同于String.prototype.toString()。

该方法通常在 JavaScript 内部被调用，而不是在代码里显示调用。

## String.raw()-之前没用过,这个方法有点意思
String.raw() 是一个模板字符串的标签函数，它的作用类似于 Python 中的字符串前缀 r 和 C# 中的字符串前缀 @（还是有点区别的，详见隔壁 Chromium 那边的这个 issue），是用来获取一个模板字符串的原始字符串的，比如说，占位符（例如 ${foo}）会被处理为它所代表的其他字符串，而转义字符（例如 \n）不会。
```js
String.raw`Hi\n${2+3}!`;
// 'Hi\n5!'，Hi 后面的字符不是换行符，\ 和 n 是两个不同的字符

String.raw `Hi\u000A!`;             
// "Hi\\u000A!"，同上，这里得到的会是 \、u、0、0、0、A 6个字符，
// 任何类型的转义形式都会失效，保留原样输出，不信你试试.length

let name = "Bob";
String.raw `Hi\n${name}!`;             
// "Hi\nBob!"，内插表达式还可以正常运行


// 正常情况下，你也许不需要将 String.raw() 当作函数调用。
// 但是为了模拟 `t${0}e${1}s${2}t` 你可以这样做:
String.raw({ raw: 'test' }, 0, 1, 2); // 't0e1s2t'
// 注意这个测试, 传入一个 string, 和一个类似数组的对象
// 下面这个函数和 `foo${2 + 3}bar${'Java' + 'Script'}baz` 是相等的.
String.raw({
  raw: ['foo', 'bar', 'baz'] 
}, 2 + 3, 'Java' + 'Script'); // 'foo5barJavaScriptbaz'

```
## 参考文献


[Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](../public/微信公众号.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路