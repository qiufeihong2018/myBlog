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
### 参考
[https://github.com/electron/electron-packager](https://github.com/electron/electron-packager)

[https://www.cnblogs.com/ljbmvp/p/8437931.html](https://www.cnblogs.com/ljbmvp/p/8437931.html)

[https://newsn.net/say/electron-devtools.html](https://newsn.net/say/electron-devtools.html)

[Chrome浏览器及electron-vue项目添加vue-devtools插件的方法步骤](https://blog.csdn.net/weixin_43642751/article/details/99893748?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight)

[electron-vue 的 vuex 使用记录](https://blog.csdn.net/qq_22889431/article/details/105133152)

