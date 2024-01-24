---
title: 'Components___Link____Next.js'
tags: ['剪藏']
created: 'Thu Nov 16 2023 11:30:32 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
type: 'text/vnd.tiddlywiki'
url: 'https://nextjs.org/docs/app/api-reference/components/link'
---

# Components___Link____Next.js

`<Link>` is a React component that extends the HTML `<a>` element to provide [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-prefetching) and client-side navigation between routes. It is the primary way to navigate between routes in Next.js.\
 `<Link>` 是一个 React 组件，它扩展了 HTML `<a>` 元素以提供路由之间的预取和客户端导航。这是在 Next.js 中的路由之间导航的主要方式。

```
import Link from 'next/link'
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

## Props 道具

Here's a summary of the props available for the Link Component:\
以下是可用于 Link 组件的道具的摘要：

| `href`     | `href="/dashboard"` | String or Object 字符串或对象 | Yes 是的 |
|------------|---------------------|-------------------------|--------|
| `replace`  | `replace={false}`   | Boolean 布尔              | -      |
| `scroll`   | `scroll={false}`    | Boolean 布尔              | -      |
| `prefetch` | `prefetch={false}`  | Boolean 布尔              | -      |

> **Good to know**: `<a>` tag attributes such as `className` or `target="_blank"` can be added to `<Link>` as props and will be passed to the underlying `<a>` element.\
> 需要知道： `<a>` 标签属性（如 `className` 或 `target="_blank"` ）可以 `<Link>` 作为 props 添加到中，并将传递给底层 `<a>` 元素。

### `href` (required)  `href` （必填）

The path or URL to navigate to.\
要导航到的路径或 URL。

```
<Link href="/dashboard">Dashboard</Link>
```

`href` can also accept an object, for example:\
 `href` 也可以接受对象，例如：

```
* Navigate to /about?name=test</span></span>
<Link
  href={{
    pathname: '/about',
    query: { name: 'test' },
  }}
>
  About
</Link></code></pre></div>
### `replace`

**Defaults to `false`.** When `true`, `next/link` will replace the current history state instead of adding a new URL into the [browser’s history](https://developer.mozilla.org/docs/Web/API/History_API) stack.\
缺省值为 `false` .When `true` 将 `next/link` 替换当前历史记录状态，而不是将新 URL 添加到浏览器的历史记录堆栈中。

```
import Link from 'next/link'
 
export default function Page() {
  return (
    <Link href="/dashboard" replace>
      Dashboard
    </Link>
  )
}
```

### `scroll`

**Defaults to `true`.** The default behavior of `<Link>` is to scroll to the top of a new route or to maintain the scroll position for backwards and forwards navigation. When `false`, `next/link` will *not* scroll to the top of the page after a navigation.\
缺省值为 `true` .的默认行为 `<Link>` 是滚动到新路由的顶部或保持滚动位置以进行前后导航。当 `false` 时， `next/link` 导航后不会滚动到页面顶部。

```
import Link from 'next/link'
 
export default function Page() {
  return (
    <Link href="/dashboard" scroll={false}>
      Dashboard
    </Link>
  )
}
```

### `prefetch`

**Defaults to `true`.** When `true`, `next/link` will prefetch the page (denoted by the `href`) in the background. This is useful for improving the performance of client-side navigations. Any `<Link />` in the viewport (initially or through scroll) will be preloaded.\
缺省值为 `true` .When `true` ， `next/link` 将在后台预取页面（用 表示 `href` ）。这对于提高客户端导航的性能非常有用。视口中的任何内容 `<Link />` （初始或通过滚动）都将被预加载。

Prefetch can be disabled by passing `prefetch={false}`. Prefetching is only enabled in production.\
可以通过传递 `prefetch={false}` 来禁用预取。预取仅在生产环境中启用。

```
import Link from 'next/link'
 
export default function Page() {
  return (
    <Link href="/dashboard" prefetch={false}>
      Dashboard
    </Link>
  )
}
```

## Examples 例子

### Linking to Dynamic Routes\
链接到动态路由

For dynamic routes, it can be handy to use template literals to create the link's path.\
对于动态路由，使用模板文字创建链接的路径会很方便。

For example, you can generate a list of links to the dynamic route `app/blog/[slug]/page.js`:\
例如，您可以生成指向动态路由 `app/blog/[slug]/page.js` 的链接列表：

```
import Link from 'next/link'
 
function Page({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/</span><span>blog</span><span>/</span><span>${</span><span>post</span><span>.slug</span><span>}</span><span>`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

### Middleware 中间件

It's common to use [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) for authentication or other purposes that involve rewriting the user to a different page. In order for the `<Link />` component to properly prefetch links with rewrites via Middleware, you need to tell Next.js both the URL to display and the URL to prefetch. This is required to avoid un-necessary fetches to middleware to know the correct route to prefetch.\
通常将中间件用于身份验证或其他目的，包括将用户重写到其他页面。为了使 `<Link />` 组件通过中间件通过重写正确地预取链接，您需要告诉 Next.js 要显示的 URL 和要预取的 URL。这是必需的，以避免对中间件进行不必要的提取，以了解预取的正确路由。

For example, if you want to serve a `/dashboard` route that has authenticated and visitor views, you may add something similar to the following in your Middleware to redirect the user to the correct page:\
例如，如果要提供具有经过身份验证的 `/dashboard` 视图和访客视图的路由，则可以在中间件中添加类似于以下内容的内容，以将用户重定向到正确的页面：

```
export function middleware(req) {
  const nextUrl = req.nextUrl
  if (nextUrl.pathname === '/dashboard') {
    if (req.cookies.authToken) {
      return NextResponse.rewrite(new URL('/auth/dashboard', req.url))
    } else {
      return NextResponse.rewrite(new URL('/public/dashboard', req.url))
    }
  }
}
```

In this case, you would want to use the following code in your `<Link />` component:\
在这种情况下，您需要在 `<Link />` 组件中使用以下代码：

```
import Link from 'next/link'
import useIsAuthed from './hooks/useIsAuthed'
 
export default function Page() {
  const isAuthed = useIsAuthed()
  const path = isAuthed ? '/auth/dashboard' : '/dashboard'
  return (
    <Link as="/dashboard" href={path}>
      Dashboard
    </Link>
  )
}
```

## Version History 版本历史

| `v13.0.0` | No longer requires a child `<a>` tag. A [codemod](https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components) is provided to automatically update your codebase.\
不再需要子 `<a>` 标记。提供了一个 codemod 来自动更新您的代码库。 |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `v10.0.0` | `href` props pointing to a dynamic route are automatically resolved and no longer require an `as` prop.\
 `href` 指向动态路由的道具会自动解析，不再需要 `as` 道具。                                                                                                               |
| `v8.0.0`  | Improved prefetching performance.\
改进了预取性能。                                                                                                                                                                                                                 |
| `v1.0.0`  | `next/link` introduced.  `next/link` 介绍。                                                                                                                                                                                                                    |

</div></div>*
```
