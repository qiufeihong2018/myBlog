# 【Github】adb的说明文档
`adbkit` 是一个用于 `Android` 调试桥接服务器的纯 `Node.js` 客户端。它既可以作为您自己的应用程序中的一个库使用，也可以简单地作为一个方便的工具来使用您的设备。`adb` 命令行工具的大部分功能都得到了支持(包括推/拉文件、安装 `APKs` 和处理日志)，还添加了一些功能，比如能够生成触摸/键事件和截图。

## 依赖

请注意，尽管它可能在某些时候发生，这个项目不是 `ADB` 服务器的实现。目标主机(设备连接的地方)必须仍然安装了 `ADB`，并且已经在运行(例如，通过 `ADB start-server`)或者在 `$PATH` 中可用。如果初始连接失败，将尝试通过上述命令在本地启动服务器。这是我们回到 `adb` 二元体系的唯一情况。
当以远程主机为目标时，启动服务器完全由您负责。或者，你可能想要考虑使用 `Chrome ADB` 扩展，因为它包括 `ADB` 服务器，可以很容易地启动/停止。

我们使用 `debug`，而我们的 `debug` 命名空间是 `adb`。一些依赖项可能提供它们自己的调试输出。要查看调试输出，请设置调试环境变量。例如，使用 `DEBUG=adb:* node app.js` 运行程序。请注意，尽管该模块是用 `CoffeeScript` 编写的，但只有已编译的 `JavaScript` 被发布到 `NPM`，这意味着它也可以很容易地与纯 `JavaScript`  代码库一起使用。

## 例子
示例可能有点冗长，但这是因为我们试图让它们尽可能接近真实的代码，同时考虑了流控制和错误处理。
### 检查 `NFC` 支持
```js
var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient()

client.listDevices()
  .then(function(devices) {
    return Promise.filter(devices, function(device) {
      return client.getFeatures(device.id)
        .then(function(features) {
          return features['android.hardware.nfc']
        })
    })
  })
  .then(function(supportedDevices) {
    console.log('The following devices support NFC:', supportedDevices)
  })
  .catch(function(err) {
    console.error('Something went wrong:', err.stack)
  })
```
### 安装一个 `APK`
```js
var Promise = require('bluebird')
var adb = require('adbkit')
var client = adb.createClient()
var apk = 'vendor/app.apk'

client.listDevices()
  .then(function(devices) {
    return Promise.map(devices, function(device) {
      return client.install(device.id, apk)
    })
  })
  .then(function() {
    console.log('Installed %s on all connected devices', apk)
  })
  .catch(function(err) {
    console.error('Something went wrong:', err.stack)
  })
```
### 跟踪设备
```js
var adb = require('adbkit')
var client = adb.createClient()

client.trackDevices()
  .then(function(tracker) {
    tracker.on('add', function(device) {
      console.log('Device %s was plugged in', device.id)
    })
    tracker.on('remove', function(device) {
      console.log('Device %s was unplugged', device.id)
    })
    tracker.on('end', function() {
      console.log('Tracking stopped')
    })
  })
  .catch(function(err) {
    console.error('Something went wrong:', err.stack)
  })
```
### 从所有连接的设备中提取文件
```js
var Promise = require('bluebird')
var fs = require('fs')
var adb = require('adbkit')
var client = adb.createClient()

client.listDevices()
  .then(function(devices) {
    return Promise.map(devices, function(device) {
      return client.pull(device.id, '/system/build.prop')
        .then(function(transfer) {
          return new Promise(function(resolve, reject) {
            var fn = '/tmp/' + device.id + '.build.prop'
            transfer.on('progress', function(stats) {
              console.log('[%s] Pulled %d bytes so far',
                device.id,
                stats.bytesTransferred)
            })
            transfer.on('end', function() {
              console.log('[%s] Pull complete', device.id)
              resolve(device.id)
            })
            transfer.on('error', reject)
            transfer.pipe(fs.createWriteStream(fn))
          })
        })
    })
  })
  .then(function() {
    console.log('Done pulling /system/build.prop from all connected devices')
  })
  .catch(function(err) {
    console.error('Something went wrong:', err.stack)
  })
```