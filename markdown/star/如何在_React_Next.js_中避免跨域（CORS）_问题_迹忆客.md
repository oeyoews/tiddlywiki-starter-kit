---
title: '如何在_React_Next.js_中避免跨域（CORS）_问题_迹忆客'
tags: ['剪藏']
type: 'text/markdown'
created: 'Tue Nov 07 2023 07:51:07 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://www.jiyik.com/tm/xwzj/network_1333.html'
---

# 如何在_React_Next.js_中避免跨域（CORS）_问题_迹忆客

如果您编写过任何前端代码，那么您之前可能遇到过 CORS 错误，如下所示：

```
Access to _ has been blocked by CORS policy
```

跨域资源共享 (CORS) 是一种协议，它定义了跨不同 URL 时应如何处理 Web 请求。

---

## 为什么跨域请求会成为问题？

对于我们访问的每个网站，浏览器都会保存很多关于我们的状态。假设我们已登录 `mybank.com`，并且我们在 `mybank.com` 上设置了一个 cookie，表明我们已登录。

在浏览时，我们不小心访问了恶意网站，该网站向 [mybank.com](http://mybank.com) 发出如下请求：

```
// 从 https://malicious.site 获取请求
fetch("https://api.mybank.com/account_details", {
    method: "GET",
    credentials: "include",
})
```

如果允许此请求并且包含我们的 cookie，则恶意网站的所有者将能够代表我们提出请求并读取我们的帐户详细信息。

使用 CORS，允许服务器指定它将接受和拒绝哪些跨域请求。它可以拒绝需要 cookie 的请求。它可以拒绝来自 [untrusted.mybank.com](http://untrusted.mybank.com) 的请求，但接受来自 [app.mybank.com](http://app.mybank.com) 的请求。它可以拒绝所有 POST 请求，但允许 GET 和 PUT。

关于 CORS 需要注意的重要一点是，配置/设置是在服务器上完成的，并由服务器和我们的浏览器强制执行。大多数服务器框架都有一个用于配置 CORS 标头的库，但如果我们想查看底层标头本身，[这里](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)有一个很好的资源。

---

## 实际例子

假设我们有一个带有 Express 后端的 React 应用程序。我们的前端在端口 3000 上运行——这是 React 的常见默认值。

由于我们的后端也不能在本地的 3000 端口上运行，我们将设置 Express 以在 4000 端口上运行。

```
const express = require('express')
const app = express()
const port = 4000
app.get('/whoami', (req, res) => {
    res.send('Who is anybody?')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

如果我们的 React 应用程序像这样向我们的后端发出 fetch 请求：

```
// 获取来自 http://127.0.0.1:3000 的请求
fetch("http://127.0.0.1:4000/whoami")
```

我们应该期待一个 CORS 错误。就像我们之前的示例一样，127.0.0.1:3000 和 127.0.0.1:4000 被视为两个独立的域，因此我们还不能跨它们发出请求。让我们看一些解决此问题的方法。

### 修复 1：修复服务器

一种方法是修复我们的服务器。我们可以通过安装 CORS 库 (`https://www.npmjs.com/package/cors`) 并告诉服务器期待来自 127.0.0.1:3000 的请求来做到这一点

```
app.use(cors({
    origin: 'http://127.0.0.1:3000',
}))
```

我们的请求现在将成功。这种方法非常简单，通常是很好的做法。如果我们的前端和后端托管在两个不同的子域上，我们可以在生产中使用相同的方法。

### 修复 2：添加代理

在生产中，在某些情况下，我们将从同一个来源托管我们的前端和后端。在这些情况下，我们通常希望编写如下所示的 fetch 代码：

```
fetch("/whoami")
```

而不是这样：

```
const url;
if (process.env.NODE_ENV === "production") {
    url = "https://www.example.com/whoami"
} else {
    url = "http://127.0.0.1:4000/whoami"
}
fetch(url)
```

为此，`create-react-app` 实际上自带设置简单代理的能力。将以下内容添加到我们的 package.json 中：

```
"proxy": "http://localhost:4000",
```

然后，任何看起来像 API 请求的请求（例如，内容类型为 `application/json`）都会自动转发到 `http://localhost:4000`。

绕过 CORS 问题的原因是，对于浏览器来说，请求将转到 `http://localhost:3000`，因此看起来不像是跨域请求。 `http://localhost:3000` 的服务器确实将请求转发到 `http://localhost:4000`，但浏览器不知道。

如果我们使用 Next.js 而不是 create-react-app，则可以在 next.config.js 中设置重定向，它将转发所有匹配的流量：

```
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/:path*'
      }
    ]
  }
}
```

---

## 总结

在 React 和 Next.js 中修复任何 CORS 问题的最简单方法实际上是不更改 React 或 Next.js 中的任何内容，而是修复我们的服务器以允许来自它们的请求。

如果我们无法更改服务器，React 和 Next.js 都有办法让我们将它们转换为代理，并代表我们将请求代理到后端。这通过使我们的浏览器认为请求不再是跨域请求来避免任何 CORS 问题。
