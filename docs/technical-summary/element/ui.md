#  从Element-ui源码聊搭建UI库
## 目录
### 一、	背景	3
#### 什么是组件库？	3
#### 为什么需要组件库？	3
### 二、	目录结构	4
### 三、	packages目录分析	6
### 四、	package.json	8
### 五、	scripts脚本命令解析	9
#### bootstrap	9
#### build:file	9
##### node build/bin/iconInit.js	10
##### node build/bin/build-entry.js	12
##### node build/bin/i18n.js	15
##### node build/bin/version.js	18
#### build:theme	20
##### node build/bin/gen-cssfile	20
##### gulp build --gulpfile packages/theme-chalk/gulpfile.js	21
##### cp-cli packages/theme-chalk/lib lib/theme-chalk	24
#### build:utils	25
#### build:umd	26
#### clean	28
#### deploy:build	28
##### cross-env NODE_ENV=production webpack --config build/webpack.demo.js	28
#### deploy:extension	33
#### dev:extension	33
#### dev	33
#### dev:play	34
#### dist	35
##### webpack --config build/webpack.conf.js	35
##### webpack --config build/webpack.common.js	38
##### webpack --config build/webpack.component.js	38
#### lint	39
#### pub	39
#### test	43
### 六、	makefile	43
#### make new	45
#### make new-lang	51
### 七、	其他工程化脚本	52
#### md-loader	52
#### config.js	54

