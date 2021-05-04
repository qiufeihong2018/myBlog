# Element源码分析——工具函数2
## 判断字符串
```js
function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
}
```
## 判断对象
```js
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
```
## 判断dom节点
```js
function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}
```
## 判断函数
```js
const isFunction = (functionToCheck) => {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};
```
## 判断undefined
```js
const isUndefined = (val)=> {
  return val === void 0;
};
```
## 判断defined
```js
const isDefined = (val) => {
  return val !== undefined && val !== null;
};
```