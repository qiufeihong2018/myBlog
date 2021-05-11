# vue-cli3实战技巧
## 包管理工具
npm包为什么要用"@"开头？
唯一性，避免发布不了，与现有包名称重复
vue cli 的插件有哪些？

![avatar](./1.png)
## 编码技巧与规范
1. 使用对象代替if及switch
2. 使用Array.from快速生成数组
3. 使用router.beforeEach来处理跳转前逻辑
4. 使用v-if来优化页面加载
5. 路由跳转尽量用name而不是path
6. 使用key来优化v-for循环
7. 使用computed代替watch
8. 统一管理缓存变量
9. 使用setTimeout代替setInterval
10. 不要使用for...in来遍历数组