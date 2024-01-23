---
title: 'dispatchEvent'
tags: ['JavaScript']
created: 'Sun Jun 04 2023 02:40:22 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# dispatchEvent

`dispatchEvent` 和 `addEventListener` 都是 JavaScript 中的 DOM API，但它们的作用不同。

`addEventListener` 方法用于为元素添加事件监听器，以响应用户的操作。事件监听器可以在元素上监听各种 DOM 事件，例如 `click`、`mouseover`、`keydown` 等等。当指定的事件在元素上发生时，事件监听器会自动被触发，执行相应的代码。例如：

```
```javascript
const myButton = document.querySelector('#myButton');
myButton.addEventListener('click', () => {
  console.log('按钮被单击了');
});
```

<button>javascript</button>
```

在这个示例中，我们使用 `addEventListener` 方法为一个按钮元素添加了一个单击事件监听器。当用户单击这个按钮时，事件监听器会被触发，输出 `'按钮被单击了'`。

`dispatchEvent` 方法用于手动触发指定元素上的指定事件。通过调用 `dispatchEvent` 方法，可以模拟用户在页面上进行的各种操作，例如单击按钮、提交表单等。例如：

```
```javascript
const myButton = document.querySelector('#myButton');
const clickEvent = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
  view: window
});
myButton.dispatchEvent(clickEvent);
```

<button>javascript</button>
```

在这个示例中，我们使用 `dispatchEvent` 方法手动触发了一个按钮的单击事件。由于按钮的单击事件被触发，所以控制台会输出 `'按钮被单击了'`。

需要注意的是，通过 `dispatchEvent` 方法触发的事件不会触发浏览器的默认行为，除非事件对象的 `cancelable` 属性被设置为 `false`。此外，使用 `dispatchEvent` 方法触发的事件也不会触发事件冒泡，除非事件对象的 `bubbles` 属性被设置为 `true`。

```
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>dispatchEvent 示例</title>
  </head>
  <body>
    <button id="myButton">点击我触发事件</button>

    <!-- JavaScript 代码 -->
    <script>
      // 获取按钮元素
      const button = document.getElementById("myButton");

      // 创建自定义事件
      const customEvent = new Event("customEvent");

      // 添加事件监听器
      button.addEventListener("click", function () {
        console.log("按钮被点击了");

        // 触发自定义事件
        button.dispatchEvent(customEvent);
      });

      // 在自定义事件上添加另一个事件监听器
      button.addEventListener("customEvent", function () {
        console.log("自定义事件被触发了");
      });
    </script>
  </body>
</html>
```

<button>html</button>
```
