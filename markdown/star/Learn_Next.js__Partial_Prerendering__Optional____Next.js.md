---
title: 'Learn_Next.js__Partial_Prerendering__Optional____Next.js'
tags: ['剪藏']
type: 'text/markdown'
created: 'Fri Dec 08 2023 11:19:12 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://nextjs.org/learn/dashboard-app/partial-prerendering'
---

# Learn_Next.js__Partial_Prerendering__Optional____Next.js

> Partial Prerendering is an experimental feature introduced in Next.js 14. The content of this page may be updated as the feature progresses in stability. You may want to skip this chapter if you prefer to not use experimental features. This chapter is not required to complete the course.部分预渲染是 Next.js 14 中引入的一项实验性功能。随着功能稳定性的提高，此页面的内容可能会更新。如果您不想使用实验性功能，则可能需要跳过本章。完成本课程不需要本章。

In this chapter… 在本章中…

Here are the topics we’ll cover 以下是我们将涵盖的主题

What Partial Prerendering is.什么是局部预渲染。

How Partial Prerendering works.局部预渲染的工作原理。

## Combining Static and Dynamic Content 结合静态和动态内容

Currently, if you call a [dynamic function](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-functions) inside your route (e.g. `noStore()`, `cookies()`, etc), your whole route becomes dynamic.目前，如果你在路由中调用一个动态函数（例如 `noStore()` ，、 `cookies()` 等），你的整个路由就会变成动态的。

This aligns with how most web apps are built today, you either choose between static and dynamic rendering for your **entire application** or for **specific routes**.这与当今大多数 Web 应用程序的构建方式一致，您可以为整个应用程序或特定路由选择静态和动态渲染。

However, most routes are not fully static or dynamic. You may have a route that has both static and dynamic content. For example, let’s say you have a social media feed, the posts would be static, but the likes for the post would be dynamic. Or an ecommerce site, where the product details are static, but the user’s cart is dynamic.但是，大多数路由不是完全静态或动态的。您可能有一个同时包含静态和动态内容的路由。例如，假设您有一个社交媒体提要，帖子将是静态的，但帖子的点赞将是动态的。或者一个电子商务网站，其中产品详细信息是静态的，但用户的购物车是动态的。

Going back to your dashboard page, what components would you consider static vs. dynamic？回到您的仪表板页面，您认为哪些组件是静态的，哪些是动态的？

Once you’re ready, click the button below to see how we would split the dashboard route:准备就绪后，单击下面的按钮，查看我们将如何拆分仪表板路由：

## What is Partial Prerendering？什么是局部预渲染？

In Next.js 14, there is a preview of a new rendering model called **Partial Prerendering**. Partial Prerendering is an experimental feature that allows you to render a route with a static loading shell, while keeping some parts dynamic. In other words, you can isolate the dynamic parts of a route. For example:在 Next.js 14 中，有一个名为“部分预渲染”的新渲染模型的预览。部分预渲染是一项实验性功能，它允许您使用静态加载 shell 渲染路由，同时保持某些部分的动态状态。换言之，您可以隔离路由的动态部分。例如：

![](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Fthinking-in-ppr.png&w=3840&q=75&dpl=dpl_FCceakDAygFm3XpfzDutxg9ALjmD)![](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Fthinking-in-ppr.png&w=3840&q=75&dpl=dpl_FCceakDAygFm3XpfzDutxg9ALjmD)

When a user visits a route:当用户访问路线时：

* A static route *shell* is served, this makes the initial load fast.提供静态路由 shell，这使得初始加载速度更快。

* The shell leaves *holes* where dynamic content will load in async.shell 会在动态内容异步加载的位置留下漏洞。

* The async holes are loaded in parallel, reducing the overall load time of the page.异步孔是并行加载的，从而减少了页面的整体加载时间。

This is different from how your application behaves today, where entire routes are either fully static or dynamic.这与应用程序现在的行为方式不同，在当今，整个路由要么是完全静态的，要么是动态的。

Partial Prerendering combines ultra-quick static edge delivery with fully dynamic capabilities and we believe it has the potential to [become the default rendering model for web applications](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model), bringing together the best of static site generation and dynamic delivery.部分预渲染将超快速的静态边缘交付与完全动态的功能相结合，我们相信它有可能成为 Web 应用程序的默认渲染模型，将静态站点生成和动态交付的最佳功能结合在一起。

### It’s time to take a quiz! 是时候做个测验了！

Test your knowledge and see what you’ve just learned.测试你的知识，看看你刚刚学到了什么。

What are the holes in the context of Partial Prerendering？部分预渲染的上下文中有哪些漏洞？

## How does Partial Prerendering work？局部预渲染是如何工作的？

Partial Prerendering leverages React’s [Concurrent APIs](https://react.dev/blog/2021/12/17/react-conf-2021-recap#react-18-and-concurrent-features) and uses [Suspense](https://react.dev/reference/react/Suspense) to defer rendering parts of your application until some condition is met (e.g. data is loaded).部分预渲染利用 React 的并发 API，并使用 Suspense 延迟渲染应用程序的部分，直到满足某些条件（例如加载数据）。

The fallback is embedded into the initial static file along with other static content. At build time (or during revalidation), the static parts of the route are *prerendered*, and the rest is *postponed* until the user requests the route.回退与其他静态内容一起嵌入到初始静态文件中。在生成时（或重新验证期间），将预呈现路由的静态部分，其余部分将推迟到用户请求路由。

It’s worth noting that wrapping a component in Suspense doesn’t make the component itself dynamic (remember you used `unstable_noStore` to achieve this behavior), but rather Suspense is used as a boundary between the static and dynamic parts of your route.值得注意的是，将组件包装在 Suspense 中不会使组件本身动态化（请记住，您曾经 `unstable_noStore` 实现过此行为），而是将 Suspense 用作路由的静态和动态部分之间的边界。

The great thing about Partial Prerendering is that you don’t need to change your code to use it. As long as you’re using Suspense to wrap the dynamic parts of your route, Next.js will know which parts of your route are static and which are dynamic.部分预渲染的优点在于，您无需更改代码即可使用它。只要您使用 Suspense 包装路由的动态部分，Next.js 就会知道路由的哪些部分是静态的，哪些是动态的。

> **Note:** To learn more about how Partial Prerendering can be configured, see the [Partial Prerendering (experimental) documentation](https://nextjs.org/docs/app/api-reference/next-config-js/partial-prerendering) or try the [Partial Prerendering template and demo](https://vercel.com/templates/next.js/partial-prerendering-nextjs). It’s important to note that this feature is **experimental** and **not yet ready for production deployment**.注意：要了解有关如何配置部分预渲染的更多信息，请参阅部分预渲染（实验性）文档或尝试部分预渲染模板和演示。请务必注意，此功能是实验性的，尚未准备好用于生产部署。

## Summary 总结

To recap, you’ve done a few things to optimize data fetching in your application, you’ve:总而言之，您已经做了一些事情来优化应用程序中的数据提取，您已经：

1. Created a database in the same region as your application code to reduce latency between your server and database.在与应用程序代码相同的区域中创建了一个数据库，以减少服务器和数据库之间的延迟。

1. Fetched data on the server with React Server Components. This allows you to keep expensive data fetches and logic on the server, reduces the client-side JavaScript bundle, and prevents your database secrets from being exposed to the client.使用 React Server 组件在服务器上获取数据。这允许您在服务器上保留昂贵的数据提取和逻辑，减少客户端 JavaScript 捆绑包，并防止您的数据库机密暴露给客户端。

1. Used SQL to only fetch the data you needed, reducing the amount of data transferred for each request and the amount of JavaScript needed to transform the data in-memory.使用 SQL 仅获取所需的数据，从而减少每个请求传输的数据量以及转换内存中数据所需的 JavaScript 量。

1. Parallelize data fetching with JavaScript - where it made sense to do so.使用 JavaScript 并行化数据获取 - 这样做是有意义的。

1. Implemented Streaming to prevent slow data requests from blocking your whole page, and to allow the user to start interacting with the UI without waiting for everything to load.实现流式处理是为了防止慢速数据请求阻塞整个页面，并允许用户开始与 UI 交互，而无需等待所有内容加载。

1. Move data fetching down to the components that need it, thus isolating which parts of your routes should be dynamic in preparation for Partial Prerendering.将数据提取向下移动到需要它的组件，从而隔离路由的哪些部分应该是动态的，以便为部分预渲染做准备。

In the next chapter, we’ll look at two common patterns you might need to implement when fetching data: search and pagination.在下一章中，我们将介绍在获取数据时可能需要实现的两种常见模式：搜索和分页。
