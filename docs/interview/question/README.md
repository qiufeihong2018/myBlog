# 前端跳槽面试必备技巧
## [中高级前端大厂面试秘籍，为你保驾护航金三银四，直通大厂(上)](https://juejin.im/post/5c64d15d6fb9a049d37f9c20)

## [头条日常实习生面经](https://www.cnblogs.com/lhh520/p/10321103.html)

## 创邻科技笔试题：
### 题目1
   ```text
 小明的女朋友最喜欢在网上买买买了，可是钱包里钞票有限，不能想买啥就买啥。面对琳琅满目的物品，她想买尽可能多的种类，每种只买一件，同时总价格还不能超过预算上限。于是她请小明写程序帮她找出应该买哪些物品，并算出这些物品的总价格。
    
    输入规范：
    每个输入包含两行。第一行是预算上限。第二行是用空格分隔的一组数字，代表每种物品的价格。所有数字都为正整数并且不会超过10000。
    
    输出规范：
    对每个输入，输出应买物品的总价格。
    
    输入示例1:
    100
    50 50
    输出示例1:
    100
    
    输入示例2:
    188
    50 42 9 15 105 63 14 30
    输出示例2:
    160
    
```

   这道题简单，实现了基本框架
   
 ```js        
        function sortNum(a, b) {
            return a - b
        }
        
        function f(total, arr) {
            var sum = 0
            arr.sort(sortNum)
            arr.forEach(num => {
                if (num <= total) {
                    total -= num
                    sum += num
                } else {
                    return sum
                }
            })
            return sum
        }
        
        console.log(f(100, [50, 50]))//100
        console.log(f(188, [50, 42, 9, 15, 105, 63, 14, 30]))//160
   ``` 
    
 ### 题目2
 ```text

 李雷和韩梅梅坐前后排，上课想说话怕被老师发现，所以改为传小纸条。为了不被老师发现他们纸条上说的是啥，他们约定了如下方法传递信息：
        将26个英文字母（全为大写），外加空格，一共27个字符分成3组，每组9个。也就是ABCDEFGHI是第一组，JKLMNOPQR是第二组，STUVWXYZ*是第三组（此处用*代表空格）。
        然后根据传递纸条那天的日期，改变字母的位置。
        先根据月份数m，以整个分组为单位进行循环左移，移动(m-1)次。
        然后根据日期数d，对每个分组内的字符进行循环左移，移动(d-1)次。
        以3月8日为例，首先移动分组，3月需要循环左移2次，变成：
        STUVWXYZ*，ABCDEFGHI，JKLMNOPQR
        然后每组内的字符，8日的话需要循环左移7次，最终的编码为：
        Z*STUVWXY，HIABCDEFG，QRJKLMNOP
        对于要传递信息中的每个字符，用组号和组内序号两个数字来表示。
        如果在3月8日传递信息“HAPPY”，那么H位于第2组的第1个，A位于第2组第3个，P位于第3组第9个，Y位于第1组第9个，所以纸条上会写成：
        21 23 39 39 19
        现在给定日期和需要传递的信息，请输出应该写在纸条上的编码。
              
        输入规范：
        每个输入包含两行。第一行是用空格分隔的两个数字，第一个数字是月份，第二个数字是日子。输入保证是一个合法的日期。
        第二行为需要编码的信息字符串，仅由A~Z和空格组成，长度不超过1024个字符。
        
        输出规范：
        对每个输入，打印对应的编码，数字之间用空格分隔，每个输出占一行。
        
        输入示例1:
        1 1
        HI
        输出示例1:
        18 19
        
        输入示例2:
        3 8
        HAPPY
        输出示例2:
        21 23 39 39 19
        
        输入示例3:
        2 14
        I LOVE YOU
        输出示例3:
        35 25 18 12 29 31 25 23 12 28
 ```
 此题有点难，我目前只能实现整个数组和单个数组的左移方法，并且把两者的位置找出来，还需要解析位置的索引。我猜最好的方法是在数组的数组找位置。
 ```js
 var arrFirst = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
 var arrSecond = ["J", "K", "L", "M", "N", "O", "P", "Q", "R"]
 var arrThird = ["S", "T", "U", "V", "W", "X", "Y", "Z", "*"]
 var arrTotal = new Array()
 arrTotal.push(arrFirst, arrSecond, arrThird)
 // 要进行编码的数组
 var arrTotalSecond = new Array()
 
 // 数组集合左移m个单位
 function moveArrList(m) {
     return arrTotal.slice(-m).concat(arrTotal.slice(0, -m))
 }
 
 // 每个数组左移d个单位
 function moveArr(d) {
     arrTotal.forEach(item => {
         arrTotalSecond.push(item.slice(-d).concat(item.slice(0, -d)))
     })
     return arrTotalSecond
 }
 
 function f(m, d, arr) {
     var newArr = new Array()
     m -= 1
     d -= 1
     moveArrList(m)
     moveArr(d)
     arr.forEach(string => {
         arrTotalSecond.forEach(arr => {
             newArr.push(arr.indexOf(string))
         })
     })
     return newArr
 }
 
 console.log(f(1, 1, ['H', 'I']))//[ 7, -1, -1, 8, -1, -1 ]

```       
        