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




## 官网
> 安装mocha> = v3.0.0，npm的版本应该> = v2.14.2。除此，确保使用Node.js的版本> = v4来运行mocha
### 安装
作为项目的依赖进行安装
```bash
npm install --save-dev mocha
```

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



## 参考文献
[mocha官网](https://mochajs.org/)

[测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)

[前端测试框架对比(js单元测试框架对比)](https://www.cnblogs.com/lihuanqing/p/8533552.html)