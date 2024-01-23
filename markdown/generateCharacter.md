---
title: 'generateCharacter'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed Dec 20 2023 12:55:55 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# generateCharacter

```
```js
let result = Array.from({length:75},(_,i)=>String.fromCharCode(i+48)).sort().filter(c=>/[A-Za-z0-9]/.test(c)).join('');
console.log(result);
```

<button>js</button>
```

在上面提供的 JavaScript 代码中，`Array.from({length:75},(_,i)=>String.fromCharCode(i+48))` 是用于创建包含字符的数组的部分。

让我对这段代码进行解释：

1. `Array.from({length:75}, (_, i) => String.fromCharCode(i + 48))`: 这一部分使用 `Array.from` 方法创建了一个长度为 75 的数组。在这个数组中，第二个参数的回调函数 `(_, i) => String.fromCharCode(i + 48)` 被调用了 75 次。这个回调函数的目的是生成字符，`String.fromCharCode(i + 48)` 则将 ASCII 码为 `i + 48` 的字符转换为字符串。

1. `.sort()`: 接下来，对生成的字符数组进行排序。

1. `.filter(c => /[A-Za-z0-9]/.test(c))`: 使用 `filter` 方法过滤掉不是大写字母、小写字母或数字的字符。

1. `.join('')`: 最后，使用 `join('')` 方法将过滤后的字符数组连接成一个字符串。

这一行代码的目的是创建一个包含排序且只包含大写字母、小写字母和数字的字符串。

在上述 JavaScript 代码中，`test` 是 JavaScript 中正则表达式对象的一个方法。该方法用于测试一个字符串是否匹配正则表达式，并返回一个布尔值。

在具体的例子中，`/[A-Za-z0-9]/.test(c)` 这一部分使用正则表达式来测试字符 `c` 是否是大写字母、小写字母或数字。正则表达式 `[A-Za-z0-9]` 匹配任何一个大写字母、小写字母或数字。如果 `c` 包含在这个范围内，`test` 方法返回 `true`，否则返回 `false`。

因此，`.filter(c => /[A-Za-z0-9]/.test(c))` 的作用是过滤掉那些不是大写字母、小写字母或数字的字符，保留符合条件的字符。
