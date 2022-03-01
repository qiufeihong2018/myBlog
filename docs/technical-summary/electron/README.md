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
### 4.找不到electron依赖包
   
#### 背景

我的应用明明安装了依赖包，却无法找到electron包时，报这个错误：
```
throw new Error('Electron failed to install correctly, please delete node_modules/electron and try installing again')
```
#### 原因分析

经测试发现，`electron` 必须要安装在 `devDependencies`。



找到该代码在源码的位置，见 `node_modules\electron\index.js`：

```js
var pathFile = path.join(__dirname, 'path.txt')

function getElectronPath () {
  if (fs.existsSync(pathFile)) {
    var executablePath = fs.readFileSync(pathFile, 'utf-8')
    if (process.env.ELECTRON_OVERRIDE_DIST_PATH) {
      return path.join(process.env.ELECTRON_OVERRIDE_DIST_PATH, executablePath)
    }
    return path.join(__dirname, 'dist', executablePath)
  } else {
    throw new Error('Electron failed to install correctly, please delete node_modules/electron and try installing again')
  }
}

module.exports = getElectronPath()
```
如果是安装在dependencies下，就没有path.txt。那么node就读取不到该文件，抛出electron安装失败的问题。

#### 解决方式

重新安装：
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

`Uint8Array` 需要 new 出一个对象 `Uint8Array` 表示一个 `8` 位无符号整型数组。

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
### 10.创建文件夹，并且下载项目中的图片
#### 背景
创建文件夹，并且 `minio` 上下载项目中的对应的图片。
对应第八个问题，需要用到截图，那么在进入具体项目的时候，从 `minio` 中下载所有的图片到本地。
#### 创建项目id文件夹，并且从minio上下载对应项目中的所有图片
 ```js
     /**
       * @description 创建文件夹，并且下载项目中的图片
       */
      download (item) {
        const params = {
          projectId: item.id
        }
        //  检查文件夹是否存在
        if (!fs.existsSync(`ws/${item.id}`)) {
          fs.mkdir(`ws/${item.id}`, (err) => {
            if (err) throw err
            console.log('创建目录成功')
          })
        }
        api.upload.download(params).then(res => {
          res.forEach(img => {
            // 转化为buffer下载文件
            axios({url: img.url, method: 'get', responseType: 'arraybuffer'}).then(response => {
              fs.writeFile(`ws/${item.id}/${img.fileName}`, new Uint8Array(response.data), (err) => {
                if (err) throw err
                console.log('图片下载成功')
              })
              // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            })
            // var a = document.createElement('a')
            // a.href = img.url
            // a.download = img.fileName
            // a.click()
          })
        })
      },
```
分析： `download` 方法先去检查文件夹是否存在，不存在就创建。接着请求对应的项目获取图片地址，转化为 `buffer` 下载文件，文件保存在项目 `id` 文件夹中。
### 11.electron Uncaught TypeError: Cannot read property 'app' of undefined
#### 背景
`electron-vue` 这个项目有一些缺陷，启动项目的时候会报错：
```
Uncaught TypeError: Cannot read property 'app' of undefined
    at new ElectronStore (E:\eleftron-autoupdate-demo\node_modules\electron-store\index.js:8:55)
    at a (E:\eleftron-autoupdate-demo\node_modules\vuex-electron\dist\persisted-state.js:1:1365)
    at a (E:\eleftron-autoupdate-demo\node_modules\vuex-electron\dist\persisted-state.js:1:1102)
    at E:\eleftron-autoupdate-demo\node_modules\vuex-electron\dist\persisted-state.js:1:3174
    at E:\eleftron-autoupdate-demo\node_modules\vuex\dist\vuex.common.js:425:46
    at Array.forEach (<anonymous>)
    at new Store (E:\eleftron-autoupdate-demo\node_modules\vuex\dist\vuex.common.js:425:11)
    at eval (webpack-internal:///./src/renderer/store/index.js:17:64)
    at Module../src/renderer/store/index.js (http://localhost:9080/renderer.js:1583:1)
    at __webpack_require__ (http://localhost:9080/renderer.js:791:30)
```

#### 解决方法
给主窗口添加 `enableRemoteModule` 属性，使用remote模块
```js {7}
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
```
### 12.electronr怎么做自动更新？
说道自动更新，我觉得不仅仅是一篇文章能说透的，这其中的方式和原理大有来头，不太适合初玩electron的小白。
#### 背景
当我们在应用中添加了新的功能并且提交了新代码后，当然是希望在用户的电脑上能够自动更新。
但是最原始的操作是这样的：
1. 提交代码后，用webpack打包，在用electron打包工具（如：electron-builder）打包；
2. 找到打包生成的exe等执行文件（windows环境）；
3. 将生成的exe发给用户，让用户重新安装。

假如你是用户，你肯定觉得很烦。不就是用户，连开发者都觉得很烦。有没有一种方式可以派发更新，并在用户的电脑上可以自动更新应用呢？答案肯定是有的。
#### 方式
- electron-vue+electron-builder+electron-release-server
下面是electron-builder的两种配置方式，分别打包出直接打开的程序和一步一步需要用户交互的安装程序。
1. Squirrel.Windows自动更新
该方式默认安装在 `C:\Users\qiufeihong\AppData\Local\ManisUTest`
并且会产生 `package` 文件夹和 `Update.exe`程序。
`package` 包含了版本信息的 `RELEASES`。
如果有最新版本，他的 `nupkg` 也会下载到其中。

自动更新的日志会存放在 `SquirrelSetup.log` 中。

2. nsis自动更新
方式与 `Squirrel.Windows` 类似。
但是安装后不会产生 `packages` 文件夹和 `Update.exe`程序。
- electron-forge+nucleus
### 13.cannot unpack electron zip file, will be re-downloaded  error=zip: not a valid zip file
#### 错误：
```
cannot unpack electron zip file, will be re-downloaded  error=zip: not a valid zip file
  • downloading     url=https://npm.taobao.org/mirrors/electron/2.0.4/electron-v2.0.4-win32-x64.zip size=51 MB parts=8
  • canceling       signal=interrupt
  • cancelled by SIGINT
• downloaded      url=https://npm.taobao.org/mirrors/electron/2.0.4/electron-v2.0.4-win32-x64.zip duration=7m38.034s
  ⨯ zip: not a valid zip file
  ⨯ E:\Manis_UTest\node_modules\app-builder-bin\win\x64\app-builder.exe exited with code ERR_ELECTRON_BUILDER_CANNOT_EXECUTE  stackTrace=

                               Error: E:\Manis_UTest\node_modules\app-builder-bin\win\x64\app-builder.exe exited with code ERR_ELECTRON_BUILDER_CANNOT_EXECUTE

                                   at ChildProcess.<anonymous> (E:\Manis_UTest\node_modules\builder-util\src\util.ts:243:14)

                                   at Object.onceWrapper (events.js:300:26)

                                   at ChildProcess.emit (events.js:210:5)

                                   at maybeClose (internal/child_process.js:1021:16)

                                   at Process.ChildProcess._handle.onexit (internal/child_process.js:283:5)
y
```

#### 分析
由于本地的electron包已损坏，所以打包的时候引用有问题，就重新下载，但是由于网络限速，该包下载失败，于是整个打包就失败了。
#### 解决
将`https://npm.taobao.org/mirrors/electron/10.1.3/electron-v10.1.3-win32-x64.zip`(版本号自己更换)下载来放入`C:\Users\你的用户名\AppData\Local\electron\Cache`。
### 14.Error: spawn UNKNOWN
#### 背景
自动更新的时候，已经将 `nupkg` 下载下来了，但是却失败了。

如下图：
```
[2020-10-09T10:29:28.047] [INFO] default - checkForUpdates
[2020-10-09T10:29:28.047] [ERROR] default - There was a problem updating the application
[2020-10-09T10:29:28.047] [ERROR] default - Error: Error: spawn UNKNOWN
    at AutoUpdater.emitError (electron/js2c/browser_init.js:17:1391)
    at electron/js2c/browser_init.js:17:968
    at electron/js2c/browser_init.js:21:1005
    at electron/js2c/browser_init.js:21:553
    at processTicksAndRejections (internal/process/task_queues.js:79:11)
```
#### 原因分析
打包后，将 `Update.exe` 上传到 `minio`，但是下载却出现问题。

`writefilesync` 写 `exe` 却不完整

是因为本地的 `Update.exe` 不完整，所以导致更新失败。

`node buffer` 拼接的问题

```js
'new Buffer()' was deprecated since v6. Use 'Buffer.alloc()' or 'Buffer.from()' (use 'https://www.npmjs.com/package/safe-buffer' for '<4.5.0') instead
```
#### 解决方案
### 15.electron-builder nsis 打包配置license乱码
使用 `electron-builder` 打包时配置好了 `license` 许可协议，打包后安装出现乱码
![avatar](./electron2.png)

配置

```js
    "nsis":{
        "license":"./build/license.txt"
    }
```

#### 解决方法
找到许可协议 `txt` 文件，并非是 `GBK`，或者 `UTF-8`，`txt`写好之后，需要进行转化，转化为 `ANSI`
记事本打开另存为

![avatar](./electron1.png)

选择 `ANSI` 转化重新打包即可
### 16.electron打包生成的exe程序安装已中止,安装程序并未成功地运行完成
#### 背景
![avatar](./electron3.png)

#### 分析
出现这个问题的原因无非就是原来安装程序没有被卸载。

或者深层地说就是卸载程序缺失或无作用。
#### 解决方法
打开控制面板, 找到该软件, 发现还在，说明没有卸载完成。

右键卸载, 选择是，

卸载成功，然后重新安装就没有问题。

但是事情并没有那么简单。

可能还是安装中止，卸载不了。

打开安装目录发现卸载程序不存在，`windows` 找不到所以卸载不了。

卸载不了那么也就无法更新安装了。
### 17.squirrel-windows缺包
`electron-builder` 加进了 `squirrel-windows` 后，打包时碰到
```bash
Module electron-builder-squirrel-windows must be installed in addition to build Squirrel.Windows: Error: Cannot find module 'electron-builder-squirrel-windows'
Require stack:
```
找不到 `electron-builder-squirrel-windows` 包。

只要安装 `electron-builder-squirrel-windows` 包就好了。
### 18.app.asar删不掉
重复打包的时候，会遇到下面的问题：
```bash
⨯ remove E:\electron-vue-case2\build\win-unpacked\resources\app.asar: The process cannot access the file because it is being used by another process.
```
这个时候，只需要关闭正在占用 `app.asar` 这个文件的编辑器，并且将 `app.asar` 删掉即可重新打包成功。
### 19.打包icon问题
打包过程，问题层出不现，请看下面报错：
```bash
Get https://github-production-release-asset-2e65be.s3.amazonaws.com/65527128/af865400-e8de-11e8-8f93-2637f0b25007?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20201125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201125T061509Z&X-Amz-Expires=300&X-Amz-Signature=040733d5ed62bab8158f4984086873b51edc808bfc0b31043a7641e4abae47ae&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=65527128&response-content-disposition=attachment%3B%20filename%3DwinCodeSign-2.4.0.7z&response-content-type=application%2Foctet-stream: read tcp 10.65.145.9:64882->52.217.83.196:443: wsarecv: An existing connection was forcibly closed by the remote host.

Error: Cannot cleanup: 

Error #1 --------------------------------------------------------------------------------
Error: cannot find specified resource "build/icons/icon.ico", nor relative to "E:\electron-vue-case2\build", neither relative to project dir
```

其实就是， `icon.ico` 这个图标找不到。

要检查是否有该图标，该图标是否会变更目录。

### 20.Electron 如何打开文件资源管理器窗口和打开文件
最近接到一个需求：在 `electron` 应用中双击文件夹打开对应路径下的文件资源管理器窗口，双击文件用 `txt` 方式打开对应路径下的文件。

后端提供了文件列表、文件夹和文件的路径。

如下数据结构：
```js
fileData = [
    {
        folderName: 'feihong',
        folderPath: 'D:\folder',
        children: [{
            fileName: 'jiang',
            filePath: 'D:\folder\feihong\jiang.txt'
        }]
    }
]
```
1. 打开文件资源管理器窗口
```js
import { remote } from 'electron'

// 模板中注册双击事件，事件名为 onOpenFolder
// folder对象是文件夹数组中的单个对象
onOpenFolder(folder) {
    // 获取当前窗口
    const window = remote.getCurrentWindow()
    // 资源管理器配置项
    const options = {
        title: '飞鸿酱文件管理',
        // 打开的路径
        defaultPath: folder.folderPath,
        // 属性
        properties: ['openFile', 'multiSelections']
    }
    remote.dialog.showOpenDialog(window, options)
}
```
2. 用txt打开文件
```js
import { shell } from 'electron'
// file是文件数组中的单个对象 
shell.openPath(file.filePath)
```
### 21.Error: Application entry file "index.js" in the resources/app.asar does not exist. Seems like a wrong configuration.
出现这个问题是打包构建启动后发现缺少了入口。

`app.asar` 必须要有 `main` 入口，其实将 `app.asar` 解压就会发现其中有 `background.js`，那么我们的 `package.json` 中的要设置入口
```js
{
"main": "background.js",'
}
```
### 22. 编译包如何不报错
具体报错如图：
![avatar](./electron4.png)

其中内容如下：
```
App threw an error during load
TypeError: Cannot read property 'indexOf' of undefined
    at Function.getFileName (webpack:///./node_modules/bindings/bindings.js?:178:16)
    at bindings (webpack:///./node_modules/bindings/bindings.js?:82:48)
    at eval (webpack:///./node_modules/@serialport/bindings/lib/win32.js?:1:91)
    at Object../node_modules/@serialport/bindings/lib/win32.js (E:\vue-cli-electron-builder-client\dist_electron\index.js:309:1)
    at __webpack_require__ (E:\vue-cli-electron-builder-client\dist_electron\index.js:20:30)
    at eval (webpack:///./node_modules/@serialport/bindings/lib/index.js?:6:22)
    at Object../node_modules/@serialport/bindings/lib/index.js (E:\vue-cli-electron-builder-client\dist_electron\index.js:221:1)
    at __webpack_require__ (E:\vue-cli-electron-builder-client\dist_electron\index.js:20:30)
    at eval (webpack:///./node_modules/serialport/lib/index.js?:2:17)
    at Object../node_modules/serialport/lib/index.js (E:\vue-cli-electron-builder-client\dist_electron\index.js:6322:1)
```
因为 `electronbuilder` 打包构建后，需要重新下载和编译 `serialport` 等编译包，但是没有构建工具，所以编译不通过。

只需要加上两行忽略即可：
```js
pluginOptions: {
electronBuilder: {
// List native deps here if they don't work
externals: ['serialport'],
// If you are using Yarn Workspaces, you may have multiple node_modules folders
// List them all here so that VCP Electron Builder can find them
nodeModulesPath: ['./node_modules'],
nodeIntegration: true,
chainWebpackMainProcess: (config) => {
// Chain webpack config for electron main process only
},
// 这两行忽略serialport
// List native deps here if they don't work
externals: ['serialport'],
// If you are using Yarn Workspaces, you may have multiple node_modules folders
// List them all here so that VCP Electron Builder can find them
nodeModulesPath: ['./node_modules'],
```
### 23. electron中添加vue-devtools
由于 `vue-devtools` 被墙， `electron` 自动导入 `vue-devtools` 没用。

如果可以科学上网，下面代码就可以加载 `vue-devtools` 。

```js
```
1. 方法一：

没事，我有一招，可以从 `github` 上把代码拉下来编译，手动导入。

[`vue-devtools` 地址](https://github.com/vuejs/vue-devtools)

如果您的环境编译有问题，我还有办法，从[这个地址](https://github.com/qiufeihong2018/windows-build-tools)直接下载导入即可。

再将 `vue-devtools` 的文件夹放在项目根目录下。

然后在 `electron` 项目中的主进程加入如下代码：
```js
import { session } from 'electron'
session.defaultSession.loadExtension(path.resolve(__dirname, '../vue-devtools'))
```

保存后重启，效果如下图：
![avatar](./electron5.png)

为什么要用 `loadExtension()` 这个 `api` 呢

其实， `electron` 最先开始提供的是 `addDevToolsExtension()`
```js
/**
* Adds DevTools extension located at path, and returns extension's name.
*
* The extension will be remembered so you only need to call this API once, this
* API is not for programming use. If you try to add an extension that has already
* been loaded, this method will not return and instead log a warning to the
* console.
*
* The method will also not return if the extension's manifest is missing or
* incomplete.
*
* Note: This API cannot be called before the ready event of the app module
* is emitted.
*
Note: This method is deprecated. Instead, use ses.loadExtension(path).
*
* @deprecated 
*/
static addDevToolsExtension(path: string): void;
```
很不幸，`addDevToolsExtension()` 被弃用了，同时告诉我们可以使用 `session` 的 `api`。
```js
/**
* resolves when the extension is loaded.
*
* This method will raise an exception if the extension could not be loaded. If
* there are warnings when installing the extension (e.g. if the extension requests
* an API that Electron does not support) then they will be logged to the console.
*
* Note that Electron does not support the full range of Chrome extensions APIs.
* See Supported Extensions APIs for more details on what is supported.
*
* Note that in previous versions of Electron, extensions that were loaded would be
* remembered for future runs of the application. This is no longer the case:
* loadExtension must be called on every boot of your app if you want the
* extension to be loaded.
*
* This API does not support loading packed (.crx) extensions.
*
* Note: This API cannot be called before the ready event of the app module
* is emitted.
*
* Note: Loading extensions into in-memory (non-persistent) sessions is not
* supported and will throw an error.
*/
loadExtension(path: string): Promise<Electron.Extension>;
```
官网上也有[案例](https://www.electronjs.org/docs/api/session#sesloadextensionpath-options)
2. 方法二
```js
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  autoUpdater.checkForUpdates()
})
```
但是这个我没有尝试过，您可以试下。
### 24. ExecError: C:\Users\xxx\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\Bin\makensis.exe exited with code ERR_ELECTRON_BUILDER_CANNOT_EXECUTE
解决：`electron` 项目路径不能有中文！
### 25. Syntax Error: ReferenceError: document is not defined
`vue-cli-plugin-electron-builder` 不能出现 `list-style: square inside url('../../icons/svg/moreThen.svg');`
### 26. electron打包后出现如下问题
![avatar](./electron6.png)

如图：`chunk-vendors.js`中放的是通过 `import` 包导入的第三方依赖包。防止该文件体积过大，可以使用 `webpack` 的 `externals` 配置。凡是声明在 `externals` 中的第三方依赖包，都不会被打包。
以找到出错的依赖包剔除即可。
`n=t.colouredLayout;` 让我查到了 `log4js` 这个包，只要将这个
### 27. electron实现多窗口功能
#### 配置路由文件
```js
export default new Router({
  routes: [
    {path: '/', name: 'home', component: ()=> import('@/view//home')},
    {path: '/suspension', name: 'suspension', component: ()=> import('@/view/components/suspension')}
  ]
})
```
`home` 组件是在主窗口中，`suspension` 组件是在子窗口中。

两者组件的内容随意。

关键的在于主进程，主进程要控制两者的交互。
```js
import {BrowserWindow, ipcMain, screen, Menu, shell, app, webContents} from 'electron'

var win = null;
const window = BrowserWindow.fromWebContents(webContents.getFocusedWebContents());
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080/#/suspension` : `file://${__dirname}/index.html/#/suspension`;
// 主进程监听子进程发过来的消息showSuspensionWindow，如果没有win或者被隐藏了则创建，否则就展示。
ipcMain.on('showSuspensionWindow', () => {
  if (win) {
    if (win.isVisible()) {
      createSuspensionWindow();
    } else {
      win.showInactive();
    }
  } else {
    createSuspensionWindow();
  }

});
// 主窗口就不展示了
// 创建子窗口
function createSuspensionWindow() {
  win = new BrowserWindow({
    width: 800, 
    height: 600,
    frame: false,  //要创建无边框窗口
    alwaysOnTop: true, //窗口是否总是显示在其他窗口之前
  });
  const size = screen.getPrimaryDisplay().workAreaSize;  //获取显示器的宽高
  const winSize = win.getSize(); //获取窗口宽高

  //设置窗口的位置 注意x轴要桌面的宽度 - 窗口的宽度
  win.setPosition(size.width - winSize[0], 100);
  win.loadURL(winURL);

  win.once('ready-to-show', () => {
    win.show()
  });

  win.on('close', () => {
    win = null;
  })
}
// 隐藏窗口事件
ipcMain.on('hideSuspensionWindow', () => {
  if (win) {
    win.hide();
  }
});
```

在主窗口中发送创建子窗口的事件
```js
ipcRender.send('showSuspensionWindow')
```

在主窗口中发送隐藏子窗口的事件
```js
ipcRender.send('hideSuspensionWindow')
```
### 28.electron最小化窗口闪烁
使用的 `api` 是 `flashFrame`

主进程：
```js
ipcMain.on('flashFrame', function () {
  mainWindow.flashFrame(true)
})
```
渲染进程：
```js
  ipcRenderer.send('flashFrame')
```
### 29. 避免出现开启白屏情况
用 `show` 来控制窗口是否显示。

可以先不显示，等到资源加载完毕，再显示窗口。
```js
mainWindow = new BrowserWindow({
    height: 720,
    minHeight: 600,
    minWidth: 900,
    width: 1280,
    frame: false,
    useContentSize: true,
    webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
    },
    //先不显示
    show: false
})
mainWindow.on('ready-to-show', () => {
    // 资源准备好后显示界面    
    mainWindow.show()
})
```
### 30.electron notification 源码
```ts
  interface NotificationConstructorOptions {
    /**
 通知的标题，将显示在通知的顶部
*窗口显示时。
     */
    title: string;
    /**
通知的副标题，将显示在标题下方。
     *
     * @platform darwin
     */
    subtitle?: string;
    /**
*通知的正文，将显示在标题或
*副标题。
     */
    body: string;
    /**
是否在显示通知时发出OS通知噪声。
     */
    silent?: boolean;
    /**
*通知中使用的图标。
     */
    icon?: (string) | (NativeImage);
    /**
*是否在通知中添加内联回复选项。
     *
     * @platform darwin
     */
    hasReply?: boolean;
    /**
通知超时时间。可以是'default'或'never'。
     *
     * @platform linux,win32
     */
    timeoutType?: ('default' | 'never');
    /**
     *要写入内联回复输入字段的占位符。
     *
     * @platform darwin
     */
    replyPlaceholder?: string;
    /**
*显示通知时播放的声音文件的名称。
     *
     * @platform darwin
     */
    sound?: string;
    /**
*通知的紧急程度。可以是“正常”、“严重”或“低”。. Can be 'normal', 'critical', or 'low'.
     *
     * @platform linux
     */
    urgency?: ('normal' | 'critical' | 'low');
    /**
*添加到通知的动作。请阅读可用的操作
*“NotificationAction”文档中的限制。
     *
     * @platform darwin
     */
    actions?: NotificationAction[];
    /**
*警报关闭按钮的自定义标题。空字符串将导致
*使用默认本地化文本。
     *
     * @platform darwin
     */
    closeButtonText?: string;
  }
```
### 31. electron打包更新需要图标是256*256
这个是强制要求

可以通过 `https://lirongyao.com/ico/` 这个网站将图片改成256*256的ico图标


### 32.Error: EBUSY: resource busy or locked, rename
打包出现了问题：
```
[Error: EBUSY: resource busy or locked, rename 'E:\person\electron-builder-demo\dist_electron\win-unpacked\electron.exe' -> 'E:\person\electron-builder-demo\dist_electron\win-unpacked\Vue Electron.exe'] {
```
网上说的从资源管理器中杀进程方式不行，直接重启就能解决问题。
### 33.electron项目打包时下载Electron缓慢
`vue-cli-electron-builder` 项目打包
```
 downloading     url=https://cdn.npm.taobao.org/dist/electron/13.2.2/electron-v13.2.2-win32-x64.zip 
```
一直卡在下载`electron-v13.2.2-win32-x64.zip`这里。

怎么解决下载Electron缓慢呢？

![avatar](./33.png)

在 `C:\Users\用户名\AppData\Local\electron\Cache` 路径下，将下载下来的 `electron-v13.2.2-win32-x64.zip` 和 `SHASUMS256.txt` 改成 `SHASUMS256.txt-13.2.2` 放入其中。

重新打包就好了
### 34.打包报错ERR_ELECTRON_BUILDER_CANNOT_EXECUTE
Electron执行electron-builder打包命令报错
```
...electron-builder\Cache\nsis\nsis-3.0.3.2\Bin\makensis.exe exited with code ERR_ELECTRON_BUILDER_CANNOT_EXECUTE
```
解决方法很简单，打包项目路径不能包含中文路径。

### 参考
[https://github.com/electron/electron-packager](https://github.com/electron/electron-packager)

[https://www.cnblogs.com/ljbmvp/p/8437931.html](https://www.cnblogs.com/ljbmvp/p/8437931.html)

[https://newsn.net/say/electron-devtools.html](https://newsn.net/say/electron-devtools.html)

[Chrome浏览器及electron-vue项目添加vue-devtools插件的方法步骤](https://blog.csdn.net/weixin_43642751/article/details/99893748?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight)

[electron-vue 的 vuex 使用记录](https://blog.csdn.net/qq_22889431/article/details/105133152)

[Electron无边框窗口（最小化、最大化、关闭、拖动）以及动态改变窗口大小](https://blog.csdn.net/fukaiit/article/details/91351448?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.edu_weight&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.edu_weight)
