# MongoDB深入浅出

## Ubuntu安装MongoDB
### 导入包管理系统使用的公钥
>导入包管理系统使用的公钥。
Ubuntu软件包管理工具（即dpkg和apt）通过要求分销商使用GPG密钥签署软件包来确保软件包的一致性和真实性。

```
sudo apt-key adv --keyserver hkp：//keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
```

### 为MongoDB创建一个列表文件
> 选择适用的版本。如果不确定主机运行的是什么Ubuntu版本，请在主机上打开终端或shell并执行。`lsb_release -dc`

版本|命令
--|--
Ubuntu18.04|echo  “deb [arch = amd64] https://repo.mongodb.org/apt/ubuntu bionic / mongodb-org / 4.0 multiverse”  | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
Ubuntu16.04|echo  “deb [arch = amd64，arm64] https://repo.mongodb.org/apt/ubuntu xenial / mongodb-org / 4.0 multiverse”  | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
Ubuntu14.04|echo  “deb [arch = amd64] https://repo.mongodb.org/apt/ubuntu trusty / mongodb-org / 4.0 multiverse”  | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

### 重新加载本地包数据库

```
sudo apt-get update
```

### 安装MongoDB

方式|命令|
--|--|--
最新版本|sudo apt-get install -y mongodb-org
指定版本|sudo apt-get install -y mongodb-org = 4 .0.7 mongodb-org-server = 4 .0.7 mongodb-org-shell = 4 .0.7 mongodb-org-mongos = 4 .0.7 mongodb-org-tools = 4 .0.7

防止意外升级
```
echo  “mongodb-org hold”  | sudo dpkg --set-selections
echo  “mongodb-org-server hold”  | sudo dpkg --set-selections
echo  “mongodb-org-shell hold”  | sudo dpkg --set-selections
echo  “mongodb-org-mongos hold”  | sudo dpkg --set-selections
echo  “mongodb-org-tools hold”  | sudo dpkg --set-selections
```

## MongoDB导入Json和Bson

### linux
```
mongorestore -d <db_name> <bson_folder>
```
### windows
```
mongorestore.exe -d <db_name> <bson_folder>
```

## Studio 3T下操作MongoDB的基本命令

## 用node来操作MongoDB完成增、删、改、查、排序、分页功能

## mongose学习--Schema、model
真正跑过以上代码就会发现MongoDB的容错性很好，以上代码其实在生成document时漏了一个键reprints赋值，但还是可以保存，而且在查询该条document时reprints这个字段是不会显示的。另外如果在生成document时，我们把键值的名字写错了，MongoDB还是可以忽略被输错的键的，把正确键对应的值存起来，忽略错误键名。

Schema和model的理解
　　不同于关系型数据库，MongoDB作为文档型数据库，Scheme、model、collection、document是其中的四大元素。document是MongoDB里的基本存储单位，collection是众多同类document的集合。Schema定义了一类document的模板，让这一类document在数据库中有一个具体的构成、存储模式。而Schema仅仅是定义了Document是什么样子的，至于生成document和对document进行各种操作（增删改查）则是通过相对应的model来进行的。
　　需要说明的是MongoDB中实际上只有collection和document，Schema和model不过是定义和生成前二者过程中的工具而已。

集合就是 MongoDB 文档组，类似于 RDBMS （关系数据库管理系统：Relational Database Management System)中的表格。


## mongo可视化工具-studio-3t

https://studio3t.com/download/

下载好studio-3t-linux-x64.tar.gz
## 解压
./studio-3t-linux-x64.sh

## 安装

![avatar](../../technical-summary/public/mongo.png)

::: tip
默认是没有密码的,所以认证设为none
:::


## 参考文献
[MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

[MongoDB 导入Json和Bson](https://blog.csdn.net/lwc5411117/article/details/79675326)

[node-express项目的搭建并通过mongoose操作MongoDB实现增删改查分页排序（四）](https://www.cnblogs.com/wangmaoling/p/10339222.html)

[Studio 3T下操作MongoDB的基本命令](https://www.jianshu.com/p/577cb638787c)
