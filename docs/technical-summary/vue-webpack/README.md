## axios中data和param
[[toc]]

data：加在下面
传递相关配置来创建请求
 // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },


param是加在api后面
  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  }
  
  
  
## BASE_API的location
 生产环境是在
 
 ![avatar](../public/dev.png)
 
 他是在
 
 ![avatar](../public/webpack.png)
 
 中的
 
 ![avatar](../public/plugin.png)
 
 导入的.




最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)



<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>