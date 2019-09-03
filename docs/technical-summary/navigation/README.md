# Navigation网站收藏和导航平台

![avatar](http://images.qiufeihong.top/login.png)


## 实现功能

### [网站CRUD](http://images.qiufeihong.top/nAdd.webm)

### [搜索](http://images.qiufeihong.top/nSearch.webm)

### [登录登出](http://images.qiufeihong.top/nLogin.webm)



## 网站截图
### 网站导航块瀑布流

![网站导航块瀑布流](http://images.qiufeihong.top/n.png)

### 网站嵌套iframe和搜索

![网站嵌套iframe](http://images.qiufeihong.top/n2.png)

### 网站提交

![网站提交](http://images.qiufeihong.top/n3.png)

## 在线Demo

[预览](http://navigation.qiufeihong.top)

## 简单的实现思路

![avatar](http://images.qiufeihong.top/navigation1.png)

## 前端

[github前端代码仓库](https://github.com/qiufeihong2018/navigation-web)

是基于花裤衩的[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)的简单版的后台管理模板，这一款基于vue2.0的后台管理平台深受大众喜爱。

### vue-admin-template集成的依赖包

#### [Vuex](https://github.com/vuejs/vuex)存储状态

Vuex是一个专为Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化.

自动从modules文件夹中导入文件

推荐一本老姚的正则手册[《JavaScript正则表达式迷你书（1.1版）.pdf》](http://images.qiufeihong.top/JavaScript%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E8%BF%B7%E4%BD%A0%E4%B9%A6%EF%BC%881.1%E7%89%88%EF%BC%89.pdf)

#####  ^（脱字符）匹配开头，在多行匹配中匹配行开头。

##### $(美元符号)匹配结尾,在多行匹配中匹配行结尾。

##### ^、$、.、*、+、?、|、\、/、(、)、[、]、{、}、=、!、:、- ,
当匹配上面的字符本身时，可以一律转义：

##### \w 表示 [0-9a-zA-Z_]。表示数字、大小写字母和下划线。
记忆方式：w 是 word 的简写，也称单词字符。
##### +等价于 {1,}，表示出现至少一次。
记忆方式：加号是追加的意思，得先有一个，然后才考虑追加。
##### [require.context](https://webpack.js.org/guides/dependency-management/)
根据正则（在modules文件夹中找到结尾是js的文件）匹配所有的文件

##### replace一个新的字符串


```js

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})
```


#### [axios](https://github.com/axios/axios)进行前后端数据通信

支持http数据通信。Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

尤大推荐用axios，让Axios进入了很多人的目光中。Axios本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范

他的特性之客户端支持防止CSRF，每个请求都带一个从cookie中拿到的key, 根据浏览器同源策略，假冒的网站是拿不到cookie中的key，这样，后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略。

在其封装axios对象的request文件中，response响应中去掉了自定义状态码的设置。

登录完成后，将用户的token通过cookie存在本地，然后在页面跳转前拦截读取token，如果token存在则说明已经登录过，刷新vuex中的token状态。每次发送请求时都会携带token。后端会通过携带的token判断是否登录或过期。

```js
import axios from 'axios'
import {
  Message
} from 'element-ui'
// production
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (process.env.NODE_ENV === 'production' && store.getters.token) {
      // do something before request is sent
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service


```

#### [element-ui](https://github.com/ElemeFE/element)快速搭建后台

饿了吗的web平台UI库

Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库

在main.js中全局导入element-ui
```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// set ElementUI lang to EN
Vue.use(ElementUI, {
  zhLocale
})
```

##### Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

```html
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
```

##### 抽屉组件弹出搜索信息
搜索栏通过改变vuex中的`openDrawer`状态来控制底层抽屉组件。在弹出的抽屉中可以通过关键词搜索mongo数据库中的导航网站的title和描述，点击iframe和外链查看收藏的网站。
```html
   <el-drawer title="搜索网站" :visible.sync="openDrawer" :before-close="closeDrawer" direction="btt" size="50%">
      <div class="search-container">
        <el-input slot="prepend" v-model="queryData.query" placeholder="请输入，例如：ppt" @keyup.enter.native="getSuperSearch">
          <el-button slot="append" icon="el-icon-search" @click.stop="getSuperSearch" />
        </el-input>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row>
        <el-table-column type="index" />
        <el-table-column prop="name" label="名字" width="200" show-overflow-tooltip />
        <el-table-column prop="website" label="网站链接" width="200" show-overflow-tooltip>
          <template slot-scope="slot">
            <router-link class="font-website" :to="{ path: 'iframeNav', query: { website: slot.row.website }}">
              {{ slot.row.website }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="describe" label="描述" show-overflow-tooltip />
        <el-table-column prop="created_at" label="创建时间" width="200" show-overflow-tooltip />
        <el-table-column prop="category" label="分类" width="200" show-overflow-tooltip />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <router-link class="font-website" :to="{ path: 'iframeNav', query: { website: scope.row.website }}">
              iframe链接
            </router-link>
            <a class="font-website" :href="scope.row.website" target="_blank">新窗口链接</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination small background layout="prev, pager, next" :total="total" :page-size="2" @current-change="handleCurrentChange" />
      </div>
    </el-drawer>

```

#### [js-cookie](https://github.com/js-cookie/js-cookie)处理浏览器cookie


一个简单，轻量级的JavaScript API，用于处理浏览器cookie

##### 特征

- 适用于所有浏览器
- 接受任何角色
- 经过严格测试
- 没有依赖
- 不显眼的 JSON支持
- 支持AMD / CommonJS
- 符合RFC 6265
- 启用自定义编码/解码

对cookie进行CRUD

```js
import Cookies from 'js-cookie'

const TokenKey = 'navigation_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
```

![avatar](http://images.qiufeihong.top/navigation2.png)

#### [normalize.css](https://github.com/necolas/normalize.css)

在默认的HTML元素样式上提供了跨浏览器的高度一致性。相比于传统的css reset，Normalize.css是一种现代的，为HTML5准备的优质替代方案。


##### 特征

- 与许多CSS重置不同，保留有用的默认值，而不是删除他们。
- 规范化各种元素的样式。
- 更正了错误和常见的浏览器不一致性。
- 通过微妙的修改提高可用性。
- 使用详细注释说明代码的作用。

推荐阅读[Normalize.css 与传统的 CSS Reset 有哪些区别？](https://www.zhihu.com/question/20094066)

#### [nprogress](https://github.com/rstacruz/nprogress)进度条

超薄进度条

通过调用start()和done()来控制进度条。

用在permission页面跳转时候
```js
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

NProgress.start()

NProgress.done()
```

还可以调整速度

```js
NProgress.configure({ easing: 'ease', speed: 500 });
```
关闭加载微调器。（默认值：true）

```js
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration
```

更改其父容器

```js
NProgress.configure({ parent: '#container' });
```

#### [path-to-regexp](https://github.com/pillarjs/path-to-regexp)处理 url 中地址与参数
该工具库用来处理 url 中地址与参数，能够很方便得到我们想要的数据。

js 中有 RegExp 方法做正则表达式校验，而 path-to-regexp 可以看成是 url 字符串的正则表达式。

应用于面包屑组件`components/Breadcrumb/index.vue`中，

分析下这个组件的原理：

- 拿到并且过滤当前路由中的matched属性，找到需要展示的meta属性
- 触发点击时，获得当前路由，判断redirect属性，如果值存在，塞进路由;否则有携带params的话，将路由补充完整。

```js
import pathToRegexp from 'path-to-regexp'


   pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
```

#### [vue-router](https://github.com/vuejs/vue-router)管理路由
Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。

##### 特征

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

##### 集成vue-router

```js

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

```

往路由中心`router/index.js`导入页面,下面是截取路由-页面映射的一部分。

其中`getNav`是获取模板`/page/NavPage/index`路径的方法。
```js
function getNav() {
  return () => import('@/page/NavPage/index')
}
```

```js

……

{
  path: '/jobs',
  component: Layout,
  redirect: '/jobs/recruitmentPlatform',
  name: 'Jobs',
  meta: {
    title: '工作',
    icon: 'jobs'
  },
  children: [{
    path: 'recruitmentPlatform',
    name: 'RecruitmentPlatform',
    component: getNav(),
    meta: {
      title: '工作-招聘平台',
      icon: 'recruitmentPlatform'
    }
  },
  {
    path: 'partTimeProgram',
    name: 'PartTimeProgram',
    component: getNav(),
    meta: {
      title: '工作-程序兼职',
      icon: 'partTimeProgram'
    }
  },
  {
    path: 'partTimeDesign',
    name: 'PartTimeDesign',
    component: getNav(),
    meta: {
      title: '工作-设计兼职',
      icon: 'partTimeDesign'
    }
  },
  {
    path: '/jobs/iframeNav',
    name: 'jobsIframeNav',
    hidden: true,
    component: () => import('@/page/iframeNav/index'),
    meta: {
      title: '网站',
      icon: 'iframeNav'
    }
  }
  ]
},


……

```

使用router生成页面

```js
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

```

模板`NavPage/index.vue`代码见[github仓库](https://github.com/qiufeihong2018/navigation-web/tree/master/src/page/NavPage/index.vue)

#### [screenfull](https://github.com/sindresorhus/screenfull.js)

用于跨浏览器使用`JavaScript Fullscreen API`的简单包装器，可让页面或任何元素全屏显示。


### 自定义依赖包

#### [vue-waterfall2](https://github.com/AwesomeDevin/vue-waterfall2)构建瀑布流布局

适用于vue和支持延迟加载的瀑布自适应插件，非常简单！
```js
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)
```

```html
 <waterfall
        :col="col"
        :width="itemWidth"
        :gutter-width="gutterWidth"
        :data="navArr"
        @loadmore="loadmore"
        @scroll="scroll"
      >
        <template>
          <div v-for="(nav,key) in navArr" :key="key" style="margin-top: 10px;">
            <el-card :body-style="{ padding: '10px' }" shadow="hover">
              <img :src="nav.logo" class="image" alt="加载错误">
              <el-form label-width="100px" label-position="left">
                <el-form-item label="网站名称">
                  {{ nav.name }}
                </el-form-item>
                <el-form-item label="iframe链接">
                  <router-link class="font-website" :to="{ path: 'iframeNav', query: { website: nav.website }}">
                    {{ nav.website }}
                  </router-link>
                </el-form-item>
                <el-form-item label="新窗口链接">
                  <a class="font-website" :href="nav.website" target="_blank">{{ nav.website }}</a>
                </el-form-item>
                <el-form-item label="网站描述">
                  <div>{{ nav.describe || '需要您添加网站描述' }}</div>
                </el-form-item>
              </el-form>
              <div class="bottom clearfix">
                <time class="time">创建时间：{{ nav.created_at|timeTrans }}</time>
                <el-button type="text" class="button" @click="openDialog(nav)">编辑</el-button>
                <el-button type="text" class="button" @click="deleteMap(nav)">删除</el-button>
              </div>
            </el-card>
          </div>
        </template>
      </waterfall>
```

#### [commitizen](https://github.com/commitizen/cz-cli)提交git规范化

commitizen命令行实用程序。

在Commitizen友好存储库中工作时，系统将提示填写必填字段，并且将提交消息根据项目维护人员定义的标准进行格式化。

```js

// 全局安装commitizen node模块
npm install commitizen -g 
// 通过键入以下命令初始化您的项目，以使用cz-convention -change - elog适配器
commitizen init cz-conventional-changelog --save-dev --save-exact
```

##### type用于说明 commit 的类别，只允许使用下面7个标识

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

##### scope 用来说明本次Commit影响的范围，即简要说明修改会涉及的部分,比如数据层、控制层、视图层等

##### subject comment所在的位置,这次提交的简短描述

![avatar](https://raw.githubusercontent.com/commitizen/cz-cli/master/meta/screenshots/add-commit.png)

### iframe

```html
                <el-form-item label="iframe链接">
                  <router-link class="font-website" :to="{ path: 'iframeNav', query: { website: nav.website }}">
                    {{ nav.website }}
                  </router-link>
                </el-form-item>
                <el-form-item label="新窗口链接">
                  <a class="font-website" :href="nav.website" target="_blank">{{ nav.website }}</a>
                </el-form-item>
```
页面中的`iframe链接`添加router-link指向iframe页面，但是跳转过去的链接都加上了每一个分类的路由，所以在路由文件的每一个分类的路由中都添加iframe路由。

```js

  {
    path: '/iframeNav',
    name: 'frontIframeNav',
    hidden: true,
    component: () => import('@/views/iframeNav/index'),
    meta: {
      title: '网站',
      icon: 'iframeNav'
    }
  }

  {
    path: '/back-end/iframeNav',
    name: 'backIframeNav',
    hidden: true,
    component: () => import('@/views/iframeNav/index'),
    meta: {
      title: '网站',
      icon: 'iframeNav'
    }
  }

  ……

```

所有从iframe链接点击的都跳到这个页面
```html
<template>
  <iframe ref="inlineFrameExample" title="Inline Frame Example" width="100%" height="898px" :src="iframeSrc" />
</template>
<script>
export default {
  data() {
    return {
      iframeSrc: ''
    }
  },
  created() {
    this.iframeSrc = this.$route.query.website
  }
}
</script>
```

### 适配
根据`vue-waterfall2`的不响应的特性，适配功能只能靠我自己解决。

移动端，给他设置1列，侧边栏打开设置3列，其余设置4列。

每个卡片的宽度根据屏幕的宽度和列数计算

卡片间的距离，给它一个定值。注意的是，当在移动端时，必须要设为0,否则后面几列都会向右偏移。

```js
computed: {
    col() {
      if (this.device === 'mobile') {
        return 1
      }
      if (this.sidebar.opened === true) {
        return 3
      }
      return 4
    },
    itemWidth() {
      if (this.device === 'mobile') {
        return (0.885 * (document.documentElement.clientWidth / 1))
      }
      if (this.sidebar.opened === true) {
        return (0.8 * (document.documentElement.clientWidth / 3))
      }
      return (0.9 * (document.documentElement.clientWidth / 4))
    },
    gutterWidth() {
      if (this.device === 'mobile') {
        return 0
      }
      return (9 * 0.5 * (document.documentElement.clientWidth / 375))
    },
    ...mapGetters([
      'sidebar',
      'device'
    ])
  },

```

### 网站分类
网站分类的数据是从router来的，但是router的数据必须要过滤才能得到分类的结果。

categoryOptions数组中的最后三者不属于分类项，所以要去掉。

```js
/**
 * get categoryOptions from routes
 * @param {HTMLElement} routes
 * @param {HTMLElement} tag: text/label
 */
export function getOption(tag, routes) {
  let categoryOptions = []
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path !== '/redirect') {
      const children = routes[i].children
      for (const j in children) {
        const obj = {
          value: ''
        }
        obj.value = children[j].path
        obj[tag] = children[j].meta.title
        categoryOptions.push(obj)
      }
    }
  }
  categoryOptions = categoryOptions.filter(item => {
    return item.label !== '网站'
  })
  // Delete the last three elements
  return categoryOptions.slice(0, -3)
}
```
然后模板页调用该方法
```js
import {
  getOption
} from '@/utils/index'

this.categoryOptions = getOption('label', routes)
```

## 后端

[github后端代码仓库](https://github.com/qiufeihong2018/navigation-server)

基于express框架

### 依赖包

#### [express](https://github.com/expressjs/express)搭建web应用

##### 特征

- 强大的路由
- 专注于高性能
- 超高的测试覆盖率
- HTTP助手（重定向，缓存等）
- 查看支持14+模板引擎的系统
- 内容协商
- 可快速生成应用程序的可执行文件

##### 解析
启动express服务

```js
const express = require('express');
const app = express();
const config = require('../config')();

  // start server
  // Set http port
  app.set('port', config.expressHttpPort); 

  app.listen(config.expressHttpPort, () => {
    // 开启端口打印日志
    log.info(`express running on ${config.expressHttpPort} port`);
  });
```

在config文件中动态配置端口
```js
'use strict';

var config = {
  development: {
    // mongodb
    database: 'mongodb://localhost/map',
    expressHttpPort: 1600,
  },
  local: {
    // mongodb
    database: 'mongodb://127.0.0.1/map',
    expressHttpPort: 1600
  },
  production: {
    // mongodb
    database: 'mongodb://127.0.0.1/map',
    expressHttpPort: 1600
  }
};


module.exports = function(mode) {
  var env;
  if (!mode) {
    env = process.env.NODE_ENV || 'development';
  } else if (mode && (mode === 'development' || 'local' || 'production')) {
    env = mode;
  } else {
    throw new Error(`config can only be 'development' || 'local' || 'production', 
    but you give ${mode}`);
  }
  var returnVal = config[env];
  return returnVal;
};

```

#### [express-session](https://github.com/expressjs/session)之express简单的session中间件

##### 解析
- resave
强制将会话保存回会话存储区，即使在请求期间会话从未被修改。取决于你的store这可能是必要的,但它也可以创建竞态条件,客户让两个并行请求您的服务器,在一个请求中更改会话可能会覆盖另一个请求结束时,即使它没有改变(这种行为也取决于存储你使用)。默认值为true。
- saveUninitialized
强制将“未初始化”的会话保存到存储区。当会话是新的但没有修改时，它是未初始化的。选择false对于实现登录会话、减少服务器存储使用或遵守在设置cookie之前需要获得许可的法律非常有用。选择false还可以帮助解决客户端在没有会话的情况下发出多个并行请求的竞态条件。默认值为true，但是不建议使用默认值，因为默认值将在将来更改。
- secret
这是用于对会话`ID cookie`签名的密码。这可以是单个秘密的字符串，也可以是多个秘密的数组。如果提供了一个秘密数组，则只使用第一个元素对会话`ID cookie`进行签名，而在验证请求中的签名时将考虑所有元素。
- cookie
每个会话都有一个惟一的cookie对象。这允许您更改每个访问者的会话cookie。
  -  maxAge
maxAge将返回剩余的时间(以毫秒为单位)，我们还可以重新分配一个新值来适当调整`.expires`属性。此时表示1天后过期。
```js
const session = require('express-session');


  // Session configuration
  const sess = {
    resave: true,
    saveUninitialized: true,
    secret: 'I am hungry',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  };


  app.use(session(sess)); // Set session middleware

```

如果有兴趣了解关于session的其他选项，请参考链接[express-session](https://github.com/expressjs/session)

#### [body-parser](https://github.com/expressjs/body-parser)正文解析

是一个Node.js正文解析中间件。

在处理程序之前，利用中间件解析传入的请求主体，在req.body属性下可用。

注意由于req.body形状基于用户控制的输入，因此该对象中的所有属性和值都是不可信的，应在信任之前进行验证。例如，`req.body.foo.toString()`可能以多种方式失败，例如foo属性可能不存在或者可能不是字符串，并且toString可能不是函数，而是字符串或其他用户输入。

```js
const bodyParser = require('body-parser');

……

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  // parse application/json
  app.use(bodyParser.json());


```

`urlenencoded` ([options])返回中间件，该中间件只解析`urlencoded body`，并且只查看内容类型头部与类型选项匹配的请求。该解析器只接受正文的UTF-8编码，并支持gzip和deflate编码的自动膨胀。在中间件(即req.body)之后，在请求对象上填充一个包含已解析数据的新body对象。这个对象将包含键值对，其中的值可以是字符串或数组(当扩展为false时)，也可以是任何类型(当扩展为true时)。

`extended`选项允许在使用`querystring`库解析url编码的数据(当为false时)和使用qs库(当为true时)之间进行选择。“extended”语法允许将丰富的对象和数组编码为url编码格式，允许使用类似json的url编码体验。

#### [mongoose](https://github.com/Automattic/mongoose)连接数据库

Mongoose是一个MongoDB对象建模工具，旨在在异步环境中工作。
##### 特征

- 堆栈溢出
- bug报告
- mongoose Slack Channel
- 帮助论坛
- MongoDB支持

##### 解析

连接数据库，处理连接的成功和失败的信息。
```js
'use strict';

const mongoose = require('mongoose');
const config = require('../config')();
// [koa警告DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `use...](https://www.jianshu.com/p/f3128e7ae3c5)
mongoose.set('useFindAndModify', false);
let reconnectTimes = 0;// Mongodb reconnect times
let reconnectInterval = 0.1;// The interval seconecd time between two reconnection;
const maxReconnectInterval = 120;// The max interval time between two reconnection;

// Connect to mongodb
function connect() {
  const options = {
    socketTimeoutMS: 3000,
    keepAlive: true,
    reconnectTries: 4,
    useNewUrlParser: true
  };
  mongoose.connect(config.database, options);
}

// Mongoose error handler
mongoose.connection.on('error', function(err) {
  log.error(err);
});

// Mongoose reconnect when closed
mongoose.connection.on('disconnected', function() {
  reconnectTimes++;
  reconnectInterval = reconnectInterval * 2;
  if (reconnectInterval > maxReconnectInterval) reconnectInterval = maxReconnectInterval;
  setTimeout(() => {
    connect();
  }, reconnectInterval * 1000);
});

mongoose.connection.on('connected', function() {
  reconnectTimes = 0;
  reconnectInterval = 0.1;
});

exports.connect = connect;

```

创建数据库集合`AdminMap`

```js
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminMap = new Schema({
  category: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  website: { type: String, required: true, trim: true },
  describe: { type: String, trim: true },
  logo: { type: String, trim: true },
  way: { type: String, trim: true },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


module.exports = mongoose.model('AdminMap', AdminMap);
```

#### [winston](https://github.com/winstonjs/winston)记录日志
winston被设计为一个简单和通用的日志记录库，支持多个传输。传输本质上是日志的存储设备。每个winston记录器可以具有在不同级别配置的多个传输（请参阅： 传输）（请参阅：记录级别）。例如，可能希望将错误日志存储在持久远程位置（如数据库）中，但所有日志都输出到控制台或本地文件。

winston旨在将部分日志记录过程分离，使其更加灵活和可扩展。注意支持日志格式（参见：格式）和级别的灵活性（请参阅：使用自定义日志记录级别），并确保这些API与传输日志记录的实现分离
#### [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file)
winston的传输，记录到旋转文件。可以根据日期，大小限制轮换日志，并且可以根据计数或经过的天数删除旧日志。


#### [assert](https://github.com/beberlei/assert)精简断言库，用于库和业务模型

#### [cheerio](https://github.com/cheeriojs/cheerio)爬虫
快速，灵活和精简的核心jQuery实现，专为服务器而设计。

#### [eslint](https://github.com/eslint/eslint)
ESLint是一种用于识别和报告ECMAScript / JavaScript代码中的模式的工具。在许多方面，它类似于JSLint和JSHint，但有一些例外：

ESLint使用Espree进行JavaScript解析。
ESLint使用AST来评估代码中的模式。
ESLint是完全可插拔的，每个规则都是一个插件，您可以在运行时添加更多。
#### [istanbul](https://github.com/gotwarlost/istanbul)

另一个JS代码覆盖工具，它使用模块加载器挂钩计算语句，行，函数和分支覆盖，以便在运行测试时透明地添加覆盖。支持所有JS覆盖用例，包括单元测试，服务器端功能测试和浏览器测试。专为规模而建。
#### [mocha](https://github.com/mochajs/mocha)
node.js和浏览器的简单，灵活，有趣的javascript测试框架


#### [mochawesome](https://github.com/adamgruber/mochawesome)
Mochawesome是一个用于Javascript测试框架mocha的自定义报告器。它在Node.js（> = 8）上运行，并与mochawesome-report-generator结合使用，生成独立的HTML / CSS报告，以帮助可视化您的测试运行。


#### [request](https://github.com/request/request)
简单的http请求客户端

#### [should](https://github.com/shouldjs/should.js)
node.js的BDD样式断言

应该是一个富有表现力，可读，与框架无关的断言库。这个图书馆的主要目标是表达和帮助。它可以使您的测试代码保持干净，并且您的错误消息很有用
#### [supertest](https://github.com/visionmedia/supertest)
蜘蛛超级代理驱动的库，用于使用流畅的API测试node.js HTTP服务器。

### 登录注册时用户名和密码验证的依赖包
这三者有这密切的联系，前两者都可以归`passport-local-mongoose`管理，主要解析就放在`passport-local-mongoose`这个依赖包中
#### [passport](https://github.com/jaredhanson/passport)

##### 特征

Passport是Node.js的Express兼容认证中间件。

Passport的唯一目的是验证请求，它通过一组称为策略的可扩展插件来完成。Passport不会挂载路由或假设任何特定的数据库架构，这可以最大限度地提高灵活性，并允许开发人员做出应用程序级别的决策。Passport提供了用于控制身份验证成功或失败时的钩子。

会话：Passport将维护持久的登录会话。为了使持久会话工作，必须将经过身份验证的用户序列化到会话，并在发出后续请求时反序列化。Passport对用户记录的存储方式没有任何限制。相反，您为Passport提供了一些函数，这些函数实现了必要的序列化和反序列化逻辑。在典型的应用程序中，这与序列化用户ID以及反序列化时按ID查找用户一样简单。

中间件：要在基于Express或连接的应用程序中使用Passport，请使用所需的Passport .initialize()中间件对其进行配置。如果您的应用程序使用持久性登录会话(推荐使用，但不是必需的)，还必须使用passport.session()中间件。

#### [passport-local](https://github.com/jaredhanson/passport-local)

##### 特征

用于使用用户名和密码进行身份验证的Passport策略。

此模块允许您使用Node.js应用程序中的用户名和密码进行身份验证。通过插入Passport，可以轻松且不显眼地将本地身份验证集成到支持Connect风格中间件（包括 Express）的任何应用程序或框架中 。

做验证之前，首先需要对策略进行配置

参考于github
```js
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
```

#### [passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose)

#### 特征
`passport-local-mongoose`是一个Mongoose插件，它简化了使用Passport构建用户名和密码的权限


##### 解析
1. 首先需要将依赖包导入schema中。
```js
const passportLocalMongoose = require('passport-local-mongoose');

const options = {
  interval: 200,
  maxInterval: 6 * 60 * 1000,
  maxAttempts: 6,
  limitAttempts: true
};
User.plugin(passportLocalMongoose, options);
```
2. 配置Passport和Passport-Local

可以简化两者的配置

`passport-local-mongoose`可以通过设置`LocalStrategy`、`serializeUser`和`deserializeUser`来配置来这两者

具体参数解析见[《mongoose之passport-local-mongoose》](https://www.qiufeihong.top/technical-summary/mongo/#mongoose%E4%B9%8Bpassport-local-mongoose)

```js
  // requires the model with Passport-Local Mongoose plugged in
  var User = require('../collections/user');
  app.use(passport.initialize());
  app.use(passport.session());
  // use static authenticate method of model in LocalStrategy
  passport.use(new LocalStrategy(User.authenticate()));
  // use static serialize and deserialize of model for passport session support
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
```

### CRUD

增删改查的业务逻辑没什么好讲的，代码在仓库里

就是注意一点：

我这里是get请求要做的是去想数据库请求某个类别的网站的某页的数据，`limit`等关键词我是从`req._parsedOriginalUrl.query`中分割的。

要获取总长度，所以此处查找了两次。
```js
router.get('/', function(req, res) {
  const arr = req._parsedOriginalUrl.query.split('&');
  const limit = arr[0].split('=')[1];
  const offset = arr[1].split('=')[1];
  const cate = arr[2].split('=')[1];
  let total = 0;
  SuperAdminMap.find({ category: cate }).then((data) => {
    total = data.length;
    SuperAdminMap.find({ category: cate })
    .limit(Number(limit))
    .skip(Number(offset))
    .then((data) => {
      log.info(`Get ${cate} data`);
      res.status(200).json({
        data,
        total
      });
    });
  });
});
```
### apidoc文档神器

为了方便查看api，所以用上apidoc是绝对要的，需要了解并运用的，点此处[apiDoc生成接口文档,不费吹灰之力](https://www.qiufeihong.top/technical-summary/apiDoc/)


此处是后端查找superAdmin数据库的get请求的注释
```js

/**
 * @api {get} /superAdmin/ SuperAdmin getMap
 * @apiName SuperAdminGet
 * @apiGroup superAdminOperation
 *
 * @apiParam {String} limit  Number of pages per page.
 * @apiParam {String} offset  Number of skips.
 * @apiParam {String} category  New website's category.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *    "data": [
 *        {
 *            "_id": "5d5e4206443bdd63d0f82327",
 *            "category": "recommendationFront-end",
 *            "name": "test1",
 *            "website": "test4",
 *            "describe": "test",
 *            "logo": "test",
 *            "created_at": "2019-08-22T07:19:34.924Z",
 *            "updated_at": "2019-08-22T07:19:34.924Z",
 *            "__v": 0
 *        },
 *        {
 *            "_id": "5d5e4209443bdd63d0f82328",
 *            "category": "recommendationFront-end",
 *            "name": "test1",
 *            "website": "test5",
 *            "describe": "test",
 *            "logo": "test",
 *            "created_at": "2019-08-22T07:19:37.430Z",
 *            "updated_at": "2019-08-22T07:19:37.430Z",
 *            "__v": 0
 *        }
 *    ],
 *    "total": 655
 *}
 * @apiError NOT_LOGIN The current User was not logon.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "err": "NOT_LOGIN",
 *       "message": "User has not logon in!"
 *     }
 */
```
执行`npm run apidoc`命令后生成api文档

![avatar](http://images.qiufeihong.top/navigation3.png)

## 展望

下一篇《chrome开发之Navigation提交工具》
