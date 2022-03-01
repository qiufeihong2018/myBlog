---
title: Installation
order: 1
---

# Installation

本文档描述了人们使用React生态系统中的各种工具使用React路由器的最常见方式。

- [Basic Installation](#basic-installation)
- [Create React App](#create-react-app)
- [Parcel](#parcel)
- [Webpack](#webpack)
- [HTML Script Tags](#html-script-tags)
- [React Native](#react-native)

## Basic Installation

大量的先导React 项目管理着他们的依赖使用像[npm](https://www.npmjs.com/) 或者 [Yarn](https://yarnpkg.com/) 的包管理器。为了添加 React Router 到一个已经存在的项目，第一件事情就是你必须安装需要的依赖用你选择的工具。

<details>
<summary>npm</summary>

```sh
$ npm install history@5 react-router-dom@6
```

</details>

<details>
<summary>Yarn</summary>

```sh
$ yarn add history@5 react-router-dom@6
```

</details>

<details>
<summary>pnpm</summary>

```sh
$ pnpm add history@5 react-router-dom@6
```

</details>

## Create React App

按照 [React documentation to set up a new project with Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) 手册去做, 然后按照 [the installation instructions above](#basic-installation) 去安装 React Router 在你的项目中。

一旦你的项目被创建并且 React Router 被安装, 在你的文档编辑器中打开 `src/index.js` 。从 `react-router-dom` 导入 `BrowserRouter` 在你的文件顶部，并将你的应用包装在 `<Router>`:

```js [3, 9-11]
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```
现在，你可以在你的应用中使用 React Router ! 例如，打开 `src/App.js` 并且替换一些默认的路由标记：

```js [2, 8-12]
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}
```

现在，仍然在 `src/App.js`, 创建路由组件:

```js
// App.js
function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
```

通过运行 `npm start`来启动你的应用程序， 当你的应用程序开始运行时，你应该会看到  `Home` 路径。 点击 "About" 链接查看您的 `<About>` 路线，瞧!你使用 Create React App已经成功设置React Router! 🥳

当需要将应用部署到生产环境时，请务必遵循 [Create React App's instructions](https://create-react-app.dev/docs/deployment#serving-apps-with-client-side-routing) on deploying with React Router to be sure your server is configured correctly.

## Parcel

按照[Parcel documentation to set up a new project](https://parceljs.org/getting_started.html)手册中的说明去做, then follow [the installation instructions above](#basic-installation) to install React Router in your project.

在你项目的 `package.json`, 添加一个 `start` 脚本，那么你就可以在开发过程中打开你的项目在一个浏览器中。

```json [2]
"scripts": {
  "start": "parcel index.html"
}
```

一旦项目设置好并安装了依赖项，创建一个新的 `.babelrc` 在你的根目录中:

```json
{
  "presets": ["@babel/preset-react"]
}
```

在你的项目中转到 `index.js` 并且导入必须的方法从 `react`, `react-dom` 和 `react-router-dom` 并且挂载在一个 React app 用 `div` 绑定在 `root` 的 id 上:

```js
// index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

在你的 `index.html`, 在脚本标记上方的文档主体中创建根div。这提供的 `noscript` 很有帮助，给可能禁用JavaScript的用户的回复消息，除非你计划稍后在服务器上呈现你的应用程序。

```html
<body>
  <noscript
    >You need to enable JavaScript to run this
    app.</noscript
  >
  <div id="root"></div>
  <script src="./index.js"></script>
</body>
```
现在React和React Router已经设置好了，创建一个新文件  `App.js` 并添加一些路由和组件:


```js
// App.js
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <h1>Welcome to React Router!</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;
```

现在通过运行  `npm start` 启动你的应用程序，当你的应用程序开始运行时，你应该看到`Home` 路径。
点击 "About" 链接查看你的 `About` 路线，瞧!
您成功设置React路由器使用 Parcel!
🥳
## Webpack

按照手册中的说明去做 [webpack documentation to set up a new project](https://webpack.js.org/guides/getting-started/), then follow [the installation instructions above](#basic-installation) to install React Router in your project.

在webpack中建立一个新的React项目比Parcel或Create React App要复杂一些。因为webpack是一个低级的工具，它允许你根据自己的爱好调整你的构建，你可能想要阅读 [webpack documentation](https://webpack.js.org/) or check out [webpack configurations in other repos](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js) 了解如何建立你自己的.

一旦你配置好webpack并安装了必要的依赖项，在你代码的某个地方(可能是React组件树的根)，你可以从 `react-router-dom` 中 `import` 你需要的模块。
```js
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Hello, React Router!</h1>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

## HTML脚本标签

一个最快的方法添加React和React路由器到一个网站是使用好的ol' `<script>` 标签和全局变量。
React Router与React 16.8+兼容。
只需添加以下 `<script>` 标签到你的HTML，就在关闭 `</body>` 标签之前:
```html
 <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
</head>

<body>
<!-- Other HTML for your app goes here -->
  <!-- The node we will use to put our app in the document -->
  <div id="root"></div>

  <!-- Note: When deploying to production, replace "development.js"
       with "production.min.js" in each of the following tags -->

  <!-- Load React and React DOM -->
  <!-- See https://reactjs.org/docs/add-react-to-a-website.html to learn more -->
  <script src="https://unpkg.com/react@>=16.8/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@>=16.8/umd/react-dom.development.js" crossorigin></script>

  <!-- Load history -->
  <script src="https://unpkg.com/history@5/umd/history.development.js" crossorigin></script>

  <!-- Load React Router and React Router DOM -->
  <script src="https://unpkg.com/react-router@6/umd/react-router.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-router-dom@6/umd/react-router-dom.development.js" crossorigin></script>

  <!-- A simple example app -->
  <script>
  var e = React.createElement;
  var Router = ReactRouterDOM.BrowserRouter;
  var Routes = ReactRouterDOM.Routes;
  var Route = ReactRouterDOM.Route;

  ReactDOM.render(
    (
      e(Router, null, (
        e(Routes, null, (
          e(Route, {
            element: e('div', null, 'Hello, React Router!')
          })
        ))
      ))
    ),
    document.getElementById('root')
  );
  </script>

</body>

</html>

```

尽管这个方法是一个不错的方式,可以快速启动和运行,它加载一些代码,你可能不会利用应用。React Router 设计为许多小的集合组件和功能,允许您使用尽可能少的你真正需要的库。

为了做到这一点，你需要使用JavaScript捆绑器构建你的网站，比如[Webpack](#webpack) or [Parcel](#parcel)。
本页面的其余安装方法描述了如何开始使用这些工具。
## React Native

TODO:
