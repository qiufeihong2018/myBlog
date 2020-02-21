# 工作中遇到的vue问题和处理清单

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
## 参考文献
[iframe高度自适应的6个方法](http://caibaojian.com/iframe-adjust-content-height.html)