# typescript-question
## 'Router' cannot be used as a JSX component. Its return type 'void' is not a valid JSX element.
``ts
export default () => {
    <Router history={history}>
        <>
            <Route exact path='/' component={App} />
        </>
    </Router>
}
```
```
'Router' cannot be used as a JSX component. Its return type 'void' is not a valid JSX element.
```

没有返回任何在路由器。tsx。尝试像这样在Router函数中添加return语句
```ts
export default () => {
    return (
        <Router history={history}>
            <>
                <Route exact path='/' component={App} />
            </>
        </Router>
    )
}
```