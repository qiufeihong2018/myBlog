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


> 参考[Markdown基本语法](https://www.jianshu.com/p/191d1e21f7ed)
