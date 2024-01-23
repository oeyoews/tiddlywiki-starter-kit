---
title: 'hasOwn-hasOwnProperty'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sun Dec 03 2023 13:28:15 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# hasOwn-hasOwnProperty

`hasOwnProperty` 和 `hasOwn` 都涉及到 JavaScript 中对象的属性检查，但它们是不同的。

1. **hasOwnProperty:**

    * `hasOwnProperty` 是 JavaScript 中原生的方法，用于检查对象是否具有指定名称的自身属性。

    * 语法：`object.hasOwnProperty(propertyName)`，其中 `object` 是要检查的对象，`propertyName` 是属性的名称。

    * 返回值：如果对象具有指定名称的自身属性，返回 `true`，否则返回 `false`。

    * 示例：```
```javascript
var obj = { key: 'value' };
console.log(obj.hasOwnProperty('key')); // true
console.log(obj.hasOwnProperty('toString')); // false，因为 toString 是继承的属性
```

<button>javascript</button>
```

hasOwn 是 es2022, chatgpt(gpt 3.5) 无法回答这个问题
