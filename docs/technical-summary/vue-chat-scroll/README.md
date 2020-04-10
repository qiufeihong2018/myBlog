## 【vue】深入阅读vue-chat-scroll源码
插件github地址：(https://github.com/theomessin/vue-chat-scroll)[https://github.com/theomessin/vue-chat-scroll]

## 是什么?
是自动滚动到底部的`Vue`指令。一个`Vue.js 2`的插件，当在元素中添加新内容时滚动到元素的底部。
## 怎么用?
除了安装之外，在`JavaScript`中不需要做任何事情。要使用这个插件，只需使用`v-chat-scroll`指令。
```html
<ul class="messages" v-chat-scroll>
  <li class="message" v-for="n in messages">{{ n }}</li>
</ul>
```
防止向下滚动时，用户已经滚动和平滑滚动交替，你可以传递一个配置值给指令:
```
<ul class="messages" v-chat-scroll="{always: false, smooth: true}">
  <li class="message" v-for="n in messages">{{ n }}</li>
</ul>
```
在聊天窗口滚动与消失的元素
如果您有一个“正在加载”的动画，当您从外部源接收到一条消息时它就消失了，那么使用`scrollonremove`选项来确保在元素被删除后滚动仍然会发生
```html
<ul class="messages" v-chat-scroll="{always: false, smooth: true, scrollonremoved:true}">
  <li class="message" v-for="n in messages">{{ n }}</li>
  <li v-if="loading">&bull;&bull;&bull;</li>
</ul>
```
如果你想避免在这种情况下有平滑的滚动(所以它会在加载后立即滚动到底部)，但是在新消息到来时保持它，使用`smoothonremove`设置为`false`，同时可以为以后的消息保持平滑设置为`true`。
```html
<ul class="messages" v-chat-scroll="{always: false, smooth: true, scrollonremoved:true, smoothonremoved: false}">
  <li class="message" v-for="n in messages">{{ n }}</li>
  <li v-if="loading">&bull;&bull;&bull;</li>
</ul>
```
此选项仅在`scrollonremove`设置为true时适用。当未定义行为时，默认为平滑属性。

