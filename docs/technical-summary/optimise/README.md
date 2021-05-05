# 性能优化小记
## 浏览器运行机制
css-》cssom+html=》dom=render tree
css是阻塞的，所以css需要放在header标签里，先加载。如果放在body后面，那么网页混乱不堪。
然而js有无对页面其实没有多大关系，无js的页面是静态的，有js变成了动态而已。所以js虽然是阻塞的，但是他可以放在任何地方。
这里就要提一提js异步了，如果甲方爸爸想要高性能，那么加载js必须要异步。
• 放在css和html渲染之后：当渲染完成后，加载并执行js
• async：异步加载js，一边渲染一边执行
• defer：异步加载js，等页面渲染完成后，加载并执行js
## dom优化原理
有句名言形容dom和js的关系很是贴切：把 DOM 和 JavaScript 各自想象成一个岛屿，它们之间用收费桥梁连接。——《高性能 JavaScript》
回流：改变了dom的几何属性，如长宽高等，性能消耗很大
重绘：改变了dom的基本属性，如颜色和大小等，性能小号没有回流来得大
优化方式：尽量不要造成dom回流和重绘。但是js不仅仅是去访问dom，更多的时候修改dom，所以尽可能将操作都在js中完成，将js处理后的结果交给dom。

## eventloop和nextTick原理
事件循环是js中最重要的内容和组成部分。
其中事件分为宏任务（macrotask）和微任务（microtask）。
所有的事件进来都分别被塞进宏任务队列和微任务队列中。
事件循环的执行顺序：
1.从宏任务队列中出队一个宏任务，去执行。
2.执行完毕后，将所有产生的微任务按照队列先进先出的原则执行。
3.都执行完后，渲染dom树。
4.执行web worker。
5.按照1-4循环执行
nextTick原理
重点在于将所有的事件都变为异步执行，都执行完后去渲染。


解决重绘和回流的性能问题
众所周知，网站每时每刻都在处于重绘和回流的工作中，重绘和回流会对浏览器造成的性能问题往往也是很多同学头疼的问题，所以怎么解决重绘和回流的性能问题成了同学们亟待解决的课程。
方法有如下几种：
1.用变量缓存样式计算
```js
let dom = document.getElementById('contanier')
for(let i=0;i<1000;i++){
  dom.style.height='10px'+i*10
}
```
如果这样计算，没经过一次循环，浏览器就要经过一次重绘。有没有更好的办法呢：
```js
let dom = document.getElementById('contanier')
let domHeight='10px'
for(let i=0;i<1000;i++){
  domHeight+=i*10
}
dom.style.height=domHeight
```
2.用样式类包裹一次替换
```js
let dom = document.getElementById('contanier')
dom.style.height='100px'
dom.style.width='200px'
dom.style.margin='100px'
dom.style.background='#000'
dom.style.color='#fff'
```
这样写其实可以优化成如下：
```js
<style>
  .container{
    height:100px;
    width:200px;
    margin:100px;
    background:#000;
    color:#fff
  }
</style>
let dom = document.getElementById('contanier')
dom.classList.add('container')
```
3.dom离线
```js
let dom = document.getElementById('contanier')
dom.style.height='100px'
dom.style.width='200px'
dom.style.margin='100px'
dom.style.background='#000'
dom.style.color='#fff'
...此处省略1000个
```
这样的操作有方法降低性能消耗吗？
```js
let dom = document.getElementById('contanier')
dom.style.display='none'
dom.style.height='100px'
dom.style.width='200px'
dom.style.margin='100px'
dom.style.background='#000'
dom.style.color='#fff'
...此处省略1000个
dom.style.display='block'
```
拿掉和放回的操作性能消耗特别低。
4.浏览器的flush队列