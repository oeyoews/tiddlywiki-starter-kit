---
title: 'shared-data'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Oct 02 2023 06:06:51 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# shared-data

在同源页面中，可以使用`window.postMessage()`方法实现数据共享。`postMessage()`方法允许将消息发送到另一个窗口或跨窗口的 iframe 中。

以下是一些基本步骤来实现同源页面之间的数据共享：

1. 在一个页面中使用`window.postMessage()`方法发送消息给另一个页面。

1. 在另一个页面中使用`window.addEventListener()`方法监听`message`事件。

1. 当`message`事件被触发时，使用`event.source.postMessage()`方法向原始页面发送响应数据。

下面是一个简单示例，演示如何在两个同源页面之间共享数据：

在源页面中：

```
// 源页面
const targetWindow = window.parent; // 获取目标窗口对象
targetWindow.postMessage('hello', 'http://localhost:8080'); // 向目标窗口发送消息
```

在目标页面中：

```
// 目标页面
window.addEventListener('message', function(event) {
  if (event.origin === 'http://localhost:8080') { // 确认消息来源
    console.log('收到来自源页面的消息:', event.data);
    event.source.postMessage('world', event.origin); // 向源页面发送响应消息
  }
});
```

在这个示例中，源页面向目标窗口发送了一个消息`hello`，并指定消息需要发送到`http://localhost:8080`。当目标页面接收到来自源页面的消息时，它会打印出消息内容，并向源页面发送响应消息`world`。

需要注意的是，也同样需要在接收页面中进行安全检查，以确保消息来自预期的来源，并防止 XSS 攻击等风险。此外，在使用`postMessage()`方法时，还需要谨慎处理消息内容，避免不良用户通过此方式传递恶意代码。
