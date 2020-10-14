# 【编辑器】手把手教会使用codemirror
在做 `z` 项目的时候，需要用到编辑器，经过一段撕心裂肺的试炼后选择了 `codemirror` 。

`codemirror` 的优点：
- 文档完善
- 例子丰富
- 插件丰富
- 可扩展性强

需要实现的功能：
1. 支持联想关键词
2. 标定错误行
3. 关键词高亮
4. 增加全屏切换的功能
5. 自动补全括号
6. 添加图片，显示图片，与图片名称双向绑定

## 支持联想关键词
```js
      registerHelper(myHintList) {
        CodeMirror.registerHelper("hint", "myMode", function(cm) {
          var cur = cm.getCursor(),
            token = cm.getTokenAt(cur);
          var start = token.start,
            end = cur.ch
          var str = token.string
          // 当前输入的字符和myHintList内的文本前缀匹配过滤，实现一边输入一边查找的功能
          const list = myHintList.filter((item) => {
            return item.indexOf(str) === 0
          })
          if (list.length) return {
            list: list,
            from: CodeMirror.Pos(cur.line, start),
            to: CodeMirror.Pos(cur.line, end)
          };
        });
      },
```

## 标定错误行
```js
      /**
       * @description 标定错误行
       * @param {n} n-1是第几行错误
       */
      deltaErrDecorations(n) {
        const lineData = this.editorDoc.getLine(n)
        if (lineData) {
          const from = {
            line: n - 1,
            ch: 0
          }
          const to = {
            line: n - 1,
            ch: lineData.length
          }
          this.editorDoc.markText(from, to, {
            className: "myContentClass"
          })
        }
      },
```

## 关键词高亮
```js
    /**
       * @description 关键词高亮
       */
      defineMode(myHighlightList) {
        CodeMirror.defineMode('myMode', (config) => {
          return {
            /**
                这个token方法就是用来标亮关键字的，
                CodeMirror会自上而下，从左往右得遍历每一个字符，依次调用token方法。
                stream参数可以用来控制遍历的粒度，比如我调用方法 stream.eatWhile(/\s/),
                那么当前cursor后面所有的空格会被匹配到stream中，stream.current()的值就是所有匹配到的空格。
            **/
            token: (stream) => {
              if (stream.eatSpace()) {
                return null
              }
              stream.eatWhile(/[\$\w\u4e00-\u9fa5]/)
              const cur = stream.current()
              const exist = myHighlightList.some((item) => {
                return item === cur
              })
              /**
               * 自定义颜色
                 .cm-keyword {
                    color: rgb(252, 142, 173);
                  }
                **/
              if (exist) {
                return 'keyword'
              }
              stream.next()
            }
          }
        })
      },
```

## 增加全屏切换的功能
先导入插件里的全屏插件
```js
 import "codemirror/addon/display/fullscreen.js"
 import "codemirror/addon/display/fullscreen.css"
```
然后注册快捷键,extraKeys是CodeMirror.fromTextArea的配置项中的属性。
```js
extraKeys: { //自定义快捷键
            "F11": () => {
              _this.codeMirrorEditor.setOption("fullScreen", !_this.codeMirrorEditor.getOption("fullScreen"));
            },
            "Esc": () => {
              if (_this.codeMirrorEditor.getOption("fullScreen")) _this.codeMirrorEditor.setOption("fullScreen", false);
            }
          }
```

## 自动补全括号
具体需要自动补全括号(按下左括号，自动添加右括号)，例如：()/{}/[]/<>等括号。
```js
      /**
       * @description 自动补全括号(按下左括号，自动添加右括号)，例如：()/{}/[]/<>
       */
      autoInsertParentheses() {
        this.codeMirrorEditor.addKeyMap({
          name: 'autoInsertParentheses',
          "'('": (cm) => {
            const cur = cm.getCursor()
            cm.replaceRange('()', cur, cur, '+insert')
            cm.doc.setCursor({
              line: cur.line,
              ch: cur.ch + 1
            })
          }
        })
        this.codeMirrorEditor.addKeyMap({
          name: 'autoInsertParentheses',
          "'{'": (cm) => {
            const cur = cm.getCursor()
            cm.replaceRange('{}', cur, cur, '+insert')
            cm.doc.setCursor({
              line: cur.line,
              ch: cur.ch + 1
            })
          }
        })
        this.codeMirrorEditor.addKeyMap({
          name: 'autoInsertParentheses',
          "'['": (cm) => {
            const cur = cm.getCursor()
            cm.replaceRange('[]', cur, cur, '+insert')
            cm.doc.setCursor({
              line: cur.line,
              ch: cur.ch + 1
            })
          }
        })
        this.codeMirrorEditor.addKeyMap({
          name: 'autoInsertParentheses',
          "'<'": (cm) => {
            const cur = cm.getCursor()
            cm.replaceRange('<>', cur, cur, '+insert')
            cm.doc.setCursor({
              line: cur.line,
              ch: cur.ch + 1
            })
          }
        })
      },
```

## 添加图片，显示图片，与图片名称双向绑定
```js
   /**
       * @description 从脚本中读取图片
       * @param val 图片值
       * @param positionArr 图片在代码行中的行列位置
       */
      readImage(val) {
        if (val) {
          let positionArr = []
          let codeArr = val.split('\n')
          for (let l = 0; l < codeArr.length; l++) {
            for (let col = -1;
              (col = codeArr[l].indexOf('.png', col + 1)) > -1; positionArr.push({
                line: l,
                ch: col
              }));
          }
          positionArr.forEach(j => {
            const name = codeArr[j.line].substring(j.ch - 13, j.ch)
            let fromPosition = JSON.parse(JSON.stringify(j))
            let toPosition = JSON.parse(JSON.stringify(j))
            fromPosition.ch -= 13
            toPosition.ch += 4
            this.addImage(name, fromPosition, toPosition)
          })
        }
      },
      /**
       * @description 截图并且添加图片
       */
      shotAddImage(imageName) {
        const fromPosition = JSON.parse(JSON.stringify(this.currentCursor))
        let toPosition = JSON.parse(JSON.stringify(this.currentCursor))
        toPosition.ch += 17
        this.addText(imageName, fromPosition, toPosition)
        this.addImage(imageName, fromPosition, toPosition)
      },
      /**
       * @description 添加图片对应的值 `${imageName}.png`
       */
      addText(imageName, fromPosition, toPosition) {
        this.editorDoc.replaceRange(`${imageName}.png`, fromPosition, toPosition)
      },
      /**
       * @description 添加图片
       */
      addImage(imageName, fromPosition, toPosition) {
        var img = document.createElement('img')
        img.setAttribute('src', `/ws/${imageName}.png`)
        img.setAttribute('id', imageName)
        img.setAttribute('class', 'imageClass')
        this.editorDoc.markText(fromPosition, toPosition, {
          className: 'image',
          replacedWith: img,
          readOnly: false
        })
      }
```

我的编辑器配置
```js
this.codeMirrorEditor = CodeMirror.fromTextArea(myTextarea, {
          lineNumbers: true, // 显示行数
          indentUnit: 4, // 缩进单位为4
          styleActiveLine: true, // 当前行背景高亮
          matchBrackets: true, // 括号匹配
          mode: 'myMode', // HMTL混合模式
          // mode: 'text/x-mysql', // HMTL混合模式
          lineWrapping: true, // 自动换行
          theme: 'monokai', // 使用monokai模版
          readOnly: false, //只读
          }
```

## CodeMirror：如何在光标位置之前或之后读取编辑器文本

```js
  //捕获光标更改事件
 editor.on（'cursorActivity'，function（e）{
 var line = e.doc.getCursor（）。line，//光标线
 ch = e.doc.getCursor（）。ch，//光标字符
```


https://www.cnblogs.com/web001/p/9370392.html
设置代码框的大小
```js
editor.setSize('800px', '950px');
```
获取编辑器的内容
```js
editor.getValue();
```
//仅仅单纯获取编辑器的文本内容，不能识别换行及一些特殊符号的转义
给编辑器赋值
```js
editor.setValue("");　
```



在vue项目中使用codemirror插件实现代码编辑器功能（代码高亮显示及自动提示）

https://www.cnblogs.com/GarsonZhang/p/10572651.html

没用
报.showHint is not a function"

http://www.ddpool.cn/article/79634.html

https://segmentfault.com/a/1190000016136831#item-1-5
关于CodeMirror如何实现实时提示



作者：MattXu20676
链接：https://juejin.im/post/6844903637152432141
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



```js
// 需要的codemirror中的插件按需导入
  import * as CodeMirror from 'codemirror/lib/codemirror'
  import 'codemirror/lib/codemirror.css'
  import "codemirror/addon/hint/sql-hint"
  import "codemirror/addon/hint/show-hint.css"
  import "codemirror/addon/hint/show-hint.js"
  import "codemirror/addon/edit/matchbrackets"
  import "codemirror/mode/sql/sql"
```


如何激活 `codemirror` 中的全屏插件？
http://www.voidcn.com/article/p-vwtahsud-byv.html





常用事件
1.onChange(instance,changeObj)：codeMirror文本被修改后触发。

instance是一个当前的codemirror对象，changeObj是一个｛from，to，text[,removed][，origin]｝对象。其中from，to分别表示起始行对象和结束行对象，行对象包括ch：改变位置距离行头的间隔字符，line：改变的行数。text是一个字符串数组表示被修改的文本内容，即你输入的内容。



2.onBeforeChange(instance,changObj):内容改变前被调用



3.onCursorActivity(instance)：当鼠标点击内容区、选中内容、修改内容时被触发



4.onKeyHandled:(instance,name,event):当一个都dom元素的事件触发时调用，name为操作名称。



5.onInputRead(insatance,changeObj):当一个新的input从隐藏的textara读取出时调用



6.onBeforeSelectionChange(instance,obj):当选中的区域被改变时调用，obj对象是选择的范围和改变的内容（本人未测试成功）



7.onUpdate(instance):编辑器内容被改变时触发



8.onFocus(instance):编辑器获得焦点式触发



9.onBlur(instance):编辑器失去焦点时触发



常用方法：
getValue():获取编辑器文本内容

setValue(text):设置编辑器文本内容

getRange({line,ch},{line,ch}):获取指定范围内的文本内容第一个对象是起始坐标，第二个是结束坐标

replaceRange(replaceStr,{line,ch},{line,ch}):替换指定区域的内容

getLine(line)：获取指定行的文本内容

lineCount():统计编辑器内容行数

firstLine():获取第一行行数，默认为0，从开始计数

lastLine():获取最后一行行数

getLineHandle(line):根据行号获取行句柄

getSelection():获取鼠标选中区域的代码

replaceSelection(str):替换选中区域的代码

setSelection({line:num,ch:num1},{line:num2,ch:num3}):设置一个区域被选中

somethingSelected()：判断是否被选择

getEditor()：获取CodeMirror对像

undo()：撤销

redo():回退



CodeMirror事件和常用方法
https://blog.csdn.net/mafan121/article/details/49178945?utm_source=blogxgwz1



CodeMirror使用说明书

https://blog.csdn.net/JLU_Lei/article/details/80259697

## 参考文献

