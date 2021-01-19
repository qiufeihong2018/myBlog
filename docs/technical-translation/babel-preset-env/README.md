# 【Github】babel-preset-env说明文档
## 现在 `babel-preset-env` 已经稳定，它已经 [转移到主Babel mono-repo](https://github.com/babel/babel/tree/master/packages/babel-preset-env) 并且这个回购已经被归档。

此举使它更容易与 `Babel` 的其余部分同步发布和开发!

此仓库将是只读的, 因为所有的 `issues/labels` 也已移走。请报告任何错误和打开拉请求在[main mono-repo](https://github.com/babel/babel).

---

## babel-preset-env [![npm](https://img.shields.io/npm/v/babel-preset-env.svg)](https://www.npmjs.com/package/babel-preset-env) [![travis](https://img.shields.io/travis/babel/babel-preset-env/master.svg)](https://travis-ci.org/babel/babel-preset-env) [![npm-downloads](https://img.shields.io/npm/dm/babel-preset-env.svg)](https://www.npmjs.com/package/babel-preset-env) [![codecov](https://img.shields.io/codecov/c/github/babel/babel-preset-env/master.svg?maxAge=43200)](https://codecov.io/github/babel/babel-preset-env)

> 一个 `Babel` 预设 通过自动确定你需要的Babel插件和填充，将 [ES2015+](https://github.com/tc39/proposals/blob/master/finished-proposals.md) 编译为ES5,基于你的目标浏览器或运行时环境。

```sh
npm install babel-preset-env --save-dev
```

没有任何配置选项， `babel-preset-env` 行为与 `babel-preset-latest`(或 `babel-preset-es2015`、`babel-preset-es2016`和`babel-preset-es2017`一起)完全相同。

> 但是，我们不建议以这种方式使用 `preset-env`，因为它不能充分利用它针对特定浏览器的更强大功能。
```json
{
  "presets": ["env"]
}
```

还可以将其配置为只包含所支持的浏览器所需的 `polyfills` 和 `transforms`。
只编译需要的包可以使您的包更小，使您的工作更轻松。

这例子仅仅包含 `polyfills` 和代码 `transforms` 用户覆盖率> 0.25%, 忽略 Internet Explorer 11 and Opera Mini.. 我们用 [一个配置文件](https://github.com/ai/browserslist) 去编译这些信息, 所以你可以用[浏览器列表支持的任何有效查询格式](https://github.com/ai/browserslist#queries).

```js
{
  "presets": [
    ["env", {
      "targets": {
        // %指的是来自一个配置文件的用户的全局覆盖率
        "browsers": [ ">0.25%", "not ie 11", "not op_mini all"]
      }
    }]
  ]
}
```

> 还可以针对不同版本的浏览器，而不是使用查询 `"targets": { "chrome": "52" }`.

类似地，如果你的目标是 `Node.js` 而不是浏览器，你可以配置 `babel-preset-env` 使其只包含特定版本所需的 `polyfills` 和 `transforms`:

```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "6.10"
      }
    }]
  ]
}
```

为了方便，您可以使用 `"node": "current"` 只包括必要的 `polyfills` 和 `transforms` 的Node.js版本,你使用它来运行Babel:

```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

查看许多选项 (特别 `useBuiltIns` to polyfill less)!

- [它是如何运作的](#how-it-works)
- [安装](#install)
- [用例](#usage)
- [选项](#options)
- [例子](#examples)
- [说明](#caveats)
- [其他厉害的项目](#other-cool-projects)

## How it Works

### 确定环境对ECMAScript特性的支持

使用外部数据，例如 [`compat-table`](https://github.com/kangax/compat-table) 确定浏览器支持。 (必要时，我们应该在那里创建PRs)

![](https://cloud.githubusercontent.com/assets/588473/19214029/58deebce-8d48-11e6-9004-ee3fbcb75d8b.png)

我们可以周期性地运行 [build-data.js](https://github.com/babel/babel-preset-env/blob/master/scripts/build-data.js) 而产生 [plugins.json](https://github.com/babel/babel-preset-env/blob/master/data/plugins.json).

Ref: [#7](https://github.com/babel/babel-preset-env/issues/7)

### 维护JavaScript特性和Babel插件之间的映射

> 目前位于 [plugin-features.js](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js).

在大多数情况下，这应该很容易做到。
可能会有插件应该被分割的情况，或者某些插件不够独立(或者不可能做到)。

### 支持在Babel中考虑的所有插件 `latest`

> 没有选项的默认行为与 `babel-preset-latest`.

他不包括 `stage-x` 插件。env将支持我们认为的最新版本的JavaScript中的所有插件(通过匹配我们所做的 [`babel-preset-latest`](http://babeljs.io/docs/plugins/preset-latest/)).

Ref: [#14](https://github.com/babel/babel-preset-env/issues/14)

### 确定要包含在预置中的插件的最小公分母

如果你的目标是ie8和Chrome 55，它将包括ie8所需的所有插件，因为你仍然需要支持这两个。

### 支持目标选项 `"node": "current"` 为当前运行的节点版本编译。

例如，如果您在 ` Node 6` 上构建，箭头函数将不会被转换，但是如果您在 `Node 0.12` 上构建，它们将被转换。

### 支持`browsers`选项，如autoprefixer

使用 [browserslist](https://github.com/ai/browserslist) to declare supported environments by performing queries like `> 1%, last 2 versions`.
使用 [browserslist](https://github.com/ai/browserslist) 宣布支持环境通过执行查询 `> 1%, last 2 versions`。
Ref: [#19](https://github.com/babel/babel-preset-env/pull/19)

## Install

用或者 [npm](https://或者.npmjs.com):

```sh
npm 或者 --或者-或者 babel-preset-env
```

或者 [yarn](https://yarnpkg.com):

```sh
yarn add babel-preset-env --dev
```

## Usage

没有选项的默认行为将运行所有转换 (行为与 [babel-preset-latest](https://babeljs.io/docs/plugins/preset-latest/)相同).

```json
{
  "presets": ["env"]
}
```

## Options

有关设置预设选项的更多信息，请参考[plugin/preset options](http://babeljs.io/docs/plugins/#plugin-preset-options) 文档。
### `targets`

`{ [string]: number | string }`, 默认为 `{}`.

接受要支持的环境版本的对象。    

每个目标环境接受一个数字或一个字符串(我们建议在指定次要版本(如`node: "6.10"`)时使用字符串)。

示例环境: `chrome`, `opera`, `edge`, `firefox`, `safari`, `ie`, `ios`, `android`, `node`, `electron`.

这方面的 [data](https://github.com/babel/babel-preset-env/blob/master/data/plugins.json)是通过运行 [build-data script](https://github.com/babel/babel-preset-env/blob/master/scripts/build-data.js) 脚本生成的，该脚本从 [compat-table](https://kangax.github.io/compat-table)中提取数据。
### `targets.node`

`number | string | "current" | true`

如果希望根据当前节点版本进行编译，可以指定`"node": true`或`"node": "current"`，这将与 `"node": process.versions.node`相同。
### `targets.browsers`

`Array<string> | string`

使用[browserslist](https://github.com/ai/browserslist)查询选择浏览器(ex: last 2 versions, > 5%) 。
注意，浏览器的结果会被`targets`的显式项覆盖。
### `targets.uglify`

`true`

当用 `uglify-js` 去缩小你的代码，在针对以后的浏览器时，您可能会遇到语法错误，因为 `uglify-js` 不支持任何 `ES2015+` 语法。

为了防止这些错误 - 设置 `uglify` 选项为 `true`,它支持所有的转换插件，因此，你的代码被完全编译到ES5。但是, 这个 `useBuiltIns` 选项将仍然像以前一样工作，只包括您的目标需要的polyfills。

> Uglify支持ES2015语法 [uglify-es](https://github.com/mishoo/UglifyJS2/tree/harmony)。如果您正在使用不支持的语法通过`uglify-es`, 我们推荐使用 [babel-minify](https://github.com/babel/minify).

> Note: This option is deprecated in 2.x and replaced with a 注意:此选项在2.x中不推荐使用，用一个[`forceAllTransforms` option](https://github.com/babel/babel-preset-env/pull/264)替换。

### `spec`

`boolean`, 默认是 `false`.

为此预置中支持插件的任何插件启用更符合规范但可能较慢的转换。
### `loose`

`boolean`, 默认是 `false`.

为此预置中允许的任何插件启用"loose"转换。

### `modules`

`"amd" | "umd" | "systemjs" | "commonjs" | false`, 默认是 `"commonjs"`。

允许将ES6模块语法转换为另一个模块类型。

将此设置为 `false` 将不会转换模块。
### `debug`

`boolean`, 默认是 `false`。

输出所使用的目标/插件和中指定的版本[plugin data version](https://github.com/babel/babel-preset-env/blob/master/data/plugins.json) 到 `console.log`.

### `include`

`Array<string>`, 默认是 `[]`.

> 注意: `whitelist` 是不赞成的，并将在下一个主要删除，以支持这个。

要始终包含的插件数组。

有效的选项包括:

- [Babel plugins](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js) - 都与 (`babel-plugin-transform-es2015-spread`) 没有前缀 (`transform-es2015-spread`) 被支持。

- [Built-ins](https://github.com/babel/babel-preset-env/blob/master/data/built-in-features.js), 例如 `map`, `set`, 或者 `object.assign`.

如果本机实现中存在bug，或者不受支持的特性与受支持的特性的组合不能工作，则此选项非常有用。

例如，`Node 4` 支持本地类，但不支持扩展。如果 `super` 与扩展参数一起使用，然后这个 `transform-es2015-classes` 转换需要 `include`，因为它是不可能transpile与 `super` 蔓延否则。

> 注意: `include` 和 `exclude` 选项 _only_ 与[plugins included with this preset](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js)一起工作; 例如，包含 `transform-do-expressions` 或不包含 `transform-function-bind` 将抛出错误。要使用预置中包含的 _not_ 插件，请直接将其添加到您的 [config](https://babeljs.io/docs/usage/babelrc/) 。

### `exclude`

`Array<string>`,默认是 `[]`.

一个总是要 exclude/remove 的插件数组.

可能选项与 `include` 选项相同。

如果你不想使用生成器或者不想包含 `regeneratorRuntime`，这个选项对“黑名单”转换很有用，比如 `transform-regenerator`  (当用`useBuiltIns`) 或者用另一个插件 [fast-async](https://github.com/MatAtBread/fast-async) 而不是 [Babel's async-to-gen](http://babeljs.io/docs/plugins/transform-async-generator-functions/).

### `useBuiltIns`

`boolean`, 默认是 `false`.

一种应用方法 `babel-preset-env` 对 polyfills (借助于 "babel-polyfill").

> 注意:这不是目前的polyfill experimental/stage-x 内置像常规的“babel-polyfill”。
> 他仅仅工作与 npm >= 3 (which should be used with Babel 6 anyway)

```
npm install babel-polyfill --save
```

此选项启用一个新的插件来替换该语句 `import "babel-polyfill"` 或者 `require("babel-polyfill")` 对于 `babel-polyfill` 的个别需求是基于环境的。

> 注意: 仅仅用 `require("babel-polyfill");` 一次在你的app中。
> 多次imports或requires“babel-polyfill”将抛出一个错误，因为它会导致全局冲突和其他难以跟踪的问题
> 我们建议创建一个只包含' require '语句的单个条目文件。

**In**

```js
import "babel-polyfill";
```

**Out (different based on environment)**

```js
import "core-js/modules/es7.string.pad-start";
import "core-js/modules/es7.string.pad-end";
import "core-js/modules/web.timers";
import "core-js/modules/web.immediate";
import "core-js/modules/web.dom.iterable";
```

直接用 `core-js` 工作了 (`import "core-js";`)

```
npm install core-js --save
```

---

## Examples

### 具有各种目标的导出

```js
export class A {}
```

#### 仅针对Chrome 52

**.babelrc**

```json
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52
      }
    }]
  ]
}
```

**Out**

```js
class A {}
exports.A = A;
```

#### Target Chrome 52 with webpack 2/rollup and loose mode

**.babelrc**

```json
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52
      },
      "modules": false,
      "loose": true
    }]
  ]
}
```

**Out**

```js
export class A {}
```

#### 通过browserslist锁定特定的浏览器

**.babelrc**

```json
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52,
        "browsers": ["last 2 versions", "safari 7"]
      }
    }]
  ]
}
```

**Out**

```js
export var A = function A() {
  _classCallCheck(this, A);
};
```

#### 通过 `node: true` 或者 `node: "current"` 获取最新的目标节点

**.babelrc**

```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

**Out**

```js
class A {}
exports.A = A;
```

### 显示调试输出

**.babelrc**

```json
{
  "presets": [
    [ "env", {
      "targets": {
        "safari": 10
      },
      "modules": false,
      "useBuiltIns": true,
      "debug": true
    }]
  ]
}
```

**stdout**

```sh
Using targets:
{
  "safari": 10
}

Modules transform: false

Using plugins:
  transform-exponentiation-operator {}
  transform-async-to-generator {}

Using polyfills:
  es7.object.values {}
  es7.object.entries {}
  es7.object.get-own-property-descriptors {}
  web.timers {}
  web.immediate {}
  web.dom.iterable {}
```

### Include and exclude specific plugins/built-ins

> 始终包含箭头函数，显式排除生成器

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      },
      "include": ["transform-es2015-arrow-functions", "es6.map"],
      "exclude": ["transform-regenerator", "es6.set"]
    }]
  ]
}
```

## Caveats

如果你得到一个 `SyntaxError: Unexpected token ...` 错误时使用 [object-rest-spread](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-object-rest-spread) 然后进行转换，确保插件至少已更新到 `v6.19.0`.

## Other Cool Projects

- [babel-preset-modern-browsers](https://github.com/christophehurpeau/babel-preset-modern-browsers)
- ?
