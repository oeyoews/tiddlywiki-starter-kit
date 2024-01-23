---
title: 'logic-operator'
tags: ['JavaScript']
created: 'Sat May 27 2023 11:34:55 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# logic-operator

JavaScript中有三种逻辑运算符：&&、||、!。这些逻辑运算符可以用于比较和操作布尔值。其中，&&表示逻辑与，||表示逻辑或，!表示逻辑非。

逻辑与（&&）：当且仅当两个操作数都为true时，返回true。如果其中一个操作数为false，则返回false。例如：

```
console.log(true && true); // 输出true
console.log(true && false); // 输出false
console.log(false && false); // 输出false
```

逻辑或（||）：当至少有一个操作数为true时，返回true。如果两个操作数都为false，则返回false。例如：

```
console.log(true || true); // 输出true
console.log(true || false); // 输出true
console.log(false || false); // 输出false
```

逻辑非（!）：用于对布尔值进行取反操作，即将true变为false，false变为true。例如：

```
console.log(!true); // 输出false
console.log(!false); // 输出true
```

逻辑运算符可以用于复杂的条件判断和流程控制，特别是在与if语句和三元运算符结合使用时非常方便。需要注意的是，逻辑运算符的运算顺序是从左到右，可以通过使用圆括号来改变运算顺序。
