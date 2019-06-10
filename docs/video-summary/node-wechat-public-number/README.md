# [7天搞定Node.js微信公众号开发](https://coding.imooc.com/class/38.html#Anchor)
## 第一章 前期准备
- ngrok 内网穿透 内网地址——外网可以访问
- localtunnel
- pagekite

### 配置接入微信公众号
先用微信公众号测试账号来进行开发工作。
![avatar](../public/public-wechat1.jpg)
appID
系统分配的唯一串，在请求url中作为参数，校验请求是否来自微信服务器


appsecret
系统分配的唯一串，在请求url中作为参数，校验请求是否来自微信服务器


URL
上文说过的工具生成的虚拟URL，公网能够访问


Token
我们自己填写的任意字符串，用于本地服务器校验请求是否来自微信服务器


### 用代码实现加密认证逻辑
![avatar](../public/public-wechat2.jpg)

步骤:
1. 获取到token、timestamp和nonce进行字典排序后进行拼接
2. 然后进行加密
3. 与signature进行比对
4. 一致则返回echostr

> 本机服务器接收到参数，根据约定校验参数后，返回消息给微信服务器。微信服务器接收到消息之后，确认和本地服务器建立了关系，页面显示“配置成功”，本地服务器的校验


```javascript
'use strict'

var Koa = require('koa')
var sha1 = require('sha1')
var config = {
    wechat: {
        appID: 'wx8933c10f9e79a2ac',
        appSecret: '018dfccdb771b4a0ffb1d349d4040379',
        token: 'myfristpublicwechat'
    }
}
var app = new Koa()
app.use(function* (next) {
    console.log(this.query)
    var token = config.wechat.token
    var timestamp = this.query.timestamp
    var nonce = this.query.nonce

    var signature = this.query.signature
    var echostr = this.query.echostr
    var str = [token, timestamp, nonce].sort().join('')
    var sha = sha1(str)
    console.log(sha)
    if (sha === signature) {
        this.body = echostr + ''
    } else {
        this.body = 'wrong'
    }
})

app.listen(1414)
console.log('listening:1414')
```
## 第二章 实战入门

## 第三章 微信流程及技术串讲

## 第四章 实战进阶

## 第五章 实战互动

## 第六章 实战电影公众号

## 第七章 公众号提供网站访问

## 参考文献
[微信公众号平台测试账号接入流程](https://www.jianshu.com/p/294de9d4bd3f)