---
title: 'Making Sense of React Server Components'
tags: ['剪藏']
type: 'text/markdown'
created: 'Tue Nov 07 2023 07:15:47 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: 'oeyoews'
publish: 'article'
url: 'https://www.joshwcomeau.com/react/server-components/'
---

# Making Sense of React Server Components

## [Introduction]()

So, here’s something that makes me feel old: React celebrated its 10th birthday this year! 所以，这里有一件让我觉得自己老了的事情：React 今年庆祝了它的 10 岁生日！

In the decade since React was first introduced to a bewildered dev community, it’s gone through several evolutions. The React team has not been shy when it comes to radical changes: if they discover a better solution to a problem, they’ll run with it.自从 React 首次被引入一个困惑的开发社区以来的十年里，它经历了几次演变。React 团队在进行彻底的改变时并不害羞：如果他们发现了更好的问题解决方案，他们就会顺其自然。

A couple of months ago, the React team unveiled *React Server Components,* the latest paradigm shift. For the first time ever, React components can run exclusively on the server.几个月前，React 团队推出了 React Server Components，这是最新的范式转变。有史以来第一次，React 组件可以专门在服务器上运行。

There’s been *so much friggin’ confusion* about this online. Lots of folks have lots of questions around what this is, how it works, what the benefits are, and how it fits together with things like Server Side Rendering.网上对此有太多的困惑。很多人都有很多问题，关于这是什么，它是如何工作的，有什么好处，以及它如何与服务器端渲染等东西结合在一起。

I’ve been doing a lot of experimentation with React Server Components, and I’ve answered a lot of my own questions. I have to admit, I’m *way* more excited about this stuff than I expected to be. *It’s really cool!*我一直在用 React Server 组件做了很多实验，我回答了很多我自己的问题。我不得不承认，我对这些东西比我预期的要兴奋得多。真的很酷！

So, my goal today is to help demystify this stuff for you, to answer a lot of the questions you might have about React Server Components! 所以，我今天的目标是帮助你揭开这些东西的神秘面纱，回答你可能对 React Server 组件提出的很多问题！

## Link to this headingA quick primer on Server Side Rendering 服务器端渲染快速入门

To put React Server Components in context, it’s helpful to understand how Server Side Rendering (SSR) works. If you’re already familiar with SSR, feel free to skip to the next heading! 要将 React 服务器组件置于上下文中，了解服务器端渲染（SSR）的工作原理会很有帮助。如果您已经熟悉 SSR，请随时跳到下一个标题！

When I first started using React in 2015, most React setups used a“client-side”rendering strategy. The user would receive an HTML file that looked like this:当我在 2015 年第一次开始使用 React 时，大多数 React 设置都使用“客户端”渲染策略。用户将收到如下所示的 HTML 文件：

```

```

That `bundle.js` script includes everything we need to mount and run the application, including React, other third-party dependencies, and all of the code we’ve written.该 `bundle.js` 脚本包含了我们挂载和运行应用程序所需的一切，包括 React、其他第三方依赖项以及我们编写的所有代码。

Once the JS has been downloaded and parsed, React springs into action, conjuring all of the DOM nodes for our entire application, and housing it in that empty `<div id="root">`.一旦 JS 被下载和解析，React 就会开始行动，为我们的整个应用程序召唤出所有 DOM 节点，并将其存放在那个空 `<div id="root">` 的 .

The problem with this approach is that it takes time to do all of that work. **And while it’s all happening, the user is staring at a blank white screen.** This problem tends to get worse over time: every new feature we ship adds more kilobytes to our JavaScript bundle, prolonging the amount of time that the user has to sit and wait.这种方法的问题在于完成所有这些工作需要时间。当这一切发生时，用户正盯着一个空白的屏幕。随着时间的推移，这个问题往往会变得更糟：我们发布的每个新功能都会为我们的 JavaScript 包增加更多的千字节，从而延长用户必须坐下来等待的时间。

Server Side Rendering was designed to improve this experience. Instead of sending an empty HTML file, the server will render our application to *generate* the actual HTML. The user receives a fully-formed HTML document.服务器端渲染旨在改善这种体验。服务器不会发送空的 HTML 文件，而是渲染我们的应用程序以生成实际的 HTML。用户将收到一个完全格式的 HTML 文档。

That HTML file will still include the `<script>` tag, since we still need React to run on the client, to handle any interactivity. But we configure React to work a little bit differently in-browser: instead of conjuring all of the DOM nodes from scratch, it instead *adopts* the existing HTML. This process is known as *hydration.*该 HTML 文件仍将包含标签 `<script>` ，因为我们仍然需要 React 在客户端上运行，以处理任何交互性。但是我们将 React 配置为在浏览器中的工作方式略有不同：它不是从头开始召唤所有 DOM 节点，而是采用现有的 HTML。这个过程被称为水合作用。

I like the way React core team member Dan Abramov explains this:我喜欢 React 核心团队成员 Dan Abramov 解释这一点的方式：

> Hydration is like watering the“dry”HTML with the“water”of interactivity and event handlers.水化就像用交互性和事件处理程序的“水”浇灌“干燥”的 HTML。

Once the JS bundle has been downloaded, React will quickly run through our entire application, building up a virtual sketch of the UI, and“fitting”it to the real DOM, attaching event handlers, firing off any effects, and so on.一旦 JS 包被下载，React 将快速运行我们的整个应用程序，构建一个 UI 的虚拟草图，并将其“拟合”到真实的 DOM 中，附加事件处理程序，触发任何效果，等等。

And so, that’s SSR in a nutshell. A server generates the initial HTML so that users don’t have to stare at an empty white page while the JS bundles are downloaded and parsed. Client-side React then picks up where server-side React left off, adopting the DOM and sprinkling in the interactivity.简而言之，这就是 SSR。服务器生成初始 HTML，这样用户在下载和解析 JS 包时就不必盯着空白页。然后，客户端 React 从服务器端 React 中断的地方开始，采用 DOM 并加入交互性。

## Link to this headingBouncing back and forth 来回弹跳

Let’s talk about data-fetching in React. Typically, we’ve had two separate applications that communicate over the network:让我们来谈谈 React 中的数据获取。通常，我们有两个通过网络进行通信的独立应用程序：

* A client-side React app 客户端 React 应用

* A server-side REST API 服务器端 REST API

Using something like React Query or SWR or Apollo, the client would make a network request to the back-end, which would then grab the data from the database and send it back over the network.使用 React Query、SWR 或 Apollo 之类的东西，客户端会向后端发出网络请求，然后后端会从数据库中获取数据并通过网络发送回去。

We can visualize this flow using a graph:我们可以使用图形来可视化此流程：

Server 服务器

Client 客户

Download JavaScript 下载 JavaScript 的

This is a data visualization which shows a sequence of events between client and server. Each event is represented here as a list item.

1. Response from server
. Duration:

4 units
of time.

1. "
Download JavaScript
" on
client
. Duration:

7 units
of time.

1. "
Render Shell
" on
client
. Duration:

6 units
of time.

1. Request to server
. Duration:

4 units
of time.

1. "
Database Query
" on
server
. Duration:

5 units
of time.

1. Response from server
. Duration:

4 units
of time.

1. "
Render Content
" on
client
. Duration:

5 units
of time.

This first graph shows the flow using a Client Side Rendering (CSR) strategy. It starts with the client receiving an HTML file. This file doesn’t have any content, but it does have one or more `<script>` tags.第一张图显示了使用客户端渲染（CSR）策略的流程。它从客户端接收 HTML 文件开始。此文件没有任何内容，但具有一个或多个 `<script>` 标记。

Once the JS has been downloaded and parsed, our React app will boot up, creating a bunch of DOM nodes and populating the UI. At first, though, we don’t have any of the actual *data*, so we can only render the shell (the header, the footer, the general layout) with a loading state.下载并解析 JS 后，我们的 React 应用程序将启动，创建一堆 DOM 节点并填充 UI。不过，起初我们没有任何实际数据，因此我们只能呈现具有加载状态的 shell（页眉、页脚、总体布局）。

You’ve probably seen this sort of pattern a lot. For example, UberEats starts by rendering a shell while it fetches the data it needs to populate the actual restaurants:你可能已经经常看到这种模式。例如，UberEats 首先渲染一个 shell，同时获取填充实际餐厅所需的数据：

The user will see this loading state until the network request resolves and React re-renders, replacing the loading UI with the real content.用户将看到这种加载状态，直到网络请求解析并且 React 重新渲染，将加载 UI 替换为真实内容。

**Let’s look at another way we could architect this.** This next graph keeps the same general data-fetching pattern, but uses *Server* Side Rendering instead of Client Side Rendering:让我们看看另一种架构方式。下一张图保留了相同的常规数据获取模式，但使用服务器端渲染而不是客户端渲染：

Server 服务器

Client 客户

Download JavaScript 下载 JavaScript 的

This is a data visualization which shows a sequence of events between client and server. Each event is represented here as a list item.

1. "
Render Shell
" on
server
. Duration:

3 units
of time.

1. Response from server
. Duration:

4 units
of time.

1. "
Download JavaScript
" on
client
. Duration:

7 units
of time.

1. "
Hydrate
" on
client
. Duration:

3 units
of time.

1. Request to server
. Duration:

4 units
of time.

1. "
Database Query
" on
server
. Duration:

5 units
of time.

1. Response from server
. Duration:

4 units
of time.

1. "
Render Content
" on
client
. Duration:

5 units
of time.

In this new flow, we perform the first render on the server. This means that the user receives an HTML file that isn’t totally empty.在这个新流程中，我们在服务器上执行第一次渲染。这意味着用户收到的 HTML 文件并不完全为空。

This is an improvement — a shell is better than a blank white page — but ultimately, it doesn’t really move the needle in a significant way. The user isn’t visiting our app to see a loading screen, they’re visiting to see the *content* (restaurants, hotel listings, search results, messages, whatever).这是一个改进——外壳比空白的白页要好——但最终，它并没有真正以显着的方式移动指针。用户访问我们的应用程序不是为了查看加载屏幕，而是为了查看内容（餐厅、酒店列表、搜索结果、消息等）。

To really get a sense of the differences in user experience, let’s add some web performance metrics to our graphs. **Toggle between these two flows, and notice what happens to the flags:**为了真正了解用户体验的差异，让我们在图表中添加一些 Web 性能指标。在这两个流之间切换，并注意标志会发生什么情况：

Server 服务器

Client 客户

Download JavaScript 下载 JavaScript 的

This is a data visualization which shows a sequence of events between client and server. Each event is represented here as a list item.

1. "
Render Shell
" on
server
. Duration:

3 units
of time.

1. Response from server
. Duration:

4 units
of time.

1. "
Download JavaScript
" on
client
. Duration:

7 units
of time.

1. “Hydrate” on client. Duration: 3 units of time.

1. Request to server
. Duration:

4 units
of time.

1. "
Database Query
" on
server
. Duration:

5 units
of time.

1. Response from server
. Duration:

4 units
of time.

1. "
Render Content
" on
client
. Duration:

5 units
of time.

Each of these flags represents a commonly-used web performance metric. Here’s the breakdown:这些标志中的每一个都代表一个常用的 Web 性能指标。以下是细分：

1. **First Paint** — The user is no longer staring at a blank white screen. The general layout has been rendered, but the content is still missing. This is sometimes called FCP (First Contentful Paint).第一次画图 — 用户不再盯着空白的白屏。总体布局已呈现，但内容仍缺失。这有时称为 FCP（First Contentful Paint）。

1. **Page Interactive** — React has been downloaded, and our application has been rendered/hydrated. Interactive elements are now fully responsive. This is sometimes called TTI (Time To Interactive).Page Interactive — React 已经下载，我们的应用程序已经渲染/冻结。交互式元素现在完全响应。这有时称为 TTI（交互时间）。

1. **Content Paint** — The page now includes the stuff the user cares about. We’ve pulled the data from the database and rendered it in the UI. This is sometimes called LCP (Largest Contentful Paint).内容绘制 — 页面现在包含用户关心的内容。我们已从数据库中提取数据，并在 UI 中呈现数据。这有时称为 LCP（最大内容绘制）。

By doing the initial render on the server, we’re able to get that initial“shell”drawn more quickly. This can make the loading experience feel a bit faster, since it provides a sense of progress, that things are happening.通过在服务器上进行初始渲染，我们能够更快地绘制初始“shell”。这可以使加载体验感觉更快一些，因为它提供了一种进步感，事情正在发生。

And, in some situations, this *will* be a meaningful improvement. For example, maybe the user is only waiting for the header to load so that they can click a navigation link.而且，在某些情况下，这将是一个有意义的改进。例如，用户可能只是在等待标题加载，以便他们可以单击导航链接。

**But doesn’t this flow feel a bit silly?** When I look at the SSR graph, I can’t help but notice that the request *starts* on the server. Instead of requiring a second round-trip network request, why don’t we do the database work *during that initial request?*但这个流程是不是感觉有点傻？当我查看 SSR 图时，我不禁注意到请求在服务器上启动。我们为什么不在初始请求期间执行数据库工作，而不是要求第二次往返网络请求呢？

In order words, **why not do something like this?**换句话说，为什么不做这样的事情呢？

Server 服务器

Client

Download JavaScript 下载 JavaScript 的

This is a data visualization which shows a sequence of events between client and server. Each event is represented here as a list item.

1. "
Database Query
" on
server
. Duration:

5 units
of time.

1. "
Render App
" on
server
. Duration:

6 units
of time.

1. Response from server
. Duration:

4 units
of time.

1. "
Download JavaScript
" on
client
. Duration:

7 units
of time.

1. "
Hydrate
" on
client
. Duration:

3 units
of time.

Instead of bouncing back and forth between the client and server, we do our database query as part of the initial request, sending the fully-populated UI straight to the user.我们不是在客户端和服务器之间来回跳动，而是在初始请求中执行数据库查询，将完全填充的 UI 直接发送给用户。

But hm, how exactly would we do this？但是，嗯，我们到底该怎么做呢？

In order for this to work, we’d need to be able to give React a chunk of code that it runs *exclusively* on the server, to do the database query. But that hasn’t been an option with React… even with Server Side Rendering, all of our components render on *both* the server and the client.为了实现这一点，我们需要能够给 React 一个专门在服务器上运行的代码块来执行数据库查询。但这并不是 React 的一个选项…即使使用服务器端渲染，我们所有的组件也会在服务器和客户端上渲染。

**The ecosystem has come up with lots of solutions to this problem.** Meta-frameworks? like Next.js and Gatsby have created their own way to run code exclusively on the server.生态系统已经为这个问题提出了许多解决方案。元框架？像 Next 一样，.js 和 Gatsby 已经创建了自己的方式，以专门在服务器上运行代码。

For example, here’s what this looked like using Next.js (using the legacy“Pages”router):例如，以下是使用 Next.js（使用旧版“页面”路由器）的样子：

```

```

**Let’s break this down:** when the server receives a request, the `getServerSideProps` function is called. It returns a `props` object. Those props are then funneled into the component, which is rendered first on the server, and then hydrated on the client.让我们分解一下：当服务器收到请求时，会调用该 `getServerSideProps` 函数。它返回一个 `props` 对象。然后，这些道具被汇集到组件中，该组件首先在服务器上呈现，然后在客户端上冻结。

The clever thing here is that `getServerSideProps` doesn’t re-run on the client. In fact, this function isn’t even included in our JavaScript bundles! 这里聪明的做法是不会 `getServerSideProps` 在客户端上重新运行。事实上，这个函数甚至没有包含在我们的 JavaScript 包中！

This approach was *super* ahead of its time. Honestly, it’s pretty friggin’ great. But there *are* some downsides with this:这种方法非常超前。老实说，这真是太棒了。但这有一些缺点：

1. This strategy only works at the route level, for components at the very top of the tree. We can’t do this in any component.此策略仅适用于路由级别，适用于树最顶端的组件。我们不能在任何组件中执行此操作。

1. Each meta-framework came up with its own approach. Next.js has one approach, Gatsby has another, Remix has yet another. It hasn’t been standardized.每个元框架都提出了自己的方法。Next.js 有一种方法，Gatsby 有另一种方法，Remix 有另一种方法。它尚未标准化。

1. All of our React components will *always* hydrate on the client, even when there’s no need for them to do so.我们所有的 React 组件都会在客户端上保持活力，即使它们不需要这样做。

For years, the React team has been quietly tinkering on this problem, trying to come up with an official way to solve this problem. Their solution is called **React Server Components.**多年来，React 团队一直在悄悄地修补这个问题，试图想出一个官方的方法来解决这个问题。他们的解决方案称为 React 服务器组件。

## Link to this headingIntroduction to React Server ComponentsReact Server 组件简介

At a high level, *React Server Components* is the name for a brand-new paradigm. In this new world, we can create components that run *exclusively on the server*. This allows us to do things like write database queries right inside our React components! 在高层次上，React Server Components 是一个全新范式的名称。在这个新世界中，我们可以创建专门在服务器上运行的组件。这允许我们直接在 React 组件中执行诸如编写数据库查询之类的操作！

Here’s a quick example of a“Server Component”:下面是“服务器组件”的简单示例：

```

```

As someone who has been using React for many years, this code looked *absolutely wild* to me at first. 😅作为一个使用 React 多年的人，这段代码一开始对我来说绝对是疯狂的。😅

“But wait!”, my instincts screamed. “Function components can’t be asynchronous! And we’re not allowed to have side effects directly in the render like that!”“等等！”，我的直觉尖叫起来。“函数组件不能是异步的！而且我们不能像这样直接在渲染中出现副作用！

**The key thing to understand is this:** Server Components never re-render. They run *once* on the server to generate the UI. The rendered value is sent to the client and locked in place. As far as React is concerned, this output is immutable, and will never change.要理解的关键是：服务器组件从不重新渲染。它们在服务器上运行一次以生成 UI。呈现的值将发送到客户端并锁定到位。就 React 而言，这个输出是不可变的，永远不会改变。

This means that a *big chunk* of React’s API is incompatible with Server Components. For example, we can’t use state, because state can change, but Server Components can’t re-render. And we can’t use effects because effects only run *after* the render, on the client, and Server Components never make it to the client.这意味着 React 的 API 中有很大一部分与服务器组件不兼容。例如，我们不能使用状态，因为状态可以更改，但服务器组件不能重新呈现。我们不能使用效果，因为效果只在渲染后在客户端上运行，而服务器组件永远不会到达客户端。

It also means that we have a bit more flexibility when it comes to the rules. For example, in traditional React, we need to put side effects inside a `useEffect` callback or an event handler or something, so that they don’t repeat on every render. But if the component only runs *once*, we don’t have to worry about that! 这也意味着我们在规则方面有更多的灵活性。例如，在传统的 React 中，我们需要将副作用放在 `useEffect` 回调或事件处理程序或其他东西中，这样它们就不会在每次渲染时重复出现。但是，如果组件只运行一次，我们不必担心！

Server Components *themselves* are surprisingly straightforward, but the “React Server Components” paradigm is significantly more complex. This is because we *still have* regular ol’components, and the way they fit together can be pretty confusing.服务器组件本身出奇的简单，但“React 服务器组件”范式要复杂得多。这是因为我们仍然有常规的组件，它们组合在一起的方式可能非常令人困惑。

In this new paradigm, the “traditional” React components we’re familiar with are called *Client Components*. I’ll be honest, I don’t love this name. 😅在这个新范式中，我们熟悉的“传统”React 组件称为客户端组件。老实说，我不喜欢这个名字。😅

The name “Client Component” implies that these components *only* render on the client, but that’s not actually true. **Client Components render on both the client *and* the server.**“客户端组件”这个名称意味着这些组件只在客户端上呈现，但事实并非如此。客户端组件在客户端和服务器上呈现。

I know that all this terminology is pretty confusing, so here’s how I’d summarize it:我知道所有这些术语都非常令人困惑，所以我是这样总结的：

* *React Server Components* is the name for this new paradigm.React Server Components 是这种新范式的名称。

* In this new paradigm, the “standard” React components we know and love have been rebranded as *Client Components*. It’s a new name for an old thing.在这种新的范式中，我们所熟知和喜爱的“标准”React 组件已被重新命名为客户端组件。这是一个旧事物的新名称。

* This new paradigm introduces a new type of component, *Server Components*. These new components render exclusively on the server. Their code isn’t included in the JS bundle, and so they never hydrate or re-render.这种新范例引入了一种新型组件，即服务器组件。这些新组件以独占方式在服务器上呈现。它们的代码不包含在 JS 包中，因此它们永远不会冻结或重新渲染。

### Link to this headingCompatible Environments 兼容环境

So, typically, when a new React feature comes out, we can start using it in our existing projects by bumping our React dependency to the latest version. A quick `npm install react@latest` and we’re off to the races.因此，通常情况下，当一个新的 React 功能出现时，我们可以通过将我们的 React 依赖项升级到最新版本来开始在现有项目中使用它。很快 `npm install react@latest` ，我们开始比赛了。

Unfortunately, React Server Components doesn’t work like that.不幸的是，React Server Components 不是这样工作的。

My understanding is that React Server Components needs to be tightly integrated with a bunch of stuff outside of React, things like the bundler, the server, and the router.我的理解是，React 服务器组件需要与 React 之外的一堆东西紧密集成，比如打包器、服务器和路由器。

As I write this, there’s only one way to start using React Server Components, and that’s with Next.js 13.4+, using their brand-new re-architected“App Router”.在我写这篇文章的时候，只有一种方法可以开始使用 React 服务器组件，那就是 Next.js 13.4+，使用他们全新的重新架构的“应用程序路由器”。

Hopefully in the future, more React-based frameworks will start to incorporate React Server Components. It feels awkward that a core React feature is only available in one particular tool! The React docs has a [“Bleeding-edge frameworks” section](https://react.dev/learn/start-a-new-react-project#bleeding-edge-react-frameworks) where they list the frameworks that support React Server Components; I plan on checking this page from time to time, to see if any new options become available.希望在未来，更多基于 React 的框架将开始包含 React 服务器组件。核心 React 功能仅在一个特定工具中可用，这感觉很尴尬！React 文档有一个“前沿框架”部分，其中列出了支持 React 服务器组件的框架;我计划不时检查此页面，看看是否有任何新选项可用。

### Link to this headingSpecifying client components 指定客户端组件

In this new “React Server Components” paradigm, **all components are assumed to be Server Components by default.** We have to“opt in”for Client Components.在这个新的“React 服务器组件”范式中，默认情况下，所有组件都假定为服务器组件。我们必须“选择加入”客户端组件。

We do this by specifying a brand-new *directive*:为此，我们指定了一个全新的指令：

```

```

That standalone string at the top, `'use client'`, is how we signal to React that the component(s) in this file are Client Components, that they should be included in our JS bundles so that they can re-render on the client.顶部的独立字符串 `'use client'` ，是我们向 React 发出信号的方式，表明此文件中的组件是客户端组件，它们应该包含在我们的 JS 包中，以便它们可以在客户端上重新渲染。

This might *seem* like an incredibly odd way to specify the type of component we’re creating, but there is a precedent for this sort of thing: the [“use strict”](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) directive that opts into“Strict Mode”in JavaScript.这似乎是一种非常奇怪的方式来指定我们正在创建的组件类型，但这种事情有一个先例：在 JavaScript 中选择进入“严格模式”的“使用严格”指令。

We don’t specify the `'use server'` directive in our Server Components; in the React Server Components paradigm, components are treated as Server Components by default. In fact, `'use server'` is used for Server Actions, a totally different feature that is beyond the scope of this blog post.我们没有在服务器组件中指定该 `'use server'` 指令;在 React Server 组件范式中，组件默认被视为服务器组件。事实上，它用于服务器操作，这是一个完全不同的功能， `'use server'` 超出了这篇博文的范围。

## Link to this headingBoundaries 边界

One of the first questions I had when I was getting familiar with React Server Components was this: *what happens when the props change?*当我熟悉 React Server 组件时，我遇到的第一个问题是：当道具发生变化时会发生什么？

For example, suppose we had a Server Component like this:例如，假设我们有一个这样的服务器组件：

```

```

Let’s suppose that in the initial Server Side Render, `hits` was equal to `0`. This component, then, will produce the following markup:假设在初始服务器端渲染中， `hits` 等于 `0` .然后，此组件将生成以下标记：

```

```

But what happens if the value of `hits` changes? Suppose it’s a state variable, and it changes from `0` to `1`. `HitCounter` would need to re-render, but it *can’t* re-render, because it’s a Server Component! 但是，如果价值 `hits` 发生变化会发生什么？假设它是一个状态变量，它从 `0` 更改为 `1` 。 `HitCounter` 需要重新渲染，但它不能重新渲染，因为它是一个服务器组件！

**The thing is, Server Components don’t really make sense in isolation.** We have to zoom out, to take a more holistic view, to consider the structure of our application.问题是，服务器组件在孤立的情况下并没有真正的意义。我们必须缩小范围，以更全面地看待问题，考虑应用程序的结构。

Let’s say we have the following component tree:假设我们有以下组件树：

If all of these components are Server Components, then it all makes sense. None of the props will ever change, because none of the components will ever re-render.如果所有这些组件都是服务器组件，那么这一切都有意义。任何道具都不会改变，因为任何组件都不会重新渲染。

But let’s suppose that `Article` component owns the `hits` state variable. In order to use state, we need to convert it to a Client Component:但是，让我们假设该 `Article` 组件拥有 `hits` 状态变量。为了使用状态，我们需要将其转换为客户端组件：

Do you see the issue here? When `Article` re-renders, any owned components will *also* re-render, including `HitCounter` and `Discussion`. If these are Server Components, though, they *can’t* re-render.你看到这里的问题了吗？重新渲染时 `Article` ，任何拥有的组件也将重新渲染，包括 `HitCounter` 和 `Discussion` .但是，如果这些是服务器组件，则无法重新呈现。

In order to prevent this impossible situation, the React team added a rule: **Client Components can only import other Client Components.** That `'use client'` directive means that these instances of `HitCounter` and `Discussion` will need to become Client Components.为了防止这种不可能的情况，React 团队添加了一条规则：客户端组件只能导入其他客户端组件。该 `'use client'` 指令意味着这些实例 `HitCounter` 和 `Discussion` 将需要成为客户端组件。

One of the biggest “ah-ha” moments I had with React Server Components was the realization that this new paradigm is all about creating *client boundaries*. Here’s what winds up happening, in practice:我在使用 React Server Components 时最大的“啊哈”时刻之一是意识到这种新范式就是创建客户端边界。以下是在实践中最终发生的情况：

When we add the `'use client'` directive to the `Article` component, we create a “client boundary”. All of the components within this boundary are *implicitly* converted to Client Components. Even though components like `HitCounter` don’t have the `'use client'` directive, they’ll still hydrate/render on the client in this particular situation.当我们将 `'use client'` 指令添加到组件时 `Article` ，我们创建了一个“客户端边界”。此边界内的所有组件都隐式转换为客户端组件。即使像 `HitCounter` 这样的组件没有指令 `'use client'` ，在这种特定情况下，它们仍然会在客户端上冻结/呈现。

This means we don’t have to add `'use client'` to every single file that needs to run on the client. In practice, we only need to add it when we’re creating new client boundaries.这意味着我们不必添加到 `'use client'` 需要在客户端上运行的每个文件。在实践中，我们只需要在创建新的客户端边界时添加它。

### Link to this headingWorkarounds 解决方法

When I first learned that Client Components can’t render Server Components, it felt pretty restrictive to me. What if I need to use state high up in the application? Does that mean *everything* needs to become a Client Component??当我第一次得知客户端组件无法呈现服务器组件时，我觉得这很有限制。如果我需要在应用程序中使用高状态怎么办？这是否意味着一切都需要成为客户端组件？

It turns out that in many cases, we can work around this limitation by restructuring our application so that the *owner* changes.事实证明，在许多情况下，我们可以通过重组应用程序来绕过此限制，以便所有者进行更改。

This is a tricky thing to explain, so let’s use an example:这是一件很难解释的事情，所以让我们举个例子：

```

```

In this setup, we need to use React state to allow users to flip between dark mode / light mode. This needs to happen high up in the application tree, so that we can apply our CSS variable tokens to the `<body>` tag.在此设置中，我们需要使用 React 状态来允许用户在暗模式/浅模式之间切换。这需要在应用程序树的顶部进行，以便我们可以将 CSS 变量标记应用于 `<body>` 标签。

In order to use state, we need to make `Homepage` a Client Component. And since this is the top of our application, it means that all of the other components — `Header` and `MainContent` — will implicitly become Client Components too.为了使用状态，我们需要创建一个 `Homepage` 客户端组件。由于这是我们应用程序的顶部，这意味着所有其他组件（ `Header` 和 `MainContent` ）也将隐式成为客户端组件。

To fix this, let’s pluck the color-management stuff into its own component, moved to its own file:为了解决这个问题，让我们将颜色管理的东西提取到它自己的组件中，移动到它自己的文件中：

```

```

Back in `Homepage`, we use this new component like so:回到 `Homepage` ，我们像这样使用这个新组件：

```

```

We can remove the `'use client'` directive from `Homepage` because it no longer uses state, or any other client-side React features. This means that `Header` and `MainContent` won’t be implicitly converted to Client Components anymore! 我们可以从 `Homepage` 中删除该 `'use client'` 指令，因为它不再使用状态或任何其他客户端 React 功能。这意味着 `Header` ，并且 `MainContent` 不会再隐式转换为客户端组件！

**But wait a second.** `ColorProvider`, a Client Component, is a *parent* to `Header` and `MainContent`. Either way, it’s still higher in the tree, right？但是等一下。 `ColorProvider` ，客户端组件是 `Header` 和 `MainContent` 的父级。无论哪种方式，它在树上仍然更高，对吧？

When it comes to client boundaries, though, the parent/child relationship doesn’t matter. `Homepage` is the one importing and rendering `Header` and `MainContent`. This means that `Homepage` decides *what the props are* for these components.但是，当涉及到客户边界时，父/子关系并不重要。 `Homepage` 是导入和渲染 `Header` 的那个，并且 `MainContent` .这意味着这 `Homepage` 决定了这些组件的道具是什么。

Remember, the problem we’re trying to solve is that Server Components can’t re-render, and so they can’t be given new values for any of their props. With this new setup, `Homepage` decides what the props are for `Header` and `MainContent`, and since `Homepage` is a Server Component, there’s no problem.请记住，我们试图解决的问题是服务器组件无法重新渲染，因此无法为其任何道具赋予新值。有了这个新的设置，决定了道具的用途 `Header` 和 `MainContent` ，并且由于 `Homepage` 是服务器组件， `Homepage` 所以没有问题。

**This is brain-bending stuff.** Even after years of React experience, I still find this very confusing 😅. It took a fair bit of practice to develop an intuition for this.这是令人费解的东西。即使经过多年的 React 经验，我仍然觉得这很令人困惑😅。这需要相当多的练习来培养这种直觉。

To be more precise, the `'use client'` directive works at the file / module level. Any modules *imported* in a Client Component file must be Client Components as well. When the bundler bundles up our code, it’ll follow these imports, after all! 更准确地说，该 `'use client'` 指令在文件/模块级别工作。在客户端组件文件中导入的任何模块也必须是客户端组件。毕竟，当打包器捆绑我们的代码时，它会遵循这些导入！

## Link to this headingPeeking under the hood 窥视引擎盖下

Let’s look at this at a bit of a lower level. When we use a Server Component, what does the output look like? What actually gets generated？让我们从较低的层面来看这个问题。当我们使用服务器组件时，输出是什么样的？实际生成了什么？

Let’s start with a super-simple React application:让我们从一个超级简单的 React 应用程序开始：

```

```

In the React Server Components paradigm, all components are Server Components by default. Since we haven’t explicitly marked this component as a Client Component (or rendered it within a client boundary), it’ll only render on the server.在 React 服务器组件范式中，默认情况下所有组件都是服务器组件。由于我们尚未将此组件显式标记为客户端组件（或在客户端边界内呈现），因此它只会在服务器上呈现。

When we visit this app in the browser, we’ll receive an HTML document which looks something like this:当我们在浏览器中访问此应用程序时，我们将收到一个 HTML 文档，如下所示：

```

```

We see that our HTML document includes the UI generated by our React application, the“Hello world!”paragraph. This is thanks to Server Side Rendering, and isn’t directly attributable to React Server Components.我们看到我们的 HTML 文档包含由 React 应用程序生成的 UI，即“Hello world！”段落。这要归功于服务器端渲染，而不是直接归因于 React 服务器组件。

Below that, we have a `<script>` tag that loads up our JS bundle. This bundle includes the dependencies like React, as well as any Client Components used in our application. And since our `Homepage` component is a Server Component, the code for that component is *not* included in this bundle.在它下面，我们有一个 `<script>` 标签来加载我们的 JS 包。这个捆绑包包括像 React 这样的依赖项，以及我们应用程序中使用的任何客户端组件。由于我们的 `Homepage` 组件是服务器组件，因此该组件的代码不包含在此捆绑包中。

Finally, we have a second `<script>` tag with some inline JS:最后，我们还有第二个 `<script>` 带有内联 JS 的标签：

```

```

This is the really interesting bit. Essentially, what we’re doing here is telling React “Hey, so I know you’re missing the `Homepage` component code, but don’t worry: here’s what it rendered”.这是真正有趣的一点。从本质上讲，我们在这里所做的是告诉 React“嘿，所以我知道你错过了 `Homepage` 组件代码，但别担心：这是它呈现的内容”。

Typically, when React hydrates on the client, it speed-renders all of the components, building up a virtual representation of the application. It can’t do that for Server Components, because the code isn’t included in the JS bundle.通常，当 React 在客户端上冻结时，它会加速渲染所有组件，从而构建应用程序的虚拟表示。它不能对服务器组件执行此操作，因为代码不包含在 JS 包中。

And so, we send along the rendered value, the virtual representation that was generated by the server. When React loads on the client, it re-uses that description instead of re-generating it.因此，我们发送渲染值，即服务器生成的虚拟表示。当 React 在客户端上加载时，它会重用该描述，而不是重新生成它。

This is what allows that `ColorProvider` example above to work. The output from `Header` and `MainContent` is passed into the `ColorProvider` component through the `children` prop. `ColorProvider` can re-render as much as it wants, but this data is static, locked in by the server.这就是上面的例子 `ColorProvider` 起作用的原因。 `Header` 和 `MainContent` 的输出通过 `children` prop 传递到组件中 `ColorProvider` 。 `ColorProvider` 可以根据需要重新渲染，但这些数据是静态的，由服务器锁定。

If you’re curious to see *true* representations of how Server Components are serialized and sent over the network, check out the [RSC Devtools](https://www.alvar.dev/blog/creating-devtools-for-react-server-components) by developer Alvar Lagerlöf.如果您想了解服务器组件如何通过网络进行序列化和发送的真实表示形式，请查看开发人员 Alvar Lagerlöf 的 RSC Devtools。

## Link to this headingAdvantages 优势

React Server Components is the first “official” way to run server-exclusive code in React. As I mentioned earlier, though, this isn’t *really* a new thing in the broader React ecosystem; we’ve been able to run server-exclusive code in Next.js since 2016!React Server Components 是在 React 中运行服务器独占代码的第一种“官方”方式。不过，正如我之前提到的，这在更广泛的 React 生态系统中并不是一件新鲜事。自 2016 年以来，我们已经能够在 Next.js 中运行服务器独占代码！

The big difference is that we’ve never before had a way to run server-exclusive code *inside our components.*最大的区别在于，我们以前从未有过在组件中运行服务器独占代码的方法。

The most obvious benefit is performance. Server Components don’t get included in our JS bundles, which reduces the amount of JavaScript that needs to be downloaded, and the number of components that need to be hydrated:最明显的好处是性能。服务器组件不包含在我们的 JS 包中，这减少了需要下载的 JavaScript 数量，以及需要冻结的组件数量：

Legacy Next.js (pre-RSC) 旧版 Next.js（RSC 之前）

Server 服务器

Client 客户

Download JavaScript 下载 JavaScript 的

This is a data visualization which shows a sequence of events between client and server. Each event is represented here as a list item.

1. "
Database Query
" on
server
. Duration:

5 units
of time.

1. "
Render App
" on
server
. Duration:

6 units
of time.

1. Response from server
. Duration:

4 units
of time.

1. "
Download JavaScript
" on
client
. Duration:

7 units
of time.

1. "
Hydrate
" on
client
. Duration:

3 units
of time.

This is maybe the least exciting thing to me, though. Honestly, most Next.js apps are *already* fast enough when it comes to“Page Interactive”timing.不过，这对我来说可能是最不令人兴奋的事情。老实说，大多数 Next.js 应用程序在“页面交互”计时方面已经足够快了。

If you follow semantic HTML principles, most of your app should work even before React has hydrated. Links can be followed, forms can be submitted, accordions can be expanded and collapsed (using `<details>` and `<summary>`). For most projects, it’s fine if it takes a few seconds for React to hydrate.如果你遵循语义 HTML 原则，你的大部分应用程序应该在 React 完成之前就已经工作了。可以跟踪链接，可以提交表单，可以展开和折叠手风琴（使用 `<details>` 和 `<summary>` ）。对于大多数项目来说，如果 React 需要几秒钟的时间来补充水分，那也没关系。

**But here’s something I find really cool:** we no longer have to make the same compromises, in terms of features vs. bundle size! 但我觉得有一点真的很酷：我们不再需要在功能与捆绑包大小方面做出同样的妥协！

For example, most technical blogs require some sort of syntax highlighting library. On this blog, I use Prism. The code snippets look like this:例如，大多数技术博客都需要某种语法高亮库。在这个博客上，我使用 Prism。代码片段如下所示：

```

```

A proper syntax-highlighting library, with support for all popular programming languages, would be several megabytes, far too large to stick in a JS bundle. As a result, we have to make compromises, trimming out languages and features that aren’t mission-critical.一个支持所有流行编程语言的适当语法高亮库将有几兆字节，太大而无法放入 JS 包中。因此，我们不得不做出妥协，删减非关键任务的语言和功能。

But, suppose we do the syntax highlighting *in a Server Component.* In that case, none of the library code would actually be included in our JS bundles. As a result, we wouldn’t have to make any compromises, we could use all of the bells and whistles.但是，假设我们在服务器组件中执行语法突出显示。在这种情况下，实际上没有一个库代码会包含在我们的 JS 包中。因此，我们不必做出任何妥协，我们可以使用所有的花里胡哨。

This is the big idea behind [Bright](https://bright.codehike.org/), a modern syntax-highlighting package designed to work with React Server Components.这是 Bright 背后的大创意，Bright 是一个现代语法高亮包，旨在与 React Server 组件一起使用。

![](https://www.joshwcomeau.com/images/server-components/bright.png)

This is the sort of thing that gets me excited about React Server Components. Things that would be too cost-prohibitive to include in a JS bundle can now run on the server *for free,* adding zero kilobytes to our bundles, and producing an even better user experience.这就是让我对 React Server 组件感到兴奋的事情。那些成本过高而无法包含在 JS 捆绑包中的东西现在可以在服务器免费运行，为我们的捆绑包增加零千字节，并产生更好的用户体验。

It’s not just about performance and UX either. After working with RSC for a while, I’ve come to really appreciate how easy-breezy Server Components are. We never have to worry about dependency arrays, stale closures, memoization, or any of the other complex stuff caused by *things changing.*这不仅仅是关于性能和用户体验。在与 RSC 合作了一段时间后，我开始真正体会到服务器组件是多么简单易用。我们永远不必担心依赖数组、过时的闭包、记忆或任何其他由事物变化引起的复杂问题。

Ultimately, it’s still very early days. React Server Components only emerged from beta a couple of months ago! I’m really excited to see how things evolve over the next couple of years, as the community continues to innovate new solutions like Bright, taking advantage of this new paradigm. It’s an exciting time to be a React developer! 归根结底，现在还为时过早。React Server Components 几个月前才从 beta 版中出现！我真的很高兴看到未来几年事情的发展，因为社区继续创新像 Bright 这样的新解决方案，利用这种新范式。成为 React 开发人员是一个激动人心的时刻！

## Link to this headingThe full picture 全貌

React Server Components is an exciting development, but it’s actually only one part of the“Modern React”puzzle.React Server Components 是一个令人兴奋的发展，但它实际上只是“现代 React”拼图的一部分。

Things get *really* interesting when we combine React Server Components with Suspense and the new Streaming SSR architecture. It allows us to do *wild* stuff like this:当我们将 React Server 组件与 Suspense 和新的流式 SSR 架构相结合时，事情变得非常有趣。它允许我们做这样的事情：

Server 服务器

Client 客户

This is a data visualization which shows a sequence of events between client and server. Each event is represented here as a list item.

1. "
Render Shell
" on
server
. Duration:

3 units
of time.

1. Response from server
. Duration:

3 units
of time.

1. "
Database Query
" on
server
. Duration:

8 units
of time.

1. "
Render Content
" on
server
. Duration:

3 units
of time.

1. Response from server
. Duration:

4 units
of time.

1. "
Download JS
" on
client
. Duration:

5 units
of time.

1. "
Hydrate
" on
client
. Duration:

2 units
of time.

1. "
Hydrate
" on
client
. Duration:

2 units
of time.

It’s beyond the scope of this tutorial, but you can learn more about this architecture [on Github](https://github.com/reactwg/react-18/discussions/37).这超出了本教程的范围，但你可以在 Github 上了解有关此体系结构的更多信息。

It’s also something we explore in depth in my brand-new course, [The Joy of React](https://joyofreact.com/). I’d love to tell you a little bit more about it, if that’s alright! ❤️这也是我们在我的全新课程《反应的乐趣》中深入探讨的内容。如果可以的话，我很想告诉你更多关于它的信息！❤️

The Joy of React is a beginner-friendly interactive course, designed to help you build an intuition for how React works. We start at the very beginning (no prior React experience required), and work our way through some of the most notoriously-tricky aspects of React.The Joy of React 是一门适合初学者的互动课程，旨在帮助您建立对 React 工作原理的直觉。我们从头开始（不需要任何 React 经验），并逐步完成 React 中一些最臭名昭著的棘手方面。

This course has been my full-time focus for almost two years now, and it includes all of the most important stuff I’ve learned about React in over 8 years of experience.这门课程是我近两年来的全职重点，它包括我在超过 8 年的经验中学到的关于 React 的所有最重要的东西。

There’s so much good stuff I’d love to tell you about. In addition to React itself, and all the bleeding-edge stuff we’ve alluded to in this blog post, you’ll learn about my favourite parts of the React ecosystem. For example, you’ll learn how to do next-level layout animations like this, using Framer Motion:我有很多好东西想告诉你。除了 React 本身，以及我们在这篇博文中提到的所有前沿内容之外，您还将了解 React 生态系统中我最喜欢的部分。例如，您将学习如何使用 Framer Motion 制作如下级别的布局动画：

You can learn more about the course, and discover the joy of building with React:你可以了解更多关于这门课程的信息，并发现使用 React 构建的乐趣：

*

React Server Components is a significant paradigm shift. Personally, I’m *super* keen to see how things develop over the next couple of years, as the ecosystem builds more tools like Bright that takes advantage of Server Components.React Server Components 是一个重大的范式转变。就我个人而言，我非常希望看到未来几年的发展情况，因为生态系统会构建更多像 Bright 这样利用服务器组件的工具。

I have the feeling that building in React is about to get even cooler. 😄我有一种感觉，在 React 中构建将变得更加酷。😄

### Last Updated 最后更新

September 19th, 2023 九月 19th，2023

### Hits 打
