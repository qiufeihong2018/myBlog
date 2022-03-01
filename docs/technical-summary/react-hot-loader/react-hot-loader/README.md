# React 热加载 Loader

[![Build Status][build-badge]][build]
[![version][version-badge]][package]
[![MIT License][license-badge]][LICENSE]

[![PRs Welcome][prs-badge]][prs]
[![Chat][chat-badge]][chat]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]

实时调整React组件 ⚛️⚡️

Watch **[Dan Abramov's talk on Hot Reloading with Time Travel](https://www.youtube.com/watch?v=xsSnOQynTHs).**

## Install

```
npm install --save react-hot-loader
```
> 注意:你可以安全地将react-hot-loader安装为常规依赖项，而不是开发依赖项，因为它会自动确保它不会在生产环境中执行，并且占用空间很小。
## Getting started

1. Add `react-hot-loader/babel` to your `.babelrc`:

```js
// .babelrc
{
  "plugins": ["react-hot-loader/babel"]
}
```

2. [Enable Hot Module Replacement in Webpack](https://webpack.js.org/guides/hot-module-replacement/#enabling-hmr)

3. Add `react-hot-loader/patch` at the top of the entry section (except polyfills) of your Webpack config:

```js
// webpack.config.js
module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './main.js'
  ]
}
```

> 注意:确保设置 `output.publicPath` 。
也可以将 `output.publicPath` 属性设置为`"/"` 。
否则，对于嵌套路由，热加载将无法正常工作。

4. 将你的应用打包到 `<AppContainer>`中， `<AppContainer>`的所有子元素都会在发生变化时被重新加载:
```js
// main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './containers/App'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App) })
}
```

> 注意:要使这个工作，你需要通过更改Babel ES2015预设来选择退出Babel transpiling ES2015模块`["es2015", { "modules": false }]`
## 使用Webpack loader而不是Babel插件
你不能在你的项目中使用Babel, React Hot Loader提供了一个Webpack Loader **[limited support](https://github.com/gaearon/react-hot-loader#known-limitations)**.如果你想使用它，你可以在你的Webpack配置中添加它。 **如果您使用Babel，则不需要添加这个 loader**.

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['react-hot-loader/webpack']
      }
    ]
  }
}
```

## 从 [create-react-app](https://github.com/facebookincubator/create-react-app)迁移

* Run `npm run eject`
* Install React Hot Loader (`npm install --save-dev react-hot-loader`)
* In `config/webpack.config.dev.js`:
  1. Add `'react-hot-loader/patch'` to entry array (anywhere before `paths.appIndexJs`). It should now look like (excluding comments):
  ```js
    entry: [
      'react-hot-loader/patch',
      require.resolve('react-dev-utils/webpackHotDevClient'),
      require.resolve('./polyfills'),
      paths.appIndexJs
    ]
  ```

  2. Add `'react-hot-loader/babel'` to Babel loader configuration. The loader should now look like:
  ```js
    // Process JS with Babel.
    {
      test: /\.(js|jsx)$/,
      include: paths.appSrc,
      loader: require.resolve('babel-loader'),
      options: {
  
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: true,
        plugins: [
          'react-hot-loader/babel'
        ]
      },
    },
  ```

* Add `AppContainer` to `src/index.js` (see step 4 of Getting Started).

## TypeScript

当使用TypeScript时，Babel不是必需的，所以你的配置应该如下所示 ([demo](https://github.com/Glavin001/react-hot-ts)):

```js
{
  test: /\.tsx?$/,
  loaders: ['react-hot-loader/webpack', 'ts-loader'] // (or awesome-typescript-loader)
}
```

## Source Maps

如果你使用 `devtool: 'source-map'` (或类似的)，源映射将被释放以隐藏热加载代码。

源映射降低了项目的速度。
使用 `devtool: 'eval'` 获得最佳构建性能。

热重载代码只在每个模块的开头和结尾各一行，所以您可能根本不需要源代码映射。
## React Native

React Native **[supports hot reloading natively](https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html)** as of version 0.22.

## 添加自定义错误报告程序
先前使用的 `Redbox` 的React热加载器有已知的限制，由于sourcemaps，它不再是默认的捕获器。

错误可以清楚地看到渲染问题，并避免未捕获的错误破坏你的应用。但在控制台抛出错误也有一些好处，如通过sourcemaps解析文件名，并单击打开。
为了让 `Redbox` 回归，并同时拥有这两个世界的优点，请修改你的应用入口点如下:
```js
import Redbox from 'redbox-react';

const CustomErrorReporter = ({ error }) => <Redbox error={ error } />;

CustomErrorReporter.propTypes = {
  error: React.PropTypes.instanceOf(Error).isRequired
};

render((
  <AppContainer errorReporter={ CustomErrorReporter }>
    <AppRoot />
  </AppContainer>
), document.getElementById('react-root'));
```

You'll also need to `npm install --save-dev redbox-react`.

## 禁用警告

React Hot Loader默认情况下会对热加载程序不接受的组件发出警告。
如果你想禁用这些警告，你可以传递一个 `warnings` prop，值为 `false`给`AppContainer`。
```js
<AppContainer warnings={false}>
  ...
</AppContainer>
```  

## Starter Kit

Provided by collaborators:
* [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate/tree/next) (Bare minimum)
* [react-hot-loader-minimal-boilerplate](https://github.com/wkwiatek/react-hot-loader-minimal-boilerplate)* (Bare minimum)

Provided by community:
* [react-kit](https://github.com/thomasthiebaud/react-kit) (webpack v2, redux, react-router v4, code splitting, jest, saga, reselect)
* [hapi-react-hot-loader-example](https://github.com/codeBelt/hapi-react-hot-loader-example) (ES2015, Universal (SSR), React Hot Loader 3, React Router 4, Redux, Redux Saga, Redux Form, Async Component Code Splitting, Hapi, Webpack 3)
* [typescript-hapi-react-hot-loader-example](https://github.com/codeBelt/typescript-hapi-react-hot-loader-example) (TypeScript, Universal (SSR), React Hot Loader 3, React Router 4, Redux, Redux Saga, Redux Form, Async Component Code Splitting, Hapi, Webpack 3)
* [react-redux-styled-hot-universal](https://github.com/krasevych/react-redux-styled-hot-universal) (SSR, Universal Webpack, Redux, React-router, Webpack 2, Babel, Styled Components and more...)
* [webpack-react-redux](https://github.com/jpsierens/webpack-react-redux) (redux, react-router, hmr)
* [react-lego](https://github.com/peter-mouland/react-lego) (universal, react-router, other optional techs)
* [react-static-boilerplate](https://github.com/koistya/react-static-boilerplate) (static site generator; React, PostCSS, Webpack, BrowserSync)
* [react-cool-starter](https://github.com/wellyshen/react-cool-starter) (universal, redux, react-router, webpack 2, Babel, PostCSS, and more...)
* [react-redux-saga-boilerplate](https://github.com/gilbarbara/react-redux-saga-boilerplate) (react-router, redux, saga, webpack 2, jest w/ coverage, enzyme)
* [react-universal-boiler](https://github.com/strues/react-universal-boiler) (webpack 2, universal, react-router, redux, happypack)
* [apollo-fullstack-starter-kit](https://github.com/sysgears/apollo-fullstack-starter-kit) (universal, apollo, graphql, react, react-router, knex)
* [react-universally](https://github.com/ctrlplusb/react-universally) (universal, react, react router, express, seo, full stack webpack 2, babel)
* [meatier](https://github.com/mattkrick/meatier) (webpack 2 + hmr, universal, redux, graphql, react, react-router-redux, ssr)
* [react-hot-ts](https://github.com/Glavin001/react-hot-ts) (React, Webpack, TypeScript)
* [react-boilerplate-app](https://github.com/vebjorni/react-boilerplate-app) (react (duh), router, webpack with dev server, babel, hot reloading)
* [react-native-web](https://github.com/agrcrobles/react-native-web-webpack-starter) (react-native-web, webpack with dev server, hot reloading and flow soon...)
* [react-starter-kit](https://github.com/elios264/react-starter) (webpack 2 + htr + react + redux + router + babel + sass)
* [redux-react-starter](https://github.com/didierfranc/redux-react-starter) (webpack 2 + redux + react-redux 5 + react-router 4 + styled-component ...)
* [react-redux-universal-boilerplate](https://github.com/kiki-le-singe/react-redux-universal-boilerplate) (redux, react-router, universal, koa, webpack 2, babel, PostCSS, sass or cssnext, hot reloading, ...)
* [ARc](https://arc.js.org) (React, Jest, Storybook and other optional feature branches)
* [webpack-react-redux-starter](https://github.com/stsiarzhanau/webpack-react-redux-starter) (webpack 2, browsersync, babel, eslint, mocha, enzyme, jsdom, production config, detailed readme, and more...)
* [trowel](https://github.com/frux/trowel) (universal/ssr, redux, react-router 4, webpack 2, postcss)
* [react-navigation-web](https://github.com/agrcrobles/react-navigation-web) (react-navigation in web + redux, hot reloading!)
* [react-universal-hot-loader-starter-kit](https://github.com/earnubs/react-hot-loader-starter-kit) (universal express app with webpack 2, react-router 4, redux and react-hot-loader 3)
* [bare-minimum-react-hot-rr4-redux](https://github.com/nganbread/bare-minimum-react-hot-rr4-redux) (Bare minimum webpack 2, react-router 4, redux)
* [react-webpack2-boilerplate](https://github.com/plag/react-webpack2-boilerplate/) (Minimal react-router-3, react-redux, redux-saga on webpack2 with full hot reloading include reducers, sagas and react-components)
* [react-webpack-boilerplate](https://github.com/eqfox/react-webpack-boilerplate) (Boilerplate for ReactJS project with Webpack2 hot code reloading!)
* [react-boilerplatinum](https://github.com/Kikobeats/react-boilerplatinum) (Webpack2, Babel, React, Dev Server, PostCSS, SASS, PurifyCSS, HMR, Standard, Offline, BrowserSync)
* [ts-react-boilerplate](https://github.com/sotnikov-link/ts-react-boilerplate) (react, typescript 2, webpack 2 + hot-reload, karma + jasmine + coverage, sourcemaps)
* [react-boilerplate](https://github.com/mikechabot/react-boilerplate) (Dead simple boilerplate for ReactJS. Webpack 2, Redux. Hot Loader. Router)
* [molecule](https://github.com/timberio/molecule) (Production ready boilerplate targeting web & electron, using webpack 2, redux, react-hot-loader, immutable.js, react-router and more)
* [universal-js-hmr-ssr-react-redux](https://github.com/Alex-ray/v2-universal-js-hmr-ssr-react-redux) (Universal JS, Webpack 2, React Router 4, Server Side Rendering, Code Splitting, Redux, Express)

## 已知的限制

### 组件不更换

- React Hot Loader can't replace any Component, only *registered* ones.
  - when using webpack loader - only module exports are _registered_.
  - when using babel plugin - only top level variables are _registered_.
  - when React Hot Loader can't replace Component, an error message will be displayed.

### 代码分离

If you want to use Webpack code splitting via `require.ensure`, you'll need to add an additional `module.hot.accept` callback within the `require.ensure` block, like this:

```js
require.ensure([], (require) => {
  if (module.hot) {
    module.hot.accept('../components/App', () => {
      loadComponent(require('../components/App').default);
    })
  }
  loadComponent(require('../components/App').default);
});
```

Note that if you're using React Router (pre-4.0), this will only work with `getChildRoutes`, but not `getComponent`, since `getComponent`'s callback will only load a component once.

Also, if you're using the Webpack 2 beta, you can use `System.import` without extra `module.hot.accept` calls, although there are still a [few issues with it](https://github.com/gaearon/react-hot-loader/issues/303).

### Checking Element `type`s

Because React Hot Loader creates proxied versions of your components, comparing reference types of elements won't work:

```js
const element = <Component />;
console.log(element.type === Component); // false
```

One workaround is to create an element (that will have the `type` of the proxied component):

```js
const ComponentType = (<Component />).type;
const element = <Component />;
console.log(element.type === ComponentType); // true
```

You can also set a property on the component class:

```js
const Widget = () => <div>hi</div>;
Widget.isWidgetType = true;
console.log(<Widget />.type.isWidgetType); // true
```

### 重新分配组件

React Hot Loader will only try to reload the original component reference, so if you reassign it to another variable like this:

```js
let App = () => (<div>hello</div>);
App = connect()(App);
export default App;
```

React Hot Loader won't reload it. Instead, you'll need to define it once:

```js
const App = () => (<div>hello</div>);
export default connect()(App);
```

### 修饰符

Components that are decorated (using something like [`@autobind`](https://github.com/andreypopp/autobind-decorator)) currently do not retain state when being hot-reloaded. (see [#279](https://github.com/gaearon/react-hot-loader/issues/279))


## 故障排除

If it doesn't work, in 99% cases it's a configuration issue.
A missing option, a wrong path or port. Webpack is very strict about configuration, and the best way to find out what's wrong is to compare your project to an already working setup, such as **[React Hot Boilerplate](https://github.com/gaearon/react-hot-boilerplate)**, bit by bit.

If something doesn't work, in 99% cases it's an issue with your code - Component doesn't got registered, due to HOC or Decorator around it, which making it invisible to Babel plugin, or Webpack loader.  

We're also gathering **[Troubleshooting Recipes](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md)** so send a PR if you have a lesson to share!

## [Patrons](PATRONS.md)

## License

MIT

[build-badge]: https://img.shields.io/travis/gaearon/react-hot-loader.svg?style=flat-square
[build]: https://travis-ci.org/gaearon/react-hot-loader
[version-badge]: https://img.shields.io/npm/v/react-hot-loader.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-hot-loader
[license-badge]: https://img.shields.io/npm/l/react-hot-loader.svg?style=flat-square
[license]: https://github.com/gaearon/react-hot-loader/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[chat]: https://gitter.im/gaearon/react-hot-loader
[chat-badge]: https://img.shields.io/gitter/room/gaearon/react-hot-loader.svg?style=flat-square
[github-watch-badge]: https://img.shields.io/github/watchers/gaearon/react-hot-loader.svg?style=social
[github-watch]: https://github.com/gaearon/react-hot-loader/watchers
[github-star-badge]: https://img.shields.io/github/stars/gaearon/react-hot-loader.svg?style=social
[github-star]: https://github.com/gaearon/react-hot-loader/stargazers
