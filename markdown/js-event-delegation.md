---
title: 'js-event-delegation'
tags: ['JavaScript']
created: 'Thu Jun 01 2023 11:59:51 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# js-event-delegation

JavaScript 事件代理（Event Delegation）(事件委托)是一种常用的事件处理技术，它利用事件冒泡机制，在父元素上监听事件，通过判断事件源来触发对应的处理函数，可以避免在每个子元素上单独绑定事件处理函数，提高程序效率和可维护性。

具体来说，事件代理的实现方式是在父元素上绑定事件处理函数，当子元素触发事件时，事件会沿着 DOM 树向上传递，直到被父元素捕获并触发事件处理函数。在事件处理函数中，可以通过事件对象的 `target` 属性来获取实际触发事件的子元素，进而根据需要进行相应的操作。

使用事件代理可以避免在子元素上频繁绑定和解绑事件处理函数，从而提高程序的性能和可维护性。同时，当子元素动态增加或删除时，事件代理也能够自动适应，无需重新绑定事件处理函数。

下面是一个使用事件代理的示例代码：

```html
<ul id="parent">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

```javascript
// 获取父元素
const parent = document.getElementById('parent');

// 在父元素上绑定事件处理函数
parent.addEventListener('click', function(event) {
  // 判断事件源是否为子元素
  if (event.target.nodeName === 'LI') {
    // 对子元素进行操作
    console.log(`Clicked on ${event.target.textContent}`);
  }
});
```

在上述代码中，我们在父元素 `ul` 上绑定了 `click` 事件处理函数，然后通过判断事件源的标签名是否为 `li` 元素，来确定是哪个子元素触发了事件。这样，无论子元素的数量和内容如何变化，只需要维护父元素上的事件处理函数即可。
