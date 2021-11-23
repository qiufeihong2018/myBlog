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