---
title: 'Rendering__Edge_and_Node.js_Runtimes___Next.js'
tags: ['剪藏']
created: 'Thu Nov 16 2023 06:55:09 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
type: 'text/vnd.tiddlywiki'
url: 'https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes'
---

# Rendering__Edge_and_Node.js_Runtimes___Next.js

In the context of Next.js, runtime refers to the set of libraries, APIs, and general functionality available to your code during execution.\
在 Next.js 的上下文中，运行时是指代码在执行期间可用的一组库、API 和常规功能。

On the server, there are two runtimes where parts of your application code can be rendered:\
在服务器上，有两个运行时，可以在其中呈现部分应用程序代码：

* The **Node.js Runtime** (default) has access to all Node.js APIs and compatible packages from the ecosystem.\
Node.js 运行时（默认）可以访问生态系统中的所有 Node.js API 和兼容包。

* The **Edge Runtime** is based on [Web APIs](https://nextjs.org/docs/app/api-reference/edge).\
Edge 运行时基于 Web API。

## Runtime Differences 运行时差异

There are many considerations to make when choosing a runtime. This table shows the major differences at a glance. If you want a more in-depth analysis of the differences, check out the sections below.\
选择运行时时需要考虑许多因素。下表一目了然地显示了主要差异。如果您想更深入地分析这些差异，请查看以下部分。

| Cold Boot 冷启动                                                                                                                                                            | /         | Normal 正常 | Low 低                  |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|-----------|------------------------|
| [HTTP Streaming HTTP 流式处理](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)                                                       | Yes 是的    | Yes 是的    | Yes 是的                 |
| IO IO的                                                                                                                                                                   | All 都     | All 都     | `fetch`                |
| Scalability 可扩展性                                                                                                                                                         | /         | High 高    | Highest 最高             |
| Security 安全                                                                                                                                                              | Normal 正常 | High 高    | High 高                 |
| Latency 延迟                                                                                                                                                               | Normal 正常 | Low 低     | Lowest 最低              |
| npm Packages npm 包                                                                                                                                                       | All 都     | All 都     | A smaller subset 较小的子集 |
| [Static Rendering 静态渲染](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default)                                      | Yes 是的    | Yes 是的    | No 不                   |
| [Dynamic Rendering 动态渲染](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering)                                            | Yes 是的    | Yes 是的    | Yes 是的                 |
| [Data Revalidation w/ `fetch`\
数据 `fetch` 重新验证](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data) | Yes 是的    | Yes 是的    | Yes 是的                 |

### Edge Runtime Edge 运行时

In Next.js, the lightweight Edge Runtime is a subset of available Node.js APIs.\
在 Next.js 中，轻量级边缘运行时是可用 Node.js API 的子集。

The Edge Runtime is ideal if you need to deliver dynamic, personalized content at low latency with small, simple functions. The Edge Runtime's speed comes from its minimal use of resources, but that can be limiting in many scenarios.\
如果您需要通过小而简单的功能以低延迟交付动态、个性化的内容，Edge Runtime 是理想的选择。Edge 运行时的速度来自其对资源的最少使用，但这在许多情况下可能会受到限制。

For example, code executed in the Edge Runtime [on Vercel cannot exceed between 1 MB and 4 MB](https://vercel.com/docs/concepts/limits/overview#edge-middleware-and-edge-functions-size), this limit includes imported packages, fonts and files, and will vary depending on your deployment infrastructure.\
例如，在 Vercel 上的 Edge 运行时中执行的代码不能超过 1 MB 到 4 MB，此限制包括导入的包、字体和文件，并且会因部署基础架构而异。

### Node.js Runtime Node.js 运行时

Using the Node.js runtime gives you access to all Node.js APIs, and all npm packages that rely on them. However, it's not as fast to start up as routes using the Edge runtime.\
使用 Node.js 运行时可以访问所有 Node.js API 以及依赖于它们的所有 npm 包。但是，它的启动速度不如使用 Edge 运行时的路由快。

Deploying your Next.js application to a Node.js server will require managing, scaling, and configuring your infrastructure. Alternatively, you can consider deploying your Next.js application to a serverless platform like Vercel, which will handle this for you.\
将 Next.js 应用程序部署到 Node.js 服务器需要管理、扩展和配置基础结构。或者，您可以考虑将 Next.js 应用程序部署到 Vercel 等无服务器平台，该平台将为您处理此问题。

### Serverless Node.js 无服务器节点.js

Serverless is ideal if you need a scalable solution that can handle more complex computational loads than the Edge Runtime. With Serverless Functions on Vercel, for example, your overall code size is [50MB](https://vercel.com/docs/concepts/limits/overview#serverless-function-size) including imported packages, fonts, and files.\
如果您需要一个可扩展的解决方案，该解决方案可以处理比 Edge 运行时更复杂的计算负载，那么无服务器是理想的选择。例如，使用 Vercel 上的 Serverless Functions，您的整体代码大小为 50MB，包括导入的包、字体和文件。

The downside compared to routes using the [Edge](https://vercel.com/docs/concepts/functions/edge-functions) is that it can take hundreds of milliseconds for Serverless Functions to boot up before they begin processing requests. Depending on the amount of traffic your site receives, this could be a frequent occurrence as the functions are not frequently "warm".\
与使用 Edge 的路由相比，缺点是无服务器函数可能需要数百毫秒才能启动，然后才能开始处理请求。根据您的网站收到的流量，这种情况可能会经常发生，因为功能不经常“温暖”。

## Examples 例子

### Segment Runtime Option Segment Runtime 选项

You can specify a runtime for individual route segments in your Next.js application. To do so, [declare a variable called `runtime` and export it](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config). The variable must be a string, and must have a value of either `'nodejs'` or `'edge'` runtime.\
您可以在 Next.js 应用程序中为各个路由段指定运行时。为此，请声明一个名为 的变量 `runtime` 并将其导出。变量必须是字符串，并且必须具有 either `'nodejs'` 或 `'edge'` runtime 的值。

The following example demonstrates a page route segment that exports a `runtime` with a value of `'edge'`:\
以下示例演示了一个页面路由段，该段导出 `runtime` 的值为 `'edge'` ：

```
export const runtime = 'edge' * 'nodejs' (default) | 'edge'</span></span></code></pre></div>You can also define `runtime` on a layout level, which will make all routes under the layout run on the edge runtime:\
您还可以在布局级别上进行定义 `runtime` ，这将使布局下的所有路由在边缘运行时上运行：

```
export const runtime = 'edge' * 'nodejs' (default) | 'edge'</span></span></code></pre></div>If the segment runtime is *not* set, the default `nodejs` runtime will be used. You do not need to use the `runtime` option if you do not plan to change from the Node.js runtime.\
如果未设置段运行时，则将使用默认 `nodejs` 运行时。如果您不打算从 Node.js 运行时进行更改，则无需使用该 `runtime` 选项。

> Please refer to the [Node.js Docs](https://nodejs.org/docs/latest/api/) and [Edge Docs](https://nextjs.org/docs/app/api-reference/edge) for the full list of available APIs. Both runtimes can also support [streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) depending on your deployment infrastructure.\
> 请参阅 Node.js 文档和 Edge 文档，了解可用 API 的完整列表。这两个运行时还可以支持流式处理，具体取决于您的部署基础结构。

</div></div>*
```

*
```
