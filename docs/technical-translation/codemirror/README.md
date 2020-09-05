# 【译】CodeMirror的说明文档

[![Build Status](https://travis-ci.org/codemirror/CodeMirror.svg)](https://travis-ci.org/codemirror/CodeMirror)
[![NPM version](https://img.shields.io/npm/v/codemirror.svg)](https://www.npmjs.org/package/codemirror)
[![Join the chat at https://gitter.im/codemirror/CodeMirror](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/codemirror/CodeMirror)  

`CodeMirror` 是一个通用的文本编辑器，用 `JavaScript` 实现
浏览器。它专门用于编辑代码，并随附而来
 `100` 种语言模式和各种插件，实现更高级
编辑功能。每种语言都有完全功能的代码
以及语法高亮显示，以帮助阅读和编辑复杂代码。

提供了丰富的编程 `API` 和 `CSS` 主题化系统
定制 `CodeMirror` 以适合您的应用程序，并使用
新功能。

你可以发现更多信息 (和
[手册](https://codemirror.net/doc/manual.html)) 在 [项目页](https://codemirror.net). 问题和讨论, 用这个
[讨论区](https://discuss.codemirror.net/).

看
[CONTRIBUTING.md](https://github.com/codemirror/CodeMirror/blob/master/CONTRIBUTING.md)
为贡献指导方针.

这个codemirror社区主要是欢迎所有人.我们用这
[Contributor Covenant
(1.1)](http://contributor-covenant.org/version/1/1/0/)作为我们代码准则行为。

### 安装

或是获得最新版本的[zip 文件](https://codemirror.net/codemirror.zip) , 或者确保您有 [Node](https://nodejs.org/)
去安装并运行:

    npm install codemirror

**注意**:这是库的源存储库，而不是发布通道。
克隆它并不是安装库的推荐方法，而且除非您也运行构建步骤，否则实际上无法工作。

### 快速开始

为了创建项目，确保你有安装 Node.js (最低版本 6)
并且执行了 `npm install`. 为了运行, 只需要打开 `index.html` 在你的浏览器中 (你不需要运行一个web服务器). 用 `npm test` 去运行测试.
