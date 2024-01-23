---
title: 'js-false'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Fri May 26 2023 16:19:05 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
page-cover: 'https://source.unsplash.com/random?fm=blurhash&w=50&js-false'
---

# js-false

![](https://images.unsplash.com/photo-1542319465-7a87c5f95757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTAyMTB8MHwxfHNlYXJjaHwxNHx8ZmFsc2V8ZW58MHwwfHx8MTY4NTExODA3NHww&ixlib=rb-4.0.3&q=80&w=1080)
在 JavaScript 中会被判断为 `false` 的有以下几种情况：

1. `false`：布尔值 `false`。

1. `null`：表示一个空对象指针。

1. `undefined`：表示一个未定义的值。

1. `0`：数值 `0`。

1. `NaN`：表示非数字（Not-a-Number）值。例如 `0/0` 或者 `parseInt("abc")`。

1. 空字符串 `""`：表示一个空字符串。

这些情况都可以用于条件语句中作为 `false` 的值。相应地，除了这些值以外的所有值都会被视为 `true`。例如，非空字符串、非零数值、非空对象等都会被视为 `true`。

在条件语句中，可以使用 `!` 运算符来判断一个值是否为 `false`，例如：

```
```javascript
const x = 0;
// -- 得正
if (!x) {
  console.log("x is false");
} else {
  console.log("x is true");
}
```

<button>javascript</button>
```

在上面的代码中，由于 `x` 的值为 `0`，因此它会被判断为 `false`，因此条件语句会输出 `"x is false"`。
