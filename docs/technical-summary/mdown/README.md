## Markdown的研究
[[toc]]
### 标题
> 我们用的最多的标签#

demo

```text
#一级标题
##二级标题
###三级标题
####四级标题
#####五级标题
######六级标题

```

### 字体

demo

*斜体*

**加粗**

***斜体和加粗***

~~删除线~~

```text
*斜体*
**加粗**
***斜体和加粗***
~~删除线~~
```

### 引用

> 可以一直>>>嵌套下去

demo

> 引用的文字1
>> 引用的文字2
```text
> 引用的文字
> 引用的文字1
>> 引用的文字2
```

### 分割线

> 分割线用关键词*或-

demo

---
----
***
****

```text

---
----
***
****
```

### 图片

demo

![avatar](shotPic/main.png)

```text
![avatar](shotPic/main.png)
```

### 超链接

demo

[我的GitHub](https://github.com/qiufeihong2018)

```text
[我的GitHub](https://github.com/qiufeihong2018)
```

### 列表

>嵌套列表上下级之间差了两个space
demo
- 列表
* 列表
+ 列表

1. 列表
2. 列表
3. 列表

- 列表   
  - 列表
  - 列表
    - 列表
    
    
```text
- 列表
* 列表
+ 列表

1. 列表
2. 列表
3. 列表

- 列表   
  - 列表
  - 列表
    - 列表

```
### 表格
> -居中  :-居左 -:居右 

demo

日期|姓名|地址
-|:-|-:
2016-05-02|王小虎|上海市普陀区金沙江路 1518 弄
2016-05-04|王小虎|上海市普陀区金沙江路 1517 弄
2016-05-01|王小虎|上海市普陀区金沙江路 1519 弄
2016-05-03|王小虎|上海市普陀区金沙江路 1516 弄

```text
日期|姓名|地址
-|:-|-:
2016-05-02|王小虎|上海市普陀区金沙江路 1518 弄
2016-05-04|王小虎|上海市普陀区金沙江路 1517 弄
2016-05-01|王小虎|上海市普陀区金沙江路 1519 弄
2016-05-03|王小虎|上海市普陀区金沙江路 1516 弄
```

### 代码

demo

`fetchData() {
              apiAssets.getTotalFlow().then(res => {
                this.chartData = res.data.data.map(item => [item.key, item.total_bytes.value])
              })
            }`

(```)     
 fetchData() {
             apiAssets.getTotalFlow().then(res => {
               this.chartData = res.data.data.map(item => [item.key, item.total_bytes.value])
             })
           }
(```)


```text
`fetchData() {
              apiAssets.getTotalFlow().then(res => {
                this.chartData = res.data.data.map(item => [item.key, item.total_bytes.value])
              })
            }`

(```)     
 fetchData() {
             apiAssets.getTotalFlow().then(res => {
               this.chartData = res.data.data.map(item => [item.key, item.total_bytes.value])
             })
           }
(```)
```

### gif和视频
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" height=200 width=400 src="http://img.soogif.com/dCLy9LZlkF6mv3FwPxCjBj7l0ciupNMc.gif_s400x0"></iframe>

![](http://img.soogif.com/dCLy9LZlkF6mv3FwPxCjBj7l0ciupNMc.gif_s400x0)

用`iframe`包裹gif和视频，就可以正常访问啦
```html
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" height=200 width=400 src="http://img.soogif.com/dCLy9LZlkF6mv3FwPxCjBj7l0ciupNMc.gif_s400x0"></iframe>
```
或是
```html
![](http://img.soogif.com/dCLy9LZlkF6mv3FwPxCjBj7l0ciupNMc.gif_s400x0)
```

> 参考[Markdown基本语法](https://www.jianshu.com/p/191d1e21f7ed)



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>