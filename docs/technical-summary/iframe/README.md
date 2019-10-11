# iframe跨域问题
 [[toc]]
## iframe跨域问题
问题一：`Refused to display 'http://codepen.io/' in a frame because it set 'X-Frame-Options' to 'sameorigin'.`

又或者是

问题二：`Refused to display 'https://github.com/' in a frame because an ancestor violates the following Content Security Policy directive: "frame-ancestors 'none'".`

这是在Navigation网站收藏和导航平台中看到的跨域问题。

### X-Frame-Options
The X-Frame-Options HTTP 响应头是用来给浏览器 指示允许一个页面 可否在 `<frame>`,` <iframe>`, `<embed> `或者 `<object> `中展现的标记。站点可以通过确保网站没有被嵌入到别人的站点里面，从而避免劫持攻击。
`X-Frame-Options`有三个可能的值：
```
X-Frame-Options: deny
X-Frame-Options: sameorigin
X-Frame-Options: allow-from https://example.com/
```
#### 指南

换一句话说，如果设置为 `deny`，不光在别人的网站 `frame` 嵌入时会无法加载，在同域名页面中同样会无法加载。另一方面，如果设置为`sameorigin`，那么页面就可以在同域名页面的 `frame` 中嵌套。

##### deny
表示该页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。
##### sameorigin
表示该页面可以在相同域名页面的 frame 中展示。
##### allow-from uri
表示该页面可以在指定来源的 frame 中展示。

不指定X-Frame-Options的网页等同表示它可以放在任何iFrame内。

X-Frame-Options可以保障你的网页不会被放在恶意网站设定的iFrame内，令用户成为点击劫持的受害人。

另外查了最新的资料，还可以直接通过meta标签来设置，不需要放在http头部请求中了。
```html
<meta http-equiv="X-Frame-Options" content="deny">
```
第一个问题可以通过express服务器给返回头设置`X-Frame-Options`为`SAMEORIGIN`
```js
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
```

### frame-ancestors
HTTP头部 Content-Security-Policy (CSP) 中的frame-ancestors 指令指定了一个可以包含`<frame>`，`<iframe>`，`<object>`，`<embed>`，或者`<applet>`等元素的有效父级。

当该指令设置为'none'时，其作用类似于`X-Frame-Options: DENY` （该头部被一些老版本浏览器所支持）。
#### 指南
frame-ancestors策略可以设置一个或多个源<source>：
```
Content-Security-Policy: frame-ancestors <source>;
Content-Security-Policy: frame-ancestors <source> <source>;
```

第一个问题可以通过express服务器给返回头设置`X-Frame-Options`为`SAMEORIGIN`

```js
    res.setHeader('Content-Security-Policy', "frame-ancestors 'self' http://192.168.1.123:1600");
```
或是
```js
    res.setHeader('Content-Security-Policy', "frame-ancestors http://192.168.1.123:1600");
```
又或者在前端设置
```
    <meta http-equiv="Content-Security-Policy"content="frame-ancestors http://192.168.1.123:1600">
```

问题还是存在

## 展望
还有，这个项目小编会长期来维护，希望大家能踊跃提pr，提issue，将这个项目打造的更加完美，能够帮助到更多的人学习到vue除了官方demo之外的实际应用，避开更多的坑。

最后，别忘了给这个项目点一个star哦，谢谢支持。

[navigation-web前端代码仓库](https://github.com/qiufeihong2018/navigation-web)

[navigation-server后端代码仓库](https://github.com/qiufeihong2018/navigation-server)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>