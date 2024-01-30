---
title: 'innerHTML outerHTML'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Jan 29 2024 12:39:34 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# innerHTML outerHTML

`outerHTML` 和 `innerHTML` 是 JavaScript 中常用的属性，用于获取元素的 HTML 内容，它们之间有一些区别：

1. `innerHTML`：这是一个 DOM 元素属性，用于获取或设置元素的 HTML 内容。当你使用 `innerHTML` 时，你可以获取到该元素的所有子元素及其内容，并且你可以修改它们。例如：

```javascript
var element = document.getElementById("example");
console.log(element.innerHTML); // 获取元素内容
element.innerHTML = "<p>新的 HTML 内容</p>"; // 设置新的 HTML 内容
```

1. `outerHTML`：这也是一个 DOM 元素属性，用于获取元素及其所有子元素的 HTML 内容，包括元素本身。相比于 `innerHTML`，`outerHTML` 会返回包含当前元素的 HTML 字符串。例如：

```javascript
var element = document.getElementById("example");
console.log(element.outerHTML); // 获取元素及其所有子元素的 HTML 内容
```

总的来说，`innerHTML` 返回的是元素的内部 HTML 内容，而 `outerHTML` 返回的是包含当前元素的 HTML 字符串，包括元素本身。
