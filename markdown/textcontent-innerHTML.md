---
title: 'textcontent-innerHTML'
tags: ['JavaScript']
created: 'Wed May 31 2023 11:00:26 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# textcontent-innerHTML

`textContent`和`innerHTML`都是用于获取或设置HTML元素文本内容的属性，但它们的用途略有不同。

`textContent`用于获取或设置HTML元素的纯文本内容，即不包含任何HTML标记的文本。例如，如果您有一个`<p>`元素，其中包含一些文本和一些HTML标记，使用`textContent`将只返回文本内容，而不包含任何HTML标记。例如：

```html
<p id="my-paragraph">这是一些文本内容<span>带有HTML标记</span></p>
```

```javascript
var paragraph = document.getElementById('my-paragraph');
console.log(paragraph.textContent); // 输出："这是一些文本内容带有HTML标记"
```

`innerHTML`用于获取或设置HTML元素的HTML内容，即包含所有HTML标记的内容。例如，使用`innerHTML`将返回包含HTML标记的完整HTML字符串，例如：

```html
<p id="my-paragraph">这是一些文本内容<span>带有HTML标记</span></p>
```

```javascript
var paragraph = document.getElementById('my-paragraph');
console.log(paragraph.innerHTML); // 输出："<span>带有HTML标记</span>"
因此，如果您只需要获取或设置HTML元素的文本内容，而不需要包含HTML标记，那么使用`textContent`将更适合您的需求。如果您需要获取或设置HTML元素的完整HTML内容，包括所有HTML标记，那么使用`innerHTML`将更适合您的需求。
```
