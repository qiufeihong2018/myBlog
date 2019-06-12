# express项目集成mocha测试框架
Mocha（发音"摩卡"）诞生于2011年，是一个特征丰富的javascript测试框架,可以运行在node.js和浏览器上,使异步测试更简单和有趣。Mocha测试连续运行，允许灵活和准确的报告，同时将未捕获的异常映射到正确的测试用例。

## 测试框架

所谓"测试框架"，就是运行测试的工具。通过它，可以为JavaScript应用添加测试，从而保证代码的质量。

通常应用会有 单元测试(Unit tests) 和 功能测试(Functional tests)，复杂大型应用可能会有整合测试(Integration tests)。

其中：

1. 单元测试：关注应用中每个零部件的正常运转，防止后续修改影响之前的组件。
2. 功能测试：确保其整体表现符合预期，关注能否让用户正常使用。
3. 整合测试：确保单独运行正常的零部件整合到一起之后依然能正常运行。

开发人员主要关注单元测试，作为开发中的反馈。本文重点讨论的单元测试框架。

单元测试的好处：
1. 如果能通过单元测试，那么通过后续测试且软件整体正常运行的概率大大提高。
2. 单元测试发现的问题定位到细节，容易修改，节省时间。
3. 追踪问题变得更加方便。

### 选择单元测试框架
单元测试应该：简单，快速执行，清晰的错误报告。
测试框架基本上都做了同一件事儿：

1. 描述你要测试的东西
2. 对其进行测试
3. 判断是否符合预期
   
选择框架会考虑下面的点：

1. 断言(Assertions)：用于判断结果是否符合预期。有些框架需要单独的断言库。
2. 适合 TDD / BDD：是否适合 测试驱动型 / 行为驱动型 的测试风格。
3. 异步测试：有些框架对异步测试支持良好。
4. 使用的语言：大部分 js 测试框架使用 js。
5. 用于特定目的：每个框架可能会擅长处理不同的问题。
6. 社区是否活跃。
注：
1. TDD：测试驱动型的开发方式，先写测试代码，之后编写能通过测试的业务代码，可以不断的在能通过测试的情况下重构。
2. BDD：与 TDD 很相似，测试代码的风格是预期结果，更关注功能，看起来像需求文档。

其实都是先写测试代码，感觉BDD 风格更人性。

### 测试工具的类型
组合使用工具很常见，即使已选框架也能实现类似的功能

1. 提供测试框架(Mocha, Jasmine, Jest, Cucumber)
2. 提供断言(Chai, Jasmine, Jest, Unexpected)
3. 生成，展示测试结果(Mocha, Jasmine, Jest, Karma)
4. 快照测试(Jest, Ava)
5. 提供仿真(Sinon, Jasmine, enzyme, Jest, testdouble)
6. 生成测试覆盖率报告(Istanbul, Jest, Blanket)
7. 提供类浏览器环境(Protractor, Nightwatch, Phantom, Casper)

解释上面提到的点：
1. 测试框架，即组织你的测试，当前流行 BDD 的测试结构。
2. 快照测试(snapshot testing)，测试 UI 或数据结构是否和之前完全一致，通常 UI 测试不在单元测试中
3. 仿真(mocks, spies, and stubs)：获取方法的调用信息，模拟方法，模块，甚至服务器

### 各框架特点
- Jest
  - facebook 坐庄
  - 基于 Jasmine 至今已经做了大量修改添加了很多特性
  - 开箱即用配置少，API简单
  - 支持断言和仿真
  - 支持快照测试
  - 在隔离环境下测试
  - 互动模式选择要测试的模块
  - 优雅的测试覆盖率报告，基于Istanbul
  - 智能并行测试(参考)
  - 较新，社区不十分成熟
  - 全局环境，比如 describe 不需要引入直接用
  - 较多用于 React 项目(但广泛支持各种项目)
- Mocha
  - 灵活(不包括断言和仿真，自己选对应工具)
  - 流行的选择：chai，sinon
  - 社区成熟用的人多，测试各种东西社区都有示例
  - 需要较多配置
  - 可以使用快照测试，但依然需要额外配置
- Jasmine

开箱即用(支持断言和仿真)
全局环境
比较'老',坑基本都有人踩过了
AVA
异步，性能好
简约，清晰
快照测试和断言需要三方支持
Tape
体积最小，只提供最关键的东西
对比其他框架，只提供最底层的 API
总结一下，Mocha 用的人最多，社区最成熟，灵活，可配置性强易拓展，Jest 开箱即用，里边啥都有提供全面的方案，Tape 最精简，提供最基础的东西最底层的API。
## 特征

1. 浏览器支持
2. 全局变量泄漏检测
3. 简单异步支持,包括promise
4. 可以选择运行与regexp匹配的测试
5. 测试覆盖率报告
6. 自动退出以防止活动循环“挂起”
7. 字符串差异支持
8. 易于元生成套件和测试用例
9. 用于运行测试的javascript API
10. 配置文件支持
11. CI支持等的正确退出状态
12. mocha.opts文件支持
13. 自动检测和禁用非tty的着色
14. 可单击套件标题以筛选测试执行
15. 将未捕获的异常映射到正确的测试用例
16. 节点调试器支持
17. 异步测试超时支持
18. 检测多个要完成的调用
19. 测试重试支持
20. 测试特定超时
21. 咆哮支持
22. 报告测试持续时间
23. 突出显示慢速测试
24. 文件监视程序支持
25. 使用所需的任何断言库
26. extensible reporting, bundled with 9+ reporters
27. 可扩展测试DSL或“接口”
28. 每个钩子之前、之后、所有钩子之前、之后
29. 任意蒸腾器支持（coffee-script 等）
30. TextMate bundle



## 其他
### 断言库should
Mocha本身是不包含断言库的，所以我们需要自己选择断言库。should是一个很简单的、贴近自然语言的断言库。当然，Mocha是适配所有的断言库的，如果你喜欢其他的断言库比如expect之类的，你也可以把它包含进来使用。
### SuperTest
单单使用Mocha和should就几乎可以满足所有JavaScript函数的单元测试。但是对于Node应用而言，不仅仅是函数的集合，比如一个web应用的测试。这时候就需要配合一个http代理，完成Http请求和路由的测试。
Supertest是一个HTTP代理服务引擎，可以模拟一切HTTP请求行为。Supertest可以搭配任意的应用框架，从而进行应用的单元测试。

## 官网
> 安装mocha> = v3.0.0，npm的版本应该> = v2.14.2。除此，确保使用Node.js的版本> = v4来运行mocha
### 安装
作为项目的依赖进行安装
```bash
npm install --save-dev mocha
```

describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"加法函数的测试"），第二个参数是一个实际执行的函数。

it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"1 加 1 应该等于 2"），第二个参数是一个实际执行的函数。
### 开始

```bash
mkdir test
cd test
touch test.js
```
加入测试代码

```javascript
'use strict'
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return 0 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(1), 1);
    });
  });
});
```
安装依赖
```bash
npm install --save-dev assert
```
执行测试
```bash
./node_modules/mocha/bin/mocha
```

报错结果
```bash

  Array
    #indexOf()
      1) should return 0 when the value is not present


  0 passing (5ms)
  1 failing

  1) Array
       #indexOf()
         should return 0 when the value is not present:

      AssertionError [ERR_ASSERTION]: 0 == 1
      + expected - actual

      -0
      +1
      
      at Context.<anonymous> (test/test.js:6:14)

```
package.json中写入命令
```bash
  "mocha": "mocha"
```
执行命令
```bash
npm run mocha
```

正确测试
```javascript
'use strict'
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return 0 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(1), 0);
    });
  });
});
```
正确结果
```bash
 Array
    #indexOf()
      ✓ should return 0 when the value is not present


  1 passing (4ms)
```
### 检测到多个呼叫
如果使用基于回调的异步测试，如果done()多次调用Mocha，则会抛出错误。这对于捕获意外的双重回调非常方便。
```javascript
'use strict'
var assert = require('assert');
it('double done', function (done) {
  setImmediate(done)
  setImmediate(done)
})
```

结果
```bash
  ✓ double done
  1) double done

  1 passing (4ms)
  1 failing

  1) double done:
     Error: done() called multiple times
```

### 断言
mocha允许你使用任意你喜欢的断言库，在上面的例子中，我们使用了Node.js的内置的断言模块作为断言。如果能够抛出一个错误，它就能够运行。这意味着你能使用下面的这些仓库，比如：
1. should.js - BDD风格贯穿始终
2. expect.js - expect()样式断言
3. chai - expect()，assert()和should风格的断言
4. better-assert - C风格的自文档化的assert()
5. unexpected - “可扩展的BDD断言工具”

### 异步代码
使用Mocha测试异步代码并不简单！只需在测试完成后调用回调。通过添加一个回调（通常命名done）it()，Mocha将知道它应该等待调用此函数来完成测试。此回调接受Error实例（或其子类）或伪值; 其他任何事情都会导致测试失败。
```javascript
class User{
  constructor(name){
    this.name=name
  }
  save(){
    console.log('12312')
  }
}
'use strict'
var assert = require('assert');
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(function(err) {
        if (err) done(err);
        else done();
      });
    });
  });
});
```
### 使用承诺
或者，done()您可以返回Promise，而不是使用回调。如果您正在测试的API返回promises而不是回调，这将非常有用：
```javascript
beforeEach(function() {
  return db.clear()
    .then(function() {
      return db.save([tobi, loki, jane]);
    });
});

describe('#find()', function() {
  it('respond with matching records', function() {
    return db.find({ type: 'User' }).should.eventually.have.length(3);
  });
});
```
在Mocha v3.0.0及更新版本中，返回a Promise 和调用done()将导致异常，因为这通常是一个错误：
```javascript
const assert = require('assert');

it('should complete this test', function (done) {
  return new Promise(function (resolve) {
    assert.ok(true);
    resolve();
  })
    .then(done);
});
```
上述测试将失败Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.。在v3.0.0之前的版本中，done()有效地忽略了调用。

```javascript
beforeEach(async function() {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe('#find()', function() {
  it('responds with matching records', async function() {
    const users = await db.find({ type: 'User' });
    users.should.have.length(3);
  });
});
```

### 同步代码
在测试同步代码时，省略回调，Mocha将自动继续进行下一次测试。
```javascript
let should=require('should')
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    });
  });
});
```
### 箭头功能
不鼓励将箭头函数（“lambdas”）传递给Mocha。Lambdas词法绑定this，无法访问Mocha上下文。例如，以下代码将失败：

如果您不需要使用 Mocha的上下文，lambdas应该可以工作。但是，如果最终需要，结果将更难以重构。

### 钩
其默认“BDD”式接口，mocha提供钩before()，after()，beforeEach()，和afterEach()。这些应该用于设置前置条件并在测试后进行清理。

测试可以在钩子之前，之后或穿插时出现。钩子将按其定义的顺序运行，视情况而定; 所有before()钩子运行（一次），然后任何beforeEach()钩子，测试，任何afterEach()钩子，最后after()钩子（一次）。
### 描述钩子
可以使用可选描述调用任何挂钩，从而更容易查明测试中的错误。如果为钩子指定了一个命名函数，则在没有提供描述的情况下将使用该名称。

### 异步挂钩
所有的钩子（before()，after()，beforeEach()，afterEach()）可以是同步或异步为好，表现就像一个常规的测试用例。例如，您可能希望在每次测试之前使用虚拟内容填充数据库：


### 根级挂钩
您也可以选择任何文件并添加“root”级别挂钩。例如，beforeEach()在所有describe()块之外添加。这将导致回调beforeEach()在任何测试用例之前运行，无论它存在于哪个文件中（这是因为Mocha有一个隐含的 describe()块，称为“根套件”）。

### 延迟根套件
如果您需要在运行任何套件之前执行异步操作，则可能会延迟根套件。mocha用--delay旗帜运行。这将附加一个特殊的回调函数run()，到全局上下文：

### 待测试
“待定” - 在“有人应该最终编写这些测试用例”中 - 测试用例只是没有回调的情况：

待测试将包含在测试结果中，并标记为待定。待定测试不被视为失败测试。


### 独家测试
排他性功能允许您通过附加到函数来仅运行指定的套件或测试用例.only()。这是仅执行特定套件的示例：

注意：仍将执行所有嵌套套件。

以下是执行单个测试用例的示例：
在v3.0.0之前，.only()使用字符串匹配来决定执行哪些测试。从v3.0.0开始，情况就不再如此。在v3.0.0或更高版本中，.only()可以多次使用来定义要运行的测试子集：
您也可以选择多个套房：
但测试将优先：
注意：钩子（如果存在）仍将执行。

注意不要使用.only()版本控制的用法，除非你真的是这个意思！为此，可以使用--forbid-only持续集成测试命令（或git precommit hook）中的选项运行mocha 。
### 包容性测试
此功能与之相反.only()。通过附加.skip()，您可以告诉Mocha简单地忽略这些套件和测试用例。跳过的任何内容都将被标记为待处理，并按此报告。这是跳过整个套件的示例：

最佳实践：使用.skip()而不是评论测试。

您也可以在运行时跳过使用this.skip()。如果测试需要预先无法检测到的环境或配置，则运行时跳过是合适的。例如：

上述测试将报告为待定。同样重要的是要注意调用this.skip()将有效中止测试。

Best practice: To avoid confusion, do not execute further instructions in a test or hook after calling this.skip().

Contrast the above test with the following code:
### RETRY TESTS
### DYNAMICALLY GENERATING TESTS

鉴于Mocha使用Function.prototype.call和函数表达式来定义套件和测试用例，因此可以直接动态生成测试。不需要特殊的语法 - 普通的'JavaScript'可用于实现类似于“参数化”测试的功能，您可能已经在其他框架中看到过。


### 测试持续时间

许多记者将显示测试持续时间，以及标记缓慢的测试，如“spec”记者所示：
### 超时
套房级
套件级超时可应用于整个测试“套件”，或通过其禁用this.timeout(0)。这将由所有嵌套套件和不覆盖该值的测试用例继承。


测试级别
也可以应用特定于测试的超时，或者this.timeout(0)一起使用以禁用超时：

胡克级
也可以应用挂钩级别超时：


### 
### 
### 
### 



## 参考文献
[mocha官网](https://mochajs.org/)

[测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)

[前端测试框架对比(js单元测试框架对比)](https://www.cnblogs.com/lihuanqing/p/8533552.html)

[mocha 和 supertest](https://github.com/nswbmw/N-blog/blob/master/book/4.14%20%E6%B5%8B%E8%AF%95.md#4141-mocha-%E5%92%8C-supertest)

[使用mocha给mongoose写单元测试](http://ju.outofmemory.cn/entry/86908)

[nodejs使用mocha进行接口测试](https://blog.csdn.net/weixin_34308389/article/details/87441278)

[node中使用 mocha + supertest + should 来写单元测试](https://github.com/xiyuyizhi/movies/blob/master/dayByday/day5.md)

[【Node开发笔记】单元测试工具Mocha和SuperTest](https://www.imooc.com/article/2631)

[一步一步搭建react应用-node中使用 mocha + supertest + should 来写单元测试](https://segmentfault.com/a/1190000011095213)

[mocha + chai + supertest 测试 node server](https://webfem.com/post/mocha-test)