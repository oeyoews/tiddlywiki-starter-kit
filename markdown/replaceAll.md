---
title: 'replaceAll'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sat Jan 13 2024 06:33:10 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# replaceAll

在 JavaScript 中，`replace` 和 `replaceAll` 都是用于替换字符串中指定文本的方法。它们之间的主要区别在于处理替换的方式。

1. **replace:**

    * `replace` 方法替换字符串中第一个匹配的文本。

    * 使用方式为 `str.replace(search, replacement)`，其中 `search` 是要替换的文本或正则表达式，`replacement` 是用于替换的新文本。

    示例：

```javascript
let originalStr = "apple orange apple banana";
let newStr = originalStr.replace("apple", "grape");
console.log(newStr); // 输出: "grape orange apple banana"
```

1. **replaceAll:**

    * `replaceAll` 方法替换字符串中所有匹配的文本。

    * 使用方式为 `str.replaceAll(search, replacement)`，其中 `search` 是要替换的文本或正则表达式，`replacement` 是用于替换的新文本。

    示例：

```javascript
let originalStr = "apple orange apple banana";
let newStr = originalStr.replaceAll("apple", "grape");
console.log(newStr); // 输出: "grape orange grape banana"
```

需要注意的是，`replaceAll` 是在 ECMAScript 2021 中引入的，因此在一些较旧的 JavaScript 环境中可能不被支持。在现代环境中，推荐使用 `replaceAll` 来替换所有匹配的文本，而在需要替换第一个匹配时使用 `replace`。
