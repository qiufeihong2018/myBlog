# 吃透编码和解码

MDN里面涵盖了所有web开发的知识，对开发者学习和夯实基础来说就是一个宝库。

将官网上的主要知识点抽离，组合成自己的知识网络。

每个人的知识体系是不同的，但又是各有相同之处，希望我的整理对您有帮助。

《重读MDN》系列是作者会坚持下去的，旨在查漏补缺，让自己知识的盲区能缩小些。

当然，MDN中有些翻译不对的地方，希望大家可以一起修改，我修改了好几处错误。
## 主人公
1. encodeURI
2. decodeURI
3. encodeURIComponent
4. decodeURIComponent
## 注意
动手记忆更加深刻哦

请将下列例子复制到控制到查看结果

## 什么是encodeURI
> encodeURI() 函数通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列)由两个 "代理" 字符组成)。
总之，就是该函数可把字符串作为 URI 进行编码。
### 作用
假定一个URI是完整的URI，那么无需对那些保留的并且在URI中有特殊意思的字符进行编码。
```
http://www.qiufeihong.top:7777/api/v1/router?username=qiufeihong&age=100+1#anchor
```
encodeURI 会替换所有的字符，但不包括以下字符，即使它们具有适当的UTF-8转义序列：
该方法不会对这些 ASCII 标点符号和数字符号进行编码
1. 保留字符,如：`; , / ? : @ & = + $ - _ . ! ~ * ' ( )#`
```
encodeURI(';,/?:@&=+$-_.!~*()#')
";,/?:@&=+$-_.!~*()#"
```
该方法不会对 ASCII 字母和数字进行编码
2. 非转义的字符,如：`字母 数字`
```
encodeURI('1z')
"1z"
```
请注意，encodeURI 自身无法产生能适用于HTTP GET 或 POST 请求的URI，例如对于 XMLHTTPRequests, 因为 "&", "+", 和 "=" 不会被编码，然而在 GET 和 POST
请求中它们是特殊字符。然而encodeURIComponent这个方法会对这些字符编码。

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
### 例子
```js
encodeURI()
//"undefined"
encodeURI('www.baidu.com')
//"www.baidu.com"
encodeURI("http://www.qiufeihong.top/你好世界")
//"http://www.qiufeihong.top/%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C"
encodeURI("http://www.qiufeihong.top/hello-world")
//"http://www.qiufeihong.top/hello-world"
encodeURI(";,/?:@&=+$-_.!~*()#")
// ";,/?:@&=+$-_.!~*()#"
encodeURI("1z")
// "1z"
encodeURI('\uD800\uDFFF')
// "%F0%90%8F%BF"
encodeURI('\uD800')
// VM243:1 Uncaught URIError: URI malformed
    // at encodeURI (<anonymous>)
    // at <anonymous>:1:1
encodeURI('\uDFFF')
// VM248:1 Uncaught URIError: URI malformed
    // at encodeURI (<anonymous>)
    // at <anonymous>:1:1
```

## 什么是encodeURIComponent
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
为了避免服务器收到不可预知的请求，对任何用户输入的作为URI部分的内容你都需要用encodeURIComponent进行转义。比如，一个用户可能会输入"Thyme
&time=again"作为comment变量的一部分。如果不使用encodeURIComponent对此内容进行转义，服务器得到的将是comment=Thyme%20&time=again。请注意，"&"符号和"="符号产生了一个新的键值对，所以服务器得到两个键值对（一个键值对是comment=Thyme，另一个则是time=again），而不是一个键值对。

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

## 什么是decodeURI
> decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。
将已编码 URI 中所有能识别的转义序列转换成原字符，但不能解码那些不会被 encodeURI 编码的内容（例如 "#"）。

### 作用

### 例子
```js
decodeURI()
//"undefined"
decodeURI('www.baidu.com')
//"www.baidu.com"
decodeURI("http://www.qiufeihong.top/你好世界")
//"http://www.qiufeihong.top/你好世界"
decodeURI("http://www.qiufeihong.top/hello-world")
//"http://www.qiufeihong.top/hello-world"
decodeURI(";,/?:@&=+$-_.!~*()#")
//";,/?:@&=+$-_.!~*()#"
decodeURI("1z")
//"1z"
decodeURI('\uD800\uDFFF')
//"𐏿"
decodeURI('\uD800')
//"�"
decodeURI('\uDFFF')
//"�"
//解码一个西里尔字母（Cyrillic）URL
decodeURI("http://www.qiufeihong.top/JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B")
//"http://www.qiufeihong.top/JavaScript_шеллы"
decodeURI('%E0%A4%A')
//Uncaught URIError: URI malformed
```
## 什么是decodeURIComponent
### 作用

### 例子
```js
decodeURIComponent()
//"undefined"
decodeURIComponent('www.baidu.com')
//"www.baidu.com"
decodeURIComponent("http://www.qiufeihong.top/你好世界")
//"http://www.qiufeihong.top/你好世界"
decodeURIComponent("http://www.qiufeihong.top/hello-world")
//"http://www.qiufeihong.top/hello-world"
decodeURIComponent(';,/?:@&=+$-_.!~*()#')
//";,/?:@&=+$-_.!~*()#"
decodeURIComponent('1z')
//"1z"
decodeURIComponent('\uD800\uDFFF')
//"𐏿"
decodeURIComponent('\uD800')
//"�"
decodeURIComponent('\uDFFF')
//"�"
decodeURIComponent("http://www.qiufeihong.top/JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B")
//http://www.qiufeihong.top/JavaScript_шеллы"
decodeURIComponent('%E0%A4%A')
//Uncaught URIError: URI malformed
```
## encodeURIComponent和encodeURI的类比
提示和注释
提示：如果 URI 组件中含有分隔符，比如 ? 和 #，则应当使用 encodeURIComponent() 方法分别对各组件进行编码。

请注意 encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串）。因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号。
操作的是完整的 URI；假定URI中的任何保留字符都有特殊意义，那么不会编码它们。

## decodeURIComponent和decodeURI的类比
函数操作的是组成URI的个别组件；假定任何保留字符都代表普通文本，那么必须编码它们，所以它们（保留字符）出现在一个完整 URI 的组件里面时不会被解释成保留字符了。
## 课外小知识
### URI
每一个人都有自己的名字，有了名字，你才能找到别人，别人也才能找到你，这是社会中人与人通信的基本要求。因此，在任何一种通讯网络里，用户也都有其独特的用户标识，比如固定网络里的固定电话号码、移动网络里的移动电话号码等等，这样才能区分出不同的用户并进行通信。而URI（Uniform
Resource Identifier，统一资源标识符）就是在IMS网络中IMS用户的“名字”，也就是IMS用户的身份标识。
## 参考文献
[encodeURL](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
[encodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
[decodeURI](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)
[decodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)
最后，别忘了给这个项目点一个star哦，谢谢支持。
[blog](https://github.com/qiufeihong2018/vuepress-blog)
![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)
一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路