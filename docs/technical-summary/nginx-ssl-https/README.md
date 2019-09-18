# nginx配置ssl证书，从HTTP升级到HTTPS

## 什么是 [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)
> 超文本传输​​协议（HTTP）是用于传输诸如HTML的超媒体文档的应用层协议。
> 
> 它被设计用于Web浏览器和Web服务器之间的通信，但它也可以用于其他目的。 HTTP遵循经典的客户端-服务端模型，客户端打开一个连接以发出请求，然后等待它收到服务器端响应。 HTTP是无状态协议，意味着服务器不会在两个请求之间保留任何数据（状态）。该协议虽然通常基于TCP / IP层，但可以在任何可靠的传输层上使用；也就是说，一个不会像UDP协议那样静默丢失消息的协议。RUDP作为UDP的可靠的升级版本，是一种合适的替代选择。

## 什么是 [HTTPS](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%AE%89%E5%85%A8%E5%8D%8F%E8%AE%AE)
> 超文本传输安全协议（HyperText Transfer Protocol Secure，缩写：HTTPS；常称为HTTP over TLS、HTTP over SSL或HTTP Secure）是一种通过计算机网络进行安全通信的传输协议。
> 
> HTTPS经由HTTP进行通信，但利用SSL/TLS来加密数据包。HTTPS开发的主要目的，是提供对网站服务器的身份认证，保护交换数据的隐私与完整性。这个协议由网景公司（Netscape）在1994年首次提出，随后扩展到互联网上。
> 
> 历史上，HTTPS连接经常用于万维网上的交易支付和企业信息系统中敏感信息的传输。在2000年代末至2010年代初，HTTPS开始广泛使用，以确保各类型的网页真实，保护账户和保持用户通信，身份和网络浏览的私密性。
> 
> 另外，还有一种安全超文本传输协议（S-HTTP）的HTTP安全传输实现，但是HTTPS的广泛应用而成为事实上的HTTP安全传输实现，S-HTTP并没有得到广泛支持。

### HTTPS的作用
HTTPS的主要作用是在不安全的网络上创建一个安全信道，并可在使用适当的加密包和服务器证书可被验证且可被信任时，对窃听和中间人攻击提供合理的防护。

HTTPS的信任基于预先安装在操作系统中的证书颁发机构（CA）。因此，到一个网站的HTTPS连接仅在这些情况下可被信任：
1. 浏览器正确地实现了HTTPS且操作系统中安装了正确且受信任的证书颁发机构；
2. 证书颁发机构仅信任合法的网站；
3. 被访问的网站提供了一个有效的证书，也就是说它是一个由操作系统信任的证书颁发机构签发的（大部分浏览器会对无效的证书发出警告）；
4. 该证书正确地验证了被访问的网站（例如，访问https://example.com时收到了签发给example.com而不是其它域名的证书）；
5. 此协议的加密层（SSL/TLS）能够有效地提供认证和高强度的加密。
   
## HTTPS和HTTP的区别
超文本传输协议HTTP协议被用于在Web浏览器和网站服务器之间传递信息。HTTP协议以明文方式发送内容，不提供任何方式的数据加密，如果攻击者截取了Web浏览器和网站服务器之间的传输报文，就可以直接读懂其中的信息，因此HTTP协议不适合传输一些敏感信息，比如信用卡号、密码等。
为了解决HTTP协议的这一缺陷，需要使用另一种协议：安全套接字层超文本传输协议HTTPS。为了数据传输的安全，HTTPS在HTTP的基础上加入了SSL协议，SSL依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密。
HTTPS和HTTP的区别主要为以下四点：
1. https协议需要到ca申请证书，一般免费证书很少，需要交费。
2. http是超文本传输协议，信息是明文传输，https 则是具有安全性的ssl加密传输协议。
3. http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
4. http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

## HTTP连接是如何建立的
HTTP 在传输层之上，是依靠于 TCP 连接的。也就是说先建立起 TCP 连接，建立好连接之后双方之间才能传输数据。也就是说，想按照规定的格式传输数据，就需要先建立 TCP 连接。那 TCP 连接是怎么建立起来的呢。

TCP 连接的三次握手：

1. 向对方发送一个建立连接的请求。我们在浏览器上输入了要访问的网站地址之后，浏览器会向 DNS 服务器请求这个域名对应的 IP 地址，拿到 IP 地址就相当于知道了对方的位置。我们就可以向他发送一个建立连接的请求，同时自己也做好了要建立连接的「准备」。

2. 回复客户端的请求。对方机器一直在等待着其他人跟自己建立连接，等啊等，突然收到了你要建立连接的请求，兴奋不已，立刻回复你，说：我收到了你要建立连接的请求啦，我也准备好要建立连接啦。

3. 你收到这个消息之后一定要回复它，说：好的，我知道你也做好了建立连接的准备啦，咱们开始发送数据吧。
   
为什么一定要回复他呢，因为他不确定你是否收到了他的确认请求，如果你不回复，他会以为你这个建立请求的消息是假的，是过期了的，就不会建立连接。当他收到你的回复之后，就明确的知道了你确实要建立连接，也知道了你准备好了连接的建立，再之后就可以按照 HTTP 的格式传输数据了。在这个过程中的第三步时，就是你发送确认消息的那个数据包中，可以将需要传输的数据一并塞进去的。在重复一次，你先发一个建立连接的请求，他接收后回复一个收到，建立吧，你收到他的回复，在向他回复一个知道啦。这时，你们之间 TCP 连接就已经建立好了。接下来，你就可以按照 HTTP 向他发送请求，比如说要某一个图片，他收到请求后就会给你发过来一个图片，当然，你们之间是明文传输的。
## HTTPS 连接是如何建立的

![avatar](../public/nginx-ssl-https9.jpg)

那 HTTPS 是如何建立连接的呢，怎么商量好加密密码的呢？HTTPS 同 HTTP 一样，首先建立起 TCP 连接，但是建立好之后并不是立即发出请求，索要具体的资源，而是先和对方商量加密的密码。商量的加密密码的过程就是建立 TSL 连接的过程。其实并没有建立真实的连接，只是在刚刚建立好的 TCP 连接上，包裹上一层加密协议而已。但是也被形象的称作连接建立。

具体建立方式如下：
1. 客服端发给服务器一个HELLO包，里面有我支持的加密协议列表。
2. 服务器收到后发送也给客户端发送一个HELLO数据包，数据包内包涵服务器挑选的加密算法，还包含自己的数字证书信息。你拿到他的数字证书信息之后就需要去向 CA 校验证书，校验成功后也知道了对方的公钥，就该通知服务器，我们以后对称加密的密码是多少，当然，这个密码是要用公钥加密的。在这条消息发送之前，客户端会先发送一条消息，告诉服务器，我下一个消息将使用你刚刚挑选的加密协议进行加密了，下一个消息是加密后的哦，不要搞错。
3. 之后将对称加密的密文发给服务器。服务器接收到之后，会根据对称密钥生成一系列复杂的加密算法，在传输给客服端，客户端收到后会给服务器发送一个 Finished Message ，服务器收到消息后也回一个 Finished Message。
4. 这时，我们终于完成了加密的准备工作，一切加密方式和密钥都商量好了，终于可以传输数据了。至此，TSL 建立连接的过程结束。

## 升级步骤
我的nginx版本是：`nginx version: nginx/1.10.3 (Ubuntu)`

我的nginx目录结构，[nginx安装](https://www.qiufeihong.top/technical-summary/nginx/)

```
feihong@iZuf69ng9hibpqjrdkb660Z:/etc/nginx$ ls 
cert          fastcgi_params  mime.types    scgi_params      snippets
conf.d        koi-utf         nginx.conf    sites-available  uwsgi_params
fastcgi.conf  koi-win         proxy_params  sites-enabled    win-utf
```

### 获取证书
我的服务器是阿里云的，那就从阿里云的云盾中获得SSL证书

![avatar](../public/nginx-ssl-https1.png)

点击购买证书

![avatar](../public/nginx-ssl-https2.png)

选择`免费型DV SSL`点击立即购买

![avatar](../public/nginx-ssl-https3.png)

返回控制台可以看见一个未签发的证书，申请签发

![avatar](../public/nginx-ssl-https6.png)

填写申请和验证信息（申请通过要等一会时间）

![avatar](../public/nginx-ssl-https7.png)

通过后，证书已签发

![avatar](../public/nginx-ssl-https4.png)

下载证书

![avatar](../public/nginx-ssl-https5.png)

两个证书分别是*.pem和*.key

打开两个证书后，发现里面都是密钥

*.key： 证书的私钥文件

```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAi1M5kieXbIDTCJwyWWif8g/JCEpwOv2m2nyHPa32j4GtQgAV
2Vc7osTG/rx2UFkmin2RWT8Lb13UQe3vKEvZi0HcXH1ef8MVymyR/M1H8+D9mQ5q
……
rtClNTkCgYB18MoPDYFFp8lcMFL4joIcmQTgRlZN7ZYwj0TEa+e2UemqkrxN8XyO
P5xniOvmacFt3SxoDLjQoVOmmS1B0QdXP24y+b1+vIfG8ZQ3grNU0Nq2PyXRe7TR
CaGaIY+5DXwoPjzPvfbWKIuMwthyAeyddW4XzO9/9c2Ugrr0s6AWkQ==
-----END RSA PRIVATE KEY-----
~                                          
```

*.pem：是证书文件

```
-----BEGIN CERTIFICATE-----
MIIFnTCCBIWgAwIBAgIQBLNEzXnEO46h+mG3ixM+AzANBgkqhkiG9w0BAQsFADBu
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
……
1/MtB1NyBlHxBrJQJVKxOLiS/4rzjV3UsQvOz5maM5gBzd3/NPIIU/gBIeK4vgSk
1w==
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIEqjCCA5KgAwIBAgIQAnmsRYvBskWr+YBTzSybsTANBgkqhkiG9w0BAQsFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
……
sNE2DpRVMnL8J6xBRdjmOsC3N6cQuKuRXbzByVBjCqAA8t1L0I+9wXJerLPyErjy
rMKWaBFLmfK/AHNF4ZihwPGOc7w6UHczBZXH5RFzJNnww+WnKuTPI0HfnVH8lg==

```
### 打开443端口
登录阿里云，找到安全组，添加规则，给443端口开放对外访问权限（不要像我是的，最后出现问题的根源就是这个）。

### 服务器中放置证书
在`/etc/nginx/cert/`中放置下载来的两个证书文件

### nginx.conf
从nginx.conf中我们可以发现其导入了`/etc/nginx/conf.d/*.conf`和`/etc/nginx/sites-enabled/*`

这说明需要在这两处将server写进去，当然分开最好，避免耦合

在`/etc/nginx/conf.d/`文件夹中的default.conf文件，就是写一些http的服务

在`/etc/nginx/sites-enabled/`的文件夹下写一些https的服务

```
user www-data;
worker_processes auto;
pid /run/nginx.pid;
events {
        worker_connections 768;
        # multi_accept on;
}
http {
        ##
        # Basic Settings
        ##

        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;
        # server_tokens off;

        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        ##
        # Logging Settings
        ##

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ##
        # Gzip Settings
        ##

        gzip on;
        gzip_disable "msie6";

        # gzip_vary on;
        # gzip_proxied any;
        # gzip_comp_level 6;
        # gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        ##
        # Virtual Host Configs
        ##

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}
```

### sites-available

在sites-available中添加qiufeihong.top文件

ssl_certificate和ssl_certificate_key将两个证书文件导入

前者服务是https

后者是http，重定向会https

```

server {
listen 443 ssl;
server_name www.qiufeihong.top;
ssl on;
ssl_certificate /etc/nginx/cert/2476067_www.qiufeihong.top.pem;
ssl_certificate_key /etc/nginx/cert/2476067_www.qiufeihong.top.key;
ssl_session_timeout 10m;
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
location / {
        proxy_pass http://127.0.0.1:7777;
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_headers_hash_max_size 51200;
        proxy_headers_hash_bucket_size 6400;
}
}
server {
listen 80;
server_name www.qiufeihong.top;
rewrite ^(.*)$ https://$host$1 permanent;
}
```

并且，需要将`conf.d`文件夹中的`default.conf`中的关于博客的配置的代码将其删除，否则nginx重启配置时，会报两个同名服务的错误。

```
server
        {
                listen  80;
                server_name www.qiufeihong.top;
                location / {
                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_pass http://127.0.0.1:7777;
                }

        }
```

### sites-enabled
建立软链接

```
sudo ln sites-available/qiufeihong.top sites-enabled/qiufeihong.top

```

在sites-enabled中就能看到qiufeihong.top

### 重启nginx

```
 sudo nginx -t

 sudo nginx -s reload
```

登录网站出现了一把关闭的锁

![avatar](../public/nginx-ssl-https8.png)


## 百度地图与https
百度地图JavaScript API是一套由JavaScript语言编写的应用程序接口，可帮助您在网站中构建功能丰富、交互性强的地图应用，支持PC端和移动端基于浏览器的地图应用开发，且支持HTML5特性的地图开发。
百度地图JavaScript API支持HTTP和HTTPS，免费对外开放，可直接使用。接口使用无次数限制。在使用前，您需先[申请密钥（ak）](http://lbsyun.baidu.com/apiconsole/key?application=key)才可使用。

由于之前请求的协议是http

原来是：
```
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=密钥"></script>

```

但是请求是失败的，是没有地图的。

![avatar](../public/map1.png)

那么百度地图的 JavaScript API 是否支持 HTTPS 请求呢?
答案是当然的。

### 官网

> JavaScript API V2.0 及以上版本支持HTTPS。
> 
> 如果想使用HTTPS协议调用JavaScript API，直接将脚本引用的协议修改为HTTPS即可。

```js
<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
<script type="text/javascript" src="https://api.map.baidu.com/api?v=3.0&ak=您的密钥"></script>
```

请求正常，地图也出现了。

![avatar](../public/map.png)

## 参考文献

[nginx配置ssl证书实现https访问](https://www.cnblogs.com/tianhei/p/7726505.html)

[SSL证书安装指南](https://help.aliyun.com/knowledge_detail/95505.html?spm=a2c4g.11186623.4.1.2d804c07MPmVlx)

[Nginx/Tengine服务器安装SSL证书](https://help.aliyun.com/knowledge_detail/95491.html?spm=a2c4g.11186623.2.9.7ec54c07AwpYzL)

[HTTP 升级到 HTTPS 基础知识详解](https://blog.csdn.net/b5694708/article/details/78445027)

[阿里云服务器nginx配置ssl证书,给网站添加https](https://www.jianshu.com/p/6466fec695d2)

---

1. 欢迎大家进群,参与讨论
2. 一起进步,是我们的准则,我们是前端的一道美丽风景线
3. 请加我的vx：qiufeihong0203,拉你进群

---

1. 欢迎关注feihong的[掘金账号](https://juejin.im/user/5bf4d63cf265da61561ee241)。

2. [原文地址](https://github.com/qiufeihong2018/vuepress-blog/tree/master/docs/technical-summary/apiDoc)。


---
## 版权声明

转载时请注明作者 qiufeihong 以及本文地址：[https://www.qiufeihong.top/technical-summary/nginx-ssl-https/](https://www.qiufeihong.top/technical-summary/nginx-ssl-https/)



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>