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
### vue源码局部观-依赖收集
1. 初始化vue的时候，会将data进行observe，注册get方法。在他的闭包中会有一个Dep对象，这个对象存储一个个watcher对象的实例；
2. get方法会调用addSub方法让每一个watcher对象存放到Dep的subs中；
3. 在data发生变化时，set方法会调用Dep对象的notify方法通知其内部所有的watcher实例进行视图更新。
### vue源码局部观-virtual dom的原理
虚拟dom其实就是一个JavaScript对象
用JavaScript属性来描述节点的属性
阅读[一起理解 Virtual DOM]https://www.jianshu.com/p/bef1c1ee5a0e

### vue源码局部观-diff算法原理
涉及到了 `patch` 机制
新旧节点进行比对，复杂度为O(n)，是较快的一种比对方式。
- patch()方法
判断新老节点，分为三种情况：
老节点不存在，添加新节点；
新节点不存在，删除老节点；
两个节点都存在，情况又分为两种：
如果新老节点相同，进行patchVnode()
如果不相同，删除老节点，添加新节点。
- patchVnode()方法
1. 当新老节点相同时，不用比较
2. 当新老节点都是静态的，并且key相同，把老节点的componentInstance赋值给新节点。
3. 当新节点是文本节点的时候，直接用setTextContent来设置文本。
4. 当新节点非文本节点，分为以下几种情况：
• oldCh与ch都存在且不相同，使用updateChildren来更新子节点
• 只有ch存在，老节点是文本节点，将elm下的文本内容删除，将ch插入elm下
• 只有oldch存在，将老节点删除
• 老节点是文本节点，清除文本节点。
- updateChildren方法
oldStartIdx:老节点开始索引
newStartIdx:新节点开始索引
oldEndIdx老节点结束索引
newEndIdx新节点结束索引
oldStartVnode老节点相应索引下的VNode节点
newStartVnode新节点相应索引下的VNode节点
oldEndVnode老节点相应索引下的VNode节点
newEndVnode老节点相应索引下的VNode节点

进行一个while循环，oldStartIdx、newStartIdx、oldEndIdx和newEndIdx会逐渐向中间靠拢。


### vue源码局部观-template模板转化为render function的原理
也就是 `compile` 过程，分为三部分：
1. parse
2. optimize
3. generate
`parse` 主要作用：将 `template` 模板通过正则模板进行字符串解析，转化为可以用 `js` 对象描述的 `AST` 树
`optimise` 主要作用：标记出静态节点，增加 `static` 属性
`generate` 主要作用：将 `AST` 转化为 `render function` 字符串
### vue源码局部观-nexttick原理
watch中有两个方法，分别是update和run
当data中的某个对象一直更新的时候，一直触发update方法，在下一次啊tick来之后，触发run方法更新视图。

### vue源码局部观-vuex状态管理原理
Vue.use来安装vuex，
其内部调用install方法，install方法内部将vuexInit混淆进了beforeCreate钩子中去。
vueInit方法是将根组件或非根组件上的store挂载到vue上，
store实现响应式
commit将mutation的变动实现到store上；
dispatch将action的变动实现到store上。

## 《深入浅出vue.js》总结
### object的变化侦测
变化侦测就是侦测数据的变化。当数据发生变化时，要能侦测到并发出通知。

object可以通过object.defineProperty将属性转换成getter/setter的形式来追踪变化。读取数据时会触发getter，修改数据时会触发setter。

我们需要在getter中收集有哪些依赖使用数据。当setter被触发时，去通知getter中收集的依赖数据发生了变化。

收集依赖需要为依赖找一个存储依赖的地方，为此我们创建了dep，他用来收集依赖、删除依赖和向依赖发送消息等。

所谓的依赖，其实就是watcher。只有watcher触发的getter才会收集依赖，哪个watcher触发了getter，就把哪个watcher收集到dep中。当数据发生变化时，会循环依赖列表，把所有的watcher都通知一遍。

watcher的原理是先把自己设置到全局唯一的指定位置（例如window.target），然后读取数据。因为读取了数据，所以会触发这个数据的getter。接着，在getter中就会从全局唯一的那个位置读取当前正在读取数据的watcher，并把这个watcher收集到dep中去。通过这样的方式，watcher可以主动去订阅任意一个数据的变化。

此外，我们创建了observer类，他的作用是把一个object中的所有数据（包括子数据）都转换成响应式的，也就是它会侦测object中所有数据（包括子数据）的变化。

由于在es6之前javascript并没有提供元编程的能力，所以在对象上新增属性和删除属性都无法被追踪到。

data 通过 observer 转换成了 getter/setter 的形式来追踪变化。

当外界通过 watcher 读取数据时，会触发 getter 从而将 watcher 添加到依赖中。

当数据发生了变化时，会触发 setter，从而向 dep 中的依赖 watcher 发送通知。

watcher 接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，也有可能触发用户的某个回调函数等。

### array的变化侦测
array 追踪变化的方式和 object 不一样。因为它是通过方法来改变内容的，所以我们通过创建拦截器去覆盖数组原型的方式来追踪变化。

为了不污染全局array.prototype，我们在observer中只针对哪些需要侦测变化的数组使用__proto__来覆盖原型方法，但__proto__在es6之前并不是标准属性，不是所有浏览器都支持他。因此，针对不支持__proto__属性的浏览器，我们直接循环拦截器，把拦截器中的方法直接设置到数组身上来拦截array.prototype上的原生方法。

array收集依赖的方式和object一样，都是在getter中收集。但是由于使用依赖的位置不同，数组要在拦截器中向依赖发消息，所以依赖不能像object那样保存在defineReactive中，而是把依赖保存在了observer实例上。

在observer中，我们对每个侦测了变化的数据都标上印记__ob__，并把this(observer实例)保存在__ob__上。这主要有两个作用，一方面是为了标记数据是否被侦测了变化（保证同一个数据只被侦测一次），另一方面可以很方便地通过数据取到__ob__，从而拿到observer实例上保存的依赖。当拦截到数组发生变化时，向依赖发送通知。

除了侦测数组自身的变化外，数组中元素发生的变化也要侦测。我们在observer中判断如果当前被侦测的数据是数组，则调用observeArray方法将数组中的每一个元素都转换成响应式的并侦测变化。

除了侦测已有数据外，当用户使用push等方法向数组中新增数据时，新增的数据也要进行变化侦测。我们使用当前操作数组的方法来进行判断，如果是push、unshift和splice方法，则从参数中将新增数据提取出来，然后使用observeArray对新增数据进行变化侦测。

由于es6之前，js并没有提供元编程的能力，所以对于数组类型的数据，一些语法无法追踪到变化，只能拦截原型上的方法，而无法拦截数组特有的语法，例如使用length清空数组的操作就无法拦截。


