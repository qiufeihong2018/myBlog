# bug


## 1. Uncaught (in promise) DOMException: Failed to execute 'open' on 'XMLHttpRequest': Invalid URL

解决方案：url前面一定要加http://

## 2. [
    {
        "_id": "5d80b45533495b71f34654a3",
        "state": "pending",
        "startTime": "2019-09-17T10:23:40.011Z",
        "endTime": "2019-09-17T10:24:21.378Z",
        "createdAt": "2019-09-17T10:24:21.388Z",
        "updatedAt": "2019-09-17T10:24:21.388Z",
        "__v": 0
    },
    {
        "_id": "5d80b4aff6ebaf7270027fba",
        "state": "on",
        "startTime": "2019-09-17T10:24:21.383Z",
        "endTime": "2019-09-17T10:25:51.536Z",
        "difTime": 357,
        "createdAt": "2019-09-17T10:25:51.545Z",
        "updatedAt": "2019-09-17T10:25:51.545Z",
        "__v": 0
    }
]

在这其中判断difTime是否存在，

但是结果却是找不到这里面的所有属性


```js
   for (let i = 0; i < doc.length; i++) {
      console.log(doc[i])
      // { _id: 5d82ecce066954630808cb40,
      //   state: 'off',
      //   startTime: 2019-09-18T06:39:30.836Z,
      //   endTime: 2019-09-19T05:55:51.666Z,
      //   difTime: 83780830,
      //   createdAt: 2019-09-19T02:49:50.546Z,
      //   updatedAt: 2019-09-19T05:55:51.667Z,
      //   __v: 0,
      //   count: null }
      console.log(Object.keys(doc[i]))
      // [ '$__', 'isNew', 'errors', '_doc', '$locals', '$init' ]
      if (doc[i].difTime !== undefined) {
        const docDifTime = doc[i].difTime;
        if (doc[i].state === 'off') {
          time.offTime += docDifTime;
        }
        if (doc[i].state === 'on') {
          time.onTime += docDifTime;
        }
        if (doc[i].state === 'pending') {
          time.pendingTime += docDifTime;
        }
      }
    }
```
解决的方案是判断该属性不为undefined

## 3. ## HTTP错误413解释：请求实体太大

src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA..."

Status Code: 413 Request Entity Too Large

> mdn
> 响应状态码 413 Payload Too Large 表示请求主体的大小超过了服务器愿意或有能力处理的限度，服务器可能会（may）关闭连接以防止客户端继续发送该请求。
> 如果“超出限度”是暂时性的，服务器应该返回  Retry-After 首部字段，说明这是暂时性的，以及客户端可以在什么时间（after what time）后重试。



https://www.cnblogs.com/felixzh/p/6283822.html


vue使用html2canvas踩坑总结
需求场景
运营后台上传一张图，同时页面生成小程序二维码，与运营上传的图合成一张大图，用于该页面在朋友圈的分享传播。

https://juejin.im/post/5d60180af265da039b24a30d#heading-2


最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)



<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>
