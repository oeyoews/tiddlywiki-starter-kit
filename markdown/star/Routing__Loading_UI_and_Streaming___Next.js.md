---
title: 'Routing__Loading_UI_and_Streaming___Next.js'
tags: ['剪藏']
type: 'text/markdown'
created: 'Mon Nov 13 2023 05:48:59 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming'
---

# Routing__Loading_UI_and_Streaming___Next.js

The special file `loading.js` helps you create meaningful Loading UI with [React Suspense](https://react.dev/reference/react/Suspense). With this convention, you can show an instant loading state from the server while the content of a route segment loads. The new content is automatically swapped in once rendering is complete.这个特殊的文件 `loading.js` 可以帮助你使用 React Suspense 创建有意义的加载 UI。使用此约定，您可以在加载路由段的内容时显示来自服务器的即时加载状态。渲染完成后，新内容将自动交换。

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Floading-ui.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Floading-ui.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)

## Instant Loading States 即时加载状态

An instant loading state is fallback UI that is shown immediately upon navigation. You can pre-render loading indicators such as skeletons and spinners, or a small but meaningful part of future screens such as a cover photo, title, etc. This helps users understand the app is responding and provides a better user experience.即时加载状态是在导航时立即显示的回退 UI。您可以预渲染加载指示器（如骨架和微调器），或未来屏幕的一小部分但有意义的部分，如封面照片、标题等。这有助于用户了解应用正在响应并提供更好的用户体验。

Create a loading state by adding a `loading.js` file inside a folder.通过在文件夹内添加 `loading.js` 文件来创建加载状态。

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Floading-special-file.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Floading-special-file.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)

```
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />
}
```

In the same folder, `loading.js` will be nested inside `layout.js`. It will automatically wrap the `page.js` file and any children below in a `<Suspense>` boundary.在同一个文件夹中， `loading.js` 将嵌套在 `layout.js` .它会自动将 `page.js` 文件和下面的任何子项包装在 `<Suspense>` 边界中。

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Floading-overview.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Floading-overview.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)

> **Good to know**: 您需要知道：
> 
> 
> * Navigation is immediate, even with [server-centric routing](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works).导航是即时的，即使使用以服务器为中心的路由也是如此。
> 
> * Navigation is interruptible, meaning changing routes does not need to wait for the content of the route to fully load before navigating to another route.导航是可中断的，这意味着更改路由不需要等待路由内容完全加载即可导航到另一条路由。
> 
> * Shared layouts remain interactive while new route segments load.在加载新路线段时，共享布局将保持交互。

> **Recommendation:** Use the `loading.js` convention for route segments (layouts and pages) as Next.js optimizes this functionality.建议：对路由段（布局和页面）使用 `loading.js` 约定，因为 Next.js 会优化此功能。

## Streaming with Suspense 带悬念的流媒体

In addition to `loading.js`, you can also manually create Suspense Boundaries for your own UI components. The App Router supports streaming with [Suspense](https://react.dev/reference/react/Suspense) for both [Node.js and Edge runtimes](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes).除了 `loading.js` 之外，您还可以为自己的 UI 组件手动创建悬念边界。应用路由器支持对 Node.js 和 Edge 运行时进行带有 Suspense 的流式处理。

### What is Streaming? 什么是流媒体？

To learn how Streaming works in React and Next.js, it’s helpful to understand **Server-Side Rendering (SSR)** and its limitations.要了解流式处理在 React 和 Next.js 中的工作原理，了解服务器端渲染（SSR）及其限制会很有帮助。

With SSR, there’s a series of steps that need to be completed before a user can see and interact with a page:使用 SSR，需要完成一系列步骤，然后用户才能查看页面并与之交互：

1. First, all data for a given page is fetched on the server.首先，在服务器上获取给定页面的所有数据。

1. The server then renders the HTML for the page.然后，服务器呈现页面的 HTML。

1. The HTML, CSS, and JavaScript for the page are sent to the client.页面的 HTML、CSS 和 JavaScript 将发送到客户端。

1. A non-interactive user interface is shown using the generated HTML, and CSS.使用生成的 HTML 和 CSS 显示非交互式用户界面。

1. Finally, React [hydrates](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html) the user interface to make it interactive.最后，React 对用户界面进行了补充，使其具有交互性。

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-without-streaming-chart.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-rendering-without-streaming-chart.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)

These steps are sequential and blocking, meaning the server can only render the HTML for a page once all the data has been fetched. And, on the client, React can only hydrate the UI once the code for all components in the page has been downloaded.这些步骤是连续的和阻塞的，这意味着服务器只能在获取所有数据后呈现页面的 HTML。而且，在客户端上，React 只有在下载了页面中所有组件的代码后才能对 UI 进行水化。

SSR with React and Next.js helps improve the perceived loading performance by showing a non-interactive page to the user as soon as possible.带有 React 和 Next.js 的 SSR 通过尽快向用户显示非交互式页面来帮助提高感知的加载性能。

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-without-streaming.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-rendering-without-streaming.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)

However, it can still be slow as all data fetching on server needs to be completed before the page can be shown to the user.但是，它仍然可能很慢，因为在向用户显示页面之前，需要完成服务器上的所有数据获取。

**Streaming** allows you to break down the page’s HTML into smaller chunks and progressively send those chunks from the server to the client.流式处理允许您将页面的 HTML 分解为更小的块，并逐步将这些块从服务器发送到客户端。

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-with-streaming.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-rendering-with-streaming.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)

This enables parts of the page to be displayed sooner, without waiting for all the data to load before any UI can be rendered.这样可以更快地显示页面的某些部分，而无需等待所有数据加载完毕，然后才能呈现任何 UI。

Streaming works well with React’s component model because each component can be considered a chunk. Components that have higher priority (e.g. product information) or that don’t rely on data can be sent first (e.g. layout), and React can start hydration earlier. Components that have lower priority (e.g. reviews, related products) can be sent in the same server request after their data has been fetched.流式处理与 React 的组件模型配合得很好，因为每个组件都可以被视为一个块。优先级较高（例如产品信息）或不依赖数据的组件可以先发送（例如布局），React 可以更早地开始冻结。优先级较低的组件（例如评论、相关产品）可以在获取数据后在同一服务器请求中发送。

![](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-with-streaming-chart.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)![](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fserver-rendering-with-streaming-chart.png&w=3840&q=75&dpl=dpl_6jgZkA1aPHMzMLgPhXqA9RmLmMXZ)

Streaming is particularly beneficial when you want to prevent long data requests from blocking the page from rendering as it can reduce the [Time To First Byte (TTFB)](https://web.dev/ttfb/) and [First Contentful Paint (FCP)](https://web.dev/first-contentful-paint/). It also helps improve [Time to Interactive (TTI)](https://developer.chrome.com/en/docs/lighthouse/performance/interactive/), especially on slower devices.当您希望防止长数据请求阻止页面呈现时，流式处理特别有用，因为它可以减少第一个字节的时间（TTFB）和首次内容绘制（FCP）。它还有助于缩短交互时间（TTI），尤其是在速度较慢的设备上。

### Example 例

`<Suspense>` works by wrapping a component that performs an asynchronous action (e.g. fetch data), showing fallback UI (e.g. skeleton, spinner) while it’s happening, and then swapping in your component once the action completes.`<Suspense>` 其工作原理是包装执行异步操作（例如获取数据）的组件，在发生时显示回退 UI（例如骨架、微调器），然后在操作完成后交换组件。

```
import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'
 
export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}
```

By using Suspense, you get the benefits of:通过使用 Suspense，您可以获得以下好处：

1. **Streaming Server Rendering** - Progressively rendering HTML from the server to the client.流式服务器渲染 - 逐步将 HTML 从服务器渲染到客户端。

1. **Selective Hydration** - React prioritizes what components to make interactive first based on user interaction.选择性水化 - React 根据用户交互确定首先要交互的组件的优先级。

For more Suspense examples and use cases, please see the [React Documentation](https://react.dev/reference/react/Suspense).

### SEO

* Next.js will wait for data fetching inside [`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) to complete before streaming UI to the client. This guarantees the first part of a streamed response includes `<head>` tags.

* Since streaming is server-rendered, it does not impact SEO. You can use the [Mobile Friendly Test](https://search.google.com/test/mobile-friendly) tool from Google to see how your page appears to Google’s web crawlers and view the serialized HTML ([source](https://web.dev/rendering-on-the-web/#seo-considerations)).

### Status Codes

When streaming, a `200` status code will be returned to signal that the request was successful.

The server can still communicate errors or issues to the client within the streamed content itself, for example, when using [`redirect`](https://nextjs.org/docs/app/api-reference/functions/redirect) or [`notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found). Since the response headers have already been sent to the client, the status code of the response cannot be updated. This does not affect SEO.
