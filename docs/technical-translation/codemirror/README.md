# 【Github】CodeMirror说明文档

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

## 安装

或是获得最新版本的[zip 文件](https://codemirror.net/codemirror.zip) , 或者确保您有 [Node](https://nodejs.org/)
去安装并运行:

    npm install codemirror

**注意**:这是库的源存储库，而不是发布通道。
克隆它并不是安装库的推荐方法，而且除非您也运行构建步骤，否则实际上无法工作。

## 快速开始

为了创建项目，确保你有安装 Node.js (最低版本 6)
并且执行了 `npm install`. 为了运行, 只需要打开 `index.html` 在你的浏览器中 (你不需要运行一个web服务器). 用 `npm test` 去运行测试.

## 特征
支持超过 `100` 种语言
A powerful, composable language mode system
Autocompletion (XML)
代码折叠
Configurable keybindings
Vim, Emacs, and Sublime Text bindings
Search and replace interface
Bracket and tag matching
Support for split views
Linter integration
Mixing font sizes and styles
Various themes
Able to resize to fit content
Inline and block widgets
Programmable gutters
Making ranges of text styled, read-only, or atomic
Bi-directional text support
Many other methods and addons...

## 方法
### fold/foldcode.js
代码折叠帮助。向编辑器实例添加 `foldCode` 方法，该方法将尝试从给定行开始执行代码折叠，或展开已经存在的折叠。该方法的第一个参数是应该折叠的位置(可以是行号或 Pos)，第二个可选参数是测距器函数或选项对象，支持以下属性:
`rangeFinder: fn(CodeMirror, Pos)`
用于查找可折叠范围的函数。
`If this is not directly passed, it will default to CodeMirror.fold.auto, which uses getHelpers with a "fold" type to find folding functions appropriate for the local mode. `
如果没有直接传递，它将默认为 `CodeMirror.fold.auto`，它使用带有“fold”类型的 `getHelpers` 来查找适合于本地模式的折叠函数。
`There are files in the addon/fold/ directory providing CodeMirror.fold.brace, which finds blocks in brace languages (JavaScript, C, Java, etc), CodeMirror.fold.indent, for languages where indentation determines block structure (Python, Haskell), and CodeMirror.fold.xml, for XML-style languages, and CodeMirror.fold.comment, for folding comment blocks.`
在 `addon/fold/` 目录中有提供 `CodeMirror.fold.brace`，它在大括号语言(`JavaScript`, `C`, `Java`等)中查找块。
缩进，用于缩进决定块结构的语言(`Python`, `Haskell`)和 `CodeMirror.fold.indent`。
用于 `XML-style` 的语言，以及用于折叠注释块的 `CodeMirror.fold.comment`。
`widget: string | Element | fn(from: Pos, to: Pos) → string|Element
The widget to show for folded ranges. Can be either a string, in which case it'll become a span with class CodeMirror-foldmarker, or a DOM node.` 
用于显示折叠范围的小部件。
可以是字符串(在这种情况下，它将变成带有 `CodeMirror-foldmarker` 类的 `span`)，也可以是 `DOM` 节点。
`To dynamically generate the widget, this can be a function that returns a string or DOM node, which will then render as described.`
要动态生成小部件，可以是返回字符串或DOM节点的函数，然后按描述的方式呈现。
`The function will be invoked with parameters identifying the range to be folded.`
该函数将使用参数调用，参数标识要折叠的范围。
`scanUp: boolean When true (default is false), the addon will try to find foldable ranges on the lines above the current one if there isn't an eligible one on the given line.`
当为真(默认为假)时，如果给定行上没有合适的可折叠范围，插件将尝试查找当前行之上的可折叠范围。
`minFoldSize: integer The minimum amount of lines that a fold should span to be accepted. Defaults to 0, which also allows single-line folds.`
可接受的折叠线的最小长度。
默认值为0，这也允许单行折叠。
`See the demo for an example.`

```js
/*
 * 代码折叠的示范案例
 */
window.onload = function() {
  var te = document.getElementById("code");
  var sc = document.getElementById("script");
  te.value = (sc.textContent || sc.innerText || sc.innerHTML).replace(/^\s*/, "");
  sc.innerHTML = "";
  var te_html = document.getElementById("code-html");
  te_html.value = document.documentElement.innerHTML;
  var te_python = document.getElementById("code-python");
  var te_markdown = document.getElementById("code-markdown");
  te_markdown.value = "# Foo\n## Bar\n\nblah blah\n\n## Baz\n\nblah blah\n\n# Quux\n\nblah blah\n"
  var te_json = document.getElementById("code-json");

  window.editor = CodeMirror.fromTextArea(te, {
    mode: "javascript",
    lineNumbers: true,
    lineWrapping: true,
    extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });
  editor.foldCode(CodeMirror.Pos(13, 0));

  window.editor_json = CodeMirror.fromTextArea(te_json, {
    mode: {name: "javascript", json: true},
    lineNumbers: true,
    lineWrapping: true,
    extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    foldOptions: {
      widget: (from, to) => {
        var count = undefined;

        // Get open / close token
        var startToken = '{', endToken = '}';        
        var prevLine = window.editor_json.getLine(from.line);
        if (prevLine.lastIndexOf('[') > prevLine.lastIndexOf('{')) {
          startToken = '[', endToken = ']';
        }

        // Get json content
        var internal = window.editor_json.getRange(from, to);
        var toParse = startToken + internal + endToken;

        // Get key count
        try {
          var parsed = JSON.parse(toParse);
          count = Object.keys(parsed).length;
        } catch(e) { }        

        return count ? `\u21A4${count}\u21A6` : '\u2194';
      }
    }
  });
  editor_json.foldCode(CodeMirror.Pos(5, 0));

  window.editor_html = CodeMirror.fromTextArea(te_html, {
    mode: "text/html",
    lineNumbers: true,
    lineWrapping: true,
    extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });
  editor_html.foldCode(CodeMirror.Pos(0, 0));
  editor_html.foldCode(CodeMirror.Pos(34, 0));

  window.editor_python = CodeMirror.fromTextArea(te_python, {
    mode: "python",
    lineNumbers: true,
    extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });

  window.editor_markdown = CodeMirror.fromTextArea(te_markdown, {
    mode: "markdown",
    lineNumbers: true,
    lineWrapping: true,
    extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });
};
```  

需要导入对应语言模式的插件
```js
  <script src="../mode/javascript/javascript.js"></script>
```
需要将 `mode` 设置未对应的语言模式，
```js
  window.editor = CodeMirror.fromTextArea(te, {
    mode: "javascript",
    lineNumbers: true,
    lineWrapping: true,
    extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });
  editor.foldCode(CodeMirror.Pos(13, 0));
```


### CodeMirror.Pos(line: integer, ?ch: integer, ?sticky: string)
`A constructor for the objects that are used to represent positions in editor documents. `
用于表示编辑器文档中位置的对象的构造函数。
`sticky defaults to null, but can be set to "before" or "after" to make the position explicitly associate with the character before or after it.`
`sticky` 默认值为 `null`，但可以设置为“before”或“after”，以使位置明确地与前面或后面的字符相关联。


### mode: string|object
`The mode to use. `
使用的模式。
`When not given, this will default to the first mode that was loaded.`
当未给出时，它将默认为加载的第一种模式。
`It may be a string, which either simply names the mode or is a MIME type associated with the mode.`
它可以是一个字符串，它可以简单地命名模式，也可以是与模式相关联的MIME类型。
 `The value "null" indicates no highlighting should be applied.`
值“null”表示不高亮显示。
 `Alternatively, it may be an object containing configuration options for the mode, with a name property that names the mode (for example {name: "javascript", json: true}). `
或者，它可以是一个包含模式配置选项的对象，带有一个name属性来命名模式(例如{name: "javascript"， json: true})。
`The demo pages for each mode contain information about what configuration parameters the mode supports.`
每种模式的演示页面都包含有关该模式支持哪些配置参数的信息。
 `You can ask CodeMirror which modes and MIME types have been defined by inspecting the CodeMirror.modes and CodeMirror.mimeModes objects. `
您可以通过检查CodeMirror来询问定义了哪些模式和MIME类型。
 CodeMirror.modes 和CodeMirror.mimeModes 对象。
`The first maps mode names to their constructors, and the second maps MIME types to mode specs.`
第一个将模式名映射到它们的构造函数，第二个将MIME类型映射到模式规范。