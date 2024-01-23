---
title: 'arrow-function-brackets'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Jul 24 2023 13:54:25 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# arrow-function-brackets

在箭头函数中使用大括号 `{}` 的有无会影响函数的行为。

如果箭头函数体内只有一条语句，你可以选择省略大括号 `{}`。这种情况下，该语句的结果将自动成为箭头函数的返回值。例如：

```javascript
const add = (a, b) => a + b;
console.log(add(1, 2)); // 输出：3
```

上述示例中，箭头函数 `add` 的函数体只有一条语句 `a + b`，因此可以省略大括号 `{}`。这样，函数会直接返回表达式 `a + b` 的结果。在调用 `add(1, 2)` 时，输出结果为 `3`。

但是，如果箭头函数体内有多个语句，则需要使用大括号 `{}` 将这些语句包裹起来，并使用 `return` 关键字显式地返回一个值。例如：

```javascript
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
console.log(multiply(2, 3)); // 输出：6
```

上述示例中，箭头函数 `multiply` 的函数体有两条语句：定义变量 `result` 和返回 `result`。这时就需要使用大括号 `{}` 将这两条语句包裹起来，并使用 `return` 关键字明确地返回 `result` 的值。在调用 `multiply(2, 3)` 时，输出结果为 `6`。

因此，是否在箭头函数体内使用大括号 `{}` 取决于函数体中的语句数量和你是否需要显式地返回一个值。
