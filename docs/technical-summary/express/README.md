# express从入门到放弃

## Formidable

### 目的

用于解析表单数据，尤其是文件上载的node.js模块。

### 当前状态

需要维修人员：请参阅https://github.com/felixge/node-formable/issues/412
这个模块是为Transloadit开发的，这是一个专注于上传和编码图像和视频的服务。它经过了数百GB的文件上传测试，从各种各样的客户机上传，被认为是生产就绪。

### 特征

- 快速（约500MB/秒），非缓冲多部分分析器
- 自动将文件上载写入磁盘
- 低内存占用
- 优雅的错误处理
- 非常高的测试覆盖率

### 安装
```
npm i -S formidable
```
这是一个低级包，如果您使用的是高级框架，那么它可能已经包含在内了。但是，Expressv4不包括任何多部分处理，body解析器也不包括。
注意：强大需要轻而易举地运行单元测试，但您不需要它来仅仅使用库。

### 例子
分析传入文件上载。

```js
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
 
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
 
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
 
    return;
  }
 
  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);
```
![avatar](../public/express1.png)

### API

#### Formidable.IncomingForm
```js
var form = new formidable.IncomingForm()
```
创建新的传入表单。
```js
form.encoding = 'utf-8';
```
设置传入表单域的编码。
```js
form.uploadDir = "/my/dir";
```
设置用于放置文件上载的目录。稍后可以使用fs.rename（）移动它们。默认值为os.tmpdir（）。
```js
form.keepExtensions = false;
```
如果希望写入Form.UploadDir的文件包含原始文件的扩展名，请将此属性设置为true。
```js
form.type
```
“multipart”或“urlencoded”取决于传入请求。
```js
form.maxFieldsSize = 20 * 1024 * 1024;
```
限制所有字段（文件除外）可以按字节分配的内存量。如果超过此值，将发出“错误”事件。默认大小为20MB。
```js
form.maxFileSize = 200 * 1024 * 1024;
```
限制上载文件的大小。如果超过此值，将发出“错误”事件。默认大小为200MB。
```js
form.maxFields = 1000;
```

限制查询字符串分析器将解码的字段数。默认值为1000（0表示无限制）。

```js
form.hash = false;
```
如果要为传入文件计算校验和，请将其设置为“sha1”或“md5”。


```js
form.multiples = false;
```
如果启用此选项，则在调用form.parse时，“文件”参数将包含用于输入的文件数组，这些输入使用html5 multiple属性提交多个文件。
```js
form.bytesReceived
```
到目前为止为此表单接收的字节数。
```js
form.bytesExpected
```
此表单中的预期字节数。
```js
form.parse(request, [cb]);
```
解析包含表单数据的传入node.js请求。如果提供了cb，则收集所有字段和文件并将其传递给回调：
```js
form.parse(req, function(err, fields, files) {
  // ...
});
 
form.onPart(part);
```
如果您希望直接访问多部分流，则可以覆盖此方法。这样做将禁用否则将发生的任何“字段”/“文件”事件处理，使您完全负责处理该处理。

```js
form.onPart = function(part) {
  part.addListener('data', function() {
    // ...
  });
}
```

如果你想使用强大的只为你处理某些部分，你可以这样做：

```js
form.onPart = function(part) {
  if (!part.filename) {
    // let formidable handle all non-file parts
    form.handlePart(part);
  }
}
```
检查此方法中的代码以获得进一步的启发。

#### Formidable.File
```js
file.size = 0
```
the size of the上传文件的字节。如果上传的文件仍然存在（见“filebegin事件的性质），这是说这么多字节的文件已经老化。

```js
file.path = null
```

正在写入此文件的路径。您可以在“filebegin”事件中对此进行修改，以防不满意可怕的文件生成临时路径的方式。
```js
file.name = null
```
根据上载客户端，此文件的名称。

```js
file.type = null
```
包含此文件上次写入时间的日期对象（或空值）。主要是为了与W3C文件API草稿兼容。
```js
file.hash = null
```
如果设置了哈希计算，则可以从该变量中读取十六进制摘要。


#### Formidable.File#toJSON()
此方法返回文件的JSON表示，允许您使用json.stringify（）文件，该文件可用于记录和响应请求。

### 事件
#### progress

在解析了每个传入数据块之后发出。可用于滚动您自己的进度条。
```js
form.on('progress', function(bytesReceived, bytesExpected) {
});
```
#### field

每当接收到字段/值对时发出。
```js
form.on('field', function(name, value) {
});
```

#### fileBegin
每当在上载流中检测到新文件时发出。如果要在文件系统上缓冲上载时将文件传输到其他地方，请使用此事件。

```js
form.on('fileBegin', function(name, file) {
});
```
#### file
每当接收到field/file对时发出。file是file的实例。

```js
form.on('file', function(name, file) {
});
```

#### error
处理传入表单时出错时发出。遇到错误的请求将自动暂停，如果您希望请求继续触发“数据”事件，则必须手动调用`request.resume（）`。
```js
form.on('error', function(err) {
});
```

#### aborted
在用户中止请求时发出。现在，这可能是由于套接字上的“超时”或“关闭”事件造成的。此事件发出后，将发生错误事件。将来会有一个单独的“超时”事件（需要在节点核心中进行更改）。
```js
form.on('aborted', function() {
});
```

#### end

```js
form.on('end', function() {
});
```
在接收到整个请求并且所有包含的文件都已完成刷新到磁盘时发出。这是一个很好的地方，您可以发送您的回复。


### 解析
其中当服务端全部接收完客户端用post方式提交的表单数据之后，触发执行该回调函数。以post方式提交的表单域数据都放在fields这个对象当中，以post方式上传的文件、图片等文件域数据都放在files这个对象当中。

## bug
1. 
```
(node:1401) UnhandledPromiseRejectionWarning: MongoError: insertDocument :: caused by :: 11000 E11000 duplicate key error index: xalert.groups.$username_1  dup key: { : null }
```
解决
```
> db.groups.getIndexes()
[
	{
		"v" : 1,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "xalert.groups"
	},
	{
		"v" : 1,
		"unique" : true,
		"key" : {
			"username" : 1
		},
		"name" : "username_1",
		"ns" : "xalert.groups",
		"background" : true
	}
]

> db.groups.dropIndex({'username':1})
{ "nIndexesWas" : 2, "ok" : 1 }
> db.groups.dropIndex({'username':1})
{
	"nIndexesWas" : 1,
	"ok" : 0,
	"errmsg" : "can't find index with key:{ username: 1.0 }"
}
> db.groups.getIndexes()
[
	{
		"v" : 1,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "xalert.groups"
	}
]

```
1. 
```
(node:30940) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
```

方法1:default引发的问题

方法2:mongoose.set('useCreateIndex', true);

## 参考文献

[formidable处理提交的表单或图片文件的简单介绍](https://segmentfault.com/a/1190000011424511#articleHeader1)

['E11000 duplicate key error collection: moviesProject.users index: username_1 dup key: { : null }](https://blog.csdn.net/colin_zff/article/details/77870191)
