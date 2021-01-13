Electron自动更新的研究
目录
一、	背景	3
二、	当前存在的问题	4
三、	自动更新的方案	4
(一)	Electron-builder搭配Electron-release-server	7
(二)	Electron-forge搭配nucleus	11
四、	打包的两种方式	11
(一)	Squirrel.Windows方式	11
(二)	Nsis方式	13
五、	开发中存在的问题	15
(一)	Can not find Squirrel	15
1.	背景	15
2.	分析	15
3.	解决方案	17
(二)	安装目录中packages文件夹和Update.exe程序找不到	18
1.	背景	18
2.	解决方式	18
(三)	Error: spawn UNKNOWN	21
1.	背景	21
2.	原因分析	21
3.	解决方式	22
(四)	Error Downloading Update: Command failed: 4294967295	24
1.	背景	24
2.	原因分析	24
3.	解决方式	24
(五)	更新后，老版本没有被替换	24
1.	背景	24
2.	解决方案	25
(六)	Update.exe之外的操作无日志	28
1.	背景	28
2.	解决方案	28

摘要
阅读本文需要Electron和Node的基础知识，本文只针对Electron自动更新机制进行研究。目前文中的可行方案仅在Windows环境中适用，Mac和Linux环境的方案亟待研究。
进行了多个方案研究测试，方案简述如下：利用内置的Squirrel框架和Electron的autoUpdater模块更新Electron应用。
关键词
Electron Nsis Squirrel.Windows Update.exe xxx项目
 
正文
一、	背景
 
图 1 electron
在开发xxx项目自动化测试项目（下文简称xxx项目）的时候，像很多做桌面应用的框架（如包括较早的vc6.0，以及c#、asp.net、QT、java、Delphi、C++BUILDE等等）一样，Electron需要打包出应用程序，分发给每一个用户使用。
 
图 2 xxx项目
二、	当前存在的问题
当我们在应用中添加了新的功能并且提交了新代码后，当然是希望在用户的电脑上能够自动更新。 
但是最原始的操作是这样的：
1.	提交代码后，用Webpack打包混淆代码，再用Electron打包工具打包；
2.	找到打包生成的exe等执行文件；
3.	将生成的exe发给用户，让用户重新安装。
假如你是用户，你肯定觉得很烦。不仅是用户，连开发者都觉得很烦。有没有一种方式可以派发更新，并在用户的电脑上可以自动更新应用呢？答案肯定是有的。
三、	自动更新的方案
先来看看，Electron官网可以提供的帮助。Electron团队保留 update.electronjs.org，一个免费的开源网络服务，Electron应用可以用来自我更新。 这个服务是设计给那些满足以下标准的 Electron 应用：
1.	应用运行在 macOS 或者 Windows；
2.	应用有公开的 GitHub 仓库；
3.	编译的版本发布在 GitHub Releases；
4.	编译的版本已代码签名。
使用这个服务最简单的方法是安装 update-electron-app，一个预配置好的 Node.js 模块来使用 update.electronjs.org。
但是xxx项目是公司私有项目，根据公司的网络安全规则，不能将应用部署于GitHub，不能在GitHub Releases 中公开发布，所以需要运行自己的更新服务器。
没关系，Electron团队考虑到这个问题，给出了一些可以私有部署的更新服务器。
方案中的更新服务器有以下这些：
1.	Hazel——用于私人或开源应用的更新服务器，可以在 Now 上免费部署。 它从GitHub Releases中拉取更新文件，并且利用 GitHub CDN 的强大性能；
2.	Nuts——同样使用GitHub Releases, 但得在磁盘上缓存应用程序更新并支持私有存储库；
3.	Electron-release-server——提供一个用于处理发布的仪表板，并且不需要在GitHub上发布；
4.	Nucleus——一个由Atlassian维护的 Electron 应用程序的完整更新服务器。 支持多种应用程序和渠道，使用静态文件存储来降低服务器成本。
官方的这些服务器经过分析，Hazel和Nuts依赖GitHub releases拉取更新文件，所以这两个不适用。Electron-release-server和Nucleus这两种是适用的。部署采用Docker技术。
部署好更新服务器后，就可以导入所需要的代码模块。
下面的代码只在打包的应用程序，而不是开发中。
我是通过app.isPackaged属性来区分开发和生产的：
if (app.isPackaged) {
  require('./update')
  getAutoUpdateDep()
}
导入依赖：
const { app, autoUpdater, dialog } = require('electron')
下一步, 构建更新服务器的URL并且通知autoUpdater：
const server = '服务器地址'
const url = `${server}/update/${process.platform}/ ${app.getVersion()}`

autoUpdater.setFeedURL({ url })
作为最后一步，检查更新。下面的示例将1小时检查一次：
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 3600000)
应用程序被打包后, 它将接收我每次发布在服务器上的更新。
现在已经为应用程序配置了基本的更新机制，需要确保在更新时通知用户。 这可以使用autoUpdater API events来实现：
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: '消息',
    buttons: ['重启', '稍后'],
    title: '应用更新',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: '应用已经更新了，请重启'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) =>
    if(returnValue.response === 0) autoUpdater.quitAnd()
  })
})

目前，xxx项目更新的细致步骤，也就是每次执行应用程序时，UpdateManager会执行的步骤如下：
1.	检查更新。下载发行版位置的RELEASES文件，并与本地RELEASES文件进行比较，以检查是否有更新；
2.	下载并验证更新包。如果有一个新版本，UpdateManager决定是下载deltas还是最新的完整包(通过计算哪一个需要较少的下载)来更新到当前版本。这些包与RELEASES文件中的SHA1进行比较，以进行验证；
3.	从Deltas构建完整的包。如果已经下载了delta包，那么将从以前的完整包和下载的delta文件创建一个新的完整包；
4.	安装新版本。从完整包中提取当前版本的xxx项目，并基于版本号(例如app-1.0.1)将其放在新的%LocalAppData%\xxx项目安装目录中；
5.	快捷方式不更新。新xxx项目安装位置替换了原来的xxx项目位置，所以快捷方式地址还是旧的；
6.	前一个版本清理。安装完成后，用replace.bat将xxx项目新版本替换老版本。 (例如更新到app-1.0.5后，app-1.0.4之前全部删除)。 
7.	目前，没有内置回滚到以前版本的支持。
有些步骤的具体代码见第五节。
下面是两种可行的更新服务器的解决方案以及他们所依赖打包更新机制。
(一)	Electron-builder搭配Electron-release-server
对于electron-builder的介绍，官网给得相当详细，一个完整的解决方案，打包和建立准备分发electron应用程序的”auto update”支持开箱即用。
下面是Electron-builder中windows的两种配置方式，分别是Squirrel.Windows和Nsis，其他的就不提了。
1.	Squirrel.Windows自动更新，该方式默认安装到本地用户帐户，安装在在%LocalAppData%下(例如， xxx项目就会被安装在 C:\Users\用户\AppData\Local\xxx项目)，并且会自动产生 packages 文件夹和 Update.exe程序。 packages 包含了版本信息的 RELEASES。 如果有最新版本，他的 nupkg 也会下载到其中。期间，自动更新的日志会存放在 SquirrelSetup.log 中。
2.	Nsis自动更新方式与 Squirrel.Windows 类似。 但是安装后不会产生 packages 文件夹和 Update.exe程序。打开后可以选择安装目录等安装步骤进行安装，安装颗粒度变得更加细致。
当创建项目时，脚手架可以选择是否集成electron-builder，xxx项目配置参数如下：
"build": {
    "win": {
      "target": [
        "nsis",
        "zip",
        "squirrel"
      ],
      "icon": "xxx项目.ico",
      "publish": [
        {
          "provider": "generic",
          "url": "http://10.66.193.88:5000/"
        }
      ]
    },
    "squirrelWindows": {
      "iconUrl": "https://path/to/valid/image.png"
    },
    "linux": {
      "icon": "build/icons"
    },
    "nsis": {
      "oneClick": false,
      "allowElevation": true,
      "allowToChangeInstallationDirectory": true,
      "installerIcon": "./xxx项目.ico",
      "uninstallerIcon": "./xxx项目.ico",
      "installerHeaderIcon": "./xxx项目.ico",
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "perMachine": false,
      "unicode": true,
      "deleteAppDataOnUninstall": false
    },
    "extends": null
  }
Electron-builder打包生成的目录如下： 
 
图 3 build目录
├─icons
├─squirrel-Windows
└─win-unpacked 
    ├─libs
...需要的依赖
    ├─locales
    ├─resources
    │  └─app.asar.unpacked
    │      └─node_modules
...npm依赖
    └─swiftshader
build：打包产生的文件夹；
Nupkg：是具有 .nupkg 扩展的单个 ZIP 文件，此扩展包含编译代码 (Dll)、与该代码相关的其他文件以及描述性清单（包含包版本号等信息）； 
squirrel-Windows：打包方式的产物，包括exe和nupkg。区别于nsis打包出来的exe；
win-unpacked：源代码。
详细补充请见第四节的打包的两种方式。 
 
Electron-release-server 提供一个后台 Squirrel.Windows 自动更新。 
Electron-release-server 将在以下接口提供NuGet包:
1.	http://download.myapp.com/update/win32/:version/RELEASES
2.	http://download.myapp.com/update/win64/:version/RELEASES
3.	http://download.myapp.com/update/win32/:version/:channel/RELEASES
4.	http://download.myapp.com/update/win64/:version/:channel/RELEASES
5.	http://download.myapp.com/update/flavor/:flavor/win32/:version/RELEASES
6.	http://download.myapp.com/update/flavor/:flavor/win64/:version/RELEASES
7.	http://download.myapp.com/update/flavor/:flavor/win32/:version/:channel/RELEASES
8.	http://download.myapp.com/update/flavor/:flavor/win64/:version/:channel/RELEASES
如果未指定通道，然后 stable 将被用。 如果 flavor 没被指定, 那么 default 将被用。 如果 win64 备用 但是只有 win32 资产可用，它将被使用。
注意：如果需要，可以使用 windows_32 代替 win32 ，使用 windows_64代替 win64。
只要管理 Update.exe 或者 Squirrel.Windows 去用 http://download.myapp.com/update/win32/:version/:channel 作为无需query的提要URL。
比如，xxx项目只需要新建一个version，上传.nupkg和setup.exe。
 
(二)	Electron-forge搭配nucleus
Nucleus这一款更新服务器和上述的服务器类似，electron-forge打包跟electron-builder类似，目前只知道它通过squirrel方式更新有效，但是它是否能使用Nsis安装配置更新未知。
期间还调研了Electron-packager、Electron-winstaller和Electron-updater的打包自动更新方案，其打包原理大同小异。
前两者的方式都是采用Electron原生的autoupdate方式，将dist打包成应用程序的方式不同，packager是一个命令行工具和 Node.js 库，它将基于 Electron 应用程序源代码、重命名的 Electron 可执行文件的和支持文件打包进准备发布的文件夹中；winstaller是用于用 Squirrel构建Electron 应用程序成Windows安装程序的NPM模块 。最后一种是对原生autoupdate机制进行封装。
四、	打包的两种方式
如果要谈自动更新的话，必须要讲讲electron的打包。
(一)	Squirrel.Windows方式
 
图 4 squirrel.window吉祥物
它是一组工具和一个库，它可以完全管理安装和更新用任何其他语言编写的桌面Windows应用程序。
Windows应用程序的安装和更新应该和谷歌Chrome一样快、一样容易。从应用程序开发人员的角度来看，为应用创建一个安装程序并发布更新应该是非常简单的，而不需要经历一些繁琐的步骤。正巧，Squirrel.Windows可以解决这一些繁琐的步骤。
配置
1.	为现有的.NET 应用程序集成安装程序应该非常容易；
2.	客户端API应该能够检查更新和接收一个(最好是HTML格式)更新日志；
3.	在安装和更新期间，开发人员应该控制自定义操作和事件；
4.	卸载给了应用程序一个清理的机会(例如，可以在卸载时运行了一段代码)。
打包
1.	对于现有的应用程序，生成安装程序应该非常简单，就像对于ClickOnce一样；
2.	为我的应用程序创建一个更新应该是一个非常简单的过程，很容易自动化；
3.	打包将支持增量文件，以减少更新包的大小。
分发
1.	托管一个更新服务器应该是非常简单的，并且应该能够使用简单的HTTP来完成(例如，xxx项目托管了electron-release-server)；
2.	支持多种渠道发布。
安装
1.	安装到本地用户帐户(例如，在%LocalAppData%下)；
2.	没有重新启动。
更新
1.	更新应该能够在应用程序运行时应用；
2.	任何时候都不应该强迫用户停止他或她正在做的事情；
3.	没有重新启动。
 
图 5 squirrel.windows默认安装
(二)	Nsis方式
全名：Nullsoft Scriptable Install System，是一个开源的 Windows 系统下安装程序制作程序。它提供了安装、卸载、系统设置、文件解压缩等功能。这如其名字所指出的那样，NSIS 是通过它的脚本语言来描述安装程序的行为和逻辑的。NSIS 的脚本语言和通常的编程语言有类似的结构和语法，但它是为安装程序这类应用所设计的。
nsis键包含一组选项，指示electron-builder如何构建nsis目标。
这些选项也适用于Web安装程序，使用顶级nsisWeb密钥。
这个要详细的讲一下，这个nsis的配置指的是安装过程的配置，其实还是很重要的，如果不配置nsis那么应用程序就会自动的安装在C盘。没有用户选择的余地，这样肯定是不行的。xxx项目其实就是nsis和squirrel.windows的结合，既使用squirrel.windows的更新机制，又使用nsis的自定义安装。
关于nsis的配置是在build中nsis这个选项中进行配置，下面是部分nsis配置：

"nsis": {
  "oneClick": false, // 是否一键安装
  "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
  "allowToChangeInstallationDirectory": true, // 允许修改安装目录
  "installerIcon": "./build/icons/aaa.ico",// 安装图标
  "uninstallerIcon": "./build/icons/bbb.ico",//卸载图标
  "installerHeaderIcon": "./build/icons/aaa.ico", // 安装时头部图标
  "createDesktopShortcut": true, // 创建桌面图标
  "createStartMenuShortcut": true,// 创建开始菜单图标
  "shortcutName": "xxxx", // 图标名称
  "include": "build/script/installer.nsh", // 包含的自定义nsis脚本 这个对于构建需求严格得安装过程相当有用。
},
关于include 和 script 到底选择哪一个？
在对个性化安装过程需求并不复杂，只是需要修改一下安装位置，卸载提示等等的简单操作建议使用include配置,如果你需要炫酷的安装过程，建议使用script进行完全自定义。
xxx项目上传到服务器上的就是nsis打包出来的setup.exe。
 
图 6 nsis自定义安装
Nsis和squirrel.windows相同之处：
1.	之前的应用程序版本在更新后仍然存在。应用程序的旧版本一直存在。
2.	打包 - 打包应用程序文件并准备发布。
3.	安装 - 初始安装应用程序的过程。
不同之处：
1.	Nsis有颗粒度更细致的安装。
2.	Nsis无法生成package文件夹和Update.exe程序。
3.	squirrel.windows只能安装在本地用户帐户中。
4.	Squirrel.windows集成 - 将Squirrel UpdateManager集成到您的应用程序中。分发 - 为用户提供安装和更新文件。更新 - 更新现有安装的过程。
五、	开发中存在的问题
(一)	Can not find Squirrel
1.	背景
更新的时候出现了“Can not find Squirrel”的问题。为什么会出现这个问题呢？我们通过Electron源码分析下。Electron源码的GitHub地址：https://GitHub.com/Electron/Electron。
2.	分析
Electron源码其他模块本文就不做过多的分析，自动更新的模块在Electron\lib\browser\api\auto-updater文件夹中。其中有三个文件，分别是auto-updater-win.ts、 auto-updater-native.ts和squirrel-update-win.ts。
因为“Can not find Squirrel”出现在checkForUpdates方法中，所以我们先看auto-updater-win.ts文件中的checkForUpdates方法：
checkForUpdates () {
    const url = this.updateURL;
    if (!url) {
      return this.emitError(new Error('Update URL is not set'));
    }
    if (!squirrelUpdate.supported()) {
      return this.emitError(new Error('Can not find Squirrel'));
    }
    this.emit('checking-for-update');
    squirrelUpdate.checkForUpdate(url, (error, update) => {
      if (error != null) {
        return this.emitError(error);
      }
      if (update == null) {
        return this.emit('update-not-available');
      }
      this.updateAvailable = true;
      this.emit('update-available');
      squirrelUpdate.update(url, (error) => {
        if (error != null) {
          return this.emitError(error);
        }
        const { releaseNotes, version } = update;
        // 日期在Windows上是不可用的，所以伪造它。
        const date = new Date();
        this.emit('update-downloaded', {}, releaseNotes, version, date, this.updateURL, () => {
          this.quitAndInstall();
        });
      });
    });
  }
该方法检查更新版本，如果没有squirrelUpdate的supported方法，就抛出错误“Can not find Squirrel”那么。squirrelUpdate来自于哪里呢？见下：
import * as squirrelUpdate from '@Electron/internal/browser/api/auto-updater/squirrel-update-win';
再看squirrel-update-win.ts文件抛出的supported方法：
export function supported () {
  try {
    fs.accessSync(updateExe, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

该方法检测updateExe方法是否可以访问，我们走的是false，那就是访问不到，updateExe在文件上方定义：
// i.e. my-app/app-0.1.13/
const appFolder = path.dirname(process.ExecPath);

// i.e. my-app/Update.exe
const updateExe = path.resolve(appFolder, '..', 'Update.exe);
一通阅读后，Electron要去安装目录里查找Update.exe。如果找不到Update.exe，那么就报“Can not find Squirrel”的错误。如果找到，那么定时器触发的checkForUpdate方法就可以顺利往下走，下载URL指定的版本，并将新的结果写入stdout。如果没有更新就触发update-not-available。最后触发update方法，将应用程序更新为URL指定的最新远程版本。
如果你的应用程序没有安装，呼唤Squirrel将不会工作。需要安装一个应用程序。
这是一个头疼的问题，调试的情况下无法测试自动更新。
3.	解决方案
问题原因已经知道了，解决它其实没那么困难，只要安装好后，提供Update.exe即可。squirrel-Windows的xxx项目提供Update.exe，但是Nsis却不提供Update.exe。这就引发了问题2。
提示: 如果你尝试通过Visual Studio调试应用程序，你会得到一个 “Update.exe not found, not a Squirrel-installed app”这个报错。可以通过在bin目录中放置一个Update.exe的副本来解决这个问题。
(二)	安装目录中packages文件夹和Update.exe程序找不到
1.	背景
如果是squirrel.windows的打包方式的话，他会在安装目录中自动产生packages和Update.exe。但是nsis却不会。
Electron的autoupdate机制配上Nsis后，Nsis安装后不生成packages和Update.exe。估计是Nsis的问题，没有集成updateManage机制。无论怎样，我们都要重写Nsis安装，将packages和Update.exe在安装目录生成。
2.	解决方式
项目中，uploadAutoUpdateDep.js向minio添加RELEASES文件：
// 判断并删除当前版本的RELEASES文件
minioClient.removeObject('xxx项目', pkg.version, function (err) {
  if (err) {
    logger.error(`不能删除${pkg.version}对象`)
    logger.error(err)
  } else {
    upload()
  }
})

function upload () {
  // 创建当前版本的RELEASES文件
  minioClient.fPutObject('xxx项目', `${pkg.version}/RELEASES`, releaseFile, metaData, function (err, etag) {
    if (err) {
      logger.error(err)
    }
    logger.info(`${pkg.version}/RELEASES文件上传成功`)
  })
}
上述代码功能主要是删除minio中已经存在的RELEASE文件，并且上传当前版本的RELEASES文件。这个RELEASES文件就是squirrel.windows打包后生成的，文件包含SHA1、当前的nupkg版本和序列号。
Update.exe是永远不变的，所以直接将其拷贝到minio即可。
项目中，getAutoUpdateDep.js支持下载更新依赖：
// 当生产环境启动应用时，将Update.exe和当前版本的RELEASES下载下来

var BufferHelper = require('./bufferHelper')
module.exports = function () {
  minioClient.getObject('xxx项目', `${pkg.version}/RELEASES`, function (err, dataStream) {
    if (err) {
      logger.error(err)
      return console.log(err)
    }
    dataStream.on('data', function (chunk) {
      //  检查文件夹packages是否存在
      if (!fs.existsSync('../packages')) {
        fs.mkdirSync('../packages', (err) => {
          if (err) throw err
          logger.info('packages目录创建成功')
        })
      }
      //  检查文件RELEASES是否存在
      // if (!fs.existsSync('../packages/RELEASES')) {
      fs.writeFileSync('../packages/RELEASES', chunk, (err) => {
        if (err) {
          logger.error(err)
        }
        logger.info('RELEASES文件下载成功')
      })
      // }
    })
    dataStream.on('end', function () {
      logger.info('end:RELEASES文件下载成功')
    })
    dataStream.on('error', function (err) {
      logger.error(err)
    })
  })

  minioClient.getObject('xxx项目', 'Update.exe', function (err, dataStream) {
    var bufferHelper = new BufferHelper()
    if (err) {
      logger.error(err)
      return console.log(err)
    }
    dataStream.on('data', function (chunk) {
      bufferHelper.concat(chunk)
    })
    dataStream.on('end', function () {
      //  检查文件夹Update.exe是否存在
      if (!fs.existsSync('../Update.exe')) {
        fs.writeFileSync('../Update.exe', bufferHelper.toBuffer(), (err) => {
          if (err) {
            logger.error(err)
          }
          logger.info('Update.exe文件下载成功')
        })
      }
      logger.info('end:Update.exe文件下载成功')
    })
    dataStream.on('error', function (err) {
      logger.error(err)
    })
  })
}

这段代码主要是实现两个功能：
1.	判断安装目录中是否存在packages目录，如果存在，删除并且重新从minio中下载；
2.	判断是否存在Update.exe程序，如果不存在，那么就下载下来。
(三)	Error: spawn UNKNOWN
1.	背景
更新的时候，checkForUpdates检测到确实有新的版本。
打开packages文件夹中，发现已经将 nupkg 下载下来了，但是更新却失败了。
具体报错如下：
[2020-10-09T10:29:28.047] [INFO] default - checkForUpdates
[2020-10-09T10:29:28.047] [ERROR] default - There was a problem updating the application
[2020-10-09T10:29:28.047] [ERROR] default - Error: Error: spawn UNKNOWN
    at AutoUpdater.emitError (electron/js2c/browser_init.js:17:1391)
    at electron/js2c/browser_init.js:17:968
    at electron/js2c/browser_init.js:21:1005
    at electron/js2c/browser_init.js:21:553
    at processTicksAndRejections (internal/process/task_queues.js:79:11)
2.	原因分析
打包后，将 Update.exe 上传到 minio，但是下载却出现问题。
是因为writefilesync 写 Exe 失败，本地的 Update.exe 不完整，所以导致更新失败。
看一下fs.writeFileSync(file, data[, options])方法的参数：
1.	file <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
2.	data <string> | <Buffer> | <TypedArray> | <DataView>
3.	options <Object> | <string>
4.	encoding <string> | <null> 默认值: 'utf8'。
5.	mode <integer> 默认值: 0o666。
6.	flag <string> 参见文件系统 flag 的支持。 默认值: 'w'。
7.	返回 undefined。
问题就是出现在buffer 拼接之上。
在写Update.exe之前，我需要先将chunk进行拼接。
下面是我最原始的组装方式，因为在我的概念中都把他们当做string给组装了：
var data = "";  
res.on('data', function (chunk) {  
  data += chunk;  
})  
.on("end", function () {  
  //对data转码  
});

fs.writeFileSync('../Update.exe', new Buffer(), (err) => {})

'new Buffer()' was deprecated since v6. Use 'Buffer.alloc()' or 'Buffer.from()' (use 'https://www.npmjs.com/package/safe-buffer' for '<4.5.0') instead
其原因是两个chunk（Buffer对象）的拼接并不正常，相当于进行了buffer.toString() + buffer.toString()。如果buffer不是完整的，则toString出来后的string是存在问题的（比如一个中文字被截断）。
3.	解决方式
社区里有人提供了buffer拼接的方法，见bufferHelper.js：
var BufferHelper = function () {
  this.buffers = []
  this.size = 0
  this._status = 'changed'
}

BufferHelper.prototype.concat = function (buffer) {
  for (var i = 0, l = arguments.length; i < l; i++) {
    this._concat(arguments[i])
  }
  return this
}

BufferHelper.prototype._concat = function (buffer) {
  this.buffers.push(buffer)
  this.size = this.size + buffer.length
  this._status = 'changed'
  return this
}

BufferHelper.prototype._toBuffer = function () {
  var data = null
  var buffers = this.buffers
  switch (buffers.length) {
    case 0:
      data = new Buffer(0)
      break
    case 1:
      data = buffers[0]
      break
    default:
      data = new Buffer(this.size)
      for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
        var buffer = buffers[i]
        buffer.copy(data, pos)
        pos += buffer.length
      }
      break
  }
  // 缓存计算结果
  this._status = 'computed'
  this.buffer = data
  return data
}

BufferHelper.prototype.toBuffer = function () {
  return this._status === 'computed' ? this.buffer : this._toBuffer()
}

BufferHelper.prototype.toString = function () {
  return Buffer.prototype.toString.apply(this.toBuffer(), arguments)
}

module.exports = BufferHelper
这里有两个私有方法，_concat和_toBuffer。_concat链接buffer流，_toBuffer转为buffer实例。其目的是保证每个方法的职责单一，还在toBuffer里做了一下状态设置，使得不浪费CPU。
下载Update.exe代码就在问题2中。
(四)	Error Downloading Update: Command failed: 4294967295
1.	背景
自动更新过程中出现“Error Downloading Update: Command failed: 4294967295”的报错，因为这个问题很常见，所以我要挑出来讲。
2.	原因分析
这个问题在Squirrel.Windows的issues（https://GitHub.com/Squirrel/Squirrel.Windows/issues/833）中也有，
其中的回答绕不过一点：程序的错误，远程发布文件是空的或损坏影响我们的更新。
3.	解决方式
对于开发者来说，我需要重新上传新的安装程序。
对于用户来说，可能需要先卸载后重新安装新的版本。
(五)	更新后，老版本没有被替换
1.	背景
自动更新完成后，多出来一个新版本的目录app-0.0.2,没有覆盖xxx项目，桌面快捷方式打开的还是xxx项目里的旧版本。
究其原因，归咎于nsis没有集成updateManage机制。上文已经描述过，就不再多述。
 
图 7 安装目录
2.	解决方案
1.	向服务器每隔一段时间发送当前版本的请求，询问其是否有新版本的应用（setFeedURL和checkForUpdates方法实现）
2.	当有更新进入error、checking-for-update、update-available和update-not-available这些钩子方法时，写入日志
3.	更新进入update-downloaded，提示用户更新完成，手动重启。然后，启动一个子进程去执行bat脚本，替换安装目录下面的旧版本。
xxx项目的更新代码，见update.js：
const server = process.env.VUE_APP_SERVER
const url = `${server}/update/${process.platform}/${app.getVersion()}/stable`
logger.info(`url:${url}`)
autoUpdater.setFeedURL({
  url
})
logger.info(`process.ExecPath:${process.ExecPath}`)

// 更新频率-1h
setInterval(() => {
  autoUpdater.checkForUpdates()
  logger.info('checkForUpdates')
}, 3600000)

const appName = '应用更新'
const message = {
  error: '检查更新出错',
  checking: '正在检查更新……',
  updateAva: '下载更新包成功',
  updateNotAva: '现在使用的就是最新版本，不用更新',
  downloaded: '更新完成，请手动重启'
}
autoUpdater.on('error', error => {
  logger.error('There was a problem updating the application')
  logger.error(error)
})
.on('checking-for-update', function () {
    logger.info('当开始检查更新的时候触发')
  })
  .on('update-available', function () {
    logger.info('当有可用更新时发出，更新会自动下载')
  })
  .on('update-not-available', function () {
    logger.info('暂无更新')
  })
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  logger.info('update-downloaded')
  logger.info(`releaseNotes:${releaseNotes}`)
  logger.info(`releaseName:${releaseName}`)

  dialog.showMessageBox({
    type: 'info',
    buttons: ['确定'],
    title: appName,
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: message.downloaded
  }).then((returnValue) => {
    if (returnValue.response === 0) {
      fs.writeFile('../releaseName.txt', releaseName, (err) => {
        if (err) {
          logger.error(err)
          throw err
        } else {
          var ls
          ls = childProcess.spawn('libs/Windows/adb/adb', ['kill-server'])
          ls.stdout.on('data', function (data) {
            logger.info('stdout: ' + data)
          })
          ls.stderr.on('data', function (data) {
            logger.error('stderr: ' + data)
          })
          ls.on('exit', function (code) {
            logger.info('目录替换程序开始运行')
            const a = process.cwd()
            logger.info('a ' + a)
            const arr = a.split('\\')
            logger.info('arr ' + arr)
            const pre = a.slice(0, -arr[arr.length - 1].length)
            logger.info('pre' + pre)
            process.chdir(pre)
            childProcess.Exec(`start /min  "" "${pre}replace.bat" ${releaseName}`)
            setTimeout(() => {
              logger.info('xxx项目退出')
              app.quit()
            }, 1000)
          })
        }
      })
    }
  })
})
xxx项目新版本替换旧版本的脚本，见Replace.bat：
chcp 65001
echo **更新即将完成，请勿关闭窗口！** >> replace.log
ping -n 5 127.0.0.1 >> replace.log
COPY ".\xxx项目\Uninstall xxx项目.Exe" app-%1 >> replace.log
COPY ".\xxx项目\uninstallerIcon.ico" app-%1 >> replace.log
RD /q /s ".\xxx项目" >> replace.log
ren app-%1 "xxx项目" >> replace.log
del "xxx项目.Exe" >> replace.log
exit

(六)	Update.exe之外的操作无日志
1.	背景
更新过程中产生的日志都存储在SquirrelSetup.log中，但是仅仅只是Update.exe产出的日志。可是很多步骤需要输出更多的日志。
自动化工具中的部分更新日志采用log4js方案，将不同的日志类型输出在不同文件中。
2.	解决方案
xxx项目的日志配置，见log4js.js：
const log4js = require('log4js')
const programName = 'xxx项目'
log4js.configure({
  appenders: {
    console: { // 记录器1:输出到控制台
      type: 'console'
    },
    log_file: { // 记录器2：输出到文件
      type: 'file',
      filename: `./logs/${programName}.log`, 
      maxLogSize: 20971520, 
      backups: 3, 
      encoding: 'utf-8' 
    },
    data_file: { // ：记录器3：输出到日期文件
      type: 'dateFile',
      filename: `./logs/${programName}`,  
      alwaysIncludePattern: true,  
      daysToKeep: 7, 
      pattern: 'yyyy-MM-dd-hh.log', 
      encoding: 'utf-8' 
    },
    error_file: { // ：记录器4：输出到error log
      type: 'dateFile',
      filename: `./logs/${programName}_error`, 
      alwaysIncludePattern: true, 
      daysToKeep: 7, 
    
      pattern: 'yyyy-MM-dd-hh.log', 
      encoding: 'utf-8' 
    }
  },
  categories: {
    default: {
      appenders: ['data_file', 'console', 'log_file'],
      level: 'info'
    }, // 默认log类型，输出到控制台 log文件 log日期文件 且登记大于info即可
    production: {
      appenders: ['data_file'],
      level: 'warn'
    }, // 生产环境 log类型 只输出到按日期命名的文件，且只输出警告以上的log
    console: {
      appenders: ['console'],
      level: 'debug'
    }, // 开发环境  输出到控制台
    debug: {
      appenders: ['console', 'log_file'],
      level: 'debug'
    }, // 调试环境 输出到log文件和控制台
    error_log: {
      appenders: ['error_file'],
      level: 'error'
    } // error 等级log 单独输出到error文件中 任何环境的errorlog 将都以日期文件单独记录
  }
})

module.exports = log4js
 
总结
解决的方式可能会很多，但是需要采用一种适合自己的方式钻研到底，坚持不懈，就一定能得到收获。
文中介绍了当前存在的问题、自动更新的方案、打包的两种方式和开发中存在的问题。其中，xxx项目采用的是squirrel.windows的更新机制和nsis的自定义安装策略。通过electron-builder将两者配置后，产出不同的安装程序setup.exe和更新程序nupkg。然后将nsis的setup.exe和squirrel.windows中的nupkg上传到electron-release-server中。利用electron-release-server定时检查策略，对比本地版本和线上版本，自动下载依赖和程序，进行更新并且替换，做到用户无感知，操作不繁琐。
开发中遇到问题其实不止这些，由于篇幅问题，所以我总结了一部分常见的问题。