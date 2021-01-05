# Electron实战
## 摘要
阅读本文需要一定的 `node` 基础知识。知道 `Electron` 是开发桌面应用程序的技术。
本文主要介绍了桌面应用程序的历史和 `electron` 的历史，分析了 `electron` 原理和 `electron-vue` 项目架构，快速上手了 `electron-vue` 项目。

## 关键词
Electron Electron-vue
## 正文
### 一、	背景
在开发 `xxx` 项目的时候，需要用到 `electron` 技术，为了让更多同学了解和喜欢 `electron`，我想通过本文分享实战经验。
### 二、	桌面应用程序的历史
桌面应用程序，又称为 `GUI` 程序。开发它有下面几种技术：
1.	VB——上古程序员的开发工具，曾经全球第一的开发语言，拖拽式的图形化开发让它成为极佳的桌面开发工具。微软依靠其操作系统的优势，一直压制同时期的竞争对手 delphi。
2.	C++的win32API ——其 MFC 方案是基于窗口中组合控件和消息传递机制。这也是 20 多年前的技术，所以 API 设计的不是很友好。几年前微软已经停止维护，简单来说它已经过时了。
3.	Winform——但是从开发体验角度来说自定义、美化控件会比较麻烦。
4.	C#的.net framework——代表就是 WPF，它的原生特性是其他类库无法比拟的：High DPI、Split Screen 以及对 DirectX 的天然优势。但是并不开源，需要依赖.net 框架，还有就是启动会比较慢。Workstation Windows 的新客户端就是基于该技术研发。
5.	Java的swing/javaFx——这是一类比较大的阵营，优势是跨平台和流行开发语言 Java 的天然结合，但开发出来的界面作者个人认为并不美观。
6.	C++的Qt——这是很多客户端跨平台的首选，因为开源、UI 库和各种功能的类库非常丰富，但是学习成本比较高。
7.	C++的duilib——这是 windows 下开源的 directUI（微软提出的分离 UI 和逻辑的思想）库，它是迎合互联网桌面软件小而美的趋势发展起来的，可能大家对它的关注度比较少。但是用它开发出的产品大名鼎鼎，比如 QQ、微信、爱奇艺等很多知名度高的软件。
8.	Objective-c/swift cocoa——这是 mac 平台下的方案。可以方便调用底层的 API，缺点是不跨平台，文档不友好，UI 库并不丰富。现在这种方式开发的越来越少了。
从 `B/S` 和 `C/S` 架构逐渐融合的角度来说，基于 `Web` 技术进行桌面程序的开发渐渐变成了主流。因为对界面的代码部分可以做到复用。
这类技术早期的方案是用 `vb` 内嵌 `webBrowser` 控件，基于 `IE` 内核，正好很多网页开发也有用 `activeX` 的需求，但这种方式具有明显的缺陷——非常依赖于用户的环境，会因为组件缺失导致程序各种崩溃。第二类是嵌入式网页框架，这类技术主要是基于浏览器引擎实现 `UI` 渲染。比较典型的就是 `appkit` 上面 `UIWebView` 和 `CEF` （`chro-mium embeded framework`)。这种方法可以使用网页 `HTML5+CSS` 实现各种酷炫的效果，但是缺点也比较明显，就是桌面程序里面嵌入了一个类似 `Chrome` 的浏览器，内存的开销会比较大。
后面出现了 `nwjs` 和 `electron`，`electron` 相比 `CEF` 有了单独执行 `js` 的 `v8` 引擎，可以运行 `Node.js` 来完成服务器端功能，通过和内部浏览器的 `v8` 引擎交互可以实现一个独立的客户端，这不同于 `CEF` 需要寄宿在其他程序内部。
### 三、	Electron的历史
`Electron`（最初名为 `Atom Shell`）是 `GitHub` 开发的一个开源框架。它允许使用 `Node.js`（作为后端）和 `Chromium`（作为前端）完成桌面 `GUI` 应用程序的开发。`Electron` 现已被多个开源 `Web` 应用程序用于前端与后端的开发，著名项目包括 `GitHub` 的 `Atom` 和微软的 `Visual Studio Code`。
 
图 1 ATM编辑器
 
图 2 vscode编辑器
官网上第一段话就是：`Electron` 是一个框架，可以让您使用  `JavaScript`，`HTML` 和 `CSS` 创建桌面应用程序。 然后这些应用程序可以打包在 `macOS`、`Windows` 和 `Linux` 上直接运行，或者通过 `Mac App Store` 或微软商店分发。通常，您使用每个操作系统特定的本地应用程序框架为操作系统 (`OS`)创建一个桌面应用程序。 `Electron` 可以在使用您已经知道的技术后写入您的应用程序。由此看出，它是框架，而不是库，前端开发者可以像开发 `web` 应用一样开发桌面应用程序。当然在各大应用商店都可以上架，这个需要各自的认证，这个之后文章讲述。
 
图 3 electron图标

其优势如下图：
 
图 4 electron的优势
用 `Electron` 来做桌面程序开发的优势明显，相当于是完全的网页编程，有 `Web` 开发经验的前端开发上手非常容易。`Web` 开发生态广泛，开发成本低，可扩展性强，一些流行的前端框架例如 `React`、`Angular`、`Vue` 都可以和 `electron` 结合进行开发。另外它也具备和 `Qt` 一样跨平台的优良特性。对性能要求不高的桌面版程序来说，一份代码同时得到网页版和各个平台的桌面版，开发的效率是其他方案无法比的。可以说，这是大部分人看好的趋势。
### 四、	Electron的入门
#### (一)	应用程序结构
 
图 5 electron的架构
`Electron` 由三个主要部分组成：
1.	Chromium 用于显示网页内容。
2.	Node.js 用于本地文件系统和操作系统。
3.	自定义 APIs 用于使用经常需要的 OS 本机函数。

`Electron` 开发应用程序就像构建一个带有网页界面的 `Node.js` 应用程序，想一想 `vscode` 就瞬间明了。
##### 主进程和渲染器进程
`Electron` 有两种进程 ：`Main` 进程和`Rendererer` 进程。

`Main` 进程，又叫主进程，通常是名为 `main.js` 的文件，是每个 `Electron` 应用的入口文件。它控制着整个 `App` 的生命周期，从打开到关闭。 它也管理着系统原生元素比如菜单、菜单栏、`Dock` 栏（软件启动后，在屏幕下方生成的一条栏）和托盘等。主进程负责创建 `APP` 的每个渲染进程。而且整个 `Node API` 都集成在里面。
每个应用程序的主进程文件都在 `package.json` 中的 `main` 属性中指定。这就是程序知道在启动时执行什么文件。
`Rendererer` 进程，又叫渲染进程。在 `Chromium` 中，此进程被称为“浏览器进程”。 它在 `Electron` 中重新命名，以避免与渲染器过程混淆。与主进程不同的是，它可以有多个，每个都是在一个单独的进程中运行的。它们也可以被掩盖。
在通常的浏览器内，网页通常运行在一个沙盒的环境中，并且不能够使用原生的资源。然而 `Electron` 的用户在 `Node.js` 的 `API` 支持下可以在页面中和操作系统进行一些低级别的交互。
1.	主进程 通过创建 `BrowserWindow` 实例来创建网页。 每一个 `BrowserWindow` 实例在其渲染过程中运行网页。当一个 `BrowserWindow` 实例被摧毁时，对应的渲染过程也被终止。
2.	主进程管理所有网页及其对应的渲染进程。
3.	渲染进程只能管理每个相应的网页。在一个渲染过程中崩溃不会影响其他渲染过程。
4.	渲染进程通过 `IPC` 与主进程通信在网页上执行 `GUI` 操作。由于安全考虑和可能的资源泄漏，直接从渲染器过程中调用与本地 `GUI` 有关的 `API` 受到限制。

谈到两个进程，那必须要涉及进程间通信。可以通过进程间通信模块进行： `ipcMain` 和 `ipcRenderer`。
###### ipcMain 
从主进程到渲染进程的异步通信。
可以从主进程向渲染进程发送消息。
1.	发送消息时，事件名称为 `channel` 。
2.	回复同步信息时，需要设置 `event.returnValue`。
3.	可以使用 `event.reply(...)` 将异步消息发送回发送者。 
###### ipcRenderer
从渲染器进程到主进程的异步通信。
下面是一个渲染进程向主进程通信的例子：
```js
// 在主进程中.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

//在渲染器进程 (网页) 中。
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```
##### Electron API
<<<<<<< HEAD
Electron API是根据流程类型分配的。这意味着某些模块可以从主程序或渲染程序中使用，有些模块可以从两者中使用。Electron的API文档指明了每个模块可以使用的过程。
例如，要在两个进程中访问Electron API，需要它包含的模块：
=======
`Electron API` 是根据流程类型分配的。这意味着某些模块可以从主程序或渲染程序中使用，有些模块可以从两者中使用。`Electron` 的 `API` 文档指明了每个模块可以使用的过程。
例如，要在两个进程中访问 `Electron API`，需要它包含的模块：
```js
>>>>>>> 8a384b07b5171d6fe0eb9c979975006f965004ed
const electron = require('electron')
```
若要创建一个窗口，则要调用 `BrowserWindow` 类，只能在主进程中使用：
```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```
若要从渲染进程往主流程中发送消息，请使用 `IPC` 模块：
```js
// 在主进程中
const { ipcMain } = require('electron')

ipcMain.on('event', (event, args) => {
  console.log('接收到的数据是：', args)
})
// 在渲染进程中
const { ipcRenderer } = require('electron')

ipcRender.send('event', ...args)
```
##### Node.js API
> 注意：要从渲染过程中访问 `Node.js API`，您需要设置 `nodeIntegration` 选项为 `true`。
`Electron` 在主进程和渲染进程中显示对 `Node.js API`及其模块的完全访问权限。 例如，我可以从根目录读取所有文件：
```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```
要使用 `Node.js` 模块，就需要安装它作为依赖：
```
npm install --save minio
```
然后，在 `Electron` 应用程序中，导入模块：
```js
var Minio = require('minio')
```
官网提供的 `electron` 模板是 `electron-quick-start`，启动命令如下：
```bash
# 克隆示例项目的仓库
$ git clone https://github.com/electron/electron-quick-start

# 进入这个仓库
$ cd electron-quick-start

# 安装依赖并运行
$ npm install && npm start
```
图 6 electron-quick-start模板项目
这个模板没有集成任何前端框架，开发效率惨不忍睹。

对于 `react` 开发者，可以去翻阅 `electron-react-boilerplate` （https://github.com/electron-react-boilerplate/electron-react-boilerplate）
对于 `vue` 开发者，可以查阅 `electron-vue`（https://github.com/SimulatedGREG/electron-vue），这也是我重点要讲述的项目。
### 五、	Electron-vue
基于 `vue` 来构造 `electron` 应用程序的模板代码。

该项目的目的，是为了要避免使用 `vue` 手动建立起 `electron` 应用程序。`electron-vue` 充分利用 `vue-cli` 作为脚手架工具，加上拥有 `vue-loader` 的 `webpack`、`electron-packager` 或 `electron-builder`，以及一些最常用的插件，如 `vue-router`、`vuex` 等等。

其优势：
1.	基本的项目结构与单一的 `package.json` 设置
2.	详细的文档
3.	使用 `vue-cli` 作为项目脚手架
4.	开箱即用的 `Vue` 插件 (`axios`, `vue-electron`, `vue-router`, `vuex`)
5.	预装开发工具 `vue-devtools` 和 `devtron`
6.	使用 `electron-packager` 或 `electron-builder` 轻松打包应用程序
7.	`appveyor.yml` 与 `.travis.yml` 配置用于 `electron-builder` 的自动部署
8.	能够生成用于浏览器的网页输出
9.	便利的 `NPM` 脚本
10.	使用携带热更新 (`Hot Module Replacement`) 的 `webpack` 和 `vue-loader`
11.	在 `electron` 的 `main` 主进程修改时重启进程
12.	支持使用 `vue-loader` 的 `HTML/CSS/JS` 预处理器
13.	默认支持 `stage-0` 的 `ES6`
14.	使用 `babili` 避免完全反编译到 `ES5`
15.	`ESLint` (支持 `standard` 和 `airbnb-base`)
16.	单元测试 (使用 `Karma` + `Mocha`)
17.	端到端测试 (使用 `Spectron` + `Mocha`)
#### (一)	起步
它是 `vue-cli` 的一个模板，并且包含多个选项，最终的脚手架程序可以自定义。本项目需要使用  `node@^7` 或更高版本。`electron-vue` 官方推荐 `yarn` 作为软件包管理器，因为它可以更好地处理依赖关系，并可以使用 `yarn clean` 帮助减少最后构建文件的大小。

安装 `vue-cli` 脚手架：
```bash
npm install -g vue-cli
vue init simulatedgreg/electron-vue my-project
```
安装依赖并且运行程序：
```bash
cd my-project
yarn # or npm install
yarn run dev # or npm run dev
```
创建项目如下：
 
图 7 创建electron-vue项目
`Electron-vue-case2` 就使用 `electron-vue` 模板安装成功了。
启动应用后：
 
图 8 electron-vue模板项目
#### (二)	项目结构
项目结构与官方的 `vuejs-templates/webpack` 设置不同。
##### 单一的 package.json 设置
就在不久之前，两个 `package.json` 的设置是必需的，但是，感谢 `@electron-userland` 的努力，`electron-packager` 和 `electron-builder` 现在完全支持单一的 `package.json` 设置。

##### 关于 main 进程
在开发过程中，你可能会注意到 `src/main/index.dev.js`。该文件专门用于开发以及安装开发工具。原则上，该文件不应该被修改，但是可以被用来扩展你的开发需求。在构建的过程中，`webpack` 将介入其中并创建一个的捆绑，以 `src/main/index.js` 作为该捆绑的入口文件。
文件树
##### 组织架构
注意: 某些文件或文件夹可能会根据在 `vue-cli` 脚手架中所选设置的不同而有所不同。
```
my-project
├─ .electron-vue
│  └─ <build/development>.js files
├─ build
│  └─ icons/
├─ dist
│  ├─ electron/
│  └─ web/
├─ node_modules/
├─ src
│  ├─ main
│  │  ├─ index.dev.js
│  │  └─ index.js
│  ├─ renderer
│  │  ├─ components/
│  │  ├─ router/
│  │  ├─ store/
│  │  ├─ App.vue
│  │  └─ main.js
│  └─ index.ejs
├─ static/
├─ test
│  ├─ e2e
│  │  ├─ specs/
│  │  ├─ index.js
│  │  └─ utils.js
│  ├─ unit
│  │  ├─ specs/
│  │  ├─ index.js
│  │  └─ karma.config.js
│  └─ .eslintrc
├─ .babelrc
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ package.json
└─ README.md
```
产品构建
```
app.asar
├─ dist
│  └─ electron
│     ├─ static/
│     ├─ index.html
│     ├─ main.js
│     └─ renderer.js
├─ node_modules/
└─ package.json
```
可以说，几乎所有的东西都在最终的产品构建中被删除。在分发 `electron` 应用程序时，这几乎是强制性的，因为你不希望用户下载拥有庞大文件的臃肿的软件。
##### 渲染进程
公共且非业务的 `vue` 组件放进 `src/renderer/components` 里。

业务的 `vue` 组件放进 `src/renderer/views` 里面。

创建子组件时，一个常用的组织化实践是将它们放置在一个使用其父组件名称的新文件夹中。在协调不同的路由时，这一点特别有用。

简而言之，`vue-router` 因为创建单页应用程序 (`Single Page Application`) 在制作 `electron` 程序的时候更加实用。如果没有，那就只能管理一堆  `BrowserWindows`，然后在其之间传达信息。

路由被保存在 `src/renderer/router/index.js` 
在使用 `vue-router` 时，不要使用 `HTML5` 历史模式。 此模式严格用于通过 `http` 协议提供文件，并且不能正常使用 `file` 协议，但是 `electron` 在产品构建中使用此协议提供文件。默认的 `hash` 模式正是我们所需要的。

`electron-vue` 利用 `vuex` 的模块结构创建多个数据存储，并保存在 `src/renderer/store/modules` 中。

多模块数据存储不用考虑不相干业务数据交叉感染，多余组织化来说非常好。但是不要担心导入每一个数据带来的烦恼，因为 `src/renderer/store/modules/index.js` 帮我们处理了这些麻烦事！这个简单的脚本让 `src/renderer/store/index.js` 一次性导入我们所有的模块。

##### 主进程
在 `Electron` 中，运行 `package.json` 主脚本的过程称为主进程 (`main process`)。在主进程中运行的脚本可以通过创建网页来显示其图形化界面。
由于 `main` 进程本质上是一个完整的 `node` 环境，所以除了以下两个文件之外，并没有什么初始的项目结构。

`src/main/index.js`

这个文件是你应用程序的主文件，`electron` 也从这里启动。它也被用作 `webpack` 产品构建的入口文件。所有的 `main` 进程工作都应该从这里开始。
`app/src/main/index.dev.js`

这个文件专门用于开发阶段，因为它会安装 `electron-debug` 和 `vue-devtools`。一般不需要修改此文件，但它可以用于扩展你开发的需求。

由于 `main` 进程是使用 `webpack` 来绑定的，所以使用 `__dirname` 和 `__filename` 将不会在产品阶段给你提供一个预期的值。在产品阶段，`main.js` 被放在了 `dist/electron` 文件夹里面。应根据此点相应地使用 `__dirname` 和 `__filename`。

electron-vue 包含三个单独的、位于 .electron-vue/ 目录中的 webpack 配置文件。除了可选的使用 web 输出以外，main 和 renderer 在安装过程中都是相似的。两者都使用 babel-preset-env 来针对 node@7 的功能特性、使用babili、并把所有的模块都视为 externals。
.electron-vue/webpack.main.config.js
针对 electron 的 main 进程。这种配置是相当简单的，但确实包括一些常见的 webpack 做法。
.electron-vue/webpack.renderer.config.js
针对 electron 的 renderer 进程。此配置用来处理你的 Vue 应用程序，因此它包含 vue-loader 和许多其他可在官方 vuejs-templates/webpack 样板中找到的配置。
白名单里的外部组件
一个关于此配置的重要的事情是，你可以将特定的模块列入白名单，而不是把它视为 webpack 的 externals。并没有很多情况需要这个功能，但在某些情况下，对于提供原始的 *.vue 组件的 Vue UI 库，他们需要被列入白名单，以至于 vue-loader 能够编译它们。另一个使用情况是使用 webpack 的 alias，例如设置 vue 来导入完整的 编译+运行环境 的构建。因此，vue 已经在白名单中了。
.electron-vue/webpack.web.config.js
针对为浏览器构建你的 renderer 进程的源代码。如果你需要把代码发布到网上，此配置则是其强大的起步基础。 electron-vue 不支持更多其他的 Web 输出。 与 Web 输出相关的 Issues 很可能会被推迟或关闭。
(三)	构建electron应用程序
electron-vue 支持使用 electron-packager 和 electron-builder 来构建和分发你的产品阶段的程序。两个构建工具都由了不起的 @electron-userland 社区支持，每个都有详尽的文档。在 vue-cli 脚手架过程中，你会被问到你想要使用哪个构建器。
electron-packager
如果你刚开始制作 electron 应用程序或只需要创建简单的可执行文件，那么 electron-packager 就可以满足你的需求。
electron-builder
如果你正在寻找完整的安装程序、自动更新的支持、使用 Travis CI 和 AppVeyor 的 CI 构建、或本机 node 模块的自动重建，那么你会需要 electron-builder。
具体的更新策略可以阅读我的另一篇文章《Electron自动更新》。
### 六、	开发中存在的问题
#### (一)	内存占用越来越大，运行越来越慢
背景
当应用放很久后，会越来越卡，打开任务管理器发现，electron占用内存很大。
分析
这一大部分原因是electron在牺牲内存占用的基础上，将electron.js封装。所以，本身就比较耗内存，Windows版一上来开4个线程，再加上业务代码用到一些类库。
解决方式
Electron官网上也有介绍（https://www.electronjs.org/docs/tutorial/performance）。
1.	谨慎地加载模块
2.	过早的加载和执行代码
3.	阻塞主进程
4.	阻塞渲染进程
5.	不必要的polyfills
6.	不必要的或者阻塞的网络请求
7.	打包你的代码
#### (二)	electron程序显示了文件浏览器
背景
启动electron-vue项目的时候，会经常出现下图的情况：
 
图 9 文件浏览器
为什么会显示文件浏览器呢？我的应用程序去哪了？
分析
出现上述这个错误，八成就是 src/renderer 包含错误。检查下终端，修复错误，然后用CommandOrControl+R 刷新electron，就可以看到熟悉的应用页面。
如果src/renderer 中出现错误，则会在首次运行时与 ESLint 产生冲突。接着，一个无效的 webpack 的 renderer.js 会被生成出来，它会打断 HtmlWebpackPlugin创建index.html。由于 webpack-dev-server 没有 index.html 可以提供服务，所以服务器失败，程序返回到文件浏览器。
#### (三)	ReferenceError: process is not defined
背景
当你启动electron-vue项目时会遇到process is not defined。
具体报错如下图：
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
原因分析
我本地的node版本是12.3.1，好像更新到12之前就一切正常。看样子，最新版本的node会出现了错误。
解决方式
降低版本这种方式也可以。
除此之外，我从这个issue（https://github.com/SimulatedGREG/electron-vue/issues/871）中得到了解决方法：就是在webpack.web.config.js和webpack.renderer.config.js中的HtmlWebpackPlugin中加入如下代码即可：
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
#### (四)	electron 如何打开开发者工具devtools
背景
开发应用，如果没有开发者工具devtools，那么开发效率会大大降低，用上开发者工具，无论在调试还是测试方面犹如蛟龙出海，游刃有余。
解决方式
利用electron的webContents对象打开及关闭devtools。下面的例子中，我基于main.js中的createWindow中的mainWindow.webContents进行操作的。
打开devtools：
mainWindow.webContents.openDevTools()
默认状态下，开发者工具的位置是上一次工具打开的位置（左边，右边，下边都有可能。取决于上一次的状态，但不会是分离状态，也没有处于顶部的状态）
界面右侧打开devtools：
mainWindow.webContents.openDevTools({mode:'right'})
界面底部打开devtools：
mainWindow.webContents.openDevTools({mode:'bottom'})
界面左侧打开devtools：
mainWindow.webContents.openDevTools({mode:'left'})
分离状态打开devtools：
mainWindow.webContents.openDevTools({mode:'detach'})
mainWindow.webContents.openDevTools({mode:'undocked'})
这两种情况下，devtools都是不和主界面在一起的，都是分离状态。但是 undocked 状态下，这个开发者工具是可以合并到主界面中的。detach状态下，是永久分离的。这个就是两者的区别。
关闭devtools：
mainWindow.webContents.closeDevTools()
#### (五)	找不到electron依赖包
背景
我的应用明明安装了依赖包，却无法找到electron包时，报这个错误：
throw new Error('Electron failed to install correctly, please delete node_modules/electron and try installing again')
原因分析
经测试发现，electron必须要安装在 devDependencies。
找到该代码在源码的位置，见node_modules\electron\index.js：

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

如果是安装在dependencies下，就没有path.txt。那么node就读取不到该文件，抛出electron安装失败的问题。
解决方式
重新安装：
npm install electron --save-dev
#### (六)	electron-vue无法改变vuex状态
背景
Electron-vue中添加vuex插件后，却无法使用。组件间根本无法改变vuex数据状态。
解决方案
首先，vuex-electron 的文档里写了：
In case if you enabled createSharedMutations() plugin you need to create an instance of store in the main process. To do it just add this line into your main process (for example src/main.js):
import './path/to/your/store'
意思是如果启用了createSharedMutations() 的插件，需要在主进程中创建一个store的实例，在主进程中(例如src/main.js)添加store实例。
是否启用了createSharedMutations插件，见src\renderer\store\index.js文件：
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
开启多窗口共享后，在主进程加上这一句就行了，见src\main\index.js文件：
import '../renderer/store'
重启程序即可。
如果应用中，不需要多窗口共享状态，就不需要在主进程中添加stote实例，将store实例中createSharedMutations方法去掉。
#### (七)	electron-vue中无法使用Element组件
背景
应用需要集成第三方ui组件，比如element-ui，但是导入组件后却无法使用。
解决方案
查看这个issue（https://github.com/SimulatedGREG/electron-vue/issues/361）： 
Okay, I am able to reproduce this issue now. It seems element-ui falls into that category of modules that need to be white-listed. If you go into .electron-vue/webpack.renderer.config.js, around line 21, you can add element-ui to the whiteListedModules list. After making that change, tooltips will work as expected.
大概的意思是似乎element-ui并不属于这一类的模块，需要那些列入“白名单”,如果你进入electron-vue/webpack.renderer.config.js。
在大约 21 行左右找到 let whiteListedModules 将 element-ui 添加进去：
let whiteListedModules = ['vue', 'element-ui', 'vuetify']

let rendererConfig = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    renderer: path.join(__dirname, '../src/renderer/main.js')
  },
  externals: [
    ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))
  ],
一个关于此配置的重要的事情是，可以将特定的模块列入白名单，而不是把它视为 webpack 的 externals。并没有很多情况需要这个功能，但在某些情况下，对于提供原始的 *.vue 组件的 Vue UI 库，他们需要被列入白名单，以至于 vue-loader 能够编译它们。另一个使用情况是使用 webpack 的 alias，例如设置 vue 来导入完整的 编译+运行环境 的构建。因此，vue 已经在白名单中了。
#### (八)	Electron无边框窗口中自定义窗口快捷键
背景
  mainWindow = new BrowserWindow({
    height: 720,
    minHeight: 720,
    minWidth: 1080,
    width: 1080,
    frame: false
  })
设置了frame为false后，electron就隐藏了工具栏，所有窗口都变成了无边框窗口。因此，窗口中缺少了必要的最小化、最大化、关闭的窗口快捷键。
解决方案
首先在windowOperate.vue页面中写入三个按钮，并将事件绑定：
 // 从渲染器进程到主进程的异步通信。
// 使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主进程。
const {
    ipcRenderer
} = require('electron')

onMinusSm () {
    ipcRenderer.send('min')
},
onRectangle () {
    ipcRenderer.send('max')
},
onCross () {
    ipcRenderer.send('window-close')
}
上面三个方法的意思是：给主进程发送同步消息，触发特定的事件。onMinusSm 方法中 ipcRenderer 发送 min 事件，主进程就可以监听 min 事件。
在src/main/index.js中：
const {
  // 从主进程到渲染进程的异步通信。
  ipcMain
} = require('electron')

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
主进程监听渲染进程的三个事件。如：主进程监听 min ，触发最小化窗口的方法。
注意：mainWindow.close() 不能关闭程序，需要使用 app.exit() 来关闭。
#### (九)	监听窗口状态，动态改变窗口最大化图标
背景
上一个问题解决了窗口最小化、最大化、关闭的窗口快捷键。但是，还缺少动态改变窗口最大化的快捷键。
解决方案
在 windowOperate.vue 中监听 main-window-max 事件，触发展示缩小图标； 在 windowOperate.vue 中监听 main-window-unmax 事件，触发展示最大化图标：
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
在 src/main/index.js 让主进程监听窗口 maximize 和 unmaximize 向子进程发送事件消息：
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
#### (十)	electron Uncaught TypeError: Cannot read property 'app' of undefined
背景
electron-vue 这个项目有一些缺陷，启动项目的时候会报错：
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
解决方案
给主窗口添加 enableRemoteModule 属性，使用remote模块：
mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

## 总结
本文介绍了桌面应用程序的历史、electron的历史和electron-vue的项目。
Electron的应用程序结构分为主进程和渲染进程、electron的api和nodejs的api三大块。
从介绍electron-vue的项目结构，到构建应用程序，上手electron项目，完成一个简单的electron项目。
还通过分析开发中存在的一些问题，加深了对electron的了解。
