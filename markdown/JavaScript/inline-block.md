---
title: 'inline-block'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Thu Jan 25 2024 16:51:46 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# inline-block

在前端开发中，“inline”、“inline-block” 和 “block” 是用来定义 HTML 元素在页面中的布局方式的三种常见属性。

1. **inline（内联）**：inline 元素会在同一行内显示，不会产生换行。它们的宽度和高度是由其内容决定的，无法设置固定的宽度和高度。常见的 inline 元素包括 `<span>`、`<a>` 和 `<img>`。例如：

```html
<span>这是一个内联元素</span> <span>这也是一个内联元素</span>
```

1. **inline-block（内联块）**：inline-block 元素会像 inline 元素一样在同一行内显示，但是可以设置固定的宽度和高度，同时也可以设置边距、填充等样式。常见的 inline-block 元素包括 `<input>` 和 `<button>`。例如：

```html
<div style="display: inline-block; width: 100px; height: 50px; background-color: red;"></div>
<div style="display: inline-block; width: 100px; height: 50px; background-color: blue;"></div>
```

1. **block（块级）**：block 元素会独占一行，会在前后产生换行。block 元素的宽度默认是其父元素的 100%，可以设置固定的宽度和高度。常见的 block 元素包括 `<div>`、`<p>` 和 `<h1>` 等。例如：

```html
<div>这是一个块级元素</div>
<div>这是另一个块级元素</div>
```

因此，这三种布局方式的区别在于它们在页面中的显示形式、宽度和高度的设置方式以及是否产生换行。
