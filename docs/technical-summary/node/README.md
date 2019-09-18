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
1. 
操作：

```
cd /usr/mongodb/bin

sudo ./mongod  -dbpath /data/db/
```
 
./mongo 

都在mongodb的bin目录下

2. 
```
 sudo /usr/bin/mongod --config /etc/mongod.conf
```


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
## n管理node版本
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


## node编写守护进程

目前Nodejs编写一个守护进程非常简单，在6.3.1版本中已经存在非常方便的API，这些API可以帮助我们更方便的创建一个守护进程。本文仅在描述守护进程的创建方式，而不会对守护进程所要执行的任务做任何描述。

### 守护进程的启动方式
如果不在Nodejs环境中，我们如何创建守护进程？过程如下：

1. 创建一个进程A。
2. 在进程A中创建进程B，我们可以使用fork方式，或者其他方法。
3. 对进程B执行 setsid 方法。
4. 进程A退出，进程B由init进程接管。此时进程B为守护进程。

### setsid详解
setsid 主要完成三件事：

1. 该进程变成一个新会话的会话领导。
2. 该进程变成一个新进程组的组长。
3. 该进程没有控制终端。

然而，Nodejs中并没有对 setsid 方法的直接封装，翻阅文档发现有一个地方是可以调用该方法的。

### Nodejs中启动子进程方法
借助 clild_process 中的 spawn 即可创建子进程，方法如下：
```js
var spawn = require('child_process').spawn;
var process = require('process');

var p = spawn('node',['b.js']);
console.log(process.pid, p.pid);
```
注意，这里只打印当前进程的PID和子进程的PID，同时为了观察效果，我并没有将父进程退出。

b.js 中代码很简单，打开一个资源，并不停的写入数据。
```
var fs = require('fs');
var process = require('process');

fs.open("/Users/mebius/Desktop/log.txt",'w',function(err, fd){
	console.log(fd);
	while(true)
	{
		fs.write(fd,process.pid+"\n",function(){});
	}
});
```
运行后,打印进程的pid

我们来看以下 top 命令下的进程情况。


看一看到，此时父进程PID为17055，子进程的PPID为17055，PID为17056.

### Nodejs中setsid的调用
到此为止，守护进程已经完成一半，下面要调用setsid方法，并且退出父进程。

代码修改如下：
```
var spawn = require('child_process').spawn;
var process = require('process');

var p = spawn('node',['b.js'],{
        detached : true
    });
console.log(process.pid, p.pid);
process.exit(0);
```
在 spawn 的第三个参数中，可以设置 detached 属性，如果该属性为true，则会调用 setsid 方法。这样就满足我们对守护进程的要求。

在此运行命令。


查看 top 命令

xintop.png

可以看到，当前仅存在一个PID为17062的进程，这个进程就是我们要的守护进程。

 由于每次运行PID都不同，所以此次子进程的PID于第一次不同。

### 总结
守护进程最重要的是稳定，如果守护进程挂掉，那么其管理的子进程都将变为孤儿进程，同时被init进程接管，这是我们不愿意看到的。于此同时，守护进程对于子进程的管理也是有非常多的发挥余地的，例如PM2中，将一个进程同时启动4次，达到CPU多核使用的目的（很有可能你的进程在同一核中运行），进程挂掉后自动重启等等，这些事情等着我们去造轮子。

总体来说，Nodejs启动守护进程方式比较简单，默认所暴露的API也屏蔽了很多系统级别API，使得大家使用上更加方便，但没有接触过Linux的人在理解上有一些复杂。推荐大家学习Nodejs的同时，多学习Linux系统调用的和系统内核的一些东西。

## 参考文献
[Nodejs编写守护进程](https://cnodejs.org/topic/57adfadf476898b472247eac)

[如何安装 npm 并管理 npm 版本](https://www.npmjs.cn/getting-started/installing-node/)



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>