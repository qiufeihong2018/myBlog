# 【react】浅谈react
## 什么是react？
简洁的说，`react`是构建用户界面的`js`库。

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。

React 中拥有多种不同类型的组件，我们先从 React.Component 的子类开始介绍：
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
我们通过使用组件来告诉 React 我们希望在屏幕上看到什么。当数据发生改变时，React 会高效地更新并重新渲染我们的组件。

其中，ShoppingList 是一个 React 组件类，或者说是一个 React 组件类型。一个组件接收一些参数，我们把这些参数叫做 props（“props” 是 “properties” 简写），然后通过 render 方法返回需要展示在屏幕上的视图的层次结构。

render 方法的返回值描述了你希望在屏幕上看到的内容。React 根据描述，然后把结果展示出来。更具体地来说，render 返回了一个 React 元素，这是一种对渲染内容的轻量级描述。大多数的 React 开发者使用了一种名为 “JSX” 的特殊语法，JSX 可以让你更轻松地书写这些结构。语法 <div /> 会被编译成 React.createElement('div')。上述的代码等同于：
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

当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了。
### 上手一个井字棋小游戏？
### 函数组件和class组件的区别？
1. 函数组件和类组件当然是有区别的，而且函数组件的性能比类组件的性能要高
2. 因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可
3. 为了提高性能，尽量使用函数组件
4. 函数组件没有this,没有生命周期，没有状态state,类组件有this,有生命周期，有状态state。
## react和vue的比较？
### react
- 声明式
根据`mvvm`结构，`react`可以为每一个页面创建一个视图，当页面的数据发生改变时，它可以有效的更新并正确渲染组件。声明式地编写组件，可以方便调试。
- 组件化
根据`1+1>2`的定论，有多个组件可以组成超级复杂的页面。组件逻辑由`js`编写而不是模板，`vue`是用模板，可以轻松的在页面中传递数据，并使得状态与`dom`分离。
- 不需要学习其他框架
只要你学会的`react`，你可以用`react`开发任何的前端页面，可以`node`进行服务器渲染，还可以使用`react native`开发原生移动应用。
## react源码
## 参考文献
[React](https://react.docschina.org/)