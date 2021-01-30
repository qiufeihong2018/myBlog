# 研究Electron自动更新 系列二【近8k字】
上一篇文章——[系列一](https://github.com/qiufeihong2018/vuepress-blog/blob/master/docs/technical-summary/electron-update/update.1.md)，从自动更新的方案深入地讲解了其中的原理，另外还讲解了两种打包方式。

如果你对文章目录感兴趣，可以阅读[这里](https://github.com/qiufeihong2018/vuepress-blog/tree/master/docs/technical-summary/electron-update)

今天，让我们来看看自动更新开发中出现的一些问题。

在文章中所经历的项目是采用 `electron-vue` + `electron-builder` + `electron-release-server` 架构。
## 开发中存在的问题
### (一)	Can not find Squirrel
#### 1.	背景
更新的时候出现了“`Can not find Squirrel`”的问题。为什么会出现这个问题呢？我们通过 `Electron` 源码分析下。`Electron` 源码的 `GitHub` 地址：`https://GitHub.com/Electron/Electron`。
#### 2.	分析
如果你对 `electron` 的 `autoupdate` 不熟悉，可以阅读[这里](https://www.electronjs.org/docs/api/auto-updater#event-update-not-available)

`Electron` 源码中的其他模块本文就不做过多的分析，自动更新的模块在 `Electron\lib\browser\api\auto-updater` 文件夹中。

其中有三个文件，分别是 `auto-updater-win.ts`、 `auto-updater-native.ts` 和 `squirrel-update-win.ts`。

因为“`Can not find Squirrel`”出现在 `checkForUpdates` 方法中，所以我们先看 `auto-updater-win.ts` 文件中的 `checkForUpdates` 方法：
```js
checkForUpdates () {
  // 这个是更新服务器的url
    const url = this.updateURL;
    if (!url) {
      return this.emitError(new Error('Update URL is not set'));
    }
    // 本地是否支持更新
    if (!squirrelUpdate.supported()) {
      return this.emitError(new Error('Can not find Squirrel'));
    }
    // 检查更新
    this.emit('checking-for-update');
    squirrelUpdate.checkForUpdate(url, (error, update) => {
      // 更新错误抛出异常
      if (error != null) {
        return this.emitError(error);
      }
      // 无更新提醒用户
      if (update == null) {
        return this.emit('update-not-available');
      }
      this.updateAvailable = true;
      // 有更新，自动触发下载更新
      this.emit('update-available');
      squirrelUpdate.update(url, (error) => {
        if (error != null) {
          return this.emitError(error);
        }
        const { releaseNotes, version } = update;
        // 日期在Windows上是不可用的，所以伪造它。
        const date = new Date();
        this.emit('update-downloaded', {}, releaseNotes, version, date, this.updateURL, () => {
          // 退出并且安装
          this.quitAndInstall();
        });
      });
    });
  }
```
该方法检查更新版本，如果没有 `squirrelUpdate` 的 `supported` 方法，就抛出错误“`Can not find Squirrel`”那么。`squirrelUpdate` 来自于哪里呢？请往下看：
```js
import * as squirrelUpdate from '@Electron/internal/browser/api/auto-updater/squirrel-update-win';
```
再看 `squirrel-update-win.ts` 文件抛出的 `supported` 方法：
```js
export function supported () {
  try {
    // 检测本地是否有更新程序
    fs.accessSync(updateExe, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}
```
该方法检测 `updateExe` 方法是否可以访问，我们走的是 `false`，那就是访问不到，`updateExe` 在文件上方定义：
```js
// i.e. my-app/app-0.1.13/
const appFolder = path.dirname(process.ExecPath);

// i.e. my-app/Update.exe
const updateExe = path.resolve(appFolder, '..', 'Update.exe);
```
一通阅读后，`Electron` 要去安装目录里查找 `Update.exe`。如果找不到 `Update.exe`，那么就报“`Can not find Squirrel`”的错误。如果找到，那么定时器触发的 `checkForUpdate` 方法就可以顺利往下走，下载 `URL` 指定的版本，并将新的结果写入 `stdout`。如果没有更新就触发 `update-not-available`。最后触发 `update` 方法，将应用程序更新为 `URL` 指定的最新远程版本。

如果你的应用程序没有安装，呼唤 `Squirrel` 将不会工作。需要安装一个应用程序，
调试的情况下无法测试自动更新，这是一个头疼的问题。

#### 3.	解决方案
问题原因已经知道了，解决它其实没那么困难，只要安装好后，提供 `Update.exe` 即可。`squirrel-Windows` 的 `xxx` 项目提供 `Update.exe`，但是 `Nsis` 却不提供 `Update.exe`（可能有，但是我没有找到相关配置）。这就引发了问题 `2`。

提示: 如果你尝试通过 `Visual Studio` 调试应用程序，你会得到一个 “`Update.exe not found, not a Squirrel-installed app`”这个报错。可以通过在 `bin` 目录中放置一个 `Update.exe` 的副本来解决这个问题。
### (二)	安装目录中 `packages` 文件夹和 `Update.exe` 程序找不到
#### 1.	背景
如果是 `electron-builder` 打包配置了 `squirrel.windows` 的的话，他会在安装目录中自动产生 `packages` 和 `Update.exe`。但是 `nsis` 却不会。

`Electron` 的 `autoupdate` 机制配上 `Nsis` 后，`Nsis` 安装后不生成 `packages` 和 `Update.exe`。估计是 `Nsis` 的问题，没有集成 `updateManage` 机制。无论怎样，我们都要重写 `Nsis` 安装，将 `packages` 和 `Update.exe` 在安装目录生成。
#### 2.	解决方式
项目中采用 `minio` 作为对象存储，你可以选用七牛云、阿里云等等。

项目中，`uploadAutoUpdateDep.js` 向 `minio` 添加 `RELEASES` 文件：
```js
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
```
上述代码功能主要是删除 `minio` 中已经存在的 `RELEASE` 文件，并且上传当前版本的 `RELEASES` 文件。这个 `RELEASES` 文件就是 `squirrel.windows` 打包后生成的，文件包含 `SHA1`、当前的 `nupkg` 版本和序列号。

`Update.exe` 是永远不变的，所以直接将其拷贝到 `minio` 即可。
项目中，`getAutoUpdateDep.js` 支持下载更新依赖：
```js
// 当生产环境启动应用时，将 `Update.exe` 和当前版本的 `RELEASES` 下载下来

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
```
这段代码主要是实现两个功能：
1.	判断安装目录中是否存在 `packages` 目录，如果存在，删除并且重新从 `minio` 中下载；
2.	判断是否存在 `Update.exe` 程序，如果不存在，那么就下载下来。
### (三)	Error: spawn UNKNOWN
#### 1.	背景
更新的时候，`checkForUpdates` 检测到确实有新的版本。
打开 `packages` 文件夹中，发现已经将最新版应用的 `nupkg` 文件下载下来了，但是更新却失败了。
具体报错如下：
```bash
[2020-10-09T10:29:28.047] [INFO] default - checkForUpdates
[2020-10-09T10:29:28.047] [ERROR] default - There was a problem updating the application
[2020-10-09T10:29:28.047] [ERROR] default - Error: Error: spawn UNKNOWN
    at AutoUpdater.emitError (electron/js2c/browser_init.js:17:1391)
    at electron/js2c/browser_init.js:17:968
    at electron/js2c/browser_init.js:21:1005
    at electron/js2c/browser_init.js:21:553
    at processTicksAndRejections (internal/process/task_queues.js:79:11)
```
#### 2.	原因分析
打包后，将 `Update.exe` 上传到 `minio`，但是下载却出现问题。

是因为 `writefilesync` 写 `Exe` 失败，本地的 `Update.exe` 不完整，所以导致更新失败。
看一下 `fs.writeFileSync(file, data[, options])` 方法的参数：
```
1.	file <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
2.	data <string> | <Buffer> | <TypedArray> | <DataView>
3.	options <Object> | <string>
4.	encoding <string> | <null> 默认值: 'utf8'。
5.	mode <integer> 默认值: 0o666。
6.	flag <string> 参见文件系统 flag 的支持。 默认值: 'w'。
7.	返回 undefined。
```
问题就是出现在 `buffer` 拼接之上。
在写 `Update.exe` 之前，我需要先将 `chunk` 进行拼接。
下面是我最原始的组装方式，因为在我的概念中都把他们当做 `string` 给组装了：
```js
var data = "";  
res.on('data', function (chunk) {  
  data += chunk;  
})  
.on("end", function () {  
  //对data转码  
});

fs.writeFileSync('../Update.exe', new Buffer(), (err) => {})
```
`'new Buffer()' was deprecated since v6. Use 'Buffer.alloc()' or 'Buffer.from()' (use 'https://www.npmjs.com/package/safe-buffer' for '<4.5.0') instead`

其原因是两个 `chunk`（`Buffer` 对象）的拼接并不正常，相当于进行了 `buffer.toString() + buffer.toString()`。如果 `buffer` 不是完整的，则 `toString` 出来后的 `string` 是存在问题的（比如一个中文字被截断）。
#### 3.	解决方式
社区里有人提供了 `buffer` 拼接的方法，见 `bufferHelper.js`：
```js
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
```
这里有两个私有方法，`_concat` 和 `_toBuffer`。`_concat` 链接 `buffer` 流，`_toBuffer` 转为 `buffer` 实例。

其目的是保证每个方法的职责单一，还在 `toBuffer` 里做了一下状态设置，使得不浪费 `CPU`。
下载 `Update.exe` 代码就在问题 `2` 中。

## 总结
如果是系列一是”是什么“，那么系列二就是”为什么？怎么办？“。

本文中，我列举了开发中出现的三个问题，分别是“`Can not find Squirrel`”、“安装目录中`packages`文件夹和`Update.exe`程序找不到”和“`Error: spawn UNKNOWN`”，从不同角度分析并且作了解答。


最后，希望大家一定要点赞三连。

可以阅读我的其他文章，见[blog地址](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。常常推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>