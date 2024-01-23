---
title: 'get-port'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Oct 30 2023 02:22:18 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# get-port

get-port 和 get-port-please 都是 Node.js 中的模块，用于获取可用的端口号。它们的主要区别在于 get-port-please 是 get-port 的扩展，提供了额外的功能和选项。

get-port 可以自动查找当前系统中未使用的端口号，并返回一个 Promise 对象，该对象的解析值为可用的端口号。使用 get-port，你可以轻松地获取一个可用的端口号，而无需手动查找。

get-port-please 基于 get-port，提供了额外的功能，例如：

1. 可以指定端口号范围，只在指定的端口范围内查找可用端口号。

1. 可以指定要跳过的端口号列表，这些端口号将从查找中排除。

1. 可以选择使用 IPv4 或 IPv6 地址来查找可用端口号。

1. 可以指定最大尝试次数和等待时间，以控制查找可用端口号的时间。

总之，get-port-please 提供了更多的灵活性和选项，使得端口号的查找更加方便和可控。但如果你只需要简单地获取一个可用的端口号，那么使用 get-port 就足够了。
