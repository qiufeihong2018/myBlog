# Element源码分析——工具函数1
工具函数是每一个优秀的前端库中必须包含的。

尤其是 `element` 库，工具函数包含了 `dom`、类型、菜单、日期等，十分全面。所有的工具函数都放在 `src/utils` 目录下。

先来看下 `util.js` 中的代码：
```js
import Vue from 'vue';
// 导入判断类型
import { isString, isObject } from 'element-ui/src/utils/types';

const hasOwnProperty = Object.prototype.hasOwnProperty;
```
## 空函数
```js
function noop() {};
```
## 判断对象中是否有某个属性
```js
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};
```
## 从一个对象继承
```js
function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
};
```
## 转换为对象
```js
function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};
```
## 获取对象内部的属性值（深层遍历）
```js
const getValueByPath = function(object, prop) {
  prop = prop || '';
  const paths = prop.split('.');
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};
```
```js
function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};
```
```js
const generateId = function() {
  return Math.floor(Math.random() * 10000);
};
```
```js
const valueEquals = (a, b) => {
  ## see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
```
```js
const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
```
## TODO: use native Array.find, Array.findIndex when IE support is dropped
```js
const arrayFindIndex = function(arr, pred) {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
};
```
```js
const arrayFind = function(arr, pred) {
  const idx = arrayFindIndex(arr, pred);
  return idx !== -1 ? arr[idx] : undefined;
};
```
```js
## coerce truthy value to array
const coerceTruthyValueToArray = function(val) {
  if (Array.isArray(val)) {
    return val;
  } else if (val) {
    return [val];
  } else {
    return [];
  }
};
```
## 判断是否是ie浏览器
```js
const isIE = function() {
  return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode));
};
```
## 判断是否是微软浏览器
```js
const isEdge = function() {
  return !Vue.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1;
};
```
## 判断是否是火狐浏览器
```js
const isFirefox = function() {
  return !Vue.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i);
};
```
## 判断是否是谷歌浏览器
```js
const isChrome = function() {
  return !Vue.prototype.$isServer && navigator.userAgent.indexOf('chrome') > -1;
}
```
## 解析css文件并且添加到浏览器前缀到css规则里
```js
const autoprefixer = function(style) {
  if (typeof style !== 'object') return style;
  const rules = ['transform', 'transition', 'animation'];
  const prefixes = ['ms-', 'webkit-'];
  rules.forEach(rule => {
    const value = style[rule];
    if (rule && value) {
      prefixes.forEach(prefix => {
        style[prefix + rule] = value;
      });
    }
  });
  return style;
};
```
## 将大写转化为小写用-链接
```js
const kebabCase = function(str) {
  const hyphenateRE = /([^-])([A-Z])/g;
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase();
};
```
## 字符串首字母大小
```js
const capitalize = function(str) {
  if (!isString(str)) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
```
## 判断对象是否相等
```js
const looseEqual = function(a, b) {
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b);
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
};
```
## 判断数组是否相等
```js
const arrayEquals = function(arrayA, arrayB) {
  arrayA = arrayA || [];
  arrayB = arrayB || [];

  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false;
    }
  }

  return true;
};
```
## 判断值是否相等
```js
const isEqual = function(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2);
  }
  return looseEqual(value1, value2);
};
```
## 判断值是否为空
```js
const isEmpty = function(val) {
  ## null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    ## String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    ## Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }
    ## Plain Object
    case '[object Object]': {
      return !Object.keys(val).length;
    }
  }

  return false;
};
```
## 节流
```js
function rafThrottle(fn) {
  let locked = false;
  return function(...args) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(_ => {
      fn.apply(this, args);
      locked = false;
    });
  };
}
```
## 对象转化为数组
```js
function objToArray(obj) {
  if (Array.isArray(obj)) {
    return obj;
  }
  return isEmpty(obj) ? [] : [obj];
}
```
## after-leave
```js
/**
 * Bind after-leave event for vue instance. Make sure after-leave is called in any browsers.
 * 为vue实例绑定after-leave事件。
确保在任何浏览器中都调用after-leave。
 *
 * @param {Vue} instance Vue instance.
 * @param {Function} callback callback of after-leave event
 * @param {Number} speed the speed of transition, default value is 300ms。转换速度
 * @param {Boolean} once weather bind after-leave once. default value is false. after-leave是否绑定一次。默认值是false。
 */
// called为开关。
// called先是为false，代表开着状态，进入回调事件后，把它关上，回调事件绑定所有参数。
// 为true即是关上状态，进入回调后马上退出。

export default function(instance, callback, speed = 300, once = false) {
  // 实例和回调方法是必须的
  if (!instance || !callback) throw new Error('instance & callback is required');
  let called = false;
  const afterLeaveCallback = function() {
    if (called) return;
    called = true;
    if (callback) {
      callback.apply(null, arguments);
    }
  };
  if (once) {
    // 只调用一次
    instance.$once('after-leave', afterLeaveCallback);
  } else {
    instance.$on('after-leave', afterLeaveCallback);
  }
  setTimeout(() => {
    afterLeaveCallback();
  }, speed + 100);
};
```
## dom工具方法
```js
var aria = aria || {};

aria.Utils = aria.Utils || {};

/**
 * @desc Set focus on descendant nodes until the first focusable element is
 *       found.将焦点设置在后代节点上，直到第一个焦点元素被
*发现。
 * @param element
 *          DOM node for which to find the first focusable descendant.
 * 要为其找到第一个可聚焦后代的DOM节点。
 * @returns
 *  true if a focusable element is found and focus is set.
 * 如果找到可聚焦元素并设置焦点，则为True。
 */
aria.Utils.focusFirstDescendant = function (element) {
  // 遍历元素的所有子节点
  for (var i = 0; i < element.childNodes.length; i++) {
    var child = element.childNodes[i];
    // 迭代所有子孙节点，找到可聚焦的节点
    if (aria.Utils.attemptFocus(child) || aria.Utils.focusFirstDescendant(child)) {
      return true;
    }
  }
  return false;
};

/**
 * @desc Find the last descendant node that is focusable.找到可聚焦的最后一个子孙节点。
 * @param element
 *          DOM node for which to find the last focusable descendant.要为其找到最后一个可聚焦后代的DOM节点。
 * @returns
 *  true if a focusable element is found and focus is set.如果找到可聚焦元素并设置焦点，则为True。
 */

aria.Utils.focusLastDescendant = function (element) {
  for (var i = element.childNodes.length - 1; i >= 0; i--) {
    var child = element.childNodes[i];
    if (aria.Utils.attemptFocus(child) || aria.Utils.focusLastDescendant(child)) {
      return true;
    }
  }
  return false;
};

/**
 * @desc Set Attempt to set focus on the current node.设置尝试设置当前节点的焦点。
 * @param element
 *          The node to attempt to focus on.试图聚焦的节点。
 * @returns
 *  true if element is focused.如果元素被聚焦返回true
 */
aria.Utils.attemptFocus = function (element) {
  if (!aria.Utils.isFocusable(element)) {
    return false;
  }
  aria.Utils.IgnoreUtilFocusChanges = true;
  try {
    element.focus();
  } catch (e) {
  }
  aria.Utils.IgnoreUtilFocusChanges = false;
  return (document.activeElement === element);
};

// 元素是否是可聚焦的
aria.Utils.isFocusable = function (element) {
  // tabIndex获取或设置当前元素的tab键激活顺序.
  if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
    return true;
  }
  // 元素禁用返回false
  if (element.disabled) {
    return false;
  }
  // 判断元素节点类型
  // a标签有href并且不忽略返回true
  // 输入框标签类型不隐藏并且不是文件类型返回true
  // 按钮、选择框和文本框都返回true
  // 剩余的都返回false
  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel !== 'ignore';
    case 'INPUT':
      return element.type !== 'hidden' && element.type !== 'file';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
};

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */


// createEvent
// // 创建事件
// var event = document.createEvent('Event');

// // 定义事件名为'build'.
// event.initEvent('build', true, true);

// // 监听事件
// elem.addEventListener('build', function (e) {
//   // e.target matches elem
// }, false);

// // 触发对象可以是任何元素或其他事件目标
// elem.dispatchEvent(event);
aria.Utils.triggerEvent = function (elm, name, ...opts) {
  let eventName;

  if (/^mouse|click/.test(name)) {
    // 鼠标事件
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    // 键盘事件
    eventName = 'KeyboardEvent';
  } else {
    // html事件
    eventName = 'HTMLEvents';
  }
  // 创建事件
  const evt = document.createEvent(eventName);

  evt.initEvent(name, ...opts);
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt);

  return elm;
};


// 绑定键盘键值
aria.Utils.keys = {
  tab: 9,
  enter: 13,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  esc: 27
};

export default aria.Utils;
```

## 对话框工具函数
```js
import Utils from './aria-utils';

/**
 * @constructor
 * @desc Dialog object providing modal focus management.提供模式焦点管理的对话框对象。
 *
 * Assumptions: The element serving as the dialog container is present in the
 * DOM and hidden. The dialog container has role='dialog'.
 *元素中存在作为对话框容器的元素
* DOM和隐藏。
对话框容器有role='dialog'。
 * @param dialogId
 *          The ID of the element serving as the dialog container.用作对话框容器的元素的ID。
 * @param focusAfterClosed
 *          Either the DOM node or the ID of the DOM node to focus when the
 *          dialog closes.对话框关闭时要聚焦的DOM节点或DOM节点ID
 * @param focusFirst
 *          Optional parameter containing either the DOM node or the ID of the
 *          DOM node to focus when the dialog opens. If not specified, the
 *          first focusable element in the dialog will receive focus.
 * 对象的ID或DOM节点的可选参数
*当对话框打开时聚焦的DOM节点。
如果未指定，则
*对话框中的第一个可聚焦元素将获得聚焦。
 */
var aria = aria || {};
var tabEvent;

aria.Dialog = function (dialog, focusAfterClosed, focusFirst) {
  this.dialogNode = dialog;
  // 对话框为null或者不为对话框抛出异常
  if (this.dialogNode === null || this.dialogNode.getAttribute('role') !== 'dialog') {
    throw new Error('Dialog() requires a DOM element with ARIA role of dialog.');
  }
  // 对话框关闭时要聚焦的DOM节点
  if (typeof focusAfterClosed === 'string') {
    this.focusAfterClosed = document.getElementById(focusAfterClosed);
  } else if (typeof focusAfterClosed === 'object') {
    this.focusAfterClosed = focusAfterClosed;
  } else {
    this.focusAfterClosed = null;
  }
  // 当对话框打开时聚焦的DOM节点
  if (typeof focusFirst === 'string') {
    this.focusFirst = document.getElementById(focusFirst);
  } else if (typeof focusFirst === 'object') {
    this.focusFirst = focusFirst;
  } else {
    this.focusFirst = null;
  }
  // 有的话聚焦，没有找到第一个子代中可聚焦的节点聚焦
  if (this.focusFirst) {
    this.focusFirst.focus();
  } else {
    Utils.focusFirstDescendant(this.dialogNode);
  }

  this.lastFocus = document.activeElement;
  tabEvent = (e) => {
    this.trapFocus(e);
  };
  this.addListeners();
};
// 添加设置焦点事件
aria.Dialog.prototype.addListeners = function () {
  document.addEventListener('focus', tabEvent, true);
};
// 移除焦点事件
aria.Dialog.prototype.removeListeners = function () {
  document.removeEventListener('focus', tabEvent, true);
};
// 关闭对话框
aria.Dialog.prototype.closeDialog = function () {
  this.removeListeners();
  if (this.focusAfterClosed) {
    setTimeout(() => {
      this.focusAfterClosed.focus();
    });
  }
};
// 捕捉聚焦
aria.Dialog.prototype.trapFocus = function (event) {
  if (Utils.IgnoreUtilFocusChanges) {
    return;
  }
  if (this.dialogNode.contains(event.target)) {
    this.lastFocus = event.target;
  } else {
    Utils.focusFirstDescendant(this.dialogNode);
    if (this.lastFocus === document.activeElement) {
      Utils.focusLastDescendant(this.dialogNode);
    }
    this.lastFocus = document.activeElement;
  }
};

export default aria.Dialog;
```
## clickoutside
该指令用来处理目标节点之外的点击事件，常用来处理下拉菜单等展开内容的关闭，在Element-ui的Select选择器、Dropdown下拉菜单、Popover 弹出框等组件中都用到了该指令，所以这个指令在实现一些自定义组件的时候非常有用。

当指令与元素绑定以及组件更新的时候，搜集并设置绑定元素的ctx特性，同时将绑定元素添加到nodeList当中去，当指令与元素解绑的时候，删除nodeList中存储的对应的绑定元素，并将之前设置在绑定元素上之前设置的ctx特性删除掉。

```js
import Vue from 'vue';
import { on } from 'element-ui/src/utils/dom';
// https://juejin.cn/post/6844903775501565959
// 元素搜集器，会将页面中所有绑定clickoutside的dom元素储存起来
const nodeList = [];
// 命名控件，防止其他特性重名
const ctx = '@@clickoutsideContext';

let startClick;
let seed = 0;
// 非服务端给文档对象添加鼠标点下事件
// 鼠标点下回调中将事件储存在startClick全局变量中。
!Vue.prototype.$isServer && on(document, 'mousedown', e => (startClick = e));
// 鼠标抬起回调中遍历nodeList，然后分别执行每一个node节点ctx特性中存储的documentHandler函数
!Vue.prototype.$isServer && on(document, 'mouseup', e => {
  nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
});
// 创建文档事件
function createDocumentHandler(el, binding, vnode) {
  return function (mouseup = {}, mousedown = {}) {
    if (!vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      // 绑定对象el是否包含mouseup.target/mousedown.target子节点，如果包含说明点击的是绑定元素的内部，则不执行clickoutside指令内容
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      // 绑定对象el是否等于mouseup.target，等于说明点击的就是绑定元素自身，也不执行clickoutside指令内容
      el === mouseup.target ||
      // 最后vnode.context.popperElm这部分内容则是 : 判断是否点击在下拉菜单的上，如果是，也是没有点击在绑定元素外部，不执行clickoutside指令内容
      (vnode.context.popperElm &&
        (vnode.context.popperElm.contains(mouseup.target) ||
          vnode.context.popperElm.contains(mousedown.target)))) return;
    // 如果以上条件全部符合，则判断闭包缓存起来的值，如果methodName存在则执行这个方法，如果不存在则执行bindingFn
    if (binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]();
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
export default {
  bind(el, binding, vnode) {
    // 将所有调用该指令的dom元素塞进nodeList变量中
    nodeList.push(el);
    const id = seed++;
    el[ctx] = {
      // 前面生成的全局唯一id，用来标识该指令
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      // 字符串形式的执行表达式
      // 例如有  <div v-my-directive="1 + 1"></div>，则binding.expression的值为 1 + 1
      methodName: binding.expression,
      // 执行表达式的值
      // 指令的值为js表达式的情况下，**binding.expresssion**为表达式本身，是一个字符串，而**binding.value**是该表达式的值。
      bindingFn: binding.value
    };
  },
  // update钩子的内容很简单，就是当组件更新的时候，更新 绑定元素 el 的特性 ctx 中的值。
  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },
  // 当clickoutside指令与元素el解绑的时候，遍历nodeList，通过ctx特性上的id找到nodeList中存储的当前解绑元素el，将它从nodeList中删除，并且删除el上的ctx特性。
  unbind(el) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  }
};
```

以上就是 documentHandler方法的生成以及内部逻辑。通过这个方法和之前的分析，我们就可以知道，当页面绑mouseup事件触发的时候，会遍历nodeList，依次执行每一个绑定元素el的ctx特性上的documentHandler方法。而在这个方法内部可以访问到指令传入的表达式，在进行一系列判断之后会执行该表达式，从而达到点击目标元素外部执行给定逻辑的目的，而这个给定逻辑是通过自定义指令的值，传到绑定元素el的ctx特性上的。
至此clickoutside的源码就分析完了，可以看到clickoutside指令的源码并不复杂，不过涉及到的内容还是挺多的，有许多东西值得我们学习，比如利用dom元素的特性来存储额外信息，使用闭包缓存变量，如何判断点击在目标元素外部和Vue自定义指令的使用等等。
