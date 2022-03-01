# Create React App [![Build Status](https://dev.azure.com/facebook/create-react-app/_apis/build/status/facebook.create-react-app?branchName=main)](https://dev.azure.com/facebook/create-react-app/_build/latest?definitionId=1&branchName=main) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/facebook/create-react-app/blob/main/CONTRIBUTING.md)

<img alt="Logo" align="right" src="https://create-react-app.dev/img/logo.svg" width="20%" />

创建没有构建配置的React应用程序。

- [Creating an App](#creating-an-app) – 如何去创建一款新的 app.
- [User Guide](https://facebook.github.io/create-react-app/) – 如何使用 Create React App 开发应用。

Create React App 工作于 macOS, Windows, and Linux.<br>
如果不能运行, 请 [file an issue](https://github.com/facebook/create-react-app/issues/new).<br>
如果你有问题或需要帮助，请询问 [GitHub Discussions](https://github.com/facebook/create-react-app/discussions).

## 快速概述

```sh
npx create-react-app my-app
cd my-app
npm start
```

如果你之前已经通过 `npm install -g create-react-app`全局安装了 `create-react-app` ，我们建议你使用 `npm uninstall -g create-react-app` 或 `yarn global remove create-react-app` 来卸载该包，以确保npx总是使用最新版本。

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

然后打开 [http://localhost:3000/](http://localhost:3000/) 查看应用程序。<br>
当你准备部署到生产环境时，用 `npm run build`创建一个简化包。

<p align='center'>
<img src='https://cdn.jsdelivr.net/gh/facebook/create-react-app@27b42ac7efa018f2541153ab30d63180f5fa39e0/screencast.svg' width='600' alt='npm start'>
</p>

### Get Started Immediately

您**不需要**安装或配置 webpack 或 Babel 等工具<br>
它们是预先配置和隐藏的，因此您可以专注于代码。

创建一个项目，你就可以开始了。
## Creating an App

**您需要在本地开发机器上拥有Node 14.0.0或更高版本** (but it’s not required on the server). We recommend using the latest LTS version. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

要创建一个新的应用程序，你可以选择以下方法之一:

### npx

```sh
npx create-react-app my-app
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

### npm

```sh
npm init react-app my-app
```

_`npm init <initializer>` is available in npm 6+_

### Yarn

```sh
yarn create react-app my-app
```

_[`yarn create <starter-kit-package>`](https://yarnpkg.com/lang/en/docs/cli/create/) is available in Yarn 0.25+_

它将在当前文件夹中创建一个名为 `my-app` 的目录<br>
在该目录中，它将生成初始项目结构并安装传递依赖项:
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

没有配置或复杂的文件夹结构，只有你需要构建你的应用程序的文件

安装完成后，你可以打开你的项目文件夹:

```sh
cd my-app
```

在新创建的项目中，你可以运行一些内置命令:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

如果您对代码进行更改，页面将自动重新加载

您将在控制台中看到构建错误和lint警告。

<p align='center'>
<img src='https://cdn.jsdelivr.net/gh/marionebl/create-react-app@9f6282671c54f0874afd37a72f6689727b562498/screencast-error.svg' width='600' alt='Build errors'>
</p>

### `npm test` or `yarn test`

以交互模式运行测试监视程序

默认情况下，运行与上次提交后更改的文件相关的测试。

[Read more about testing.](https://facebook.github.io/create-react-app/docs/running-tests)

### `npm run build` or `yarn build`

在 `build` 文件夹中构建用于生产的应用程序

它正确地在生产模式下捆绑React，并优化构建以获得最佳性能。

构建被缩小，文件名包括哈希值

您的应用程序已经准备好部署了。
## User Guide

你可以找到使用Create React App的详细说明和许多提示[its documentation](https://facebook.github.io/create-react-app/).

## How to Update to New Versions?

请参阅 [User Guide](https://facebook.github.io/create-react-app/docs/updating-to-new-releases) 了解这些信息和其他信息。

## 哲学

- **One Dependency:** 只有一个构建依赖项。
它使用webpack、Babel、ESLint和其他 amazing 的项目，但在它们之上提供了一种有凝聚力的策划体验。

- **No Configuration Required:** 您不需要配置任何东西。
为您处理了开发和生产构建的合理的良好配置，因此您可以专注于编写代码。

- **不锁定:** 您可以“弹出”到自定义设置在任何时候。
运行一个命令，所有的配置和构建依赖项都将被直接转移到项目中，因此您可以从停止的地方继续。
 
## What’s Included?

你的环境将具备构建一个现代单页面React应用所需的一切:

- React, JSX, ES6, TypeScript and Flow syntax support.
- ES6之外的额外语言，比如对象扩展运算符。
- Autoprefixed CSS，所以你不需要 `-webkit-` 或其他前缀。 
- 一个快速的交互式单元测试运行器，内置了对覆盖率报告的支持。
- 一个对常见错误发出警告的实时 development 服务器。
- 一个构建脚本，用于捆绑JS, CSS和图像，用于生产，hashes 和 sourcemaps。
- -一个离线优先的 [service worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) and a [web app manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/), meeting all the [Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app) criteria. (_Note: Using the service worker is opt-in as of `react-scripts@2.0.0` and higher_)
- Hassle-free updates for the above tools with a single dependency.

Check out [this guide](https://github.com/nitishdayal/cra_closer_look) 了解这些工具如何组合在一起。

The tradeoff is that **these tools are preconfigured to work in a specific way**. If your project needs more customization, you can ["eject"](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject) and customize it, but then you will need to maintain this configuration.

## 受欢迎的选择

Create React App 非常适合:

- **Learning React** 在一个舒适和功能丰富的开发环境中。
- **Starting new single-page React applications.**
- **Creating examples** 为您的库和组件使用React。

以下是一些常见的情况，你可能会想要尝试一些其他的东西:

- 如果你想在没有数百个传递构建工具依赖项的情况下 **try React** ，请考虑[using a single HTML file or an online sandbox instead](https://reactjs.org/docs/try-react.html).

- 如果你需要将**integrate React code with a server-side template framework** ，比如Rails、Django或Symfony，或者你 **not building a single-page app**，consider using [nwb](https://github.com/insin/nwb), or [Neutrino](https://neutrino.js.org/) which are more flexible. For Rails specifically, you can use [Rails Webpacker](https://github.com/rails/webpacker). For Symfony, try [Symfony's webpack Encore](https://symfony.com/doc/current/frontend/encore/reactjs.html).

- If you need to **publish a React component**, [nwb](https://github.com/insin/nwb) can [also do this](https://github.com/insin/nwb#react-components-and-libraries), as well as [Neutrino's react-components preset](https://neutrino.js.org/packages/react-components/).

- If you want to do **server rendering** with React and Node.js, check out [Next.js](https://nextjs.org/) or [Razzle](https://github.com/jaredpalmer/razzle). Create React App is agnostic of the backend, and only produces static HTML/JS/CSS bundles.

- If your website is **mostly static** (for example, a portfolio or a blog), consider using [Gatsby](https://www.gatsbyjs.org/) or [Next.js](https://nextjs.org/). Unlike Create React App, Gatsby pre-renders the website into HTML at build time. Next.js supports both server rendering and pre-rendering.

- Finally, if you need **more customization**, check out [Neutrino](https://neutrino.js.org/) and its [React preset](https://neutrino.js.org/packages/react/).

以上所有工具都可以在很少或不需要配置的情况下工作。

If you prefer configuring the build yourself, [follow this guide](https://reactjs.org/docs/add-react-to-an-existing-app.html).

## React Native

Looking for something similar, but for React Native?<br>
Check out [Expo CLI](https://github.com/expo/expo-cli).

## Contributing

We'd love to have your helping hand on `create-react-app`! See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## Supporting Create React App

Create React App is a community maintained project and all contributors are volunteers. If you'd like to support the future development of Create React App then please consider donating to our [Open Collective](https://opencollective.com/create-react-app).

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

Create React App is open source software [licensed as MIT](https://github.com/facebook/create-react-app/blob/main/LICENSE). The Create React App logo is licensed under a [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/).
