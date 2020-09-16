# Electron Release Server
[![GitHub stars](https://img.shields.io/github/stars/ArekSredzki/electron-release-server.svg)](https://github.com/ArekSredzki/electron-release-server/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ArekSredzki/electron-release-server.svg)](https://github.com/ArekSredzki/electron-release-server/network)
[![Join the chat at https://gitter.im/ArekSredzki/electron-release-server](https://badges.gitter.im/ArekSredzki/electron-release-server.svg)](https://gitter.im/ArekSredzki/electron-release-server?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![CodeFactor](https://www.codefactor.io/repository/github/areksredzki/electron-release-server/badge)](https://www.codefactor.io/repository/github/areksredzki/electron-release-server)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/ArekSredzki/electron-release-server.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/ArekSredzki/electron-release-server/alerts/)
>一个node web服务器，服务和管理您的[Electron](http://electron.atom.io) 应用程序的发布，并完全兼容[Squirrel](https://github.com/Squirrel) 自动更新器(这是建立在Electron)。

[![Electron Release Server Demo](https://j.gifs.com/wpyY1X.gif)](https://youtu.be/lvT7rfB01iA)

注意:尽管被宣传为Electron应用程序的发布服务器，但它可以用于任何使用Squirrel的应用程序。
你在Github上托管你的项目， 并且不需要UI， then [Nuts](https://github.com/GitbookIO/nuts)可能就是你要找的 。否则，你和我处境相同，而且你找到了正确的位置!

## 特征
- :sparkles: Docker :whale: support (thanks to EvgeneOskin)!
- :sparkles: 由[AngularJS](https://angularjs.org)提供强大的发布管理界面 
    - 使用LDAP进行身份验证，如果需要，很容易修改为另一种身份验证方法
- :sparkles: Store assets on server disk, or Amazon S3 (with minor modifications)
    - Use pretty much any database for persistence, thanks to [Sails](http://sailsjs.org) & [Waterline](http://waterlinejs.org)
- :sparkles: Simple but powerful download urls (**NOTE:** when no assets are uploaded, server returns `404` by default):
    - `/download/latest`
    - `/download/latest/:platform`
    - `/download/:version`
    - `/download/:version/:platform`
    - `/download/:version/:platform/:filename`
    - `/download/channel/:channel`
    - `/download/channel/:channel/:platform`
    - `/download/flavor/:flavor/latest`
    - `/download/flavor/:flavor/latest/:platform`
    - `/download/flavor/:flavor/:version`
    - `/download/flavor/:flavor/:version/:platform`
    - `/download/flavor/:flavor/:version/:platform/:filename`
    - `/download/flavor/:flavor/channel/:channel`
    - `/download/flavor/:flavor/channel/:channel/:platform`
- :sparkles: Support pre-release channels (`beta`, `alpha`, ...)
- :sparkles: Support multiple flavors of your app
- :sparkles: Auto-updates with [Squirrel](https://github.com/Squirrel):
    - Update URLs provided:
        - `/update/:platform/:version[/:channel]`
        - `/update/flavor/:flavor/:platform/:version[/:channel]`
    - Mac uses `*.dmg` and `*.zip`
    - Windows uses `*.exe` and `*.nupkg`
- :sparkles: Serve the perfect type of assets: `.zip` for Squirrel.Mac, `.nupkg` for Squirrel.Windows, `.dmg` for Mac users, ...
- :sparkles: Specify date of availability for releases
- :sparkles: Release notes endpoint
    - `/notes/:version/:flavor?`

**NOTE:** if you don't provide the appropriate type of file for Squirrel you won't be able to update your app since the update endpoint will not return a JSON. (`.zip` for Squirrel.Mac, `.nupkg` for Squirrel.Windows).

## 部署/启动它

[按照我们的指南部署Electron释放服务器](docs/deploy.md)。

## 带上了自动更新/Squirrel

此服务器为[Squirrel auto-updater](https://github.com/atom/electron/blob/master/docs/api/auto-updater.md)提供了一个端点，它同时支持OS X和Windows。
## 文档
[阅读这个文档](docs/) 获得更多信息。

## Building Releases
I highly recommend using [electron-builder](https://github.com/loopline-systems/electron-builder) for packaging & releasing your applications. Once you have built your app with that, you can upload the artifacts for your users right away!


# 部署

Electron Release Server 可以很简单的部署在你的服务器上。

## 正常配置:

安装依赖:

```
npm install
```

**Action Step:** 你需要配置数据库 ([database setup guide](database.md)) 并且创建一份 `config/local.js` 文件, 包含一份能运行服务器的配置选项。

为了协助这个过程，您可以复制 `config/local.template` 并编辑它使用:
```bash
cp config/local.template config/local.js
vim config/local.js
```

然后开启这个应用:

```
npm start
```

浏览器打开 `http://localhost:1337/`

## 用 Nginx

如果你用nginx作为服务器:

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

浏览器打 `http://download.yourdomain.com/`

## 数据库设置
See the [database setup guide](database.md).

## 认证
See the [authentication guide](authentication.md).

## 部署
See the [Sails deployment documentation](http://sailsjs.org/documentation/concepts/deployment).

要以部署模式启动服务器，请使用:
```
npm start --prod
```

> 注意: 在生产中，您应该使用流程管理器，如 [pm2](http://pm2.keymetrics.io/)
