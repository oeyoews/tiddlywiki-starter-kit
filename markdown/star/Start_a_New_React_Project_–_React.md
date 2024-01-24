---
title: 'Start_a_New_React_Project_–_React'
tags: ['剪藏']
type: 'text/markdown'
created: 'Sun Nov 12 2023 12:27:11 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://react.dev/learn/start-a-new-react-project'
---

# Start_a_New_React_Project_–_React

If you want to build a new app or a new website fully with React, we recommend picking one of the React-powered frameworks popular in the community. Frameworks provide features that most apps and sites eventually need, including routing, data fetching, and generating HTML.如果你想完全使用 React 构建一个新应用程序或新网站，我们建议选择社区中流行的 React 驱动的框架之一。框架提供了大多数应用和网站最终需要的功能，包括路由、数据获取和生成 HTML。

### Note 注意

**You need to install [Node.js](https://nodejs.org/en/) for local development.** You can *also* choose to use Node.js in production, but you don’t have to. Many React frameworks support export to a static HTML/CSS/JS folder.您需要安装 Node.js 进行本地开发。您也可以选择在生产中使用 Node.js，但您不必这样做。许多 React 框架支持导出到静态 HTML/CSS/JS 文件夹。

## Production-grade React frameworks 生产级 React 框架production-grade-react-frameworks

### Next.js  下一页 .jsnextjs

**[Next.js](https://nextjs.org/) is a full-stack React framework.** It’s versatile and lets you create React apps of any size—from a mostly static blog to a complex dynamic application. To create a new Next.js project, run in your terminal:Next.js 是一个全栈 React 框架。它用途广泛，可让您创建任何规模的 React 应用程序——从大多数静态博客到复杂的动态应用程序。若要创建新的 Next.js 项目，请在终端中运行：

npx create-next-app@latest

If you’re new to Next.js, check out the [Next.js tutorial.](https://nextjs.org/learn/foundations/about-nextjs)如果您不熟悉 Next.js，请查看 Next.js 教程。

Next.js is maintained by [Vercel](https://vercel.com/). You can [deploy a Next.js app](https://nextjs.org/docs/app/building-your-application/deploying) to any Node.js or serverless hosting, or to your own server. Next.js also supports a [static export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) which doesn’t require a server.Next.js 由 Vercel 维护。您可以将 Next.js 应用程序部署到任何 Node.js 或无服务器托管，或者部署到您自己的服务器。Next.js 还支持不需要服务器的静态导出。

### Remix  混 音remix

**[Remix](https://remix.run/) is a full-stack React framework with nested routing.** It lets you break your app into nested parts that can load data in parallel and refresh in response to the user actions. To create a new Remix project, run:Remix 是一个具有嵌套路由的全栈 React 框架。它允许你将应用分解为嵌套部分，这些部分可以并行加载数据并刷新以响应用户操作。若要创建新的 Remix 项目，请运行：

If you’re new to Remix, check out the Remix [blog tutorial](https://remix.run/docs/en/main/tutorials/blog) (short) and [app tutorial](https://remix.run/docs/en/main/tutorials/jokes) (long).如果您不熟悉 Remix，请查看 Remix 博客教程（简短）和应用教程（长）。

Remix is maintained by [Shopify](https://www.shopify.com/). When you create a Remix project, you need to [pick your deployment target](https://remix.run/docs/en/main/guides/deployment). You can deploy a Remix app to any Node.js or serverless hosting by using or writing an [adapter](https://remix.run/docs/en/main/other-api/adapter).Remix 由 Shopify 维护。创建 Remix 项目时，需要选择部署目标。您可以使用或编写适配器将 Remix 应用程序部署到任何 Node.js 或无服务器托管。

### Gatsby  盖茨比gatsby

**[Gatsby](https://www.gatsbyjs.com/) is a React framework for fast CMS-backed websites.** Its rich plugin ecosystem and its GraphQL data layer simplify integrating content, APIs, and services into one website. To create a new Gatsby project, run:Gatsby 是一个 React 框架，用于快速 CMS 支持的网站。其丰富的插件生态系统和 GraphQL 数据层简化了将内容、API 和服务集成到一个网站的过程。要创建新的 Gatsby 项目，请运行：

If you’re new to Gatsby, check out the [Gatsby tutorial.](https://www.gatsbyjs.com/docs/tutorial/)如果您不熟悉盖茨比，请查看盖茨比教程。

Gatsby is maintained by [Netlify](https://www.netlify.com/). You can [deploy a fully static Gatsby site](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting) to any static hosting. If you opt into using server-only features, make sure your hosting provider supports them for Gatsby.Gatsby 由 Netlify 维护。您可以将完全静态的 Gatsby 站点部署到任何静态托管。如果您选择使用仅限服务器的功能，请确保您的托管服务提供商为 Gatsby 支持它们。

### Expo (for native apps)Expo（适用于本机应用）expo

**[Expo](https://expo.dev/) is a React framework that lets you create universal Android, iOS, and web apps with truly native UIs.** It provides an SDK for [React Native](https://reactnative.dev/) that makes the native parts easier to use. To create a new Expo project, run:Expo 是一个 React 框架，可让您创建具有真正原生 UI 的通用 Android、iOS 和 Web 应用程序。它为 React Native 提供了一个 SDK，使原生部分更易于使用。若要创建新的 Expo 项目，请运行：

If you’re new to Expo, check out the [Expo tutorial](https://docs.expo.dev/tutorial/introduction/).如果您不熟悉世博会，请查看世博会教程。

Expo is maintained by [Expo (the company)](https://expo.dev/about). Building apps with Expo is free, and you can submit them to the Google and Apple app stores without restrictions. Expo additionally provides opt-in paid cloud services.世博会由世博会（公司）维护。使用 Expo 构建应用程序是免费的，您可以不受限制地将它们提交到 Google 和 Apple 应用商店。世博会还提供可选的付费云服务。

<h5>Deep Dive 深潜#### Can I use React without a framework？我可以在没有框架的情况下使用 React 吗？can-i-use-react-without-a-framework</h5>
You can definitely use React without a framework—that’s how you’d [use React for a part of your page.](https://react.dev/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page) **However, if you’re building a new app or a site fully with React, we recommend using a framework.**你绝对可以在没有框架的情况下使用 React——这就是你在页面的一部分使用 React 的方式。但是，如果您要完全使用 React 构建新应用或网站，我们建议您使用框架。

Here’s why. 原因如下。

Even if you don’t need routing or data fetching at first, you’ll likely want to add some libraries for them. As your JavaScript bundle grows with every new feature, you might have to figure out how to split code for every route individually. As your data fetching needs get more complex, you are likely to encounter server-client network waterfalls that make your app feel very slow. As your audience includes more users with poor network conditions and low-end devices, you might need to generate HTML from your components to display content early—either on the server, or during the build time. Changing your setup to run some of your code on the server or during the build can be very tricky.即使您一开始不需要路由或数据提取，您也可能需要为它们添加一些库。随着 JavaScript 包随着每个新功能的增长而增长，您可能必须弄清楚如何单独拆分每个路由的代码。随着数据提取需求变得越来越复杂，你可能会遇到服务器 - 客户端网络瀑布流，使你的应用感觉非常慢。由于您的受众包括更多网络条件较差的用户和低端设备，因此您可能需要从组件生成 HTML，以便尽早在服务器上或在构建期间显示内容。更改设置以在服务器上或在生成期间运行某些代码可能非常棘手。

**These problems are not React-specific. This is why Svelte has SvelteKit, Vue has Nuxt, and so on.** To solve these problems on your own, you’ll need to integrate your bundler with your router and with your data fetching library. It’s not hard to get an initial setup working, but there are a lot of subtleties involved in making an app that loads quickly even as it grows over time. You’ll want to send down the minimal amount of app code but do so in a single client–server roundtrip, in parallel with any data required for the page. You’ll likely want the page to be interactive before your JavaScript code even runs, to support progressive enhancement. You may want to generate a folder of fully static HTML files for your marketing pages that can be hosted anywhere and still work with JavaScript disabled. Building these capabilities yourself takes real work.这些问题不是特定于 React 的。这就是为什么 Svelte 有 SvelteKit，Vue 有 Nuxt 等等。要自行解决这些问题，您需要将捆绑器与路由器和数据获取库集成。让初始设置正常工作并不难，但是制作一个即使随着时间的推移而增长也能快速加载的应用程序涉及很多微妙之处。您需要发送最少量的应用代码，但要在单个客户端 - 服务器往返中发送，并与页面所需的任何数据并行。您可能希望在 JavaScript 代码运行之前页面是交互式的，以支持渐进式增强。您可能希望为营销页面生成一个完全静态的 HTML 文件的文件夹，这些文件可以托管在任何地方，并且仍然可以在禁用 JavaScript 的情况下工作。自己构建这些功能需要真正的工作。

**React frameworks on this page solve problems like these by default, with no extra work from your side.** They let you start very lean and then scale your app with your needs. Each React framework has a community, so finding answers to questions and upgrading tooling is easier. Frameworks also give structure to your code, helping you and others retain context and skills between different projects. Conversely, with a custom setup it’s easier to get stuck on unsupported dependency versions, and you’ll essentially end up creating your own framework—albeit one with no community or upgrade path (and if it’s anything like the ones we’ve made in the past, more haphazardly designed).默认情况下，此页面上的 React 框架可以解决此类问题，而无需您进行额外的工作。它们让你从非常精简开始，然后根据你的需求扩展你的应用程序。每个 React 框架都有一个社区，因此查找问题的答案和升级工具更容易。框架还为您的代码提供结构，帮助您和其他人在不同项目之间保留上下文和技能。相反，使用自定义设置，更容易卡在不受支持的依赖项版本上，并且您基本上最终会创建自己的框架——尽管该框架没有社区或升级路径（如果它与我们过去所做的一样，则设计得更随意）。

If you’re still not convinced, or your app has unusual constraints not served well by these frameworks and you’d like to roll your own custom setup, we can’t stop you—go for it! Grab `react` and `react-dom` from npm, set up your custom build process with a bundler like [Vite](https://vitejs.dev/) or [Parcel](https://parceljs.org/), and add other tools as you need them for routing, static generation or server-side rendering, and more.

## Bleeding-edge React frameworks 前沿的 React 框架bleeding-edge-react-frameworks

As we’ve explored how to continue improving React, we realized that integrating React more closely with frameworks (specifically, with routing, bundling, and server technologies) is our biggest opportunity to help React users build better apps. The Next.js team has agreed to collaborate with us in researching, developing, integrating, and testing framework-agnostic bleeding-edge React features like [React Server Components.](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)当我们探索如何继续改进 React 时，我们意识到将 React 与框架（特别是路由、捆绑和服务器技术）更紧密地集成是我们帮助 React 用户构建更好应用程序的最大机会。Next.js 团队已同意与我们合作，研究、开发、集成和测试与框架无关的前沿 React 功能，如 React 服务器组件。

These features are getting closer to being production-ready every day, and we’ve been in talks with other bundler and framework developers about integrating them. Our hope is that in a year or two, all frameworks listed on this page will have full support for these features. (If you’re a framework author interested in partnering with us to experiment with these features, please let us know!) 这些功能每天都在接近生产就绪，我们一直在与其他捆绑器和框架开发人员讨论集成它们。我们希望在一两年内，本页列出的所有框架都将完全支持这些功能。（如果您是框架作者，有兴趣与我们合作试验这些功能，请告诉我们！

### Next.js (App Router)  下一个.js（应用路由器）nextjs-app-router

**[Next.js’s App Router](https://nextjs.org/docs) is a redesign of the Next.js APIs aiming to fulfill the React team’s full-stack architecture vision.** It lets you fetch data in asynchronous components that run on the server or even during the build.Next.js 的 App Router 是对 Next.js API 的重新设计，旨在实现 React 团队的全栈架构愿景。它允许您在服务器上运行的异步组件中获取数据，甚至在构建期间获取数据。

Next.js is maintained by [Vercel](https://vercel.com/). You can [deploy a Next.js app](https://nextjs.org/docs/app/building-your-application/deploying) to any Node.js or serverless hosting, or to your own server. Next.js also supports [static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) which doesn’t require a server.Next.js 由 Vercel 维护。您可以将 Next.js 应用程序部署到任何 Node.js 或无服务器托管，或者部署到您自己的服务器。Next.js 还支持静态导出，不需要服务器。

<h5>Deep Dive 深潜#### Which features make up the React team’s full-stack architecture vision？哪些功能构成了 React 团队的全栈架构愿景？which-features-make-up-the-react-teams-full-stack-architecture-vision</h5>
Next.js’s App Router bundler fully implements the official [React Server Components specification](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md). This lets you mix build-time, server-only, and interactive components in a single React tree.Next.js 的应用路由器捆绑器完全实现了官方的 React 服务器组件规范。这使您可以在单个 React 树中混合构建时、仅服务器和交互式组件。

For example, you can write a server-only React component as an `async` function that reads from a database or from a file. Then you can pass data down from it to your interactive components:例如，您可以将仅限服务器的 React 组件编写为从数据库或文件中读取的 `async` 函数。然后，您可以将数据从它传递到您的交互式组件：

```
// This component runs *only* on the server (or during the build).

async function Talks({ confId }) {

// 1. You're on the server, so you can talk to your data layer. API endpoint not required.

const talks = await db.Talks.findAll({ confId });

// 2. Add any amount of rendering logic. It won't make your JavaScript bundle larger.

const videos = talks.map(talk => talk.video);

// 3. Pass the data down to the components that will run in the browser.

return <SearchableVideoList videos={videos} />;

}
```

Next.js’s App Router also integrates [data fetching with Suspense](https://react.dev/blog/2022/03/29/react-v18#suspense-in-data-frameworks). This lets you specify a loading state (like a skeleton placeholder) for different parts of your user interface directly in your React tree:Next.js 的 App Router 还集成了数据获取和 Suspense。这允许你直接在 React 树中为用户界面的不同部分指定加载状态（如骨架占位符）：

```
<Suspense fallback={<TalksLoading />}>

<Talks confId={conf.id} />

</Suspense>
```

Server Components and Suspense are React features rather than Next.js features. However, adopting them at the framework level requires buy-in and non-trivial implementation work. At the moment, the Next.js App Router is the most complete implementation. The React team is working with bundler developers to make these features easier to implement in the next generation of frameworks.服务器组件和悬念是 React 功能，而不是 Next.js 功能。然而，在框架层面采用它们需要支持和不平凡的实施工作。目前，Next.js 应用程序路由器是最完整的实现。React 团队正在与捆绑器开发人员合作，使这些功能更容易在下一代框架中实现。
