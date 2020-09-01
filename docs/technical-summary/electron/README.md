## 【electron】这些electron的问题你会吗
### 1.Electron-vue ReferenceError: process is not defined
#### 背景
当你启动`electron-vue`项目时会遇到`process is not defined`。

#### 具体报错
```
    ReferenceError: process is not defined
  
  - index.ejs:11 eval
    [.]/[html-webpack-plugin]/lib/loader.js!./src/index.ejs:11:2
  
  - index.ejs:16 module.exports
    [.]/[html-webpack-plugin]/lib/loader.js!./src/index.ejs:16:3
  
  - index.js:284 
    [electron-demo]/[html-webpack-plugin]/index.js:284:18
  
  - runMicrotasks
  
  - task_queues.js:93 processTicksAndRejections
    internal/process/task_queues.js:93:5
```
查看这个[`issues`](https://github.com/SimulatedGREG/electron-vue/issues/871)https://github.com/SimulatedGREG/electron-vue/issues/871

#### 解决方法
在`webpack.web.config.js`和`webpack.renderer.config.js`中的`HtmlWebpackPlugin`中加入如下代码即可
```js
      // 模版需要的参数
      // https://github.com/jantimon/html-webpack-plugin/blob/master/examples/template-parameters/webpack.config.js
      templateParameters(compilation, assets, options) {
        return {
          // 编译
          compilation: compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options: options
          },
          process,
        };
      },
```

### 2.Electron入门应用打包exe（windows）
1. 安装打包工具，我是使用的`electron-packager`，首先全局安装一下：
```
npm install electron-packager -g
```
2. 打包前为当前`app`制作`icon：icon.ico`，`256*256`。制作好放入`app`根目录。
3. `electron-packager`打包：一是直接在命令行编辑命令，直接进行打包。另一种是在`package.json`里编辑`package`，执行`npm run package`。在package.json中添加命令行：
```
     "package": "electron-packager . demo --platform=win32 --arch=x64 --icon=icon.ico --out=./app --asar --app-version=0.0.1"
```
打包成功的话就是一下子的。

![avatar](./electron.png)

命令行打包参数：
```
electron-packager <location of project> <name of project> <platform> <architecture> <electron version> <optional options>
```
参数说明： 
* location of project：项目所在路径 
* name of project：打包的项目名字 
* platform：确定了你要构建哪个平台的应用（Windows、Mac 还是 Linux） 
* architecture：决定了使用 x86 还是 x64 还是两个架构都用 
* electron version：electron 的版本 
* optional options：可选选项
### 3.electron 如何打开开发者工具devtools
利用`electron`的`webContents`对象打开及关闭`devtools`。下面的例子中，我们都是基于`main.js`中的`createWindow`中的`mainWindow.webContents`进行操作的。

#### 打开devtools
```js
mainWindow.webContents.openDevTools()
```
默认状态下，开发者工具的位置是上一次工具打开的位置（左边，右边，下边都有可能。取决于上一次的状态，但不会是分离状态，也没有处于顶部的状态）
#### 界面右侧打开devtools
```js
mainWindow.webContents.openDevTools({mode:'right'})
```
#### 界面底部打开devtools
```js
mainWindow.webContents.openDevTools({mode:'bottom'})
```
#### 界面左侧打开devtools
```js
mainWindow.webContents.openDevTools({mode:'left'})
```
#### 分离状态打开devtools
```js
mainWindow.webContents.openDevTools({mode:'detach'})
mainWindow.webContents.openDevTools({mode:'undocked'})
```
这两种情况下，`devtools`都是不和·的界面在一起的，都是分离状态。但是 `undocked` 状态下，这个开发者工具是可以合并到主界面中的。`detach`状态下，是永久分离的。这个就是两者的区别，注意看图标箭头所示位置。
#### 关闭devtools
```js
mainWindow.webContents.closeDevTools()
```
### 4.在electron中使用monaco找不到该包
当找不到`monaco`包时，报这个错误：
```js    
throw new Error('Electron failed to install correctly, please delete node_modules/electron and try installing again')
```
经测试发现，`monaco`必须要安装在
`devDependencies`。

否则会提示找不到monaco-edit的包。

安装命令：
```
npm install electron --save-dev
```

### 5.electron-vue无法改变vuex状态
`vuex-electron` 的文档里说了：
```
In case if you enabled createSharedMutations() plugin you need to create an instance of store in the main process. To do it just add this line into your main process (for example src/main.js):
import './path/to/your/store'
```
在主进程加上这一句就行了：
```js
import '../renderer/store'
```
重启即可，亲测成功！

### 6.electron-vue中无法使用Element的Tooltip组件
查看[https://github.com/SimulatedGREG/electron-vue/issues/361](
https://github.com/SimulatedGREG/electron-vue/issues/361)这个issue中给了答案。

作者写道：
```
I know from past experience when working with element-ui, it always helps to use the latest versions of both vue and element-ui, especially when updating. The element-ui team is pretty great at always taking advantage of new vue changes, but not necessarily always paying attention to backwards compatibility.
```
打开文件： `electron-vue/webpack.renderer.config.js`。

在大约 `21` 行左右找到 `let whiteListedModules` 将 `element-ui` 添加进去，`let whiteListedModules = ['vue', 'element-ui']`。

### 7.Electron无边框窗口中自定义最小化、最大化、关闭
首先在`windowOperate.vue`页面中写入三个按钮，并将事件绑定
```js
   // 从渲染器进程到主进程的异步通信。
    // 使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主进程。
    const {
      ipcRenderer
    } = require('electron')

...

        onMinusSm () {
          ipcRenderer.send('min')
        },
        onRectangle () {
          ipcRenderer.send('max')
        },
        onCross () {
          ipcRenderer.send('window-close')
        }
```
上面三个方法的意思是：给主进程发送同步消息，触发特定的事件。`onMinusSm` 方法中 `ipcRenderer` 发送 `min` 事件，主进程就可以监听 `min` 事件。

在`src/main/index.js`中
```js
const {
  // 从主进程到渲染进程的异步通信。
  ipcMain
} = require('electron')

...

ipcMain.on('window-close', function () {
  // close无法关闭程序
  // mainWindow.close()
  app.exit()
})
ipcMain.on('min', function () {
  // 最小化窗口
  mainWindow.minimize()
})
ipcMain.on('max', function () {
  if (mainWindow.isMaximized()) {
    // 将窗口从最小化状态恢复到以前的状态。
    mainWindow.restore()
  } else {
    // 最大化窗口。
    mainWindow.maximize()
  }
})
```
主进程监听渲染进程的三个事件。如：主进程监听 `min` ，触发最小化窗口的方法。

注意：`mainWindow.close()` 不能关闭程序，需要使用 `app.exit()` 来关闭。

### 8.监听窗口状态，动态改变窗口最大化图标
在 `windowOperate.vue` 中监听 `main-window-max` 事件，触发展示缩小图标；
在 `windowOperate.vue` 中监听 `main-window-unmax` 事件，触发展示最大化图标。

```js
 mounted () {
        // 监听窗口状态，动态改变图片
        this.changeWin()
      },
 
        changeWin () {
          ipcRenderer.on('main-window-max', () => {
            this.isRectangle = false
          })
          ipcRenderer.on('main-window-unmax', () => {
            this.isRectangle = true
          })
        },
```
在 `src/main/index.js` 让主进程监听窗口 `maximize` 和 `unmaximize` 向子进程发送事件消息。
```js
function createWindow () {}中插入
  // 监听窗口状态，向渲染进程发送消息
  // 窗口最大化时触发
  mainWindow.on('maximize', function () {
    mainWindow.webContents.send('main-window-max')
  })
  // 当窗口从最大化状态退出时触发
  mainWindow.on('unmaximize', function () {
    mainWindow.webContents.send('main-window-unmax')
  })
```
### 9.执行截图工具包，获取截图数据上传minio
#### 背景
在截图后，目前保存在本地工程目录下。如果其它开发者调用此截图，是没办法展示的。那么就需要上传到 `minio` 进行同步。
#### 格式问题
如下代码下载后的图片都是有格式问题：
```js
// ...调用截图工具包
ls.stdout.on('data', (data) => {
          console.log(`stdout: ${data}-${(new Date()) / 1}`)
          if (data.indexOf('success') > -1) {
            _this.setImageInfo(name)
            const formData = new FormData()
            const params = {
              projectId: this.$route.params.id
            }
            let file = null
            file = new File(data, `${name}.png`)
            formData.append('file', file)
            api.upload.create(params, formData)
              .then((res) => {
                this.$message.success('图片上传成功')
              })
              .catch((err) => {
                this.$message.error(`${err}`)
              })
          }
        })
```
分析：通过抓包发现此时是十六进制的数据，
但是创建 `file` 对象的源数据不能是十六进制的数据的。

> new File解析
```js
var myFile = new File(bits, name[, options]);
```
参数
- bits
一个包含 `ArrayBuffer`，`ArrayBufferView`，`Blob`，或者 `DOMString` 对象的 `Array` — 或者任何这些对象的组合。这是 `UTF-8` 编码的文件内容。
- name
`USVString`，表示文件名称，或者文件路径。
`options` 可选
选项对象，包含文件的可选属性。可用的选项如下：
`type: DOMString`，表示将要放到文件中的内容的 `MIME` 类型。默认值为 "" 。
`lastModified:` 数值，表示文件最后修改时间的 `Unix` 时间戳（毫秒）。默认值为 `Date.now()`。

由于支持的格式只有上述几种，所以下载后的图片都是有格式问题。

只要将源数据转化成 `ArrayBuffer`，`ArrayBufferView`，`Blob`，或者 `DOMString` 对象的 `Array` — 或者任何这些对象的组合中的一种，那么就可以获得 `file` 对象啦。
如下，通过 `dataURLtoFile` 方法将 `base64` 转换 `ArrayBuffer` ,最后转化为 `file` 对象。

`atob()` 方法用于解码使用 `base-64` 编码的字符串，该方法返回一个解码的字符串。

`charCodeAt()` 方法可返回指定位置的字符的 `Unicode` 编码。字符串中第一个字符的位置为 `0`， 第二个字符位置为 `1`，以此类推。

```js
            /**
       * @description 将base64转换为file对象
       * @param {String} dataURL base64地址
       * @param {String} fileName 文件名称
       * @param {String} fileType 图片类型 默认image/png
       * @return {Object} file对象
       */
      dataURLtoFile (dataURL, fileName, fileType) {
        let arr = dataURL.split(',')
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], fileName, {
          type: fileType || 'image/png'
        })
      }
```
正确的代码：
```js
      ls.stdout.on('data', (data) => {
          console.log(`stdout: ${data}-${(new Date()) / 1}`)
          if (data.indexOf('success') > -1) {
            const formData = new FormData()
            const params = {
              projectId: this.$route.params.id
            }
            let file = null
            // 读取图片，格式为base64，但是需要转化成file对象
            fs.readFile(`ws/${this.$route.params.id}/${name}.png`, 'base64', (err, data) => {
              if (err) throw err
              file = this.dataURLtoFile(`data:image/png;base64,${data}`, `${name}.png`)
              formData.append('file', file)
              api.upload.create(params, formData)
                .then((res) => {
                  this.$message.success('图片上传成功')
                })
                .catch((err) => {
                  this.$message.error(`${err}`)
                })
            })
          }
        })
```
 `fs` 读取本地指定目录下的图片，编译格式是 `base64`，回调后的数据将 `data:image/png;base64` 拼接在一起，用 `dataURLtoFile` 方法将 `base64` 转换为 `file` 对象。 `formData` 添加 `file` 对象，上传到 `minio`。

### 参考
[https://github.com/electron/electron-packager](https://github.com/electron/electron-packager)

[https://www.cnblogs.com/ljbmvp/p/8437931.html](https://www.cnblogs.com/ljbmvp/p/8437931.html)

[https://newsn.net/say/electron-devtools.html](https://newsn.net/say/electron-devtools.html)

[Chrome浏览器及electron-vue项目添加vue-devtools插件的方法步骤](https://blog.csdn.net/weixin_43642751/article/details/99893748?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight)

[electron-vue 的 vuex 使用记录](https://blog.csdn.net/qq_22889431/article/details/105133152)

[Electron无边框窗口（最小化、最大化、关闭、拖动）以及动态改变窗口大小](https://blog.csdn.net/fukaiit/article/details/91351448?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.edu_weight&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.edu_weight)