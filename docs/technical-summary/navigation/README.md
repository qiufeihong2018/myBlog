# navigation网站收藏和导航平台

![avatar](http://images.qiufeihong.top/login.png)


## 实现功能

[网站CRUD](http://images.qiufeihong.top/nAdd.webm)

[登录登出](http://images.qiufeihong.top/nLogin.webm)

[搜索](http://images.qiufeihong.top/nSearch.webm)


## 网站截图

![网站导航块瀑布流](http://images.qiufeihong.top/n1.png)

![网站嵌套iframe](http://images.qiufeihong.top/n2.png)

![网站提交](http://images.qiufeihong.top/n3.png)

## 在线Demo

[预览](http://navigation.qiufeihong.top)

## 实现思路

![avatar](http://images.qiufeihong.top/navigation1.png)

## 前端

是基于花裤衩的[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)的简单版的后台管理模板，这一款基于vue2.0的后台管理平台深受大众喜爱。

### vue-admin-template集成的工具包

#### vuex

vue状态管理工具

Vuex是一个专为Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化.

自动从modules文件夹中导入文件
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
#### axios

支持http数据通信

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

在其封装axios对象的request文件中，我在response响应中去掉了自定义状态码的设置。

#### element-ui

饿了吗的web平台UI库

Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库

#### [js-cookie](https://github.com/js-cookie/js-cookie)

一个简单，轻量级的JavaScript API，用于处理浏览器cookie

```
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
#### [normalize.css](https://github.com/necolas/normalize.css)
CSS重置的现代替代方案

1. 与许多CSS重置不同，保留有用的默认值。
2. 规范化各种元素的样式。
3. 更正了错误和常见的浏览器不一致性。
4. 通过微妙的修改提高可用性。
5. 使用详细注释说明代码的作用。


#### [nprogress](https://github.com/rstacruz/nprogress)

适用于Ajax'y应用程序的超薄进度条。受Google，YouTube和Medium的启发。

用在路由跳转文件中


#### [path-to-regexp](https://github.com/pillarjs/path-to-regexp)

将路径字符串/user/:name转换为正则表达式。

#### [stylus](https://github.com/stylus/stylus)

为nodejs构建的富有表现力，功能强大，功能丰富的CSS语言

#### [stylus-loader](https://github.com/shama/stylus-loader)

为了能够使用任何stylus软件包版本，它将不会自动安装。因此需要将其添加到package.json其中stylus-loader。

#### [vue-router](https://github.com/vuejs/vue-router)
Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

嵌套的路由/视图表
模块化的、基于组件的路由配置
路由参数、查询、通配符
基于 Vue.js 过渡系统的视图过渡效果
细粒度的导航控制
带有自动激活的 CSS class 的链接
HTML5 历史模式或 hash 模式，在 IE9 中自动降级
自定义的滚动条行为


#### [screenfull](https://github.com/sindresorhus/screenfull.js)
用于跨浏览器使用JavaScript Fullscreen API的简单包装器，可让您将页面或任何元素全屏显示。平滑浏览器实现差异，因此您不必这样做。
### 自定义工具包

#### [vue-waterfall2](https://github.com/AwesomeDevin/vue-waterfall2)

适用于vue和支持延迟加载的瀑布自适应插件，非常简单！
```
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)
```
#### commitizen

#### 抽屉组件
### 页面模板

```vue
<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="app-container"
    element-loading-text="别催了，我在加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <template v-if="navArr.length>0">
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
      <div class="pagination-container">
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>
    <div v-else>
      <img src="@/assets/noData.png" style="margin-left: -102px;">
    </div>
    <el-dialog title="编辑网站" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="网站分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择网站分类">
            <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="网站链接" prop="website">
          <el-input v-model="form.website" />
        </el-form-item>
        <el-form-item label="网站LOGO" prop="logo">
          <el-input v-model="form.logo" />
        </el-form-item>
        <el-form-item label="网站描述" prop="describe">
          <el-input v-model="form.describe" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="putMap(form)">确 定</el-button>
      </div>
    </el-dialog>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="50"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

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
### iframe

所有从iframe链接点击的都跳到这个页面
```vue
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

基于express框架

### 工具包
#### body-parser
#### express
#### express-session
#### mongoose
#### passport
#### passport-local

#### passport-local-mongoose
#### winston
#### winston-daily-rotate-file
#### assert
#### cheerio
#### commitizen
#### eslint
#### istanbul
#### commitizen
#### mocha
#### mochawesome
#### request
#### should
#### supertest

### 连接数据库

```js
'use strict';

const mongoose = require('mongoose');
const log = require('./logger').createLogger('mongo');
const config = require('../config')();
// [koa警告DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `use...](https://www.jianshu.com/p/f3128e7ae3c5)
mongoose.set('useFindAndModify', false);
let reconnectTimes = 0;// Mongodb reconnect times
let reConnectInterval = 0.1;// The interval seconecd time between two reconnection;
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
  reConnectInterval = reConnectInterval * 2;
  if (reConnectInterval > maxReconnectInterval) reConnectInterval = maxReconnectInterval;
  log.warn(`mongodb will the ${reconnectTimes} times try reconnecting, ` +
           `after ${reConnectInterval} seconds ...`);
  setTimeout(() => {
    connect();
  }, reConnectInterval * 1000);
});

mongoose.connection.on('connected', function() {
  reconnectTimes = 0;
  reConnectInterval = 0.1;
  log.info('mongodb connected successfull');
});

exports.connect = connect;

```
### 主程序

```js
'use strict';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const config = require('../config')();
const mongo = require('./mongo');
const log = require('./logger').createLogger('express');
const app = express();

exports.start = function() {
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.get('/#*', (req, res) => {
    const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf-8');
    res.send(html);
  });

  mongo.connect();

  // Session configuration
  const sess = {
    resave: true,
    saveUninitialized: true,
    secret: 'I am hungry',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  };

  app.use(bodyParser.json());
  // For parsing application/json
  // For parsing application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(session(sess)); // Set session middleware

  // passport config
  var User = require('../collections/user');
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());


  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

  app.use('/api/v1/auth', require('../routers/userAuthentication'));
  app.use('/api/v1/admin', require('../routers/adminOperation'));
  app.use('/api/v1/superAdmin', require('../routers/superAdminOperation'));


  // start server
  app.set('port', config.expressHttpPort); // Set http port

  app.listen(config.expressHttpPort, () => {
    // 开启端口打印日志
    log.info(`express running on ${config.expressHttpPort} port`);
  });
};

```

### 记录日志

```js
'use strict';

/**
 * Logger is to custom winston to provide different log pattern in 'development',
 * 'production' and other mode.
 * 'development' will use Console and File output with 'debug' level
 * 'production' will use DailyRotateFile output with 'info' level,
 *  and the maxFiles is 30d.
 *  other mode will use File output with 'info' level.
 */
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const config = require('../config')();
const MODE = require('../constant/system').MODE;
const { combine, timestamp, label, printf } = format;

let mode = process.env.NODE_ENV;
if (!mode) mode = MODE.DEVE;

let logFile = config.logFile;

// default log file is in the current log folder
if (!logFile) logFile = './log/express.log';
logFile = logFile.replace('.log', ''); // remove '.log' from the logFile

const trans = [];
const consoleTrans = new transports.Console({ level: 'debug' });
const fileTrans = new transports.File({ filename: `${logFile}.log`, level: 'info' });
// daily rotate file transport config
const dailyRotateFileTrans = new (transports.DailyRotateFile)({
  filename: logFile + '-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d'
});

if (mode === MODE.DEVE) {
  trans.push(consoleTrans);
  fileTrans.level = 'debug';
  trans.push(fileTrans);
} else if (mode === MODE.PROD) {
  trans.push(dailyRotateFileTrans);
} else {
  trans.push(fileTrans);
}

exports.createLogger = function(source) {
  const myFormat = combine(
    label({ label: source }),
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
    printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}][${level.toUpperCase()}]: ${message}`;
    })
  );
  return new (createLogger)({
    format: myFormat,
    transports: trans
  });
};

```

### 爬取数据

```js
'use strict';
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/map');
const superAdminMap = require('../collections/superAdminMap.js');


function reptile(url, type) {
  request(url, function(error, res, body) {
    if (!error && res.statusCode == 200) {
      const $ = cheerio.load(body);
      const panelBlock = $('.panel');
      const arr = [];

      const map = new Map([
        ['设计-热门推荐', 'recommendationDesign'],
        ['设计-灵感采集', 'inspiration'],
        ['设计-界面交互', 'interaction'],
        ['设计-设计规范', 'designSpecifications'],
        ['设计-在线工具', 'onlineTools'],
        ['设计-icon图标', 'icon'],
        ['设计-设计素材', 'designMaterial'],
        ['设计-图库素材', 'galleryMaterial'],
        ['设计-颜色搭配', 'colourAssortment'],
        ['设计-字体字形', 'fontGlyph'],
        ['设计-学习教程', 'learningTutorial'],
        ['设计-设计团队', 'designTeam'],
        ['运营-域名注册', 'domainName'],
        ['运营-数据分析', 'dataAnalysis'],
        ['运营-数据工具', 'dataTools'],
        ['运营-数据收集', 'dataCollection'],
        ['运营-新媒平台', 'mediaPlatform'],
        ['运营-新媒工具', 'mediaTools'],
        ['运营-网站收录', 'websiteInclusion'],
        ['运营-ASO优化', 'ASOOptimization'],
        ['产品-新品推荐', 'recommendationProduct'],
        ['产品-产品资讯', 'productInformation'],
        ['产品-原型工具', 'prototypeTool'],
        ['产品-思维导图', 'mindMap'],
        ['产品-协同工作', 'teamwork'],
        ['产品-文档编辑', 'documentEditing'],
        ['产品-云盘储存', 'diskStorage'],
        ['产品-趣味产品', 'interestingProducts'],
        ['前端-热门推荐', 'recommendationFront-end'],
        ['前端-前端框架', 'frontFrameFront-end'],
        ['前端-论坛社区', 'forumCommunityFront-end'],
        ['前端-学习平台', 'learningPlatformFront-end'],
        ['前端-个人框架', 'frontFrameFront-end'],
        ['前端-在线编程', 'onlineProgrammingFront-end'],
        ['前端-代码托管', 'codeHostingFront-end'],
        ['前端-构建工具', 'buildToolFront-end'],
        ['前端-检查测试', 'inspectionTestFront-end'],
        ['前端-内容管理', 'frontFrameFront-end'],
        ['前端-后端系统', 'recommendationBack-end'],
        ['工作-招聘平台', 'recruitmentPlatform'],
        ['工作-程序兼职', 'partTimeProgram'],
        ['工作-设计兼职', 'partTimeDesign'],
        ['极客-开发硬件', 'developmentHardware'],
        ['极客-硬件系统', 'hardwareSystem'],
        ['极客-游戏系统', 'gameSystem'],
        ['极客-其他工具', 'otherTools'],
        ['极客-信息查询', 'informationInquiry']
      ]);
      for (let i = 0; i < panelBlock.length; i++) {
        const titleLen = $('.panel').eq(i).find('.card-title').length;
        for (let j = 0; j < titleLen; j++) {
          const obj = {};
          obj.category = map.get((type + $('.panel-title.card').eq(i).text().trim()));
          obj.name = $('.panel').eq(i).find('.card-title').eq(j).text().trim();
          obj.website = $('.panel').eq(i).find('.card .card-heading').eq(j).attr('title');
          obj.describe = $('.panel').eq(i).find('.card .card-body').eq(j).text().trim();
          obj.logo = 'http://chuangzaoshi.com/' + $('.panel').eq(i).find('.card-icon img').eq(j).attr('src');
          arr.push(obj);
        }
      }
      superAdminMap.create(arr, function(err, doc) {
        console.log(err);
      });
    }
  });
}


async function main() {
  await reptile('http://chuangzaoshi.com/index', '设计-');
  await reptile('http://chuangzaoshi.com/code', '前端-');
  await reptile('http://chuangzaoshi.com/operate', '运营-');
  await reptile('http://chuangzaoshi.com/product', '产品-');
  await reptile('http://chuangzaoshi.com/job', '工作-');
  await reptile('http://chuangzaoshi.com/geek', '极客-');
}

main();

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
### apidoc

为了方便查看api，所以用上apidoc是绝对要的，需要了解点此处[apiDoc生成接口文档,不费吹灰之力](https://www.qiufeihong.top/technical-summary/apiDoc/)



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

## 展望

开发扩展程序，点击网站右键添加到`navigation`