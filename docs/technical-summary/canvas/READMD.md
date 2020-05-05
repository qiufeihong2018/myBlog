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
2. lineCap 绘制每一条线段末端的属性（有3个可能的值：butt, round 和 square。默认值是 butt）
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