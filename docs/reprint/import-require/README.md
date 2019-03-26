# 关于require与import的区别

## 区别
选项|require|import
--|--|--
遵循规范|AMD规范|ES6语法标准
调用时间|运行时调用|编译时调用
本质|赋值过程|解构过程，import语法会被转码为require
加载方式|同步加载|异步加载

## require和exports的写法

```js
const a=require('a')
exports.a=a
module.exports=a
```
## import和export的写法
```js
import a from 'a'
import {bb as a} from 'a'
import * as a from 'a'
import {a} from 'a'
import a,{b} from 'a'

export default a
export const a
export function a
export {a,bb}
export * from 'a'
```
## 注意点

`import()`加载模块成功以后，这个模块会作为一个对象，当作`then`方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。

```javascript
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
```

上面代码中，`export1`和`export2`都是`myModule.js`的输出接口，可以解构获得。

如果模块有`default`输出接口，可以用参数直接获得。

```javascript
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});
```

上面的代码也可以使用具名输入的形式。

```javascript
import('./myModule.js')
.then(({default: theDefault}) => {
  console.log(theDefault);
});
```

如果想同时加载多个模块，可以采用下面的写法。

```javascript
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
```

`import()`也可以用在 async 函数之中。

```javascript
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();
```

## 参考文献
[关于import与require的区别](http://www.cnblogs.com/sunshq/p/7922182.html)
[ECMAScript 6 入门](http://es6.ruanyifeng.com/)
