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
13.iframe border去不掉
el-dropdown command命令携带参数：vue element-ui框架 el-dropdown-menu 绑定click事件
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
未完待续