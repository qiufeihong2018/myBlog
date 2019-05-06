# Javascript 设计模式系统讲解与应用
> Javascript设计模式系统讲解与应用
从“写好代码”到“设计代码”的过程，不仅是技术的提升，更是编程思维的提升，而这其中最关键的就是设计模式，是否理解并掌握设计模式，也是衡量程序员能力的标准之一

## 设计模式不虚幻，一个案例带你看清它的具体应用

> 学习前考虑

操作DOM / 绑定事件 / 发送请求

> 学习后考虑

面向对象 / 设计模式 / 合理性和扩展性

> 使用jQuery，而不是Vue或React，完成一个购物车demo，因为Vue
和React封装了很多东西，不利于你理解设计模式，这是讲
师为讲解“前端设计模式”而精心设计的案例 

- 工厂模式

创建商品实例

- 单例模式

购物车

- 装饰器模式

Log（点击按钮日志打点）

- 代理模式

优惠商品打折（name有“优
惠”字样、price是原价的
80%）

- 观察者模式

事件监听 / Promise

- 状态模式

添加到购物车&从购物车删除

- 模版方法模式

渲染的方法统一成一个，里
面再分别写渲染不同部分的
代码

- 职责链模式

Promise多个then

## 导学
- 论工程师的设计能力
  - 3年工作经验，面试必考设计能力
  - 项目技术负责人，设计能力必要基础
  - 从写好代码到做好设计，设计模式是必经之路

- 困惑
  - 网上的资料-java
  - 看懂不会用
  - js框架应用于业务

- 课程概述
  - 做什么？-讲解js设计模式
  - 哪些部分？-面向对象，设计原则，设计模式
  - 技术？-面向对象，UML类图，ES6

- 知识点
  - 面向对象
    - ES6 
    - UML类图
  - 设计原则
    - 何为设计？
    - 5大设计原则
    - 从设计到模式
  - 设计模式
    - 分优先级
    - 核心技术
    - 框架应用


## 面向对象
### 搭建开发环境1

- 安装node/npm 
- 创建项目design-pattern-test
- 安装webpack/webpack-cli,借用淘宝npm镜像
```bash
npm install webpack webpack-cli --save-dev --registry=https://registry.npm.taobao.org
npm init
```
生成package.json
- 创建src-index.js
- 创建webpack.dev.config.js
```json
module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "./release/bundle.js"
  }
};
```
- 添加dev，在开发模式下，用webpack的配置去运行webpack.dev.config.js，执行`npm run dev`
```json
{
  "name": "design-pattern-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev":"webpack --config ./webpack.dev.config.js --mode development"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.30.0",
    "webpack-cli": "^3.3.2"
  }
}

```

- 最后的项目架构
``` 
.
├── package.json
├── package-lock.json
├── release
│   └── bundle.js
├── src
│   └── index.js
└── webpack.dev.config.js
```

### 搭建开发环境2
- 安装webpack-dev-server html-webpack-plugin
```bash
npm install webpack-dev-server html-webpack-plugin --save-dev --registry=https://registry.npm.taobao.org
```
- 创建index.html，！+tab生成html模板
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>qiufeihong前端设计模式</title>
</head>
<body>
    <p>qiufeihong前端设计模式</p>    
</body>
</html>
```
- webpack.dev.config.js添加html模板,并且进行服务器配置
```json
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "./release/bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  devServer: {
    // contextBase: path.join(__dirname, "./release"),默认来自于根目录
    open: true, //自动打开浏览器
    port: 2000,
    hot: true //开启热更新
  }
};
module.exports = config;

```
- webpack-dev-server启动项目，npm run dev 
```json
{
  "name": "design-pattern-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --config ./webpack.dev.config.js --mode development"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.30.0",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.3.1"
  }
}

```

- 最后的项目架构

```
.
├── index.html
├── package.json
├── package-lock.json
├── release
│   └── bundle.js
├── src
│   └── index.js
└── webpack.dev.config.js
```
### 搭建开发环境3
- 安装`babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-latest`
```bash
npm install babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-latest --save-dev --registry=https://registry.npm.taobao.org
```
- 创建.babelrc
```json
{
    "presets":["es2015","latest"],
    "plugins":[]
}
```
- 增加module
```json
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "./release/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  devServer: {
    // contextBase: path.join(__dirname, "./release"),默认来自于根目录
    open: true, //自动打开浏览器
    port: 2000,
    hot: true //开启热更新
  }
};
module.exports = config;

```
- 增加ES6， `npm run dev`
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
let p = new Person("qiufeihong");
alert(p.getName());

```
### 什么是面向对象
1. 概念
类/对象（实例）
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    alert(`我是${this.name}`);
  }
  speak() {
    alert(`今年${this.age}`);
  }
}

let qiu = new Person("qiu", 12);
qiu.eat();
qiu.speak();
let wang = new Person("wang", 123);
wang.eat();
wang.speak();

```
2. 三要素
- 继承，子类继承父类
- 封装,数据的权限和保密
- 多态，同一接口不同实现

### 继承
- 父类是公共的
- 可以抽离复用的代码，减轻冗余
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    alert(`我是${this.name}`);
  }
  speak() {
    alert(`今年${this.age}`);
  }
}

class Student extends Person {
  constructor(name, age, number) {
    super(name, age);
    this.number = number;
  }
  study() {
    alert(`${this.name}在学习`);
  }
}
let qiu = new Student("qiu", 12, "1213vfzad");
qiu.eat();
alert(qiu.number);
qiu.speak();
qiu.study();
let wang = new Student("wang", 123, "232dfafd");
wang.eat();
alert(qiu.number);
wang.speak();
wang.study();

```
### 封装
- public 完全开放
- protected 对子类开放
- private 对自己开放
- （ES6尚不支持，typesript可以）