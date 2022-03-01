# 重读javascript
## 类型
- Number数字
- String字符串
- Object对象
  - Function函数
  - Array数组
  - Date日期
  - RegExp正则表达式
- Boolean布尔值
- Symbol符号（ES2015新增）
- null空
- undefined未定义

### Number数字
javascript采用“遵循IEEE754标准的双精度64位格式”表示数字。在javascript（处理BigInt）当中，并不存在整数/整型(integer)。看上去整数的东西，其实都是浮点数。

内置对象：
- Math数字对象，处理高级数学函数和常数

内置函数：
- parseInt()将字符串转换为整型。
- parseFloat()用来解析浮点数字字符串，只用于解析十进制数字。
- isNaN()判断一个变量是否为NaN(not a Number，给定的字符串不存在数值形式)
- isFinite()判断一个变量是否是一个有穷数，如果类型为Infinity（正无穷），-Infinity（负无穷）或NaN则返回false

### String字符串
字符串是一串Unicode字符序列。
更准确上来说是一串UTF-16编码单元的序列。

属性：
length编码单元的个数

### 变量
let
声明一个块级作用域的本地变量

const
声明一个不可变的常量。
var
声明变量