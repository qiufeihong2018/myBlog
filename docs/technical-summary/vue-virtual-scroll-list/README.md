## 大数据量优化性能
[[toc]]

### 背景

当数据量大的时候，我们渲染的列表/表格/表单在页面加载的时候会出现延迟，导致用户体验十分的差劲。
那么怎么解决呢？
我找到如下几个组件
- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
- [vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list)
- [vue-list](https://github.com/hejianxian/vue-list)
- [vue-recyclerview](https://github.com/hilongjw/vue-recyclerview)

测试过vue-virtual-scroller不可以用，原因按照官方的配置来无法实现。
vue-virtual-scroll-list可以用。
### 操作

#### 安装组件
```
npm i --save vue-virtual-scroll-list
```

```json
"vue-virtual-scroll-list": "^1.3.3",
```
#### 调用组件
```vue
          <VirtualList :size="52" :remain="5">
                  <div v-for="(item,key) in bottomRightData" :key="key">
                    <div class="title" @click="linkToAlarm(item, 'MONITOR')">{{item.title}} <a
                      v-if="item.probe">xxx：{{item.probe}}</a></div>
                    <p>{{item.timestamp|timeTrans}} <a v-if="item.src">aaa:{{item.src}}</a> <a v-if="item.dst">bbb:{{item.dst}}</a>
                    </p>
                    <hr color='#34343A' size="1">
                  </div>
          </VirtualList>                          
```
```vue
import VirtualList from 'vue-virtual-scroll-list'
```
```vue
 components: {
      VirtualList,
    },
```
#### 结果
数据总共有50来条，不会一次性渲染出来，而在dom中出现8条数据
![avatar](../public/vue-virtual-scroll-list1.png)

所以大大降低了浏览器的压力

### 碰到的问题
[remain出现的问题](https://github.com/tangbc/vue-virtual-scroll-list/issues/94)

### 参考文献
- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
- [vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list)
- [vue-list](https://github.com/hejianxian/vue-list)
- [vue-recyclerview](https://github.com/hilongjw/vue-recyclerview)
