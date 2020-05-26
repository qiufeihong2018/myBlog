# 【docker】docker的灵魂拷问
## [win10安装docker](https://www.docker.com/products/developer-tools)

1. 点击图中的`Download for window`下载docker
2. 下载完成后点击`exe`文件进行安装
3. 安装完成后双击`docker`小鲸鱼即可打开docker桌面版

![avatar](./docker.png)

## docker是什么
对 Docker 最简单并且带有一定错误的认知就是 “Docker 是一种性能非常好的虚拟机”。
正如上面所说，这是有一定错误的说法。Docker 相比于传统虚拟机的技术来说先进了不少，具体表现在 Docker 不是在宿主机上虚拟出一套硬件后再虚拟出一个操作系统，而是让 Docker 容器里面的进程直接运行在宿主机上（Docker 会做文件、网络等的隔离），这样一来 Docker 会 “体积更轻、跑的更快、同宿主机下可创建的个数更多”。

## 执行`docker info`报错`The system cannot find the file specified. In the default daemon configuration on Windows, the docker client must be run elevated to connect. `
具体报错
```
ERROR: error during connect: Get http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.40/info: open //./pipe/docker_engine: The system cannot find the file specified. In the default daemon configuration on Windows, the docker client must be run elevated to connect. This error may also indicate that the docker daemon is not running.
errors pretty printing info
```
意思是系统找不到指定的文件。在Windows上的默认守护进程配置中，必须运行docker客户端才能连接。这个错误也可能表明docker守护进程没有运行。
解决方法
```
cd "C:\Program Files\Docker\Docker"
DockerCli.exe -SwitchDaemon
```

## [docker入门【window】](https://docs.docker.com/docker-for-windows/?utm_source=docker4win_2.3.0.2&utm_medium=docs&utm_campaign=referral)

## docker报错`docker: no matching manifest for windows/amd64 10.0.17763 in the manifest list entries.`
意思是在清单列表条目中没有windows/amd64 10.0.17763的匹配清单。

解决方法

右键docker小图标选择setting

![avatar](./docker1.png)

重新可以拉取

![avatar](./docker2.png)

## 运行`docker-compose`报`Version in "./docker-compose.yml" is unsupported`的错误
具体错误如下：
```
Version in "./docker-compose.yml" is unsupported. You might be seeing this error because yo supported version (e.g "2.2" or "3.3") and place your service definitions under the 'services' keions at the root of the file to use version 1.  For more on the Compose file format versions, see [https://docs.docker.com/compose/compose-file/](https://docs.docker.com/compose/compose-file/)
```
这种问题一般是因为用`apt-get`下载`docker-compose`，其版本很低，所以`docker-compose`的版本和 `docker-compose.yml` 要求的版本对应不上。

解决方法：

按照官网的命令将docker-compose升到最新版
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```
