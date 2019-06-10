# 耗时6小时的同花顺面试

[[toc]]

## 面试前注意点

::: tip 一份漂亮的简历很重要
简历就是你的脸，能将简历写得好这说明一个人概括和表达能力不错。这些都是能力的体现，一定要重视，以前我就是忽视了这一点（间接导致面试不成功）。好的简历都是改出来的。注意：千万不要给自己挖坑，不要写自己答不上来的知识点。要在面试之前，把简历上的知识点和延伸点都弄懂，如果你连简历上的写的知识点都弄不懂，别人凭什么录取你。
:::

::: tip 跳槽和离职理由要恰当。
这一点很关键。虽然你的能力很强，但是你的理由不切当，别人一样不会录取你。公司归属感很重要滴。大厂不会招进一个随时会走的人，也不会招一个为了金钱跳槽的人。一般理由都有：1，工资太低，想加薪；2，为了提升技术；3，换一个氛围；4，其他因素（譬如，小孩上学、另一伴的工作、父母要求等等）。个人感觉，不能说理由1。大厂会认为你是金钱主义者，下一家给的多，你就去，毫无归属感。推荐理由2、理由3和理由4,哈哈，虽然你的目标是加薪。
:::

::: tip 注重平时积累（尤其是基础知识和原理）
我19届的，今年才毕业，已经在滨江实习了9个月了。这几个月里，我兢兢业业，刻苦努力完成公司里的项目任务。我一边做项目，一边做笔记。推荐有道云笔记。之前用过印象。哎，充满金钱味的笔记（买不起会员）。我遇到过的bug，我会记载下来。在网上看到的优秀文章和优秀博客，都是放进笔记中。我每天都会做总结，不仅有利于巩固复习，还锻炼了自己概括能力，何乐而不为呢？面试前将笔记刷一遍，将面经刷一遍。重要的是前端面试题刷一遍（很多多会考到，没考到就会问到，没问到那也是你的隐形财富）。
:::
![avatar](../public/learn.jpg)
## 面试前

其实笔试和面试各1个小时，在路上竟然花了4个小时。下午4点约的面试，我早早就到了同花顺，发现才1点多，是我太早了，突然想到一句话：准时是礼貌，早到是修养 :100: 。
 
## [笔试题](https://my.oschina.net/u/2332658/blog/466893)
笔试题在网上可以找到
var A='当时的答案'
var B='现在的答案'

> ### JavaScript包括哪些数据类型，请分别编写3种以上类型的判断函数如：isString()？

A:

简单类型：null、undefined、number、string、array
复杂类型：object
看不懂后者问的是啥。

B:

字符串、数字、布尔、数组、对象、null、undefined
typeof, instanceof, isArray()?

> ### 编写一个JavaScript函数，实时显示当前时间，格式‘年-月-日 时：分：秒’?

A:

```js
var date=new Date()
var year=date.getFullYear()
var month=date.getMonth()+1
var day=date.getDate()
var hour=date.getHours()
var minute=date.getMinutes()
var second=date.getSeconds()
console.log(year+'-'+month+'-'+day+'-'+hour+':'+minute+':'+second)
```

B:

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <input id="show" style="width:300px;"/>
  <script>
    function getTime(){
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month = (nowDate.getMonth() + 1) > 10 ? nowDate.getMonth() + 1 : '0' + (nowDate.getMonth() + 1);
      var day = nowDate.getDate() > 10 ? nowDate.getDate() : '0' + nowDate.getDate();
      var hour = nowDate.getHours() > 10 ? nowDate.getHours() : (nowDate.getHours() == 0 ? 24 : '0' + nowDate.getHours());
      var minutes = nowDate.getMinutes() > 10 ? nowDate.getMinutes() : '0' + nowDate.getMinutes();
      var seconds = nowDate.getSeconds() > 10 ? nowDate.getSeconds() : '0' + nowDate.getSeconds();
      var str= year +"-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
      document.getElementById("show").value = str;
    }
    window.setInterval("getTime()", 1000);
  </script>
</body>
</html>
```

> ### 如何显示/隐藏一个DOM元素？

A:

```css
display:none/display:block
```

B:

```css
显示：object.style.display="block";
隐藏：object.style.display="none";
```

> ### 如何添加html元素的事件处理，有几种方法。

A:

@+事件名，忘记了。

B:

 ```text

 html的元素的事件就只用控件自带的的那么几个，
 如onclick,onmousedown等等都是调用脚本执行

 方法：
 1. 在控件上直接激发事件
 2. 在页面加载的时候就调用脚本激发控件的某个事件
 3. 在后台利用后台代码强行执行控件的事件。
   或：
 1. 为HTML元素的事件属性赋值 
 2. 在JS中使用el.on*** = function() {…}
 3. 使用DOM2的添加事件的方法 addEventListener或attachEvent
```

> ### 如何控制alert中的换行。

A:

```html
\n或者\n\r
```

B:

```text
\n alert("text\ntext");
alert("再打个招呼。这里演示了" + "\n" + "如何在消息框中添加换行。")
```
> ### 判断一个字符串中出现次数最多的字符，统计这个次数。

B:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<script>
    var str = "abcdefgaddda";
    var obj = {};
    // 每个字符出现次数
    for (let i = 0; i < str.length; i++) {
        var key = str[i];
        typeof obj[key] === 'undefined' ? obj[key] = 1 : obj[key]++
    }
    var max = -1;
    var max_key = key;
    // 排序
    for (let key in obj) {
        if (max < obj[key]) {
            max = obj[key];
            max_key = key;
        }
    }
    document.write("字符:" + max_key + ",出现次数最多为:" + max + "次")
</script>
</body>
</html>
```

> ### 判断字符串是否是这样组成的，第一个必须是字母，后面可以是字母、数字、下划线，总长度为5-20

B:

```js
var reg = /^[a-zA-Z][a-zA-Z_0-9]{4,19}$/
console.log(reg.test("11a__a1a__a1a__a1a__"))

```


> ### 请编写一个JavaScript函数parseQueryString，他的用途是把URL参数解析为一个对象，如：var url=“http://witmax.cn/index.php?key0=0&key1=1&key2=2”；

B:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<script>
    function parseQueryString(url) {
        var result = {};
        var arr = url.split("?");
        if (arr.length <= 1) {
            return result;
        } else {
            arr = arr[1].split("&");
            arr.forEach(item => {
                let a = item.split('=')
                result[a[0]] = a[1]
            })
            return result;
        }
    }

    var url = "http://witmax.cn/index.php?key0=0&key1=1&key2=2";
    var ps = parseQueryString(url);
    console.log(ps)
</script>
</body>
</html>


```

> ### 在页面中有如下html：
```html
<div id="field">
<input type="text" value="User Name"/>
</div><span class="red"></span>
```
要求用闭包方式写一个JS从文本框中取出值并在标签span中显示出来。

B:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<div id="firld">
    <input type="text" value="qiufeihong"/>
</div>
<span id="red" class="red"></span>
<span class="red"></span>
<span class="red"></span>
<span class="red"></span>

<script>
    var result = (function () {
        var value = document.getElementById("firld").children[0].value;
        var all = document.getElementsByTagName("span");
        for (let i = 0; i < all.length; i++) {
            if (all[i].className == 'red') {
                all[i].innerHTML = value;
            }
        }
    })();
</script>
</body>
</html>


```
结果：

![avatar](../public/bibao.jpg)

> ### 在IE6.0下面是不支持position：fixed的，请写一个JS使用<div id="box"></div>固定在页面的右下角。

B:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        .tit {
            position: absolute;
            width: 100px;
            height: 100px;
            background: red;
        }
    </style>
</head>
<body>
<div id="box" class="tit"></div>
<script>
    window.onscroll = window.onresize = window.onload = () => {
        var getDiv = document.getElementById('box');
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        getDiv.style.left = document.documentElement.clientWidth - getDiv.offsetWidth + 'px';
        getDiv.style.top = document.documentElement.clientHeight - getDiv.offsetHeight + scrollTop + 'px';
    }
</script>
</body>
</html>
```


> ### 请实现，鼠标移到页面中的任意标签，显示出这个标签的基本矩形轮廓。

B:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        .tit {
            display: block;
            width: 100px;
            height: 100px;
            background: blue;
        }
    </style>
</head>
<body>
<div id="box" class="tit">div</div>
<p class="tit">p</p>
<a class="tit" href="www.baidu.com" alt="www.baidu.com">a</a>
<script>
    function mouseBorder(t) {
        var c = t.childNodes

        for (let i = 0; i < c.length; i++) {
            var d = c[i];

            if (d.nodeType == 1) {
                d.onmouseover = function () {
                    this.style.border = '1px solid red'
                }
                d.onmouseout = function () {
                    this.style.border = ''
                }
                mouseBorder(d);
            }
        }

    }

    mouseBorder(document.body);
</script>
</body>
</html>
```

> ### js的基础对象有哪些，window和document的常用的方法和属性列出来

A:

window属性：location
方法：alert()、
document属性：
方法：getElementById(),getElementsByName()

B：

```html
  String,Number,Boolean

Window:

方法：setInterval,setTimeout,clearInterval,clearTimeout,alert,confirm,open

属性：name,parent,screenLeft,screenTop,self,top,status

Document

方法：createElement,execCommand,getElementById,getElementsByName,getElementByTagName,write,writeln

属性：cookie,doctype,domain,documentElement,readyState,URL,
```

> ### JavaScript中如何对一个对象进行深度clone

A:

```js
JSON.parse(JSON.stringify(obj))
```

B：
```js
function cloneObject(o) {
    // 1. 是否是object,是否为空
    if (!o || 'object' !== typeof o) {
        return o;
    }
    // 2. 判断其是数组还是对象,并创建新的对象或数组
    var c = 'function' === typeof o.pop ? [] : {};

    // 3. 遍历对象或数组
    for (let p in o) {
        // 4. 判断o中的属性p是否存在
        if (o.hasOwnProperty(p)) {
            let v = o[p];
            v && 'object' === typeof v ? c[p] = Ext.ux.clone(v) : c[p] = v
        }
    }
    return c;
}

a = {'name': 'qiufeihong'}
b = cloneObject(a)
a.name = 'youyuxi'
console.log('a', a)
console.log('b', b)

```
> ### js中如何定义class，如何扩展protope？

A:

```js
FUNCTION.protope.myName=function(){
}
```

B：

```html
Ele.className = “***”; //***在css中定义，形式如下：.*** {…}

A.prototype.B = C;

A是某个构造函数的名字

B是这个构造函数的属性

C是想要定义的属性的值
```

> ### ajax是什么？ajax的交互模型？同步和异步的区别？如何解决跨域问题？

A:

- ajax是javascript异步通讯机制

- 同步阻塞，只有一个任务完成后才能完成下一个任务
  异步非阻塞，等待一个任务的同时可以执行另一个任务

- ACAO、nigix

B：

```html
Ajax是多种技术组合起来的一种浏览器和服务器交互技术，基本思想是允许一个互联网浏览器向一个远程页面/服务做异步的http调用，并且用收到的数据来更新一个当前web页面而不必刷新整个页面。该技术能够改进客户端的体验。包含的技术：

XHTML：对应W3C的XHTML规范，目前是XHTML1.0。

CSS：对应W3C的CSS规范，目前是CSS2.0

DOM：这里的DOM主要是指HTML DOM，XML DOM包括在下面的XML中

JavaScript：对应于ECMA的ECMAScript规范

XML：对应W3C的XML DOM、XSLT、XPath等等规范

XMLHttpRequest：对应WhatWG的Web Applications1.0规范（http://whatwg.org/specs/web-apps/current-work/）

AJAX交互模型

同步：脚本会停留并等待服务器发送回复然后再继续

异步：脚本允许页面继续其进程并处理可能的回复

跨域问题简单的理解就是因为JS同源策略的限制，a.com域名下的JS无法操作b.com或c.a.com下的对象，具体场景如下：

PS：（1）如果是端口或者协议造成的跨域问题前端是无能为力的

(2) 在跨域问题上，域仅仅通过URL的首部来识别而不会尝试判断相同的IP地址对应的域或者两个域是否对应一个IP

前端对于跨域的解决办法：

(1) document.domain+iframe

(2) 动态创建script标签
```
> ### 请给出异步加载js方案，不少于两种？

A:

async、defer

B:
```html
默认情况javascript是同步加载的，也就是javascript的加载时阻塞的，后面的元素要等待javascript加载完毕后才能进行再加载，对于一些意义不是很大的javascript，如果放在页头会导致加载很慢的话，是会严重影响用户体验的。

(1) defer，只支持IE
defer属性的定义和用法（我摘自w3school网站）
defer 属性规定是否对脚本执行进行延迟，直到页面加载为止。
有的 javascript 脚本 document.write 方法来创建当前的文档内容，其他脚本就不一定是了。

如果您的脚本不会改变文档的内容，可将 defer 属性加入到

(2) async：
async的定义和用法(是HTML5的属性)
async 属性规定一旦脚本可用，则会异步执行。
示例：
复制代码 代码如下:

注释：async 属性仅适用于外部脚本（只有在使用 src 属性时）。
注释：有多种执行外部脚本的方法：
•如果 async="async"：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
•如果不使用 async 且 defer="defer"：脚本将在页面完成解析时执行
•如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本

(3) 创建script，插入到DOM中，加载完毕后callBack，见代码：
复制代码 代码如下:

function loadScript(url, callback){
var script = document.createElement_x("script")
script.type = "text/javascript";
if (script.readyState){ //IE
script.onreadystatechange = function(){
if (script.readyState == "loaded" ||
script.readyState == "complete"){
script.onreadystatechange = null;
callback();
}
};
} else { //Others: Firefox, Safari, Chrome, and Opera
script.onload = function(){
callback();
};
}
script.src = url;
document.body.appendChild(script);
}
```

有关链接：[异步加载js的几种方式](https://www.cnblogs.com/1314-/p/6561475.html)

参考答案：
```html
  默认情况javascript是同步加载的，也就是javascript的加载时阻塞的，后面的元素要等待javascript加载完毕后才能进行再加载，对于一些意义不是很大的javascript，如果放在页头会导致加载很慢的话，是会严重影响用户体验的。

异步加载方式：

(1) defer，只支持IE

(2) async：

(3) 创建script，插入到DOM中，加载完毕后callBack，见代码：function loadScript(url, callback){   var script = document.createElement("script")   script.type = "text/javascript";   if (script.readyState){ //IE      script.onreadystatechange = function(){         if (script.readyState == "loaded" ||            script.readyState == "complete"){            script.onreadystatechange = null;            callback();         }      };   } else { //Others: Firefox, Safari, Chrome, and Opera      script.onload = function(){          callback();      };   }   script.src = url;   document.body.appendChild(script);}
```

> ### 多浏览器检测通过什么？

B：
```html
  （1） navigator.userAgent

  （2） 不同浏览器的特性，如addEventListener
```
![avatar](../public/insist.jpeg)
## 面试题
面试知识点
两个面试官人超级好。

> ### window.onload()在哪个周期中？

A:

没听清楚，懵逼了。

B：

当文档内容完全加载完成会触发该事件。可以为此事件注册事件处理函数，并将要执行的脚本代码放在事件处理函数中，于是就可以避免获取不到对象的情况。

> ### 如何异步加载js？

见笔试题

> ### vue生命周期？

A:

beforeCreate：此时获取不到prop和data中的数据；
created：可以获取到prop和data中的数据；
beforeMount：获取到了VDOM;
mounted：VDOM解析成了真实DOM;
beforeUpdate：在更新之前调用；
updated：在更新之后调用；
keep-alive：切换组件之后，组件放进activated，之前的组件放进deactivated；
beforeDestory：在组件销毁之前调用，可以解决内存泄露的问题，如setTimeout和setInterval造成的问题。
destory：组件销毁之后调用。

> ### [缓存](https://juejin.im/book/5bdc715fe51d454e755f75ef/section/5c06769251882516cd70cfe9)

B:

缓存可以说是性能优化中简单高效的一种优化方式了，它可以显著减少网络传输所带来的损耗。

对于一个数据请求来说，可以分为发起网络请求、后端处理、浏览器响应三个步骤。浏览器缓存可以帮助我们在第一和第三步骤中优化性能。比如说直接使用缓存而不发起请求，或者发起了请求但后端存储的数据和前端一致，那么就没有必要再将数据回传回来，这样就减少了响应数据。

接下来的内容中我们将通过以下几个部分来探讨浏览器缓存机制：

缓存位置
缓存策略
实际场景应用缓存策略


> ### socket-io与http请求的区别?

B:

```text
Socket实现服务器与客户端之间的物理连接，并进行数据传输。主要有TCP/UDP两个协议。Socket处于网络协议的传输层。
TCP：传输控制协议，面向连接的的协议，稳定可靠。当客户和服务器彼此交换数据前，必须先在双方之间建立一个TCP连接，之后才能传输数据。
UDP：广播式数据传输，UDP不提供可靠性，它只是把应用程序传给IP层的数据报发送出去，但是并不能保证它们能到达目的地。由于UDP在传输数据报前不用在客户和服务器之间建立一个连接，且没有超时重发等机制，故而传输速度很快。
优点：1.传输数据为字节级，传输数据可自定义，数据量小。相应的移动端开发，手机费用低
   2.传输数据时间短，性能高
   3.适合C/S之间信息实时交互
   4.可以加密，数据安全性高
缺点： 1.需要对传输的数据进行解析，转化为应用级的数据
      2.对开发人员的开发水平要求高
    3.相对于Http协议传输，增加了开发量

Http请求主要有http协议，基于http协议的soap协议，常见的http数据请求方式有get和post，web服务

优点：1.基于应用级的接口使用方便
   2.要求的开发水平不高，容错性强
缺点： 1.传输速度慢，数据包大。
    2.如实现实时交互，服务器性能压力大
    3.数据传输安全性差

HTTP协议：简单对象访问协议，对应于应用层  ，HTTP协议是基于TCP连接的

tcp协议：    对应于传输层

ip协议：     对应于网络层 
TCP/IP是传输层协议，主要解决数据如何在网络中传输；而HTTP是应用层协议，主要解决如何包装数据。

Socket是对TCP/IP协议的封装，Socket本身并不是协议，而是一个调用接口（API），通过Socket，我们才能使用TCP/IP协议。

 

http连接：http连接就是所谓的短连接，即客户端向服务器端发送一次请求，服务器端响应后连接即会断掉；

socket连接：socket连接就是所谓的长连接，理论上客户端和服务器端一旦建立起连接将不会主动断掉；但是由于各种环境因素可能会是连接断开，比如说：服务器端或客户端主机down了，网络故障，或者两者之间长时间没有数据传输，网络防火墙可能会断开该连接以释放网络资源。所以当一个socket连接中没有数据的传输，那么为了维持连接需要发送心跳消息~~具体心跳消息格式是开发者自己定义的



Socket适用场景：网络游戏，银行交互，支付。
http适用场景：公司OA服务，互联网服务。
```

> ### [generator](http://es6.ruanyifeng.com/#docs/generator)如何执行？如何让generator自动next（不通过next.next.next）？

A:

```js
function* f(){
    yeild()
    yeild()
    yeild()
    ...
}
f().next().next()
```

async await
中间加上await

B:

```text
Generator 算是 ES6 中难理解的概念之一了，Generator 最大的特点就是可以控制函数的执行。在这一小节中我们不会去讲什么是 Generator，而是把重点放在 Generator 的一些容易困惑的地方。

function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}

你也许会疑惑为什么会产生与你预想不同的值，接下来就让我为你逐行代码分析原因

首先 Generator 函数调用和普通函数不同，它会返回一个迭代器
当执行第一次 next 时，传参会被忽略，并且函数暂停在 yield (x + 1) 处，所以返回 5 + 1 = 6
当执行第二次 next 时，传入的参数等于上一个 yield 的返回值，如果你不传参，yield 永远返回 undefined。此时 let y = 2 * 12，所以第二个 yield 等于 2 * 12 / 3 = 8
当执行第三次 next 时，传入的参数会传递给 z，所以 z = 13, x = 5, y = 24，相加等于 42
Generator 函数一般见到的不多，其实也于他有点绕有关系，并且一般会配合 co 库去使用。当然，我们可以通过 Generator 函数解决回调地狱的问题，可以把之前的回调地狱例子改写为如下代码：

function *fetch() {
    yield ajax(url, () => {})
    yield ajax(url1, () => {})
    yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()

```

> ### 遇到过的兼容性问题？

A:

一直做的是PC端的项目，公司不考虑兼容性问题，基本都是跑在chrome浏览器上的。肯定不能这么说啊
B:

```text
遇到的兼容性问题与解决方法
浏览器兼容问题一：不同浏览器的标签默认的外补丁和内补丁不同

问题症状：随便写几个标签，不加样式控制的情况下，各自的margin 和padding差异较大。

碰到频率:100%

解决方案：CSS里    *{margin:0;padding:0;}

备注：这个是最常见的也是最易解决的一个浏览器兼容性问题，几乎所有的CSS文件开头都会用通配符*来设置各个标签的内外补丁是0。

浏览器兼容问题二：块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大

问题症状:常见症状是IE6中后面的一块被顶到下一行

碰到频率：90%（稍微复杂点的页面都会碰到，float布局最常见的浏览器兼容问题）

解决方案：在float的标签样式控制中加入 display:inline;将其转化为行内属性

备注：我们最常用的就是div+CSS布局了，而div就是一个典型的块属性标签，横向布局的时候我们通常都是用div float实现的，横向的间距设置如果用margin实现，这就是一个必然会碰到的兼容性问题。

浏览器兼容问题三：设置较小高度标签（一般小于10px），在IE6，IE7，遨游中高度超出自己设置高度

问题症状：IE6、7和遨游里这个标签的高度不受控制，超出自己设置的高度

碰到频率：60%

解决方案：给超出高度的标签设置overflow:hidden;或者设置行高line-height 小于你设置的高度。

备注：这种情况一般出现在我们设置小圆角背景的标签里。出现这个问题的原因是IE8之前的浏览器都会给标签一个最小默认的行高的高度。即使你的标签是空的，这个标签的高度还是会达到默认的行高。

浏览器兼容问题四：行内属性标签，设置display:block后采用float布局，又有横行的margin的情况，IE6间距bug

问题症状：IE6里的间距比超过设置的间距

碰到几率：20%

解决方案：在display:block;后面加入display:inline;display:table;

备注：行内属性标签，为了设置宽高，我们需要设置display:block;(除了input标签比较特殊)。在用float布局并有横向的margin后，在IE6下，他就具有了块属性float后的横向margin的bug。不过因为它本身就是行内属性标签，所以我们再加上display:inline的话，它的高宽就不可设了。这时候我们还需要在display:inline后面加入display:talbe。

浏览器兼容问题五：图片默认有间距

问题症状：几个img标签放在一起的时候，有些浏览器会有默认的间距，加了问题一中提到的通配符也不起作用。

碰到几率：20%

解决方案：使用float属性为img布局

备注：因为img标签是行内属性标签，所以只要不超出容器宽度，img标签都会排在一行里，但是部分浏览器的img标签之间会有个间距。去掉这个间距使用float是正道。（我的一个学生使用负margin，虽然能解决，但负margin本身就是容易引起浏览器兼容问题的用法，所以我禁止他们使用）

浏览器兼容问题六：标签最低高度设置min-height不兼容

问题症状：因为min-height本身就是一个不兼容的CSS属性，所以设置min-height时不能很好的被各个浏览器兼容

碰到几率：5%

解决方案：如果我们要设置一个标签的最小高度200px，需要进行的设置为：{min-height:200px; height:auto !important; height:200px; overflow:visible;}

备注：在B/S系统前端开时，有很多情况下我们又这种需求。当内容小于一个值（如300px）时。容器的高度为300px；当内容高度大于这个值时，容器高度被撑高，而不是出现滚动条。这时候我们就会面临这个兼容性问题。

浏览器兼容问题七：透明度的兼容CSS设置

做兼容页面的方法是：每写一小段代码（布局中的一行或者一块）我们都要在不同的浏览器中看是否兼容，当然熟练到一定的程度就没这么麻烦了。建议经常会碰到兼容性问题的新手使用。很多兼容性问题都是因为浏览器对标签的默认属性解析不同造成的，只要我们稍加设置都能轻松地解决这些兼容问题。如果我们熟悉标签的默认属性的话，就能很好的理解为什么会出现兼容问题以及怎么去解决这些兼容问题。

/* CSS hack*/ 
我很少使用hacker的，可能是个人习惯吧，我不喜欢写的代码IE不兼容，然后用hack来解决。不过hacker还是非常好用的。使用hacker我可以把浏览器分为3类：IE6 ；IE7和遨游；其他（IE8 chrome ff safari opera等）

◆IE6认识的hacker 是下划线_ 和星号 *

◆IE7 遨游认识的hacker是星号 *

比如这样一个CSS设置：

height:300px;*height:200px;_height:100px; 
IE6浏览器在读到height:300px的时候会认为高时300px；继续往下读，他也认识*heihgt， 所以当IE6读到*height:200px的时候会覆盖掉前一条的相冲突设置，认为高度是200px。继续往下读，IE6还认识_height,所以他又会覆盖掉200px高的设置，把高度设置为100px；

IE7和遨游也是一样的从高度300px的设置往下读。当它们读到*height200px的时候就停下了，因为它们不认识_height。所以它们会把高度解析为200px，剩下的浏览器只认识第一个height:300px;所以他们会把高度解析为300px。因为优先级相同且想冲突的属性设置后一个会覆盖掉前一个，所以书写的次序是很重要的。
```
> ### promise原理？

A:

三种状态：pending、resolve和reject
三种状态中，除了pending可以改成后两者，其他都不能变，成功就往resolve去，失败就往reject去。

B:

```text
Promise 翻译过来就是承诺的意思，这个承诺会在未来有一个确切的答复，并且该承诺有三种状态，分别是：

等待中（pending）
完成了 （resolved）
拒绝了（rejected）
这个承诺一旦从等待状态变成为其他状态就永远不能更改状态了，也就是说一旦状态变为 resolved 后，就不能再次改变

new Promise((resolve, reject) => {
  resolve('success')
  // 无效
  reject('reject')
})

当我们在构造 Promise 的时候，构造函数内部的代码是立即执行的

new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve('success')
})
console.log('finifsh')
// new Promise -> finifsh
Promise 实现了链式调用，也就是说每次调用 then 之后返回的都是一个 Promise，并且是一个全新的 Promise，原因也是因为状态不可变。如果你在 then 中 使用了 return，那么 return 的值会被 Promise.resolve() 包装

Promise.resolve(1)
  .then(res => {
    console.log(res) // => 1
    return 2 // 包装成 Promise.resolve(2)
  })
  .then(res => {
    console.log(res) // => 2
  })
当然了，Promise 也很好地解决了回调地狱的问题，可以把之前的回调地狱例子改写为如下代码：

ajax(url)
  .then(res => {
      console.log(res)
      return ajax(url1)
  }).then(res => {
      console.log(res)
      return ajax(url2)
  }).then(res => console.log(res))
前面都是在讲述 Promise 的一些优点和特点，其实它也是存在一些缺点的，比如无法取消 Promise，错误需要通过回调函数捕获。
```
> ### koa和express？

A:

koa和express原理和用法都是一样的，app.get/post/put要用下，路由分发方便。多了一generator

B:

Express 采用 callback 来处理异步，Koa v1 采用 generator，Koa v2 采用 async/await。 
下面分别对 js 当中 callback、promise、generator、async/await 这四种异步流程控制进行了对比，
generator 和 async/await 使用同步的写法来处理异步，明显好于 callback 和 promise，async/await 在语义化上又要比 generator 更强。
错误处理
Express 使用 callback 捕获异常，对于深层次的异常捕获不了，Koa 使用 try catch，能更好地解决异常捕获。

Express
优点：线性逻辑，通过中间件形式把业务逻辑细分、简化，一个请求进来经过一系列中间件处理后再响应给用户，清晰明了。 缺点：基于 callback 组合业务逻辑，业务逻辑复杂时嵌套过多，异常捕获困难。

Koa
优点：首先，借助 co 和 generator，很好地解决了异步流程控制和异常捕获问题。其次，Koa 把 Express 中内置的 router、view 等功能都移除了，使得框架本身更轻量。 缺点：社区相对较小

> ### 你有哪些优秀代码可以讲讲？哪些好项目？

我提到的是我做得的项目中的贡献。

> ### 你怎么学习？

github关注大佬动态，看他们博客。慕课网、Stack Overflow，v2、掘金等等。

> ### 会用哪些[linux命令](http://www.runoob.com/linux/linux-command-manual.html)？

A:

mkdir、cd、shutdowm、ls，当时只想到常用的一些。

B:常用的

cat、chmod、file、find、git、ln、mv、rcp、scp、which、whereis、grep、let、sort、cd、rm、kill、shutdowm、sudo、gzip、zip

> ### 看什么书？其中有什么你要说的

犀牛书和红皮书当字典查。generator不太懂其原理。

> ### 你为什么要从事前端？什么时候？未来展望？为什么要用vue？

A:
- 喜欢前端啊,喜欢展示的效果
- 大二的时候
- 未来3-5年成为前端技术大佬，具体措施是将vue原理看懂的同时js底层深入。之后往服务端靠。
- 经朋友推荐，vue轻量级，有模板，上手快。

> ### echarts如何画图？

A:
我不知道，但是我有一点点想法。
用canvas画，比如要画一个柱状图，先给他一个x轴和y轴，然后将每个柱子往上画，柱子之间的距离和粗细要进行计算

B:
第一、echarts的实现，是通过canvas来实现的。由于canvas的限制，所以echarts在实现的时候多是绘制一些，规则的、可预期的、易于实现的东西。

第二、echarts的核心就是options的配置对象。一般而言，我们使用最多的是直角坐标图、极点图、以及地图。

第三、对于直角坐标，必须配置xAsix和yAxis；对于极点坐标，必须配置radiusAxis和angleAxis；

第四、对series系列的认识，它是一个数组。数组中的每一项代表着一个单独的系列，可以配置显示为散点图scatter、折线图line、柱状图bar等等功能。series的data一般是一个每一项都是数组的数组，类似于：[[],[],[]]这样的形式，里层数组一般代表xAsix、yAxis或者radiusAxis、angleAxis等等。

参考网上链接:[echarts绘图](https://blog.csdn.net/mapbar_front/article/details/78444477)

>### 你用什么布局？

A:

flex布局和grid布局

B:
```text
1、边距与浮动布局
1.1、负边距
1.1.1、向上移动
1.1.2、去除列表右边框
1.1.3、负边距+定位，实现水平垂直居中
1.1.4、去除列表最后一个li元素的border-bottom
1.2、双飞翼布局
1.3、多栏布局
1.3.1、栅格系统
1.3.2、多列布局
2、流式布局（Fluid）
3、瀑布流布局
3.1、常见瀑布流布局网站
3.2、特点
3.3、masonry实现瀑布流布局
3.3.1、下载并引用masonry
3.3.2、准备内容
3.3.3、初始化插件
3.3.4、使用了图片的瀑布流
3.3.5、图片基础
3.4、图片加载处理
3.4.1、imagesLoaded 图片加载进度监听
3.4.2、图片延迟加载
3.5、Infinite Scroll 滚动分页
3.5.1、异步加载普通页面
3.5.2、异步加载json并解析
4、响应式布局（Responsive）
4.1、媒介类型
4.2、媒介查询的应用位置（Media Queries）
4.3、Media Queries Hello World
4.4、媒介查询语法
4.5、响应式栅格系统（Responsive）
4.6、respond.js
4.7、移动优先（Mobile First）
4.8、视区（viewport）
4.8.1、需要设置viewport的原因
4.8.2、设置viewport的方法
4.8.3、小节
5、REM实现响应式布局
5.1、使用javascript设置相对尺寸
5.2、使用媒介查询设置字体尺寸
6、弹性布局（Flexbox）


```

参考网上链接:[页面布局大全](https://www.cnblogs.com/best/p/6136165.html)

> ### 把UI图给你，你要怎么操作？没有UI库呢？

A:
先选UI库，将UI图拆分，拆分成一个个组件。选择布局，flex，grid布局。用html和css实现框架，完成细枝末节。

B:
拿到UI图，我们就需要快速分割页面布局。再进行考虑是用哪种布局方式，如响应式、网格、FlexBox布局等。而有些时候，我们就需要自己规划，制作一个基本的线框图（Wireframe）等等。

> ### 如何SEO?

A:

除了服务端渲染，还可以通过语义化标签：article、section

B:

- 页面中杜绝出现死链接（404页面）（服务器处理）

- 避免浏览器中异常错误的抛出

- 增加关键词优化

- 对于不经常更新的数据，最好采用浏览器的304缓存做处理

- 使用字体图标代替一些页面中的位置

- 合理的title、description、keywords

- 语义化的HTML代码

- 重要内容HTML代码放在最前

- 少用iframe：搜索引擎不会抓取iframe中的内容

- 非装饰性图片必须用alt

- 提高网站速度

我的问题：
> ### 技术栈？

目前是Vue，之后会转向React+typescript。

> ### 团建？打球？

- 一周一次团建，还没有技术分享会
- 楼上有足球场、旁边是篮球场

> ### 996吗？

不是，是弹性工作制度。

> ### 如果我进来，我做什么？

你可以做公司的活动页，小程序的等等。

## 面试后
面试完后千万记得要做笔记，就算没通过，也是一份面试经验，要把它当作学习。水滴石穿 :100: 。

## 入职前
在和HR聊到薪资问题的时候，不妨大胆问个清楚：除了工资之外，还有其他的薪资福利吗？比如
五险一金，考核标准，福利，社保，补贴和奖金。
1. 补贴是指车贴、饭贴、房贴、汽油补贴、出差津贴、通讯费、置装费、过节费等工资以外的现金福利，另外一些企业还会设立各种名目繁多的奖金，如半年奖、季度奖、加班奖、先进奖、考勤奖等。 [手把手教你跟HR谈工资](https://www.douban.com/note/442255900/?type=like)
2. 五险一金，包括医疗保险、养老保险、失业保险、工伤保险、生育保险、住房公积金。[HR和我谈五险一金，我该知道哪些以防被坑？](http://wemedia.ifeng.com/85009930/wemedia.shtml)
