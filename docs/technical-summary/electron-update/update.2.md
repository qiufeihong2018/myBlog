
### 五、	开发中存在的问题
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
