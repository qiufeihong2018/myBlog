# tree
[[toc]]
## tree是什么
`Linux tree`命令用于以树状图列出目录的内容。

执行`tree`指令，它会列出指定目录下的所有文件，包括子目录里的文件。

## 安装tree
```
sudo apt-get install tree 
```
## tree各个命令

- 显示所有文件夹和目录
```
tree -a
```
- 显示目录名称而非内容
```
tree -d
```
- 显示完整的相对路径
```
tree -f
```
- 在执行文件，目录，Socket，符号连接，管道名称名称，各自加上"*","/","=","@","|"号
```
tree -F
```
- 以相反次序排列
```
tree -r
```
- 用文件和目录的更改时间排序
```
  tree -t
```
- 只显示 n 层目录 （n 为数字）
```
tree -L n 
```
- 目录显示在前,文件显示在后
```
tree -dirsfirst 
```
- `tree`忽略`node_modules`
```
tree -I '*svn|*node_module*'
```
参数|作用
--|--
-A|使用ASNI绘图字符显示树状图而非以ASCII字符组合。
-C|在文件和目录清单加上色彩，便于区分各种类型。
-D|列出文件或目录的更改时间。
-g|列出文件或目录的所属群组名称，没有对应的名称时，则显示群组识别码。
-i|不以阶梯状列出文件或目录名称。
-I|不显示符合范本样式的文件或目录名称。
-l|如遇到性质为符号连接的目录，直接列出该连接所指向的原始目录。
-n|不在文件和目录清单加上色彩。
-N|直接列出文件和目录名称，包括控制字符。
-p|列出权限标示。
-P|只显示符合范本样式的文件或目录名称。
-q|用"?"号取代控制字符，列出文件和目录名称。
-s|列出文件或目录大小。
-u|列出文件或目录的拥有者名称，没有对应的名称时，则显示用户识别码。
-x|将范围局限在现行的文件系统中，若指定目录下的某些子目录，其存放于另一个文件系统上，则将该子目录予以排除在寻找范围外。

## 参考文献
[tree命令大全](https://blog.csdn.net/askbai666888/article/details/9995837)

[Linux tree命令](http://www.runoob.com/linux/linux-comm-tree.html)



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

下面是小编的公众号

![](https://images.qiufeihong.top/wechat4.jpg)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>