# express监听日志文件的变化

## 监听日志文件

```js

function watchFile(filename, client) {
  console.log('Log monitoring...');
  // Open the file
  fs.open(filename, 'a+', function (err, fd) {
    if (err) {
      throw err;
    }
    var buffer;
    fs.watchFile(filename, {
      persistent: true,
      interval: 1000
    }, (curr, prev) => {
      if (curr.mtime > prev.mtime) {
        // console.log(`The current latest revision time is: ${curr.mtime}`);
        // console.log(`The latest modification time is: ${prev.mtime}`);
        // Changes in the contents of documents
        buffer = new Buffer(curr.size - prev.size);

        readFile(fd, buffer, (curr.size - prev.size), prev.size, client);
      }
    });
  });

}
```

## 读取新增内容
```js
function readFile(fd, buffer, length, position, client) {
  // read file
  fs.read(fd, buffer, 0, length, position, function (err, bytesRead, buffer) {
    if (err) {
      log.error(err);
    }
    console.log('Additional Contents', buffer.toString());
  });
}
```


## 额外需求:历史内容
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
      console.log(`Original data: \n ${logsArr[i]}`);
    }
  });
}
```
## 参考文献

[Nodejs 实时监控文件内容的变化及按行读取文本文件](https://segmentfault.com/a/1190000003902877?name=node&description=&isPrivate=1)

[Nodejs监控文件内容变化并获取最新添加的内容](https://blog.csdn.net/qqHJQS/article/details/51780365)