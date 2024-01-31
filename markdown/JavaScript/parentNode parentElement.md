---
title: 'parentNode parentElement'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed Jan 31 2024 10:06:13 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# parentNode parentElement

`parentNode` 和 `parentElement` 都是用于访问元素的父节点，但它们之间有一些微妙的区别：

1. **返回类型**：

    * `parentNode` 返回父节点，可以是任何类型的节点，包括元素节点、文档节点和文档片段节点等。

    * `parentElement` 返回的是父元素节点，也就是说它只会返回元素节点作为父节点，如果父节点不是元素节点，则返回 null。

1. **兼容性**：

    * `parentNode` 是DOM标准中定义的，因此在所有支持DOM的浏览器中都能使用。

    * `parentElement` 是现代浏览器的特性，它是在IE9及其以上版本和其他现代浏览器中才能使用的。在旧版本的IE中不支持。

1. **语义**：

    * `parentNode` 的命名更加通用，它强调了节点的父关系，可以用于任何类型的节点。

    * `parentElement` 的命名更加具体，它强调了元素节点的父关系，只用于访问元素节点的父节点。

因此，一般来说，如果你需要访问元素的父节点，并且只关心父节点是不是元素节点，那么你可以使用 `parentElement`。但是如果你需要处理更一般的情况，或者需要考虑兼容性，那么最好使用 `parentNode`。
