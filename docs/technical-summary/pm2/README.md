# pm2
[[toc]]

![avatar](./pm2.png)
## 什么是pm2
>PM2 Runtime是具有内置Load Balancer的Node.js应用程序的生产过程管理器。它允许您永久保持应用程序的活动，无需停机即可重新加载它们，并促进常见的Devops任务。

### PM2的主要特性:

- 内建负载均衡
- 后台运行
- 0秒停机重新加载
- 具有Ubuntu和CentOS 的启动脚本
- 停止不稳定的进程（避免无限循环）
- 控制台检测
- 提供 HTTP API
- 远程控制和实时的接口API ( Nodejs 模块,允许和PM2进程管理器交互 )

### pm2常用命令
- 启动程序
```
pm2 start app.js
```

- 重启机器重启
```
pm2 startup
```

- 进程列表
```
pm2 ls
```

- 热更新
```
pm2 start app.js --watch [--ignore-watch /*/]
```

- 列出应用
```
pm2 list
```

- 显示单条信息
```
pm2 show <app>
```

- 重新开始
```
pm2 restart app
```

- 停止
```
pm2 stop <app>
```

- 删除
```
pm2 delete <app>/<id>
```

- 显示日志
```
pm2 logs
```

- 重命名
```
pm2 start app.js --name='paa'//paa就是进程名

pm2 restart paa
```
## 为什么用pm2

守护进程方式|作用
--|--
supervisor|开发环境
forever|多个访问量不大且不需监控的站点
pm2|访问量大且需要监控的站点

综上所述：pm2高大上
## 怎么用pm2

### 安装
```
npm install pm2 --save
```

### 在vue项目中使用pm2
1. 在根目录下创建xxx.js

用作启动服务器
关键词|作用
--|--
 xxx|进程名
 ./dist|打包好后的文件夹路径
 ./dist/index.html|打包好后的文件夹入口页面
 fs.readFileSync|同步读取文件
 express.static|调用静态目录
 7777|项目端口
 chalk|类似于console
```js
const fs = require('fs');
const path = require('path');
const express = require('express');
const chalk = require('chalk')
const xxx = express();
xxx.use(express.static(path.resolve(__dirname, './dist')))

xxx.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})
xxx.listen(7777, res => {
    console.log(chalk.yellow('Start Service On 7777'));
});

```

2. 在命令文件package.json中添加启动命令

先打包，后调用
```js
   "server": "npm run build && pm2 start appjs"
```



## 注意点

### pm2: command not found

npm的环境变量没有放进系统里，还需要用` ln -s` 挂一下软连接才行
命令|分析
--|--
/opt/nodejs/bin/pm2|当前目录
/usr/bin/pm2|目标目录
```
whereis pm2
pm2: /opt/nodejs/bin/pm2
sudo ln -s /opt/nodejs/bin/pm2 /usr/bin/pm2
```
## 参考文献
[PM2官网](https://pm2.io/doc/en/runtime/quick-start/)

[vue-cli pm2 开机自启](https://www.jianshu.com/p/d2a640b8661c)

[CentOS7 pm2 部署node错误提示pm2 command not found](https://segmentfault.com/q/1010000013392948)

[nodejs项目管理之supervisor||pm2||forever](https://www.cnblogs.com/lggggg/p/6155233.html)




最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>