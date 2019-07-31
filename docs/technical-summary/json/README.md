# 重读MDN-JSON
## JSON.parse()
JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的reviver函数用以在返回之前对所得到的对象执行变换(操作)。

```js
var json = '{"count":42}';
obj = JSON.parse(json);

console.log(obj.count);
// expected output: 42

```

## JSON.stringify()
JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串，如果指定了replacer是一个函数，则可以选择性的替换值，或者如果指定了replacer是一个数组，可选择性的仅包含数组指定的属性。