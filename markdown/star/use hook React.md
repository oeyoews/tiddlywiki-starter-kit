---
title: 'use hook React'
tags: ['剪藏']
type: 'text/markdown'
created: 'Mon Nov 13 2023 04:41:32 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: 'oeyoews'
url: 'https://react.dev/reference/react/use#streaming-data-from-server-to-client'
---

# use hook React

### Canary 金丝雀

The `use` Hook is currently only available in React’s canary and experimental channels. Learn more about [React’s release channels here](https://react.dev/community/versioning-policy#all-release-channels).`use` Hook 目前仅在 React 的 Canary 和实验频道中可用。在此处了解有关 React 发布渠道的更多信息。

`use` is a React Hook that lets you read the value of a resource like a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [context](https://react.dev/learn/passing-data-deeply-with-context).`use` 是一个 React Hook，可让您读取资源的值，例如 Promise 或上下文。

```
const value = use(resource);
```

Call `use` in your component to read the value of a resource like a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [context](https://react.dev/learn/passing-data-deeply-with-context).调用 `use` 组件以读取资源的值，例如 Promise 或上下文。

```
import { use } from 'react';

function MessageComponent({ messagePromise }) {

const message = use(messagePromise);

const theme = use(ThemeContext);

// ...
```

Unlike all other React Hooks, `use` can be called within loops and conditional statements like `if`. Like other React Hooks, the function that calls `use` must be a Component or Hook.与所有其他 React Hook 不同，可以在循环和条件语句中调用， `use` 例如 `if` .与其他 React Hook 一样，调用 `use` 的函数必须是 Component 或 Hook。

When called with a Promise, the `use` Hook integrates with [`Suspense`](https://react.dev/reference/react/Suspense) and [error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary). The component calling `use` *suspends* while the Promise passed to `use` is pending. If the component that calls `use` is wrapped in a Suspense boundary, the fallback will be displayed. Once the Promise is resolved, the Suspense fallback is replaced by the rendered components using the data returned by the `use` Hook. If the Promise passed to `use` is rejected, the fallback of the nearest Error Boundary will be displayed.当使用 Promise 调用时， `use` Hook 会与 `Suspense` 和 错误边界集成。当传递给的 Promise `use` 处于挂起状态时，调用 `use` 的组件将挂起。如果调用 `use` 的组件包装在 Suspense 边界中，则将显示回退。一旦 Promise 被解析，Suspense 回退将替换为使用 Hook 返回 `use` 的数据呈现的组件。如果传递给的 Promise `use` 被拒绝，则将显示最近的错误边界的回退。

See more examples below. 请参阅下面的更多示例。

#### Parameters  参数parameters

* `resource`: this is the source of the data you want to read a value from. A resource can be a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or a [context](https://react.dev/learn/passing-data-deeply-with-context).`resource` ：这是要从中读取值的数据源。资源可以是 Promise 或上下文。

#### Returns  返回returns

The `use` Hook returns the value that was read from the resource like the resolved value of a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [context](https://react.dev/learn/passing-data-deeply-with-context).`use` Hook 返回从资源中读取的值，例如 Promise 或上下文的解析值。

#### Caveats  警告caveats

* The `use` Hook must be called inside a Component or a Hook.`use` Hook 必须在 Component 或 Hook 中调用。

* When fetching data in a [Server Component](https://react.dev/reference/react/use-server), prefer `async` and `await` over `use`. `async` and `await` pick up rendering from the point where `await` was invoked, whereas `use` re-renders the component after the data is resolved.在服务器组件中获取数据时，首选 `async` `use` 和 `await` over 。 `async` 并从 `await` 调用点 `await` 开始渲染，而 `use` 在解析数据后重新渲染组件。

* Prefer creating Promises in [Server Components](https://react.dev/reference/react/use-server) and passing them to [Client Components](https://react.dev/reference/react/use-client) over creating Promises in Client Components. Promises created in Client Components are recreated on every render. Promises passed from a Server Component to a Client Component are stable across re-renders. See this example.与在客户端组件中创建 Promise 相比，更喜欢在服务器组件中创建 Promise 并将其传递给客户端组件。在客户端组件中创建的 Promise 将在每次渲染时重新创建。从服务器组件传递到客户端组件的 promise 在重新呈现时是稳定的。请参阅此示例。

---

## Usage  用法usage

### Reading context with `use`读取 `use` 上下文 reading-context-with-use

When a [context](https://react.dev/learn/passing-data-deeply-with-context) is passed to `use`, it works similarly to [`useContext`](https://react.dev/reference/react/useContext). While `useContext` must be called at the top level of your component, `use` can be called inside conditionals like `if` and loops like `for`. `use` is preferred over `useContext` because it is more flexible.当上下文传递给 `use` 时，它的工作方式类似于 `useContext` 。虽然 `useContext` 必须在组件的顶层调用， `use` 但可以在条件语句（如 `if` 和循环）中调用 `for` 。 `use` 是首选， `useContext` 因为它更灵活。

```
import { use } from 'react';

function Button() {

const theme = use(ThemeContext);

// ...
```

`use` returns the context value for the context you passed. To determine the context value, React searches the component tree and finds **the closest context provider above** for that particular context.`use` 返回您传递的上下文的上下文值。为了确定上下文值，React 搜索组件树并找到上面最接近该特定上下文的上下文提供者。

To pass context to a `Button`, wrap it or one of its parent components into the corresponding context provider.要将上下文传递给 `Button` ，请将其或其父组件之一包装到相应的上下文提供程序中。

```
function MyPage() {

return (

<ThemeContext.Provider value="dark">

<Form />

</ThemeContext.Provider>

);

}

function Form() {

// ... renders buttons inside ...

}
```

It doesn’t matter how many layers of components there are between the provider and the `Button`. When a `Button` *anywhere* inside of `Form` calls `use(ThemeContext)`, it will receive `"dark"` as the value.提供程序和 `Button` .当 a `Button` 在 any inside 的 `Form` 调用 `use(ThemeContext)` 时，它将接收 `"dark"` 作为值。

Unlike [`useContext`](https://react.dev/reference/react/useContext), `use` can be called in conditionals and loops like `if`.与 不同 `useContext` ，可以在条件和循环中调用， `use` 例如 `if` 。

```
function HorizontalRule({ show }) {

if (show) {

const theme = use(ThemeContext);

return <hr className={theme} />;

}

return false;

}
```

`use` is called from inside a `if` statement, allowing you to conditionally read values from a Context.`use` 从 `if` 语句内部调用，允许您有条件地从 Context 中读取值。

### Pitfall 陷阱

Like `useContext`, `use(context)` always looks for the closest context provider *above* the component that calls it. It searches upwards and **does not** consider context providers in the component from which you’re calling `use(context)`.Like `useContext` ， `use(context)` 始终在调用它的组件上方查找最接近的上下文提供程序。它向上搜索，并且不考虑您从中调用 `use(context)` 的组件中的上下文提供程序。

### Streaming data from the server to the client 将数据从服务器流式传输到客户端streaming-data-from-server-to-client

Data can be streamed from the server to the client by passing a Promise as a prop from a Server Component to a Client Component.通过将 Promise 作为 prop 从服务器组件传递到客户端组件，可以将数据从服务器流式传输到客户端。

```
import { fetchMessage } from './lib.js';

import { Message } from './message.js';

export default function App() {

const messagePromise = fetchMessage();

return (

<Suspense fallback={<p>waiting for message...</p>}>

<Message messagePromise={messagePromise} />

</Suspense>

);

}
```

The Client Component then takes the Promise it received as a prop and passes it to the `use` Hook. This allows the Client Component to read the value from the Promise that was initially created by the Server Component.然后，客户端组件将它收到的 Promise 作为道具，并将其 `use` 传递给 Hook。这允许客户端组件从最初由服务器组件创建的 Promise 中读取值。

```
// message.js

'use client';

import { use } from 'react';

export function Message({ messagePromise }) {

const messageContent = use(messagePromise);

return <p>Here is the message: {messageContent}</p>;

}
```

Because `Message` is wrapped in [`Suspense`](https://react.dev/reference/react/Suspense), the fallback will be displayed until the Promise is resolved. When the Promise is resolved, the value will be read by the `use` Hook and the `Message` component will replace the Suspense fallback.因为 `Message` 被包装在 `Suspense` 中，所以回退将一直显示，直到 Promise 得到解决。当 Promise 被解析时，该值将由 `use` Hook 读取，并且组件 `Message` 将替换 Suspense 回退。

### Note 注意

When passing a Promise from a Server Component to a Client Component, its resolved value must be serializable to pass between server and client. Data types like functions aren’t serializable and cannot be the resolved value of such a Promise.将 Promise 从服务器组件传递到客户端组件时，其解析值必须可序列化才能在服务器和客户端之间传递。函数等数据类型不可序列化，不能是此类 Promise 的解析值。

<h5>Deep Dive 深潜#### Should I resolve a Promise in a Server or Client Component？我应该在服务器或客户端组件中解析 Promise 吗？resolve-promise-in-server-or-client-component</h5>
A Promise can be passed from a Server Component to a Client Component and resolved in the Client Component with the `use` Hook. You can also resolve the Promise in a Server Component with `await` and pass the required data to the Client Component as a prop.Promise 可以从服务器组件传递到客户端组件，并使用 Hook 在客户端组件 `use` 中解析。您还可以使用 `await` Promise 解析服务器组件中的 Promise，并将所需的数据作为 prop 传递给客户端组件。

```
export default function App() {

const messageContent = await fetchMessage();

return <Message messageContent={messageContent} />

}
```

But using `await` in a [Server Component](https://react.dev/reference/react/components#server-components) will block its rendering until the `await` statement is finished. Passing a Promise from a Server Component to a Client Component prevents the Promise from blocking the rendering of the Server Component.但是在服务器组件中使用 `await` 将阻止其呈现， `await` 直到语句完成。将 Promise 从服务器组件传递到客户端组件可防止 Promise 阻止服务器组件的呈现。

### Dealing with rejected Promises 处理被拒绝的 Promisedealing-with-rejected-promises

In some cases a Promise passed to `use` could be rejected. You can handle rejected Promises by either:在某些情况下，传递给的 Promise `use` 可能会被拒绝。您可以通过以下任一方式处理被拒绝的 Promise：

1. Displaying an error to users with error boundary.向具有错误边界的用户显示错误。

1. Providing an alternative value with `Promise.catch` 提供 `Promise.catch` 替代价值

### Pitfall 陷阱

`use` cannot be called in a try-catch block. Instead of a try-catch block wrap your component in an Error Boundary, or provide an alternative value to use with the Promise’s `.catch` method.`use` 不能在 try-catch 块中调用。不要使用 try-catch 块，而是将组件包装在 Error Boundary 中，或者提供一个替代值以用于 Promise `.catch` 的方法。

#### Displaying an error to users with a error boundary 向具有错误边界的用户显示错误displaying-an-error-to-users-with-error-boundary

If you’d like to display an error to your users when a Promise is rejected, you can use an [error boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary). To use an error boundary, wrap the component where you are calling the `use` Hook in an error boundary. If the Promise passed to `use` is rejected the fallback for the error boundary will be displayed.如果您希望在 Promise 被拒绝时向用户显示错误，则可以使用错误边界。要使用错误边界，请将调用 `use` Hook 的组件包装在错误边界中。如果传递给的 Promise `use` 被拒绝，则会显示错误边界的回退。

#### Providing an alternative value with `Promise.catch`提供 `Promise.catch` 替代价值 providing-an-alternative-value-with-promise-catch

If you’d like to provide an alternative value when the Promise passed to `use` is rejected you can use the Promise’s [`catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) method.如果要在传递给 `use` 的 Promise 被拒绝时提供替代值，可以使用 Promise `catch` 的方法。

```
import { Message } from './message.js';

export default function App() {

const messagePromise = new Promise((resolve, reject) => {

reject();

}).catch(() => {

return "no new message found.";

});

return (

<Suspense fallback={<p>waiting for message...</p>}>

<Message messagePromise={messagePromise} />

</Suspense>

);

}
```

To use the Promise’s `catch` method, call `catch` on the Promise object. `catch` takes a single argument: a function that takes an error message as an argument. Whatever is returned by the function passed to `catch` will be used as the resolved value of the Promise.若要使用 Promise `catch` 的方法，请调用 `catch` Promise 对象。 `catch` 接受单个参数：将错误消息作为参数的函数。传递给的函数返回的任何内容 `catch` 都将用作 Promise 的解析值。

---

## Troubleshooting  故障 排除troubleshooting

### “Suspense Exception: This is not a real error!”“悬念例外：这不是一个真正的错误！”suspense-exception-error

You are either calling `use` outside of a React component or Hook function, or calling `use` in a try–catch block. If you are calling `use` inside a try–catch block, wrap your component in an error boundary, or call the Promise’s `catch` to catch the error and resolve the Promise with another value. See these examples.你要么在 React 组件或 Hook 函数外部调用，要么在 try-catch 块中调用 `use` `use` 。如果要在 try-catch 块内调用，请将组件包装在错误边界中，或调用 `use` Promise `catch` 来捕获错误并使用另一个值解析 Promise。请参阅这些示例。

If you are calling `use` outside a React component or Hook function, move the `use` call to a React component or Hook function.如果要在 React 组件或 Hook 函数外部调用，请将 `use` 调用 `use` 移动到 React 组件或 Hook 函数。

```
function MessageComponent({messagePromise}) {

function download() {

// ❌ the function calling `use` is not a Component or Hook

const message = use(messagePromise);

// ...
```

Instead, call `use` outside any component closures, where the function that calls `use` is a component or Hook.相反，在任何组件闭包外部调用，其中调用 `use` `use` 的函数是组件或 Hook。

```
function MessageComponent({messagePromise}) {

// ✅ `use` is being called from a component. 

const message = use(messagePromise);

// ...
```

[Previous 以前 Hooks 钩](https://react.dev/reference/react/hooks)[Next 下一个 useCallback 使用回调](https://react.dev/reference/react/useCallback)
