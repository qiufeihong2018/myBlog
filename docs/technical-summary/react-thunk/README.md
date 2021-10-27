Redux Thunk
=============

Thunk [middleware](https://redux.js.org/advanced/middleware) for Redux.

[![build status](https://img.shields.io/travis/reduxjs/redux-thunk/master.svg?style=flat-square)](https://travis-ci.org/reduxjs/redux-thunk) 
[![npm version](https://img.shields.io/npm/v/redux-thunk.svg?style=flat-square)](https://www.npmjs.com/package/redux-thunk)
[![npm downloads](https://img.shields.io/npm/dm/redux-thunk.svg?style=flat-square)](https://www.npmjs.com/package/redux-thunk)

```js
npm install --save redux-thunk
```

## Note on 2.x Update

今天的大多数教程假设Redux Thunk 1。
所以当你用2.x运行他们的代码时，你可能会遇到问题。
**If you use Redux Thunk 2.x in CommonJS environment, [don’t forget to add `.default` to your import](https://github.com/reduxjs/redux-thunk/releases/tag/v2.0.0):**

```diff
- var ReduxThunk = require('redux-thunk')
+ var ReduxThunk = require('redux-thunk').default
```

If you used ES modules, you’re already all good:

```js
import ReduxThunk from 'redux-thunk' // no changes here 😀
```

Additionally, since 2.x, we also support a [UMD build](https://unpkg.com/redux-thunk/dist/redux-thunk.min.js):

```js
var ReduxThunk = window.ReduxThunk.default
```

As you can see, it also requires `.default` at the end.

## 为什么我需要这个?

如果你不确定你是否需要它，你可能不需要。

**[阅读这篇文章，深入了解Redux中的thunks。](http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559)**

## 动机

允许您编写返回函数而不是返回操作的 action。
thunk 可用于延迟actions的dispatch，或仅在满足一定条件时才dispatch。
内部函数接收存储方法 `dispatch` and `getState` 作为参数。

一个action创建者，它返回一个函数来执行异步dispatch:
```js
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}
```

An action creator that returns a function to perform conditional dispatch:
一个action创建者，它返回一个函数来执行条件dispatch:
```js
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}
```

## What’s a thunk?!

A [thunk](https://en.wikipedia.org/wiki/Thunk) 是一个包装表达式以延迟其计算的函数。

```js
// calculation of 1 + 2 is immediate
// x === 3
let x = 1 + 2;

// calculation of 1 + 2 is delayed
// foo can be called later to perform the calculation
// foo is a thunk!
let foo = () => 1 + 2;
```

The term [originated](https://en.wikipedia.org/wiki/Thunk#cite_note-1)
作为“思考”的幽默过去式。
## Installation

```
npm install --save redux-thunk
```

Then, to enable Redux Thunk, use [`applyMiddleware()`](https://redux.js.org/api-reference/applymiddleware):

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
```

## Composition

内部函数的任何返回值都可以作为  `dispatch` 本身的返回值。
这对于协调一个异步控制流来说是很方便的，因为thunk action创建者会互相分派并返回promise，等待对方完成:
```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

function fetchSecretSauce() {
  return fetch('https://www.google.com/search?q=secret+sauce');
}

//这些是目前为止你所见过的普通action创作者。
//它们返回的action可以在不需要任何中间件的情况下进行调度。
//但是，它们只表示“事实”而不表示“异步流”。
function makeASandwich(forPerson, secretSauce) {
  return {
    type: 'MAKE_SANDWICH',
    forPerson,
    secretSauce
  };
}

function apologize(fromPerson, toPerson, error) {
  return {
    type: 'APOLOGIZE',
    fromPerson,
    toPerson,
    error
  };
}

function withdrawMoney(amount) {
  return {
    type: 'WITHDRAW',
    amount
  };
}

// 即使没有中间件，你也可以分派一个actions:
store.dispatch(withdrawMoney(100));

//当你需要启动一个异步操作时，
//比如一个API调用，或者一个路由器转换?
// Meet thunks.
// thunk是一个返回函数的函数。
//这是一thunk。
function makeASandwichWithSecretSauce(forPerson) {

//反转控制!
//返回一个接受`dispatch` 的函数，以便稍后进行分派。
// Thunk中间件知道如何将Thunk异步actions转换成actions。
  return function (dispatch) {
    return fetchSecretSauce().then(
      sauce => dispatch(makeASandwich(forPerson, sauce)),
      error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    );
  };
}

// Thunk middleware让我分派Thunk异步actions
//仿佛它们是actions!
store.dispatch(
  makeASandwichWithSecretSauce('Me')
);

//它甚至会小心地从dispatch返回thunk的返回值
//，所以我可以chain Promises，只要我返回他们。
store.dispatch(
  makeASandwichWithSecretSauce('My wife')
).then(() => {
  console.log('Done!');
});

//实际上，我可以编写dispatch的action创建者
//从其他actions创建器的actions和异步actions，
//我可以建立我的控制流与Promises。
function makeSandwichesForEverybody() {
  return function (dispatch, getState) {
    if (!getState().sandwiches.isShopOpen) {

//你不需要返回promise，但这是一个方便的约定
//因此调用者总是可以调用.then()在异步分派结果。
      return Promise.resolve();
    }

//我们可以分派普通对象actions和其他actions，
//它允许我们在单个流中组合异步操作。
    return dispatch(
      makeASandwichWithSecretSauce('My Grandma')
    ).then(() =>
      Promise.all([
        dispatch(makeASandwichWithSecretSauce('Me')),
        dispatch(makeASandwichWithSecretSauce('My wife'))
      ])
    ).then(() =>
      dispatch(makeASandwichWithSecretSauce('Our kids'))
    ).then(() =>
      dispatch(getState().myMoney > 42 ?
        withdrawMoney(42) :
        apologize('Me', 'The Sandwich Shop')
      )
    );
  };
}

//这对服务器端渲染非常有用，因为我可以等待
//直到数据可用，然后同步呈现应用程序。
store.dispatch(
  makeSandwichesForEverybody()
).then(() =>
  response.send(ReactDOMServer.renderToString(<MyApp store={store} />))
);

//我也可以调度一个thunk异步actions从一个组件
//任何时候它的props改变，以加载丢失的数据。
import { connect } from 'react-redux';
import { Component } from 'react';

class SandwichShop extends Component {
  componentDidMount() {
    this.props.dispatch(
      makeASandwichWithSecretSauce(this.props.forPerson)
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.forPerson !== this.props.forPerson) {
      this.props.dispatch(
        makeASandwichWithSecretSauce(this.props.forPerson)
      );
    }
  }

  render() {
    return <p>{this.props.sandwiches.join('mustard')}</p>
  }
}

export default connect(
  state => ({
    sandwiches: state.sandwiches
  })
)(SandwichShop);
```

## 注入自定义参数

从2.1.0开始，Redux Thunk支持使用 `withExtraArgument` 函数注入自定义参数:
```js
const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api))
)

// later
function fetchUser(id) {
  return (dispatch, getState, api) => {
    // you can use api here
  }
}
```

要传递多个东西，只需将它们包装在单个对象中并使用解构:
```js
const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument({ api, whatever }))
)

// later
function fetchUser(id) {
  return (dispatch, getState, { api, whatever }) => {
    // you can use api and something else here
  }
}
```


## License

MIT
