# ESLint
[[toc]]

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
