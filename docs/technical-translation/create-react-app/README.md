# 【Github】Create React App说明文档
[![Build Status](https://dev.azure.com/facebook/create-react-app/_apis/build/status/facebook.create-react-app?branchName=master)](https://dev.azure.com/facebook/create-react-app/_build/latest?definitionId=1&branchName=master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/facebook/create-react-app/blob/master/CONTRIBUTING.md)

创建没有构建配置的 `React` 应用程序。

- [Creating an App](#creating-an-app) –如何创建一个软件.
- [User Guide](https://facebook.github.io/create-react-app/) – 如何使用Create React App开发应用程序。

在 `macOS, Windows, and Linux` 平台上创建 `React App` 。
如果有问题, 请访问 [file an issue](https://github.com/facebook/create-react-app/issues/new).<br>
如果有问题需要帮助，请访问 [GitHub Discussions](https://github.com/facebook/create-react-app/discussions).

## 快速概览

```sh
npx create-react-app my-app
cd my-app
npm start
```

如果你通过全局安装 `npm install -g create-react-app`安装了 `create-react-app` , 我们推荐你用 `npm uninstall -g create-react-app` `or` `yarn global remove create-react-app`来卸载这个包确保`npx`.

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

然后打开 [http://localhost:3000/](http://localhost:3000/) 来看你的 `app`。
当你准备部署这个程序, 用 `npm run build` 打包。

<p align='center'>
<img src='https://cdn.jsdelivr.net/gh/facebook/create-react-app@27b42ac7efa018f2541153ab30d63180f5fa39e0/screencast.svg' width='600' alt='npm start'>
</p>

### 快速开始

你不需要去安装或配置像 `webpack` 或 `babel` 的工具。
它们是预先配置和隐藏的，以便您可以将注意力集中在代码上。

创建一个项目，您就可以开始了。

## 创建一个app

在你本地开发机器上，你必须要有 `Node 8.16.0 or Node 10.16.0` 或者更新的版本 (但是在服务器上不需要)。你可以用 [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) 或者 [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) 在不同的项目之间切换 `node`。

为了创建一个 `app`，需要选择下面一种方法:

### npx

```sh
npx create-react-app my-app
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) 是npm 5.2及更高版本附带的一个包运行器工具，请参阅旧npm版本的说明)](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

### npm

```sh
npm init react-app my-app
```

_`npm init <initializer>` `npm 6+` 是否可用

### Yarn

```sh
yarn create react-app my-app
```

_[`yarn create <starter-kit-package>`](https://yarnpkg.com/lang/en/docs/cli/create/) `Yarn 0.25+` 是否可用

在当前文件夹下将创建一个叫 `my-app`的目录。
在 `my-app` 目录里, 它将生成初始项目结构并安装传递依赖项:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
    └── setupTests.js
```

没有配置或复杂的文件夹结构，只有文件你需要建立你的应用。
安装完成后，您可以打开您的项目文件夹:

```sh
cd my-app
```

在新创建的项目中，您可以运行一些内置命令:

### `npm start` or `yarn start`

在开发模式下运行 `app`
打开 [http://localhost:3000](http://localhost:3000) 以在浏览器中查看它。

如果您对代码进行了更改，页面将自动重新加载。
您将在控制台中看到构建错误和 `lint` 警告。
<p align='center'>
<img src='https://cdn.jsdelivr.net/gh/marionebl/create-react-app@9f6282671c54f0874afd37a72f6689727b562498/screencast-error.svg' width='600' alt='Build errors'>
</p>

### `npm test` or `yarn test`

以交互模式运行测试监视器。
默认情况下，运行与自上次提交以来更改的文件相关的测试。

[阅读更多测试](https://facebook.github.io/create-react-app/docs/running-tests)

### `npm run build` or `yarn build`

将生产应用程序构建到构建文件夹中。
它正确地在生产模式下对捆绑包做出反应，并优化构建以获得最佳性能。

构建被缩小，文件名中包含 `hashes`。您的应用程序已经准备好部署了。

## 使用指导

You can find detailed instructions on using Create React App and many tips 在 [文档](https://facebook.github.io/create-react-app/)你可以发现使用 `Create React App` 和很多技巧的详细的介绍。
`
## 如何更新新的版本?

有关于此信息，请参阅 [用户指南](https://facebook.github.io/create-react-app/docs/updating-to-new-releases)。

## 人生观

- **一个依赖:** 只有一个构建依赖关系。
它使用 `webpack、Babel、ESLint` 和其他令人惊叹的项目，但是在它们之上提供了一种内聚的策划体验。

- **不需要配置:** 您不需要配置任何东西。为您处理开发和生产构建的相当好的配置，这样您就可以专注于编写代码。

- **没有锁定:** 您可以在任何时候弹出自定义设置。
运行一个命令，所有的配置和构建依赖项都将直接转移到您的项目中，这样您就可以从您停止的地方继续。

## 包括什么?

你的环境将有一切你需要建立一个现代单页 `React` 应用:

- React, JSX, ES6, TypeScript and Flow 语法的支持。
- ES6之外的额外语言，比如对象扩展操作符。
- 一个快速的交互式单元测试运行器，内置了对覆盖率报告的支持。
- 对常见错误发出警告的动态开发服务器。
- 一个构建脚本，将用于生产的JS、CSS和图像与hashes和源代码捆绑在一起。
- 一个首先 [service worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) 和一个 [web app manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/), meeting all the [Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app) criteria. (_Note: Using the service worker is opt-in as of `react-scripts@2.0.0` and higher_)
- 使用单一依赖项对上述工具进行无麻烦的更新。

查看这个 [指南](https://github.com/nitishdayal/cra_closer_look)，了解这些工具是如何组合在一起的。

权衡的结果是， **these tools are preconfigured to work in a specific way**。如果您的项目需要更多的自定义，您可以 ["eject"](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject) 并自定义它，但随后您将需要维护此配置。

## 受欢迎的选择

`Create React App is a great fit for`:

- 学习React在一个舒适和功能丰富的开发环境。
- 启动新的单页React应用程序。
- 使用React为库和组件创建示例。

这里有一些常见的情况，你可能会想尝试一些其他的东西:

- 如果您想尝试在没有数百个传递构建工具依赖的情况下 **try React** ，可以考虑[使用单个HTML文件或在线沙箱](https://reactjs.org/docs/try-react.html).

- 如果您需要**将React代码与服务器端模板框架** (如Rails、Django或Symfony)集成，或者如果您**n不是在构建一个单页应用程序**,那么可以考虑使用[nwb](https://github.com/insin/nwb)或[Neutrino](https://neutrino.js.org/) ，它们更灵活。对于Rails，你可以使用[Rails Webpacker](https://github.com/rails/webpacker).。对于Symfony，试试 [Symfony's webpack Encore](https://symfony.com/doc/current/frontend/encore/reactjs.html).

- 如果你需要去 **发布 a React 应用**, [nwb](https://github.com/insin/nwb) [也可以做这些](https://github.com/insin/nwb#react-components-and-libraries),  [Neutrino's react-components preset](https://neutrino.js.org/packages/react-components/)也可以.

- 如果你想用React and Node.js做**服务器呈现**, 检查 [Next.js](https://github.com/zeit/next.js/) 或者 [Razzle](https://github.com/jaredpalmer/razzle). Create React App不知道后台，只生成静态的HTML/JS/CSS包。

- 如果你的网站是 **主要是静态的** (for example, a portfolio or a blog), 考虑用 [Gatsby](https://www.gatsbyjs.org/) 。与Create React应用程序不同，它在构建时将网站预渲染为HTML。

- 最后你需要 **更多信息**, 查看 [Neutrino](https://neutrino.js.org/) 还有 [React preset](https://neutrino.js.org/packages/react/).

上面所有的工具都可以在很少或不需要配置的情况下工作。

如果您喜欢自己配置构建，[follow this guide](https://reactjs.org/docs/add-react-to-an-existing-app.html).

## React Native

寻找类似的东西，比如 `React Native`?
请访问[Expo CLI](https://github.com/expo/expo-cli)。
## Contributing

We'd love to have your helping hand on `create-react-app`! See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## Credits

This project exists thanks to all the people who [contribute](CONTRIBUTING.md).<br>
<a href="https://github.com/facebook/create-react-app/graphs/contributors"><img src="https://opencollective.com/create-react-app/contributors.svg?width=890&button=false" /></a>

Thanks to [Netlify](https://www.netlify.com/) for hosting our documentation.

## Acknowledgements

We are grateful to the authors of existing related projects for their ideas and collaboration:

- [@eanplatter](https://github.com/eanplatter)
- [@insin](https://github.com/insin)
- [@mxstbr](https://github.com/mxstbr)

## License

Create React App is open source software [licensed as MIT](https://github.com/facebook/create-react-app/blob/master/LICENSE).
