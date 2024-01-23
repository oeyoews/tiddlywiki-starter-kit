---
title: 'equals'
tags: ['JavaScript']
created: 'Mon May 22 2023 03:46:43 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# equals

在 JavaScript 中，`==` 和 `===` 都是用来比较两个值是否相等的运算符，但它们之间有一些区别。

`==` 运算符会在比较之前进行类型转换，将两个值转换成相同的类型，然后再进行比较。这种类型转换可能会导致一些不直观的结果，例如：

```
```javascript
console.log(1 == "1"); // true
console.log(0 == false); // true
console.log("" == false); // true
```

<button>javascript</button>
```

上面的例子中，`==` 运算符会将字符串 `"1"`、布尔值 `false` 和空字符串 `""` 都转换成数值 `0` 进行比较，因此结果都是 `true`。

相比之下，`===` 运算符不会进行类型转换，而是直接比较两个值是否相等。这种比较更加严格，只有在两个值的类型和值都相等时才会返回 `true`。例如：

```
```javascript
console.log(1 === "1"); // false
console.log(0 === false); // false
console.log("" === false); // false
```

<button>javascript</button>
```

上面的例子中，由于类型不同，因此结果都是 `false`。

因此，建议在比较两个值时，优先使用 `===` 运算符，这样可以避免类型转换带来的不确定性。
