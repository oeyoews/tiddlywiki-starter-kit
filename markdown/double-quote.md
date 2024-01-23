---
title: 'double-quote'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sat May 27 2023 11:33:31 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
page-cover: 'https://source.unsplash.com/random?fm=blurhash&w=50&double-quote'
---

# double-quote

“??“是一个新的语法特性，也称为"nullish coalescing operator”，可以用于判断一个值是否为 null 或 undefined，如果是，就返回一个默认值。这个语法特性和逻辑运算符”||“有些类似，但是它可以明确地区分 null 和 0 或’'这些"假值”，从而避免一些潜在的问题。例如：

```
```js
const foo = null ?? 'default value';
console.log(foo); // 输出'default value'

const bar = 0 || 'default value';
console.log(bar); // 输出'default value'，这里会出现一些潜在的问题
```

<button>js</button>
```

可以看到，当我们使用"??“运算符时，只有在值为 null 或 undefined 时才会返回默认值，而使用逻辑运算符”||“时，除了 null 和 undefined 之外，其他的"假值"也会触发返回默认值的操作。因此，在某些情况下，使用”??"运算符可能会更加安全和可靠。
