---
title: 'Learn_Next.js__Adding_Search_and_Pagination___Next.js'
tags: ['剪藏']
type: 'text/markdown'
created: 'Thu Dec 07 2023 07:04:13 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://nextjs.org/learn/dashboard-app/adding-search-and-pagination'
---

# Learn_Next.js__Adding_Search_and_Pagination___Next.js

In the previous chapter, you improved your dashboard’s initial loading performance with streaming. Now let’s move on to the `/invoices` page, and learn how to add search and pagination![🔄  ❓]()

In this chapter… 在本章中…

Here are the topics we’ll cover 以下是我们将涵盖的主题

Learn how to use the Next.js APIs: `searchParams`, `usePathname`, and `useRouter`.[🔄  ❓]()

Implement search and pagination using URL search params.[🔄  ❓]()

## Starting code[🔄  ❓]()

Inside your `/dashboard/invoices/page.tsx` file, paste the following code:在 `/dashboard/invoices/page.tsx` 文件中，粘贴以下代码：

```
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
 
export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
```

Spend some time familiarizing yourself with the page and the components you’ll be working with:花一些时间熟悉页面和您将使用的组件：

1. `<Search/>` allows users to search for specific invoices.`<Search/>` 允许用户搜索特定发票。

1. `<Pagination/>` allows users to navigate between pages of invoices.`<Pagination/>` 允许用户在发票页面之间导航。

1. `<Table/>` displays the invoices.`<Table/>` 显示发票。

Your search functionality will span the client and the server. When a user searches for an invoice on the client, the URL params will be updated, data will be fetched on the server, and the table will re-render on the server with the new data.搜索功能将跨越客户端和服务器。当用户在客户端上搜索发票时，URL 参数将更新，数据将在服务器上获取，并且表将使用新数据在服务器上重新呈现。

## Why use URL search params？为什么要使用 URL 搜索参数？

As mentioned above, you’ll be using URL search params to manage the search state. This pattern may be new if you’re used to doing it with client side state.如上所述，您将使用 URL 搜索参数来管理搜索状态。如果您习惯于使用客户端状态，则此模式可能是新的。

There are a couple of benefits of implementing search with URL params:使用 URL 参数实现搜索有几个好处：

* **Bookmarkable and Shareable URLs**: Since the search parameters are in the URL, users can bookmark the current state of the application, including their search queries and filters, for future reference or sharing.可添加书签和可共享的 URL：由于搜索参数位于 URL 中，因此用户可以为应用程序的当前状态添加书签，包括其搜索查询和过滤器，以供将来参考或共享。

* **Server-Side Rendering and Initial Load**: URL parameters can be directly consumed on the server to render the initial state, making it easier to handle server rendering.服务端渲染和初始加载：可以直接在服务器上使用 URL 参数来渲染初始状态，使处理服务器渲染更加容易。

* **Analytics and Tracking**: Having search queries and filters directly in the URL makes it easier to track user behavior without requiring additional client-side logic.分析和跟踪：直接在 URL 中使用搜索查询和过滤器可以更轻松地跟踪用户行为，而无需额外的客户端逻辑。

## Adding the search functionality 添加搜索功能

These are the Next.js client hooks that you’ll use to implement the search functionality:以下是用于实现搜索功能的 Next.js 客户端挂钩：

* **`useSearchParams`**- Allows you to access the parameters of the current URL. For example, the search params for this URL `/dashboard/invoices?page=1&query=pending` would look like this: `{page: '1', query: 'pending'}`.`useSearchParams` - 允许您访问当前 URL 的参数。例如，此 URL `/dashboard/invoices?page=1&query=pending` 的搜索参数如下所示： `{page: '1', query: 'pending'}` .

* **`usePathname`** - Lets you read the current URL’s pathname. For example, for the route `/dashboard/invoices`, `usePathname` would return `'/dashboard/invoices'`.`usePathname` - 允许您读取当前 URL 的路径名。例如，对于路由 `/dashboard/invoices` ， `usePathname` 将返回 `'/dashboard/invoices'` 。

* **`useRouter`** - Enables navigation between routes within client components programmatically. There are [multiple methods](https://nextjs.org/docs/app/api-reference/functions/use-router#userouter) you can use.`useRouter` - 以编程方式在客户端组件内的路由之间启用导航。您可以使用多种方法。

Here’s a quick overview of the implementation steps:以下是实施步骤的快速概述：

1. Capture the user’s input.捕获用户的输入。

1. Update the URL with the search params.使用搜索参数更新 URL。

1. Keep the URL in sync with the input field.使 URL 与输入字段保持同步。

1. Update the table to reflect the search query.更新表以反映搜索查询。

### 1. Capture the user’s input1. 捕获用户的输入

Go into the `<Search>` Component (`/app/ui/search.tsx`), and you’ll notice:进入 `<Search>` 组件（ `/app/ui/search.tsx` ），您会注意到：

* `"use client"` - This is a Client Component, which means you can use event listeners and hooks.`"use client"` - 这是一个客户端组件，这意味着您可以使用事件侦听器和钩子。

* `<input>` - This is the search input.`<input>` - 这是搜索输入。

Create a new `handleSearch` function, and add an `onChange` listener to the `<input>` element. `onChange` will invoke `handleSearch` whenever the input value changes.创建一个新 `handleSearch` 函数，并向该 `<input>` 元素添加侦 `onChange` 听器。 `onChange` `handleSearch` 每当输入值更改时都会调用。

```
'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
 
export default function Search({ placeholder }: { placeholder: string }) {
  function handleSearch(term: string) {
    console.log(term);
  }
 
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
```

Test that it’s working correctly by opening the console in your Developer Tools, then type into the search field. You should see the search term logged to the console.通过在开发人员工具中打开控制台，然后在搜索字段中键入内容来测试它是否正常工作。您应该会看到记录到控制台的搜索词。

Great! You’re capturing the user’s search input. Now, you need to update the URL with the search term.伟大！您正在捕获用户的搜索输入。现在，您需要使用搜索词更新 URL。

### 2. Update the URL with the search params2. 使用搜索参数更新 URL

Import the `useSearchParams` hook from `'next/navigation'`, and assign it to a variable:从 `'next/navigation'` 导入 `useSearchParams` 钩子，并将其分配给变量：

```
'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
 
export default function Search() {
  const searchParams = useSearchParams();
 
  function handleSearch(term: string) {
    console.log(term);
  }
  // ...
}
```

Inside `handleSearch,` create a new [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) instance using your new `searchParams` variable.在内部 `handleSearch,` ，使用新 `searchParams` 变量创建一个新 `URLSearchParams` 实例。

```
'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
 
export default function Search() {
  const searchParams = useSearchParams();
 
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
  }
  // ...
}
```

`URLSearchParams` is a Web API that provides utility methods for manipulating the URL query parameters. Instead of creating a complex string literal, you can use it to get the params string like `?page=1&query=a`.`URLSearchParams` 是一个 Web API，它提供用于操作 URL 查询参数的实用工具方法。您可以使用它来获取参数字符串，而不是创建复杂的字符串文字，例如 `?page=1&query=a` .

Next, `set` the params string based on the user’s input. If the input is empty, you want to `delete` it:接下来， `set` 基于用户输入的参数字符串。如果输入为空，则希望 `delete` 它：

```
'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
 
export default function Search() {
  const searchParams = useSearchParams();
 
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
  }
  // ...
}
```

Now that you have the query string. You can use Next.js’s `useRouter` and `usePathname` hooks to update the URL.现在，您已经有了查询字符串。您可以使用 Next.js `useRouter` 和 `usePathname` 钩子来更新 URL。

Import `useRouter` and `usePathname` from `'next/navigation'`, and use the `replace` method from `useRouter()` inside `handleSearch`:import `useRouter` 和 `usePathname` from `'next/navigation'` ，并从 `useRouter()` 内部 `handleSearch` 使用方法 `replace` ：

```
'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
 
export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
 
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
}
```

Here’s a breakdown of what’s happening:以下是正在发生的事情的细分：

* `${pathname}` is the current path, in your case, `"/dashboard/invoices"`.`${pathname}` 是当前路径，在本例中为 `"/dashboard/invoices"` .

* As the user types into the search bar, `params.toString()` translates this input into a URL-friendly format.当用户在搜索栏中键入内容时， `params.toString()` 将此输入转换为对 URL 友好的格式。

* `replace(${pathname}?${params.toString()})` updates the URL with the user’s search data. For example, `/dashboard/invoices?query=lee` if the user searches for “Lee”.`replace(${pathname}?${params.toString()})` 使用用户的搜索数据更新 URL。例如， `/dashboard/invoices?query=lee` 如果用户搜索“Lee”。

* The URL is updated without reloading the page, thanks to Next.js’s client-side navigation (which you learned about in the chapter on [navigating between pages](https://nextjs.org/learn/dashboard-app/navigating-between-pages).由于 Next.js 的客户端导航（您在有关在页面之间导航的章节中了解了该导航），因此无需重新加载页面即可更新 URL。

### 3. Keeping the URL and input in sync3. 保持 URL 和输入同步

To ensure the input field is in sync with the URL and will be populated when sharing, you can pass a `defaultValue` to input by reading from `searchParams`:为确保输入字段与 URL 同步并在共享时填充，您可以通过从以下 `searchParams` 位置读取： `defaultValue`

```
<input
  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
  placeholder={placeholder}
  onChange={(e) => {
    handleSearch(e.target.value);
  }}
  defaultValue={searchParams.get('query')?.toString()}
/>
```

> **`defaultValue` vs. `value` / Controlled vs. Uncontrolled`defaultValue` vs. `value` / 受控与不受控制**
> 
> 
> If you’re using state to manage the value of an input, you’d use the `value` attribute to make it a controlled component. This means React would manage the input’s state.如果使用 state 来管理输入的值，则可以使用该 `value` 属性使其成为受控组件。这意味着 React 将管理输入的状态。
> 
> 
> However, since you’re not using state, you can use `defaultValue`. This means the native input will manage its own state. This is okay since you’re saving the search query to the URL instead of state.但是，由于您没有使用状态，因此可以使用 `defaultValue` .这意味着本机输入将管理自己的状态。这没关系，因为您要将搜索查询保存到 URL 而不是状态。

### 4. Updating the table 4. 更新表格

Finally, you need to update the table component to reflect the search query.最后，您需要更新表组件以反映搜索查询。

Navigate back to the invoices page.导航回发票页面。

Page components [accept a prop called `searchParams`](https://nextjs.org/docs/app/api-reference/file-conventions/page), so you can pass the current URL params to the `<Table>` component.页面组件接受一个名为 `searchParams` 的 prop，因此您可以将当前 URL 参数传递给该 `<Table>` 组件。

```
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
 
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
```

If you navigate to the `<Table>` Component, you’ll see that the two props, `query` and `currentPage`, are passed to the `fetchFilteredInvoices()` function which returns the invoices that match the query.如果导航到 `<Table>` Component，则会看到两个 props `query` 和 `currentPage` 被传递给 `fetchFilteredInvoices()` 返回与查询匹配的发票的函数。

```
// ...
export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);
  // ...
}
```

With these changes in place, go ahead and test it out. If you search for a term, you’ll update the URL, which will send a new request to the server, data will be fetched on the server, and only the invoices that match your query will be returned.完成这些更改后，请继续进行测试。如果搜索某个字词，则会更新 URL，该 URL 将向服务器发送新请求，将在服务器上提取数据，并且仅返回与您的查询匹配的发票。

> **When to use the `useSearchParams()` hook vs. the `searchParams` prop？什么时候使用 `useSearchParams()` 钩子和 `searchParams` 道具？**
> 
> 
> You might have noticed you used two different ways to extract search params. Whether you use one or the other depends on whether you’re working on the client or the server.您可能已经注意到，您使用了两种不同的方法来提取搜索参数。是使用一个还是另一个取决于您是在客户端上还是在服务器上工作。
> 
> 
> * `<Search>` is a Client Component, so you used the `useSearchParams()` hook to access the params from the client.`<Search>` 是一个客户端组件，因此您使用了 `useSearchParams()` 钩子从客户端访问参数。
> 
> * `<Table>` is a Server Component that fetches its own data, so you can pass the `searchParams` prop from the page to the component.`<Table>` 是一个获取自己数据的 Server 组件，因此您可以将 `searchParams` prop 从页面传递给组件。
> 
> 
> As a general rule, if you want to read the params from the client, use the `useSearchParams()` hook as this avoids having to go back to the server.作为一般规则，如果要从客户端读取参数，请使用 `useSearchParams()` 钩子，因为这样可以避免返回服务器。

### Best practice: Debouncing 最佳实践：去抖动

Congratulations! You’ve implemented search with Next.js! But there’s something you can do to optimize it.祝贺！您已使用 Next.js 实现了搜索！但是你可以做一些事情来优化它。

Inside your `handleSearch` function, add the following `console.log`:在 `handleSearch` 函数中，添加以下内容 `console.log` ：

```
function handleSearch(term: string) {
  console.log(`Searching... ${term}`);
 
  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set('query', term);
  } else {
    params.delete('query');
  }
  replace(`${pathname}?${params.toString()}`);
}
```

Then type “Emil” into your search bar and check the console in dev tools. What is happening？然后在搜索栏中输入“Emil”，并在开发工具中检查控制台。发生了什么事情？

```
Searching... E
Searching... Em
Searching... Emi
Searching... Emil
```

You’re updating the URL on every keystroke, and therefore querying your database on every keystroke! This isn’t a problem as our application is small, but imagine if your application had thousands of users, each sending a new request to your database on each keystroke.您在每次击键时都会更新 URL，因此在每次击键时都会查询您的数据库！这不是问题，因为我们的应用程序很小，但想象一下，如果您的应用程序有数千个用户，每个用户在每次击键时都会向您的数据库发送一个新请求。

**Debouncing** is a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.去抖动是一种编程实践，它限制了函数的触发速率。在我们的示例中，您只想在用户停止键入时查询数据库。

> **How Debouncing Works: 去抖动的工作原理：**
> 
> 
> 1. **Trigger Event**: When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.触发事件：当应该去抖动的事件（如搜索框中的击键）发生时，计时器会启动。
> 
> 1. **Wait**: If a new event occurs before the timer expires, the timer is reset.等待：如果在计时器到期之前发生新事件，则计时器将重置。
> 
> 1. **Execution**: If the timer reaches the end of its countdown, the debounced function is executed.执行：如果计时器达到倒计时结束，则执行去抖动函数。

You can implement debouncing in a few ways, including manually creating your own debounce function. To keep things simple, we’ll use a library called [`use-debounce`](https://www.npmjs.com/package/use-debounce).您可以通过几种方式实现去抖动，包括手动创建自己的去抖动函数。为了简单起见，我们将使用一个名为 `use-debounce` .

Install `use-debounce`: 安装 `use-debounce` ：

In your `<Search>` Component, import a function called `useDebouncedCallback`:`<Search>` 在组件中，导入一个名为 `useDebouncedCallback`

```
// ...
import { useDebouncedCallback } from 'use-debounce';
 
// Inside the Search Component...
const handleSearch = useDebouncedCallback((term) => {
  console.log(`Searching... ${term}`);
 
  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set('query', term);
  } else {
    params.delete('query');
  }
  replace(`${pathname}?${params.toString()}`);
}, 300);
```

This function will wrap the contents of `handleSearch`, and only run the code after a specific time once the user has stopped typing (300ms).此函数将包装 `handleSearch` 的内容，并且仅在用户停止键入（300 毫秒）后的特定时间后运行代码。

Now type in your search bar again, and open the console in dev tools. You should see the following:现在再次在搜索栏中键入，然后在开发工具中打开控制台。您应看到以下内容：

By debouncing, you can reduce the number of requests sent to your database, thus saving resources.通过去抖动，可以减少发送到数据库的请求数，从而节省资源。

### It’s time to take a quiz! 是时候做个测验了！

Test your knowledge and see what you’ve just learned.测试你的知识，看看你刚刚学到了什么。

What problem does debouncing solve in the search feature？去抖动在搜索功能中解决了什么问题？

After introducing the search feature, you’ll notice the table displays only 6 invoices at a time. This is because the `fetchFilteredInvoices()` function in `data.ts` returns a maximum of 6 invoices per page.引入搜索功能后，您会注意到该表一次仅显示 6 张发票。这是因为 中的 `fetchFilteredInvoices()` `data.ts` 函数每页最多返回 6 张发票。

Adding pagination allows users to navigate through the different pages to view all the invoices. Let’s see how you can implement pagination using URL params, just like you did with search.添加分页允许用户浏览不同的页面以查看所有发票。让我们看看如何使用 URL 参数实现分页，就像使用搜索一样。

Navigate to the `<Pagination/>` component and you’ll notice that it’s a Client Component. You don’t want to fetch data on the client as this would expose your database secrets (remember, you’re not using an API layer). Instead, you can fetch the data on the server, and pass it to the component as a prop.导航到该 `<Pagination/>` 组件，您会注意到它是一个客户端组件。您不希望在客户端上获取数据，因为这会暴露您的数据库机密（请记住，您没有使用 API 层）。相反，您可以在服务器上获取数据，并将其作为 prop 传递给组件。

In `/dashboard/invoices/page.tsx`, import a new function called `fetchInvoicesPages` and pass the `query` from `searchParams` as an argument:在 中 `/dashboard/invoices/page.tsx` ，导入一个新函数， `fetchInvoicesPages` 并将 `query` from `searchParams` 作为参数传递：

```
// ...
import { fetchInvoicesPages } from '@/app/lib/data';
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string,
    page?: string,
  },
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
 
  const totalPages = await fetchInvoicesPages(query);
 
  return (
    // ...
  );
}
```

`fetchInvoicesPages` returns the total number of pages based on the search query. For example, if there are 12 invoices that match the search query, and each page displays 6 invoices, then the total number of pages would be 2.`fetchInvoicesPages` 根据搜索查询返回总页数。例如，如果有 12 张与搜索查询匹配的发票，并且每页显示 6 张发票，则总页数将为 2。

Next, pass the `totalPages` prop to the `<Pagination/>` component:接下来，将 `totalPages` prop 传递给 `<Pagination/>` 组件：

```
// ...
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
 
  const totalPages = await fetchInvoicesPages(query);
 
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
```

Navigate to the `<Pagination/>` component and import the `usePathname` and `useSearchParams` hooks. We will use this to get the current page and set the new page. Make sure to also uncomment the code in this component. Your application will break temporarily as you haven’t implemented the `<Pagination/>` logic yet. Let’s do that now!

```
'use client';
 
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
 
export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
 
  // ...
}
```

Next, create a new function inside the `<Pagination>` Component called `createPageURL`. Similarly to the search, you’ll use `URLSearchParams` to set the new page number, and `pathName` to create the URL string.

```
'use client';
 
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
 
export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
 
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
 
  // ...
}
```

Here’s a breakdown of what’s happening:

* `createPageURL` creates an instance of the current search parameters.

* Then, it updates the “page” parameter to the provided page number.

* Finally, it constructs the full URL using the pathname and updated search parameters.

The rest of the `<Pagination>` component deals with styling and different states (first, last, active, disabled, etc). We won’t go into detail for this course, but feel free to look through the code to see where `createPageURL` is being called.

Finally, when the user types a new search query, you want to reset the page number to 1. You can do this by updating the `handleSearch` function in your `<Search>` component:

```
'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
 
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
 
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
```

## Summary

Congratulations! You’ve just implemented search and pagination using URL Params and Next.js APIs.

To summarize, in this chapter:

* You’ve handled search and pagination with URL search parameters instead of client state.

* You’ve fetched data on the server.

* You’re using the `useRouter` router hook for smoother, client-side transitions.

These patterns are different from what you may be used to when working with client-side React, but hopefully, you now better understand the benefits of using URL search params and lifting this state to the server.
