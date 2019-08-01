# Error
## EvalError
本对象代表了一个关于 eval 函数的错误.此异常不再会被JavaScript抛出，但是EvalError对象仍然保持兼容性.

```js
try {
  throw new EvalError('Hello', 'someFile.js', 10);
} catch (e) {
  console.log(e instanceof EvalError); // true
  console.log(e.message);              // "Hello"
  console.log(e.name);                 // "EvalError"
  console.log(e.fileName);             // "someFile.js"
  console.log(e.lineNumber);           // 10
  console.log(e.columnNumber);         // 0
  console.log(e.stack);                // "@Scratchpad/2:2:9\n"
}
```


## InternalError
InternalError 对象表示出现在JavaScript引擎内部的错误。 例如： "InternalError: too much recursion"（内部错误：递归过深）。

当JavaScript引擎出现内部错误时将会抛出InternalError。

示例场景通常为某些成分过大，例如：

"too many switch cases"（过多case子句）；
"too many parentheses in regular expression"（正则表达式中括号过多）；
"array initializer too large"（数组初始化器过大）；
"too much recursion"（递归过深）。

## RangeError
RangeError对象标明一个错误，当一个值不在其所允许的范围或者集合中。

### 描述

试图传递一个number参数给一个范围内不包含该number的函数时则会引发RangeError。当传递一个不合法的length值作为Array 构造器的参数创建数组，或者传递错误值到数值计算方法（Number.toExponential()，Number.toFixed() ，Number.toPrecision()），会出现RangeError。

## ReferenceError
ReferenceError（引用错误） 对象代表当一个不存在的变量被引用时发生的错误。

当你尝试引用一个未被定义的变量时，将会抛出一个 ReferenceError 。

## SyntaxError
SyntaxError 对象代表尝试解析语法上不合法的代码的错误。

当Javascript语言解析代码时,Javascript引擎发现了不符合语法规范的tokens或token顺序时抛出SyntaxError.


## TypeError
TypeError（类型错误） 对象用来表示值的类型非预期类型时发生的错误。

当传入函数的操作数或参数的类型并非操作符或函数所预期的类型时，将抛出一个 TypeError 类型错误。

## URIError
URIError 对象用来表示以一种错误的方式使用全局URI处理函数而产生的错误。

当向全局 URI 处理函数传递一个不合法的URI时，URIError 错误会被抛出。

## 语法
都是抛出错误,只是错误类型不同

虽然如此,他们的语法还是一样的

new Error([message[, fileName[, lineNumber]]])
### 参数
message

可选参数.人类可阅读的关于错误的描述

fileName(非标准)
可选参数.代码中导致异常的文件的文件名

lineNumber(非标准)
可选参数.代码中导致异常的代码的行号

## 参考文献
[Error](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)