# 【Github】electron-release-server说明文档
请确保您使用的文件与您的 `Electron Release Server version` 版本相匹配。
### FAQ
有一些问题经常被问到， [在产生问题之前检查一下](faq.md).

### Guides
- [Deploy it!](deploy.md)
  - [Database setup](database.md)
  - [Admin authentication](authentication.md)
- [Upload assets](assets.md)
- [Available URLs](urls.md)
- [OS X Auto-Updater](update-osx.md)
- [Windows Auto-Updater](update-windows.md)
- [Docker](docker.md)
- (Coming soon) [Use it as a node module](module.md)

为您的应用程序使用 `Electron Release Server`? [将其添加到列表中](using-it.md).

# Deployment

`Electron Release Server` 可以很容易地部署到您自己的服务器。

## General Configuration:

安装使用的依赖关系:

```
npm install
```

**操作步骤:** 您需要配置数据库 ([数据库设置指南](database.md)) 必须创建一个 `config/local.js` 文件，其中包含运行服务器所需的配置选项。

为了协助这个过程，您可以复制 `config/local.template` 和编辑它使用:
```bash
cp config/local.template config/local.js
vim config/local.js
```

然后启动应用程序使用:

```
npm start
```

Browse to `http://localhost:1337/`

## 用 Nginx

如果你想用 nginx 作为 web-server:

```nginx
server {
    listen       80;
    server_name  download.yourdomain.com;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;

        proxy_pass http://127.0.0.1:1337/;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

打开浏览器 `http://download.yourdomain.com/`

## 数据库设置
阅读 [database setup guide](database.md).

## 权限
阅读 [authentication guide](authentication.md).

## 部署
阅读 [Sails deployment documentation](http://sailsjs.org/documentation/concepts/deployment).

若要以部署模式启动服务器，请使用:
```
npm start --prod
```

> 注意:在生产中，您应该使用流程管理器，如 [pm2](http://pm2.keymetrics.io/)

# 增加资产
添加资产/版本再简单不过了。

查看下面的视频，了解如何添加版本和资产。

[![Electron Release Server Demo](https://j.gifs.com/wpyY1X.gif)](https://youtu.be/lvT7rfB01iA)

一旦添加，资产和版本将立即在其通道上可用。当与Electron的内置自动更新器配合使用时，这对于向用户快速分发新版本非常有用。

## 文件上传
发布服务器将根据两种启发式方法处理和提供给定版本的文件。

#### Platform
这是在上传资产时显式定义的。

#### File extension
这将告诉服务该文件是用于更新还是用于初始安装。

### OS X
#### 初始安装
接受文件扩展名:
- `.dmg`

#### 更新服务
接受文件扩展名:
- `.zip`

### Windows
#### 初始安装
接受文件扩展名:
- `.exe`

#### 更新服务
接受文件扩展名:
- `.nupkg`

**重要**: 目前只支持 `-full.nupkg` 文件。如果你感到困惑，只要上传 [electron-builder](https://github.com/electron-userland/electron-builder) 构建的文件。
> ，您不必上传`RELEASES` 布文件，因为将根据请求生成一个。.

### Linux
#### 初始安装
接受文件扩展名:
- `.deb`

#### 更新服务
The Electron auto-updater 不支持Linux，也不支持这一点。


# 可用的url
## 下载端点
Electron Release Server 提供各种url来访问发布资产。

#### 检测平台的最新版本:
- `http://download.myapp.com/download/latest`
- `http://download.myapp.com/download/flavor/default/latest`
#### 针对特定平台的最新版本:
- `http://download.myapp.com/download/latest/osx`
- `http://download.myapp.com/download/flavor/default/latest/osx`
#### 被检测平台的具体版本:
- `http://download.myapp.com/download/1.1.0`
- `http://download.myapp.com/download/flavor/default/1.1.0`
#### 特定平台的特定版本:
- `http://download.myapp.com/download/1.2.0/osx`
- `http://download.myapp.com/download/flavor/default/1.2.0/osx`
#### 针对特定平台的版本的特定文件:
> 注意，只使用文件扩展名。

- `http://download.myapp.com/download/1.2.0/windows_64/MyApp-0.1.1-full.nupkg`
- `http://download.myapp.com/download/flavor/default/1.2.0/windows_64/MyApp-0.1.1-full.nupkg`
#### 特殊通道
- `http://download.myapp.com/download/channel/beta`
- `http://download.myapp.com/download/flavor/default/channel/beta`
#### 针对特定平台的特定渠道:
- `http://download.myapp.com/download/channel/beta/osx`
- `http://download.myapp.com/download/flavor/default/channel/beta/osx`

### Windows
- `http://download.myapp.com/download/windows_32`
- `http://download.myapp.com/download/windows_64`
- `http://download.myapp.com/download/flavor/default/windows_32`
- `http://download.myapp.com/download/flavor/default/windows_64`

### Linux
- `http://download.myapp.com/download/linux_32`
- `http://download.myapp.com/download/linux_64`
- `http://download.myapp.com/download/flavor/default/linux_32`
- `http://download.myapp.com/download/flavor/default/linux_64`

## 更新的端点
这些都是单独列出的 for [OSX](update-osx.md) and [Windows](update-windows.md).

当更新不可用时，更新端点将返回一个204响应。 当您请求的版本比服务器上的最后可用版本更新或等于时，就会发生这种情况，而且当Squirrel无法更新应用程序时也会出现适当的文件类型 (`.zip` for Squirrel.Mac, `.nupkg` for Squirrel.Windows).

## 指出端点
`http://download.myapp.com/notes/:version/:flavor?`

## 数据端点
这些都是单独列出的 [here](api.md).

## 关于使用HTTPS
如果您在服务器上使用HTTPS，请确保配置基本URL (`appUrl`) in `config/local.js` 因为默认情况下下载URL将来自HTTP，即使更新URL已经被从HTTPS调用。

# Auto-updater on OS X
Electron Release Server 提供了一个后端 [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) auto-updater. Squirrel.Mac 默认集成在 [Electron applications](https://github.com/atom/electron).

### 端点

The endpoints for **Squirrel.Mac** are:
    - `https://download.myapp.com/update/:platform/:version[/:channel]`
    - `https://download.myapp.com/update/flavor/:flavor/:platform/:version[/:channel]`.

注意， `version` 是当前安装的版本。

这个服务将接受平台例如 `osx`, `darwin`,`darwin_64`,`macos`, 和 `mac`.

由于服务器支持多个发布通道，所以您可以在请求更新时指定通道。 支持通道的示例有 `stable`, `beta`, `alpha`。每个频道都包括它上面的频道; `beta` 将包含 `stable` 升级。

这个url需要不同的参数来返回正确的版本: `version` 和 `platform`.

如果没有指定 `flavor`，那么将使用 `default`。
### Electron 例子

比如 Electron's [`autoUpdater`](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md) 模块:

```js
var app = require('app');
var os = require('os');
var autoUpdater = require('electron').autoUpdater;

var platform = os.platform() + '_' + os.arch();  // usually returns darwin_64
var version = app.getVersion();

autoUpdater.setFeedURL('http://download.myapp.com/update/'+platform+'/'+version);
```



# Auto-updater on Windows
Electron Release Server 提供一个后台 [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) 自动更新.

谈到 [Squirrel.Windows documentation](https://github.com/Squirrel/Squirrel.Windows/tree/master/docs) 怎么样一步一步设置你的应用。

Electron Release Server 将在以下端点上提供NuGet包:
```
http://download.myapp.com/update/win32/:version/RELEASES
http://download.myapp.com/update/win64/:version/RELEASES
http://download.myapp.com/update/win32/:version/:channel/RELEASES
http://download.myapp.com/update/win64/:version/:channel/RELEASES
http://download.myapp.com/update/flavor/:flavor/win32/:version/RELEASES
http://download.myapp.com/update/flavor/:flavor/win64/:version/RELEASES
http://download.myapp.com/update/flavor/:flavor/win32/:version/:channel/RELEASES
http://download.myapp.com/update/flavor/:flavor/win64/:version/:channel/RELEASES
```
如果未指定通道，然后 `stable` 将被用。 如果 flavor 没被指定, 那么 `default` 将被用。 如果 `win64` 备用 但是只有 win32 资产可用，它将被使用。

> 注意:如果需要，可以使用 `windows_32` 代替 `win32` ，使用 `windows_64`代替 `win64`。

你就只要管理 `Update.exe` 或者 `Squirrel.Windows` 去用 `http://download.myapp.com/update/win32/:version/:channel` 作为 **without query parameters.**的提要URL。

你只需要上传作为发布资产:: `-full.nupkg` (由 `electron-builder` 或者 `Squirrel.Windows` releaserz。


# Docker

Electron Release Server 具有 `Dockerfile` 和一个 `docker-compose.yml` 文件。
所以，你可以用 [docker](https://www.docker.com/) 和 [docker-compose](https://github.com/docker/compose)。

## Requirements

安装 [docker](https://www.docker.com/) 和 [docker-compose](https://github.com/docker/compose).

## Localserver

```bash
docker-compose up -d
# open localhost:5000 in browser
```

如果你用 [docker-machine](https://github.com/docker/machine) you should change
`APP_URL` at `docker-compose.yml` 去指向 your docker-machine.

## Configurations

要运行单个容器，请提供下一个环境变量:

- `APP_USERNAME`, `APP_PASSWORD` – 验证引用的静态用户名和密码。
- `DB_HOST` – 主机名的postgres
- `DB_PORT` – postgres的端口
- `DB_USERNAME`, `DB_PASSWORD` – 访问postgres的凭据
- `DB_NAME` – 数据库名称
- `TOKEN_SECRET` – 推荐:63个随机字母-数字字符
- `APP_URL` - base url for the app - [ref](http://sailsjs.org/documentation/reference/application/sails-get-base-url)

使用 `production.js` 设置 `NODE_ENV` 为 `"production"` – 所以不应该设置环境变量:
`APP_USERNAME`, `APP_PASSWORD`, `DB_HOST`, `DB_PORT`,
`DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `TOKEN_SECRET`.

**警告**: 你可以插入 `TOKEN_SECRET`, `APP_PASSWORD`, `DB_PASSWORD` 直接进入 `docker-compose.yml`, 但是要把你的秘密和私人信息保密。不得公开生产秘密!

## 怎么 运行

首先，您应该从开发设置开始运行数据库迁移。

之后你应该 `always` 在生产模式下运行 – set `NODE_ENV` to `"production"`.

# Electron Release Server FAQ

### 我应该上传哪些文件?

Electron Release Server 使用显式文件兼容性命名为了避免意外的问题，在文件命名上没有严格的策略。

- Windows: `.exe`, `.nupkg` etc
- Linux: `.deb`, `.tar.gz`, etc
- OS X: `.dmg`, etc

32位的版本对所有客户端都可用，但是如果可用的话，64位的文件被提供给兼容的客户端。

### 我应该如何命名我的发行版?

Electron Release Server 要求应用程序遵循 [SemVer](http://semver.org).即使您没有使用Electron Release Server，您也应该遵循它!

### 我看到HTTP错误时， Electron autoUpdater 查询 `RELEASES` 文件，我该怎么补救呢?
确保您没有在传递给 `setFeedURL()`的提要URL中包含`/RELEASES` 。
### 为什么我看到 `password authentication failed`?

当你运行你的服务器(通常在Windows机器上)，你可能会看到以下错误信息:
~~~
 error: password authentication failed for user "electron_release_server_user"
~~~

Solution could be to update server configuration file:
Windows:
~~~
C:\Program Files\PostgreSQL\12\data\pg_hba.conf
~~~
Linux:
~~~
/var/lib/pgsql/data/pg_hba.conf
~~~

to make all METHODs trusted
~~~
host    all             all             127.0.0.1/32            trust
host    all             all             ::1/128                 trust
host    replication     all             127.0.0.1/32            trust
host    replication     all             ::1/128                 trust
~~~
_Note: do not forget to open services.msc and restart the server_


### 错误:服务器启动失败，端口80正在使用
如果您看到以下错误消息，错误消息中列出的原因之一可能是已经使用的端口
~~~
error: Server failed to start.
error: (received error: EACCES)
error:
error: Troubleshooting tips:
error:
error:  -> Do you have a slow Grunt task, or lots of assets?
error:
error:  -> Do you have permission to use port 80 on this system?
error:
error:  -> Is something else already running on port 80 ?
error:
error:  -> Are you deploying on a platform that requires an explicit hostname, like OpenShift?
error:     (Try setting the `explicitHost` config to the hostname where the server will be accessible.)
error:     (e.g. `mydomain.com` or `183.24.244.42`)
~~~

您可以为会话指定一个环境变量端口(或永久端口)

Windows PowerShell:
~~~
$env:PORT=1337
~~~

CMD:
~~~
set PORT=1337
~~~

Linux Bash:
~~~
export PORT=1337
~~~

有关适当的语法，请参阅控制台的文档


### 在Linux上启动时出错
当你在Linux环境下启动你的应用程序时，你可能会看到以下错误信息:
~~~

error: Grunt :: /home/git/release_server/node_modules/grunt-legacy-util/index.js:26
var _ = util._ = require('lodash').runInContext();
                                   ^

TypeError: require(...).runInContext is not a function
    at Object.<anonymous> (/home/git/release_server/node_modules/grunt-legacy-util/index.js:26:36)
    at Module._compile (internal/modules/cjs/loader.js:1138:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)
    at Module.load (internal/modules/cjs/loader.js:986:32)
    at Function.Module._load (internal/modules/cjs/loader.js:879:14)
    at Module.require (internal/modules/cjs/loader.js:1026:19)
    at require (internal/modules/cjs/helpers.js:72:18)
    at Object.<anonymous> (/home/git/release_server/node_modules/grunt/lib/grunt.js:35:12)
    at Module._compile (internal/modules/cjs/loader.js:1138:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)
~~~

要解决这个问题，请修改 _./node_modules/grunt-legacy-util/index.js_ line 26 to:
~~~
var _ = util._ = require('lodash');
~~~
