## 毕业设计相关操作
[[toc]]

### 在阿里云的Ubuntu ECS instance 使用Apt-get安装git
>在阿里云的Ubuntu ECS instance 使用Apt-get安装git
 高级包装工具（英语：Advanced Packaging Tools,简称：APT）是Debian及其衍生发行版（如：ubuntu）的软件包管理器。APT可以自动下载，配置，安装二进制或者源代码格式的软 件包，因此简化了 Unix系统上管理软件的过程,apt-get命令一般需要root权限执行，所以一般跟着sudo命令。
 在阿里的云服务器上想要安装git，先运行apt-get update去更新镜像，然后使用apt-get install git去安装git.
 
 ### Windows 强制删除文件及文件夹命令
 Windows 强制删除文件及文件夹命令
  1. 删除文件或目录CMD命令：
  rd/s/q 盘符:\某个文件夹  （强制删除文件文件夹和文件夹内所有文件）
  del/f/s/q 盘符:\文件名  （强制删除文件，文件名必须加文件后缀名）
  
  2. 删除文件或目录BAT命令：
  1、新建.BAT批处理文件输入如下命令，然后将要删除的文件拖放到批处理文件图标上即可删除。
  DEL /F /A /Q 
  RD /S /Q 
  
  3. 强制删除工具软件推荐：
  1、绿鹰文件解锁删除器FileSuperDelete
  2、PowerTool.exe
  3、Unlocker 1.8.7
  
  
### package.json中千万别注释
  package.json中千万别注释
  否则会出现fail
  
  
### 别轻易npm audit fix
```js
  npm ERR! file D:\githubMe\vue-element-admin-tack-out\package
  .json  npm ERR! code EJSONPARSE  npm ERR! JSON.parse Failed to parse json  npm ERR! JSON.parse Unexpected token / in JSON at position 1
  065 while parsing near '...tor": "^2.2.1",  npm ERR! JSON.parse     //    编辑器  npm ERR! JSON.parse     "vue-s...'  npm ERR! JSON.parse Failed to parse package.json data.
  npm ERR! JSON.parse package.json must be actual JSON, not just JavaScript.
    npm ERR! A complete log of this run can be found in:  npm ERR!     D:\node\node_cache\_logs\2019-01-24T15_28_31_317Z-debug.log
```
 
  [解决](https://stackoverflow.com/questions/31454607/npm-failed-to-parse-json)：
  ```js
In Laravel project:
  Delete 'node_modules' folder;
  npm cache clean（清下npm缓存）
  npm update
```
  
### stylus的import报错
  错误:
  ```js 
  @import "~common/stylus/mixin"
         @import "~common/stylus/variable"
         @import "~common/stylus/sidebar"
         
          ERROR  Failed to compile with 1 errors                                    11:41:03 AM
         
          error  in ./src/layouts/layout/Layout.vue
         
         Module build failed: Error: /home/devue/myItem/vue-element-template/src/layouts/layout/Layout.vue:49:9
            45| }
            46| </script>
            47| 
            48| <style rel="stylesheet/scss" lang="stylus" scoped>
            49|   @import "~common/stylus/mixin"
         ---------------^
            50|   @import "~common/stylus/variable"
            51|   @import "~common/stylus/sidebar"
            52|   .app-wrapper
         
         failed to locate @import file ~common/stylus/mixin.styl
         
             at CachedPathEvaluator.visitImport (/home/devue/myItem/vue-element-template/node_modules/stylus-loader/lib/evaluator.js:157:21)
             at CachedPathEvaluator.Visitor.visit (/home/devue/myItem/vue-element-template/node_modules/stylus/lib/visitor/index.js:28:40)
             at CachedPathEvaluator.Evaluator.visit (/home/devue/myItem/vue-element-template/node_modules/stylus/lib/visitor/evaluator.js:160:18)
             at CachedPathEvaluator.Evaluator.visitRoot (/home/devue/myItem/vue-element-template/node_modules/stylus/lib/visitor/evaluator.js:707:27)
             at CachedPathEvaluator.Visitor.visit (/home/devue/myItem/vue-element-template/node_modules/stylus/lib/visitor/index.js:28:40)
             at CachedPathEvaluator.Evaluator.visit (/home/devue/myItem/vue-element-template/node_modules/stylus/lib/visitor/evaluator.js:160:18)
             at CachedPathEvaluator.Evaluator.evaluate (/home/devue/myItem/vue-element-template/node_modules/stylus/lib/visitor/evaluator.js:247:15)
             at Renderer.render (/home/devue/myItem/vue-element-template/node_modules/stylus/lib/renderer.js:86:26)
             at /home/devue/myItem/vue-element-template/node_modules/stylus-loader/index.js:167:12
             at tryCatchReject (/home/devue/myItem/vue-element-template/node_modules/when/lib/makePromise.js:840:30)
             at runContinuation1 (/home/devue/myItem/vue-element-template/node_modules/when/lib/makePromise.js:799:4)
             at Fulfilled.when (/home/devue/myItem/vue-element-template/node_modules/when/lib/makePromise.js:590:4)
             at Pending.run (/home/devue/myItem/vue-element-template/node_modules/when/lib/makePromise.js:481:13)
             at Scheduler._drain (/home/devue/myItem/vue-element-template/node_modules/when/lib/Scheduler.js:62:19)
             at Scheduler.drain (/home/devue/myItem/vue-element-template/node_modules/when/lib/Scheduler.js:27:9)
             at process.internalTickCallback (internal/process/next_tick.js:70:11)
         
          @ ./node_modules/vue-style-loader!./node_modules/css-loader?{"sourceMap":true}!./node_modules/vue-loader/lib/style-compiler?{"vue":true,"id":"data-v-41ada640","scoped":true,"hasInlineConfig":false}!./node_modules/stylus-loader?{"sourceMap":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/layouts/layout/Layout.vue 4:14-382 13:3-17:5 14:22-390
          @ ./src/layouts/layout/Layout.vue
          @ ./src/router/index.js
          @ ./src/main.js
          @ multi (webpack)-dev-server/client?http://localhost:7777 webpack/hot/dev-server ./src/main.js
```
 正确:地址错误
 ```js
          @import "../../common/stylus/mixin"
          @import "../../common/stylus/variable"
          @import "../../common/stylus/sidebar"
 ```   
