---
title: 'Data_Fetching__Fetching,_Caching,_and_Revalidating___Next.js'
tags: ['剪藏']
type: 'text/markdown'
created: 'Thu Nov 16 2023 06:35:14 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data'
---

# Data_Fetching__Fetching,_Caching,_and_Revalidating___Next.js

Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.数据获取是任何应用程序的核心部分。本页介绍了如何在 React 和 Next.js 中获取、缓存和重新验证数据。

There are four ways you can fetch data:有四种方法可以获取数据：

1. On the server, with `fetch` 在服务器上，使用 `fetch`

1. On the server, with third-party libraries 在服务器上，使用第三方库

1. On the client, via a Route Handler 在客户端上，通过路由处理程序

1. On the client, with third-party libraries.在客户端上，使用第三方库。

## Fetching Data on the Server with `fetch` 在 `fetch` 服务器上获取数据

Next.js extends the native [`fetch` Web API](https://developer.mozilla.org/docs/Web/API/Fetch_API) to allow you to configure the caching and revalidating behavior for each fetch request on the server. React extends `fetch` to automatically [memoize](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#fetching-data-where-its-needed) fetch requests while rendering a React component tree.Next.js 扩展了本机 `fetch` Web API，允许您为服务器上的每个提取请求配置缓存和重新验证行为。React 扩展 `fetch` 为在渲染 React 组件树时自动记忆获取请求。

You can use `fetch` with `async`/`await` in Server Components, in [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and in [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations).您可以在“服务器组件”、“路由处理程序”和“服务器操作”中与 `async` / `await` 一起使用 `fetch` 。

For example: 例如：

```
async function getData() {
  const res = await fetch('https://api.example.com/...')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return <main></main>
}
```

> **Good to know**: 您需要知道：
> 
> 
> * Next.js provides helpful functions you may need when fetching data in Server Components such as [`cookies`](https://nextjs.org/docs/app/api-reference/functions/cookies) and [`headers`](https://nextjs.org/docs/app/api-reference/functions/headers). These will cause the route to be dynamically rendered as they rely on request time information.Next.js 提供了在服务器组件中获取数据时可能需要的有用功能 `headers` ，例如 `cookies` 和 .这将导致路由动态呈现，因为它们依赖于请求时间信息。
> 
> * In Route handlers, `fetch` requests are not memoized as Route Handlers are not part of the React component tree.在路由处理程序中， `fetch` 请求不会被记忆，因为路由处理程序不是 React 组件树的一部分。
> 
> * To use `async`/`await` in a Server Component with TypeScript, you’ll need to use TypeScript `5.1.3` or higher and `@types/react` `18.2.8` or higher.要在带有 TypeScript 的服务器组件中使用 `async` / `await` ，您需要使用 TypeScript `5.1.3` 或更高版本。 `@types/react` `18.2.8`

### Caching Data 缓存数据

Caching stores data so it doesn’t need to be re-fetched from your data source on every request.缓存会存储数据，因此不需要在每次请求时从数据源重新提取数据。

By default, Next.js automatically caches the returned values of `fetch` in the [Data Cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache) on the server. This means that the data can be fetched at build time or request time, cached, and reused on each data request.默认情况下，Next.js 会自动将返回 `fetch` 的值缓存在服务器上的数据缓存中。这意味着可以在构建时或请求时获取数据，缓存数据，并在每个数据请求上重用。

```
// 'force-cache' is the default, and can be omitted
fetch('https://...', { cache: 'force-cache' })
```

`fetch` requests that use the `POST` method are also automatically cached. Unless it’s inside a [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) that uses the `POST` method, then it will not be cached.`fetch` 使用该 `POST` 方法的请求也会自动缓存。除非它位于使用该 `POST` 方法的路由处理程序中，否则它不会被缓存。

> **What is the Data Cache？什么是数据缓存？**
> 
> 
> The Data Cache is a persistent [HTTP cache](https://developer.mozilla.org/docs/Web/HTTP/Caching). Depending on your platform, the cache can scale automatically and be [shared across multiple regions](https://vercel.com/docs/infrastructure/data-cache).数据缓存是持久的 HTTP 缓存。根据您的平台，缓存可以自动扩展并在多个区域之间共享。
> 
> 
> Learn more about the [Data Cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache).了解有关数据缓存的更多信息。

### Revalidating Data 重新验证数据

Revalidation is the process of purging the Data Cache and re-fetching the latest data. This is useful when your data changes and you want to ensure you show the latest information.重新验证是清除数据缓存并重新获取最新数据的过程。当您的数据发生更改并且您希望确保显示最新信息时，这很有用。

Cached data can be revalidated in two ways:可以通过两种方式重新验证缓存的数据：

* **Time-based revalidation**: Automatically revalidate data after a certain amount of time has passed. This is useful for data that changes infrequently and freshness is not as critical.基于时间的重新验证：在经过一定时间后自动重新验证数据。这对于不经常更改且新鲜度不那么重要的数据很有用。

* **On-demand revalidation**: Manually revalidate data based on an event (e.g. form submission). On-demand revalidation can use a tag-based or path-based approach to revalidate groups of data at once. This is useful when you want to ensure the latest data is shown as soon as possible (e.g. when content from your headless CMS is updated).按需重新验证：根据事件（例如表单提交）手动重新验证数据。按需重新验证可以使用基于标记或基于路径的方法一次重新验证数据组。当您希望确保尽快显示最新数据时（例如，当更新无头 CMS 中的内容时），这很有用。

#### Time-based Revalidation 基于时间的重新验证

To revalidate data at a timed interval, you can use the `next.revalidate` option of `fetch` to set the cache lifetime of a resource (in seconds).若要按时间间隔重新验证数据，可以使用 `next.revalidate` 选项 `fetch` 来设置资源的缓存生存期（以秒为单位）。

```
fetch('https://...', { next: { revalidate: 3600 } })
```

Alternatively, to revalidate all `fetch` requests in a route segment, you can use the [Segment Config Options](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config).或者，要重新验证路由分段中的所有 `fetch` 请求，您可以使用分段配置选项。

```
export const revalidate = 3600 // revalidate at most every hour
```

If you have multiple fetch requests in a statically rendered route, and each has a different revalidation frequency. The lowest time will be used for all requests. For dynamically rendered routes, each `fetch` request will be revalidated independently.如果静态呈现的路由中有多个提取请求，并且每个请求都有不同的重新验证频率。最短时间将用于所有请求。对于动态呈现的路由，每个 `fetch` 请求都将独立重新验证。

Learn more about [time-based revalidation](https://nextjs.org/docs/app/building-your-application/caching#time-based-revalidation).详细了解基于时间的重新验证。

#### On-demand Revalidation 按需重新验证

Data can be revalidated on-demand by path ([`revalidatePath`](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)) or by cache tag ([`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)) inside a [Server Action](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations) or [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).可以通过服务器操作或路由处理程序中的路径（ ）或缓存标记（ `revalidatePath` `revalidateTag` ）按需重新验证数据。

Next.js has a cache tagging system for invalidating `fetch` requests across routes.Next.js 有一个缓存标记系统，用于使 `fetch` 跨路由的请求无效。

1. When using `fetch`, you have the option to tag cache entries with one or more tags.使用 时，您可以选择使用 `fetch` 一个或多个标记来标记缓存条目。

1. Then, you can call `revalidateTag` to revalidate all entries associated with that tag.然后，您可以调用 `revalidateTag` 以重新验证与该标记关联的所有条目。

For example, the following `fetch` request adds the cache tag `collection`:例如，以下 `fetch` 请求添加缓存标记 `collection` ：

```
export default async function Page() {
  const res = await fetch('https://...', { next: { tags: ['collection'] } })
  const data = await res.json()
  // ...
}
```

You can then revalidate this `fetch` call tagged with `collection` by calling `revalidateTag` in a Server Action:然后，可以通过调用 `revalidateTag` 服务器操作来重新验证此 `fetch` 调用 `collection` ：

```
'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function action() {
  revalidateTag('collection')
}
```

Learn more about [on-demand revalidation](https://nextjs.org/docs/app/building-your-application/caching#on-demand-revalidation).详细了解按需重新验证。

#### Error handling and revalidation 错误处理和重新验证

If an error is thrown while attempting to revalidate data, the last successfully generated data will continue to be served from the cache. On the next subsequent request, Next.js will retry revalidating the data.如果在尝试重新验证数据时引发错误，则将继续从缓存中提供上次成功生成的数据。在下一个后续请求中，Next.js 将重试重新验证数据。

### Opting out of Data Caching 选择退出数据缓存

`fetch` requests are **not** cached if:`fetch` 如果出现以下情况，则不会缓存请求：

* The `cache: 'no-store'` is added to `fetch` requests.被 `cache: 'no-store'` 添加到请求中 `fetch` 。

* The `revalidate: 0` option is added to individual `fetch` requests.该 `revalidate: 0` 选项将添加到单个 `fetch` 请求中。

* The `fetch` request is inside a Router Handler that uses the `POST` method.请求 `fetch` 位于使用该 `POST` 方法的路由器处理程序中。

* The `fetch` request comes after the usage of `headers` or `cookies`.该 `fetch` 请求在使用 `headers` 或 `cookies` 之后出现。

* The `const dynamic = 'force-dynamic'` route segment option is used.使用 `const dynamic = 'force-dynamic'` 路由段选项。

* The `fetchCache` route segment option is configured to skip cache by default.默认情况下， `fetchCache` 路由段选项配置为跳过缓存。

* The `fetch` request uses `Authorization` or `Cookie` headers and there’s an uncached request above it in the component tree.该 `fetch` 请求使用 `Authorization` 或 `Cookie` 标头，并且在组件树中其上方有一个未缓存的请求。

#### Individual `fetch` Requests 个人 `fetch` 请求

To opt out of caching for individual `fetch` requests, you can set the `cache` option in `fetch` to `'no-store'`. This will fetch data dynamically, on every request.要选择不对单个 `fetch` 请求进行缓存，可以将选项 `cache` `fetch` 设置为 `'no-store'` 。这将在每个请求上动态获取数据。

```
fetch('https://...', { cache: 'no-store' })
```

View all the available `cache` options in the [`fetch` API reference](https://nextjs.org/docs/app/api-reference/functions/fetch).查看 `fetch` API 参考中的所有可用 `cache` 选项。

#### Multiple `fetch` Requests 多个 `fetch` 请求

If you have multiple `fetch` requests in a route segment (e.g. a Layout or Page), you can configure the caching behavior of all data requests in the segment using the [Segment Config Options](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config).如果路由段（例如布局或页面）中有多个 `fetch` 请求，则可以使用段配置选项配置该段中所有数据请求的缓存行为。

However, we recommend configuring the caching behavior of each `fetch` request individually. This gives you more granular control over the caching behavior.但是，我们建议单独配置每个 `fetch` 请求的缓存行为。这使您可以更精细地控制缓存行为。

## Fetching data on the Server with third-party libraries 使用第三方库在服务器上获取数据

In cases where you’re using a third-party library that doesn’t support or expose `fetch` (for example, a database, CMS, or ORM client), you can configure the caching and revalidating behavior of those requests using the [Route Segment Config Option](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) and React’s `cache` function.如果您使用的是不支持或公开 `fetch` 的第三方库（例如，数据库、CMS 或 ORM 客户端），您可以使用路由段配置选项和 React `cache` 的函数来配置这些请求的缓存和重新验证行为。

Whether the data is cached or not will depend on whether the route segment is [statically or dynamically rendered](https://nextjs.org/docs/app/building-your-application/rendering/server-components#server-rendering-strategies). If the segment is static (default), the output of the request will be cached and revalidated as part of the route segment. If the segment is dynamic, the output of the request will *not* be cached and will be re-fetched on every request when the segment is rendered.是否缓存数据将取决于路由段是静态呈现还是动态呈现。如果分段是静态的（默认），则请求的输出将作为路由分段的一部分进行缓存和重新验证。如果段是动态的，则不会缓存请求的输出，而是在呈现段时在每个请求上重新提取。

You can also use the experimental [`unstable_cache` API](https://nextjs.org/docs/app/api-reference/functions/unstable_cache).您还可以使用实验性 `unstable_cache` API。

### Example 例

In the example below:在下面的示例中：

* The `revalidate` option is set to `3600`, meaning the data will be cached and revalidated at most every hour.该 `revalidate` 选项设置为 `3600` ，表示最多每小时缓存和重新验证一次数据。

* The React `cache` function is used to [memoize](https://nextjs.org/docs/app/building-your-application/caching#request-memoization) data requests.React `cache` 函数用于记忆数据请求。

```
import { cache } from 'react'
 
export const revalidate = 3600 // revalidate the data at most every hour
 
export const getItem = cache(async (id: string) => {
  const item = await db.item.findUnique({ id })
  return item
})
```

Although the `getItem` function is called twice, only one query will be made to the database.尽管该 `getItem` 函数被调用了两次，但只会对数据库进行一次查询。

```
import { getItem } from '@/utils/get-item'
 
export default async function Layout({
  params: { id },
}: {
  params: { id: string }
}) {
  const item = await getItem(id)
  // ...
}
```

```
import { getItem } from '@/utils/get-item'
 
export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const item = await getItem(id)
  // ...
}
```

## Fetching Data on the Client with Route Handlers 使用路由处理程序在客户端上获取数据

If you need to fetch data in a client component, you can call a [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) from the client. Route Handlers execute on the server and return the data to the client. This is useful when you don’t want to expose sensitive information to the client, such as API tokens.如果需要在客户端组件中获取数据，可以从客户端调用路由处理程序。路由处理程序在服务器上执行，并将数据返回给客户端。当您不想向客户端公开敏感信息（如 API 令牌）时，这很有用。

See the [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) documentation for examples.有关示例，请参阅路由处理程序文档。

> **Server Components and Route Handlers 服务器组件和路由处理程序**
> 
> 
> Since Server Components render on the server, you don’t need to call a Route Handler from a Server Component to fetch data. Instead, you can fetch the data directly inside the Server Component.由于服务器组件在服务器上呈现，因此无需从服务器组件调用路由处理程序来获取数据。相反，您可以直接在服务器组件中获取数据。

## Fetching Data on the Client with third-party libraries 使用第三方库在客户端上获取数据

You can also fetch data on the client using a third-party library such as [SWR](https://swr.vercel.app/) or [React Query](https://tanstack.com/query/latest). These libraries provide their own APIs for memoizing requests, caching, revalidating, and mutating data.您还可以使用第三方库（如 SWR 或 React Query）在客户端上获取数据。这些库提供了自己的 API，用于记忆请求、缓存、重新验证和更改数据。

> **Future APIs**: 未来的 API：
> 
> 
> `use` is a React function that **accepts and handles a promise** returned by a function. Wrapping `fetch` in `use` is currently **not** recommended in Client Components and may trigger multiple re-renders. Learn more about `use` in the [React docs](https://react.dev/reference/react/use).`use` 是一个 React 函数，它接受并处理函数返回的 promise。目前不建议在客户端组件中进行换行 `fetch` `use` ，这可能会触发多次重新呈现。 `use` 在 React 文档中了解更多信息。
