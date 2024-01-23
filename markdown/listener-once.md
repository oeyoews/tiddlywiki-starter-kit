---
title: 'listener-once'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Oct 02 2023 16:46:09 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# listener-once

如果您想要在 HTML 元素上添加只监听一次的事件处理程序，可以使用 `addEventListener()` 方法的 `{once: true}` 选项。这个选项允许您在元素上添加一个只触发一次的事件监听器。

以下是一个使用 `{once: true}` 选项的示例：

```
```html
<button id="myButton">点击我</button>

<script>
const button = document.getElementById('myButton');

function handleClick() {
  console.log('按钮被点击了');
}

button.addEventListener('click', handleClick, {once: true});
</script>
```

<button>html</button>
```

在上述示例中，我们首先获取了一个 `<button>` 元素，并为其添加了一个点击事件监听器 `handleClick`。通过将 `{once: true}` 对象作为第三个参数传递给 `addEventListener` 方法，我们指示浏览器只触发该事件监听器一次。当用户单击按钮时，将执行 `handleClick` 函数并记录一条消息。

请注意，`{once: true}` 选项仅适用于当前添加的事件监听器。如果需要在将来再次添加一个只监听一次的事件监听器，您将需要重新使用 `{once: true}` 选项。
