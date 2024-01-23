---
title: 'fetch-api'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Tue May 23 2023 02:29:21 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# fetch-api

Fetch API 使用 Promise 技术来处理异步操作。Fetch API 是用于异步获取资源的新标准 API，它提供了一种更现代、更简洁、更灵活的方式来处理网络请求。

在 Fetch API 中，我们可以使用全局的 fetch() 函数来发起网络请求。fetch() 函数返回一个 Promise 对象，可以在异步操作成功或失败时执行回调函数。如果请求成功，Promise 对象将会 resolve 并返回一个代表响应的 Response 对象；如果请求失败，Promise 对象将会 reject 并返回一个代表错误信息的 Error 对象。

以下是一个使用 Fetch API 发起网络请求的示例：

```
```javascript
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
```

<button>javascript</button>
```

使用 fetch() 函数发起一个 GET 请求，并在成功时输出响应的 JSON 数据，失败时输出错误信息。在 then 方法中，使用 response.json() 方法将响应的 JSON 数据解析为 JavaScript 对象。如果请求失败，catch 方法会捕获错误并输出错误信息。
