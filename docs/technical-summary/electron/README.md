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

### 参考
[https://github.com/electron/electron-packager](https://github.com/electron/electron-packager)

[https://www.cnblogs.com/ljbmvp/p/8437931.html](https://www.cnblogs.com/ljbmvp/p/8437931.html)