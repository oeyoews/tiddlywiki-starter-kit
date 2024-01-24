---
title: 'How_to_Think_About_Security_in_Next.js'
tags: ['剪藏']
type: 'text/markdown'
created: 'Sun Nov 26 2023 13:19:58 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://nextjs.org/blog/security-nextjs-server-components-actions'
---

# How_to_Think_About_Security_in_Next.js

React Server Components (RSC) in App Router is a novel paradigm that eliminates much of the redundancy and potential risks linked with conventional methods. Given the newness, developers and subsequently security teams may find it challenging to align their existing security protocols with this model.

This document is meant to highlight a few areas to look out for, what protections are built-in, and include a guide for auditing applications. We focus especially on the risks of accidental data exposure.

## Choosing Your Data Handling Model

[React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) blur the line between server and client. Data handling is paramount in understanding where information is processed and subsequently made available.

The first thing we need to do is pick what data handling approach is appropriate for our project.

* HTTP APIs (recommended for existing large projects / orgs)

* Data Access Layer (recommended for new projects)

* Component Level Data Access (recommended for prototyping and learning)

We recommend that you stick to one approach and don’t mix and match too much. This makes it clear for both developers working in your code base and security auditors for what to expect. Exceptions pop out as suspicious.

### HTTP APIs

If you’re adopting Server Components in an existing project, the recommended approach is to handle Server Components at runtime as unsafe/untrusted by default like SSR or within the client. So there is no assumption of an internal network or zones of trust and engineers can apply the concept of Zero Trust. Instead, you only call custom API endpoints such as REST or GraphQL using `fetch()` from Server Components just like if it was executing on the client. Passing along any cookies.

If you had existing `getStaticProps`/`getServerSideProps` connecting to a database, you might want to consolidate the model and move these to API end points as well so you have one way to do things.

Look out for any access control that assumes fetches from the internal network are safe.

This approach lets you keep existing organizational structures where existing backend teams, specialized in security can apply existing security practices. If those teams use languages other than JavaScript, that works well in this approach.

It still takes advantage of many of the benefits of Server Components by sending less code to the client and inherent data waterfalls can execute with low latency.

### Data Access Layer

Our recommended approach for new projects is to create a separate Data Access Layer inside your JavaScript codebase and consolidate all data access in there. This approach ensures consistent data access and reducing the chance of authorization bugs occurring. It’s also easier to maintain given you’re consolidating into a single library. Possibly providing better team cohesion with a single programming language. You also get to take advantage of better performance with lower runtime overhead, the ability to share an in-memory cache across different parts of a request.

You build an internal JavaScript library that provides custom data access checks before giving it to the caller. Similar to HTTP endpoints but in the same memory model. Every API should accept the current user and check if the user can see this data before returning it. The principle is that a Server Component function body should only see data that the current user issuing the request is authorized to have access to.

From this point, normal security practices for implementing APIs take over.

```
import { cache } from 'react';
import { cookies } from 'next/headers';
 
// Cached helper methods makes it easy to get the same value in many places
// without manually passing it around. This discourages passing it from Server
// Component to Server Component which minimizes risk of passing it to a Client
// Component.
export const getCurrentUser = cache(async () => {
  const token = cookies().get('AUTH_TOKEN');
  const decodedToken = await decryptAndValidate(token);
  // Don't include secret tokens or private information as public fields.
  // Use classes to avoid accidentally passing the whole object to the client.
  return new User(decodedToken.id);
});
```

```
import 'server-only';
import { getCurrentUser } from './auth';
 
function canSeeUsername(viewer: User) {
  // Public info for now, but can change
  return true;
}
 
function canSeePhoneNumber(viewer: User, team: string) {
  // Privacy rules
  return viewer.isAdmin || team === viewer.team;
}
 
export async function getProfileDTO(slug: string) {
  // Don't pass values, read back cached values, also solves context and easier to make it lazy
 
  // use a database API that supports safe templating of queries
  const [rows] = await sql`SELECT * FROM user WHERE slug = ${slug}`;
  const userData = rows[0];
 
  const currentUser = await getCurrentUser();
 
  // only return the data relevant for this query and not everything
  // <https://www.w3.org/2001/tag/doc/APIMinimization>
  return {
    username: canSeeUsername(currentUser) ? userData.username : null,
    phonenumber: canSeePhoneNumber(currentUser, userData.team)
      ? userData.phonenumber
      : null,
  };
}
```

These methods should expose objects that are safe to be transferred to the client as is. We like to call these Data Transfer Objects (DTO) to clarify that they’re ready to be consumed by the client.

They might only get consumed by Server Components in practice. This creates a layering where security audits can focus primarily on the Data Access Layer while the UI can rapidly iterate. Smaller surface area and less code to cover makes it easier to catch security issues.

```
import {getProfile} from '../../data/user'
export async function Page({ params: { slug } }) {
  // This page can now safely pass around this profile knowing
  // that it shouldn't contain anything sensitive.
  const profile = await getProfile(slug);
  ...
}
```

Secret keys can be stored in environment variables but only the data access layer should access `process.env` in this approach.密钥可以存储在环境变量中，但在此方法中，只有数据访问层才能访问 `process.env` 。

### Component Level Data Access 组件级数据访问

Another approach is to just put your database queries directly in your Server Components. This approach is only appropriate for rapid iteration and prototyping. E.g. for a small product with a small team where everyone is aware of the risks and how to watch for them.另一种方法是将数据库查询直接放在服务器组件中。此方法仅适用于快速迭代和原型设计。例如，对于一个小团队的小型产品，每个人都知道风险以及如何观察它们。

In this approach you’ll want to audit your `"use client"` files carefully. While auditing and reviewing PRs, look at all the exported functions and if the type signature accepts overly broad objects like `User`, or contains props like `token` or `creditCard`. Even privacy sensitive fields like `phoneNumber` need extra scrutiny. A Client Component should not accept more data than the minimal data it needs to perform its job.在这种方法中，您需要仔细审核文件 `"use client"` 。在审核和审查 PR 时，请查看所有导出的函数，以及类型签名是否接受过于宽泛的对象（如 `User` ），或者包含像 或 `creditCard` 这样的 `token` 道具。即使是像 `phoneNumber` 这样的隐私敏感领域也需要额外的审查。客户端组件接受的数据不应超过其执行其工作所需的最小数据。

```
import Profile from './components/profile.tsx';
 
export async function Page({ params: { slug } }) {
  const [rows] = await sql`SELECT * FROM user WHERE slug = ${slug}`;
  const userData = rows[0];
  // EXPOSED: This exposes all the fields in userData to the client because
  // we are passing the data from the Server Component to the Client.
  // This is similar to returning `userData` in `getServerSideProps`
  return <Profile user={userData} />;
}
```

```
'use client';
// BAD: This is a bad props interface because it accepts way more data than the
// Client Component needs and it encourages server components to pass all that
// data down. A better solution would be to accept a limited object with just
// the fields necessary for rendering the profile.
export default async function Profile({ user }: { user: User }) {
  return (
    <div>
      <h1>{user.name}</h1>
      ...
    </div>
  );
}
```

Always use parameterized queries, or a db library that does it for you, to avoid SQL injection attacks.始终使用参数化查询或为您执行此操作的数据库库，以避免 SQL 注入攻击。

## Server Only 仅服务器

Code that should only ever execute on the server can be marked with:只能在服务器上执行的代码可以标记为：

This will cause the build to error if a Client Component tries to import this module. This can be used to ensure that proprietary/sensitive code or internal business logic doesn’t accidentally leak to the client.如果客户端组件尝试导入此模块，这将导致生成错误。这可用于确保专有/敏感代码或内部业务逻辑不会意外泄漏到客户端。

The primary way to transfer data is using the React Server Components protocol which happens automatically when passing props to the Client Components. This serialization supports a superset of JSON. Transferring custom classes is not supported and will result in an error.传输数据的主要方式是使用 React Server Components 协议，该协议在将 props 传递给客户端组件时自动发生。此序列化支持 JSON 的超集。不支持传输自定义类，这将导致错误。

Therefore, a nice trick to avoid too large objects being accidentally exposed to the client is to use `class` for your data access records.因此，避免意外向客户端公开太大对象的一个好技巧是用于 `class` 数据访问记录。

In the upcoming Next.js 14 release, you can also try out the experimental [React Taint APIs](https://react.dev/reference/react/experimental_taintObjectReference) by enable the `taint` flag in `next.config.js`.在即将发布的 Next.js 14 版本中，您还可以通过启用 中 `taint` 的标志来试用实验性的 React Taint API `next.config.js` 。

```
module.exports = {
  experimental: {
    taint: true,
  },
};
```

This lets you mark an object that should not be allowed to be passed to the client as is.这使您可以按原样标记不应允许传递给客户端的对象。

```
import { experimental_taintObjectReference } from 'react';
 
export async function getUserData(id) {
  const data = ...;
  experimental_taintObjectReference(
    'Do not pass user data to the client',
    data
  );
  return data;
}
```

```
import { getUserData } from './data';
 
export async function Page({ searchParams }) {
  const userData = getUserData(searchParams.id);
  return <ClientComponent user={userData} />; // error
}
```

This does not protect against extracting data fields out of this object and passing them along:这并不能防止从此对象中提取数据字段并传递它们：

```
export async function Page({ searchParams }) {
  const { name, phone } = getUserData(searchParams.id);
  // Intentionally exposing personal data
  return <ClientComponent name={name} phoneNumber={phone} />;
}
```

For unique strings such as tokens, the raw value can be blocked as well using [`taintUniqueValue`](https://react.dev/reference/react/experimental_taintUniqueValue).对于唯一字符串（如标记），也可以使用 `taintUniqueValue` 阻止原始值。

```
import { experimental_taintObjectReference, experimental_taintUniqueValue } from 'react';
 
export async function getUserData(id) {
  const data = ...;
  experimental_taintObjectReference(
    'Do not pass user data to the client',
    data
  );
  experimental_taintUniqueValue(
    'Do not pass tokens to the client',
    data,
    data.token
  );
  return data;
}
```

However, even this doesn’t block derived values.但是，即使这样也不会阻止派生值。

It’s better to avoid data getting into the Server Components in the first place - using a Data Access Layer. Taint checking provides an additional layer of protection against mistakes by specifying the value, please be mindful that functions and classes are already blocked from being passed to Client Components. More layers the minimize risk of something slipping through.最好首先避免数据进入服务器组件 - 使用数据访问层。污点检查通过指定值提供额外的错误保护层，请注意，函数和类已被阻止传递给客户端组件。层数越多，将某些东西滑过的风险降至最低。

By default, environment variables are only available on the Server. By convention, Next.js also exposes any environment variable prefixed with `NEXT_PUBLIC_` to the client. This lets you expose certain explicit configuration that should be available to the client.默认情况下，环境变量仅在服务器上可用。按照约定，Next.js 还会 `NEXT_PUBLIC_` 向客户端公开任何前缀为前缀的环境变量。这样，您就可以公开某些应可供客户端使用的显式配置。

## SSR vs RSC SSR 与 RSC

For initial load Next.js will run both the Server Components and the Client Components on the server to produce HTML.对于初始加载，Next.js 将在服务器上同时运行服务器组件和客户端组件以生成 HTML。

Server Components (RSC) execute in a separate module system from the Client Components to avoid accidentally exposing information between the two modules.服务器组件（RSC）在与客户端组件不同的模块系统中执行，以避免意外暴露两个模块之间的信息。

Client Components that render through Server-side Rendering (SSR) should be considered as the same security policy as the browser client. It should not gain access to any privileged data or private APIs. It’s highly discouraged to use hacks to try to circumvent this protection (such as stashing data on the global object). The principle is that this code should be able to execute the same on the server as the client. In alignment with secure by default practices, Next.js will fail the build if `server-only` modules are imported from a Client Component.通过服务器端呈现（SSR）呈现的客户端组件应被视为与浏览器客户端相同的安全策略。它不应访问任何特权数据或私有 API。强烈建议不要使用黑客来尝试规避这种保护（例如在全局对象上存储数据）。原则是，此代码应该能够在服务器上执行与客户端相同的代码。根据默认安全的做法，如果 `server-only` 从客户端组件导入模块，Next.js 将无法生成。

## Read 读

In Next.js App Router, reading data from a database or API is implemented by rendering Server Component pages.在 Next.js 应用路由器中，通过呈现服务器组件页面来实现从数据库或 API 读取数据。

The input to pages are searchParams in the URL, dynamic params mapped from the URL and headers. These can be abused to be different values by the Client. They should not be trusted and needs to be re-verified each time they are read. E.g. a searchParam should not be used to track things like `?isAdmin=true`. Just because the user is on `/[team]/` doesn’t mean that they have access to that team, that needs to be verified when reading data. The principle is to always re-read access control and `cookies()` whenever reading data. Don’t pass it as props or params.页面的输入是 URL 中的 searchParams、从 URL 和标头映射的动态参数。这些值可能会被客户端滥用为不同的值。它们不应该被信任，每次阅读时都需要重新验证。例如，不应使用 searchParam 来跟踪类似 `?isAdmin=true` .仅仅因为用户处于开启 `/[team]/` 状态并不意味着他们有权访问该团队，在读取数据时需要进行验证。其原则是始终重新读取访问控制，并在 `cookies()` 读取数据时进行重新读取。不要将其作为 props 或参数传递。

Rendering a Server Component should never perform side-effects like mutations. This is not unique to Server Components. React naturally discourages side-effects even when rendering Client Components (outside useEffect), by doing things like double-rendering.渲染服务器组件绝不应产生突变等副作用。这并非服务器组件所独有。React 自然而然地阻止了副作用，即使在渲染客户端组件（在 useEffect 之外）时，也可以通过执行双重渲染之类的操作来避免副作用。

Additionally, in Next.js there’s no way to set cookies or trigger revalidation of caches during rendering. This also discourages the use of renders for mutations.此外，在 Next.js 中，无法在渲染期间设置 cookie 或触发缓存的重新验证。这也不鼓励对突变使用渲染。

E.g. `searchParams` should not be used to perform side-effects like saving changes or logging out. Server Actions should be used for this instead.例如， `searchParams` 不应用于执行副作用，例如保存更改或注销。为此，应改用服务器操作。

This means that the Next.js model never uses GET requests for side-effects when used as intended. This helps avoid a large source of CSRF issues.这意味着 Next.js 模型在按预期使用时从不使用 GET 请求来产生副作用。这有助于避免大量 CSRF 问题。

Next.js does have support for Custom Route Handlers (`route.tsx`), which can set cookies on GET. It’s considered an escape hatch and not part of the general model. These have to explicitly opt-in to accepting GET requests. There’s no catch-all handler that might accidentally receive GET requests. If you do decide to create a custom GET handler, these might need extra auditing.

## Write

The idiomatic way to perform writes or mutations in Next.js App Router is using [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations).

```
'use server';
 
export function logout() {
  cookies().delete('AUTH_TOKEN');
}
```

The `"use server"` annotation exposes an end point that makes all exported functions invokable by the client. The identifiers is currently a hash of the source code location. As long as a user gets the handle to the id of an action, it can invoke it with any arguments.

As a result, those functions should always start by validating that the current user is allowed to invoke this action. Functions should also validate the integrity of each argument. This can be done manually or with a tool like `zod`.

```
"use server";
 
export async function deletePost(id: number) {
  if (typeof id !== 'number') {
    // The TypeScript annotations are not enforced so
    // we might need to check that the id is what we
    // think it is.
    throw new Error();
  }
  const user = await getCurrentUser();
  if (!canDeletePost(user, id)) {
    throw new Error();
  }
  ...
}
```

### Closures

Server Actions can also be encoded in [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures). This lets the action be associated with a snapshot of data used at the time of rendering so that you can use this when the action is invoked:

```
export default function Page() {
  const publishVersion = await getLatestVersion();
  async function publish() {
    "use server";
    if (publishVersion !== await getLatestVersion()) {
      throw new Error('The version has changed since pressing publish');
    }
    ...
  }
  return <button action={publish}>Publish</button>;
}
```

The snapshot of the closure must be sent to the client and back when the server is invoked.

In Next.js 14, the closed over variables are encrypted with the action ID before sent to the client. By default a private key is generated automatically during the build of a Next.js project. Each rebuild generates a new private key which means that each Server Action can only be invoked for a specific build. You might want to use [Skew Protection](https://vercel.com/blog/version-skew-protection) to ensure that you always invoke the correction version during redeploys.

If you need a key that rotates more frequently or is persistent across multiple builds, you can configure it manually using `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` environment variable.

By encrypting all closed over variables, you don’t accidentally expose any secrets in them. By signing it, it makes it harder for an attacker to mess with the input to the action.

Another alternative to using closures is to use the `.bind(...)` function in JavaScript. **These are NOT encrypted.** This provides an opt-out for performance and is also consistent with `.bind()` on the client.

```
async function deletePost(id: number) {
  "use server";
  // verify id and that you can still delete it
  ...
}
 
export async function Page({ slug }) {
  const post = await getPost(slug);
  return <button action={deletePost.bind(null, post.id)}>
    Delete
  </button>;
}
```

The principle is that the argument list to Server Actions (`"use server"`) must always be treated as hostile and the input has to be verified.

### CSRF

All Server Actions can be invoked by plain `<form>`, which could open them up to CSRF attacks. Behind the scenes, Server Actions are always implemented using POST and only this HTTP method is allowed to invoke them. This alone prevents most CSRF vulnerabilities in modern browsers, particularly due to Same-Site cookies being the default.

As an additional protection Server Actions in Next.js 14 also compares the `Origin` header to the `Host` header (or `X-Forwarded-Host`). If they don’t match, the Action will be rejected. In other words, Server Actions can only be invoked on the same host as the page that hosts it. Very old unsupported and outdated browsers that don’t support the `Origin` header could be at risk.

Server Actions doesn’t use CSRF tokens, therefore HTML sanitization is crucial.

When Custom Route Handlers (`route.tsx`) are used instead, extra auditing can be necessary since CSRF protection has to be done manually there. The traditional rules apply there.

## Error Handling

Bugs happen. When errors are thrown on the Server they are eventually rethrown in Client code to be handled in the UI. The error messages and stack traces might end up containing sensitive information. E.g. `[credit card number] is not a valid phone number`.

In production mode, React doesn’t emit errors or rejected promises to the client. Instead a hash is sent representing the error. This hash can be used to associate multiple of the same errors together and associate the error with server logs. React replaces the error message with its own generic one.

In development mode, server errors are still sent in plain text to the client to help with debugging.

It’s important to always run in Next.js in production mode for production workloads. Development mode does not optimize for security and performance.

## Custom Routes and Middleware

[Custom Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) and [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) are considered low level escape hatches for features that cannot be implemented using any other built-in functionality. This also opens up potential footguns that the framework otherwise protects against. With great power comes great responsibility.

As mentioned above, `route.tsx` routes can implement custom GET and POST handlers which may suffer from CSRF issues if not done correctly.

Middleware can be used to limit access to certain pages. Usually it’s best to do this with an allow list rather than a deny list. That’s because it can be tricky to know all the different ways there is to get access to data, such as if there’s a rewrite or client request.

For example, it’s common to only think about the HTML page. Next.js also supports client navigation that can load RSC/JSON payloads. In Pages Router, this used to be in a custom URL.

To make writing matchers easier Next.js App Router always uses the page’s plain URL for both initial HTML, client navigations and Server Actions. Client navigations use `?_rsc=...` search param as a cache breaker.

Server Actions live on the page they’re used on and as such inherit the same access control. If Middleware allows reading a page, you can also invoke actions on that page. To limit access to Server Actions on a page, you can ban the POST HTTP method on that page.

## Audit

If you’re doing an audit of a Next.js App Router project here are a few things we recommend looking extra at:

* **Data Access Layer.** Is there an established practice for an isolated Data Access Layer? Verify that database packages and environment variables are not imported outside the Data Access Layer.

* **`"use client"`** files. Are the Component props expecting private data? Are the type signatures overly broad?

* **`"use server"`** files. Are the Action arguments validated in the action or inside the Data Access Layer? Is the user re-authorized inside the action?

* **`/[param]/`**. Folders with brackets are user input. Are params validated?

* **`middleware.tsx`** and **`route.tsx`** have a lot of power. Spend extra time auditing these using traditional techniques. Perform Penetration Testing or Vulnerability Scanning regularly or in alignment with your team’s software development lifecycle.
