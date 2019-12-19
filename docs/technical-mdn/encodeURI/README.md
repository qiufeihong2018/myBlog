# 重读MDN-严格模式

MDN里面涵盖了所有web开发的知识，对开发者学习和夯实基础来说就是一个宝库。

将官网上的主要知识点抽离，组合成自己的知识网络。

每个人的知识体系是不同的，但又是各有相同之处，希望我的整理对您有帮助。

《重读MDN》系列是作者会坚持下去的，旨在查漏补缺，让自己知识的盲区能缩小些。

当然，MDN中有些翻译不对的地方，希望大家可以一起修改，作者修改了好几处错误。

![avatar](../public/error.png)

## 前置知识
1. 正常模式
就是非严格模式——平时我们会称之为正常模式(sloppy mode)，也被翻译为马虎模式/稀松模式/懒散模式。
2. 静默错误
脚本在编码的时候都是正常的，没有错误，但是使用的时候却发现了错误。
3. 内联事件处理属性
就是在DOM元素中加入事件，如：
```js
<input type="button" value="click me" onclick="show(this,type,event)">
```

ES5的严格模式是采用具有限制性JavaScript变体的一种方式，从而使代码显示地 脱离“马虎模式/稀松模式/懒散模式“（sloppy）模式。

严格模式不仅仅是一个子集：它的产生是为了形成与正常代码不同的语义。

不支持严格模式与支持严格模式的浏览器在执行严格模式代码时会采用不同行为。

所以在没有对运行环境展开特性测试来验证对于严格模式相关方面支持的情况下，就算采用了严格模式也不一定会取得预期效果。严格模式代码和非严格模式代码可以共存，因此项目脚本可以渐进式地采用严格模式。
 
严格模式对正常的 JavaScript语义做了一些更改。

1. 严格模式通过抛出错误来消除了一些原有静默错误。
2. 严格模式修复了一些导致 JavaScript引擎难以执行优化的缺陷：有时候，相同的代码，严格模式可以比非严格模式下运行得更快。
3. 严格模式禁用了在ECMAScript的未来版本中可能会定义的一些语法。
## 什么是encodeURL
encodeURI()  函数通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列)由两个 "代理" 字符组成)。
## 作用
假定一个URI是完整的URI，那么无需对那些保留的并且在URI中有特殊意思的字符进行编码。
```
http://www.qiufeihong.top:7777/api/v1/router?username=qiufeihong&age=100+1#anchor
```
encodeURI 会替换所有的字符，但不包括以下字符，即使它们具有适当的UTF-8转义序列：
1. 保留字符,如：`; , / ? : @ & = + $`
```
encodeURI(';,/?:@&=+$')
";,/?:@&=+$"
```
2. 非转义的字符,如：`字母 数字 - _ . ! ~ * ' ( )`
```
encodeURI('1z-_.!~*()')
"1z-_.!~*()"
```
3. 数字符号,如：`#`

请注意，encodeURI 自身无法产生能适用于HTTP GET 或 POST 请求的URI，例如对于 XMLHTTPRequests, 因为 "&", "+", 和 "=" 不会被编码，然而在 GET 和 POST 请求中它们是特殊字符。然而encodeURIComponent这个方法会对这些字符编码。

另外，如果试图编码一个非高-低位完整的代理字符，将会抛出一个 URIError 错误，例如：
1. 编码高-低位完整字符 ok
```
encodeURI('\uD800\uDFFF')
"%F0%90%8F%BF"
```
2. 编码单独的高位字符抛出 "Uncaught URIError: URI malformed"
```
encodeURI('\uD800')
VM1214:1 Uncaught URIError: URI malformed
```
3. 编码单独的低位字符抛出 "Uncaught URIError: URI malformed"
```
encodeURI('\uDFFF')
VM1220:1 Uncaught URIError: URI malformed
```
并且需要注意，如果URL需要遵循较新的RFC3986标准，那么方括号是被保留的(给IPv6)，因此对于那些没有被编码的URL部分(例如主机)，可以使用下面的代码：
```js
function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}
```
先用encodeURL是保留的
```
encodeURI('[]')
"%5B%5D"
```
转义为
```
fixedEncodeURI('[]')
"[]"
```
## 例子
请将下列例子复制到控制到查看结果
```js
encodeURI()
"undefined"
```
```js
encodeURI('www.baidu.com')
"www.baidu.com"
```
## 参考知识-encodeURIComponent()
### 什么是encodeURIComponent
encodeURIComponent()是对统一资源标识符（URI）的组成部分进行编码的方法。它使用一到四个转义序列来表示字符串中的每个字符的UTF-8编码（只有由两个Unicode代理区字符组成的字符才用四个转义字符编码）。
### 作用
encodeURIComponent 转义除了字母、数字、(、)、.、!、~、*、'、-和_之外的所有字符。

注意，如果试图编码一个非高-低位完整的代理字符，将会抛出一个 URIError 错误，例如：
```
// 高低位完整
alert(encodeURIComponent('\uD800\uDFFF'));

// 只有高位，将抛出"URIError: malformed URI sequence"
alert(encodeURIComponent('\uD800'));

// 只有低位，将抛出"URIError: malformed URI sequence"
alert(encodeURIComponent('\uDFFF')); 
```
为了避免服务器收到不可预知的请求，对任何用户输入的作为URI部分的内容你都需要用encodeURIComponent进行转义。比如，一个用户可能会输入"Thyme &time=again"作为comment变量的一部分。如果不使用encodeURIComponent对此内容进行转义，服务器得到的将是comment=Thyme%20&time=again。请注意，"&"符号和"="符号产生了一个新的键值对，所以服务器得到两个键值对（一个键值对是comment=Thyme，另一个则是time=again），而不是一个键值对。

对于 application/x-www-form-urlencoded (POST) 这种数据方式，空格需要被替换成 '+'，所以通常使用 encodeURIComponent 的时候还会把 "%20" 替换为 "+"。

为了更严格的遵循 RFC 3986（它保留 !, ', (, ), 和 *），即使这些字符并没有正式划定 URI 的用途，下面这种方式是比较安全的：
```
function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}
```
### 例子
下面这个例子提供了 UTF-8 下 Content-Disposition 和 Link 的服务器响应头信息的参数
```js
var fileName = 'my file(2).txt';
var header = "Content-Disposition: attachment; filename*=UTF-8''" 
             + encodeRFC5987ValueChars(fileName);

console.log(header); 
// 输出 "Content-Disposition: attachment; filename*=UTF-8''my%20file%282%29.txt"


function encodeRFC5987ValueChars (str) {
    return encodeURIComponent(str).
        // 注意，仅管 RFC3986 保留 "!"，但 RFC5987 并没有
        // 所以我们并不需要过滤它
        replace(/['()]/g, escape). // i.e., %27 %28 %29
        replace(/\*/g, '%2A').
            // 下面的并不是 RFC5987 中 URI 编码必须的
            // 所以对于 |`^ 这3个字符我们可以稍稍提高一点可读性
            replace(/%(?:7C|60|5E)/g, unescape);
}
```

## 参考文献
[encodeURL](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
[encodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
最后，别忘了给这个项目点一个star哦，谢谢支持。
[blog](https://github.com/qiufeihong2018/vuepress-blog)
![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)
一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路