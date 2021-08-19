# 【react】浅谈react
## 什么是react？
简洁的说，`react`是构建用户界面的`js`库。

`React` 是一个声明式，高效且灵活的用于构建用户界面的 `JavaScript` 库。使用 `React` 可以将一些简短、独立的代码片段组合成复杂的 `UI` 界面，这些代码片段被称作“组件”。

`React` 中拥有多种不同类型的组件，我们先从 `React.Component` 的子类开始介绍：
```js
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// 用法示例: <ShoppingList name="Mark" />
```
我们通过使用组件来告诉 `React` 我们希望在屏幕上看到什么。当数据发生改变时，· 会高效地更新并重新渲染我们的组件。

其中，`ShoppingList` 是一个 `React` 组件类，或者说是一个 `React` 组件类型。一个组件接收一些参数，我们把这些参数叫做 `props`（“props” 是 “properties” 简写），然后通过 `render` 方法返回需要展示在屏幕上的视图的层次结构。

`render` 方法的返回值描述了你希望在屏幕上看到的内容。`React` 根据描述，然后把结果展示出来。更具体地来说，`render` 返回了一个 React 元素，这是一种对渲染内容的轻量级描述。大多数的 `React` 开发者使用了一种名为 `“JSX”` 的特殊语法，`JSX` 可以让你更轻松地书写这些结构。语法 `<div />` 会被编译成 `React.createElement('div')`。上述的代码等同于：
```js
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```
## react怎么玩？
步骤：
1. 安装最新的`node`
2. 用命令搭建项目
```
npx create-react-app tic
```
3. 删除掉新项目中 src/ 文件夹下的所有文件
4. 

当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的 `state` 数据提升至其共同的父组件当中保存。之后父组件可以通过 `props` 将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了。
### 上手一个井字棋小游戏？
### 函数组件和class组件的区别？
1. 函数组件和类组件当然是有区别的，而且函数组件的性能比类组件的性能要高
2. 因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可
3. 为了提高性能，尽量使用函数组件
4. 函数组件没有this,没有生命周期，没有状态state,类组件有this,有生命周期，有状态state。
### class的方法默认绑定this吗？
```js
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```
必须谨慎对待 `JSX` 回调函数中的 this，在 `JavaScript` 中，`class` 的方法默认不会绑定 `this`。如果你忘记绑定 `this.handleClick` 并把它传入了 `onClick`，当你调用这个函数的时候 `this` 的值为 `undefined`。

并不是 `React` 特有的行为；这其实与 `JavaScript` 函数工作原理有关。通常情况下，如果你没有在方法后面添加 ()，例如 `onClick={this.handleClick}`，你应该为这个方法绑定 `this`。

如果觉得使用 `bind` 很麻烦，这里有两种方式可以解决。如果你正在使用实验性的 `public class fields` 语法，你可以使用 `class fields` 正确的绑定回调函数：
```js
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

`Create React App` 默认启用此语法。

如果你没有使用 `class fields` 语法，你可以在回调中使用箭头函数：

```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```
此语法问题在于每次渲染 `LoggingButton` 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 `prop` 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 `class fields` 语法来避免这类性能问题。

源码中的`react.development.js`中`setState`方法如下：
```js
 Component.prototype.setState = function (partialState, callback) {
    if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
      {
        throw Error( "setState(...): takes an object of state variables to update or a function which returns an object of state variables." );
      }
    }

    this.updater.enqueueSetState(this, partialState, callback, 'setState');
  };
```
这个方法的注释如下：
1. 设置state的子集，总是使用这个来改变state。应该认为this.state是不可变的。
2. 这不能保证this.state将被立即更新，因此在调用setState回调后访问this.state可能访问到旧值。
3. 无法保证对“setState”的调用将同步运行，因为它们最终可能会被打包在一起。您可以提供一个可选的回调，该回调将在实际调用setState时执行完成。
4. 当一个函数被提供给setState时，它将在将来的某个时候被调用(不是同步调用)。它将与最新组件参数(state,props,context)一起调用。这些值可能不同于this。因为你的函数可能在receiveProps之后调用，而在之前shouldComponentUpdate，新的state，props和context还没有在this中。

### 向事件处理程序如何传递参数？
在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 `id` 是你要删除那一行的 `ID`，以下两种方式都可以向事件处理函数传递参数：
```html
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
上述两种方式是等价的，分别通过箭头函数和 `Function.prototype.bind` 来实现。

在这两种情况下，`React` 的事件对象 `e` 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 `bind` 的方式，事件对象以及更多的参数将会被隐式的进行传递。
### 与运算符&&怎么用？
它可以很方便地进行元素的条件渲染。
```js
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```
之所以能这样做，是因为在 `JavaScript` 中，`true && expression` 总是会返回 `expression`, 而 `false && expression` 总是会返回 `false`。

因此，如果条件是 `true`，&& 右侧的元素就会被渲染，如果是 `false`，`React` 会忽略并跳过它。

### 如何阻止组件渲染？
在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 `render` 方法直接返回 `null`，而不进行任何渲染。
### 循环中key能丢吗？
在默认条件下，当递归 `DOM` 节点的子元素时，`React` 会同时遍历两个子元素的列表；当产生差异时，生成一个 `mutation`。

在子元素列表末尾新增元素时，更变开销比较小。比如：
```html
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```
React 会先匹配两个 `<li>first</li>` 对应的树，然后匹配第二个元素 `<li>second</li>` 对应的树，最后插入第三个元素的 `<li>third</li>` 树。

如果简单实现的话，那么在列表头部插入会很影响性能，那么更变开销会比较大。比如：
```html
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```
`React` 会针对每个子元素 `mutate` 而不是保持相同的 `<li>Duke</li>` 和 `<li>Villanova</li>` 子树完成。这种情况下的低效可能会带来性能问题。

为了解决以上问题，`React` 支持 `key` 属性。当子元素拥有 `key` 时，`React` 使用 `key` 来匹配原有树上的子元素以及最新树上的子元素。以下例子在新增 `key` 之后使得之前的低效转换变得高效：
```
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```
现在 `React` 知道只有带着 `'2014' key `的元素是新元素，带着 `'2015'` 以及 `'2016' key` 的元素仅仅移动了。

现实场景中，产生一个 `key` 并不困难。你要展现的元素可能已经有了一个唯一 `ID`，于是 `key` 可以直接从你的数据中提取：
```
<li key={item.id}>{item.name}</li>
```
当以上情况不成立时，你可以新增一个 `ID` 字段到你的模型中，或者利用一部分内容作为哈希值来生成一个 `key`。这个 `key` 不需要全局唯一，但在列表中需要保持唯一。

最后，你也可以使用元素在数组中的下标作为 `key`。这个策略在元素不进行重新排序时比较合适，但一旦有顺序修改，`diff` 就会变得慢。

当基于下标的组件进行重新排序时，组件 `state` 可能会遇到一些问题。由于组件实例是基于它们的 `key` 来决定是否更新以及复用，如果 `key` 是一个下标，那么修改顺序时会修改当前的 `key`，导致非受控组件的 `state`（比如输入框）可能相互篡改导致无法预期的变动。

[key](https://zh-hans.reactjs.org/docs/reconciliation.html#recursing-on-children)
### 什么是受控组件？
在 `HTML` 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）之类的表单元素通常自己维护 `state`，并根据用户输入进行更新。而在 `React` 中，可变状态（`mutable state`）通常保存在组件的 `state` 属性中，并且只能通过使用 `setState()`来更新。

我们可以把两者结合起来，使 `React` 的 `state` 成为“唯一数据源”。渲染表单的 `React` 组件还控制着用户输入过程中表单发生的操作。被 `React` 以这种方式控制取值的表单输入元素就叫做“受控组件”。
## react和vue的比较？
### react
- 声明式
根据`mvvm`结构，`react`可以为每一个页面创建一个视图，当页面的数据发生改变时，它可以有效的更新并正确渲染组件。声明式地编写组件，可以方便调试。
- 组件化
根据`1+1>2`的定论，有多个组件可以组成超级复杂的页面。组件逻辑由`js`编写而不是模板，`vue`是用模板，可以轻松的在页面中传递数据，并使得状态与`dom`分离。
- 不需要学习其他框架
只要你学会的`react`，你可以用`react`开发任何的前端页面，可以`node`进行服务器渲染，还可以使用`react native`开发原生移动应用。
## react要点
> 组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用。

> 参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

> 你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。
## react源码
## 参考文献
[React](https://react.docschina.org/)