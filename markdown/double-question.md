---
title: 'double-question'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sat Oct 14 2023 23:53:09 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# double-question

:::tip\

如果你希望仅仅在null/undefined的时候， 认为false, use `??` 很有用， 比如空字符串的处理。 这些虚假值在 || 会被认为是false\

:::

<https://stackoverflow.com/questions/61480993/when-should-i-use-nullish-coalescing-vs-logical-or>

## ??

"?? "是空值合并运算符，通常用于处理可能为空或未定义的值。如果左侧的操作数是 null 或 undefined，它会返回右侧的操作数，否则返回左侧的操作数。这对于确保你有一个有效的值来使用非常有用。

例如：

```
```javascript
let value = someValue ?? defaultValue;
```

<button>javascript</button>
```

如果 `someValue` 有值，那么 `value` 将等于 `someValue`。如果 `someValue` 是 null 或 undefined，那么 `value` 将等于 `defaultValue`。

## ||

“||” 是逻辑或操作符，用于执行逻辑或操作。它返回第一个为真的操作数，如果都是假，则返回最后一个操作数。

例如：

```
```javascript
let result = expression1 || expression2;
```

<button>javascript</button>
```

如果 `expression1` 为真，那么 `result` 将等于 `expression1` 的值。如果 `expression1` 为假，但 `expression2` 为真，那么 `result` 将等于 `expression2` 的值。

## 总结

* “??” 用于处理空值和未定义值，确保你有一个有效的值。

* “||” 用于执行逻辑或操作，返回第一个为真的值。
