# 没有vue-cli就没有f-cli

<el-rate
  v-model="value"
  show-text>
</el-rate>

<script>
  export default {
    data() {
      return {
        value: null
      }
    }
  }
</script>

## 脚手架
### 建筑工地的脚手架
脚手架是为了保证各施工过程顺利进行而搭设的工作平台。按搭设的位置分为外脚手架、里脚手架；按材料不同可分为木脚手架、竹脚手架、钢管脚手架；按构造形式分为立杆式脚手架、桥式脚手架、门式脚手架、悬吊式脚手架、挂式脚手架、挑式脚手架、爬式脚手架。

### vue-cli脚手架
Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供：

通过 @vue/cli 搭建交互式的项目脚手架。
通过 @vue/cli + @vue/cli-service-global 快速开始零配置原型开发。
一个运行时依赖 (@vue/cli-service)，该依赖：
可升级；
基于 webpack 构建，并带有合理的默认配置；
可以通过项目内的配置文件进行配置；
可以通过插件进行扩展。
一个丰富的官方插件集合，集成了前端生态中最好的工具。
一套完全图形化的创建和管理 Vue.js 项目的用户界面。
Vue CLI 致力于将 Vue 生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。与此同时，它也为每个工具提供了调整配置的灵活性，无需 eject。

### 总结
方便建造东西
## 工具
### commander
node.js命令行界面变得简单

- Installation
```
npm install commander
```
- Declaring program variable
- Options
  - Common option types, boolean and value
  - Default option value
  - Other option types, negatable boolean and flag|value
  - Custom option processing
  - Version option
- Command-specific options
- Variadic arguments
- Specify the argument syntax
- Git-style sub-commands
- Automated --help
- Custom help
  - .outputHelp(cb)
  - .help(cb)
- Custom event listeners
- Bits and pieces
  -  TypeScript
- Examples
```js
  var program = require('commander');

program
  .version('0.1.0')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(env, options){
    var mode = options.setup_mode || "normal";
    env = env || 'all';
    console.log('setup for %s env(s) with %s mode', env, mode);
  });

program
  .command('exec <cmd>')
  .alias('ex')
  .description('execute the given remote cmd')
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(cmd, options){
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  }).on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ deploy exec sequential');
    console.log('  $ deploy exec async');
  });

program
  .command('*')
  .action(function(env){
    console.log('deploying "%s"', env);
  });

program.parse(process.argv);
```

### inquirer
常用交互式命令行用户界面的集合。

- 文档
  - 安装
```
npm install inquirer
```
  - 例子
  - 方法
  - 对象
  - 问题
  - 答案
  - 分隔器
  - 提示类型
- 用户界面和布局
  - 反应接口
- 支持
- 新闻
- 特约
- 执照
- 插件


### chalk
- 安装
- 用法
- API
- 样式
- 标记模板文字
- 256和Truecolor颜色支持
- 视窗
- 有关
### ora
优雅的终端微调器
- 安装
- 用法
- API
- 样式
- 标记模板文字
- 256和Truecolor颜色支持
- 视窗
- 有关
### download-git-repo
从节点下载并提取git存储库（GitHub，GitLab，Bitbucket）。
- 安装
- API
- 例子
## 目录搭建
ok，有了上面的知识储备之后，我们就正式开始撸了。

1. 首先我们要创建一个文件夹，并取名叫 qfh-cli；
2. 在该目录下执行 npm init 命令，一路回车，就会生成一个生成 package.json 文件，在 package.json 里面写入以下依赖并执行 npm install 安装，如下：
```
  "dependencies": {
    "chalk": "^2.4.2",
    "commander": "^2.20.0",
    "download-git-repo": "^2.0.0",
    "inquirer": "^6.5.0",
    "ora": "^3.4.0"
  }
```
3. 新建一个 bin 文件夹，并在 bin 目录下新建一个无后缀名的 qfh 、qfh-add、qfh-delete、qfh-init、qfh-list文件


## bin 目录初始化
当前，bin 目录下就只有一个文件，就是入口文件 qfh。所以现在我们先来编写这个文件，由于内容较少，我们直接看代码：
```js
#!/usr/bin/env node
const program = require('commander')

// 定义当前版本
// 定义使用方法
// 定义四个指令
program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('add', 'add a new template')
  .command('delete', 'delete a template')
  .command('list', 'list all the templates')
  .command('init', 'generate a new project from a template')
  
// 解析命令行参数
program.parse(process.argv)
```
这个文件的主要作用就是定义指令，现在我们用 node ./bin/qfh 运行一下，就能看到如下结果：
```
devue@devue-System-Product-Name:~/myItem/qfh-cli$ node ./bin/qfh
Usage: qfh <command> [options]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  add            add a new template
  delete         delete a template
  list           list all the templates
  init           generate a new project from a template
  help [cmd]     display help for [cmd]
```

当然，你可能会觉得每次输入 node ./bin/qfh 这个命令有点麻烦，没关系，我们可以在 package.json 里面写入已下内容：

```
  "bin": {
    "qfh": "bin/qfh",
    "qfh-add": "bin/qfh-add",
    "qfh-delete": "bin/qfh-delete",
    "qfh-init": "bin/qfh-init",
    "qfh-list": "bin/qfh-list"
  },
```
然后在根目录下执行 npm link（就是把命令挂载到全局的意思），这样我们每次只要输入 qfh，就可以直接运行了，so cool，就像下面这样：
```
devue@devue-System-Product-Name:~/myItem/qfh-cli$ qfh
Usage: qfh <command> [options]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  add            add a new template
  delete         delete a template
  list           list all the templates
  init           generate a new project from a template
  help [cmd]     display help for [cmd]
```

重新绑定命令，必须先执行 npm unlink 解绑全局命令，再执行 npm link 重新把命令绑定到全局
## 编写具体指令
### qfh-add
```js
#!/usr/bin/env node

// 交互式命令行
const inquirer = require('inquirer')
// 修改控制台字符串的样式
const chalk = require('chalk')
// node 内置文件模块
const fs = require('fs')
// 读取根目录下的 template.json
const tplObj = require(`${__dirname}/../template`)

// 自定义交互式命令行的问题及简单的校验
let question = [
  {
    name: "name",
    type: 'input',
    message: "请输入模板名称",
    validate (val) {
      if (val === '') {
        return 'Name is required!'
      } else if (tplObj[val]) {
        return 'Template has already existed!'
      } else {
        return true
      }
    }
  },
  {
    name: "url",
    type: 'input',
    message: "请输入模板地址",
    validate (val) {
      if (val === '') return 'The url is required!'
      return true
    }
  }
]

inquirer
  .prompt(question).then(answers => {
    // answers 就是用户输入的内容，是个对象
    let { name, url } = answers;
    // 过滤 unicode 字符
    tplObj[name] = url.replace(/[\u0000-\u0019]/g, '')
    // 把模板信息写入 template.json 文件中
    fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', err => {
      if (err) console.log(err)
      console.log('\n')
      console.log(chalk.green('Added successfully!\n'))
      console.log(chalk.grey('The latest template list is: \n'))
      console.log(tplObj)
      console.log('\n')
    })
  })

```
### qfh-delete
```js
#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const tplObj = require(`${__dirname}/../template`)

let question = [
  {
    name: "name",
    message: "请输入要删除的模板名称",
    validate (val) {
      if (val === '') {
        return 'Name is required!'
      } else if (!tplObj[val]) {
        return 'Template does not exist!'
      } else  {
        return true
      }
    }
  }
]

inquirer
  .prompt(question).then(answers => {
    let { name } = answers;
    delete tplObj[name]
    // 更新 template.json 文件
    fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', err => {
      if (err) console.log(err)
      console.log('\n')
      console.log(chalk.green('Deleted successfully!\n'))
      console.log(chalk.grey('The latest template list is: \n'))
      console.log(tplObj)
      console.log('\n')
    })
  })

```
### qfh-list
```js
#!/usr/bin/env node

const tplObj = require(`${__dirname}/../template`)
console.log(tplObj)
```
### qfh-init
```js
#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const tplObj = require(`${__dirname}/../template`)

program
  .usage('<template-name> [project-name]')
program.parse(process.argv)
// 当没有输入参数的时候给个提示
if (program.args.length < 1) return program.help()

// 好比 vue init webpack project-name 的命令一样，第一个参数是 webpack，第二个参数是 project-name
let templateName = program.args[0]
let projectName = program.args[1]
// 小小校验一下参数
if (!tplObj[templateName]) {
  console.log(chalk.red('\n Template does not exit! \n '))
  return
}
if (!projectName) {
  console.log(chalk.red('\n Project should not be empty! \n '))
  return
}

url = tplObj[templateName]

console.log(chalk.white('\n Start generating... \n'))
// 出现加载图标
const spinner = ora("Downloading...");
spinner.start();
// 执行下载方法并传入参数
download (
  url,
  projectName,
  err => {
    if (err) {
      spinner.fail();
      console.log(chalk.red(`Generation failed. ${err}`))
      return
    }
    // 结束加载图标
    spinner.succeed();
    console.log(chalk.green('\n Generation completed!'))
    console.log('\n To get started')
    console.log(`\n    cd ${projectName} \n`)
  }
)

```
## 发布到 npm
既然以上命令都执行成功了，那接下来我们就把它发布到 npm 上吧（写都写了，不能浪费😬）。

删除 test 文件夹，它就本地测试用的，用完就抛弃它（当然做人不能这样）
在根目录下新建 README.md 文件，随便写点使用说明，假装正经一下
在根目录下新建 .npmignore 文件，并写入     /node_modules，意思就是发布的时候忽略 node_modules 文件夹，
去 npm 官网注册个账号（很简单的），同时搜索一下 qfh-cli 这个名字，看看有没有人用，有的话就换一个罗
```
devue@devue-System-Product-Name:~/myItem/qfh-cli$ npm login
Username: qiufeihong
Password: 
Email: (this IS public) qiufeihong2018@126.com
Logged in as qiufeihong on https://registry.npmjs.org/.

┌─────────────────────────────────────────────────────────┐
│                 npm update check failed                 │
│           Try running with sudo or get access           │
│          to the local update config store via           │
│ sudo chown -R $USER:$(id -gn $USER) /home/devue/.config │
└─────────────────────────────────────────────────────────┘
```
现在让我们回到项目根目录，执行 npm login 登入 npm 账号，再执行 npm publish 发布，就像下面这样：


```
devue@devue-System-Product-Name:~/myItem/qfh-cli$ npm publish
npm notice 
npm notice 📦  qfh-cli@1.0.0
npm notice === Tarball Contents === 
npm notice 587B  package.json  
npm notice 701B  README.md     
npm notice 2B    template.json 
npm notice 452B  bin/qfh       
npm notice 1.4kB bin/qfh-add   
npm notice 934B  bin/qfh-delete
npm notice 1.4kB bin/qfh-init  
npm notice 91B   bin/qfh-list  
npm notice === Tarball Details === 
npm notice name:          qfh-cli                                 
npm notice version:       1.0.0                                   
npm notice package size:  2.5 kB                                  
npm notice unpacked size: 5.6 kB                                  
npm notice shasum:        8e754fca31670d3356ca8e8b6442457c5167590a
npm notice integrity:     sha512-VoLQxFClO6eQk[...]SnjrIcZOjOX6w==
npm notice total files:   8                                       
npm notice 
+ qfh-cli@1.0.0

┌─────────────────────────────────────────────────────────┐
│                 npm update check failed                 │
│           Try running with sudo or get access           │
│          to the local update config store via           │
│ sudo chown -R $USER:$(id -gn $USER) /home/devue/.config │
└─────────────────────────────────────────────────────────┘
```
## 验证
本地执行` sudo npm i qfh-cli -g`

成功：
```
devue@devue-System-Product-Name:~$ sudo npm i qfh-cli -g
[sudo] password for devue: 
/usr/local/bin/qfh -> /usr/local/lib/node_modules/qfh-cli/bin/qfh
/usr/local/bin/qfh-delete -> /usr/local/lib/node_modules/qfh-cli/bin/qfh-delete
/usr/local/bin/qfh-add -> /usr/local/lib/node_modules/qfh-cli/bin/qfh-add
/usr/local/bin/qfh-init -> /usr/local/lib/node_modules/qfh-cli/bin/qfh-init
/usr/local/bin/qfh-list -> /usr/local/lib/node_modules/qfh-cli/bin/qfh-list
+ qfh-cli@1.0.1
updated 1 package in 21.773s

```
## 结语
上面的操作只要你熟悉了几遍之后，再去看看 vue-cli 的源码结构，你就会有种拨开云雾见月明的感觉（它只是比我们这个脚手架完善很多很多很多而已😭😭😭）。
当然了，这只是渣渣版本。你可以往里面添加更多的东西，比如自动化构建和动态模板啊（其实动态模板是个大头），然后尝试写下更多更好的交互和功能，这样你就也能拥有一个属于自己的脚手架啦

## 参考文献
[仿 vue-cli 搭建属于自己的脚手架](https://juejin.im/post/5c94fef7f265da60fd0c15e8#heading-13)

[commander](https://github.com/tj/commander.js)

[inquirer](https://github.com/SBoudrias/Inquirer.js)

[chalk](https://github.com/chalk/chalk)

[ora](https://github.com/sindresorhus/ora)

[download-git-repo](https://github.com/flipxfx/download-git-repo)



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>