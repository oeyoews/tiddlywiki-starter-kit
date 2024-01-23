---
title: 'querySelector'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sat Jun 03 2023 04:42:22 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# querySelector

`querySelector` 和 `getElementById`、`getElementsByClassName`、 `getElementsByTagName` 这类方法都是用来查找 HTML 元素的 DOM 方法，二者的主要区别在于：

1. `querySelector` 返回文档中匹配指定 CSS 选择器的第一个元素，而 `getElementById` 直接返回指定 ID 的元素（ID 必须唯一）。

1. `querySelector` 返回的是一个 Element 对象，而 `getElementById`、`getElementsByClassName`、 `getElementsByTagName` 返回的是一个 HTMLCollection 或 NodeList 对象，需要通过索引访问对应元素。

1. `querySelector` 可以使用更为灵活的 CSS 选择器语法进行查询，而 `getElementById`、`getElementsByClassName`、 `getElementsByTagName` 只能传入单个标签名、类名或 ID 等字符串参数。

举个例子，如果我们要获取文档中 ID 为 `myDiv` 的 div 元素，可以使用以下两种方式：

```
```js
var myDiv1 = document.querySelector('#myDiv');
var myDiv2 = document.getElementById('myDiv');
```

<button>js</button>
```

其中，`querySelector` 使用 CSS 选择器 `#myDiv` 来匹配 ID 为 `myDiv` 的元素，并返回第一个匹配的元素；而 `getElementById` 直接根据 ID 字符串 `myDiv` 返回对应的元素。
