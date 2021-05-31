# 吃透URL的编码和解码
## 背景
故事的起源：某一天，我在网站中打开一个[https%3A%2F%2Fgithub.com%2FMicrosoft%2Fmonaco-editor%2Fblob%2FHEAD%2Fdocs%2Fintegrate-esm.md](https%3A%2F%2Fgithub.com%2FMicrosoft%2Fmonaco-editor%2Fblob%2FHEAD%2Fdocs%2Fintegrate-esm.md)。

结果，浏览器直接蹦出`404`。
![avatar](https://images.qiufeihong.top/encode-404.png)
为什么URL会出现乱码呢？

其实这不是乱码，这是浏览器将URL转码了，我点击的就是转码后的URL。

为什么点击的URL不能展示网页呢？

那我怎么打开这个网站呢？

很简单,打开控制台输入：
```js
decodeURIComponent("https%3A%2F%2Fgithub.com%2FMicrosoft%2Fmonaco-editor%2Fblob%2FHEAD%2Fdocs%2Fintegrate-esm.md")
```
随后输出：
```js
"https://github.com/Microsoft/monaco-editor/blob/HEAD/docs/integrate-esm.md"
```
这就是想要看的网址。

### 为什么浏览器需要转码呢？
URL转码其实也只是为了符合URL的规范而已。

因为在标准的URL规范中中文和很多的字符是不允许出现在URL中的。

这是因为网络标准`RFC 1738`做了硬性规定：

> "...Only alphanumerics [0-9a-zA-Z], the special characters "$-_.+!*'()," [not including the quotes - ed], and reserved characters used for their reserved purposes may be used unencoded within a URL."

翻译如下：
> "只有字母和数字[0-9a-zA-Z]、一些特殊符号"$-_.+!*'(),"[不包括双引号]、以及某些保留字，才可以不经过编码直接用于URL。"

意思就是，如果URL中有汉字，就必须编码后使用。

但是麻烦的是，`RFC 1738`没有规定具体的编码函数，而是交给应用程序（浏览器）自己决定。这导致"URL编码"成为了一个混乱的领域。

阮一峰老师的[《关于URL编码》](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)分析了四种不同的"URL编码"的情况和结论。

- 网址路径中包含汉字

结论：网址路径的编码，用的是`utf-8`编码。

- 查询字符串包含汉字

结论：查询字符串的编码，用的是操作系统的默认编码。

- Get函数生成的URL包含汉字

结论：GET和POST函数的编码，用的是网页的编码。

- Ajax调用的URL包含汉字

结论：在Ajax调用中，IE总是采用GB2312编码（win-xp操作系统的默认编码），而Firefox总是采用utf-8编码。

总而言之，不同的操作系统、不同的浏览器、不同的网页字符集，将导致完全不同的编码结果。这大大加深了码农编码的难度。

![avatar](https://images.qiufeihong.top/encodeURI4.jpeg)

为了使编码统一，为了不显得那么苦大仇深，每种语言都有对应的编码和解码函数。

### javascript
1. encodeURI编码
2. decodeURI解码
3. encodeURIComponent编码
4. decodeURIComponent解码
5. escape编码(已废弃)
6. unescape解码(已废弃)
### python
1. quote编码
2. unquote解码
### java
1. encode编码
2. decode解码
### go
1. QueryEscape编码
2. QueryUnescape解码
### php
1. urlencode编码
2. urldecode解码
   
……

姑且就先聊聊js编码和解码
## encodeURI
> encodeURI() 函数通过将特定字符的每个实例替换为一个、两个、三或四转义序列来对统一资源标识符 (URI) 进行编码 (该字符的 UTF-8 编码仅为四转义序列)由两个 "代理" 字符组成)。

该函数不会对这些 ASCII 标点符号和数字符号进行编码
1. 保留字符,如：`; , / ? : @ & = + $ - _ . ! ~ * ' ( )#`
```
encodeURI(';,/?:@&=+$-_.!~*()#')
";,/?:@&=+$-_.!~*()#"
```
该函数不会对 ASCII 字母和数字进行编码
2. 非转义的字符,如：`字母 数字`
```
encodeURI('1z')
"1z"
```
请注意，encodeURI 自身无法产生能适用于HTTP GET 或 POST 请求的URI，例如对于 XMLHTTPRequests, 因为 "&", "+", 和 "=" 不会被编码，然而在 GET 和 POST请求中它们是特殊字符。然而encodeURIComponent这个函数会对这些字符编码。

### 场景
应用场景：当期望获取一个可用的URL地址时，使用`encodeURI`函数进行编码。反之使用`encodeURIComponent`获得不可用的URL地址。`encodeURI`转码后可以点击跳转，`encodeURIComponent`转码后无法点击跳转。
### 例子
```js
// 转码后可以点击跳转
encodeURI('http://www.baidu.com')
//"http://www.baidu.com"
encodeURI("http://www.qiufeihong.top/你好世界")
//"http://www.qiufeihong.top/%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C"

// 转码后无法点击跳转
encodeURIComponent('http://www.baidu.com')
// "http%3A%2F%2Fwww.baidu.com"
encodeURIComponent("http://www.qiufeihong.top/你好世界")
//"http%3A%2F%2Fwww.qiufeihong.top%2F%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C"

// ;,/?:@&=+$-_.!~*()#都不会被转码
encodeURI(";,/?:@&=+$-_.!~*()#")
// ";,/?:@&=+$-_.!~*()#"

// ;,/?:@&=+$#等特殊字符会被转码
encodeURIComponent(";,/?:@&=+$-_.!~*()#")
// "%3B%2C%2F%3F%3A%40%26%3D%2B%24-_.!~*()%23"

// 字母数字都不会被转码
encodeURI("1z")
// "1z"
encodeURIComponent("1z")
// "1z"
```
由此可见，开头的URL就是用encodeURIComponent转码的。
## encodeURIComponent
>encodeURIComponent()是对统一资源标识符（URI）的组成部分进行编码的函数。它使用一到四个转义序列来表示字符串中的每个字符的UTF-8编码（只有由两个Unicode代理区字符组成的字符才用四个转义字符编码）。

encodeURIComponent 转义除了字母、数字、(、)、.、!、~、*、'、-和_之外的所有字符。
### 场景
encodeURIComponent：适用于URL作为参数传递时。
见上述`encodeURI`
## escape
最好别用在生产环境中
> 生成新的由十六进制转义序列替换的字符串。
escape 函数是全局对象的属性. 特色字符如: @*_+-./ 被排除在外.

字符的16进制格式值,当该值小于等于0xFF时,用一个2位转移序列: %xx 表示. 大于的话则使用4位序列:%uxxxx 表示.
### 例子
```js
escape("abc123")
//"abc123"
escape("äöü")
//"%E4%F6%FC"
escape("ć")
//"%u0107"
escape()
//"undefined"
escape("www.baidu.com")
//"www.baidu.com"
escape("http://www.qiufeihong.top/你好世界")
//"http%3A//www.qiufeihong.top/%u4F60%u597D%u4E16%u754C"
escape("http://www.qiufeihong.top/hello-world")
//"http%3A//www.qiufeihong.top/hello-world"
escape(";,/?:@&=+$-_.!~*()#")
//"%3B%2C/%3F%3A@%26%3D+%24-_.%21%7E*%28%29%23"
escape("1z")
//"1z"
escape('\uD800\uDFFF')
//"%uD800%uDFFF"
escape('\uD800')
//"%uD800"
escape('\uDFFF')
//"%uDFFF"
```
## decodeURI
> decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。将已编码 URI 中所有能识别的转义序列转换成原字符，但不能解码那些不会被 encodeURI 编码的内容（例如 "#"）。

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
## decodeURIComponent
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
## unescape
> 计算生成一个新的字符串，其中的十六进制转义序列将被其表示的字符替换。上述的转义序列就像escape里介绍的一样。因为 unescape 已经废弃，建议使用 decodeURI或者decodeURIComponent 替代本函数。
### 例子
```js
unescape("abc123")
//"abc123"
unescape("%E4%F6%FC")
//"äöü"
unescape("%u0107")
//"ć"
unescape("undefined")
//"undefined"
unescape("www.baidu.com")
//"www.baidu.com"
unescape("http%3A//www.qiufeihong.top/%u4F60%u597D%u4E16%u754C")
//"http://www.qiufeihong.top/你好世界"
unescape("http%3A//www.qiufeihong.top/hello-world")
//"http://www.qiufeihong.top/hello-world"
unescape(";,/?:@&=+$-_.!~*()#")
//";,/?:@&=+$-_.!~*()#"
unescape("1z")
//"1z"
unescape("%uD800%uDFFF")
//"𐏿"
unescape('\uD800')
//"�"
unescape('\uDFFF')
//"�"
```
## 总结
1. encodeURI 函数返回一个编码的 URI。如果您将编码结果传递给 decodeURI，那么将返回初始的字符串；
2. `;,/?:@&=+$-_.!~*()#`不可以被`encodeURI`编码，但是可以被`encodeURIComponent`和`escape`编码；
4. 不要再生产环境中使用escape；
5. encodeURI，转码后URL还可以正常使用，encodeURIComponent，转码后URL不再当做正常URL使用；
6. encodeURI被用作对一个完整的URI进行编码，而encodeURIComponent被用作对URI的一个组件进行编码。保留字符一般是用来分隔URI组件（一个URI可以被切割成多个组件，参考预备知识一节）或者子组件（如URI中查询参数的分隔符），如：号用于分隔scheme和主机，?号用于分隔主机和路径。由于encodeURI操纵的对象是一个完整的的URI，这些字符在URI中本来就有特殊用途，因此这些保留字符不会被encodeURI编码，否则意义就变了。
## 课外小知识
### URI/URL/URN
- URI(Uniform Resource Identifier)：统一资源标识
- URL(Uniform Resource Locator)：统一资源定位
- URN(Uniform Resource Name)：统一资源名称

每一个人都有自己的名字，有了名字，你才能找到别人，别人也才能找到你，这是社会中人与人通信的基本要求。因此，在任何一种通讯网络里，用户也都有其独特的用户标识，比如固定网络里的固定电话号码、移动网络里的移动电话号码等等，这样才能区分出不同的用户并进行通信。URI、URL、URN就是这个意思。
URL是一种具体的URI。
URI是一种语义上的抽象概念。
因此，三者之间的关系是：URN和URL是URI的子集。
### 转义序列
编程语言中有特殊意义的符号标记。

序列|所代表的字符
--|--
\0|NUL字符(\u0000)
\b|退格符(\u0008)
\t|水平制表符(\u0009)
\n|换行符(\u000A)
\v|垂直制表符(\u000B)
\f|换页符(\u000C)
\r|回车符(\u000D)
\"|双引号(\u0022)
\'|撇号或单引号(\u0027)
\xXX|由两位十六进制数值XX指定的Latin-1字符
\uXXXX|由四位十六进制数XXXX指定的Unicode字符
\XXX|由一位到三位八进制数(1到377)指定的Latin-1字符，ECMAScript v3不支持，不要使用这种转义序列
### 保留字符
Url可以划分成若干个组件，协议、主机、路径等。有一些字符（:/?#[]@）是用作分隔不同组件的。例如：冒号用于分隔协议和主机，/用于分隔主机和路径，?用于分隔路径和查询参数，等等。还有一些字符（!$&'()*+,;=）用于在每个组件中起到分隔作用的，如=用于表示查询参数中的键值对，&符号用于分隔查询多个键值对。当组件中的普通数据包含这些特殊字符时，需要对其进行编码。
## 参考文献
[encodeURI](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)

[encodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

[decodeURI](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)

[decodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)

[分清 URI、URL 和 URN](https://www.ibm.com/developerworks/cn/xml/x-urlni.html)

[JavaScript的转义序列](https://blog.csdn.net/woshisap/article/details/8262958)

[URL编码与解码](https://kb.cnblogs.com/page/133765/)
最后，别忘了给这个项目点一个star哦，谢谢支持。
[blog](https://github.com/qiufeihong2018/vuepress-blog)
![](../public/微信公众号.png)
一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路