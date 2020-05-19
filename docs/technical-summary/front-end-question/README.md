# 工作中遇到的前端问题和处理清单

## 1. 为什么$emit()方法不能触发父组件方法？
因为在组件中$emit传入的事件名称使用了大写的驼峰命名，但是其命名只能使用小写，所以无法触发父组件方法。
正确如下：
`this.$emit('prev-click', this.internalCurrentPage)`

错误如下：
`this.$emit('prevClick', this.internalCurrentPage)`

如果修改后还是不行的话，就改用：`this.$parent.Event`(Event为父组件中的自定义方法)
## 2. Node.js Error: listen EADDRNOTAVAIL这是什么？
地址占用
1. cmd 看下本地ipconfig，然后输入自己的ip，就可以了
2. 在浏览器输入http://ip:port即可查看页面
## 3. Vue和IE兼容问题(IE页面空白不显示）
当IE11打开vue页面的时候，居然是一片空白。
查看相关issue。
`https://github.com/vuejs-templates/webpack/issues/260`
在浏览器控制台中出现以下错误：SCRIPT5022: [vuex] vuex requires a Promise polyfill in this browser。
尤大的回答：
> ES6-> ES5转换仅处理语法转换，而不处理polyfill（这些更像是运行时功能）。您可以使用babel-polyfill（包括所有与ES6相关的polyfills），也可以使用es6-promise。
首先`npm install --save babel-polyfill`
然后在`main.js`中的最前面引入`babel-polyfill`
```js
import 'babel-polyfill'
```
在`index.html` 加入以下代码
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```
在`config`中的`webpack.base.conf.js`中,修改编译配置
```js
entry:{
    app:['babel-polyfill','./src/main.js']      
}
```
当然，如果你只用到了 axios 对 promise进行兼容，可以只用 es6-promise
`npm install es6-promise --save`
在 main.js 中的最前面 引入
```js
import 'es6-promise/auto'
```
## 4. 为什么会出现`Uncaught (in promise) RangeError: Maximum call stack size exceeded`问题？
因为在分页逻辑的时候，未进行条件判断，导致递归无限进行。
## 5. `before-leave`切换element标签之前提示
这是element-ui切换标签之前的钩子，可以在这个方法中写提示语。
## 6. 为什么在`keep-alive`中使用`activated`和`deactiveted`无效？
因为`keep-alive`中组件中不包含动态组件，那么那些不被包含的组件就无法触发这两个方法。
`:exclude="['a','b','c']"`，那么其中`a`,`b`,`c`组件就无法调用方法。

`:include="['a','b','c']"`，其中组件才可以使用activated和dctiveted。

`activated`在`keep-alive`组件激活时调用，该钩子函数在服务器端渲染期间不被调用
`deactivated`在`keep-alive`组件停用时调用，该钩子函数在服务器端渲染期间不被调用
## 7. axios中使用params怎么传数组？
`axios`使用`params`传递数组类型的参数时，在`query`中的参数名会带上`[]`字符串

明明要传入数组a=[1,2,3],

实际如下：
```js
a[]:1
a[]:2
a[]:3
```
因为`POST`传数组肯定是没问题，`data`本身支持`json`数据。但是`GET`数据带在`url`后面，那么就要转字符串。

正确方式是`JSON.stringify()`将数组`json`序列化
## 8. iframe高度如何自适应？

JS自适应高度，其实就是设置iframe的高度，使其等于内嵌网页的高度，从而看不出来滚动条和嵌套痕迹。对于用户体验和网站美观起着重要作用。

如果内容是固定的，那么我们可以通过CSS来给它直接定义一个高度，同样可以实现上面的需求。当内容是未知或者是变化的时候。这个时候又有几种情况了。

想要父页面中的iframe高度自适应，那就必须拿到子页面的高度。
通过iframe.height设置iframe的高度。
iframe 属性：
```
src: "http://www.bing.com/"
srcdoc: ""
name: ""
sandbox: DOMTokenList [value: ""]
allowFullscreen: false
width: ""
height: ""
contentDocument: null
contentWindow: global {window: global, self: global, location: Location, closed: false, frames: global, …}
referrerPolicy: ""
csp: ""
allow: ""
align: ""
scrolling: "no"
frameBorder: "0"
longDesc: ""
marginHeight: ""
marginWidth: ""
featurePolicy: FeaturePolicy {}
loading: "auto"
allowPaymentRequest: false
title: ""
lang: ""
translate: true
dir: ""
hidden: false
accessKey: ""
draggable: false
spellcheck: true
autocapitalize: ""
contentEditable: "inherit"
isContentEditable: false
inputMode: ""
offsetParent: body
offsetTop: 8
offsetLeft: 8
offsetWidth: 504
offsetHeight: 1000
style: CSSStyleDeclaration {alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", …}
innerText: ""
outerText: ""
oncopy: null
oncut: null
onpaste: null
onabort: null
onblur: null
oncancel: null
oncanplay: null
oncanplaythrough: null
onchange: null
onclick: null
onclose: null
oncontextmenu: null
oncuechange: null
ondblclick: null
ondrag: null
ondragend: null
ondragenter: null
ondragleave: null
ondragover: null
ondragstart: null
ondrop: null
ondurationchange: null
onemptied: null
onended: null
onerror: null
onfocus: null
oninput: null
oninvalid: null
onkeydown: null
onkeypress: null
onkeyup: null
onload: ƒ onload(event)
onloadeddata: null
onloadedmetadata: null
onloadstart: null
onmousedown: null
onmouseenter: null
onmouseleave: null
onmousemove: null
onmouseout: null
onmouseover: null
onmouseup: null
onmousewheel: null
onpause: null
onplay: null
onplaying: null
onprogress: null
onratechange: null
onreset: null
onresize: null
onscroll: null
onseeked: null
onseeking: null
onselect: null
onstalled: null
onsubmit: null
onsuspend: null
ontimeupdate: null
ontoggle: null
onvolumechange: null
onwaiting: null
onwheel: null
onauxclick: null
ongotpointercapture: null
onlostpointercapture: null
onpointerdown: null
onpointermove: null
onpointerup: null
onpointercancel: null
onpointerover: null
onpointerout: null
onpointerenter: null
onpointerleave: null
onselectstart: null
onselectionchange: null
onanimationend: null
onanimationiteration: null
onanimationstart: null
ontransitionend: null
dataset: DOMStringMap {}
nonce: ""
autofocus: false
tabIndex: 0
enterKeyHint: ""
onformdata: null
onpointerrawupdate: null
namespaceURI: "http://www.w3.org/1999/xhtml"
prefix: null
localName: "iframe"
tagName: "IFRAME"
id: "myFrame"
className: ""
classList: DOMTokenList [value: ""]
slot: ""
part: DOMTokenList [value: ""]
attributes: NamedNodeMap {0: src, 1: id, 2: frameborder, 3: scrolling, 4: onload, src: src, id: id, frameborder: frameborder, scrolling: scrolling, onload: onload, …}
shadowRoot: null
assignedSlot: null
innerHTML: ""
outerHTML: "<iframe src="http://www.bing.com" id="myFrame" frameborder="0" scrolling="no" onload="setFrameHeight(this)"></iframe>"
scrollTop: 0
scrollLeft: 0
scrollWidth: 504
scrollHeight: 1000
clientTop: 0
clientLeft: 0
clientWidth: 504
clientHeight: 1000
attributeStyleMap: StylePropertyMap {size: 0}
onbeforecopy: null
onbeforecut: null
onbeforepaste: null
onsearch: null
elementTiming: ""
previousElementSibling: null
nextElementSibling: script
children: HTMLCollection []
firstElementChild: null
lastElementChild: null
childElementCount: 0
onfullscreenchange: null
onfullscreenerror: null
onwebkitfullscreenchange: null
onwebkitfullscreenerror: null
nodeType: 1
nodeName: "IFRAME"
baseURI: "file:///D:/githubMe/blog-demo/frame.html"
isConnected: true
ownerDocument: document
parentNode: body
parentElement: body
childNodes: NodeList []
firstChild: null
lastChild: null
previousSibling: null
nextSibling: text
nodeValue: null
textContent: ""
```
通过测试发现设置`iframe`中的`height`即可实现高度变化。
```html
<html>
<iframe src="https://www.bing.com/" id="myFrame" frameborder='0' width="500px"></iframe>

</html>
<script>
    function initFrame() {
        var iframe = document.getElementById("myFrame");
        iframe.height = document.documentElement.clientHeight
    }
    window.onload = initFrame()
    window.onresize=initFrame()
</script>
<style>
    body {
        margin: 0;
        width: 0;
    }
</style>
```
就可以实现高度自适应
## 9. iframe边框怎么去？
`iframe`标签中添加属性`frameborder`，并且设置为'0'
## 10. el-dropdown中的事件command怎么携带参数？
`command`经过测试无法携带参数，只能通过触发每个下拉项事件来携带参数
`el-dropdown-menu`绑定`click`事件
## 11. v-for与v-else连用，为什么重复渲染该标签？

```html
        <div v-if="search">
              <el-checkbox  v-for="user in userList" :label="user.name" :key="user.name">
                {{ user.name }}
              </el-checkbox>
              </div>
              <!-- v-else不能和v-for用在同一标签中，否则重复渲染 -->
              <div  v-else >
              <el-checkbox v-for="user in userList" :label="user.name" :key="user.name"
                :disabled="user.name === userInfo.cn_name">
                {{ user.name }}
              </el-checkbox>
              </div>
```
未完待续
## 12. refused to set unsafe header 'cookie'
因为浏览器的请求`header`中存有`cookie`会不安全，所以浏览器后报错。但是硬要添加也是没问题的。
最佳做法是把`Cookie`改成`Authorization`，让后端从`Authorization`中拿到相关登录信息
## 13. vue插值中函数不能异步
vue中的插值表达式中添加异步函数
```vue
<template>
...
    <el-table :data="tableData">
      <el-table-column label="名字" width="200" show-overflow-tooltip>
        <template slot-scope="slot">
          <router-link
            class="name"
            :to="{ path: 'iframe', query: { id: slot.row.id }}"
          >{{ getName(slot.row.id) }}</router-link>
        </template>
      </el-table-column>
    </el-table>
...
</template>
<script>
export default {
...
methods:{
    getName(msg){
        let aaa
        axios.post({
            url:url,
            params:msg
        }).then(res=>{
        return res.data.name
        })
    }
}
...
}
</script>
```
就比如上面这个表格根据`id`获取姓名，在插值表达式中的函数返回异步请求的结果，可想而知，是没有结果渲染的。

最佳做法，从`table`中的依赖数据`tableData`入手，遍历其中的`id`先获取名字，然后放进`table`即可。
## 14. 为何时间戳是从1970年1月1日 00:00:00 UTC+00:00开始？
最初计算机操作系统是32位，而时间也是用32位表示。
System.out.println(Integer.MAX_VALUE); // 2147483647
Integer在Java内用32位表示，因此32位能表示的最大值是2147483647。另外1年365天的总秒数是31536000，
2147483647/31536000 = 68.1
也就是说32位能表示的最长时间是68年，而实际上到2038年01月19日03时14分07秒，便会到达最大时间，过了这个时间点，所有32位操作系统时间便会变为10000000 00000000 00000000 00000000，也就是1901年12月13日20时45分52秒，这样便会出现时间回归的现象，很多软件便会运行异常了。
因为用32位来表示时间的最大间隔是68年，而最早出现的UNIX操作系统考虑到计算机产生的年代和应用的时限综合取了1970年1月1日作为UNIX TIME的纪元时间(开始时间)，而java自然也遵循了这一约束。
至于时间回归的现象相信随着64为操作系统的产生逐渐得到解决，因为用64位操作系统可以表示到292,277,026,596年12月4日15时30分08秒，相信我们的N代子孙，哪怕地球毁灭那天都不用愁不够用了，因为这个时间已经是千亿年以后了。
1969年8月，贝尔实验室的程序员肯汤普逊利用妻儿离开一个月的机会，开始着手创造一个全新的革命性的操作系统，他使用B编译语言在老旧的PDP-7机器上开发出了Unix的一个版本。随后，汤普逊和同事丹尼斯里奇改进了B语言，开发出了C语言，重写了UNIX，新版于1971年发布。
那时的计算机操作系统是32位，时间用32位有符号数表示，则可表示 68 年,
用32位无符号数表示，可表示136年。他们认为 以 1970年 为时间 原点 足够可以了。 因此，C 的 time 函数 就这么 定了，后来的 java 等也用它，微机也用它，工作站本来就是unix系统当然也用它。（今后若用64位机年限更没问题。）
1970年1月1日 算 UNIX 和 C语言 生日。
时间戳
全世界各个时区的时间可能都是不一样的，那么就有了时间戳，可以不受时区的限制，精确的表示时间。
时间戳（timestamp），一个能表示一份数据在某个特定时间之前已经存在的、 完整的、 可验证的数据,通常是一个字符序列，唯一地标识某一刻的时间。
时间戳是指格林威治时间1970年01月01日00时00分00秒起至现在的总秒数。
有了时间戳，无论我们深处哪个时区，从格林威治时间1970年01月01日00时00分00秒到现在这一时刻的总秒数应该是一样的。所以说，时间戳是一份能够表示一份数据在一个特定时间点已经存在的完整的可验证的数据。
## 15. 修改ElementUI的提示框默认样式
像elementUI的tooltip、popover这种渲染出来的元素都是在body下面一层，所以你在组件里面去加样式发现根本不生效，所以需要到App.vue里面去加
1. 给tooltip加上popper-class="tips"自定义样式
2. 改变边框为灰色

```css
.el-tooltip__popper.is-light.tips{
  border 1px solid #eee
}
//改变边框，宽度，文字换行
.el-tooltip__popper.is-light.tooltipStyle{
  border 1px solid #eee
  width 80px
  word-break break-all
}
```
## 16. 控制台报错：@babel/polyfill is loaded more than once on this page.

前端控制台报错
```
@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended and may have consequences if different versions of the polyfills are applied sequentially. If you do need to load the polyfill more than once, use @babel/polyfill/noConflict instead to bypass the warning.
```
问题是：`@babel/polyfill` 在页面中加载多次，如果不同版本的`polyfill`应用可能是不可取的，并可能有后果。
如果你需要多次加载`polyfill`，使用`@babel/polyfill/noConflict`来绕过警告。

这个警告出现在`node_modules\@babel\polyfill\browser.js`

解决方案：在`main.js`中将`import '@babel/polyfill`改成`import '@babel/polyfill/noConflict'`即可。
## 17. 控制台报错：[Violation] Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive.
在基于 Element-ui 写项目的时候，Chrome 提醒：
```
[Violation] Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive.
```
翻译过来如下：
【违反】没有添加被动事件监听器来阻止'mousewheel'事件，请考虑添加事件管理者'passive'，以使页面更加流畅。

原因是 Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners；

Passive Event Listeners：就是告诉前页面内的事件监听器内部是否会调用preventDefault函数来阻止事件的默认行为，以便浏览器根据这个信息更好地做出决策来优化页面性能。当属性passive的值为true的时候，代表该监听器内部不会调用preventDefault函数来阻止默认滑动行为，Chrome浏览器称这类型的监听器为被动（passive）监听器。目前Chrome主要利用该特性来优化页面的滑动性能，所以Passive Event Listeners特性当前仅支持mousewheel/touch相关事件。

解决：
1. npm i default-passive-events -S
2. main.js中加入：import 'default-passive-events'
但是由于导入`default-passive-events`引入更多的报错，故没采用。
## 18. 详解如何修改el-select的样式：popper-append-to-body和popper-class
网上有很多关于这个的解决方式：

1. 找到下拉框的类名，写个全局样式覆盖掉就行了
2. 修改.el-select-dropdown__item的样式
3. 通过官网提供的popper-class进行样式修改

然而，上面的方法并没有说到点子上，覆盖全局样式的方法肯定不友好，修改样式和添加类也都不起作用。于是，我看了下下拉框的样式，它并没有在`el-select`里面，而是放在了最外层。

`popper-append-to-body`属性可以控制它,默认是true，改成false就可以起作用
```html
<el-select
    :popper-append-to-body="false"
    v-model="taskType"
    placeholder="请选择"
    size="mini"
    class="select-style"
    popper-class="select-popper"
  >
    <el-option
      v-for="(item,index) in taskTypes"
      :key="index"
      :value="item.value"
      :label="item.label"
    ></el-option>
  </el-select>
```
其实，这个只是改了下拉框里面的样式，输入框的样式还需要通过修改.el-input__inner样式：
```css
.select-style {
    width: 3rem;
    margin-right: 0.36rem;
    /deep/.el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border: 1px solid #a1a3ad;
      border-left-width: 0;
      background-color: rgba(0, 0, 0, 0.8);
      font-family: PingFangSC-Regular;
      font-size: 0.28rem;
      color: rgba(255, 255, 255, 0.6);
    }
  }
```
最后，附上.select-popper的样式：
```css
/deep/.select-popper {
    background-color: $item-bg-color;
    border-radius: 0.08rem;
    border: solid 0.02rem #1c395d;
    font-family: PingFangSC-Regular;
    .el-select-dropdown__item.selected {
      font-family: PingFangSC-Regular;
      font-size: 0.28rem;
      color: rgba(74, 141, 253, 1);
    }
    li {
      color: #fff;
      background: transparent;
      color: #fff;
      font-size: 0.28rem;
    }
    .el-select-dropdown__item:hover,
    .el-select-dropdown__item.hover {
      background-color: rgba(110, 147, 206, 0.2);
      margin-right: 1px;
    }
    .popper__arrow::after {
      border-bottom-color: $item-bg-color;
    }
    .popper__arrow {
      border-bottom-color: $item-bg-color;
    }
    .el-select-dropdown__empty {
      padding: 0.2rem;
      font-size: 0.28rem;
    }
  }
```
关键点：:popper-append-to-body="false"，然后添加popper-class进行样式修改。
## 19. 导入js-base64后，终端提示找不到Base

```javascript
$ npm install --save js-base64
```
If you are using it on ES6 transpilers, you may also need:
如果你在ES6用它需要转化，你可能还需要:
```javascript
$ npm install --save babel-preset-env
```
Note `js-base64` itself is stand-alone so its `package.json` has no `dependencies`.  However, it is also tested on ES6 environment so `"babel-preset-env": "^1.7.0"` is on `devDependencies`.
注意`js-base64`本身是独立的，所以它的`package.json`没有`dependencies`。
不过，它也在`ES6`环境下测试过，所以`"babel-preset-env": "^1.7.0"`在`devDependencies`上。
## 20.js点击按钮滚动跳转定位到页面指定位置
- 我们要点击实现跳转的地方是一个`html`锚点，也就是点击一个`a`标签超链接实现跳转，可以把`a`标签的`href`属性直接指向跳转指定位置的`div`
```html
<a href="#abc">点击跳转</a>
<div id="abc">将要跳转到这里</div>
```
- 点击实现跳转的地方是一个button按钮的话，由于button不能添加href，所以我们只好使用js跳转代码来实现
```
    <script>
    function onTopClick() {
         window.location.hash = "#abc";
       }
    </script>
    <input  type="button" name="Submit" value="提交"  onclick="javascript:onTopClick();" />
    <div id="abc">跳转到的位置</div>
```
- scrollToView()跳转指定位置
在按钮位置添加`οnclick="scrollToView()"`
```
<button onclick="scrollToView()"></button>
```
之后添加`scrollToView()`，要跳转的目标地址的元素`id`执行该方法即可。
```
<script type="text/javascript">
    function scrollToView () {
        document.getElementById('id').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
        })
    }
</script>
```

scrollToView 属性|作用
--|--
block|定义垂直方向的对齐："start", "center", "end", 或 "nearest"
inline|定义水平方向的对齐："start", "center", "end", 或 "nearest"
behavior|动画的过渡效果："auto"或 "smooth"
alignToTop|true:元素的顶端将和其所在滚动区的可视区域的顶端对齐。相应的 scrollIntoViewOptions: {block: "start", inline: "nearest"}。false:元素的底端将和其所在滚动区的可视区域的底端对齐。相应的scrollIntoViewOptions: {block: "end", inline: "nearest"}。
## 21.vuecli3中htmlWebpackPlugin报ReferenceError: BASE_URL is not defined的错误
```
<head>   

<link rel="icon" href="<%= BASE_URL %>favicon.ico"> // 这里BASE_URL报错
</head>

config.plugins.push(
      new HtmlWebpackPlugin({
        template: ‘./public/index.html‘,
        inject: true,
        hash: new Date().getTime(),
        url: BASE_URL,  //需要这里传参
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: ‘manual‘
      })
    )
    
<head>   

<link rel="icon" href="<%= htmlWebpackPlugin.options.url %>favicon.ico"> //改成这种就ok了
</head>
```
## 22.如何动态创建iframe及释放内存？
```js
/**
 * 动态创建iframe
 * @param dom 创建iframe的容器，即在dom中创建iframe。dom能够是div、span或者其它标签。
 * @param src iframe中打开的网页路径
 * @param onload iframe载入完后触发该事件。能够为空
 * @return 返回创建的iframe对象
*/
function createIframe(dom, src, onload){
	//在document中创建iframe
	var iframe = document.createElement("iframe");
	
	//设置iframe的样式
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.margin = '0';
	iframe.style.padding = '0';
	iframe.style.overflow = 'hidden';
	iframe.style.border = 'none';
	
	//绑定iframe的onload事件
	if(onload && Object.prototype.toString.call(onload) === '[object Function]'){
		if(iframe.attachEvent){
			iframe.attachEvent('onload', onload);
		}else if(iframe.addEventListener){
			iframe.addEventListener('load', onload);
		}else{
			iframe.onload = onload;
		}
	}
	
	iframe.src = src;
	//把iframe载入到dom以下
	dom.appendChild(iframe);
	return iframe;
}
```
```js
/**
 * 销毁iframe，释放iframe所占用的内存。

 * @param iframe 须要销毁的iframe对象
*/
function destroyIframe(iframe){
	//把iframe指向空白页面，这样能够释放大部分内存。
	iframe.src = 'about:blank';
	try{
		iframe.contentWindow.document.write('');
		iframe.contentWindow.document.clear();
	}catch(e){}
	//把iframe从页面移除
	iframe.parentNode.removeChild(iframe);
}
```
## 23.H5中video标签的poster无法自适应video大小？
做H5视频播放，`video`标签设置`poster`属性后，图片无法自适应`video`大小

最后给`video`标签设置，解决该问题
```css
width: 100%; height: 100%; object-fit: fill
```
## 24.element的弹出框popover如何精准匹配？
错误代码：
```html
<span  v-popover:popover-fun>
  <font-awesome-icon :icon="['file', iconList[node.level]]" size="xs" />
  <span> {{ node.label }}</span>
</span>
```
自定义指令`v-popover`指向 `Popover` 的索引`ref`会导致遍历的左侧树无法精准匹配到数组中的对应项。

采用具名插槽`slot="reference"`完美解决。
## 25.vue-router路由中的参数如何可传可不传？
当我们写一个页面时，有时候不需要传递参数，那如何做出可传可不传呢？

由于项目需求会遇到进入某个页面获取模默认信息，但有时需要传递一个id获取对应的信息，为了兼容同一个页面的路由的参数，可传可不传，可以针对路由做以下处理:
```js
{
    path: '/index/:id?', //获取参数：this.$route.params.id 
    name: 'index', 
    component: Index
}
```
## 26.数组对象如何查找对象并删除？
当数组中查找某个值并删除之很简单。
假如数组对象中查找某个对象并删除之，那要怎么做呢？
```js
deleteItem(array, item) {
      const index = array.findIndex(text => text.id === item.id);
      array.splice(index, 1);
      return array;
    },
```
该方法接受两个参数：第一个是原数组，第二个是要删除的对象，返回删除后的数组。
## 27. 父组件传入element中的选择框的值时，选择框显示value而不是label？
1. 经调试发现，当接口拿到的值是字符串类型，格式不正确，从父组件传入子组件的el-select中，选择框绑定的是数字类型，所以发生问题。
只需要`Number`改下即可：
```
this.readValue = '1' // 此处可以替换成接口读取的内容
this.form.select = Number(this.readValue) // 通过Number将类型转换
```
2. 反之，接口拿到数字类型，但是选择框绑定的是字符串类型。
```
this.readValue = 1 // 此处可以替换成接口读取的内容
this.form.select = String(this.readValue) // 通过Number将类型转换
```
## 28. js对象与字符串如何相互转换?
1. 对象转字符串
```js
p={name:'qfh',age:24}
// {name: "qfh", age: 24}
p1=JSON.stringify(p)
// "{"name":"qfh","age":24}"
```
2. 字符串转对象
```js
a=JSON.parse(p1)
{name: "qfh", age: 24}
```
## 29.npm如何切换成阿里源？
阿里在国内搭建了镜像服务器:http://npm.taobao.org 

需要执行以下命令更改:
```
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```
更改完成

使用命令查看本地镜像源
```
npm config get registry
```
## 30.vue如何修改多层嵌套数据使页面重新渲染？
采用的这种方式可能不起作用，虽然打开控制台发现data值发生了变化，但是没有渲染到页面上。其实是因为数据层次太多，没有触发render函数进行自动更新。
```js
this.$set(this.data[id],"newPro",true);
```
需手动调用
```js
this.$forceUpdate();
```
## 31.vue中如何全局使用moment.js?
moment是时间库，可以方便任何时间格式的转化。
1. 安装
```
npm install moment -D
main.js 引入moment
```
2. 定义全局 时间过滤器
```js
import Moment from 'moment';
Vue.filter('comverTime',function(data,format){
  return Moment(data).format(format);
});
```
3. vue组件中使用 定义的 comverTime 过滤器
```html
　　<p>{{Time | comverTime('MMMM Do YYYY, h:mm:ss a')}}</p>
<!-- 五月 6日 2020, 8:46:21 晚上 -->
　　<p>{{Time | comverTime('YYYY-MM-DD HH:mm:ss')}}</p>
<!-- "2020-05-06 20:48:25" -->
```
## 32.如何判断某值等于NaN?
聪明的你会发现
```js
NaN==NaN
// false
NaN===NaN
// false
```
在ECMAScript 6中, 有一个Number.isNaN() 方法提供可靠的NaN值检测，只有在参数是真正的NaN时，才会返回true。

判断如下
```js
Number.isNaN(NaN)
// true
Number.isNaN({})
// false
Number.isNaN([])
// false
Number.isNaN(Math.log(-2))
// true
```
## 33.项目报错less--Module build failed: TypeError: loaderContext.getResolve is not a function？
这是因为less版本太高，只要将less卸载后装一个低版本的就解决了。
```
npm uninstall less-loader
npm install less-loader@4.1.0 --save
```
## 34.elementui中label标签添加自定义图标
```vue
   <el-form-item >
            <span slot="label">
              <span class="span-box">
                <i class="el-icon-question"></i>
                <el-tooltip content="这是个问号"></el-tooltip>
                <span>问题：</span>
              </span>
            </span>
  </el-form-item >
```
加一个`slot`，在其下添加自定义图标。
## 35. this.$router.push的两种方式

清理`/#/`后面的`url`，加上`/${this.id}/result`
```
this.$router.push(`/${this.id}/result`)
```
不清除`/#/`后面的`url`，`/${this.id}/result`跟在`url`后面
```
this.$router.push(`${this.id}/result`)
```
## 36.node-sass包安装失败
可以切换淘宝镜像试一下
```
set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
npm install node-sass
```
下载速度非常快，毕竟从国外源换到了国内。
## 参考文献
[iframe高度自适应的6个方法](http://caibaojian.com/iframe-adjust-content-height.html)
[ElementUI的提示框的使用记录](https://www.cnblogs.com/goloving/p/9195412.html)
[Element.scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)