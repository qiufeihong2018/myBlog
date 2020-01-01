# 吃透URL的编码和解码
## 背景
故事的起源：某一天，我在网站中打开一个[https%3A%2F%2Fgithub.com%2FMicrosoft%2Fmonaco-editor%2Fblob%2FHEAD%2Fdocs%2Fintegrate-esm.md](https%3A%2F%2Fgithub.com%2FMicrosoft%2Fmonaco-editor%2Fblob%2FHEAD%2Fdocs%2Fintegrate-esm.md)。结果，浏览器直接蹦出`404`。
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
5. escape(已废弃)编码
6. unescape(已废弃)解码
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

## 什么是encodeURI
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
应用场景：当期望获取一个可用的URL地址时，使用`encodeURI`函数进行编码。反之使用`encodeURIComponent`获得不可用的URL地址。
### 例子
```js
// 转码后可以点击跳转
encodeURI('http://www.baidu.com')
//"http://www.baidu.com"
encodeURI("http://www.qiufeihong.top/你好世界")
//"http://www.qiufeihong.top/%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C"

// 转码后无法点击
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
## 什么是encodeURIComponent
>encodeURIComponent()是对统一资源标识符（URI）的组成部分进行编码的函数。它使用一到四个转义序列来表示字符串中的每个字符的UTF-8编码（只有由两个Unicode代理区字符组成的字符才用四个转义字符编码）。

encodeURIComponent 转义除了字母、数字、(、)、.、!、~、*、'、-和_之外的所有字符。
### 场景
encodeURIComponent：适用于URL作为参数传递时。
### 例子

## 什么是decodeURI
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
## 什么是decodeURIComponent
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
如果 URI 中含有分隔符，比如 ? 和 #，则应当使用 encodeURIComponent() 函数分别对各组件进行编码。

请注意 encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串）。因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号。
操作的是完整的 URI；假定URI中的任何保留字符都有特殊意义，那么不会编码它们。

## decodeURIComponent和decodeURI的类比
函数操作的是组成URI的个别组件；假定任何保留字符都代表普通文本，那么必须编码它们，所以它们（保留字符）出现在一个完整 URI 的组件里面时不会被解释成保留字符了。
## 什么是escape
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

## 什么是unescape
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
## 总结：
encodeURI 函数返回一个编码的 URI。如果您将编码结果传递给 decodeURI，那么将返回初始的字符串。encodeURI 函数不会对下列字符进行编码：":"、"/"、";" 和 "?"。请使用 encodeURIComponent 函数对这些字符进行编码。

encodeURIComponent 函数
将文本字符串编码为一个统一资源标识符 (URI) 的一个有效组件。

encodeURIComponent(encodedURIString)：

必选的 encodedURIString 参数代表加密一个已编码的 URI 组件。

decodeURIComponent(decodedURIString)：

必选的 decodeURIComponent参数解密。

说明encodeURIComponent 函数返回一个已编码的 URI。如果您将编码结果传递给 decodeURIComponent，那么将返回初始的字符串。因为 encodeURIComponent 函数对所有的字符编码，请注意，如果该字符串代表一个路径，例如 /folder1/folder2/default.html，其中的斜杠也将被编码。这样一来，当该编码结果被作为请求发送到 web 服务器时将是无效的。如果字符串中包含不止一个 URI 组件，请使用 encodeURI 函数进行

通过对三个函数的分析，我们可以知道：escape()除了 ASCII 字母、数字和特定的符号外，对传进来的字符串全部进行 
转义编码，因此如果想对URL编码，最好不要使用此函数。而encodeURI() 用于编码整个URI,因为URI中的合法字符都不会 
被编码转换。encodeURIComponent函数在编码单个URIComponent（指请求参数）应当是最常用的，它可以讲参数中的中文 
、特殊字符进行转义，而不会影响整个URL。
encodeURI，转码后URL还需要正常使用
encodeURIComponent，转码后URL不再当做正常URL使用，比如作为参数
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

序列                       所代表的字符

\0                           NUL字符(\u0000)

\b                           退格符(\u0008)

\t                             水平制表符(\u0009)

\n                            换行符(\u000A)

\v                             垂直制表符(\u000B)

\f                             换页符(\u000C)

\r                             回车符(\u000D)

\"                             双引号(\u0022)

\'                             撇号或单引号(\u0027)

\xXX                       由两位十六进制数值XX指定的Latin-1字符

\uXXXX                  由四位十六进制数XXXX指定的Unicode字符

\XXX                      由一位到三位八进制数(1到377)指定的Latin-1字符，ECMAScript v3不支持，不要使用这种转义序列
## 参考文献
[encodeURI](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)

[encodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

[decodeURI](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)

[decodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)

[分清 URI、URL 和 URN](https://www.ibm.com/developerworks/cn/xml/x-urlni.html)

[JavaScript的转义序列](https://blog.csdn.net/woshisap/article/details/8262958)
最后，别忘了给这个项目点一个star哦，谢谢支持。
[blog](https://github.com/qiufeihong2018/vuepress-blog)
![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)
一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路