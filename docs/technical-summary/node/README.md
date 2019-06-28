# NODE
[[toc]]

## ubuntu mongo connect failed

执行mongo,报错如下：

```
./mongo
MongoDB shell version v4.0.0
connecting to: mongodb://127.0.0.1:27017
2018-07-30T14:24:00.807+0800 E QUERY    [js] Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed: SocketException: Error connecting to 127.0.0.1:27017 :: caused by :: Connection refused :
connect@src/mongo/shell/mongo.js:251:13
@(connect):1:6
exception: connect failed
```
是没有执行mongod,就直接执行mongo，才会报错

操作：

```
sudo ./mongod  -dbpath /data/db/
```
 
./mongo 
#都在mongodb的bin目录下


## npm install -save 和 -save-dev


```
npm install moduleName # 安装模块到项目目录下
 
npm install -g moduleName # -g 的意思是将模块安装到全局，具体安装到磁盘哪个位置，要看 npm config prefix 的位置。
 
npm install -save moduleName # -save 的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。
 
npm install -save-dev moduleName # -save-dev 的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。
```


## linux下升级npm以及node

### npm升级
废话不多说，直接讲步骤。先从容易的开始，升级npm。

npm这款包管理工具虽然一直被人们诟病，很多人都推荐使用yarn，但其使用人数还是不见减少，况且npm都是随node同时安装好的，一时让我抛弃它，还是有点难做到。
```
npm i -g npm
```
是的，你没看错。升级npm只需要像安装其它包一样install一下就行，windows和linux下都可以通过此方式进行升级，你还能指定npm的版本。
```
npm i -g npm@5.0.0
```

### node升级
node升级相对于npm来说就复杂一点了。

1. 首先通过npm安装node的版本管理工具“n“，不用惊讶，名字就是这么简单，就叫n。据了解，n是node下的一个模块，作者是Express框架的开发者。

```
npm i -g n
```

2. 检查n模块

先查看系统node的安装路径，n模块的默认路径为 ‘/usr/local’。
```
$ which node

/data/home/server/nodejs/bin/node   #举个例子
```
如果路径与n模块的默认路径相同可以跳过3步骤。

3. 通过N_PREFIX变量来修改 n 的默认node安装路径。

- 编辑环境配置文件
```
vim ~/.bash_profile   
```

- 将下面两行代码插入到文件末尾
```
export N_PREFIX=/data/home/server/nodejs #node实际安装位置
export PATH=$N_PREFIX/bin:$PATH
```
- :wq保存退出；

执行source使修改生效。
```
$ source ~/.bash_profile
```

- 确认一下环境变量是否生效。
```
echo $N_PREFIX
/data/home/server/nodejs
```

4. n模块常用命令
```
Commands:

  n                              Output versions installed
  n latest                       Install or activate the latest node release
  n -a x86 latest                As above but force 32 bit architecture
  n stable                       Install or activate the latest stable node release
  n lts                          Install or activate the latest LTS node release
  n <version>                    Install node <version>
  n use <version> [args ...]     Execute node <version> with [args ...]
  n bin <version>                Output bin path for <version>
  n rm <version ...>             Remove the given version(s)
  n prune                        Remove all versions except the current version
  n --latest                     Output the latest node version available
  n --stable                     Output the latest stable node version available
  n --lts                        Output the latest LTS node version available
  n ls                           Output the versions of node available
```

- 安装node最新版本
```
n latest
```

- 安装稳定版
```
n stable
```
- 安装指定版本
```
n v7.10.0
```
- 查看已安装版本
```
n
```
- 删除指定版本
```
n rm 6.4.0
```

## npm 问题
npm install 安装 node_modules中的vue-virtual-scroll-list包缺少index.js
## 升级node
[Install Node.js to install n to install Node.js?](https://stackoverflow.com/questions/19451851/install-node-js-to-install-n-to-install-node-js)
从源码中安装n
```
mkdir ~/tmp
cd ~/tmp
git clone https://github.com/tj/n
cd n
make install
```
安装完后，安装最新node版本
```
n stable
```


## 参考文献
