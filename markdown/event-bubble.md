---
title: 'event-bubble'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Fri Apr 21 2023 08:00:44 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# event-bubble

## 事件冒泡

DOM 事件，也是有一个流程的。从事件触发开始到事件响应是有三个阶段。

* 事件捕获阶段(外 => 里) e.preventDefault();

* 处于目标阶段

* 事件冒泡阶段(里 => 外) e.stopPropagation();

## event 委托

简单来说，就是利用事件冒泡，将某个元素上的事件委托给他的父级。

### 优点

* 减少内存消耗

* 动态绑定事件

* 减少内存消耗，优化页面性能

好的，我可以举两个代码示例，来演示事件冒泡和事件委托的应用。

1. 事件冒泡示例

在这个示例中，我们为一个包含多个按钮的容器元素添加了一个单击事件处理程序。当用户单击任意一个按钮时，事件将从该按钮开始冒泡，最终到达容器元素，并触发事件处理程序。然后，我们使用事件对象来获取单击按钮的 ID，以便在控制台中输出。

```
```html
<div id="container">
  <button id="btn1">按钮 1</button>
  <button id="btn2">按钮 2</button>
  <button id="btn3">按钮 3</button>
</div>
```

<button>html</button>
```

```
```javascript
var container = document.getElementById('container');

container.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    console.log('您单击了按钮：' + event.target.id);
  }
});
```

<button>javascript</button>
```

当用户单击任意一个按钮时，事件将从该按钮开始冒泡，最终到达容器元素，并触发事件处理程序。然后，我们使用事件对象来获取单击按钮的 ID，以便在控制台中输出。

1. 事件委托示例

在这个示例中，我们为一个包含多个列表项的列表元素添加了一个单击事件处理程序。但是，我们并没有将事件处理程序直接绑定到每个列表项上，而是将它绑定到列表元素的父元素上。当用户单击任意一个列表项时，事件将冒泡到列表元素，并触发事件处理程序。然后，我们使用事件对象来获取单击列表项的内容，以便在控制台中输出。

```
```html
<ul id="list">
  <li>列表项 1</li>
  <li>列表项 2</li>
  <li>列表项 3</li>
</ul>
```

<button>html</button>
```

```
```javascript
var list = document.getElementById('list');

list.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('您单击了列表项：' + event.target.textContent);
  }
});
```

<button>javascript</button>
```

当用户单击任意一个列表项时，事件将冒泡到列表元素，并触发事件处理程序。然后，我们使用事件对象来获取单击列表项的内容，以便在控制台中输出。

希望这两个示例能够帮助您更好地理解事件冒泡和事件委托的应用。如果您有任何问题或疑问，请随时向我提问。
