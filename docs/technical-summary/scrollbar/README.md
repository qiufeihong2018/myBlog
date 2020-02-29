# 【CSS】滚动条样式的优化
![avatar](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/scroll15.png)

## 前言
优化后的滚动条会提亮我们的网站页面。

![avatar](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/scroll8.png)
例如：`CSS-TRICKS`这个网站如果采用的是浏览器默认的滚动条，不进行优化，页面会显得很不搭。

所以该网站的滚动条样式优化如下：
```css
html::-webkit-scrollbar {
    width: 30px;
    height: 30px;
}
html::-webkit-scrollbar-thumb {
    background: -webkit-gradient(linear,left top,left bottom,from(#ff8a00),to(#e52e71));
    background: linear-gradient(180deg,#ff8a00,#e52e71);
    border-radius: 30px;
    box-shadow: inset 2px 2px 2px hsla(0,0%,100%,.25), inset -2px -2px 2px rgba(0,0,0,.25);
}
html::-webkit-scrollbar-track {
    background: linear-gradient(90deg,#201c29,#201c29 1px,#100e17 0,#100e17);
}
```
那么`::-webkit-scrollbar`、`::-webkit-scrollbar-thumb`和`::-webkit-scrollbar-track`是什么以及怎么用请继续往下阅读。
## webkit内核下
这些伪元素仅使用在支持`webkit`的浏览器上（如`Chrome`和`Safari`）。

滚动条伪元素|作用的位置
--|--
::-webkit-scrollbar|整个滚动条
::-webkit-scrollbar-button|滚动条上的按钮 (上下箭头)
::-webkit-scrollbar-thumb|滚动条上的滚动滑块
::-webkit-scrollbar-track|滚动条轨道
::-webkit-scrollbar-track-piece|滚动条没有滑块的轨道部分
::-webkit-scrollbar-corner|当同时有垂直滚动条和水平滚动条时交汇的部分
::-webkit-resizer|某些元素的corner部分的部分样式(例:textarea的可拖动按钮)

在图上就能更清晰地呈现：

![avatar](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/scroll2.png)

![avatar](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/scroll9.png)
![avatar](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/scroll10.png)
![avatar](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/scroll11.png)
![avatar](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/scroll12.png)
![avatar](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/scroll13.png)
![avatar](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/scroll14.png)

总结：这些伪元素支持`Chrome` `Edge`、`Opera` `Safari`、`Android webview`、`Chrome for Android`、`Opera for Android`、`Safari on iOS`和`Samsung Internet`,不支持`Firefox`、`Internet Explorer`和`Firefox for Android`。所以想要兼容其余浏览器，就得转`Trident（IE）`内核下目录。

当然`webkit`提供的不止这些，还有很多伪类，更丰富滚动条样式：

滚动条伪类|作用的位置
--|--
:horizontal|适用于任何水平方向上的滚动条
:vertical|适用于任何垂直方向的滚动条
:decrement|适用于按钮和轨道碎片。表示递减的按钮或轨道碎片，例如可以使区域向上或者向右移动的区域和按钮
:increment|适用于按钮和轨道碎片。表示递增的按钮或轨道碎片，例如可以使区域向下或者向左移动的区域和按钮
:start|适用于按钮和轨道碎片。表示对象（按钮 轨道碎片）是否放在滑块的前面
:end|适用于按钮和轨道碎片。表示对象（按钮 轨道碎片）是否放在滑块的后面
:double-button|适用于按钮和轨道碎片。判断轨道结束的位置是否是一对按钮。也就是轨道碎片紧挨着一对在一起的按钮。
:single-button|适用于按钮和轨道碎片。判断轨道结束的位置是否是一个按钮。也就是轨道碎片紧挨着一个单独的按钮。
:no-button|表示轨道结束的位置没有按钮。
:corner-present|表示滚动条的角落是否存在。
:window-inactive|适用于所有滚动条，表示包含滚动条的区域，焦点不在该窗口的时候。

根据这些知识，可以得出`CSS-TRICKS`这个网站的滚动条样式：
1. 水平滚动条高`30px`,垂直滚动条宽`30px`
2. 滚动条上的滚动滑块背景色是从上到下`#ed4f32`渐变到`#f5f5f5`，边框圆角是`30px`，内部阴影是`x`方向上和`y`方向上平移`2px`和`-2px`,阴影颜色分别是`hsla(0,0%,100%,.25)`和` rgba(0,0,0,.25)`
3. 滚动条轨道背景色渐变

写炫酷的滚动条样式是要积累的。

不会写`box-shoadow`可以使用[Box-shadow_generator生成器](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Background_and_Borders/Box-shadow_generator)

伪元素+伪类更能精准定位达到意想不到的效果。
### 作用在滚动条的上半边
```css
html::-webkit-scrollbar-track-piece:vertical:start {
    background: rgb(225, 126, 16);
}
```
滚动条的上半边就是背景色是`rgb(225, 126, 16)`：
![](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/10.gif)
是不是很像车开过，留下的车痕
### 焦点不在滑块上
```css
html::-webkit-scrollbar-thumb:window-inactive {
    background: rgb(160, 87, 221);
}
```
![](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/11.gif)
### 鼠标在滚动条递减的按钮上
```css
.div-2::-webkit-scrollbar-button:decrement:hover {
    background: #fff;
}
```
![](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/12.gif)

### 各伪元素的颜色区分图
```
红色 ::-webkit-scrollbar

橙色 ::-webkit-scrollbar-button

黄色 ::-webkit-scrollbar-thumb

绿色 ::-webkit-scrollbar-track

青色 ::-webkit-scrollbar-track-piece

蓝色 ::-webkit-scrollbar-corner
```

![](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/2.gif)

`textarea`下的`-webkit-resizer `
```
 紫色 ::-webkit-resizer 
```
![](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/3.gif)
### 默认浏览器
![](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/1.gif)
### 自定义滚动条案例
#### 简约风格的
![](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/4.gif)
#### 胶囊风格的
![](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/5.gif)
#### 彩条风格的
![](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/6.gif)
#### 两色风格的
![](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/7.gif)
#### 图片按钮的
![](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/8.gif)


## Trident（IE）内核下

IE5+上的滚动条属性|其作用
--|--
scrollbar-3dlight-color|设置对象滚动条3d亮色阴影边框(threedlightshadow)的外观颜色。
scrollbar-darkshadow-color|设置对象滚动条3d暗色阴影边框(threeddarkshadow)的外观颜色。
scrollbar-highlight-color|设置对象滚动条3d高亮边框(threedhighlight)的外观颜色。
scrollbar-shadow-color|设置对象滚动条3d阴影边框(threedshadow)的外观颜色。
scrollbar-arrow-color|设置对象滚动条方向箭头的颜色。当滚动条出现但不可用时，此属性失效。
scrollbar-face-color|设置对象滚动条3D表面的(threedface)的外观颜色。
scrollbar-track-color|设置对象滚动条拖动区域的外观颜色。
scrollbar-base-color|设置对象滚动条基准颜色，其它界面颜色将据此自动调整。
scrollbar-color|该CSS属性设置滚动条轨道和按钮的颜色

在图上就能更清晰地呈现：

![avatar](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/scroll.jpg)

都是`color`，所以在IE上只能改颜色
![](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/9.gif)

![avatar](https://qiufeihong-blog.oss-cn-hangzhou.aliyuncs.com/scroll/gif/scroll7.png)

经测试IE7以上，`scrollbar-3dlight-color:`、`scrollbar-color`和`scrollbar-darkshadow-color`就起不到作用。

所以，只要有耐心，快去实现头图的滚动条吧。

所有demo的[预览地址](http://blog-demo.qiufeihong.top/var/lib/jenkins/jobs/vuepress-blog/workspace/docs/technical-summary/scrollbar/scroll.html)

## 参考文献
[::-webkit-scrollbar](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar)

[scrollbar-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scrollbar-color)

![](https://user-gold-cdn.xitu.io/2019/9/10/16d1a4868c5f5634?w=2800&h=800&f=jpeg&s=202866)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

