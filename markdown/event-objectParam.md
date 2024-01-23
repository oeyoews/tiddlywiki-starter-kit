---
title: 'event-objectParam'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sun Jun 04 2023 03:01:41 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
page-cover: 'https://source.unsplash.com/random?fm=blurhash&w=50&event-objectParam'
---

# event-objectParam

Undefined widget 'tid2pdf'
```
```js
// 获取按钮元素
const myButton = document.getElementById('myButton');

// 绑定点击事件
myButton.addEventListener('click', function(event) {
  // 使用 event.objectParam 获取事件相关的信息
  const button = event.target;
  const buttonId = button.id;
  const eventType = event.type;
  const clientX = event.clientX;
  const clientY = event.clientY;
  
  console.log('按钮 ID：', buttonId);
  console.log('事件类型：', eventType);
  console.log('鼠标点击位置：', clientX, clientY);
});
```

<button>js</button>
```
