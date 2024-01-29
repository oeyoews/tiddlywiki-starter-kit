---
title: 'Why_I'm_Using_Next.js'
tags: ['剪藏']
type: 'text/markdown'
created: 'Fri Nov 03 2023 05:22:34 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: 'oeyoews'
qrcode: 'yes'
url: 'https://leerob.io/blog/using-nextjs'
---

# Why_I'm_Using_Next.js

October 28, 2023 (1mo ago)2023 年 10 月 28 日（1 个月前）

55,923 views 55,923 次浏览

Kent C. Dodds recently published a new article [Why I Won’t Use Next.js](https://www.epicweb.dev/why-i-wont-use-nextjs).Kent C. Dodds 最近发表了一篇新文章《为什么我不会使用 Next.js》。

In the post, Kent shares his opinions on why he’s recommending using Remix instead of Next.js. I wanted to share my thoughts on the post and make the case that:在这篇文章中，Kent 分享了他为什么建议使用 Remix 而不是 Next.js 的观点。我想分享我对这篇文章的看法，并说明：

* Learning Next.js helps you learn the web platform学习 Next.js 可帮助您学习 Web 平台

* All Next.js features work self-hosted所有 Next.js 功能都自托管工作

* Server Components and Server Actions are independent of Vercel服务器组件和服务器操作独立于 Vercel

* The React canary channel is stable for frameworks like Next.js to adoptReact Canary 通道对于像 Next.js 这样的框架来说是稳定的

* Server Components are production ready服务器组件已准备好用于生产

## backgroundBackground 背景

[Kent](https://twitter.com/kentcdodds) is a prolific educator and previously a co-founder of Remix. His new course, [EpicWeb.dev](https://www.epicweb.dev/), helps you learn how to build full-stack web applications using Remix.Kent 是一位多产的教育家，曾是 Remix 的联合创始人。他的新课程 EpicWeb.dev 可帮助您学习如何使用 Remix 构建全栈 Web 应用程序。

Kent is an incredible member of the React community. I’ve learned a lot from him over the years (especially his material on testing) and this blog actually uses a library he created, `mdx-bundler`, so thank you.Kent 是 React 社区中一位了不起的成员。这些年来，我从他那里学到了很多东西（尤其是他关于测试的材料），这个博客实际上使用了他创建的库， `mdx-bundler` 所以谢谢。

Excited to go on with [@leeerob](https://twitter.com/leeerob) for the keynote at [@reactathon](https://twitter.com/reactathon) in person! Catch the live stream right now! 很高兴能亲自@leeerob@reactathon 的主题演讲！立即观看直播！

If you’re new here, I’m Lee. I work on Next.js. I’ve also made some courses about using Next.js before I joined Vercel.如果你是新来的，我是李。我在 Next.js 上工作。在我加入 Vercel 之前，我还制作了一些关于使用 Next.js 的课程。

Both Kent and I are passionate about the tools that we use. As Kent shared in his post:Kent 和我都对我们使用的工具充满热情。正如肯特在他的帖子中分享的那样：

> As Next.js is a very popular alternative to Remix, people ask me why I chose Remix instead of Next.js for the framework I teach on EpicWeb.dev. These people are probably facing one of those scenarios I mentioned. So this post is for those people.由于 Next.js 是 Remix 的一个非常流行的替代品，人们问我为什么选择 Remix 而不是 Next.js 因为我在 EpicWeb.dev 上教授的框架。这些人可能正面临我提到的其中一种情况。所以这篇文章是为这些人准备的。

Similarly, I’m often asked about my opinions on Next.js versus other frameworks. This post is for the folks in the Next.js community who are wondering about some of the points Kent brings up.同样，我经常被问到我对 Next.js 与其他框架的看法。这篇文章是为 Next.js 社区中想知道 Kent 提出的一些观点的人准备的。

## the-web-platformThe Web Platform 网络平台

First, it’s important to call out that Remix has pushed the React community forward in it’s understanding of the web platform and web APIs.首先，需要指出的是，Remix 推动了 React 社区对 Web 平台和 Web API 的理解。

Next.js v1 was released in 2016 (just had the 7-year anniversary) and at the time, the Node.js [request](https://nodejs.org/api/http.html#class-httpincomingmessage)/[response](https://nodejs.org/api/http.html#class-httpserverresponse) objects were the de-facto way to build a server-rendered JavaScript framework. We were writing React class components, as well.Next.js v1 于 2016 年发布（刚刚迎来 7 周年纪念日），当时 Node.js 请求/响应对象是构建服务器渲染的 JavaScript 框架的事实上的方式。我们也在编写 React 类组件。

Remix v1 was released in 2021. [A lot has changed since then](https://leerob.io/blog/javascript). The web platform is more powerful than ever, and there’s an entire new generation of developers learning the web `Request` and `Response` APIs first instead. They’re able to learn once, and write the same JavaScript everywhere, reusing their existing knowledge. I love that.Remix v1 于 2021 年发布。从那时起，很多事情都发生了变化。Web 平台比以往任何时候都更强大，新一代的开发人员首先学习 Web `Request` 和 `Response` API。他们只需学习一次，就可以在任何地方编写相同的 JavaScript，重复使用他们现有的知识。我喜欢这一点。

Kent talks about how he prefers tools that give access to the underlying primitives, rather than wrappers, based on his past experience. I can empathize.Kent 谈到了根据他过去的经验，他更喜欢能够访问底层基元的工具，而不是包装器。我能感同身受。

> Where Next.js has utilities to allow you to interact with the request, headers, cookies, etc, Remix exposes those APIs directly to you through its `loader`s and `action`s. In Remix, these functions accept a `Request` and return a `Response`. If you need to understand how to return JSON with some set headers, you go to MDN (the de facto standard web platform documentation) rather than the Remix docs.Next.js 具有允许您与请求、标头、cookie 等交互的实用程序，而 Remix 通过其 s 和 `loader` `action` s 直接向您公开这些 API。在 Remix 中，这些函数接受 a `Request` 并返回 `Response` .如果你需要了解如何返回带有一些设置标头的 JSON，你可以转到 MDN（事实上的标准 Web 平台文档）而不是 Remix 文档。

This is absolutely true for the Next.js Pages Router. However, a lot has changed since then. Let me explain.对于 Next.js 页面路由器来说，这是绝对正确的。然而，从那时起，很多事情都发生了变化。让我解释一下。

### nextjs-pages-routerNext.js Pages Router 下一页 .js 页面路由器

The Next.js Pages Router was introduced in 2016. You’ll notice many parts of the framework that feel closer to Node.js than web APIs. For example, you’ve been able to eject from the default Next.js server to have [your own Express server](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server) since the beginning.Next.js Pages 路由器于 2016 年推出。你会注意到框架的许多部分感觉更接近 Node.js 而不是 Web API。例如，您从一开始就能够从默认的 Next.js 服务器弹出，以拥有自己的 Express 服务器。

This design choice continued for many years. Next.js 9, released in 2019, introduced [API Routes](https://nextjs.org/blog/next-9#api-routes). These endpoints built on the Node.js request and response APIs. The API is similar to Express, as many folks were familiar with this API at the time.这种设计选择持续了很多年。Next.js 9 于 2019 年发布，引入了 API 路由。这些端点基于 Node.js 请求和响应 API 构建。该 API 类似于 Express，因为当时很多人都熟悉这个 API。

```
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js!' });
}
```

API Routes and the ejected server still work today. But frameworks must evolve over time based on community feedback, how the ecosystem moves, and new functionality available in the web platform.API 路由和弹出的服务器今天仍然有效。但是，框架必须根据社区反馈、生态系统的移动方式以及 Web 平台中可用的新功能随着时间的推移而发展。

That’s why Next.js 12, released in 2021, introduced [Middleware](https://nextjs.org/blog/next-12#introducing-middleware), which is built on the Web `Request`, `Response`, and `fetch`. It didn’t make sense to build new APIs that weren’t embracing the now standardized web APIs. Note: this was the same year Remix v1 was released. We agree! 这就是为什么 2021 年发布的 Next.js 12 引入了基于 Web `Request` 、 `Response` 和 `fetch` 的中间件。构建不包含现在标准化的 Web API 的新 API 是没有意义的。注意：这是 Remix v1 发布的同一年。我们同意！

### nextjs-app-routerNext.js App Router 下一个 .js 应用路由器

I mentioned evolution, right? Kent mentions in the post:我提到了进化，对吧？肯特在帖子中提到：

> I’ve been an outsider to the Next.js framework for years. It’s been a long time since I shipped something with Next.js myself.多年来，我一直是 Next.js 框架的局外人。我已经很久没有自己用 Next.js 发布过东西了。

Totally fair. There’s only so many hours in the day for family, work, and fun. So I don’t expect Kent (or anyone really) to have kept up with the chronology of Next.js here like I have. But let me explain further about where we’re headed.完全公平。一天中只有那么多时间用于家庭、工作和娱乐。所以我不指望肯特（或任何人）像我一样跟上 Next.js 的年表。但让我进一步解释一下我们的前进方向。

After 6 years of feedback, Next.js 13 introduced a new foundation for the framework with the App Router. The Pages Router didn’t go anywhere, but again, the framework must evolve with the times.经过 6 年的反馈，Next.js 13 通过应用路由器为框架引入了新的基础。Pages Router 没有去任何地方，但同样，框架必须与时俱进。

If you were designing a new framework, how would you handle reading values from the incoming request, like cookies, or headers? And how would you allow developers to write custom API endpoints？如果您正在设计一个新框架，您将如何处理从传入请求中读取值，例如 cookie 或标头？您将如何允许开发人员编写自定义 API 端点？

Well, you’d use the standard web APIs, of course. Going back to Kent’s feedback:当然，你会使用标准的 Web API。回到 Kent 的反馈：

> Where Next.js has utilities to allow you to interact with the request, headers, cookies, etc, Remix exposes those APIs directly to you through its `loader`s and `action`s.Next.js 具有允许您与请求、标头、cookie 等交互的实用程序，而 Remix 通过其 s 和 `loader` `action` s 直接向您公开这些 API。

Again, definitely true for the Pages Router. Inside `getServerSideProps`, the equivalent for a Remix `loader`, you can’t use web APIs to access headers or cookies. It’s Node.js APIs still.同样，对于页面路由器来说绝对是正确的。在内部 `getServerSideProps` ，相当于 Remix `loader` ，您不能使用 Web API 访问标头或 cookie。它仍然是 Node.js API。

```
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
 
  return { props: {} };
}
```

So you’re designing this framework. You want to use web standard APIs. And you also want to make it easy for developers to do the right thing. Kent says:所以你正在设计这个框架。您希望使用 Web 标准 API。此外，您还希望让开发人员能够轻松地做正确的事情。肯特 说：

> To boil that down to a principle, I would say that instead of wrapping the platform APIs, Testing Library exposed the platform APIs.为了将其归结为一个原则，我想说的是，测试库不是包装平台 API，而是公开了平台 API。

We agree. But why couldn’t we have both？我们同意。但为什么我们不能两者兼而有之呢？

In the Next.js App Router, let’s say you want to create an arbitrary API endpoint. These are now called [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers). Here’s what they look like:在 Next.js 应用路由器中，假设您要创建任意 API 终结点。这些现在称为路由处理程序。以下是它们的样子：

```
export async function GET(request: Request) {
  const res = await fetch('https://api.leerob.io/...', { ... } )
  const data = await res.json()
 
  return Response.json({ data })
}
```

Route Handlers accept a web `Request` and produce a web `Response`. But what about cookies, headers, and more？路由处理程序接受 Web 并生成 Web `Request` `Response` 。但是 Cookie、标题等呢？

Since you have access to the web APIs directly, you can browse MDN and reuse all of the knowledge you’ve learned from Next.js. Also, ChatGPT is *really* good at creating these APIs.由于您可以直接访问 Web API，因此您可以浏览 MDN 并重用您从 Next.js 学到的所有知识。此外，ChatGPT 非常擅长创建这些 API。

```
export async function GET(request: Request) {
  // Read headers
  const token = await getToken(request.headers);
  // Set cookies
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token.value}` },
  });
}
```

We can also provide abstractions that can be composed, allowing you to write reusable functions without having to pass headers as a function parameter. You can choose whichever you prefer.我们还可以提供可以组合的抽象，允许您编写可重用的函数，而无需将标头作为函数参数传递。您可以选择您喜欢的任何一种。

```
import { cookies, headers } from 'next/headers';
 
export async function GET(request: Request) {
  const cookieStore = cookies();
  const headersList = headers();
  const token = cookieStore.get('token');
  const referer = headersList.get('referer');
}
```

That [`cookies()` function](https://nextjs.org/docs/app/api-reference/functions/cookies) returns the same underlying `Headers` web API. It can be used in both Route Handlers, as well as other server-side code in the App Router, like Server Actions or Server Components:该 `cookies()` 函数返回相同的基础 `Headers` Web API。它可以在路由处理程序以及应用路由器中的其他服务器端代码中使用，例如服务器操作或服务器组件：

```
'use server';
 
import { cookies } from 'next/headers';
 
export function serverAction() {
  cookies().set('name', 'leerob');
}
```

I strongly agree with Kent. I can’t imagine new web frameworks being released that don’t embrace web APIs. That’s why Remix, SvelteKit, Nuxt, Solid, Astro, Next.js, and many more are doing this.我非常同意肯特的观点。我无法想象发布的新 Web 框架不包含 Web API。这就是为什么 Remix，SvelteKit，Nuxt，Solid，Astro，Next.js 等等都在这样做。

## independenceIndependence 独立

Kent mentions a project called OpenNext, which as quoted in the post, describes itself as:Kent 提到了一个名为 OpenNext 的项目，正如帖子中引用的那样，该项目将自己描述为：

> OpenNext takes the Next.js build output and converts it into a package that can be deployed to any functions as a service platform. As of now only AWS Lambda is supported.OpenNext 获取 Next.js 生成输出，并将其转换为可部署到任何功能即服务平台的包。截至目前，仅支持 AWS Lambda。

The maintainers of OpenNext are building a platform for easily deploying serverless applications on AWS. I would argue that this package is trying to be an open-source infrastructure as code tool, not an open-source framework. Naming is hard.OpenNext 的维护者正在构建一个平台，以便在 AWS 上轻松部署无服务器应用程序。我认为这个包试图成为一个开源的基础设施即代码工具，而不是一个开源框架。命名很难。

Kent then says: 肯特接着说：

> OpenNext exists because Next.js is difficult to deploy anywhere but Vercel. I appreciate the company’s incentives to make their own hosting offering as attractive as possible, but it’s evident that this incentive has deprioritized making Next.js easy to deploy anywhere.OpenNext 之所以存在，是因为 Next.js 很难部署在除 Vercel 之外的任何地方。我很欣赏该公司的激励措施，使他们自己的托管产品尽可能有吸引力，但很明显，这种激励措施已经降低了使 Next.js 易于在任何地方部署的优先级。

We’re always looking to improve self-hosting Next.js. For example, I made a [video](https://www.youtube.com/watch?v=Pd2tVxhFnO4) and [example](https://github.com/vercel/next.js/tree/canary/examples/with-docker) showing how to deploy with Docker to whichever service you prefer.我们一直在寻求改进自托管 Next.js。例如，我制作了一个视频和示例，展示了如何使用 Docker 部署到您喜欢的任何服务。

`next start` is how Walmart, TikTok, ChatGPT, Starbucks, Target, Doordash, and many others self-host Next.js.`next start` 是沃尔玛、TikTok、ChatGPT、星巴克、塔吉特、Doordash 和许多其他公司自行托管 Next.js 的方式。

Now you might be thinking: but Lee, that’s not what Kent is talking about. He’s talking about *serverless* platforms. Why wouldn’t Next.js build first-party adapters for every deployment target？现在你可能会想：但是李，这不是肯特在说的。他谈论的是无服务器平台。为什么 Next.js 不为每个部署目标构建第一方适配器？

### open-source-and-framework-boundariesOpen Source and Framework Boundaries 开源和框架边界

From my post earlier this year on [funding open source](https://leerob.io/blog/funding-open-source):从我今年早些时候关于资助开源的帖子中：

> Developers don’t want walled gardens. They want the freedom to eject and self-host. It’s about control. This is why all Next.js features work self-hosted. Vercel provides [infrastructure](https://vercel.com/enterprise) and a [workflow](https://vercel.com/workflow) on top of Next.js. You can [host Next.js elsewhere](https://nextjs.org/docs/deployment#self-hosting), if you want.开发商不想要围墙花园。他们想要弹出和自我托管的自由。这是关于控制。这就是为什么所有 Next.js 功能都是自托管工作的原因。Vercel 在 Next.js 之上提供基础设施和工作流。如果需要，可以在其他地方托管 Next.js。
> 
> 
> I’m a fan of the model Next.js uses. It’s clear how it’s funded (through Vercel) and the incentive is aligned (I want to deploy Next.js at some point, maybe I will [try Vercel](https://vercel.com/templates/next.js)). It’s a similar story for Svelte. You want to deploy SvelteKit, maybe you’ll [try Vercel](https://vercel.com/templates/svelte).我是 Next.js 使用的模型的粉丝。很明显它是如何资助的（通过 Vercel），激励是一致的（我想在某个时候部署 Next.js，也许我会尝试 Vercel）。对于 Svelte 来说，这是一个类似的故事。你想部署 SvelteKit，也许你会尝试 Vercel。

Vercel, the maintainers of Next.js who invest heavily in its [research and development](https://twitter.com/dan_abramov/status/1654688751342301184), are focused on maintaining and building a default deployment output for Next.js. We aren’t doing adapters, although I love this for other frameworks.Vercel 是 Next.js 的维护者，他们在研发方面投入了大量资金，专注于维护和构建 Next.js 的默认部署输出。我们不是在做适配器，尽管我喜欢其他框架。

Next.js has over 850,000 monthly active developers. And those developers expect things to work well, to have bugs fixed quickly, for new features to be released, for us to respond to their questions in a timely manner, and more.Next.js 每月有超过 850,000 名活跃开发人员。这些开发人员希望事情运行良好，快速修复错误，发布新功能，我们及时回答他们的问题，等等。

I keep hearing how hosting Next.js yourself as a nodejs application is a huge pain, and I have no idea where this is coming from. What’s difficult? Containerizing it? Creating a deploy pipeline? If you said yes to either, then you likely have trouble hosting *any* app yourself.我一直听说将 Next.js 自己作为 nodejs 应用程序托管是一个巨大的痛苦，我不知道这是从哪里来的。有什么难的？容器化？正在创建部署管道？如果您对其中任何一个都说“是”，那么您可能自己无法托管*任何*应用程序。

I get asked about this a lot (especially since the launch of Epic Web), so I’ve written it down. Here’s why I won’t use Next.js: epicweb.dev/why-i-wont-use…我经常被问到这个问题（尤其是自从 Epic Web 推出以来），所以我把它写下来了。这就是为什么我不会使用 Next.js：epicweb.dev/why-i-wont-use…

We want the default build output of Next.js to work well when self hosting, and also well on Vercel. And guess what? They’re the same output. Well, almost. Let me clarify.我们希望 Next.js 的默认构建输出在自托管时运行良好，并且在 Vercel 上也能运行良好。你猜怎么着？它们是相同的输出。嗯，差不多。让我澄清一下。

It took us a while at Vercel to figure out the correct format and boundary between open source framework and infrastructure platform. Our philosophy is called [framework defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure). And critically, the specification that Vercel uses for frameworks is open source. It’s called the [Build Output API](https://vercel.com/docs/build-output-api/v3).在 Vercel，我们花了一段时间才弄清楚开源框架和基础设施平台之间的正确格式和边界。我们的理念是框架定义的基础设施。至关重要的是，Vercel 用于框架的规范是开源的。它称为生成输出 API。

This output format powers Next.js, as well as Remix, SvelteKit, and many other frameworks on Vercel. We actually maintain our own Remix adapter too, which transforms the Remix output into this format, plus [some other features](https://vercel.com/blog/vercel-remix-integration-with-edge-functions-support).这种输出格式支持 Next.js，以及 Remix、SvelteKit 和 Vercel 上的许多其他框架。我们实际上也维护了自己的 Remix 适配器，它将 Remix 输出转换为这种格式，以及一些其他功能。

We’ll soon be making the default output of Next.js match the Build Output API directly, without the intermediate step. We agree with the importance of keeping these pieces open and accessible, which is why we even open sourced the intermediate step.我们很快就会使 Next.js 的默认输出直接与生成输出 API 匹配，而无需中间步骤。我们同意保持这些部分开放和可访问的重要性，这就是为什么我们甚至开源了中间步骤。

### pricing-correlation-or-causationPricing: Correlation or causation？定价：相关性还是因果关系？

Kent mentions: Kent 提到：

> We can argue about whether Vercel is right or wrong about their current approach. But the fact remains that if Vercel’s pricing or other things become a problem for you, getting off of Vercel will also be a problem. It comes back down to the incentives.我们可以争论 Vercel 对他们目前的做法是对还是错。但事实仍然是，如果 Vercel 的定价或其他事情对您来说成为问题，那么下车 Vercel 也将是一个问题。这又回到了激励措施。

There are improvements I’d like to make to Vercel’s pricing. And we’ll have some updates soon! Some pricing changes have already rolled out, like [lower prices](https://vercel.com/changelog/vercel-postgres-is-now-available-for-pro-users) for our storage products and [spend controls](https://vercel.com/blog/introducing-spend-management-realtime-usage-alerts-sms-notifications). But I understand the sentiment.我想对 Vercel 的定价进行一些改进。我们很快就会有一些更新！一些定价变化已经推出，例如我们的存储产品价格降低和支出控制。但我理解这种情绪。

Unfortunately, this sentiment does not equal causation.不幸的是，这种情绪并不等于因果关系。

[Replying to @](https://twitter.com/dev_bogdan/status/1649132186472263680)

[dev_bogdan 回复@dev_bogdan](https://twitter.com/dev_bogdan/status/1649132186472263680)

Only exposing a full route refresh seems like a ploy on Vercel’s part to needlessly re-render SC’s --> Increased compute --> 
$ :) 实际上，我对 NextJS 有点担心。NextJS 技术方法在部署在那里时可能会优化其利润。

[Replying to @](https://twitter.com/matt_kruse/status/1649141645844049939)

[matt_kruse 回复@matt_kruse](https://twitter.com/matt_kruse/status/1649141645844049939)

it’s the other way around. Next has rewritten their entire framework under the technical direction and vision from the React team. including changing some APIs to something less Next-specific. we care a lot about this kind of stuff and getting it right.反之亦然。Next 在 React 团队的技术指导和愿景下重写了他们的整个框架。包括将某些 API 更改为不太特定于 Next 的 API。我们非常关心这种东西，并把它做好。

[Replying to @](https://twitter.com/dan_abramov/status/1649214795571134465)

[dan_abramov 回复@dan_abramov](https://twitter.com/dan_abramov/status/1649214795571134465)

while Vercel obviously has incentives to take best advantage of React’s abilities and architectural model, the idea of designing a worse API so that Vercel could make a profit sounds both repulsive and shortsighted. i can vouch for everyone involved in App Router design.虽然 Vercel 显然有动力充分利用 React 的能力和架构模型，但设计一个更糟糕的 API 以便 Vercel 能够获利的想法听起来既令人反感又短视。我可以为参与 App Router 设计的每个人担保。

If you want to self-host, all Next.js features will work. So, why would someone choose [Vercel for Next.js](https://vercel.com/docs/frameworks/nextjs), then? The same reason they’d choose it for Astro, SvelteKit, or even Remix.如果要自托管，所有 Next.js 功能都可以使用。那么，为什么有人会选择 Vercel 作为 Next.js 呢？他们为 Astro、SvelteKit 甚至 Remix 选择它的原因相同。

If you don’t want to worry about infrastructure, Vercel takes care of that for you (plus some other stuff, but that’s besides the point). And thanks to [framework defined infra](https://vercel.com/blog/framework-defined-infrastructure), you’re not writing a bunch of CDK code or bespoke infra-as-code solutions. You’re writing Next.js code that’s open and portable to any server, on any platform.如果您不想担心基础设施，Vercel 会为您处理（以及其他一些事情，但这不是重点）。多亏了框架定义的基础设施，您不必编写一堆 CDK 代码或定制的基础设施即代码解决方案。您正在编写 Next.js 代码，这些代码可以开放并移植到任何平台上的任何服务器。

Next.js is like Kubernetes, and Vercel is like [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine).Next.js 就像 Kubernetes，Vercel 就像 Google Kubernetes Engine。

## relationship-with-reactRelationship with React 与 React 的关系

Kent mentions: Kent 提到：

> I know for myself, it seems like Vercel is trying to blur the lines between what is Next.js and what is React. There is a lot of confusion for people on what is React and what is Next.js, especially with regard to the server components and server actions features.我自己知道，Vercel 似乎试图模糊 Next.js 和 React 之间的界限。对于什么是 React 和什么是 Next.js，人们有很多困惑，特别是在服务器组件和服务器操作功能方面。

Definitely not intentional.绝对不是故意的。

Next.js is placing a [large bet](https://twitter.com/dan_abramov/status/1650923730233700354) on the future of React. The App Router builds on many features the React team has been working on for years. Building and supporting a framework requires a non-trivial amount of work. [Redwood is doing the same](https://tom.preston-werner.com/2023/05/30/redwoods-next-epoch-all-in-on-rsc).Next.js 对 React 的未来下了很大的赌注。App Router 建立在 React 团队多年来致力于的许多功能之上。构建和支持框架需要大量的工作。红木也在做同样的事情。

In retrospect, we could have worked more closely with the Meta team on making some docs changes directly to the React docs versus the Next.js docs. Thankfully, this has picked up a lot and we are actively collaborating with the team at Meta. Shoutout to Meta’s Learning & Advocacy team.回想起来，我们本可以与 Meta 团队更紧密地合作，直接对 React 文档进行一些文档更改，而不是 Next.js 文档。值得庆幸的是，这已经回升了很多，我们正在与 Meta 的团队合作。向 Meta 的学习与宣传团队致敬。

APIs that Next.js uses, like [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus), are now documented in the React docs. Even experimental React APIs like [tainting](https://react.dev/reference/react/experimental_taintUniqueValue) are now documented. They’re publishing a *lot* of great docs on their [new site](https://react.dev/learn) (which they worked on for many years).Next.js 使用的 API，如 `useFormStatus` ，现在记录在 React 文档中。甚至实验性的 React API，如污染，现在也被记录在案。他们在他们的新网站上发布了许多很棒的文档（他们工作了很多年）。

We’ll keep improving here and making the boundaries more clear.我们将在这里不断改进，使界限更加清晰。

## stabilityStability 稳定性

Kent mentions some concerns about the stability of Next.js, specifically:Kent 提到了一些关于 Next.js 稳定性的担忧，特别是：

> So Next.js is building into itself a canary feature, calling it stable, and then sending it off to all your users effectively turning your app into the sentinel species.因此，Next.js 正在构建一个金丝雀功能，称其为稳定版，然后将其发送给所有用户，从而有效地将您的应用程序转变为哨兵物种。

He’s referring to the [React canary channel](https://react.dev/blog/2023/05/03/react-canaries), which the Next.js App Router (not Pages) builds on. From the React post:他指的是 React Canary 通道，Next.js App Router（不是 Pages）基于该通道构建。来自 React 帖子：

> We’d like to offer the React community an option to adopt individual new features as soon as their design is close to final, before they’re released in a stable version—similar to how Meta has long used bleeding-edge versions of React internally. We are introducing a new officially supported [Canary release channel](https://react.dev/community/versioning-policy#canary-channel). It lets curated setups like frameworks decouple adoption of individual React features from the React release schedule.我们希望为 React 社区提供一个选项，即在设计接近最终阶段时采用单独的新功能，然后再以稳定版本发布——类似于 Meta 长期以来在内部使用 React 的前沿版本的方式。我们正在引入一个新的官方支持的 Canary 发布频道。它允许像框架这样的精心策划的设置将单个 React 功能的采用与 React 发布计划分离。

The canary channel is stable for frameworks to adopt. Then, the framework itself should use semver. This might be another correlation ≠ causation moment, because there *is* some community pain here.金丝雀通道对于框架来说是稳定的。然后，框架本身应该使用 semver。这可能是因果时刻≠另一种相关性，因为这里有一些社区痛苦。

The App Router rollout has had bumps. Some bugs, things that didn’t work, and places where the performance could be better.App Router 的推出遇到了一些坎坷。一些错误，不起作用的东西，以及性能可以更好的地方。

This is on me. Not React. And our messaging to the community could have been better. There’s a lot more I wanted to say about this, which is what we shared in the [2023 Next.js Conf Keynote](https://youtu.be/8q2q_820Sx4?t=1385).这是在我身上。不做出反应。我们向社区传达的信息本来可以更好。关于这一点，我想说的还有很多，这就是我们在 2023 年 Next.js Conf 主题演讲中分享的内容。

In short, performance and reliability are still a major focus for Next.js. Kent goes on to mention:简而言之，性能和可靠性仍然是 Next.js 的主要关注点。Kent 接着提到：

> Yes, React Server Components are very cool and I look forward to being able to use them when they’re production ready 是的，React 服务器组件非常酷，我期待能够在它们准备好生产时使用它们

React Server Components are ready. There’s now [thousands of the top sites on the web](https://twitter.com/leeerob/status/1700202503034515779) using Server Components in production. The experience getting there could have been better, but they’re in production.React 服务器组件已准备就绪。现在，网络上有数以千计的顶级站点在生产中使用服务器组件。到达那里的体验本来可以更好，但它们正在生产中。

## is-nextjs-too-magicalIs Next.js Too Magical?Next.js 太神奇了吗？

Kent talks about how he’s not a fan of Next.js extending the web `fetch` API.Kent 谈到他不喜欢 Next.js 扩展 Web `fetch` API。

I agree with part of this, specifically on adding Next.js specific extensions to the `fetch` API. We’re looking to move away from this direction based on community feedback.我同意其中的一部分，特别是向 `fetch` API 添加 Next.js 特定的扩展。我们希望根据社区的反馈来摆脱这个方向。

In Next.js 14, for example, if you want to opt-out of caching, you would use [`noStore()`](https://nextjs.org/docs/app/api-reference/functions/unstable_noStore) versus `cache: 'no-store'` on the `fetch`. And if you want to use more programatic caching and revalidating features, those will soon be standalone APIs as well.例如，在 Next.js 14 中，如果要选择退出缓存，则可以在 `noStore()` `fetch` . `cache: 'no-store'` 如果您想使用更多的编程缓存和重新验证功能，这些功能也将很快成为独立的 API。

## complexity--stabilityComplexity & Stability 复杂性和稳定性

Kent mentions: Kent 提到：

> I keep hearing from people they’re finding Next.js is getting overly complex.我不断听到人们发现 Next.js 变得过于复杂。

The App Router is a very different model from the Pages Router. It’s almost like a new framework. This was one of the many reasons why we needed to ensure you could [incrementally adopt](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration) this new router, and that the existing router and foundation would be stable and maintained for many releases in the future.应用程序路由器与页面路由器的模型截然不同。这几乎就像一个新框架。这是我们需要确保您可以逐步采用这种新路由器的众多原因之一，并且现有的路由器和基础将在未来的许多版本中保持稳定和维护。

It’s also why we just created a [new free course](https://nextjs.org/learn) to teach the model.这也是为什么我们刚刚创建了一门新的免费课程来教授该模型的原因。

Kent then goes on to mention:肯特接着提到：

> Next.js is on version 13. React Router (built by the same team as Remix) has been around for ***much longer*** and is only version 6. Remix was on version 1 for almost two years and only a month ago hit version 2.Next.js 版本为 13。React Router（由与 Remix 相同的团队构建）已经存在了更长的时间，并且只是第 6 版。Remix 在第 1 版上已经使用了将近两年，仅在一个月前才发布了第 2 版。

I don’t think the number of major versions correlates to whether a framework is stable or not, especially when we’ve tried to take great care in publishing [codemods](https://nextjs.org/docs/app/building-your-application/upgrading/codemods) and [upgrade guides](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration) when moving between versions.我不认为主要版本的数量与框架是否稳定有关，尤其是当我们在版本之间移动时试图非常小心地发布代码模组和升级指南时。

We publish major versions when a Node.js version is no longer supported (i.e. when their security lifetime has expired). With [Next.js 14](https://nextjs.org/blog/next-14), for example, the Node.js version was bumped to `18.17`.当不再支持 Node.js 版本时（即，当其安全生存期已过期时），我们会发布主要版本。例如，在 Next.js 14 中，Node.js 版本被提升到 `18.17` .

We also care deeply about backwards compatibility. The core APIs from day one still work today.我们也非常关心向后兼容性。从第一天起的核心 API 今天仍然有效。

7 years ago today [vercel.com/blog/next](https://vercel.com/blog/next) A walk down memory lane 🧵 The pictured code still works without change…7 年前的今天 [vercel.com/blog/next](http://vercel.com/blog/next) 走在记忆的小路🧵上 图中的代码仍然可以正常工作，无需更改…

Kent shares: Kent 分享：

> Earlier this year, the Remix team shared their plans for getting version 2 features released as an opt-in part of version 1 using a strategy called“future flags”.今年早些时候，Remix 团队分享了他们的计划，即使用一种称为“未来标志”的策略将版本 2 功能作为版本 1 的选择加入部分发布。

I love this. We have a similar process in Next.js with experimental flags. We’ve also done future flags before in [previous releases](https://nextjs.org/blog/next-10-1#3x-faster-refresh). Their [future flags](https://remix.run/blog/future-flags) blog post mentioned is worth reading.我喜欢这个。我们在 Next.js 中有一个类似的过程，带有实验性标志。在以前的版本中，我们也做过未来的标志。他们提到的未来旗帜博客文章值得一读。

## remix-vs-nextjs-for-ecommerceRemix vs. Next.js for EcommerceRemix vs. Next.js 电子商务

Kent mentions an older blog post the Remix team wrote comparing with Next.js:Kent 提到了 Remix 团队写的一篇较旧的博客文章，与 Next.js 进行了比较：

> When the Remix team rewrote the Next.js ecommerce demo to answer the “**[Remix vs Next.js](https://remix.run/blog/remix-vs-next)**”question, it demonstrated really well that Remix resulted in a better user experience with much less code (which is an important input in user experience).当 Remix 团队重写 Next.js 电子商务演示以回答“Remix vs Next.js”问题时，它很好地证明了 Remix 以更少的代码带来了更好的用户体验（这是用户体验中的重要输入）。

I’m thankful for the Remix team pushing us to improve Next.js Commerce. The Pages Router version needed some work.我很感谢 Remix 团队推动我们改进 Next.js Commerce。Pages Router 版本需要一些工作。

I’d recommend [re-reading their original blog post](https://remix.run/blog/remix-vs-next) and then viewing the [codebase for Next.js Commerce](https://github.com/vercel/commerce) and [updated demo](https://demo.vercel.store/) so you can [make your own assessment](https://twitter.com/championswimmer/status/1683875753681911816). I wanted to include a link to the Remix demo, but it [appears to be down](https://remix-ecommerce.fly.dev/).我建议重新阅读他们的原始博客文章，然后查看 Next.js Commerce 的代码库和更新的演示，以便您可以进行自己的评估。我想包含一个指向 Remix 演示的链接，但它似乎已关闭。

> I think it’s worth making another comparison. Remix has also learned some new tricks since that article was written, like out-of-order streaming.我认为值得再做一次比较。自那篇文章撰写以来，Remix 还学到了一些新技巧，比如乱序流媒体。

The Next.js App Router [has out-of-order streaming as well](https://gal.hagever.com/posts/out-of-order-streaming-from-scratch), it’s fantastic. It’s worked [very well](https://twitter.com/rauchg/status/1687591561377525760) for [Next.js Commerce](https://demo.vercel.store/).Next.js 应用程序路由器也有无序流媒体，这太棒了。它对 Next.js Commerce 非常有效。

## conclusionConclusion 结论

Phew, that turned out to be a long one. As Kent mentions:呸，原来是很长的。正如 Kent 所提到的：

> I feel like both are highly capable frameworks 我觉得两者都是功能强大的框架

We agree. You can make great web experiences with both.我们同意。您可以使用两者获得出色的 Web 体验。

While I spent most of the post referencing points from Kent, I’d like to end with general reasons why I love using Next.js:虽然我在文章中的大部分时间都引用了肯特的观点，但我想以我喜欢使用 Next.js 的一般原因来结束：

* I never need to write separate backends for projects I want to create. I can build my entire project with Next.js.我永远不需要为我想创建的项目编写单独的后端。我可以用 Next.js 构建我的整个项目。

* I never have to worry about bundler, compiler, or frontend infrastructure. I get to focus on making great products through React components. And I’m able to use the latest React features, which I personally find to have a great developer experience.我从来不用担心打包器、编译器或前端基础设施。我开始专注于通过 React 组件制作出色的产品。而且我能够使用最新的 React 功能，我个人认为这些功能具有出色的开发人员体验。

* I am able to update to the latest versions of Next.js and things continue to improve. Performance gets faster and new features get added. The iteration velocity is high. If there are changes, codemods and upgrade guides are provided.我能够更新到最新版本的 Next.js，并且情况继续改善。性能更快，并添加了新功能。迭代速度高。如果有更改，则提供 codemod 和升级指南。

* Next.js provides a bunch of components that help me keep my site fast. [Images](https://nextjs.org/docs/app/building-your-application/optimizing/images), [fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts), [scripts](https://nextjs.org/docs/app/building-your-application/optimizing/scripts), and now even [properly loading third-parties](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries).Next.js 提供了一堆组件来帮助我保持网站快速。图像、字体、脚本，现在甚至可以正确加载第三方。

I was using Next.js before I joined Vercel, and will likely continue to after Vercel as well. I hope my work in the Next.js community can help push the web forward.在加入 Vercel 之前，我一直在使用 Next.js，在加入 Vercel 之后，我也可能会继续使用。我希望我在 Next.js 社区的工作可以帮助推动网络向前发展。

Hopefully this post helped share some insight into how Next.js has been evolving and where we see the framework heading in the future.希望这篇文章有助于分享一些关于 Next.js 如何发展以及我们看到框架未来的发展方向的见解。
