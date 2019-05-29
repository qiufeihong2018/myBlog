# 基于TypeScript从零重构axios

## 课程介绍
### TypeScript常用语法
- 基础类型
- 变量申明
- 接口
- 类
- 函数
- 泛型
- 类型推新
- 高级类型
  
### axios js库抽丝剥茧
- 项目脚手架
- 基础功能实现
- 异常情况处理
- 接口扩展
- 拦截器实现
- 配置化实现
- 取消功能实现
- 更多功能实现

### 前端工具运用
- [Jest](https://jestjs.io/docs/en/getting-started) facebook推出的js测试框架
- [Commitizen](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html) 是一个撰写合格 Commit message 的工具
- [RollupJS](https://www.rollupjs.com/guide/zh) 是一个 JavaScript 模块打包器
- TSLint 代码风格统一
- Prettier 格式化代码
- [Semantic release](https://www.npmjs.com/package/semantic-release) 完全自动化的版本管理和包发布


## 初识TypeScript
### 安装TypeScript

安装-查看版本

```bash
sudo npm install -g typescript
tsc -V
```
![avatar](../public/tsc1.png)

### 编写第一个程序
类型检查
1. 案例一: 数据类型错误
```typescript
function greeter(person:string) {
    return 'hello ' + person
}
let user = 1231
console.log(greeter(user))
```
虽然报错,但是还是会编译出greeter.js
```bash
devue@devue-System-Product-Name:~/myItem/vuepress-blog/examples$ tsc greeter.ts 
greeter.ts:5:21 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.

5 console.log(greeter(user))
                      ~~~~


Found 1 error.
```

2. 案例二: 有接口

greeter.ts
```typescript
interface Person {
    name: string,
        age: number
}

function greeter(person: Person) {
    return `hello ${person.name} ${person.age}`
}
let user = {
    name: 'qfh',
    age: 24
}
console.log(greeter(user))
```

编译好后的greeter.js
```javascript
function greeter(person) {
    return "hello " + person.name + " " + person.age;
}
var user = {
    name: 'qfh',
    age: 24
};
console.log(greeter(user));//hello qfh 24

```

3. 案例三: 有类
```typescript
// 类
class User {
    name: string
    age: number
    total: string
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
        this.total = this.name + this.age
        console.log(this.total)
    }
}
// 接口
interface Person {
    name: string,
        age: number
}

function greeter(person: Person) {
    return `hello ${person.name} ${person.age}`
}

// 实例化对象
const user = new User('qfh', 24)
console.log(greeter(user))
```
编译后的js,原来就是将类改写成方法,返回值
```javascript
// 类
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
        this.total = this.name + this.age;
        console.log(this.total);//qfh24
    }
    return User;
}());
function greeter(person) {
    return "hello " + person.name + " " + person.age;
}
// 实例化对象
var user = new User('qfh', 24);
console.log(greeter(user));//hello qfh 24

```

## TypeScript类型系统
### 基础类型
- boolean
- string
- number
- array
- any
- void
- null
- undefined
- nerver
- object 
