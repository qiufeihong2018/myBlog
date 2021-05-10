# 性能优化小记
## webpack性能优化
HTTP 优化有两个大的方向：
• 减少请求次数
• 减少单次请求所花费的时间
webpack优化瓶颈两个方面：
• webpack 构建过程太花时间
• webpack打包结果体积太大
• 构建过程提速
1. 让loader干更少的事情
用exclude和include区分打包的内容，按需打包。例如想node_modules文件夹就可以不用打包进去
2. 不放过第三方库
处理第三方库如node_modules DllPlugin插件可以解决重复打包和效率问题。
DllPlugin是基于windows动态链接库的思想被创作出来的。会将第三方库单独打包到一个文件中。这个依赖库不会跟着业务代码一起重新打包，只有当以来自身发生版本变化时才会重新打包。
3. happyPack将loader由单进程转化为多进程
webpack是单进程的，按照排序一个个执行任务。happyPack将任务分解给多个子进程去执行
• 构建结果体积压缩
1. 文件解构可视化，找出导致体积过大的原因
webpack-bundle-analyzer
2. 拆分资源
DllPlugin
3. 删除冗余代码
4. 按需加载
require.ensure(dependencies,callback,chunkName)
## 图片优化
寻求图片质量和性能的平衡点
图片方案选型如下：
• JPEG/JPG
特点：有损压缩，体积小，加载快，不支持透明。
场景：适用于呈现色彩丰富的图片，作为背景图、轮播图或banner图
• PNG
特点：无损压缩，质量高，体积大，支持透明
场景：处理线条和颜色对比度方面的优势，呈现小的logo、颜色简单且对比强烈的图片或背景。
• WebP
特点：全能，兼容性差
场景：后端兼容性判断，浏览器支持则用
• Base64
特点：文本文件，依赖编码，体积大，对雪碧图的补充。
场景：适用于小图标
• SVG
特点：文本文件，体积小，不失真，兼容性好
• CSS Sprites
特点：减少请求图片次数，将多图放于一图上，css背景位置去定位。
## 浏览器运行机制
css-》cssom+html=》dom=render tree
css是阻塞的，所以css需要放在header标签里，先加载。如果放在body后面，那么网页混乱不堪。
然而js有无对页面其实没有多大关系，无js的页面是静态的，有js变成了动态而已。所以js虽然是阻塞的，但是他可以放在任何地方。
这里就要提一提js异步了，如果甲方爸爸想要高性能，那么加载js必须要异步。
• 放在css和html渲染之后：当渲染完成后，加载并执行js
• async：异步加载js，一边渲染一边执行
• defer：异步加载js，等页面渲染完成后，加载并执行js
## 本地存储
1. cookie
奔波于浏览器和服务器之间的文本文件，记录某些信息，存储大小不超过4kb，超过删除。
2. webstorage
其包括sessionStorage和localStorage
- sessionStorage：存储当前会话的信息，关闭当前会话，存储消失，同一浏览器不同页面无法共享数据，存储大小不超过5mb左右。
- localStorage：存储不会消失，可以共享数据，存储大小不超过5mb。
indexDB
存储大小不受限制，永远不会删除存储。
## 浏览器缓存
merroy cache
disk cache
http cache
service worker cache
push cache
### 总结
1. 命中强缓存，使用缓存
2. 没有命中，向服务器发送命令检查是否命中协商缓存
3. 如果命中，返回304，使用浏览器缓存
4. 否则，返回最新资源。

看了 example 中的 cache 项目就明白了浏览器缓存了。
## performance lighthouse
- performance：提供网页的可视化性能分析报告
- lighthouse：提供网页的性能优化分析报告
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

## 服务端渲染
定义
代码在服务器中编译成html页面返回，浏览器请求拿到页面直接渲染
解决的问题
• 网站seo：方便搜索引擎爬到
• 首页加载慢

## 首屏优化-懒加载
用户点开页面的瞬间，呈现给他的只有屏幕的一部分，只要我们将首屏的图片资源加载出来，用户就不会觉得有问题。至于下面的图片，我们可以等用户下来的瞬间再及时去请求、及时呈现给用户。性能压力小了，用户体验却没有变差。

## 事件的节流和防抖
- 节流
第一个人说了算
```js
        // 事件节流
        function throttle(fn, interval) {
            let time = 0
            return function () {
                let _t = this
                let arg = arguments
                let now = new Date()
                if (now - time > interval) {
                    time = now
                    fn.apply(_t, arg)
                }
            }
        }
        const scrollFn = throttle(lazyload, 1000)
        window.addEventListener('scroll', scrollFn);
```
- 防抖
最后一个人说了算
```js
        // 事件防抖
        function debounce(fn, delay) {
            let timer = null
            return function () {
                let _t = this
                let arg = arguments
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(() => {
                    fn.apply(_t, arg)
                }, delay);
            }
        }
        const scrollFn = debounce(lazyload, 1000)
        window.addEventListener('scroll', scrollFn)
```
- 用throttle优化debounce
```js
               // fn是我们需要包装的事件回调, delay是时间间隔的阈值
        function throttle(fn, delay) {
            // last为上一次触发回调的时间, timer是定时器
            let last = 0,
                timer = null
            // 将throttle处理结果当作函数返回

            return function () {
                // 保留调用时的this上下文
                let context = this
                // 保留调用时传入的参数
                let args = arguments
                // 记录本次触发回调的时间
                let now = +new Date()

                // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
                if (now - last < delay) {
                    // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
                    clearTimeout(timer)
                    timer = setTimeout(function () {
                        last = now
                        fn.apply(context, args)
                    }, delay)
                } else {
                    // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
                    last = now
                    fn.apply(context, args)
                }
            }
        }

        // 用新的throttle包装scroll的回调
        const scrollFn = throttle(lazyload, 1000)

        document.addEventListener('scroll', scrollFn)
```

example 中的 lazyLoad 项目