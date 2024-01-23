---
title: 'axios-http'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed May 03 2023 02:46:01 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# axios-http

是的，axios 可以代替 fetch 进行网络请求。虽然 fetch 在现代浏览器中已经成为了原生 API，但是它的兼容性还不够完善，而且只能基于 Promise 来处理请求结果，使用起来相对比较麻烦。

axios 是一个基于 Promise 的 HTTP 客户端库，提供了丰富的 API 和配置选项，可以使得请求的配置、管理和拦截变得更加方便和灵活。axios 支持多种类型的请求（如 GET、POST、PUT、DELETE 等），支持自定义头部、请求参数、请求体等配置，同时也支持请求的取消、错误处理和超时设置等特性。

以下是使用 axios 发送 GET 请求的示例代码：

```javascript
import axios from 'axios';

axios.get('https://api.github.com/users/octocat')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

上面的代码通过 axios 发送了一个 GET 请求，并在请求成功后打印出响应数据。注意，在 axios 中，响应数据被封装在 response 对象的 data 属性中，我们需要通过 response.data 来获取响应数据。

由于 axios 具有更加丰富的功能和更好的可扩展性，因此在实际开发中，我们通常会优先选择 axios 来进行网络请求。
