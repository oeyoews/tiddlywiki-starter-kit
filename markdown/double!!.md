---
title: 'double!!'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sun Jul 09 2023 12:35:58 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# double!!

在编程中，`!!variable` 的用途是将一个值转换为相应的布尔值。这是一种常见的技巧，可以用来判断一个值是否为真或假。

具体地说，`!!variable` 的作用是将 `variable` 转换为布尔类型。如果 `variable` 是一个真值（例如非空字符串、非零数字、非空对象等），则 `!!variable` 的结果为 `true`。如果 `variable` 是一个假值（例如空字符串、零、`null`、`undefined` 等），则 `!!variable` 的结果为 `false`。

这种转换通常用于条件判断，例如在逻辑表达式中使用。它可以将非布尔类型的值转换为布尔类型，以便进行条件判断或逻辑运算。

以下是一个示例：

```
```javascript
const value = "Hello";
const booleanValue = !!value;
console.log(booleanValue); // true
```

<button>javascript</button>
```

在上述示例中，将字符串 “Hello” 转换为布尔类型，结果为 `true`。

需要注意的是，`!!variable` 的使用并不是必需的，因为在大多数情况下，JavaScript 会自动进行类型转换来进行条件判断。但是，使用 `!!` 可以明确地将值转换为布尔类型，以增加代码的可读性和清晰性。
