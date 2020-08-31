# 【编辑器】手把手教会使用monaco-editor
在vue中实现Monaco Editor自定义提示功能
https://segmentfault.com/a/1190000019666661

要在浏览器的IDE中支持自定义提示功能

可以看到，它可以根据用户输入的内容来一项一项排除，只显示完全匹配的那一项。
项目的框架是Vue，编辑器用的是Monaco Editor。

什么是Monaco Editor
vscode是我们经常在用的编辑器，它的前身是微软的一个叫Monaco Workbench的项目，而Monaco Editor就是从这个项目中成长出来的一个web编辑器，他们很大一部分的代码都是共用的，所以Monaco Editor和VSCode在编辑代码，交互及UI上几乎是一摸一样的。不同的是，两者的平台不一样，Monaco Editor基于浏览器，而VSCode基于electron，所以功能上VSCode更加健全，性能比较强大。

用法
安装

npm install monaco-editor --save
使用

<div id="monaco" class="monaco-editor"></div>
import * as monaco from 'monaco-editor';
this.fileEditor = this.monaco.editor.create(document.getElementById('monaco'), {
  value: null,
  language: 'sql'  // 这里以sql为例
})

this.fileEditor.dispose(); // 使用完后销毁
这里引入monaco要注意，在react中以下面方式引入：

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';


实现自定义提示功能
查看了资料后，发现在monaco中有提供一个提示功能的方法registerCompletionItemProvider，具体实现如下：

this.monaco.languages.registerCompletionItemProvider('sql', { // 这里以sql语言为例
  provideCompletionItems () {
    return [{
      label: '${_DB',  // 显示的提示内容
      kind: this.monaco.languages.CompletionItemKind['Function'], // 用来显示提示内容后的不同的图标
      insertText: '{_DB', // 选择后粘贴到编辑器中的文字
      detail: '' // 提示内容后的说明
    }];
  },
  triggerCharacters: ['$'] // 触发提示的字符，可以写多个
});
以上的用法，我试了一下之后发现，虽然triggerCharacters的值是数组，可以有多个，但是里面的字符串只能识别一个字符。一开始的需求是输入${_之后提示${_DB，但是由于不能识别多个字符，只能做到出现$就提示。

还有一个问题就是registerCompletionItemProvider的第一个参数只能是字符串，如果有多种语言只能叠加重复写，恰巧我的需求是有多种语言，所以只能如下解决，也就是每种语言都写了一遍：

['json', 'yaml', 'php', 'go', 'sql', 'java', 'markdown', 'plaintext'].map(item => {
  this.monaco.languages.registerCompletionItemProvider(item, {
    provideCompletionItems () {
      return [{
        label: '${_DB',
        kind: this.monaco.languages.CompletionItemKind['Function'],
        insertText: '{_DB',
        detail: ''
      }];
    },
    triggerCharacters: ['$']
  });
});
需求是${_DB:key:value，也就是说在输入${_DB后，再输入一个:提示出key，在key之后输入:提示value。

这里又碰到一个问题，需要知道当前输入的内容来判断是$还是:，而且后面两个触发提示的符号同是:，无法区分，只能通过识别:的位置来判断是提示key还是value，所以还要知道当前输入的:之前的内容。

那么只有在provideCompletionItems这一步判断，但是查遍了资料没有发现这样的参数，provideCompletionItems只有model、position、token这几个参数，后来发现model中的getLineContent方法可以获取指定行的所有内容，而position可以获取当前输入行的行数和列数，于是就有了以下解决方法：

this.monaco.languages.registerCompletionItemProvider(item, {
  provideCompletionItems (model, position) {
    // 获取当前行数
    const line = position.lineNumber
    
    // 获取当前列数
    const column = position.column
    
    // 获取当前输入行的所有内容
    const content = model.getLineContent(line)
    
    // 通过下标来获取当前光标后一个内容，即为刚输入的内容
    const sym = content[column - 2]
    
    if (sym === '$') {
      return [{
        label: '${_DB',
        kind: this.monaco.languages.CompletionItemKind['Function'],
        insertText: '{_DB',
        detail: ''
      }];
    }
    
    return [{
      label: ':abb',
      kind: this.monaco.languages.CompletionItemKind['Function'],
      insertText: 'abb',
      detail: ''
    },
    {
      label: ':bc',
      kind: this.monaco.languages.CompletionItemKind['Function'],
      insertText: 'bc',
      detail: ''
    }];
  },
  triggerCharacters: ['$', ':']
});
能获取光标后的第一个内容，后面的内容就都能获取啦，如果识别到前面的内容是${_DB就提示key，否则提示value。

最后总结下来就是一定要多看文档，勤于测试就能解决问题啦~

啦啦啦~ 交差去啦~


Monaco Editor 自定义语言的实现

https://juejin.im/post/5c0dc3fe6fb9a049d235e093


自定义语言服务完成
https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-completion-provider-example

https://github.com/microsoft/monaco-editor#monaco-editor

https://github.com/microsoft/monaco-editor-webpack-plugin

Auto Completion for keywords and extra_keywords in other languages, such as python.
https://github.com/microsoft/monaco-editor/issues/833

多看issue，一般你遇到的问题，别人都已经遇到过并且解决过


https://github.com/palantir/python-language-server


Monaco Editor API v0.19.0
https://microsoft.github.io/monaco-editor/api/interfaces/monaco.languages.languageconfiguration.html#autoclosingpairs


Parameters
languageId: string
provider: CompletionItemProvider

第一个参数是字符串的语言参数

第二个参数是 方法


The completion item provider interface defines the contract between extensions and the IntelliSense.

When computing complete completion items is expensive, providers can optionally implement the resolveCompletionItem-function. In that case it is enough to return completion items with a label from the provideCompletionItems-function. Subsequently, when a completion item is shown in the UI and gains focus this provider is asked to resolve the item, like adding doc-comment or details.

这句话的意思是
完成项提供程序接口定义了扩展和智能感知之间的契约。

当计算完整完成项的开销很大时，提供程序可以选择实现resolveCompletionItem-function。
在这种情况下，从provideCompletionItems-function返回带有标签的完成项就足够了。
随后，当在UI中显示一个完成项并获得焦点时，将要求此提供程序解析该项，比如添加doc-comment或details。

    methods: {
      initEditor() {
        let _this=this
        this.monacoEditor = monaco.editor.create(this.$refs.container, {
          value: "{\n\t\"dependencies\": {\n\t\t\n\t}\n}\n",
          language: "json",
          theme: this.theme,
          editorOptions: this.editorOptions
        });
        // 自定义语言补全
        monaco.languages.registerCompletionItemProvider('json', {
          provideCompletionItems: function (model, position) {
            // find out if we are completing a property in the 'dependencies' object.
            var textUntilPosition = model.getValueInRange({
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: position.lineNumber,
              endColumn: position.column
            });
            var match = textUntilPosition.match(
              /"dependencies"\s*:\s*\{\s*("[^"]*"\s*:\s*"[^"]*"\s*,\s*)*([^"]*)?$/);
            if (!match) {
              return {
                suggestions: []
              };
            }
            var word = model.getWordUntilPosition(position);
            var range = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: word.startColumn,
              endColumn: word.endColumn
            };
            return {
              suggestions: _this.createDependencyProposals(range)
            };
          }
        });

      },
      createDependencyProposals(range) {
        // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
        // here you could do a server side lookup
        return [{
            label: '"lodash"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "The Lodash library exported as Node.js modules.",
            insertText: '"lodash": "*"',
            range: range
          },
          {
            label: '"express"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Fast, unopinionated, minimalist web framework",
            insertText: '"express": "*"',
            range: range
          },
          {
            label: '"mkdirp"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Recursively mkdir, like <code>mkdir -p</code>",
            insertText: '"mkdirp": "*"',
            range: range
          },
          {
            label: '"my-third-party-library"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Describe your library here",
            insertText: '"${1:my-third-party-library}": "${2:1.2.3}"',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
          }
        ];
      },
      emitCode() {
        const _this = this
        _this.$emit('saveCode', _this.monacoEditor.getValue())
      }
    }
    
    提供所给职位和文件的完成项目。
参数
模型:ITextModel
位置:位置
背景:CompletionContext
令牌:CancellationToken
返回ProviderResult < CompletionList >

Position
constructor
column
lineNumber
clone
delta
equals
isBefore
isBeforeOrEqual
toString
with
compare
equals
isBefore
isBeforeOrEqual
isIPosition
lift



ITextModel
onDidChangeContent
onDidChangeDecorations
onDidChangeLanguage
onDidChangeLanguageConfiguration
onDidChangeOptions
onWillDispose
id
uri
applyEdits
deltaDecorations
detectIndentation
dispose
findMatches
findNextMatch
findPreviousMatch
getAllDecorations
getAlternativeVersionId
getCharacterCountInRange
getDecorationOptions
getDecorationRange
getDecorationsInRange
getEOL
getFullModelRange
getLineContent
getLineCount
getLineDecorations
getLineFirstNonWhitespaceColumn
getLineLastNonWhitespaceColumn
getLineLength
getLineMaxColumn
getLineMinColumn
getLinesContent
getLinesDecorations
getModeId
getOffsetAt
getOptions
getOverviewRulerDecorations
getPositionAt
getValue

getValueInRange
获取一定范围内的文本。
参数
范围:IRange
描述要获取什么文本的范围。
可选的eol: EndOfLinePreference

getValueLength
getValueLengthInRange
getVersionId
getWordAtPosition

getWordUntilPosition
把“在…下面”或“在…旁边”这两个词裁剪到“位置”一栏
参数
位置:IPosition
找一个字的位置。

isDisposed
modifyPosition
normalizeIndentation
pushEOL
pushEditOperations
pushStackElement
setEOL
setValue
updateOptions
validatePosition
validateRange


range
range: IRange | object
Defined in monaco.d.ts:4782
A range of text that should be replaced by this completion item.

Defaults to a range from the start of the current word to the current position.

Note: The range must be a single line and it must contain the position at which completion has been requested.

范围
范围:IRange |对象
定义在monaco.d.ts: 4782
应由此完成项替换的文本范围。

默认从当前单词的开头到当前位置的范围。

注意:范围必须是单行，并且必须包含要求完成的位置。




https://github.com/Microsoft/monaco-editor/blob/master/docs/integrate-esm.md


monaco-editor使用
monaco-editor是一款非常好用的web代码编辑器，那么如何把他加到自己的项目中呢。

1.下载插件

npm install monaco-editor@0.8.3
2.初始化编辑器值

1
2
<!--要绑定的对象-->
<div id="container"></div>
　　

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
var monacoEditor;
//设置插件路径
require.config({ paths: { 'vs': '/Scripts/monaco/min/vs' } });
//绑定对象并赋值
require(['vs/editor/editor.main'], function () {
    //container为要绑定的对象
    monacoEditor = monaco.editor.create(document.getElementById('container'), {
        value: "<div>我是插入的代码</div>",
        language: 'html',
        wrappingColumn: 0,
        wrappingIndent: "indent"
    });
});
//自适应宽度
window.onresize = function () {
    if (monacoEditor) {
        monacoEditor.layout();
    }
};
3.获取编辑器值

1
monacoEditor.getValue();
4.替换编辑器值

1
2
3
4
5
6
7
8
9
10
11
//移除原有对象
$("#container").children().remove();
//重新绑定对象并赋新值
require(['vs/editor/editor.main'], function () {
            monacoEditor = monaco.editor.create(document.getElementById('container'), {
                value: '<span>nenewnew</span>',
                language: 'html',
                wrappingColumn: 0,
                wrappingIndent: "indent"
            });
        });
        
        
        
        
          //监听变化
          https://www.cnblogs.com/XHappyness/p/9444250.html
                this.monacoEditor.onDidChangeModelContent(e => {
            this.caretOffset = e.changes[0].rangeOffset;//获取光标位置
            this.value= this.monacoEditor.getValue(); //使value和其值保持一致
        })
        
        
        
        
        Getting "Unexpected usage" in console 
        
        去掉language
        
        

类型|功能|在线demo
--|--|--
creating-the-editor|创建编辑器|
hello-world|hello-world|https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-hello-world
editor-basic-options|编辑器基础项|https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-editor-basic-options
hard-wrapping|硬装|https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-hard-wrapping
syntax-highlighting-for-html-elements|html元素的语法错误高亮|https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-syntax-highlighting-for-html-elements
interacting-with-the-editor|作用于编辑器|
adding-a-command-to-an-editor-instance|给编辑器实例增加一个命令|https://microsoft.github.io/monaco-editor/playground.html#interacting-with-the-editor-adding-a-command-to-an-editor-instance
adding-an-action-to-an-editor-instance|给编辑器实例增加一个action|https://microsoft.github.io/monaco-editor/playground.html#interacting-with-the-editor-adding-an-action-to-an-editor-instance
revealing-a-position|展示相同的位置|https://microsoft.github.io/monaco-editor/playground.html#interacting-with-the-editor-revealing-a-position
rendering-glyphs-in-the-margin|在空白处渲染图形|https://microsoft.github.io/monaco-editor/playground.html#interacting-with-the-editor-rendering-glyphs-in-the-margin
line-and-inline-decorations|行内线装饰|https://microsoft.github.io/monaco-editor/playground.html#interacting-with-the-editor-line-and-inline-decorations
customizing-the-line-numbers|自定义行数|https://microsoft.github.io/monaco-editor/playground.html#interacting-with-the-editor-customizing-the-line-numbers
listening-to-mouse-events|监听鼠标事件|https://microsoft.github.io/monaco-editor/playground.html#interacting-with-the-editor-listening-to-mouse-events
listening-to-key-events|监听键盘事件|https://microsoft.github.io/monaco-editor/playground.html#interacting-with-the-editor-listening-to-key-events
customizing-the-appearence|自定义外表|
exposed-colors|暴露颜色|https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-exposed-colors
scrollbars|滚动条|https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-scrollbars
tokens-and-colors|令牌和颜色|https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-tokens-and-colors
creating-the-diffeditor|创建区分编辑器|
hello-diff-world|区分一行hello world|https://microsoft.github.io/monaco-editor/playground.html#creating-the-diffeditor-hello-diff-world
multi-line-example|区分多行代码的例子|https://microsoft.github.io/monaco-editor/playground.html#creating-the-diffeditor-multi-line-example
inline-diff-example|内联的区分多行代码的例子|https://microsoft.github.io/monaco-editor/playground.html#creating-the-diffeditor-inline-diff-example
navigating-a-diff|不同的操作区分代码的例子|https://microsoft.github.io/monaco-editor/playground.html#creating-the-diffeditor-navigating-a-diff
extending-language-services|扩展语言服务|
custom-languages|自定义语言|https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-custom-languages
completion-provider-example|自动补全例子|https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-completion-provider-example
codelens-provider-example|无代码提供例子|https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-codelens-provider-example
color-provider-example|颜色提供例子|https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-color-provider-example
symbols-provider-example|符号提供例子|https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-symbols-provider-example
folding-provider-example|可折叠例子|https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-folding-provider-example
hover-provider-example|悬浮提供信息的例子|https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-hover-provider-example
configure-javascript-defaults|默认配置javascript|https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-configure-javascript-defaults
configure-json-defaults|默认配置json|https://microsoft.github.io/monaco-editor/playground.html#extending-language-services-configure-json-defaults

api|描述|翻译|属性
--|--|--|--
inlineClassName|If set, the decoration will be rendered inline with the text with this CSS class name. Please use this only for CSS rules that must impact the text. For example, use className to have a background color decoration.|如果设置，该装饰将与带有此CSS类名的文本一起呈现。请仅将此用于必须影响文本的CSS规则。例如，使用className来拥有背景颜色装饰。
registerCompletionItemProvider|Register a completion item provider (use by e.g. suggestions).|注册一个完成项提示
InsertAsSnippet|insertText is a snippet.|insertText是一个代码片段。
KeepWhitespace|Adjust whitespace/indentation of multiline insert texts to match the current line indentation.|调整多行插入文本的空格/缩进以匹配当前行缩进。
changeViewZone|Change the view zones. View zones are lost when a new model is attached to the editor.|更改视图区域。当一个新模型附加到编辑器时，视图区域将丢失。
addZone|Create a new view zone.|创建一个新的区域
monaco.editor.IViewZone| A view zone is a full horizontal rectangle that 'pushes' text down. The editor reserves space for view zones when rendering.adding-an-action-to-an-editor-instance|视图区域是一个完整的水平矩形，它将文本向下“推”。编辑器在呈现时为视图区域保留空间。|afterColumn、afterLineNumber、domNode、heightInLines、heightInPx、marginDomNode、minWidthInPx、onComputedHeight、onDomNodeTop、suppressMouseDown
afterColumn|The column after which this zone should appear. If not set, the maxLineColumn of afterLineNumber will be used.|应在其后出现此区域的列。如果没有设置，将使用afterLineNumber的maxLineColumn。
afterLineNumber|The line number after which this zone should appear. Use 0 to place a view zone before the first line number.|应在其后出现此区域的行号。使用0将视图区域放置在第一个行号之前。
domNode|The dom node of the view zone|视图区域的dom节点
heightInLines|The height in lines of the view zone. If specified, heightInPx will be used instead of this. If neither heightInPx nor heightInLines is specified, a default of heightInLines = 1 will be chosen.|观景区的线条高度。如果指定，将使用heightpx代替此选项。如果没有指定heightInPx或heightInLines，则将选择默认的height lines = 1。
heightInPx|The height in px of the view zone. If this is set, the editor will give preference to it rather than heightInLines above. If neither heightInPx nor heightInLines is specified, a default of heightInLines = 1 will be chosen.|视图区域的高度(px)。如果设置了该选项，编辑器将优先选择该选项，而不是上面的身高线。如果没有指定heightInPx或heightInLines，则将选择默认的height lines = 1。
marginDomNode|An optional dom node for the view zone that will be placed in the margin area.|视图区域的可选dom节点，它将被放置在边框区域中。
minWidthInPx|The minimum width in px of the view zone. If this is set, the editor will ensure that the scroll width is >= than this value.|视图区域的最小宽度(px)。如果设置了此值，编辑器将确保滚动宽度>=大于此值。
onComputedHeight|Callback which gives the height in pixels of the view zone.|回调，它给出视图区域的像素高度。
onDomNodeTop|Callback which gives the relative top of the view zone as it appears (taking scrolling into account).|回调，当视图区域出现时提供相对顶部(考虑到滚动)。
suppressMouseDown|Suppress mouse down events. If set, the editor will attach a mouse down listener to the view zone and .preventDefault on it. Defaults to false|抑制鼠标向下的事件。如果设置了该设置，编辑器将在视图区域和其中的. preventdefault上附加一个鼠标向下侦听器。默认值为假
monaco  editor  OverviewRulerLane|Vertical Lane in the overview ruler of the editor.|垂直Lane中的概览标尺编辑器。
colorizeModelLine|Colorize a line in a model.|给模型中的线着色。
monaco  editor  EndOfLineSequence|End of line character preference.|行结束字符首选项。
monaco  editor  DefaultEndOfLine|The default end of line to use when instantiating models.|实例化模型时使用的默认行尾。
monaco  editor  EndOfLinePreference|End of line character preference.|行结束字符首选项。
monaco  editor  RenderLineNumbersType||
monaco  editor  ILineChange|A line change|一条线变化
addOverlayWidget|Add an overlay widget. Widgets must have unique ids, otherwise they will be overwritten.|添加一个覆盖小部件。小部件必须具有惟一的id，否则将被覆盖。


//说明:
//按F1 (Alt-F1 in Edge) =>，如果启用，操作将出现并运行
//按下Ctrl-F10 =>，如果激活，操作将运行
//按下和弦Ctrl-K, Ctrl-M =>如果启用该操作将运行




monaco editor各种功能实现总结

https://blog.csdn.net/gao_grace/article/details/88890895


https://github.com/microsoft/monaco-editor/tree/master/website/playground/new-samples




排查过程

模板这个是可用的
```
 // 模板
        const arr = [
          {
            label: '"lodash"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'The Lodash library exported as Node.js modules.',
            insertText: '"lodash": "*"',
            range: range
          },
          {
            label: '"express"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'Fast, unopinionated, minimalist web framework',
            insertText: '"express": "*"',
            range: range
          },
          {
            label: '"mkdirp"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'Recursively mkdir, like <code>mkdir -p</code>',
            insertText: '"mkdirp": "*"',
            range: range
          },
          {
            label: '"my-third-party-library"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'Describe your library here',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range
          }
        ]
        console.log(arr)
        return arr
```

这个不可用
```
      // 自定义
        label.map(i => {
          i.range = range
          // i.insertTextRules = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
          i.kind = monaco.languages.CompletionItemKind.Function
        })
        console.log(label)
        return label
```
打印的某条关键词规则
```
documentation: "The Lodash library exported as Node.js modules."
insertText: ""lodash": "*""
kind: 1
label: ""lodash""
range: {startLineNumber: 1, endLineNumber: 1, startColumn: 1, endColumn: 2}
sortText: ""lodash""
```

```
documentation: "点击的信息"
insertText: "点击↵  哈哈哈"
kind: 5
label: ""点击""
range: {startLineNumber: 1, endLineNumber: 1, startColumn: 1, endColumn: 5}
sortText: ""点击""
type: "Class"

documentation: "点击的信息"
insertText: "点击"
kind: 1
label: "点击"
range: {startLineNumber: 8, endLineNumber: 8, startColumn: 1, endColumn: 3}
sortText: "点击"

documentation: "点击的信息"
insertText: ""点击""
kind: 1
label: ""点击""
range: {startLineNumber: 1, endLineNumber: 1, startColumn: 1, endColumn: 8}
sortText: ""点击""
__proto__: Object

```

当时我怀疑是insertText和label不是双引号的问题，怀疑多了一个type的问题，怀疑多了一个sortText的问题。

输入`l`range是1行1列到1行2列，没问题，产生提示；

输入`点`range是不是1行1列到1行2列，有问题，不产生提示。

一开始输入法默认是微软输入法，结果换一个搜狗输入法，提示又出现了，此时的range正确。


添加图片
```js
monaco.languages.register({ id: 'mySpecialLanguage' });

monaco.languages.registerHoverProvider('mySpecialLanguage', {
    provideHover: function (model, position) {
        return {
            range: new monaco.Range(1, 1, model.getLineCount(), model.getLineMaxColumn(model.getLineCount())),
            contents: [
                { value: '![monaco-img-preview](https://www.sciencemag.org/sites/default/files/styles/inline__450w__no_aspect/public/dogs_1280p_0.jpg?itok=4t_1_fSJ)', isTrusted: true }
            ]
        };
    }
});

monaco.editor.create(document.getElementById("container"), {
    value: '\n\nHover over this text',
    language: 'mySpecialLanguage'
});
function xhr(url) {
	var req = null;
	return new Promise(function (c, e) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req._canceled) { return; }

			if (req.readyState === 4) {
				if ((req.status >= 200 && req.status < 300) || req.status === 1223) {
					c(req);
				} else {
					e(req);
				}
				req.onreadystatechange = function () { };
			}
		};

		req.open("GET", url, true);
		req.responseType = "";

		req.send(null);
	}, function () {
		req._canceled = true;
		req.abort();
	});
}
```