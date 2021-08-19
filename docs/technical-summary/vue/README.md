# vue
## You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build. (found in )
当 `vue` 脚手架从 `2.0` 版本切换到 `3.0` 时，出现了上述问题。
### 原因
`vue` 有两种形式的代码 `compiler`（模板）模式和 `runtime` 模式（运行时），`vue` 模块的 `package.json` 的 `main` 字段默认为 `runtime` 模式， 指向了"`dist/vue.runtime.common.js`"位置。

这是 `vue` 升级到 `2.0` 之后就有的特点。

而我的 `main.js` 文件中，初始化 `vue` 却是这么写的，这种形式为 `compiler` 模式的，所以就会出现上面的错误信息。
```js
// compiler
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
})

```
解决办法
将 `main.js` 中的代码修改如下就可以
```js
//runtime

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
```
到这里我们的问题还没完，那为什么之前是没问题的，之前 `vue` 版本也是 `2.x` 呀？

这也是我要说的第二种解决办法

因为之前我们的 `webpack` 配置文件里有个别名配置，具体如下
```js
resolve: {
    alias: {
        'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
    }
}
```
也就是说，`import Vue from 'vue'` 这行代码被解析为 `import Vue from 'vue/dist/vue.esm.js'`，直接指定了文件的位置，没有使用 `main` 字段默认的文件位置

所以第二种解决方法就是，在 `vue.config.js` 文件里加上 `webpack` 的如下配置即可，
```js
configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' 
      }
    }
```
既然到了这里我想很多人也会想到第三中解决方法，那就是在引用 `vue` 时，直接写成如下即可
```js
import Vue from 'vue/dist/vue.esm.js'
```
## 插槽中事件中的参数不动态刷新
在插槽中的子组件上绑定事件不要传参，
由于组件复用，所以事件中的参数永远是最新的子组件的参数。

如果 `a` 插槽是一个 `for` 循环的插槽，内部组件传入的参数永远是最新的那一条数据，不会动态刷新。

如：
错误写法：
```html
<div slot="a" slot-scope="scope">
<child-component @event="handleEvent(scope)"></child-component>
</div>
```
正确写法：
```html
<div slot="a" slot-scope="scope">
<child-component @event="handleEvent"></child-component>
</div>
```
在 `handleEvent` 中传入每个子组件中应该收到的对象。

## 在Vue中使用websocket实时通信
websocket全局配置
```js
export default {
    ws: {},
    delay: 1500,
    setWs: function (newWs) {
        this.ws = newWs
    },
    setDelay: function (newDelay) {
        this.delay = newDelay
    },
    sendMsg: function (msg) {
        this.ws.send(JSON.stringify(msg))
    }
}
```

在main.js中全局挂载
```js
import socket from '@/utils/socket'

Vue.prototype.$socket = socket
```

vue页面中使用
```js
      createSocket() {
        let _t = this
        if ('WebSocket' in window) {
          console.log('您的浏览器支持 webSocket')
          _t.ws = new WebSocket('ws://127.0.0.1:8849')
          _t.$socket.setWs(_t.ws)
          _t.ws.onopen = () => {
            console.log('打开')
            // 发送消息
            if (_t.$socket.ws && _t.$socket.ws.readyState === 1) {
              _t.$socket.sendMsg(`xxx`)
            }
          }
          _t.ws.onerror = () => {
            console.log('连接出错')
            // 延迟重连
            setTimeout(() => {
              _t.createSocket()
            }, _t.$socket.delay);
          }
          _t.ws.onclose = () => {
            console.log('连接关闭')
            // 延迟重连
            setTimeout(() => {
              _t.createSocket()
            }, _t.$socket.delay);
          }
          _t.ws.onmessage = (res) => {
            _t.logVal.push(res.data)
            console.log('收到信息：', res.data)
          }
        } else {
          console.log('您的浏览器不支持 webSocket')
        }
      },
```
### 心跳机制

为了保证连接一直正常，需要加入心跳机制，以保证后端可以实时知道当前连接状态。具体操作：前端会每隔一段时间发送请求到后端。

```js
keepAlive() {
    let that = this;
    setTimeout(() => {
        //判断当前webscokt状态
        if (that.$socket.ws.readyState == 1) {
            console.log('发送keepalve')
            //调用发送方法
            that.$socket.sendMsg({
                "type": "keepAlive"
            })
            that.keepAlive()
        }
    }, 1000);
}
```
在this.ws.onopen事件中调用心跳方法。


在其他路由页面中

直接调用onmessage方法

```js
eventMsg() {
    this.$socket.ws.onmessage = function (res) {
        //处理接收的数据
    }
}
```


用来测试websocket的网页`http://www.websocket-test.com/`

## 参考文献
[You are using the runtime-only build of Vue where the template compiler is not available.](https://blog.csdn.net/wxl1555/article/details/83187647)


