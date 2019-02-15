# mongose学习--Schema、model
真正跑过以上代码就会发现MongoDB的容错性很好，以上代码其实在生成document时漏了一个键reprints赋值，但还是可以保存，而且在查询该条document时reprints这个字段是不会显示的。另外如果在生成document时，我们把键值的名字写错了，MongoDB还是可以忽略被输错的键的，把正确键对应的值存起来，忽略错误键名。

Schema和model的理解
　　不同于关系型数据库，MongoDB作为文档型数据库，Scheme、model、collection、document是其中的四大元素。document是MongoDB里的基本存储单位，collection是众多同类document的集合。Schema定义了一类document的模板，让这一类document在数据库中有一个具体的构成、存储模式。而Schema仅仅是定义了Document是什么样子的，至于生成document和对document进行各种操作（增删改查）则是通过相对应的model来进行的。
　　需要说明的是MongoDB中实际上只有collection和document，Schema和model不过是定义和生成前二者过程中的工具而已。

集合就是 MongoDB 文档组，类似于 RDBMS （关系数据库管理系统：Relational Database Management System)中的表格。


# mongo可视化工具-studio-3t

https://studio3t.com/download/

下载好studio-3t-linux-x64.tar.gz
## 解压
./studio-3t-linux-x64.sh

## 安装

![avatar](../public/mongo.png)
默认是没有密码的,所以认证设为none
