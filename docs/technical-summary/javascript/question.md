# javascript问题 
## js对象怎么通过value值拿到key值
```js
let obj = {
      'FINISH': '播放完毕',
      'PLAYING': '正在播放',
      'READYING': '待播',
      'WAITING': '等待',
      'CIRCLE_START': '循环开始',
      'CIRCLE': '循环',
      'CIRCLE_END': '循环结束',
      'SET_TIME': '定时播放',
      'INTER_CUT': '定时插播',
      'WEAK_TIME': '弱定时'
    }
    let findKey = (value, compare = (a, b) => a === b) =>{
      return Object.keys(obj).find(k => compare(obj[k], value))
    }
    let val = obj.CIRCLE_START;
    console.log('value:', val)
    console.log(findKey(val))
```

## map 遍历乱序
一个 Map 对象以插入的顺序返回键值。
```js
this.data.map((item, index) => {
  if (item.id === _t.replaceData.id) {
    tag = index
  }
})
```

因为 map 迭代的时候，顺序是按照插入的顺序返回，所以会造成乱序

最好使用 for 循环去迭代

## 堆、栈、队列
详细请见[https://www.cnblogs.com/netUserAdd/p/10979069.html](https://www.cnblogs.com/netUserAdd/p/10979069.html)

## id生成器
nanoid——一个小巧、安全、URL友好、唯一的 JavaScript 字符串ID生成器。

详细请见[https://github.com/ai/nanoid/blob/main/README.zh-CN.md](https://github.com/ai/nanoid/blob/main/README.zh-CN.md)