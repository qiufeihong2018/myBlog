# Node.js入门到企业Web开发中的应用

## Node.js入门到企业Web开发中的应用

[客户端](http://note.youdao.com/noteshare?id=9ad5f7dff48e47a5e361fd0ddeaca813&sub=WEB93f1ca0a6a458295d6384f6a8685ab37)

### 客户端


```javascript
const http=require('http');
let reqData=''
http.request({
    'host':'192.168.3.72',
    'port':'3000',
    'method':'get'
},function(res){
    res.on('data',function(chunk){
        reqData+=chunk;
    });
    res.on('end',function(){
        console.log(reqData);
        
    })
}).end();
```
先把服务器启动，然后再启动客户端，客户端通过get请求服务器数据。
```javascript

const http=require('http');
let reqData=''
http.get({
    'host':'192.168.3.72',
    'port':'3000'
},function(res){
    res.on('data',function(chunck){
        reqData+=chunck
    });
    res.on('end',function(){
        console.log(reqData)
    })
}).end();
```
tip：响应的操作都是在get请求中的。


```javascript

const http = require('http');
let reqData = '';
let option = {
    'host': '192.168.3.72',
    'port': '6000'
}
const req = http.request(option);
req.on('response', function (res) {
    res.on('data', function (chunk) {
        reqData += chunk;
    });
    res.on('end', function () {
        console.log(reqData)
    });
});
```

两个特性：
非阻塞io

事件驱动

高并发应对之道
1、增加机器数
2、增加每台机器的cpu数——多核

nodejs单线程
1、单线程只是针对主进程，io操作系统底层多线程调度
2、单线程并不是单进程


常用场景
1、web server
2、本地代码构建
3、实用工具开发

commonjs规范：nodejs模块管理规范
1、每个文件是一个模块，有自己的作用域
2、在模块内部module变量代表模块本身
3、module.exports属性代表模块对外接口

require规则，通过规则加载其他文件和函数
1、/表示绝对路径，./表示相对路径
2、支持js.json.node扩展名，不写依次尝试
3、其他文件找不到，就找node_modules内的第三方模块。


特性：1、一次使用就被缓存。
2、只显示已经执行的部分。 

fs操作二进制流的
data.tostring()将十六进制的代码转化为字符串。

chalk模块api
一个依赖会依赖另一个依赖
新版的npm将依赖层级磨平，都放在node_modules文件夹中了。

exports就是modules.exports的快捷方式，可以改变对象和属性，但是不能改变指向

global，可以暴露全局变量
作用域

process：
 argv
argv0
execArgv
execPath
env
cwd
timer

执行时间顺序由快到慢
nextTick--setTimeout--setImmediate

buffer处理二进制流

[nodejs服务器端](http://note.youdao.com/noteshare?id=ee9809fb308e7554cc159ffb632a99d0&sub=WEB2b22c2f46386a7f8740fdbe4b0f77084)

### nodejs服务器端
```javascript

const http = require('http');
const server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'content-type': 'text/plain'
    });
    res.end('hello node.js');

});
server.listen(3000, function () {
    console.log('listening port 3000')
})
或者
const http = require('http');
const server=new http.Server();
server.on('request',function (req, res) {
    res.writeHead(200, {
        'content-type': 'text/plain'
    });
    res.end('hello node.js');

});
server.listen(3000, function () {
    console.log('listening port 3000')
})

```
```javascript

const http = require('http');
const server = http.createServer(function (req, res) {
    let data = '';
    req.on('data', function (chunk) {
        data += chunk;

    });
    req.on('end', function () {
        let method = req.method;
        // headers是对象，需要转成字符才能打印出来
        let headers = JSON.stringify(req.headers);
        let url = req.url;
        let httpVersion = req.httpVersion;
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        let dataHtml = '<p>data:' + data + '</p>'
        let methodHtml = '<p>method:' + method + '</p>'
        let headersHtml = '<p>headers:' + headers + '</p>'
        let urlHtml = '<p>url:' + url + '</p>'
        let resData = dataHtml + methodHtml + headersHtml + urlHtml + httpVersionHtml
        res.end(resData)
    })

})
server.listen(3000, function () {
    console.log('listening port 3000')
})


```
## 单元测试&UI测试
### 单元测试mocha 断言
chai
### 单元测试mocha mocha
### 测试 覆盖率istanbul
### 持续集成
### benchmark

## 参考文献
