# 【译】markdown-it说明文档

[![Build Status](https://img.shields.io/travis/markdown-it/markdown-it/master.svg?style=flat)](https://travis-ci.org/markdown-it/markdown-it)
[![NPM version](https://img.shields.io/npm/v/markdown-it.svg?style=flat)](https://www.npmjs.org/package/markdown-it)
[![Coverage Status](https://coveralls.io/repos/markdown-it/markdown-it/badge.svg?branch=master&service=github)](https://coveralls.io/github/markdown-it/markdown-it?branch=master)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/markdown-it/markdown-it)

> Markdown解析器做得不错、快速和容易扩展。

__[Live demo](https://markdown-it.github.io)__

- 遵循 __[CommonMark spec](http://spec.commonmark.org/)__ + 补充语法扩展 & `sugar` (链接自动识别, `typographer`)。
- 可配置的语法! 您可以添加新的规则，甚至替换现有的规则。
- 高效率.
- 默认的[安全](https://github.com/markdown-it/markdown-it/tree/master/docs/security.md)。
- 社区编写的 __[插件](https://www.npmjs.org/browse/keyword/markdown-it-plugin)__ 和在 `npm` 上的[其他包 packages](https://www.npmjs.org/browse/keyword/markdown-it) 。

__目录表__

- [markdown-it](#markdown-it)
  - [安装](#install)
  - [例子](#usage-examples)
    - [简单](#simple)
    - [用预设值和选项初始化](#init-with-presets-and-options)
    - [插件加载](#plugins-load)
    - [语法高亮显示](#syntax-highlighting)
    - [Linkify](#linkify)
  - [API](#api)
  - [语法扩展](#syntax-extensions)
    - [管理规则](#manage-rules)
  - [基准](#benchmark)
  - [支持 markdown-it](#support-markdown-it)
  - [作者](#authors)
  - [引用/谢谢](#references--thanks)

## install

**node.js** & **bower**:

```bash
npm install markdown-it --save
bower install markdown-it --save
```

**browser (CDN):**

- [jsDeliver CDN](http://www.jsdelivr.com/#!markdown-it "jsDelivr CDN")
- [cdnjs.com CDN](https://cdnjs.com/libraries/markdown-it "cdnjs.com")


## usage-examples

参见:

- __[API documentation](https://markdown-it.github.io/markdown-it/)__ - 更多的信息和例子。
- [Development info](https://github.com/markdown-it/markdown-it/tree/master/docs) -
  插件作者。


### simple

```js
// node.js, "classic" way:
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('# markdown-it rulezz!');

// node.js, the same, but with sugar:
var md = require('markdown-it')();
var result = md.render('# markdown-it rulezz!');


// Note, there is no dash in "markdownit".
//浏览器无AMD，添加到“window”上的脚本加载
//注意，“markdownit”一词中没有破折号。
var md = window.markdownit();
var result = md.render('# markdown-it rulezz!');
```

单行渲染，不带段落换行:

```js
var md = require('markdown-it')();
var result = md.renderInline('__markdown-it__ rulezz!');
```


### init-with-presets-and-options

(*) 预置定义活动规则和选项的组合。 可能
`"commonmark"`, `"zero"` or `"default"` (if skipped). 看
[API docs](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) 获取更多信息.

```js
// commonmark mode
var md = require('markdown-it')('commonmark');

// default mode
var md = require('markdown-it')();

// enable everything
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});

// 完整的选项列表(默认)
var md = require('markdown-it')({
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                              // This is only for full CommonMark compatibility.
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
  linkify:      false,        // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) { return ''; }
});
```

### Plugins load

```js
var md = require('markdown-it')()
            .use(plugin1)
            .use(plugin2, opts, ...)
            .use(plugin3);
```


### Syntax highlighting
使用 `highlight` 选项将语法高亮显示到受隔离的代码块:
```js
var hljs = require('highlight.js'); // https://highlightjs.org/

// Actual default values
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // 使用外部默认转义
  }
});
```

Or with full wrapper override (if you need assign class to `<pre>`):
或与完整包装重载(如果你需要分配类
):
```js
var hljs = require('highlight.js'); // https://highlightjs.org/

// Actual default values
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
```

### Linkify

`linkify: true` uses [linkify-it](https://github.com/markdown-it/linkify-it). 配置 `linkify-it`, 通过 `md.linkify` 来访问 `linkify` 的实例:

```js
md.linkify.tlds('.py', false);  // disables .py as top level domain
```


## API

__[API 文档](https://markdown-it.github.io/markdown-it/)__

如果你打算写插件 - 看一看
[Development info](https://github.com/markdown-it/markdown-it/tree/master/docs).


## Syntax extensions

嵌入式(默认启用):

- [Tables](https://help.github.com/articles/organizing-information-with-tables/) (GFM)
- [删除线](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) (GFM)

通过插件:

- [下标](https://github.com/markdown-it/markdown-it-sub)
- [上标](https://github.com/markdown-it/markdown-it-sup)
- [脚注](https://github.com/markdown-it/markdown-it-footnote)
- [定义清单](https://github.com/markdown-it/markdown-it-deflist)
- [简称](https://github.com/markdown-it/markdown-it-abbr)
- [表情符号](https://github.com/markdown-it/markdown-it-emoji)
- [自定义容器](https://github.com/markdown-it/markdown-it-container)
- [插页](https://github.com/markdown-it/markdown-it-ins)
- [标志](https://github.com/markdown-it/markdown-it-mark)
- ... 和 [其他](https://www.npmjs.org/browse/keyword/markdown-it-plugin)


### Manage rules

默认情况下，所有规则都是启用的，但可以通过选项加以限制。在插件
加载它的所有规则是自动启用的。

```js
// Activate/deactivate rules, with curring
var md = require('markdown-it')()
            .disable([ 'link', 'image' ])
            .enable([ 'link' ])
            .enable('image');

// Enable everything
md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
});
```

你可以在资源中找到所有规则:
[parser_core.js](lib/parser_core.js), [parser_block](lib/parser_block.js),
[parser_inline](lib/parser_inline.js).


## Benchmark

这里是 `readme` 解析在 `MB Pro` 视网膜 2013 (2.4 GHz):

```bash
make benchmark-deps
benchmark/benchmark.js readme

Selected samples: (1 of 28)
 > README

Sample: README.md (7774 bytes)
 > commonmark-reference x 1,222 ops/sec ±0.96% (97 runs sampled)
 > current x 743 ops/sec ±0.84% (97 runs sampled)
 > current-commonmark x 1,568 ops/sec ±0.84% (98 runs sampled)
 > marked x 1,587 ops/sec ±4.31% (93 runs sampled)
```

__注意.__ CommonMark版本运行与[simplified link normalizers](https://github.com/markdown-it/markdown-it/blob/master/benchmark/implementations/current-commonmark/index.js)
为了更“诚实”比较。差值约为1.5倍。
正如你所看到的，`markdown-it` 它的灵活性和速度无关。
的附加特性导致的“完整”版本的放缓
其他实现。

## markdown-it for enterprise

可作为Tidelift订阅的一部分。

`markdown-it` 和成千上万个其他包的维护者正在与Tidelift合作，为用于构建应用程序的开放源码依赖项提供商业支持和维护。节省时间、降低风险并改善代码的运行状况，同时向您所使用的依赖项的维护者支付费用。 [Learn more.](https://tidelift.com/subscription/pkg/npm-markdown-it?utm_source=npm-markdown-it&utm_medium=referral&utm_campaign=enterprise&utm_term=repo)


## Authors

- Alex Kocharin [github/rlidwka](https://github.com/rlidwka)
- Vitaly Puzrin [github/puzrin](https://github.com/puzrin)

_markdown-it_ is the result of the decision of the authors who contributed to
99% of the _Remarkable_ code to move to a project with the same authorship but
new leadership (Vitaly and Alex). It's not a fork.

## References / Thanks

非常感谢 [John MacFarlane](https://github.com/jgm)的工作
通用标记规范和参考实现。他的工作节省了我们很多时间
在这个项目的发展过程中。

**Related Links:**

- https://github.com/jgm/CommonMark - 参考通用标记在C & JS中的实现，
还包含最新的规格和在线演示。
- http://talk.commonmark.org - 共同的论坛，合作的好地方
开发人员的努力。

**Ports**

- [motion-markdown-it](https://github.com/digitalmoksha/motion-markdown-it) - Ruby/RubyMotion
- [markdown-it-py](https://github.com/ExecutableBookProject/markdown-it-py)- Python
