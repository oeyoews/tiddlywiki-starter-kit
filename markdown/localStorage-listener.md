---
title: 'localStorage-listener'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Oct 02 2023 06:06:25 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# localStorage-listener

在 Web 应用中，有多种方法可以实现数据共享。其中一种方式是使用`localStorage`来存储和读取数据，以便多个页面之间可以共享相同的数据。

使用`localStorage`进行数据共享，有以下几个步骤：

1. 在一个页面中使用`localStorage.setItem()`方法将要共享的数据存储到`localStorage`中。

1. 在另一个页面中使用`localStorage.getItem()`方法获取保存在`localStorage`中的数据。

1. 在每个页面中使用`window.addEventListener()`方法监听`storage`事件。

1. 当`storage`事件被触发时，使用`localStorage.getItem()`方法获取更新后的最新数据。

以下是一个简单示例，演示如何在两个页面之间共享数据：

```
// 页面 1
// 存储数据
localStorage.setItem('name', '张三');

// 页面 2
// 获取数据
const name = localStorage.getItem('name');
console.log(name); // 输出：'张三'

// 监听 storage 事件
window.addEventListener('storage', function(event) {
  if (event.key === 'name') {
    console.log('共享的数据已更新为：' + event.newValue);
  }
});
```

上述代码在页面 1 中存储了一个名为`name`的数据，然后在页面 2 中通过`localStorage.getItem()`方法获取存储在`localStorage`中的`name`数据。此外，在页面 2 中使用`window.addEventListener()`方法监听`storage`事件，以便在该数据发生更改时获取通知。当在页面 1 中更改`name`数据时，将触发`storage`事件，在页面 2 中会输出提示消息。

需要注意的是，由于`localStorage`在同一个域名下的所有页面之间共享，因此，这种数据共享方式受到同源策略的限制，无法实现跨域数据共享。同时，为了避免数据冲突，在使用`localStorage`共享数据时，应该根据数据的使用场景和业务需求，制定良好的数据处理规则，避免不同页面之间的数据误操作。
