# vue源码系列
## 《剖析 Vue.js 内部运行机制》有感
### vue源码全局观
vue实例化后，将所有代码$mount进行挂载，然后进行compile()编译，具体分为三步：1.parse：将所有模板代码转化为ast语法树；2.optimize：标记处所有静态节点，优点是剔除掉后方便后续更新节点，毕竟没必要浪费多余的内存在过滤和查找中；3.generate：生成render 函数。
生成的render函数渲染出虚拟dom树，
响应式原理来了：watcher函数用getter方法将所有依赖收集。当数据发生改变，setter方法通知watcher依赖中的对象。
然后watcher触发update方法，更改虚拟dom中的数据，patchnode将虚拟dom树和真实dom对比进行修改。

### vue源码局部观-响应式原理
首先要了解什么是响应式。
此响应式不是页面中的响应式布局，不是适配所有屏幕的意思。就是一个网站能够兼容多个终端——而不是为每个终端做一个特定的版本。响应式布局为解决移动互联网浏览而诞生的。
在搞vue和react这类项目的时候，您肯定会想：为什么我改变javascript，网页中的视图也变了，这是怎么做到的呢？
答案就是应用了响应式。
## 《深入浅出vue.js》总结
### object的变化侦测
变化侦测就是侦测数据的变化。当数据发生变化时，要能侦测到并发出通知。

object可以通过object.defineProperty将属性转换成getter/setter的形式来追踪变化。读取数据时会触发getter，修改数据时会触发setter。

我们需要在getter中收集有哪些依赖使用数据。当setter被触发时，去通知getter中收集的依赖数据发生了变化。

收集依赖需要为依赖找一个存储依赖的地方，为此我们创建了dep，他用来收集依赖、删除依赖和向依赖发送消息等。

所谓的依赖，其实就是watcher。只有watcher触发的getter才会收集依赖，哪个watcher触发了getter，就把哪个watcher收集到dep中。当数据发生变化时，会循环依赖列表，把所有的watcher都通知一遍。

watcher的原理是先把自己设置到全局唯一的指定位置（例如window.target），然后读取数据。因为读取了数据，所以会触发这个数据的getter。接着，在getter中就会从全局唯一的那个位置读取当前正在读取数据的watcher，并把这个watcher收集到dep中去。通过这样的方式，watcher可以主动去订阅任意一个数据的变化。

此外，我们创建了observer类，他的作用是把一个object中的所有数据（包括子数据）都转换成响应式的，也就是它会侦测object中所有数据（包括子数据）的变化。



