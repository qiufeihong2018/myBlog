# 《深入浅出vue.js》总结
## object的变化侦测
变化侦测就是侦测数据的变化。当数据发生变化时，要能侦测到并发出通知。

object可以通过object.defineProperty将属性转换成getter/setter的形式来追踪变化。读取数据时会触发getter，修改数据时会触发setter。

我们需要在getter中收集有哪些依赖使用数据。当setter被触发时，去通知getter中收集的依赖数据发生了变化。

收集依赖需要为依赖找一个存储依赖的地方，为此我们创建了dep，他用来收集依赖、删除依赖和向依赖发送消息等。