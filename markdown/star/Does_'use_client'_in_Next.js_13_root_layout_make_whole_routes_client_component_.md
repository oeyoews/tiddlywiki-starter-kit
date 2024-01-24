---
title: 'Does_'use_client'_in_Next.js_13_root_layout_make_whole_routes_client_component_'
tags: ['剪藏']
type: 'text/markdown'
created: 'Sun Nov 26 2023 05:47:29 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://stackoverflow.com/questions/74992326/does-use-client-in-next-js-13-root-layout-make-whole-routes-client-component'
---

# Does_'use_client'_in_Next.js_13_root_layout_make_whole_routes_client_component_

I was trying Nextjs 13 with Next-auth and Apollo Client. For that we wrap the root layout with the providers but we also need `'use client'` to be specified. I have no problem with the libraries.我正在尝试使用 Next-auth 和 Apollo 客户端的 Nextjs 13。为此，我们用提供程序包装根布局，但我们也需要 `'use client'` 指定。我对图书馆没有问题。

**But what is confusing to me is that nextjs 13 app dir uses a server-first approach by default, and if I treat the root layout as a client, does it make all the pages client? Because, afak, the root layout is the parent of whole routes 但让我感到困惑的是，nextjs 13 应用程序目录默认使用服务器优先的方法，如果我将根布局视为客户端，它会使所有页面都成为客户端吗？因为，afak，根布局是整个路由的父级**

[Github discussion Github 讨论](https://github.com/vercel/next.js/discussions/44648)

[![](https://i.stack.imgur.com/zQvN3.jpg?s=64&g=1)](https://stackoverflow.com/users/10262805/yilmaz)

[Yilmaz 伊尔马兹](https://stackoverflow.com/users/10262805/yilmaz)

38.2k 38,2K1414 gold badges165 silver badges216 bronze badges

asked Jan 3 at 10:49 在 1 月 3 日 10:49 提问

[![](https://i.stack.imgur.com/MTZm1.jpg?s=64&g=1)](https://stackoverflow.com/users/16945230/a-anvarbekov)

1

[from here](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) (thanks to Paul Serre for commenting) 从这里开始（感谢 Paul Serre 的评论）

> The root layout is a Server Component by default and can not be set to a Client Component.默认情况下，根布局是服务器组件，不能设置为客户端组件。

in app directory, server components can render client components but client components cannot render server components. [Because](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)在 App Directory 中，服务器组件可以渲染客户端组件，但客户端组件不能渲染服务器组件。因为

> Since Client Components are rendered after Server Components, you cannot import a Server Component into a Client Component module (since it would require a new request back to the server). Instead, you can pass a Server Component as props to a Client Component.由于客户端组件是在服务器组件之后呈现的，因此无法将服务器组件导入到客户端组件模块中（因为它需要向服务器发出新的请求）。相反，您可以将服务器组件作为 props 传递给客户端组件。

the only exception is if the client component renders component which is passed as children. this is a Layout. From the same docs:唯一的例外是客户端组件呈现作为子组件传递的组件。这是一个布局。来自相同的文档：

> Layouts are Server Components by default but can be set to a Client Component.默认情况下，布局是服务器组件，但可以设置为客户端组件。

```
"use client";

export default function Layout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">        
      <head />
      <body>{children}</body>
    </html>
  )
}
```

Since the root layout component is rendering `children`, any component inside `children` tree can be server component 由于根布局组件是渲染 `children` 的，树内 `children` 的任何组件都可以是服务器组件

this would not be accepted 这是不可接受的

```
"use client";

export default function Layout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">        
      <head />
      <body> 
         // if you manually pass server component inside client component
         <AnyServerRenderedComponent/>
      </body>
    </html>
  )
}
```

answered Feb 17 at 6:17 回答 Feb 17 at 6:17

[![](https://i.stack.imgur.com/zQvN3.jpg?s=64&g=1)](https://stackoverflow.com/users/10262805/yilmaz)

[Yilmaz 伊尔马兹](https://stackoverflow.com/users/10262805/yilmaz)Yilmaz

38.2k 38,2K1414 gold badges165 silver badges216 bronze badges

12

[EDIT] [编辑]

Even with the solution below, I couldn’t make it work because of CSS-in-JS libraries, MUI and emotion in my case. You can check if yours is supported on this link:即使使用下面的解决方案，我也无法让它工作，因为 CSS-in-JS 库、MUI 和情感在我的情况下。您可以在此链接上检查您的是否受支持：

<https://nextjs.org/docs/app/building-your-application/styling/css-in-js>

For me, Vercel rushed with its use of server components. They released NextJS 13 claiming it was stable, but if it’s incompatible with a large portion of UI frameworks, it’s completely useless. Especially if it’s a front-end framework… This habit that engineers have of always wanting to use the latest technologies is exhausting.对我来说，Vercel 匆匆忙忙地使用服务器组件。他们发布了 NextJS 13，声称它是稳定的，但如果它与大部分 UI 框架不兼容，它就完全没用了。特别是如果它是一个前端框架…工程师们总是想使用最新技术的这种习惯令人筋疲力尽。

---

As the doc said, here: <https://nextjs.org/docs/getting-started/react-essentials> you can’t put ‘use client’ directive on the RootLayout, but you can create a Client component with children props and use it in your RootLayout 正如文档所说，这里：<https://nextjs.org/docs/getting-started/react-essentials> 你不能在 RootLayout 上放置 ‘use client’ 指令，但你可以创建一个带有子属性的 Client 组件并在 RootLayout 中使用它

```
'use client'
 
import { ThemeProvider } from 'acme-theme'
import { AuthProvider } from 'acme-auth'
 
export function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
```

And then: 然后：

```
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

answered Jun 22 at 15:52 回答 Jun 22 at 15:52

[![](https://www.gravatar.com/avatar/0909513b3ac956dd59d110f68778477b?s=64&d=identicon&r=PG&f=y&so-version=2)](https://stackoverflow.com/users/14608747/paul-serre)

2

## Not the answer you’re looking for? Browse other questions taggedor [ask your own question](https://stackoverflow.com/questions/ask).不是你要找的答案？浏览标记为 javascript，reactjs，next.js，服务器端渲染，next.js13 的其他问题，或提出自己的问题。
