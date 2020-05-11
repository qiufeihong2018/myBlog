# 【canvas】小白看了都会的canvas圣经
## 属性
支持全局属性（所有HTML元素共有的属性）
基本的HTML全局属性之外，还存在以下全局属性:
1. xml:lang 和 xml:base ——两者都是从XHTML规范继承，但为了兼容性而被保留的。
2. 多重aria-*属性，用于改善可访问性。
3. 事件处理程序 属性：onabort, onautocomplete, onautocompleteerror, onblur, oncancel, oncanplay, oncanplaythrough, onchange, onclick, onclose, oncontextmenu, oncuechange, ondblclick, ondrag, ondragend, ondragenter, ondragexit, ondragleave, ondragover, ondragstart, ondrop, ondurationchange, onemptied, onended, onerror, onfocus, oninput, oninvalid, onkeydown, onkeypress, onkeyup, onload, onloadeddata, onloadedmetadata, onloadstart, onmousedown, onmouseenter, onmouseleave, onmousemove, onmouseout, onmouseover, onmouseup, onmousewheel, onpause, onplay, onplaying, onprogress, onratechange, onreset, onresize, onscroll, onseeked, onseeking, onselect, onshow, onsort, onstalled, onsubmit, onsuspend, ontimeupdate, ontoggle, onvolumechange, onwaiting.
4. height
该元素占用空间的高度，以 `CSS` 像素（px）表示，默认为 150。
5. moz-opaque  
通过设置这个属性，来控制canvas元素是否半透明。如果你不想canvas元素被设置为半透明，使用这个元素将可以优化浏览器绘图性能。
6. width
该元素占用空间的宽度，以 `CSS` 像素（px）表示，默认为 300。

当然可以使用`CSS`来修改`canvas`达到自适应，但是如果`<canvas>`元素中展示的内容变形，可以通过`<canvas>`自带的height和width属性进行相关设置，而不要使用`CSS`。
## 缺点
- 可访问性差
本身只是一个位图，不提供任何绘制对象的信息。画布内容不像HTML那样具有语义并能暴露给可访问性工具。
应该避免在交互型的网站或者App上使用canvas。

但是还是有下面4中方式来交互
1. 内容兼容
2. ARIA 规则
3. 点击区域（hit region）
4. 焦点圈
## CanvasRenderingContext2D
口提供的 `2D` 渲染背景用来绘制`<canvas>`元素，为了获得这个接口的对象，需要在 `<canvas>` 上调用 `getContext()` ，并提供一个 "`2d`" 的参数：
```js
var canvas = document.getElementById('rectCanvas');
var ctx = canvas.getContext('2d');
```
只要获得`2d`渲染后，就可以调用`Canvas API`在画布上画出图形。
### 绘制矩形
1. strokeRect()
在 canvas 中，使用当前的绘画样式，描绘一个起点在 (x, y) 、宽度为 w 、高度为 h 的矩形。
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=\, initial-scale=1.0">
    <title>Canvas</title>
</head>

<body>
    <canvas id="rectCanvas"></canvas>
</body>
<script>
    var canvas = document.getElementById('rectCanvas');
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#ff0000'
    ctx.strokeRect(10, 10, 100, 100)
</script>

</html>
```
2. fillRect()
绘制填充矩形，矩形的起点在 (x, y) 位置，矩形的尺寸是 width 和 height 。
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=\, initial-scale=1.0">
    <title>Canvas</title>
</head>

<body>
    <canvas id="rectCanvas"></canvas>
</body>
<script>
    var canvas = document.getElementById('rectCanvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "#ff0000"
    ctx.fillRect(10, 10, 100, 100)
</script>

</html>
```
3. clearRect()
设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容。
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=\, initial-scale=1.0">
    <title>Canvas</title>
</head>

<body>
    <canvas id="rectCanvas"></canvas>
</body>
<script>
    var canvas = document.getElementById('rectCanvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(200, 20);
    ctx.lineTo(120, 120);
    ctx.closePath(); // draws last line of the triangle
    ctx.stroke();

    ctx.clearRect(10, 10, 100, 100);
</script>

</html>
```
### 绘制文本
1. fillText(text画布上的文本,x-起点的 x 轴坐标,y-起点的 y 轴坐标,maxWidth-绘制的最大宽度)
Canvas 2D API 在 (x, y)位置填充文本的方法。如果选项的第四个参数提供了最大宽度，文本会进行缩放以适应最大宽度。
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=\, initial-scale=1.0">
    <title>Canvas</title>
</head>

<body>
    <canvas id="textCanvas"></canvas>
</body>
<script>
    var canvas = document.getElementById('textCanvas');
    var ctx = canvas.getContext('2d');
    ctx.font = '30px serif'
    ctx.fillText('qfh is ok!', 30, 60,400)
</script>

</html>
```
2. strokeText(text画布上的文本,x-起点的 x 轴坐标,y-起点的 y 轴坐标,maxWidth-绘制的最大宽度)
 Canvas 2D API 在给定的 (x, y) 位置绘制（描边）文本。方法同fillText()
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=\, initial-scale=1.0">
    <title>Canvas</title>
</head>

<body>
    <canvas id="textCanvas"></canvas>
</body>
<script>
    var canvas = document.getElementById('textCanvas');
    var ctx = canvas.getContext('2d');
    ctx.font = '30px serif'
    ctx.strokeText('qfh is ok!', 30, 60,400)
</script>

</html>
```
3. measureText(text-需要测量的字符串)
返回一个关于被测量文本`TextMetrics` 对象包含的信息
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=\, initial-scale=1.0">
    <title>Canvas</title>
</head>

<body>
    <canvas id="textCanvas"></canvas>
</body>
<script>
    var canvas = document.getElementById('textCanvas');
    var ctx = canvas.getContext('2d');
    ctx.font = '30px serif'
    ctx.strokeText('qfh is ok!', 30, 60, 400)
    var str = ctx.measureText('qfh is ok!', 30, 60, 400)
    console.log('str', str)
    // actualBoundingBoxAscent: 21 标明的水平线到渲染文本的所有字体的矩形最高边界顶部的距离
    // actualBoundingBoxDescent: 4 标明的水平线到渲染文本的所有字体的矩形边界最底部的距离
    // actualBoundingBoxLeft: -1 确定的对齐点到文本矩形边界左侧的距离
    // actualBoundingBoxRight: 145 确定的对齐点到文本矩形边界右侧的距离
    // width: 150 字符串的宽度
</script>

</html>
```
TextMetrics的其他属性：
- ideographicBaseline 标明的水平线到线框的 ideographic 基线的距离
- alphabeticBaseline 标明的水平线到线框的 alphabetic 基线的距离
- hangingBaseline 标明的水平线到线框的 hanging 基线的距离
- emHeightDescent 标明的水平线到线框中 em 方块底部的距离
- emHeightAscent 标明的水平线到线框中 em 方块顶部的距离
- actualBoundingBoxDescent 标明的水平线到渲染文本的矩形边界底部的距离
- fontBoundingBoxDescent 标明的水平线到渲染文本的所有字体的矩形边界最底部的距离
- fontBoundingBoxAscent 标明的水平线到渲染文本的所有字体的矩形最高边界顶部的距离
### 线型
1. lineWidth
设置线段厚度的属性（即线段的宽度）。
```html
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 30
    ctx.strokeRect(10, 10, 100, 100)
```
2. lineCap 
绘制每一条线段末端的属性（有3个可能的值：butt, round 和 square。默认值是 butt）
```html
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    // 标准线
    ctx.lineWidth = 1
    ctx.strokeStyle = "#666666"
    ctx.beginPath()
    ctx.moveTo(10, 10)
    ctx.lineTo(150, 10)
    ctx.moveTo(10, 100)
    ctx.lineTo(150, 100)
    ctx.stroke()
    // 三种末端方式
    lineCapArr = ['butt', 'round', 'square']
    for (let i in lineCapArr) {
        ctx.lineWidth = 20
        ctx.strokeStyle = "#ff0000"
        ctx.lineCap = lineCapArr[i]
        ctx.beginPath()
        ctx.moveTo(20 + i * 50, 10)
        ctx.lineTo(20 + i * 50, 100)
        ctx.stroke()
    }
```
上面的例子可以发现，`butt`是上下是跟标准线平齐，`round`是上下凸出来一个直径为线宽的半圆，`square`是上下凸出来一个高度为线宽一半的矩形。
3. lineJoin
设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。此属性有3个值： round, bevel and miter。默认值是 miter。注意：如果2个相连部分在同一方向，那么lineJoin不会产生任何效果，因为在那种情况下不会出现连接区域。`round`
通过填充一个额外的，圆心在相连部分末端的<font color = #00FF00 size=4 face="STCAIYUN">扇形</font>，绘制拐角的形状。 圆角的半径是线段的宽度。`bevel`在相连部分的末端填充一个额外的以<font color = #00FF00 size=4 face="STCAIYUN">三角形</font>为底的区域， 每个部分都有各自独立的矩形拐角。`miter`通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的<font color = #00FF00 size=4 face="STCAIYUN">菱形</font>区域。这个设置可以通过 miterLimit 属性看到效果。

lineJoin 属性3种不同的设置。
```html
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var lineJoinArr = ['round', 'miter', 'bevel']
    ctx.lineWidth = 15
    for (let i in lineJoinArr) {
        ctx.lineJoin = lineJoinArr[i]
        ctx.beginPath()
        ctx.moveTo(0, 45 + i * 30)
        ctx.lineTo(45, 10 + i * 30)
        ctx.lineTo(90, 45 + i * 30)
        ctx.lineTo(135, 10 + i * 30)
        ctx.lineTo(180, 45 + i * 30)
        ctx.stroke()
    }
```
4. miterLimit
设置斜接面限制比例的属性。当获取属性值时，会返回当前的值（默认值是10.0 ）
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=\, initial-scale=1.0">
  <title>Canvas</title>
</head>

<body>
  <canvas id="canvas"></canvas>
  <input id="miterLimit"></input>
  <button onClick="reDraw()">重绘</button>
</body>
<script>
  function reDraw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.clearRect(0, 0, 300, 150);
    // 标准框
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 50, 300, 50);

    if (document.getElementById('miterLimit').value.match(/\d+(\.\d+)?/)) {
      ctx.miterLimit = parseFloat(document.getElementById('miterLimit').value);
    } else {
      alert('请输入数字！');
    }

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(0, 100);
    for (i = 0; i < 48; i++) {
      var neg = i % 2 == 0 ? 25 : -25;
      ctx.lineTo(Math.pow(i, 1.8), 75 + neg);
    }
    ctx.stroke();
    return false;
  }
</script>

</html>
```
5. getLineDash()
当前线段样式的数组，数组包含一组数量为偶数的非负数数字。

这个必须要和`setLineDash()`是一对。
6. setLineDash()
设置当前的线段样式。
```html
 function drawDashedLine(pattern) {
  ctx.beginPath();
  ctx.setLineDash(pattern);
  console.log(ctx.getLineDash())
  ctx.moveTo(0, y);
  ctx.lineTo(300, y);
  ctx.stroke();
  y += 10;
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let y = 5;

drawDashedLine([]);
drawDashedLine([1, 1]);
drawDashedLine([100, 100]);
drawDashedLine([50, 50]);
drawDashedLine([50, 1]);
drawDashedLine([20, 5]);
drawDashedLine([15, 3, 3, 3]);
drawDashedLine([20, 3, 3, 3, 3, 3, 3, 3]);
drawDashedLine([12, 3, 3]);  
drawDashedLine([3, 3]);  
```
7. lineDashOffset
设置虚线偏移量的属性，描述在哪里开始绘制线段。

实现<font color = #00FF00 size=4 face="STCAIYUN">蚂蚁线</font>

在`ps`套索工具中。 它能帮助用户根据图片背景动态变化的边界来区分选择的边界。
```html
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var offset = 0;

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.setLineDash([10, 2]);
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10,10, 200, 100);
}

function march() {
  offset++;
  if (offset > 16) {
    offset = 0;
  }
  draw();
  setTimeout(march, 10);
}

march();
```
### 文本样式
1. font
描述绘制文字时，当前字体样式的属性。
```js
 var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font = "italic bold 24px/30px arial,sans-serif"
  ctx.strokeText('qfh', 10, 50)
```
2. textAlign
绘制文本时，文本的对齐方式的属性。

这里的textAlign="center"比较特殊。textAlign的值为center时候文本的居中是基于你在fillText的时候所给的x的值，也就是说文本一半在x的左边，一半在x的右边（可以理解为计算x的位置时从默认文字的左端，改为文字的中心，因此你只需要考虑x的位置即可）。所以，如果你想让文本在整个canvas居中，就需要将fillText的x值设置成canvas的宽度的一半。

默认是`start`,可以是`left`、`center`、`right`和`end`。
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=\, initial-scale=1.0">
  <title>Canvas</title>
</head>

<body>
  <canvas id="canvas" width="1000" height="1000"></canvas>
</body>
<script>
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font="italic bold 100px arial,sans-serif"
  ctx.textAlign = "start"
  ctx.strokeText('start', 500, 500)
  ctx.textAlign = "left"
  ctx.strokeText('left', 500, 500)
  ctx.textAlign = "center"
  ctx.strokeText('center', 500, 500)
  ctx.textAlign = "right"
  ctx.strokeText('right', 500, 500)
  ctx.textAlign = "end"
  ctx.strokeText('end', 500, 500)
</script>
</html>
```
3. textBaseline
绘制文本时，当前文本基线的属性。

决定文字垂直方向的对齐方式。

其默认值是`alphabetic`(文本基线是标准的字母基线),还有`top`、`hanging`(文本基线是悬挂基线)、`middle`(文本基线在文本块的中间)、`ideographic`(文字基线是表意字基线；如果字符本身超出了`alphabetic` 基线，那么`ideograhpic`基线位置在字符本身的底部)和`bottom`。
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=\, initial-scale=1.0">
  <title>Canvas</title>
</head>

<body>
  <canvas id="canvas" width="1000" height="1000"></canvas>
</body>
<script>
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font="italic bold 100px arial,sans-serif"
  ctx.textBaseline = "alphabetic"
  ctx.strokeText('alphabetic', 500, 500)
  ctx.textBaseline = "top"
  ctx.strokeText('top', 500, 500)
  ctx.textBaseline = "hanging"
  ctx.strokeText('hanging', 500, 500)
  ctx.textBaseline = "middle"
  ctx.strokeText('middle', 500, 500)
  ctx.textBaseline = "ideographic"
  ctx.strokeText('ideographic', 500, 500)
  ctx.textBaseline = "bottom"
  ctx.strokeText('bottom', 500, 500)
</script>
</html>
```
4. direction
当前文本方向的属性

其默认值是`inherit`(继承 `<canvas>` 元素或者 `Document`),还可以是`ltr`(从左向右)、`rtl`(从右向左)。
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=\, initial-scale=1.0">
  <title>Canvas</title>
</head>

<body>
  <canvas id="canvas" width="1000" height="1000"></canvas>
</body>
<script>
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font="italic bold 100px arial,sans-serif"
  ctx.direction  = "inherit"
  ctx.strokeText('inherit', 500, 500)
  ctx.direction  = "ltr"
  ctx.strokeText('从左向右', 500, 500)
  ctx.direction  = "rtl"
  ctx.strokeText('从右向左', 500, 500)
</script>
</html>
```
### 使用图片
#### 获得需要绘制的图片

- HTMLImageElement
这些图片是由Image()函数构造出来的，或者任何的`<img>`元素
- HTMLVideoElement
用一个HTML的 `<video>`元素作为你的图片源，可以从视频中抓取当前帧作为一个图像

- HTMLCanvasElement
可以使用另一个 `<canvas>` 元素作为你的图片源。

- ImageBitmap
这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成。

> 使用相同页面内的图片
我们可以通过下列方法的一种来获得与canvas相同页面内的图片的引用：

- document.images集合
- document.getElementsByTagName()方法
- 如果你知道你想使用的指定图片的ID，你可以用document.getElementById()获得这个图片

> 使用其它域名下的图片
在 HTMLImageElement上使用crossOrigin属性，你可以请求加载其它域名上的图片。如果图片的服务器允许跨域访问这个图片，那么你可以使用这个图片而不污染canvas，否则，使用这个图片将会污染canvas。

> 使用其它 canvas 元素
和引用页面内的图片类似地，用 document.getElementsByTagName 或 document.getElementById 方法来获取其它 canvas 元素。但你引入的应该是已经准备好的 canvas。

一个常用的应用就是将第二个canvas作为另一个大的 canvas 的缩略图。

> 由零开始创建图像
或者我们可以用脚本创建一个新的 HTMLImageElement 对象。要实现这个方法，我们可以使用很方便的Image()构造函数。
```js
var img = new Image();   // 创建一个<img>元素
img.src = 'myImage.png'; // 设置图片源地址
```
当脚本执行后，图片开始装载。

若调用 drawImage 时，图片没装载完，那什么都不会发生（在一些旧的浏览器中可能会抛出异常）。因此你应该用load事件来保证不会在加载完毕之前使用这个图片：
```js
var img = new Image();   // 创建img元素
img.onload = function(){
  // 执行drawImage语句
}
img.src = 'myImage.png'; // 设置图片源地址
```
如果你只用到一张图片的话，这已经够了。但一旦需要不止一张图片，那就需要更加复杂的处理方法，但图片预加载策略超出本教程的范围。

> 通过 data: url 方式嵌入图像
我们还可以通过 data:url 方式来引用图像。Data urls 允许用一串 Base64 编码的字符串的方式来定义一个图片。
```js
img.src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
```
其优点就是图片内容即时可用，无须再到服务器兜一圈。（还有一个优点是，可以将 CSS，JavaScript，HTML 和 图片全部封装在一起，迁移起来十分方便。）缺点就是图像没法缓存，图片大的话内嵌的 url 数据会相当的长：

>使用视频帧
你还可以使用<video> 中的视频帧（即便视频是不可见的）。例如，如果你有一个ID为“myvideo”的<video> 元素，你可以这样做：
```js
function getMyVideo() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    return document.getElementById('myvideo');
  }
}
```
它将为这个视频返回HTMLVideoElement对象，正如我们前面提到的，它可以作为我们的Canvas图片源。

#### 绘制图片
一旦获得了源图对象，我们就可以使用 drawImage 方法将它渲染到 canvas 里。drawImage 方法有三种形态，下面是最基础的一种。

drawImage(image, x, y)
其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。
SVG图像必须在 `<svg>` 根指定元素的宽度和高度。

```js
 function draw(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var img=new Image()
  img.onload=function(){
    ctx.drawImage(img,0,0)
    ctx.beginPath()
    ctx.moveTo(500,500)
    ctx.lineTo(1000,1000)
    ctx.lineTo(1500,500)
    ctx.lineTo(500,500)
    ctx.stroke()
  }
  img.src="https://images.qiufeihong.top/vuepress2.png"
  }
  draw()
```

#### 缩放 Scaling
```js
drawImage(image, x, y, width, height)
```
这个方法多了2个参数：`width` 和 `height`，这两个参数用来控制 当向`canvas`画入时应该缩放的大小
```html
  function draw() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image()
    img.onload = function () {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          ctx.drawImage(img, i * 250, j * 350, 250, 350)
        }
      }
    }
    img.src = "https://images.qiufeihong.top/vuepress2.png"
  }
  draw()
```
>注意：图像可能会因为大幅度的缩放而变得起杂点或者模糊。如果您的图像里面有文字，那么最好还是不要进行缩放，因为那样处理之后很可能图像里的文字就会变得无法辨认了。
#### 切片 Slicing

#### 示例：画廊 Art gallery example

#### 控制图像的缩放行为 Controlling image scaling behavior
## Canvas API
### canvas
`CanvasRenderingContext2D.canvas `属性是 `Canvas API` 的一部分，是对与给定上下文关联的`HTMLCanvasElement`对象的只读引用。如果没有 `<canvas>` 元素与之对应，对象值为`null` 。
### 
## 在vue项目的图片上绘制矩形
1. 页面初始化默认绘制矩形
2. 点击绘制，手动在图片上绘制矩形
3. 调整x、y、宽度和高度，自动绘制矩形
```vue
<template>
  <div class="main-img-canvas">
    <el-row :gutter="10">
      <el-col :span="18">
        <!-- 图片和画布 -->
        <div class="top-img-canvas">
          <div @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" @mouseleave="mouseleave"
            :style="imgStyle">
            <img ref="bottomImg" :src="imgSrc" :style="imgStyle">
            <canvas ref="rectCanvas" :width="canvasWidth" :height="canvasHeight" :style="canvasStyle"></canvas>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <!-- 数据显示层 -->
        <el-form ref="form" :model="customMark" label-width="80px">
          <el-form-item label="X:">
            <el-input-number v-model="customMark.x" controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item label="Y:">
            <el-input-number v-model="customMark.y" controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item label="Width:">
            <el-input-number v-model="customMark.width" controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item label="Height:">
            <el-input-number v-model="customMark.height" controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="startMark">{{btnStartMark}}</el-button>
            <el-button @click="onClose">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>

</template>
<script>
  export default {
    name: 'canvasDraw',
    data() {
      return {
        // 开始的X坐标
        startX: 10,
        // 开始的Y坐标
        startY: 10,
        //结束的X坐标
        endX: 300,
        //结束的Y坐标
        endY: 500,
        // 是否开始绘制
        isStartMark: false,
        // 画布
        customcxt: '',
        //原图与展示图片的宽度比
        customRwidth: '',
        //原图与展示图片的高度比
        customRheight: '',
        //根据图片大小自适应样式
        imgStyle: '',
        //根据图片大小canvas自适应样式 居中显示
        canvasStyle: '',
        //根据图片大小自适应canvas宽
        canvasWidth: '',
        //根据图片大小自适应canvas高
        canvasHeight: '',
        //最大宽度
        divWidth: 1369,
        //最大高度
        divHeight: 740,
        // 图片地址
        imgSrc: 'http://10.66.194.27:8083/13,034662641b59a8',
        // 自定义截取结果
        customMark: {},
        isMousedown: false,
        btnStartMark: '绘 制'
      };
    },
    watch: {
      imgSrc() {
        this.drawRect();
      },
      // 监听自定义标记数据重绘矩形
      customMark: {
        handler(n, o) {
          if (!(JSON.stringify(n) === '{}')) {
            this.startX = n.x
            this.startY = n.y
            this.endX = this.startX + n.width
            this.endY = this.startY + n.height
            this.drawRect();
          }
        },
        deep: true,
      }
    },
    // 初始化绘制矩形
    mounted() {
      this.customMark['x'] = this.startX
      this.customMark['y'] = this.startY
      this.customMark['width'] = this.endX - this.startX
      this.customMark['height'] = this.endY - this.startY
      this.drawRect();
    },

    methods: {
      // 开始绘制
      startMark() {
        this.$message.info('您可以在画布上开始绘制矩形')
        this.isStartMark = true
        this.btnStartMark = "绘制中"
      },
      //取消时返回组件调用处所需的数据
      onClose() {
        this.customcxt.clearRect(0, 0, this.divWidth, this.divHeight);
        this.isStartMark = false
        this.customMark = {}
      },
      //确定时返回组件调用处所需的数据
      onMark() {
        this.isStartMark = false
        //获取矩形框Left，Width
        let cLeft = 0;
        let cWidth = 0;
        if (this.startX > this.endX) {
          cLeft = this.endX;
          cWidth = this.startX - this.endX;
        } else {
          cLeft = this.startX;
          cWidth = this.endX - this.startX;
        }

        //获取矩形框Top，Height
        let cTop = 0;
        let cHeight = 0;
        if (this.startY > this.endY) {
          cTop = this.endY;
          cHeight = this.startY - this.endY;
        } else {
          cTop = this.startY;
          cHeight = this.endY - this.startY;
        }

        this.customMark['x'] = parseInt(cLeft / this.customRwidth);
        this.customMark['y'] = parseInt(cTop / this.customRheight);
        this.customMark['width'] = parseInt(cWidth / this.customRwidth);
        this.customMark['height'] = parseInt(cHeight / this.customRheight);
        this.$forceUpdate()
      },

      // 计算img与canvas标签自适应图片的大小
      drawRect() {
        // 画布绑定的属性
        let customCanvas = this.$refs.rectCanvas;
        // 画布
        this.customcxt = customCanvas.getContext("2d");
        // 绑定图片路径
        let img = new Image();
        img.src = this.imgSrc;
        let _this = this;
        // 图片加载完毕开始绘制画布
        img.onload = function () {
          // 画布距离左边的距离
          let canvasleft = 0;
          // 画布距离顶部的距离
          let canvastop = 0;
          //图片宽高比
          let WrH = img.width / img.height;
          //放置图片的容器的宽高比
          let RWrH = _this.divWidth / _this.divHeight;
          // 放置图片的容器和图片的比例
          let scale = 0;
          // 根据宽高比大小判断,自适应的宽和高
          if (RWrH > WrH) {
            // 如果图片高度太大,那么宽度自适应
            scale = _this.divHeight / img.height;
            // 画布的高度是放置图片的容器的高度
            _this.canvasHeight = _this.divHeight;
            // 画布的宽度是等比缩放
            _this.canvasWidth = img.width * scale;
            // 左边距是多余容器的一半
            canvasleft = (_this.divWidth - _this.canvasWidth) / 2
          } else {
            // 如果图片宽度太大,那么高度自适应
            scale = _this.divWidth / img.width;
            _this.canvasHeight = img.height * scale;
            _this.canvasWidth = _this.divWidth;
            canvastop = (_this.divHeight - _this.canvasHeight) / 2
          }
          //图片浮动定位居中显示
          _this.imgStyle = ' position: relative;  width:' + _this.canvasWidth +
            ' px; height:' + _this.canvasHeight + 'px';
          //原图与展示图片的宽高比
          _this.customRwidth = _this.canvasWidth / img.width;
          _this.customRheight = _this.canvasHeight / img.height;
          //画布绝对定位居中显示,覆盖在图片之上
          _this.canvasStyle = 'z-index: 1000;position: absolute;left: ' + canvasleft +
            '; top: ' + canvastop + ';'
          _this.$nextTick(() => {
            let wwidth = _this.endX - _this.startX
            let wheigth = _this.endY - _this.startY
            // 清除画布上的内容
            _this.customcxt.clearRect(0, 0, _this.divWidth, _this.divHeight);
            // 画笔颜色
            _this.customcxt.strokeStyle = "#ff0000";
            // 画笔宽度
            _this.customcxt.lineWidth = "2";
            // 绘制矩形
            _this.customcxt.strokeRect(_this.startX * scale, _this.startY * scale, wwidth * scale, wheigth *
              scale);
          })
        };
      },
      //鼠标按下时执行
      mousedown(e) {
        // 鼠标按下时开始位置与结束位置相同
        // 防止鼠标在画完矩形后 点击图画形成第二个图形
        this.endX = e.offsetX;
        this.endY = e.offsetY;
        this.startX = e.offsetX;
        this.startY = e.offsetY;
        this.isMousedown = true
        this.mousemove(e)
      },
      //鼠标移动时执行
      mousemove(e) {
        // 点击开始绘制清空画布
        if (this.isStartMark) {
          // 清除画布上的内容
          this.customcxt.clearRect(0, 0, this.divWidth, this.divHeight);
        }
        // 点击开始绘制并且鼠标按下
        if (this.isStartMark && this.isMousedown) {
          this.endX = e.offsetX;
          this.endY = e.offsetY;
          let wwidth = this.endX - this.startX;
          let wheigth = this.endY - this.startY;

          // 画笔颜色
          this.customcxt.strokeStyle = "#ff0000";
          // 画笔宽度
          this.customcxt.lineWidth = "2";
          // 绘制矩形
          this.customcxt.strokeRect(this.startX, this.startY, wwidth, wheigth);
        }
      },
      //鼠标松开时执行
      mouseup(e) {
        if (this.isStartMark) {
          this.onMark()
        }
        this.btnStartMark = "绘制"
        this.isMousedown = false
        this.isStartMark = false;
      },
      // 鼠标离开时执行
      mouseleave(e) {
        this.btnStartMark = "绘制"
        this.isMousedown = false
        this.isStartMark = false
      }
    }
  }
</script>
<style lang="less" scoped>
  .main-img-canvas {
    .top-img-canvas {
      width: 1369px;
      height: 740px;
      background-color: #f5f5f575;
      margin: 0 auto;
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: center;
    }
  }
</style>
```
## 参考文献
[canvas解析](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)