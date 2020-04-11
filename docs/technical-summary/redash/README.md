#【运维】浅谈redash
[github地址](https://github.com/getredash/redash)

[http://redash.io/](http://redash.io/)

让你的公司数据驱动。连接到任何数据源，轻松可视化，仪表板和共享您的数据。

`Redash`是我们在公司内部以一种更适合我们的文化和使用模式的方式释放数据的方式。

在`Redash`之前，我们尝试使用传统的`BI`套件，并发现了一组膨胀的、技术上有挑战的、缓慢的工具/流。我们寻找的是一种更像黑客的方式来看待数据，所以我们做了一个。

`Redash`的建立是为了方便快捷地访问数十亿条记录，我们使用`Amazon Redshift`(“`pb`级数据仓库”，“讲”`PostgreSQL`)来处理和收集这些记录。今天，`Redash`支持查询多个数据库，包括:`Redshift`，`Google BigQuery`, `PostgreSQL`, `MySQL，Graphite`，`Presto`，`Google Spreadsheets`，`Cloudera Impala`, `Hive`和自定义脚本。

`Redash`由两部分组成:
1. 查询编辑：想想为了`SQL`查询的`JS Fiddle`。通过共享数据集和生成数据集的查询，您可以以开放的方式共享组织中的数据。通过这种方式，每个人不仅可以对结果数据集进行同行评审，还可以对生成数据集的过程进行同行评审。也可以派生它，生成新的数据集并获得新的见解。
2. 可视化和仪表板:有了数据集之后，就可以从中创建不同的可视化，然后将多个可视化合并到一个仪表板中。目前，`Redash`支持图表、数据透视表、队列等。


## Redash的项目结构
我分析的是`Redash`的`master`分支。

`Redash`包含了前端、后端、测试和运维等等。



先来看redash的前端,他的前端是react编写的。

redash的前端目录结构：
```
├─app
│  ├─assets 静态文件夹(项目的所需要图片资源，这些图片资源一般来说都是做图标的，都比较小。webpack会将其转化成BASE64去使用。)
│  │  ├─css 只有login的样式
│  │  ├─fonts 字体库
│  │  │  └─roboto
│  │  ├─images 图片库
│  │  │  ├─db-logos
│  │  │  ├─destinations
│  │  │  └─illustrations
│  │  └─less less样式（主要是antd）
│  │      ├─inc
│  │      │  ├─less-plugins
│  │      │  └─visualizations
│  │      └─redash
│  ├─components 公共组件库(定一个组件，这里要求是新建一个文件夹，文件夹名为组件名，另外在这个文件夹下新建index.jsx和style.scss文件。)
│  │  ├─admin 布局
│  │  ├─ApplicationArea 应用区域
│  │  │  └─ApplicationHeader 应用头部
│  │  ├─cards-list
│  │  ├─ColorPicker
│  │  ├─dashboards
│  │  │  └─dashboard-widget
│  │  ├─dynamic-form
│  │  ├─dynamic-parameters
│  │  ├─EditVisualizationButton
│  │  ├─empty-state
│  │  ├─groups
│  │  ├─items-list
│  │  │  ├─classes
│  │  │  └─components
│  │  ├─json-view-interactive
│  │  ├─layouts
│  │  ├─PermissionsEditorDialog
│  │  ├─queries
│  │  │  ├─ApiKeyDialog
│  │  │  ├─QueryEditor
│  │  │  └─__snapshots__
│  │  ├─query-snippets
│  │  ├─Resizable
│  │  ├─sortable
│  │  ├─tags-control
│  │  ├─TextAlignmentSelect
│  │  ├─users
│  │  │  └─__snapshots__
│  │  └─visualizations
│  │      └─editor
│  ├─config 配置
│  ├─extensions
│  ├─lib 一些工具函数的集合
│  │  ├─hooks
│  │  └─pagination
│  ├─pages 主页面(存放的都是页面级组件，跟react-router对应的路由需要一一对应。每个页面都是一个文件夹，文件名就是页面名称，每个页面都要包含如下几个文件：
components ---- 存放当前页独有的一些组件
redux ---- 存放三个文件actions.js、actionTypes.js、reducer.js,这几个文件应该只与这个页面相关
index.jsx ---- 页面的入口文件
style.scss ---- 页面所需要的样式)
│  │  ├─admin
│  │  ├─alert
│  │  │  └─components
│  │  ├─alerts
│  │  ├─dashboards
│  │  │  ├─components
│  │  │  └─hooks
│  │  ├─data-sources
│  │  ├─destinations
│  │  ├─groups
│  │  ├─home
│  │  ├─queries
│  │  │  ├─components
│  │  │  └─hooks
│  │  ├─queries-list
│  │  ├─query-snippets
│  │  ├─settings
│  │  └─users
│  ├─redash-font redash的字体库
│  │  └─fonts
│  ├─services axios请求方法的集合
│  │  ├─parameters
│  │  │  └─tests 请求测试
│  │  └─policy
│  ├─visualizations 所有可视化图表的集合
│  │  ├─box-plot 盒型图
│  │  ├─chart 图表
│  │  │  ├─Editor
│  │  │  │  └─__snapshots__
│  │  │  ├─fixtures
│  │  │  │  └─getChartData
│  │  │  ├─plotly
│  │  │  │  └─fixtures
│  │  │  │      ├─prepareData
│  │  │  │      │  ├─bar
│  │  │  │      │  ├─box
│  │  │  │      │  ├─bubble
│  │  │  │      │  ├─heatmap
│  │  │  │      │  ├─line-area
│  │  │  │      │  ├─pie
│  │  │  │      │  └─scatter
│  │  │  │      └─prepareLayout
│  │  │  └─Renderer
│  │  ├─choropleth 地区分布图
│  │  │  ├─Editor
│  │  │  ├─maps
│  │  │  └─Renderer
│  │  ├─cohort
│  │  │  └─Editor
│  │  ├─components
│  │  ├─counter
│  │  │  └─Editor
│  │  ├─details
│  │  ├─funnel 漏斗图
│  │  │  ├─Editor
│  │  │  └─Renderer
│  │  ├─map
│  │  │  └─Editor
│  │  ├─pivot 数据透视
│  │  ├─sankey 桑基图
│  │  ├─sunburst 旭日图
│  │  ├─table 表格
│  │  │  ├─columns
│  │  │  │  └─__snapshots__
│  │  │  └─Editor
│  │  │      └─__snapshots__
│  │  └─word-cloud
│  └─__tests__
└─cypress 测试
    ├─integration 集成测试
    │  ├─alert
    │  ├─dashboard
    │  ├─data-source
    │  ├─destination
    │  ├─embed
    │  ├─group
    │  ├─query
    │  ├─query-snippets
    │  ├─settings
    │  ├─user
    │  └─visualizations
    │      └─table
    │          └─.mocks
    ├─plugins
    └─support
        ├─dashboard
        ├─redash-api
        └─tags
```


当然先安装依赖，启动项目，查看页面。

```
npm i
npm run start
```

```
> webpack-dev-server

[HPM] Proxy created: [
  '/login',
  '/logout',
  '/invite',
  '/setup',
  '/status.json',
  '/api',
  '/oauth'
]  ->  http://10.66.194.34:5000/
[HPM] Proxy created: [Function: context]  ->  http://10.66.194.34:5000/
i ｢wds｣: Project is running at http://localhost:8080/
i ｢wds｣: webpack output is served from /static/
i ｢wds｣: 404s will fallback to /static/index.html
Browserslist: caniuse-lite is outdated. Please run next command `npm update caniuse-lite browserslist`
i ｢wdm｣: Hash: 6eeaecfefad0b8617e59
Version: webpack 4.29.6
Time: 42967ms
Built at: 2020-04-11 17:45:35
```
打开`http://localhost:8080/`就可以看到redash页面。
