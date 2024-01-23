---
title: 'node-browser-cros'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sat Nov 04 2023 08:42:54 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# node-browser-cros

在浏览器中，由于安全原因，存在同源策略 (Same-Origin Policy) 的限制。同源策略是一种安全机制，它阻止了通过脚本从一个源加载的文档或脚本访问另一个源的内容，除非这两个源具有相同的协议、主机名和端口号。

跨域请求是指在浏览器环境下，通过脚本发起的 HTTP 请求，其目标地址与当前页面的主机、端口或协议不一致。浏览器会根据同源策略进行安全限制，通常会导致跨域请求失败。

而在 Node.js 环境中，没有同源策略的限制。Node.js 是一个基于 V8 引擎的 JavaScript 运行时环境，用于服务器端开发。在 Node.js 中，你可以使用内置的`http`模块或第三方库（例如`node-fetch`）进行 HTTP 请求，并且不会受到同源策略的限制。

当你在 Node 环境中使用`fetch`函数发送跨域请求时，服务器不会对请求的源进行同源策略的检查，因此可以成功获取跨域资源。这使得 Node.js 成为一个强大的工具，可以用于爬虫、数据抓取等需要访问其他域上资源的场景。

需要注意的是，尽管在 Node.js 环境下可以跨域访问资源，但在浏览器中依然会受到同源策略的限制。如果你需要在浏览器中进行跨域请求，可以通过使用 CORS（跨域资源共享）或 JSONP 等技术进行解决。
