---
title: 'equal and strict equal'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed Jan 17 2024 16:07:29 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# equal and strict equal

在JavaScript中，`==`和===是用于比较两个值是否相等的运算符。它们之间的主要区别在于==运算符在比较之前会对操作数进行类型转换，而===运算符会同时比较值和操作数的数据类型。

==运算符被称为松散相等运算符，因为它在进行比较之前会进行类型强制转换。这意味着如果操作数的数据类型不同，JavaScript引擎会自动将其中一个操作数转换为与另一个操作数相同的类型，以便进行比较。例如：

```javascript
const a = 100;
const b = '100';
console.log(a == b); // 输出 true
```

在上面的例子中，变量a的类型是数字，变量b的类型是字符串。当我们使用双等号（==）比较这两个变量时，输出为true，因为变量a的类型在比较之前被转换为字符串类型。

另一方面，===运算符被称为严格相等运算符，它不会在比较之前进行类型转换。它首先检查操作数的类型是否不同。如果类型不同，则返回false。如果类型相同，则检查值。如果值相同且不是数字，则返回true。如果两个操作数都是数字且不是NaN，并且它们的值相同，则返回true。否则返回false。

因此，建议在JavaScript中使用严格相等运算符===，以避免类型转换可能导致的意外结果。
