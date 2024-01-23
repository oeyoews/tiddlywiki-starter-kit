---
title: 'parseInt-Number'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sun Sep 24 2023 06:15:33 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# parseInt-Number

`parseInt` 和 `Number` 是 JavaScript 中用于将字符串转换为数字的两个不同方法，它们之间有一些重要的区别：

1. **parseInt**:

    * `parseInt` 是一个函数，用于将字符串解析为整数。

    * 可以传递第二个参数 `radix`，指定解析时使用的进制（基数），通常使用 10（十进制）。

    * `parseInt` 会从字符串的开头开始解析，直到遇到无法解析为数字的字符为止，然后返回解析的部分。

    * 如果字符串以非数字字符开头，`parseInt` 会返回 `NaN`（Not-a-Number）。

    * `parseInt` 可以用于解析带有正负号的整数，例如 `"123"`、`"-456"`。

    * `parseInt` 不适用于解析浮点数。

    例如：

```
```javascript
parseInt("123"); // 返回 123
parseInt("3.14"); // 返回 3
parseInt("abc123"); // 返回 NaN
parseInt("123abc"); // 返回 123
```

<button>javascript</button>
```

1. **Number**:

    * `Number` 是一个构造函数，用于将值转换为数字。

    * 当传递一个字符串给 `Number` 时，它会尝试将整个字符串转换为一个数字。

    * 如果字符串包含非数字字符（除了可能的正负号和小数点），`Number` 会返回 `NaN`。

    * `Number` 也可以用于将其他类型的值转换为数字，例如布尔值、`null`、`undefined` 等，它会根据规则将它们转换为相应的数字值。

    例如：

```
```javascript
Number("123"); // 返回 123
Number("3.14"); // 返回 3.14
Number("abc123"); // 返回 NaN
Number("123abc"); // 返回 NaN
```

<button>javascript</button>
```

总结：

* 如果你需要将字符串解析为整数，并且需要对解析的进制进行控制，可以使用 `parseInt`。

* 如果你需要将字符串解析为数字（可以是整数或浮点数），可以使用 `Number`。

* 无论哪种方法，都需要注意字符串中的非数字字符可能导致结果为 `NaN`。
