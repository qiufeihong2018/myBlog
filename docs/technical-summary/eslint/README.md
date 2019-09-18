# ESLint
[[toc]]

## eslint在express中的配置

```js
module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    "describe": true,
    "beforeEach": true,
    "afterEach": true,
    "after": true,
    "it": true,
    "should": true
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'no-console': 0,//关闭console
    'linebreak-style': [
      'error',
      'unix'
    ],//换行风格
    'accessor-pairs': 'error',//禁止在对象中使用getter/setter
    'array-callback-return': 'error',//检查回调函数return用法
    'arrow-parens': ['error', 'always'],//箭头函数用小括号括起来
    'arrow-spacing': ['error', { before: true, after: true }],
    'block-spacing': 'error',//打开的块标记内强制执行一致的间距
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],//大括号风格要求
    'comma-dangle': ['error', 'only-multiline'],//对象字面量项尾不能有逗号
    'comma-spacing': 'error',//逗号前后的空格
    'comma-style': 'error',//逗号风格，换行时在行首还是行尾
    'computed-property-spacing': 'error',//是否允许计算后的键名什么的
    'constructor-super': 'error',//非派生类不能调用super，派生类必须调用super
    'dot-location': ['error', 'property'],//对象访问符的位置，换行的时候在行首还是行尾
    'dot-notation': 'error',//避免不必要的方括号
    'eol-last': 'error',//文件以单一的换行符结束
    'eqeqeq': ['error', 'smart'],//必须使用全等
    'for-direction': 'error',//禁止出现死循环
    'func-call-spacing': 'error',//要求或禁止函数标识符与其调用之间的间距
    'func-name-matching': 'error',//要求函数名称与它们所分配的变量或属性的名称相匹配
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],//函数风格，规定只能使用函数声明/函数表达式
    'getter-return': 'error',//强制在属性getter中出现return语句
    'indent': ['error', 2, {//缩进风格
      ArrayExpression: 'first',
      CallExpression: { arguments: 'first' },
      FunctionDeclaration: { parameters: 'first' },
      FunctionExpression: { parameters: 'first' },
      MemberExpression: 'off',
      ObjectExpression: 'first',
      SwitchCase: 1,
    }],
    'key-spacing': ['error', { mode: 'strict' }],//对象字面量中冒号的前后空格
    'keyword-spacing': 'error',//在关键字之前和之后强制使用一致的间距
    'linebreak-style': ['error', 'unix'],//使用一致的换行符
    'max-len': ['error', {//字符串最大长度
      code: 100,
      ignorePattern: '^// Flags:',
      ignoreRegExpLiterals: true,
      ignoreUrls: true,
      tabWidth: 2,
    }],
    'new-parens': 'error',//new时必须加小括号
    'no-class-assign': 'error',//禁止修改类声明的变量
    'no-confusing-arrow': 'error',//禁止箭头功能，可能会比较混淆（
    'no-const-assign': 'error',//禁止修改使用const（no-const-assign）声明的变量
    'no-control-regex': 'error',//禁止正则表达式中的控制字符
    'no-debugger': 'error',//不允许使用debugger
    'no-delete-var': 'error',//禁止删除变量
    'no-dupe-args': 'error',//禁止function定义中的重复参数
    'no-dupe-class-members': 'error',//禁止在类成员中使用重复的名称
    'no-dupe-keys': 'error',//禁止对象文字中的重复键
    'no-duplicate-case': 'error',//禁止重复案件标签的规则
    'no-duplicate-imports': 'error',//禁止重复导入
    'no-empty-character-class': 'error',//禁止在正则表达式中使用空字符类
    'no-ex-assign': 'error',//禁止在catch条款中重新分配例外
    'no-extra-boolean-cast': 'error',//禁止不必要的布尔强制转换
    'no-extra-parens': ['error', 'functions'],//禁止不必要的括号
    'no-extra-semi': 'error',//禁止不必要的分号
    'no-fallthrough': 'error',//禁止案例声明
    'no-func-assign': 'error',//禁止重新分配function声明
    'no-global-assign': 'error',//禁止分配给本机对象或只读全局变量
    'no-invalid-regexp': 'error',//禁止RegExp构造函数中的无效正则表达式字符串
    'no-irregular-whitespace': 'error',//禁止不规则的空白
    'no-lonely-if': 'error',//禁止if语句作为else块中的唯一语句
    'no-misleading-character-class': 'error',//禁止在字符类语法中使用多个代码点生成的字符
    'no-mixed-requires': 'error',//禁止require调用与常规变量声明混合
    'no-mixed-spaces-and-tabs': 'error',//禁止使用混合空格和制表符进行缩进
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],//禁止多个空格
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0, maxBOF: 0 }],//禁止多个空行
    'no-new-require': 'error',//禁止新要求
    'no-new-symbol': 'error',//禁止符号构造函数
    'no-obj-calls': 'error',//禁止将全局对象属性调用为函数
    'no-octal': 'error',//禁止八进制文字
    'no-path-concat': 'error',//使用时禁止字符串连接__dirname和__filename
    'no-proto': 'error',//禁止使用__proto__
    'no-redeclare': 'error',//禁止变量重新声明
    'no-restricted-modules': ['error', 'sys'],//禁止Node.js模块

    /* eslint-enable max-len */
    'no-return-await': 'error',//不允许不必要的return await
    'no-self-assign': 'error',//禁止自我分配
    'no-self-compare': 'error',//禁止自我比较
    'no-tabs': 'error',//禁止所有标签
    'no-template-curly-in-string': 'error',//禁止使用常规字符串中的模板文字占位符语法
    'no-this-before-super': 'error',//在构造函数中调用之前不允许使用this/super
    'no-throw-literal': 'error',//限制可以作为异常抛出的内容
    'no-trailing-spaces': 'error',//禁止在行尾添加尾随空格
    'no-undef': ['error', { typeof: true }],//禁止未声明的变量
    'no-undef-init': 'error',//禁止初始化为未定义
    'no-unexpected-multiline': 'error',//禁止令人困惑的多线表达式
    'no-unreachable': 'error',//禁止可达代码return，throw，continue，和break语句
    'no-unsafe-finally': 'error',//禁止finally块中的控制流语句
    'no-unsafe-negation': 'error',//
    'no-unused-labels': 'error',//
    'no-unused-vars': ['error', { args: 'none', caughtErrors: 'all' }],//
    'no-use-before-define': ['error', {//
      classes: true,
      functions: false,
      variables: false,
    }],
    'no-useless-call': 'error',//
    'no-useless-catch': 'error',//
    'no-useless-concat': 'error',//
    'no-useless-constructor': 'error',//
    'no-useless-escape': 'error',//
    'no-useless-return': 'error',//
    'no-void': 'error',//
    'no-whitespace-before-property': 'error',//
    'no-with': 'error',//
    'object-curly-spacing': ['error', 'always'],//
    'one-var': ['error', { initialized: 'never' }],//
    'one-var-declaration-per-line': 'error',//
    'operator-linebreak': ['error', 'after'],//
    'prefer-const': ['error', { ignoreReadBeforeAssign: true }],//
    'quotes': ['error', 'single', { avoidEscape: true }],//
    'quote-props': ['error', 'consistent'],//
    'rest-spread-spacing': 'error',//
    'semi': 'error',//
    'semi-spacing': 'error',//
    'space-before-blocks': ['error', 'always'],//不以新行开始的块{前面要不要有空格
    'space-before-function-paren': ['error', {//函数定义时括号前面要不要有空格
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    'space-in-parens': ['error', 'never'],//小括号里面要不要有空格
    'space-infix-ops': 'error',//中缀操作符周围要不要有空格
    'space-unary-ops': 'error',//一元运算符的前/后要不要加空格
    'spaced-comment': ['error', 'always', {//注释风格要不要有空格什么的
      'block': { 'balanced': true },
      'exceptions': ['-'],
    }],
    'strict': ['error', 'global'],//使用严格模式
    'symbol-description': 'error',//需要符号描述
    'template-curly-spacing': 'error',//在模板字符串中强制使用间距
    'unicode-bom': 'error',//要求或禁止Unicode字节顺序标记
    'use-isnan': 'error',//禁止比较时使用NaN，只能用isNaN()
    'valid-typeof': 'error'//必须使用合法的typeof的值

    // Custom rules from eslint-plugin-node-core
    // 'node-core/no-unescaped-regexp-dot': 'error',
    // 'node-core/no-duplicate-requires': 'error'
  }
};
```
## ESLint报错解决方案

1. ESLint使用的时候报错：error: No ESLint configuration found
在项目部署中出现报错error: No ESLint configuration found，编辑器vscode。
2. 解决方案：
造成这种报错的原因是因为项目中缺少.eslintrc.js文件。添加上就可以了。
3. 添加.eslintrc.js文件方法：
手动添加，直接手动添加.eslintrc.js文件在项目中，并进行相应的配置就行了。
使用命令添加，如果eslint是全局安装的话，使用命令eslint --init安装。
4. 配置信息（简单版）
```
module.exports = {
“env”: {
“browser”: true,
“es6”: true,
“node”: true
},
“extends”: “eslint:recommended”,
“parserOptions”: {
“ecmaVersion”: 2015,
“sourceType”: “module”
},
“rules”: {
// 缩进
“indent”: [
“error”,
4 //我的是编辑器自动格式化，不是使用tabs，而是四个空格
],
“linebreak-style”: [
“error”,
“windows”
],
// 引号
“quotes”: [
1,
“single”
],
// 分号结尾
“semi”: [
“error”,
“always”
],
“no-unused-vars”: [2, {
// 允许声明未使用变量
“vars”: “local”,
// 参数不检查
“args”: “none”
}],
// 最大空行100
“no-multiple-empty-lines”: [0, { “max”: 100 }],
“no-mixed-spaces-and-tabs”: [0],
//不能使用console
“no-console”: ‘off’,
//未定义变量不能使用
“no-undef”: 0,
//一行结束后面不要有空格
“no-trailing-spaces”: 1,
//强制驼峰法命名
“camelcase”: 2,
//对象字面量项尾不能有逗号
“comma-dangle”: [2, “never”],
//this别名
“consistent-this”: [2, “that”],
}
};
```

::: tip
"no-undef": 0,和"no-undef": 'off',一样，表示关闭该功能
"no-undef": 1, 表示仅提示
"no-undef": 2, 表示报错
:::



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>