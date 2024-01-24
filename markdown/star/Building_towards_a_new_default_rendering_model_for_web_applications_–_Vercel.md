---
title: 'Building_towards_a_new_default_rendering_model_for_web_applications_–_Vercel'
tags: ['剪藏']
type: 'text/markdown'
created: 'Sun Nov 12 2023 02:25:18 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model'
---

# Building_towards_a_new_default_rendering_model_for_web_applications_–_Vercel

At this year’s [Next.js Conf](https://www.youtube.com/watch?v=gfU1iZnjRZM), we discussed the developer and user experience challenges of global delivery of dynamic web applications. How can we fetch data without expensive waterfalls and also deliver content directly from the edge？在今年的 Next.js 大会上，我们讨论了动态 Web 应用程序全球交付的开发人员和用户体验挑战。我们如何在没有昂贵的瀑布流的情况下获取数据，并直接从边缘交付内容？

The answer to all of these current challenges: Partial Prerendering (PPR).解决所有这些当前挑战的答案是：部分预渲染（PPR）。

PPR combines ultra-quick static edge delivery with fully dynamic capabilities and we believe it has the potential to become the default rendering model for web applications, bringing together the best of static site generation and dynamic delivery.PPR 将超快速的静态边缘交付与完全动态的功能相结合，我们相信它有可能成为 Web 应用程序的默认渲染模型，将静态站点生成和动态交付的最佳功能结合在一起。

Today, you can try an experimental preview of PPR with Next.js 14 on Vercel [or visit our demo](https://www.partialprerendering.com/) for a first impression of PPR.今天，您可以在 Vercel 上使用 Next.js 14 尝试 PPR 的实验性预览，或访问我们的演示以获得 PPR 的第一印象。

## Understanding the trade-offs eliminated 了解消除的权衡

PPR brings together the best aspects of popular rendering modes enabling both fast edge delivery and dynamic data access from core data centers.PPR 汇集了常用渲染模式的最佳方面，可实现快速边缘交付和来自核心数据中心的动态数据访问。

![](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F2tgZ9Elt1qerK15SyTTXJ4%2F67a26fd63c92956178a1a25005f82403%2FGraphic_1_-_Light.png&w=1920&q=75&dpl=dpl_5U89ohtAPjAmKfgHtYuhEndNmMZm)

This table shows the features of common rendering strategies compared to the features of PPR, which eliminates trade-offs experienced in other methods.下表显示了与 PPR 功能相比，常见呈现策略的功能，从而消除了其他方法中遇到的权衡。

![](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F5VDyzuymkOUuQVo1ECuayK%2F051b687701d68d1590068323eeb0be30%2FGraphic_1_-_Dark.png&w=1920&q=75&dpl=dpl_5U89ohtAPjAmKfgHtYuhEndNmMZm)

This table shows the features of common rendering strategies compared to the features of PPR, which eliminates trade-offs experienced in other methods.下表显示了与 PPR 功能相比，常见呈现策略的功能，从而消除了其他方法中遇到的权衡。

## One battle-tested programming model 一个久经考验的编程模型

With Partial Prerendering in Next.js, rendering happens in a single React render tree. Static optimization is on-by-default and covers all components until the app accesses incoming request information like headers or cookies, which is a clear signal that dynamic rendering is needed. Next.js then changes the smallest possible section of the page to be dynamic while keeping static optimization for everything else.使用 Next.js 中的部分预渲染，渲染发生在单个 React 渲染树中。静态优化默认处于开启状态，并涵盖所有组件，直到应用访问传入的请求信息（如标头或 Cookie），这是需要动态渲染的明确信号。然后，Next.js 将页面的最小可能部分更改为动态，同时保留其他所有内容的静态优化。

You may be thinking: “We did this in the 90s with [server-side includes](https://en.wikipedia.org/wiki/Server_Side_Includes)”. That is true, but in that world static and dynamic were separated into completely different technology worlds and we didn’t have incremental updates of static content.你可能会想：“我们在 90 年代用服务器端包含做到了这一点”。这是真的，但在那个世界里，静态和动态被划分为完全不同的技术世界，我们没有静态内容的增量更新。

Consider the following ecommerce page:请考虑以下电子商务页面：

```
export default function Page() {

  return (

    <main>

      <header>

        <h1>My Store</h1>

        <Suspense fallback={<CartSkeleton />}>

          <ShoppingCart />

        </Suspense>

      </header>

      <Banner />

      <Suspense fallback={<ProductListSkeleton />}>

        <Recommendations />

      </Suspense>

      <NewProducts />

    </main>

  );

}
```

With PPR enabled, this page generates a static shell based on your `<Suspense />` boundaries. The `fallback` provided to React Suspense is prerendered.启用 PPR 后，此页面会根据您的 `<Suspense />` 边界生成静态 shell。提供给 React Suspense 的内容 `fallback` 是预先渲染的。

Suspense fallbacks in the shell are then replaced with dynamic components, like reading cookies to determine the cart, or showing a banner based on the user.然后，shell 中的悬念回退被替换为动态组件，例如读取 cookie 以确定购物车，或显示基于用户的横幅。

## Under the hood of PPR 小反刍兽疫的幕后花絮

When you build your application, Next.js will prerender a static *shell* for each page of your application, leaving *holes* for the dynamic content.构建应用程序时，Next.js 将为应用程序的每个页面预呈现静态 shell，为动态内容留出漏洞。

When a user visits a page, the fast static shell is served from the end-user’s nearest [Edge Region](https://vercel.com/docs/edge-network/overview), allowing the user to start consuming the page, and the client and server to work in parallel. The client can start parsing scripts, stylesheets, fonts, and static markup while the server renders dynamic chunks using [React’s new streaming architecture](https://vercel.com/blog/understanding-react-server-components).当用户访问页面时，将从最终用户最近的边缘区域提供快速静态 shell，从而允许用户开始使用该页面，并且客户端和服务器可以并行工作。客户端可以开始解析脚本、样式表、字体和静态标记，而服务器使用 React 的新流架构渲染动态块。

PPR offers a unified model that blends the reliability and speed of [Incremental Static Regeneration (ISR)](https://vercel.com/docs/incremental-static-regeneration) and the dynamic capabilities of [Server-Side Rendering (SSR)](https://vercel.com/docs/frameworks/nextjs#server-side-rendering-ssr). In fact, this is exactly how PPR is implemented. Because PPR takes advantage of React <Suspense> boundary, *you* decide whether the boundary is static or dynamic.PPR 提供了一个统一的模型，该模型融合了增量静态再生（ISR）的可靠性和速度以及服务器端渲染（SSR）的动态功能。事实上，这正是小反刍兽种的实施方式。由于 PPR 利用了 React 边界，因此您可以决定边界是静态的还是动态的。

* The static shell retains the ability to be updated via Incremental Static Regeneration (ISR).静态 shell 保留了通过增量静态重新生成（ISR）进行更新的能力。

* If you use features that require dynamic rendering, such as accessing cookies, Next.js automatically switches to dynamic rendering up to the closest Suspense boundary.如果您使用需要动态渲染的功能（例如访问 Cookie），Next.js 会自动切换到动态渲染，直到最近的悬念边界。

## Not just for app shells 不仅适用于应用 shell

PPR can be leveraged for any app along the static/dynamic spectrum. Whether you have a dashboard containing mostly dynamic content and a relatively barebones shell around it, or a page that contains mostly static content with dynamic elements throughout.PPR 可用于静态/动态频谱上的任何应用。无论您的仪表板主要包含动态内容和相对准系统的 shell，还是包含大部分静态内容和动态元素的页面。

For example, in our [product detail page example](https://www.partialprerendering.com/) almost all content is part of the static prerender. Only the customer reviews section, shopping cart count, the personalized delivery time based on user zip code, and the below-the-fold recommendations stream in via dynamic streaming.例如，在我们的产品详情页面示例中，几乎所有内容都是静态预渲染的一部分。只有客户评论部分、购物车计数、基于用户邮政编码的个性化交货时间以及首屏推荐通过动态流式流流式传输。

This wireframe of a typical product detail page shows elements that are typically static in purple and elements that are often dynamic in blue. With PPR the vast majority of content for such a page can get delivered instantly from the edge.此典型商品详情页面的线框图显示通常为静态的紫色元素和通常为动态的蓝色元素。使用 PPR，此类页面的绝大多数内容都可以从边缘立即交付。

![](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F5r33oKikQKnzTplANlbF20%2F9bf635b0a904840838d863241d5829a2%2Fthinking-in-server-components__1_.png&w=1920&q=75&dpl=dpl_5U89ohtAPjAmKfgHtYuhEndNmMZm)

![](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F19oHbnORNyZdAYAxuzQHbP%2F4e7196649e205805d8ef419da4e25d6d%2Fthinking-in-server-components.png&w=1920&q=75&dpl=dpl_5U89ohtAPjAmKfgHtYuhEndNmMZm)

![](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F5r33oKikQKnzTplANlbF20%2F9bf635b0a904840838d863241d5829a2%2Fthinking-in-server-components__1_.png&w=1920&q=75&dpl=dpl_5U89ohtAPjAmKfgHtYuhEndNmMZm)

![](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F19oHbnORNyZdAYAxuzQHbP%2F4e7196649e205805d8ef419da4e25d6d%2Fthinking-in-server-components.png&w=1920&q=75&dpl=dpl_5U89ohtAPjAmKfgHtYuhEndNmMZm)

Additionally, because PPR is based on ISR, you can take advantage of the same on-demand, time-based, and tag-based revalidation for the static shell [that is available to ISR today](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data).此外，由于 PPR 基于 ISR，因此您可以利用目前可用于 ISR 的静态 shell 的相同按需、基于时间和基于标记的重新验证。

## Open to all frameworks 向所有框架开放

The [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure) primitive that Partial Prerendering leverages when used on Vercel can be natively adopted by any frontend framework through [Vercel’s Build Output API](https://vercel.com/docs/build-output-api/v3). Framework authors can get in touch with us to talk about how to integrate PPR into their framework.在 Vercel 上使用 Partial Prerendering 时利用的框架定义的基础设施原语可以通过 Vercel 的 Build Output API 被任何前端框架原生采用。框架作者可以与我们联系，讨论如何将 PPR 集成到他们的框架中。

## Try PPR on Vercel today 立即在 Vercel 上试用 PPR

You can try Partial Prerendering with the latest Next.js 14 Canary using the app directory on Vercel today.您可以立即使用 Vercel 上的应用程序目录尝试使用最新的 Next.js 14 Canary 进行部分预渲染。

Add the following configuration to your `next.config.js` file or check out the [template](https://vercel.com/templates/next.js/partial-prerendering-nextjs) to get started.将以下配置添加到您的 `next.config.js` 文件或查看模板以开始使用。

```
experimental: {

  ppr: true,

},
```

Please note that PPR is truly an experimental technology that is **not yet recommended for production use**. You may run into some developer experience issues, especially on larger code bases, and known issues such that client-side navigations do not yet perform a streaming render (coming soon).请注意，PPR 确实是一项实验性技术，目前尚不建议用于生产。你可能会遇到一些开发人员体验问题，尤其是在较大的代码库上，以及客户端导航尚未执行流式呈现（即将推出）的已知问题。

Partial Prerendering is a major step in web application delivery. We’re excited to see what the community builds on it, and we will continue to iterate on the best developer experience and best user experience for modern websites and web applications.部分预渲染是 Web 应用程序交付中的一个重要步骤。我们很高兴看到社区在此基础上构建的内容，我们将继续迭代现代网站和 Web 应用程序的最佳开发人员体验和最佳用户体验。
