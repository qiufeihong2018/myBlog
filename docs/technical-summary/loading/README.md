#  最全的vue版css实现loading加载图
[[toc]]
![avatar](../public/jk.jpeg)

[原文地址](https://github.com/qiufeihong2018/vuepress-blog/tree/master/docs/technical-summary/jenkins)

## 背景
loading加载图在开发中是最常见的，最普通的，但是每次在用的时候再去全网（google、bing、codepen等）找，总感觉效率低，还要将其中用了haml等文档解析器和scss等css预处理器翻译成html和css，要是有一款专门做loading加载图的网站那该有多好，直接将其源码拖过来就可以用，减少我们搜索、钻研和开发的时间，以便提高效率。
## 具体步骤
- 项目和远程仓库
    - 将最新的代码推送到远程仓库
- 远程仓库和Jenkins
    - 定时获取远程仓库上最新的完整项目下载到本地 
- Jenkins与远程服务器
    - 通过jenkins上传到远程服务器

![avatar](../public/process.jpg)


## 安装
先添加其`Debian`软件包，然后更新存储库,最后使用存储库`apt-get`安装`jenkins`。

### 安装运行环境
安装jdk
```
sudo apt-get install openjdk-8-jdk
```
安装完成如下
```
update-alternatives: using /usr/lib/jvm/java-8-openjdk-amd64/bin/appletviewer to provide /usr/bin/appletviewer (appletviewer) in auto mode
update-alternatives: using /usr/lib/jvm/java-8-openjdk-amd64/bin/jconsole to provide /usr/bin/jconsole (jconsole) in auto mode
Processing triggers for libc-bin (2.23-0ubuntu10) ...
Processing triggers for systemd (229-4ubuntu21.2) ...
Processing triggers for ureadahead (0.100.0-19) ...
Processing triggers for ca-certificates (20170717~16.04.1) ...
Updating certificates in /etc/ssl/certs...
0 added, 0 removed; done.
Running hooks in /etc/ca-certificates/update.d...

done.
done.
```
### 存储库密钥添加到系统
```
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
```
出现`ok`，添加成功
### Debian包存储库地址添加到服务器`sources.list`
```
echo deb http://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list
```
添加成功如下
```
deb http://pkg.jenkins.io/debian-stable binary/
```
### 更新存储库
```
sudo apt-get update
```
更新成功如下
```
Ign:17 http://pkg.jenkins.io/debian-stable binary/ InRelease                   
Get:18 http://pkg.jenkins.io/debian-stable binary/ Release [2042 B]
Get:19 http://pkg.jenkins.io/debian-stable binary/ Release.gpg [181 B]
Ign:20 https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 InRelease
Hit:21 https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 Release
Get:23 http://pkg.jenkins.io/debian-stable binary/ Packages [14.7 kB]
Fetched 6813 kB in 3s (2187 kB/s)     
Reading package lists... Done
```
### 安装jenkins
```
sudo apt-get install jenkins
```
安装成功如下
```
perl: warning: Falling back to a fallback locale ("en_US.UTF-8").
locale: Cannot set LC_ALL to default locale: No such file or directory
Selecting previously unselected package daemon.
(Reading database ... 136881 files and directories currently installed.)
Preparing to unpack .../daemon_0.6.4-1_amd64.deb ...
Unpacking daemon (0.6.4-1) ...
Selecting previously unselected package jenkins.
Preparing to unpack .../jenkins_2.164.2_all.deb ...
Unpacking jenkins (2.164.2) ...
Processing triggers for man-db (2.7.5-1) ...
Processing triggers for systemd (229-4ubuntu21.2) ...
Processing triggers for ureadahead (0.100.0-19) ...
Setting up daemon (0.6.4-1) ...
Setting up jenkins (2.164.2) ...
Processing triggers for systemd (229-4ubuntu21.2) ...
Processing triggers for ureadahead (0.100.0-19) ...
```
## 修改默认端口8080
- 修改 `/etc/init.d/jenkins` 脚本
```
sudo vim /etc/init.d/jenkins
```
修改`$HTTP_PORT`改成所需的端口
``` {3}
  # Verify that the jenkins port is not already in use, winstone does not exit
    # even for BindException
    check_tcp_port "http" "$HTTP_PORT" "1314" "$HTTP_HOST" "0.0.0.0" || return 2

    # If the var MAXOPENFILES is enabled in /etc/default/jenkins then set the max open files to the
    # proper value

```
- 修改 `/etc/default/jenkins` 文件

```
sudo vim  /etc/default/jenkins
```
修改`HTTP_PORT`改成所需的端口
``` {10}
ration, build records,
#   that sort of things.
#
#   If commented out, the value from the OS is inherited,  which is normally 022 (as of Ubuntu 12.04,
#   by default umask comes from pam_umask(8) and /etc/login.defs

# UMASK=027

# port for HTTP connector (default 8080; disable with -1)
HTTP_PORT=1314


# servlet context, important if you want to use apache proxying
PREFIX=/$NAME

# arguments to pass to jenkins.
# --javahome=$JAVA_HOME
# --httpListenAddress=$HTTP_HOST (default 0.0.0.0)
# --httpPort=$HTTP_PORT (default 8080; disable with -1)
# --httpsPort=$HTTP_PORT
# --argumentsRealm.passwd.$ADMIN_USER=[password]
     
```

- 重启服务器
```
sudo systemctl restart jenkins
```

::: danger 改完后会重启出现bug
Warning: jenkins.service changed on disk. Run 'systemctl daemon-reload' to reload units.
:::
解决方法：

1. 
```
systemctl daemon-reload
```
2.
```
systemctl start jenkins
```
新端口是1314
![avatar](../public/jk40.png)
## 启动jenkins
```
sudo systemctl start jenkins
```
- 用下面命令测试或者直接ip+端口或者0.0.0.0:8080访问`jenkins`
```
sudo systemctl status jenkins
```
- 成功如下：
```
● jenkins.service - LSB: Start Jenkins at boot time
   Loaded: loaded (/etc/init.d/jenkins; bad; vendor preset: enabled)
   Active: active (exited) since 四 2019-04-18 09:00:28 CST; 8h ago
     Docs: man:systemd-sysv-generator(8)
  Process: 1136 ExecStart=/etc/init.d/jenkins start (code=exited, status=0/SUCCE

4月 18 09:00:24 devue-System-Product-Name systemd[1]: Starting LSB: Start Jenkin
4月 18 09:00:27 devue-System-Product-Name jenkins[1136]: Correct java version fo
4月 18 09:00:27 devue-System-Product-Name jenkins[1136]:  * Starting Jenkins Aut
4月 18 09:00:27 devue-System-Product-Name su[1511]: Successful su for jenkins by
4月 18 09:00:27 devue-System-Product-Name su[1511]: + ??? root:jenkins
4月 18 09:00:27 devue-System-Product-Name su[1511]: pam_unix(su:session): sessio
4月 18 09:00:28 devue-System-Product-Name jenkins[1136]:    ...done.
4月 18 09:00:28 devue-System-Product-Name systemd[1]: Started LSB: Start Jenkins
```

- jenkins默认端口就是8080，需要解锁jenkins

![avatar](../public/jk1.png)

- 将拷贝的密码填入,点击继续

```
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

- 点击安装建议的插件
![avatar](../public/jk2.png)

- 开始安装，等的时间会比较久
![avatar](../public/jk3.png)

- 安装完成，会提示设置管理用户。可以选择跳过，但是密码未知。最好还是创建用户。
![avatar](../public/jk4.png)

- 创建好用户后，进入实例配置
![avatar](../public/jk5.png)

- 欢迎来到jenkins面板，开始我们的表演
![avatar](../public/jk6.png)

::: warning
jenkins无法登录或者空白页面
:::
解决方案：
```
vim /var/lib/jenkins/config.xml
```
在其中版本信息后加入
```
<authorizationStrategy class="hudson.security.AuthorizationStrategy$Unsecured"/>
  <securityRealm class="hudson.security.SecurityRealm$None"/>
```
重启服务器即可
```
sudo systemctl restart jenkins
```
## 连接github
### 在jenkin上的操作：安装相关插件
- 安装插件'Publish Over SSH',连接远程服务器的插件。

下图是已经安装后的
![avatar](../public/jk19.png)
- 安装插件'[GitHub Integration Plugin](https://github.com/KostyaSha/github-integration-plugin/blob/master/README.adoc)',GitHub集成插件
### 在github上的操作：配置webhook
- github项目中点击`Settings`选项卡
  - 点击`webhook`菜单项
    - 添加`webhook`
    ![avatar](../public/jk14.png)
      - `Payload URL`中`http://`+jenkins部署的ip和端口号+`/github-webhook/`
      - `Content type`中选择`application/json`
      - `Which events would you like to trigger this webhook?`选择`just the push event`
      - 选择`Active`  
      - 点击`Update webhook`
      ![avatar](../public/jk13.png)
### jenkins拉取github上vue代码在本地启动

- 新建任务
  - 任务名随意
  - 选择`构建一个自由风格的软件项目`，最后`确定`
![avatar](../public/jk8.png)
 
- 绑定github项目
![avatar](../public/jk7.png)

- 绑定项目的下载链接
![avatar](../public/jk9.png)
  - 选择`Git`
  - 在`Repositories`中的`Repository URL`填入项目下载链接(http)
  - `Credentials`中添加身份信息
    - 在类型中选择`Username with password`
    - 用户名和密码就是github的账号和密码，最后`确定`
![avatar](../public/jk10.png)
  - `Branches to build`选择部署的分支(*/分支名)

- 构建触发器
  - 选择`GitHub hook trigger for GITScm polling`
![avatar](../public/jk11.png)

- 构建
  - 执行shell
    - 命令
    ```
    cd /var/lib/jenkins/workspace/vue 
    npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver 
    npm install
    npm run dev
    ```
    ![avatar](../public/jk12.png)
    - 命令不能缺，否则包下不完整
    ```
        npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver 
    ```    
- 保存    
任务创建完成，`jenkins`大功告成
### jenkins拉取github上vue代码在远程服务器启动
- 连接远程服务器
  - 系统管理->系统设置->Publish over SSH
   	- Passphrase:输入jenkins的密码
   	- Key:jenkins私钥
   	- Name:服务器ip名字
   	- Hostname:服务器ip
   	- Username:服务器中的用户名
   	- Remote Directory:项目地址
   	- 点击`Test Configuration`,出现`success`，那么连接成功
![avatar](../public/jk20.png)
  - 远程服务器
    - 设置公钥  	
  
  > 获取公钥和私钥  
  ```
  su jenkins
  ssh-keygen -t rsa
  ```  
> 判断是否生成公钥和私钥
```
ls -l /var/lib/jenkins/.ssh/
```
```
jenkins@devue-System-Product-Name:/home/devue$ ls -l /var/lib/jenkins/.ssh/
total 8
-rw------- 1 jenkins jenkins 1675 4月  19 16:26 id_rsa
-rw-r--r-- 1 jenkins jenkins  415 4月  19 16:26 id_rsa.pub
```    
> 拷贝公钥
```
cd /var/lib/jenkins/.ssh/
cat id_rsa.pub >> authorized_keys
chmod 600 authorized_keys
```  
  
  将公钥放进远程服务器 
  ```
    vim ~/.ssh/authorized_keys 
  ```


- 立即构建
传输失败
   ![avatar](../public/jk24.png)





## 连接gitlab
### 源码管理
![avatar](../public/jk22.png)
`Repository URL`必须要http请求
### 构建
### 安装`Gitlab Hook`
::: danger
如果没有安装`Gitlab Hook`和gitlab上增加`webhook`的话，会报错
:::
![avatar](../public/jk29.png)
- gitlab项目侧边栏中`Settings-Integrations`增加`webhook`
![avatar](../public/jk30.png)
- 添加`Gitlab Hook`插件
![avatar](../public/jk31.png)


![avatar](../public/jk23.png)
### jenkins轮询gitlab(必须要是管理员身份)
jenkins想要执行下一个构建任务的时候，是必须等上一个任务完成的（没有勾选并发执行任务）

由于`npm run dev`，所以在定时构建的时候，并没有收到理想效果。
需求是：维护进程，定时执行
步骤如下：
- 加上pm2构建项目，[pm2入口](https://github.com/qiufeihong2018/vuepress-blog/tree/master/docs/technical-summary/pm2)

- 构建触发器，定时构建和轮询SCM二选一
![avatar](../public/jk32.png)
- 构建中的执行shell为
``` {4,5}
cd /var/lib/jenkins/workspace/ceres-cms-vue                                                     
npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
npm install
npm run build
npm run pm2
pm2 list
```

## 仓库代码更新自动构建
- 不用勾选定时构建和轮询SCM
- 勾选`GitHub hook trigger for GITScm polling`

这样你的jenkins就可以随着你的代码自动构建了
## 轮询
- 定时构建：无论有无最新代码，都按时构建
- 轮询SCM：只要代码有更新，都会构建
----
- 构建语法说明：

  - 首先格式为：* * * * *（五个星）

选项|意思
--|--
第一个*表示分钟|取值0~59
第二个*表示小时|取值0~23
第三个*表示一个月的第几天|取值1~31
第四个*表示第几月|取值1~12
第五个*表示一周中的第几天|取值0~7，其中0和7代表的都是周日

  - 使用举例（不加H为时刻之前）：
  
选项|意思
--|--
每隔1分钟构建一次|H/1 * * * *
每隔1小时构建一次|H H/1 * * *
每月1号构建一次|H H 1 * *

  - 定时构建和轮询SCM使用互不冲突，具体如何组合，需要根据项目情况合理配置；

目前出现的问题是：无法根据远程仓库是否更新来拉取代码和部署。
## 测试
- 本地push代码到github
![avatar](../public/jk15.png)

- 点击`立即构建`
![avatar](../public/jk16.png)

- 构建执行状态
  ![avatar](../public/jk17.png)

- 点击`#13`,进入工程详情
  ![avatar](../public/jk18.png)

- 控制台输出结果
```
执行中控制台输出
Started by user unknown or anonymous
Started by user unknown or anonymous
Started by user unknown or anonymous
Building in workspace /var/lib/jenkins/workspace/vue
using credential 12dc8386-52e8-4c57-b667-bd8d263626cd
 > git rev-parse --is-inside-work-tree # timeout=10
Fetching changes from the remote Git repository
 > git config remote.origin.url https://github.com/qiufeihong2018/vuepress-app.git # timeout=10
Fetching upstream changes from https://github.com/qiufeihong2018/vuepress-app.git
 > git --version # timeout=10
using GIT_ASKPASS to set credentials 
 > git fetch --tags --progress https://github.com/qiufeihong2018/vuepress-app.git +refs/heads/*:refs/remotes/origin/*
 > git rev-parse refs/remotes/origin/master^{commit} # timeout=10
 > git rev-parse refs/remotes/origin/origin/master^{commit} # timeout=10
Checking out Revision ab0c6b6de9b810dcd9fd107c6329d1e782054976 (refs/remotes/origin/master)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f ab0c6b6de9b810dcd9fd107c6329d1e782054976
Commit message: "Merge branch 'master' of github.com:qiufeihong2018/vuepress-app"
 > git rev-list --no-walk 9b7e2475ffaef9a60cc38cec1c660d0f9d8dc490 # timeout=10
[vue] $ /bin/sh -xe /tmp/jenkins5471132310334499324.sh
+ cd /var/lib/jenkins/workspace/vue
+ npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver

> chromedriver@73.0.0 install /var/lib/jenkins/workspace/vue/node_modules/chromedriver
> node install.js

ChromeDriver binary exists. Validating...
ChromeDriver 73.0.3683.20 (8e2b610813e167eee3619ac4ce6e42e3ec622017)

ChromeDriver is already available at '/tmp/73.0.3683.20/chromedriver/chromedriver'.
Copying to target path /var/lib/jenkins/workspace/vue/node_modules/chromedriver/lib/chromedriver
Fixing file permissions
Done. ChromeDriver binary available at /var/lib/jenkins/workspace/vue/node_modules/chromedriver/lib/chromedriver/chromedriver
npm WARN vuepress-app@1.0.0 No repository field.
npm WARN vuepress-app@1.0.0 scripts['server'] should probably be scripts['start'].
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.7 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.7: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

+ chromedriver@73.0.0
updated 1 package and audited 14738 packages in 13.642s
found 15 vulnerabilities (1 low, 7 moderate, 7 high)
  run `npm audit fix` to fix them, or `npm audit` for details
+ npm install
npm WARN vuepress-app@1.0.0 No repository field.
npm WARN vuepress-app@1.0.0 scripts['server'] should probably be scripts['start'].
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.7 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.7: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

audited 14738 packages in 8.37s
found 15 vulnerabilities (1 low, 7 moderate, 7 high)
  run `npm audit fix` to fix them, or `npm audit` for details
+ npm run dev

> vuepress-app@1.0.0 dev /var/lib/jenkins/workspace/vue
> vuepress dev docs


 WAIT  Extracting site metadata...
<button @click.ctrl="onClick">A</button>
<button @click.ctrl.exact="onCtrlClick">A</button>
<button @click.exact="onClick">A</button>
 TIP  override.styl has been split into 2 APIs, we recommend you upgrade to continue.
      See: https://v0.vuepress.vuejs.org/default-theme-config/#simple-css-override
[2:52:53 PM] Compiling Client
[2:52:56 PM] Compiled Client in 4s
c
 DONE  [14:52:56] Build 854bb5 finished in 3536 ms! 

> VuePress dev server listening at http://localhost:7777/
c[2:52:57 PM] Compiling Client
[2:52:57 PM] Compiled Client in 204ms
c
 DONE  [14:52:57] Build 056d13 finished in 208 ms! (http://localhost:7777/)

```
- 项目启动成功
- 修改提交后，一键`立即构建`，就可以将最新提交的代码运行起来

## 解决构建完成后自动杀掉衍生进程的问题
- 修改`BUILD_ID`

jenkins默认会在构建完成后杀掉构建过程中shell命令触发的衍生进程。jenkins根据`BUILD_ID`识别某个进程是否为构建过程的衍生进程，故修改`BUILD_ID`后，jenkins就无法识别是否为衍生进程，则此进程能在后台保留运行
``` {4,5,6,7,8,9}
OLD_BUILD_ID=$BUILD_ID
echo $OLD_BUILD_ID
BUILD_ID=dontKillMe
cd /var/lib/jenkins/workspace/ceres-cms-vue
npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
npm install
npm run build
npm run pm2
pm2 list
BUILD_ID=$OLD_BUILD_ID
echo $BUILD_ID
```
### 杀掉改变id的衍生进程
```
netstat -lntp
kill -g {id}
```
如果无法查看id

则输入命令
```
ps -ef|grep
```
显示所有命令，连带命令行 查找文件里符合条件的字符串
## 参考文献


最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>