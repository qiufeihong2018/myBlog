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
## Property ‘id‘ has no initializer and is not definitely assigned in the constructor.Vetur(2564)
原属性声明 @Prop(String) id:string 编译会出错
解决方法：直接给 id 后面加一个 ？或者 ！

改为 @Prop(String) id?:string 或者@Prop(String) id！:string 
前者是指我们不确定是否会传入这个参数，后者是指我们一定会给这个参数赋值

