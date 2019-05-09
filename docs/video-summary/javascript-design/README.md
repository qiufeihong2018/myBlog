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
1. 减少耦合，不该外露的不外露
2. 利于数据/接口的权限管理
3. ES6目前不支持，一般认为_开头的属性是private
支持变量声明
[TypeScript](https://www.tslang.cn/play/index.html)

### 多态
- 同一接口，不同表现
- js应用极少
- 需要结合java等语言的接口/重写/重载等功能
1. 保持子类的开放性和灵活性
2. 面向接口编程

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}
class A extends Person {
  constructor(name) {
    super(name)
    this.name=name
  }
  getName() {
    alert(`我是a${this.name}`)
  }
}
class B extends Person {
  constructor(name) {
    super(name)
    this.name=name
  }
  getName() {
    alert(`我是b${this.name}`)
  }
}

const a = new A('a')
a.getName()

const b = new B('b')
b.getName()
```

### 应用举例
- jQuery就是一个class
- $('p')就是一个实例
- jQuery就是面向对象实现的
```javascript
class jquery {
  constructor(selector) {
    let slice = Array.prototype.slice //抽取当前数组中的一段元素组合成一个新数组。
    let dom = slice.call(document.querySelectorAll(selector)) //返回与指定的选择器匹配的文档中的元素列表，变成数组
    let len = dom ? dom.length : 0
    for (let i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }
  append(node) {
    // ...
  }
  addClass(name) {
    // ...
  }
  html(data) {
    // ...
  }
  // 省略
}

window.$ = function (selector) {
  return new jquery(selector)
}

var p = $('p')
console.log(p)
console.log(p.append())
console.log(p.addClass())

```

### 为何使用面向对象
- 程序执行：顺序/判断/循环——结构化
- 面向对象——数据结构化
- 对于计算机来说，结构化的才是最简单的
- 编程应该简单和抽象

### UML类图
- 统一建模语言
- 类图
- 关系——泛化和关联
- 代码和类图结合

## 设计原则
### 何为设计
- 描述
  - 按照一种思路或者标准来实现功能
  - 不同方案实现相同功能
  - 随着需求的增加，设计的作用才能体现出来
- 结合《unix/linux设计哲学》
  - 大准则
    - 准则1：小即是美
    - 准则2：让每个程序只做好一件事
    - 准则3：快速建立模型
    - 准则4：舍弃高效率而取可移植性
    - 准则5：采用纯文本来存储数据
    - 准则6：充分利用软件的杠杆效应（软件复用）
    - 准则7：使用shell脚本来提高杠杆效应和可移植性
    - 准则8：避免强制性的用户界面
    - 准则9：让每个程序都称为过滤器
  - 小准则
    - 允许用户定制环境
    - 尽量使操作系统内核小而轻量化
    - 使用小写字母并尽量简短
    - 沉默是金
    - 各部分之和大于整体
    - 寻求90%的解决方案

linux的每个命令都是通过程序运行的

准则2：让每个程序只做好一件事+准则9：让每个程序都称为过滤器
```bash
ls | grep *.js | grep 'webpack'
```

SOLID五大设计原则
1. S-单一职责原则
- 一个程序只做一件事情
- 如果功能过于复杂则拆分
2. O-开放封闭原则
- 对扩展开放，对修改封闭
- 增加需求时，扩展新代码，而非修改已有代码
- 这是软件设计的终极目标
3. L-李氏置换原则
- 子类能覆盖父类
- 父类能出现的地方子类就能出现
- js中使用较少
4. I-接口独立原则
- 保持接口的单一独立，避免出现“胖接口”
- js中没有接口
- 类似于单一原则
5. D-依赖导致原则
- 依赖于抽象而不是具体
- 使用方只关注接口而不关注具体类的实现
- js中使用较少

promise实现SO原则
- 每个then只做一件事情
- 如果要增加需求,只要增加then即可
```javascript
function loadImg(src) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement('img')
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject('error')
    }
    img.src = src
  })
}
let src = 'https://avatars1.githubusercontent.com/u/12479470?s=460&v=4'
let res = loadImg(src)
res.then(function (img) {
  alert(`img's height:${img.height}`)
  return img
}).then(function (img) {
  alert(`img's width:${img.width}`)
  return img
}).then(function(img){
  alert(img.src)
}).catch(function (ex) {
  alert(`errorrrrr${ex}`)
})


```

### 从设计到模式
1. 创建型(5)
- 工厂模式
  - 工厂方法模式
  - 抽象工厂模式
  - 建造者模式
- 单例模式
- 原型模式

2. 结构型(7)
- 适配器模式
- 装饰器模式
- 代理模式
- 外观模式
- 桥接模式
- 组合模式
- 享元模式

3. 行为型(11)
- 策略模式
- 模板方法模式
- 观察者模式(js watch)
- 迭代器模式(ES6)
- 职责连模式
- 命令模式
- 备忘录模式
- 状态模式
- 访问者模式
- 中介者模式
- 解释器模式

### 面试题示例
#### 第一题
1. 打车时,可以打专车或者快车,任何车都有车牌号和名称
2. 不同车价格不同,快车每公里1元,专车每公里2元
3. 行程开始时,显示车辆信息
4. 行车结束时,显示打车金额(假定行程就5公里)
问题:
- 画出UML类图
- 用ES6语法写出该示例

我的版本:
![avatar](../public/UML.jpg)
```javascript
class car {
  constructor(name, id) {
    this.name = name
    this.id = id
  }
  start() {
    alert(`我在乘坐${this.name},车牌是${this.id}`)
  }
  end(){}
}

class quickCar extends car {
  constructor(name, id, free, length) {
    super(name, id)
    this.total = free * length
  }
  end() {
    alert(`费用是${this.total}`)
  }
}

class specialCar extends car {
  constructor(name, id, free, length) {
    super(name, id)
    this.total = free * length
  }
  end() {
    alert(`费用是${this.total}`)
  }
}

const qCar = new quickCar('aodi', '23423dfasdfasd', 1, 5)
qCar.start()
qCar.end()
const sCar = new specialCar('benchi', '2fdssd', 2, 5)
sCar.start()
sCar.end()
```


#### 第二题
1. 某停车场,分3层,每层100车位
2. 每个车位都能监控到车辆的驶入和离开
3. 车辆进入前,显示每层的空余车位数量
4. 车辆进入时,摄像头可识别车牌号和时间
5. 车辆出来时,出口显示器显示车牌号和停车时长

问题
- 画出UML类图
- 编码
![avatar](../public/UML2.jpg)

## 材料
[《unix/linux设计哲学》](https://pan.baidu.com/s/1V0caTE3kge-uG6jtNhA0ow)

链接: https://pan.baidu.com/s/1V0caTE3kge-uG6jtNhA0ow 提取码: bup5 复制这段内容后打开百度网盘手机App，操作更方便哦