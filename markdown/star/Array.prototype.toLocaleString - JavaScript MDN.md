---
title: 'Array.prototype.toLocaleString - JavaScript MDN'
tags: ['剪藏']
type: 'text/markdown'
created: 'Wed Dec 20 2023 08:09:16 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString'
---

# Array.prototype.toLocaleString - JavaScript MDN

**`toLocaleString()`** 方法返回一个字符串，表示数组中的所有元素。每个元素通过调用它们自己的 `toLocaleString` 方法转换为字符串，并且使用特定于语言环境的字符串（例如逗号“,”）分隔开。

## 尝试一下

## 语法

```
toLocaleString()
toLocaleString(locales)
toLocaleString(locales, options)
```

### 参数

* `locales` 可选

    带有 BCP 47 语言标签的字符串，或者此类字符串的数组。对于 `locales` 参数的一般形式和说明，可以参见 [`Intl` 主页面的参数说明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_%E5%8F%82%E6%95%B0)。

* `options` 可选

    一个具有配置属性的对象。对于数字，请参见 [`Number.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)；对于日期，请参见 [`Date.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)。

### 返回值

一个字符串，表示数组中的所有元素。

## 描述

`Array.prototype.toLocaleString` 方法遍历数组内容，并使用提供的 `locales` 和 `options` 参数调用每个元素的 `toLocaleString` 方法，通过由实现定义的分隔符（例如逗号“,”）将转换后的字符串拼接起来。请注意，该方法本身不会使用这两个参数——它只是将其传递给每个元素的 `toLocaleString()`。分隔符的选择取决于主机当前的语言环境，而不是 `locales` 参数。

如果一个元素是 `undefined`、`null`，它会被转换为空字符串，而不是 `"null"` 或者 `"undefined"`。

当用于[稀疏数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#%E7%A8%80%E7%96%8F%E6%95%B0%E7%BB%84)时，`toLocaleString()` 方法迭代时会把空槽当作 `undefined` 一样处理它。

`toLocaleString()` 方法是[通用的](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E9%80%9A%E7%94%A8%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95)。它只期望 `this` 值具有 `length` 属性和整数键属性。

## 示例

### 使用 locales 和 options

数组元素通过使用它们的 `toLocaleString` 方法转换为字符串。

* `Object`：[`Object.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString)

* `Number`：[`Number.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)

* `Date`：[`Date.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)

始终显示 `prices` 数组中字符串和数字的货币符号：

```
const prices = ["￥7", 500, 8123, 12];
prices.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });

// "￥7,￥500,￥8,123,￥12"
```

更多示例请参见 [`Intl.NumberFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) 和 [`Intl.DateTimeFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) 页面。

### 在稀疏数组中使用 toLocaleString()

`toLocaleString()` 将空槽视为 `undefined` ，并生成一个额外的分隔符：

```
console.log([1, , 3].toLocaleString()); // '1,,3'
```

### 在非数组对象中使用 toLocaleString()

`toLocaleString()` 方法读取 `this` 的 `length` 属性，然后访问每个整数索引。

```
const arrayLike = {
  length: 3,
  0: 1,
  1: 2,
  2: 3,
};
console.log(Array.prototype.toLocaleString.call(arrayLike));
// 1,2,3
```

## 规范

| [ECMAScript Language Specification # sec-array.prototype.tolocalestring](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.tolocalestring) |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [ECMAScript Internationalization API Specification # sup-array.prototype.tolocalestring](https://tc39.es/ecma402/#sup-array.prototype.tolocalestring)                   |

## 浏览器兼容性

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray%2FtoLocaleString&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.builtins.Array.toLocaleString%60%0A*+Report+started%3A+2023-12-20T08%3A09%3A09.682Z%0A%0A%3C%2Fdetails%3E&title=javascript.builtins.Array.toLocaleString+-+%3CSUMMARIZE+THE+PROBLEM%3E&template=data-problem.yml)

|                     | Chrome | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android | Deno | Node.js |
|---------------------|--------|------|---------|-------|--------|----------------|---------------------|---------------|---------------|------------------|-----------------|------|---------|
| `toLocaleString`    |        |      |         |       |        |                |                     |               |               |                  |                 |      |         |
| `locales` parameter |        |      |         |       |        |                |                     |               |               |                  |                 |      |         |
| `options` parameter |        |      |         |       |        |                |                     |               |               |                  |                 |      |         |

### Legend

Tip: you can click/tap on a cell for more information.

* * Full support

    * Partial support

    * 

    * Full support

    * Partial support

    * Has more compatibility info.

The compatibility table on this page is generated from structured data. If you’d like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## 参见
