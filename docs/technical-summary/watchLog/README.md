# Nodejs监听日志文件的变化

## 需求
最近有在做日志文件的分析，其中有一个需求：A服务器项目需要用Nodejs监听日志文件的变化，当项目产生了新的日志信息，将新的部分通过socket传输到B服务器项目。socket暂时不做分析。

这个需求很简单，通过分析我们开始撸码吧。

在撸码的过程中还能巩固所学Nodejs的API，何乐而不为呢？
## 所用的API
### fs.watchFile()
1. 语法
```js
fs.watchFile(filename[, options], listener)

```
参数解析

```js
filename <string> | <Buffer> | <URL> ——文件名
options <Object>

  persistent <boolean> 默认值: true。——是否应该继续运行
  interval <integer> 默认值: 5007。——轮询目标的频率
listener <Function>

  current <fs.Stats>  ——当前值
  previous <fs.Stats> ——之前值
```
监视 filename 的更改。 每当访问文件时都会调用 listener 回调。

listener 有两个参数，当前的 stat 对象和之前的 stat 对象

这些 stat 对象是 fs.Stat 的实例。

要在修改文件（而不仅仅是访问）时收到通知，则需要比较 curr.mtime 和 prev.mtime。

当 fs.watchFile 操作导致 ENOENT 错误时，它将调用一次监听器，并将所有字段置零（或将日期设为 Unix 纪元）。 如果文件是在那之后创建的，则监听器会被再次调用，且带上最新的 stat 对象。 这是 v0.10 之后的功能变化。

使用 fs.watch() 比 fs.watchFile 和 fs.unwatchFile 更高效。 应尽可能使用 fs.watch 代替 fs.watchFile 和 fs.unwatchFile。

当 fs.watchFile() 正在监视的文件消失并重新出现时，第二次回调事件（文件重新出现）返回的 previousStat 会与第一次回调事件（文件消失）返回的 previousStat 相同。

这种情况发生在:

- 文件被删除，然后又恢复。
- 文件被重命名两次，且第二次重命名回其原来的名称。

2. 例子
```js
fs.watchFile('message.text', (curr, prev) => {
  console.log(`当前的最近修改时间是: ${curr.mtime}`);
  console.log(`之前的最近修改时间是: ${prev.mtime}`);
});
```

### fs.open()

语法
```js
fs.open(path[, flags[, mode]], callback)
```
参数解析
```js
path <string> | <Buffer> | <URL> ——文件路径
flags <string> | <number> 默认值: 'r'。——文件系统标志
mode <integer> 默认值: 0o666（可读写）。——设置文件模式（权限和粘滞位），但仅限于创建文件的情况
callback <Function>

  err <Error> ——错误
  fd <integer>——文件系统流
```
### fs.read()
语法
```js
fs.read(fd, buffer, offset, length, position, callback)
```
参数解析
```js
fd <integer> ——文件系统流
buffer <Buffer> | <TypedArray> | <DataView>——数据将写入的缓冲区
offset <integer>—— buffer 中开始写入的偏移量
length <integer>——要读取的字节数
position <integer>——从文件中开始读取的位置
callback <Function>

  err <Error>
  bytesRead <integer>
  buffer <Buffer>
```

### fs.createReadStream()
1. 语法
```js
fs.createReadStream(path[, options])
```
参数解析
```js
path <string> | <Buffer> | <URL>——文件路径
options <string> | <Object>

  flags <string> 默认值: 'r'。——文件系统标志
  encoding <string> 默认值: null。——字符编码
  fd <integer> 默认值: null。——文件系统流
  mode <integer> 默认值: 0o666。——设置文件模式（权限和粘滞位），但仅限于创建文件的情况
  autoClose <boolean> 默认值: true。——是否自动关闭文件描述符
  start <integer>——文件读取的开始位置
  end <integer> 默认值: Infinity。——文件读取的结束位置
  highWaterMark <integer> 默认值: 64 * 1024。
返回: <fs.ReadStream> 参阅可读流。
```
如果 autoClose 为 false，则即使出现错误，也不会关闭文件描述符。 应用程序负责关闭它并确保没有文件描述符泄漏。 如果 autoClose 设为 true（默认行为），则在 'error' 或 'end' 事件时将自动关闭文件描述符。

mode 用于设置文件模式（权限和粘滞位），但仅限于创建文件的情况。

2. 例子

读取sample.txt文件的10个字符
```js
fs.createReadStream('sample.txt', { start: 90, end: 99 });
```

### readLine.createInterface
1. 语法

```js
readline.createInterface(options)
```
参数解析
```js
options <Object>

  input <stream.Readable> 要监听的可读流。此选项是必需的。
  output <stream.Writable> 将逐行读取数据写入的可写流。
  completer <Function> 用于 Tab 自动补全的可选函数。
  terminal <boolean> 如果 input 和 output 应该被视为 TTY，并且写入 ANSI/VT100 转义码，则为 true。 默认值: 实例化时在 output 流上检查 isTTY。
  historySize <number> 保留的最大历史记录行数。 要禁用历史记录，请将此值设置为 0。 仅当用户或内部 output 检查将 terminal 设置为 true 时，此选项才有意义，否则根本不会初始化历史记录缓存机制。 默认值: 30。
  prompt - 要使用的提示字符串。默认值: '> '。
  crlfDelay <number> 如果 \r 与 \n 之间的延迟超过 crlfDelay 毫秒，则 \r 和 \n 将被视为单独的行尾输入。  crlfDelay 将被强制转换为不小于 100 的数字。 可以设置为 Infinity, 这种情况下， \r 后跟 \n 将始终被视为单个换行符（对于使用 \r\n 行分隔符的文件读取可能是合理的）。 默认值: 100。
  removeHistoryDuplicates <boolean> 如果为 true, 则当添加到历史列表的新输入行与旧的输入行重复时，将从列表中删除旧行。 默认值: false。
  escapeCodeTimeout <number> readline 将会等待一个字符的持续时间（当以毫秒为单位读取模糊键序列时，可以使用输入读取到目前为止形成完整的键序列，并且可以采取额外的输入来完成更长的键序列）。 默认值: 500。
```

### [文件系统标志](http://nodejs.cn/api/fs.html#fs_file_system_flags)

这个不需要司机，记住常见的即可，需要的时候查找。

当 flag 选项采用字符串时，可用以下标志：

```text

'a' - 打开文件用于追加。如果文件不存在，则创建该文件。

'ax' - 与 'a' 相似，但如果路径已存在则失败。

'a+' - 打开文件用于读取和追加。如果文件不存在，则创建该文件。

'ax+' - 与 'a+' 相似，但如果路径已存在则失败。

'as' - 以同步模式打开文件用于追加。如果文件不存在，则创建该文件。

'as+' - 以同步模式打开文件用于读取和追加。如果文件不存在，则创建该文件。

'r' - 打开文件用于读取。如果文件不存在，则出现异常。

'r+' - 打开文件用于读取和写入。如果文件不存在，则出现异常。

'rs+' - 以同步模式打开文件用于读取和写入。指示操作系统绕过本地的文件系统缓存。

这对于在 NFS 挂载上打开文件时非常有用，因为它允许跳过可能过时的本地缓存。 它对 I/O 性能有非常实际的影响，因此除非需要，否则不建议使用此标志。

这不会将 fs.open() 或 fsPromises.open() 转换为同步的阻塞调用。 如果需要同步的操作，则应使用 fs.openSync() 之类的。

'w' - 打开文件用于写入。如果文件不存在则创建文件，如果文件已存在则截断文件。

'wx' - 与 'w' 相似，但如果路径已存在则失败。

'w+' - 打开文件用于读取和写入。如果文件不存在则创建文件，如果文件已存在则截断文件。

'wx+' - 与 'w+' 相似，但如果路径已存在则失败。
```
### [fs.Stats 类](http://nodejs.cn/api/fs.html#fs_class_fs_stats)
fs.Stats 对象提供有关文件的信息。

```js
Stats {
  dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atimeMs: 1318289051000.1,
  mtimeMs: 1318289051000.1,
  ctimeMs: 1318289051000.1,
  birthtimeMs: 1318289051000.1,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
```
## 开始监听日志文件
前提，在app.js中调用watchFile方法，将需要监听的文件路径传入该方法中。

```js
function watchFile(filename) {
  console.log('Log monitoring...');
  // Open the file for reading and appending
  fs.open(filename, 'a+', function (err, fd) {
    if (err) {
      throw err;
    }
    var buffer;
    fs.watchFile(filename, {
      persistent: true,
      interval: 1000
    }, (curr, prev) => {
      // Compare the time before and after
      if (curr.mtime > prev.mtime) {
        // console.log(`The current latest revision time is: ${curr.mtime}`);
        // console.log(`The latest modification time is: ${prev.mtime}`);

        // Changes in the contents of documents
        buffer = new Buffer(curr.size - prev.size);
          // (curr.size - prev.size) this is the newly added length of the log file
        readFile(fd, buffer, (curr.size - prev.size), prev.size);
      }
    });
  });

}
```

## 读取新增内容
```js
function readFile(fd, buffer, length, position) {
  // read file
  fs.read(fd, buffer, 0, length, position, function (err, bytesRead, buffer) {
    if (err) {
      log.error(err);
    }
    console.log('Additional Contents', buffer.toString());
  });
}
```


## 额外功能:读取历史内容
```js
function fetchHistoryLogs(filename) {
  const rl = readLine.createInterface({
    input: fs.createReadStream(filename, {
      enconding: 'utf8'
    }),
    output: null,
    terminal: false
  });

  rl.on('line', (line) => {
    if (line) {
      logsArr.push(line.toString());
    }
  }).on('close', () => {
    for (var i = 0; i < logsArr.length; i++) {
      // Print the data for each row
      console.log(`Original data: \n ${logsArr[i]}`);
    }
  });
}
```

## 参考文献
[Nodejs](http://nodejs.cn/api/fs.html#fs_fs_open_path_flags_mode_callback)

[Nodejs 实时监控文件内容的变化及按行读取文本文件](https://segmentfault.com/a/1190000003902877?name=node&description=&isPrivate=1)

[Nodejs监控文件内容变化并获取最新添加的内容](https://blog.csdn.net/qqHJQS/article/details/51780365)



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>