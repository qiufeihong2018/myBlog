# 吃透URL的编码和解码
## 背景
故事的起源：某一天，我在网站中打开一个[链接](https%3A%2F%2Fgithub.com%2FMicrosoft%2Fmonaco-editor%2Fblob%2FHEAD%2Fdocs%2Fintegrate-esm.md)。结果，浏览器直接蹦出`404`。
![avatar](https://images.qiufeihong.top/encode-404.png)
为什么url会出现乱码呢？其实这不是乱码，这是浏览器将链接转码了，我点击的就是转码后的链接。那我怎么打开这个网站呢？很简单,打开控制台输入：
```js
decodeURIComponent("https%3A%2F%2Fgithub.com%2FMicrosoft%2Fmonaco-editor%2Fblob%2FHEAD%2Fdocs%2Fintegrate-esm.md")
```
随后输出：
```js
"https://github.com/Microsoft/monaco-editor/blob/HEAD/docs/integrate-esm.md"
```
这就是想要看的网址。

## 主人公
1. encodeURI
2. decodeURI
3. encodeURIComponent
4. decodeURIComponent
5. escape(已废弃)
6. unescape(已废弃)
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
请注意，encodeURI 自身无法产生能适用于HTTP GET 或 POST 请求的URI，例如对于 XMLHTTPRequests, 因为 "&", "+", 和 "=" 不会被编码，然而在 GET 和 POST请求中它们是特殊字符。然而encodeURIComponent这个方法会对这些字符编码。

### 场景
应用场景：当期望获取一个可用的URL地址时，使用`encodeURI`方法进行编码。反之使用`encodeURIComponent`获得不可用的URL地址。
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
>encodeURIComponent()是对统一资源标识符（URI）的组成部分进行编码的方法。它使用一到四个转义序列来表示字符串中的每个字符的UTF-8编码（只有由两个Unicode代理区字符组成的字符才用四个转义字符编码）。
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
### 场景
encodeURIComponent：适用于url作为参数传递时。

## 什么是decodeURI
> decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。将已编码 URI 中所有能识别的转义序列转换成原字符，但不能解码那些不会被 encodeURI 编码的内容（例如 "#"）。

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
encodeURI，转码后链接还需要正常使用

encodeURI("https://zweizhao.com/文章/JS常用转码URI与Base64.md")
=> "https://zweizhao.com/%E6%96%87%E7%AB%A0/JS%E5%B8%B8%E7%94%A8%E8%BD%AC%E7%A0%81URI%E4%B8%8EBase64.md"

转码后的链接还是一个正常链接，是可以做跳转操作的。

encodeURIComponent，转码后链接不再当做正常链接使用，比如作为参数

var pa = encodeURIComponent("https://zweizhao.com/文章/JS常用转码URI与Base64.md")

console.log(pa) // "https%3A%2F%2Fzweizhao.com%2F%E6%96%87%E7%AB%A0%2FJS%E5%B8%B8%E7%94%A8%E8%BD%AC%E7%A0%81URI%E4%B8%8EBase64.md"

var realURI = "https://zweizhao.com/any?param=" + pa // "https://zweizhao.com/any?param=https%3A%2F%2Fzweizhao.com%2F%E6%96%87%E7%AB%A0%2FJS%E5%B8%B8%E7%94%A8%E8%BD%AC%E7%A0%81URI%E4%B8%8EBase64.md"

// todo...其他使用方式
上面的pa已经是一堆非链接的字符串了，所以可以当做纯参数等使用。

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
### 作用
> 计算生成一个新的字符串，其中的十六进制转义序列将被其表示的字符替换。上述的转义序列就像escape里介绍的一样。因为 unescape 已经废弃，建议使用 decodeURI或者decodeURIComponent 替代本方法。
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

encodeURI 方法返回一个编码的 URI。如果您将编码结果传递给 decodeURI，那么将返回初始的字符串。encodeURI 方法不会对下列字符进行编码：":"、"/"、";" 和 "?"。请使用 encodeURIComponent 方法对这些字符进行编码。

encodeURIComponent 方法
将文本字符串编码为一个统一资源标识符 (URI) 的一个有效组件。

encodeURIComponent(encodedURIString)：

必选的 encodedURIString 参数代表加密一个已编码的 URI 组件。

decodeURIComponent(decodedURIString)：

必选的 decodeURIComponent参数解密。

说明encodeURIComponent 方法返回一个已编码的 URI。如果您将编码结果传递给 decodeURIComponent，那么将返回初始的字符串。因为 encodeURIComponent 方法对所有的字符编码，请注意，如果该字符串代表一个路径，例如 /folder1/folder2/default.html，其中的斜杠也将被编码。这样一来，当该编码结果被作为请求发送到 web 服务器时将是无效的。如果字符串中包含不止一个 URI 组件，请使用 encodeURI 方法进行

## 总结：

通过对三个函数的分析，我们可以知道：escape()除了 ASCII 字母、数字和特定的符号外，对传进来的字符串全部进行 
转义编码，因此如果想对URL编码，最好不要使用此方法。而encodeURI() 用于编码整个URI,因为URI中的合法字符都不会 
被编码转换。encodeURIComponent方法在编码单个URIComponent（指请求参数）应当是最常用的，它可以讲参数中的中文 
、特殊字符进行转义，而不会影响整个URL。
encodeURI，转码后链接还需要正常使用
encodeURIComponent，转码后链接不再当做正常链接使用，比如作为参数
## 课外小知识
### URI/URL/URN
- URI(Uniform Resource Identifier)：统一资源标识
- URL(Uniform Resource Locator)：统一资源定位
- URN(Uniform Resource Name)：统一资源名称

每一个人都有自己的名字，有了名字，你才能找到别人，别人也才能找到你，这是社会中人与人通信的基本要求。因此，在任何一种通讯网络里，用户也都有其独特的用户标识，比如固定网络里的固定电话号码、移动网络里的移动电话号码等等，这样才能区分出不同的用户并进行通信。URI、URL、URN就是这个意思。
URL是一种具体的URI。
URI是一种语义上的抽象概念。
因此，三者之间的关系是：URN和URL是URI的子集。

一般来说，URL只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号。
这是因为网络标准RFC 1738做了硬性规定：
```
"...Only alphanumerics [0-9a-zA-Z], the special characters "$-_.+!*'()," [not including the quotes - ed], and reserved characters used for their reserved purposes may be used unencoded within a URL."

"只有字母和数字[0-9a-zA-Z]、一些特殊符号"$-_.+!*'(),"[不包括双引号]、以及某些保留字，才可以不经过编码直接用于URL。"
```
这意味着，如果URL中有汉字，就必须编码后使用。但是麻烦的是，RFC 1738没有规定具体的编码方法，而是交给应用程序（浏览器）自己决定。这导致"URL编码"成为了一个混乱的领域。

下面就让我们看看，"URL编码"到底有多混乱。我会依次分析四种不同的情况，在每一种情况中，浏览器的URL编码方法都不一样。把它们的差异解释清楚之后，我再说如何用Javascript找到一个统一的编码方法。
#### 1. 网址路径中包含汉字
输入网址`http://www.qiufeihong.top/你好世界`。其中有中文“你好世界”，看看浏览器翻译成什么了？

打开network查看HTTP请求的头信息，发现浏览器转码成了`http://www.qiufeihong.top/%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C`。
“你好世界”变成了“%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C”。
在[这里](https://wenku.baidu.com/view/fb5f9cb765ce050876321323.html)搜索查找`utf-8`。
得知，“你”、”好“、”世“和”界“的utf-8编码分别是"E4 BD A0"、"E5 A5 BD"、"E4 B8 96"和"E7 95 8C"，因此，"%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C"就是按照顺序，在每个字节前加上%而得到的。
所以，结论1就是，网址路径的编码，用的是utf-8编码。
好了，到此为止，四种情况都说完了。

假定前面你都看懂了，那么此时你应该会感到很头痛。因为，实在太混乱了。不同的操作系统、不同的浏览器、不同的网页字符集，将导致完全不同的编码结果。如果程序员要把每一种结果都考虑进去，是不是太恐怖了？有没有办法，能够保证客户端只用一种编码方法向服务器发出请求？

回答是有的，就是使用Javascript先对URL编码，然后再向服务器提交，不要给浏览器插手的机会。因为Javascript的输出总是一致的，所以就保证了服务器得到的数据是格式统一的。

Javascript语言用于编码的函数，一共有三个，最古老的一个就是escape()。虽然这个函数现在已经不提倡使用了，但是由于历史原因，很多地方还在使用它，所以有必要先从它讲起。
## 参考文献
[encodeURI](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)

[encodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

[decodeURI](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)

[decodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)

[分清 URI、URL 和 URN](https://www.ibm.com/developerworks/cn/xml/x-urlni.html)

最后，别忘了给这个项目点一个star哦，谢谢支持。
[blog](https://github.com/qiufeihong2018/vuepress-blog)
![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)
一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路