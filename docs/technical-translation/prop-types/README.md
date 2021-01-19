# 【Github】prop-types包的一些说明
`react props`和相似对象的运行时类型检查器

您可以使用`prop-type`来记录传递给组件的属性的预期类型。React(以及其他潜在的库——参见下面的`checkPropTypes()`引用)将根据这些定义检查传递给组件的`prop`，如果它们不匹配，将在开发过程中发出警告。
## 安装
```
npm install --save prop-types
```
## 导入
```
<!--ES6-->
import PropTypes from 'prop-types'
<!--ES5-->
var PropTypes=require('prop-types')

CDN
If you prefer to exclude prop-types from your application and use it globally via window.PropTypes, the prop-types package provides single-file distributions, which are hosted on the following CDNs:

unpkg
<!-- development version -->
<script src="https://unpkg.com/prop-types@15.6/prop-types.js"></script>

<!-- production version -->
<script src="https://unpkg.com/prop-types@15.6/prop-types.min.js"></script>
cdnjs
<!-- development version -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.6.0/prop-types.js"></script>

<!-- production version -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.6.0/prop-types.min.js"></script>
To load a specific version of prop-types replace 15.6.0 with the version number.
```

## 用法
`PropTypes`是通常作为`react`核心模块的一部分暴露，并且是被`react`组件共同使用。下面是一份在`react`组件中使用PropTypes的例子，提供了不同参数的文档：
```js
import React from 'react';
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // ... do things with the props
    // 直接使用this.prop
  }
}

MyComponent.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  // 可以用一个特定的原生js声明prop，默认提供所有选项。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  //可以呈现的任何内容:数字、字符串、元素或数组
  // (or fragment) containing these types.
  // see https://reactjs.org/docs/rendering-elements.html for more info
  optionalNode: PropTypes.node,

  // A React element (ie. <MyComponent />).
  optionalElement: PropTypes.element,

  // A React element type (ie. MyComponent).
  optionalElementType: PropTypes.elementType,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  // 可以用类实例声明一个prop。它使用了instanceof操作符
  optionalMessage: PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  // 可以确保你的prop被只包含某些特殊值
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    optionalProperty: PropTypes.string,
    requiredProperty: PropTypes.number.isRequired
  }),

  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    optionalProperty: PropTypes.string,
    requiredProperty: PropTypes.number.isRequired
  }),

  requiredFunc: PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired,

  // You can also specify a custom validator. It should return an Error
  // object if the validation fails. Don't `console.warn` or throw, as this
  // won't work inside `oneOfType`.
  //您还可以指定自定义验证器。
//它应该返回一个错误
//对象，如果验证失败。
//不要的控制台。
//警告还是扔，就像这样
//在“oneOfType”中不起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // You can also supply a custom validator to `arrayOf` and `objectOf`.
  // It should return an Error object if the validation fails. The validator
  // will be called for each key in the array or object. The first two
  // arguments of the validator are the array or object itself, and the
  // current item's key.
  //您还可以为' arrayOf '和' objectOf '提供自定义验证器。
//如果验证失败，它应该返回一个错误对象。
//验证器将为数组或对象中的每个键调用//。
//前两个验证器的参数是数组或对象本身，以及当前项的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```