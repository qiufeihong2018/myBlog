# 【vscode】【含血收集】100个vscode必备插件
## 格式化
### wpy-beautify
> 为vscode美化wpy/vue代码

[github地址](https://github.com/webdzq/plugins/tree/master/wpy-beautify)

* 用法：
1. 快捷键: ctrl+shift+6 ;
2. 在wpy中打开上下文菜单，选择Beautify wpy;
3. 按F1，搜索Beautify wpy，然后点击项目。

* 功能：
1. 支持.vue和.wpy文件格式化 ;
2. 使用快捷键shift+cmd+6格式化 ;
3. 可以使用shift+cmd+p调出命令窗口，然后输入wpy，按回车生效。
4. 可以在当前文件窗口，鼠标右击菜单中选择beautify wpy。
5. 本插件已上传vscode的官网。也可以手动安装目录下.vsix文件。（扩展管理器-》从VSIX安装，然后重启vscode）
6. vscode插件开发方法网上有很多栗子。如：https://segmentfault.com/a/1190000008968904#articleHeader3
7. gif动画工具，mac上使用的是LICEcap for mac。
8. 版本号与参考时vue-beautify的一致。


## 工作效率
### Beautify（js-beautify for VS Code）
> 在VS代码中启用js-beautify。美化javascript, JSON, CSS, Sass，和HTML在VisualStudio代码。VS代码在内部使用js-beautify，但是它缺乏修改您希望使用的样式的能力。这个扩展允许在VS代码中运行js-beautify，并在打开文件的路径树中加载任何.jsbeautifyrc文件以加载代码样式。运行F1美化(美化一个选择)或F1美化文件。

* 用法：
按下F1，然后输入Beautify

* 功能：
在VSCode的配置文件里添加 editor.formatOnSave:true 即可实现保存时自动格式化


### Vetur
用于vscode的Vue工具，由vue -language-server提供支持。
文档:https://vuejs.github.io/vetur
用Veturpack试试吧!

* 特征
1. 语法突出显示
Vetur支持vue指令的语法高亮显示(例如:v-if或:attribute=)和vue内插(例如:{{variable}})。支持的属性字符串字面量是'和'。Vetur不支持' backtick文字，因为它使事情更复杂，使用它没有观察到的好处。Vetur不支持显式添加默认语言。
2. 片段
Vetur提供了一个设置菜单。自定义块，默认为:
```vue
  "vetur.grammar.customBlocks": {
    "docs": "md",
    "i18n": "json"
  }
```
改变`vetur.grammar.customBlocks`,例如:
```
"vetur.grammar.customBlocks": {
  "docs": "md",
  "i18n": "json",
  "page-query": "graphql",
  "static-query": "graphql"
}
```
运行命令“Vetur:从`vetur.grammar.customBlocks`生成语法”。customBlocksRestart VS代码获得自定义块的语法高亮显示。自定义块的有效语言值:
支持表中的所有lang值。`md | yaml | json | php | graphql`
3. Emmet
4. Linting /错误检查
5. 格式化
6. 自动完成
7. 调试
8. VTI / CLI

* 用法：
1. 安装Vetur。
2. 试试Veturpack，这是一个基于Vuepack预先配置的Vue样板。
3. 有关设置，请参阅设置页。
4. 请参考每个特性的自己的页面来设置特定的特性。


### vscode-icons
为vscode提供icons

* 特征
vscode-icons利用NSRI进行子资源完整性检查和防止代码注入。
vscode图标附带了很多功能，比如:

1. 自定义图标
2. 项目自动侦测
3. 自定义配置


### Code Spell Checker
Visual Studio代码的拼写检查程序
一个基本的拼写检查器，可以很好地与camelCase代码一起工作。

这个拼写检查程序的目标是帮助捕获常见的拼写错误，同时保持低误报的数量。

### Image preview
显示图像预览在缝隙和停悬之间