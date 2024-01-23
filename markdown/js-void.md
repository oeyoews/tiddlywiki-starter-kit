---
title: 'js-void'
tags: ['JavaScript']
created: 'Mon May 29 2023 12:10:10 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# js-void

javascript:void()和#都是用于在HTML中创建链接的特殊URL。它们的作用是让用户点击链接时不跳转或刷新页面，而是执行一些JavaScript代码或将用户滚动到页面的顶部。

具体来说，javascript:void()是一个空的JavaScript语句，它不会执行任何操作。如果将javascript:void()作为链接的href属性值，当用户点击该链接时，浏览器将执行javascript:void()语句，并不会有任何变化。例如：

```html
<a href="javascript:void()">点击我</a>
```

在这个例子中，我们创建了一个链接，并将其href属性设置为javascript:void()。当用户点击该链接时，浏览器将执行javascript:void()语句，但不会有任何变化。

相比之下，#是用于创建锚点的特殊URL，它会将用户滚动到页面的顶部。如果将#作为链接的href属性值，当用户点击该链接时，浏览器将滚动到页面的顶部，并不会跳转或刷新页面。例如：

```html
<a href="#">回到顶部</a>
```

在这个例子中，我们创建了一个链接，并将其href属性设置为#。当用户点击该链接时，浏览器将滚动到页面的顶部，但并不会跳转或刷新页面。

需要注意的是，虽然javascript:void()和#都是用于在HTML中创建链接的特殊URL，但它们有所不同。javascript:void()不会执行任何操作，而#会将用户滚动到页面的顶部。在实际开发中，需要根据具体需求选择合适的URL。
