---
title: ''use_server'_directive_–_React'
tags: ['剪藏']
type: 'text/markdown'
created: 'Tue Nov 14 2023 07:31:26 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://react.dev/reference/react/use-server'
---

# 'use_server'_directive_–_React

### Canary 金丝雀

`'use server'` is needed only if you’re [using React Server Components](https://react.dev/learn/start-a-new-react-project#bleeding-edge-react-frameworks) or building a library compatible with them.`'use server'` 仅当您使用 React Server 组件或构建与它们兼容的库时才需要。

`'use server'` marks server-side functions that can be called from client-side code.`'use server'` 标记可从客户端代码调用的服务器端函数。

* Reference  参考

    * `'use server'`

    * Security considerations  安全注意事项

    * Serializable arguments and return values 可序列化参数和返回值

* Usage  用法

    * Server Actions in forms 表单中的服务器操作

    * Calling a Server Action outside of `<form>` 在 `<form>` 外部调用服务器操作

---

## Reference  参考reference

### `'use server'` use-server

Add `'use server'` at the top of an async function body to mark the function as callable by the client. We call these functions *Server Actions*.在异步函数体的顶部添加 `'use server'` ，以将函数标记为可由客户端调用。我们将这些函数称为服务器操作。

```
async function addToCart(data) {

'use server';

// ...

}
```

When calling a Server Action on the client, it will make a network request to the server that includes a serialized copy of any arguments passed. If the Server Action returns a value, that value will be serialized and returned to the client.在客户端上调用服务器操作时，它将向服务器发出网络请求，其中包括传递的任何参数的序列化副本。如果服务器操作返回一个值，则该值将被序列化并返回给客户端。

Instead of individually marking functions with `'use server'`, you can add the directive to the top of a file to mark all exports within that file as Server Actions that can be used anywhere, including imported in client code.您可以将指令添加到文件顶部，而不是单独标记函数，以将该文件中的所有导出标记为可在任何位置使用的服务器操作 `'use server'` ，包括在客户端代码中导入。

#### Caveats  警告caveats

* `'use server'` must be at the very beginning of their function or module; above any other code including imports (comments above directives are OK). They must be written with single or double quotes, not backticks.`'use server'` 必须处于其功能或模块的开头;在任何其他代码（包括导入）之上（上面的注释指令是可以的）。它们必须用单引号或双引号书写，而不是反引号。

* `'use server'` can only be used in server-side files. The resulting Server Actions can be passed to Client Components through props. See supported types for serialization.`'use server'` 只能在服务器端文件中使用。生成的服务器操作可以通过 props 传递给客户端组件。请参阅序列化支持的类型。

* To import a Server Action from [client code](https://react.dev/reference/react/use-client), the directive must be used on a module level.若要从客户端代码导入服务器操作，必须在模块级别使用该指令。

* Because the underlying network calls are always asynchronous, `'use server'` can only be used on async functions.由于基础网络调用始终是异步的，因此 `'use server'` 只能在异步函数上使用。

* Always treat arguments to Server Actions as untrusted input and authorize any mutations. See security considerations.始终将服务器操作的参数视为不受信任的输入，并授权任何更改。请参阅安全注意事项。

* Server Actions should be called in a [transition](https://react.dev/reference/react/useTransition). Server Actions passed to [`<form action>`](https://react.dev/reference/react-dom/components/form#props) or [`formAction`](https://react.dev/reference/react-dom/components/input#props) will automatically be called in a transition.应在转换中调用服务器操作。传递到 `<form action>` 或 `formAction` 将在转换中自动调用的服务器操作。

* Server Actions are designed for mutations that update server-side state; they are not recommended for data fetching. Accordingly, frameworks implementing Server Actions typically process one action at a time and do not have a way to cache the return value.服务器操作专为更新服务器端状态的突变而设计;不建议将它们用于数据获取。因此，实现服务器操作的框架通常一次处理一个操作，并且没有办法缓存返回值。

### Security considerations  安全注意事项security

Arguments to Server Actions are fully client-controlled. For security, always treat them as untrusted input, and make sure to validate and escape arguments as appropriate.服务器操作的参数完全由客户端控制。为了安全起见，请始终将它们视为不受信任的输入，并确保根据需要验证和转义参数。

In any Server Action, make sure to validate that the logged-in user is allowed to perform that action.在任何服务器操作中，请确保验证是否允许登录用户执行该操作。

### Under Construction 正在施工中

To prevent sending sensitive data from a Server Action, there are experimental taint APIs to prevent unique values and objects from being passed to client code.为了防止从服务器操作发送敏感数据，可以使用实验性污点 API 来防止将唯一值和对象传递给客户端代码。

See [experimental_taintUniqueValue](https://react.dev/reference/react/experimental_taintUniqueValue) and [experimental_taintObjectReference](https://react.dev/reference/react/experimental_taintObjectReference).请参阅 experimental_taintUniqueValue 和 experimental_taintObjectReference。

### Serializable arguments and return values 可序列化参数和返回值serializable-parameters-and-return-values

As client code calls the Server Action over the network, any arguments passed will need to be serializable.当客户端代码通过网络调用服务器操作时，传递的任何参数都需要是可序列化的。

Here are supported types for Server Action arguments:以下是服务器操作参数支持的类型：

* Primitives 原

    * [string 字符串](https://developer.mozilla.org/en-US/docs/Glossary/String)

    * [number 数](https://developer.mozilla.org/en-US/docs/Glossary/Number)

    * [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

    * [boolean 布尔](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)

    * [undefined 定义](https://developer.mozilla.org/en-US/docs/Glossary/Undefined)

    * [null 零](https://developer.mozilla.org/en-US/docs/Glossary/Null)

    * [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol), only symbols registered in the global Symbol registry via [`Symbol.for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for)符号，仅通过 `Symbol.for`

* Iterables containing serializable values 包含可序列化值的可迭代对象

    * [String 字符串](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

    * [Array 数组](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

    * [Map 地图](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

    * [Set 设置](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    * [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) and [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)TypedArray 和 ArrayBuffer

* [Date 日期](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

* [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) instances FormData 实例

* Plain [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object): those created with [object initializers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer), with serializable properties 普通对象：使用对象初始值设定项创建的对象，具有可序列化属性的对象

* Functions that are Server Actions 作为服务器操作的函数

* [Promises 承诺](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Notably, these are not supported:值得注意的是，不支持以下各项：

* React elements, or [JSX](https://react.dev/learn/writing-markup-with-jsx) React 元素或 JSX

* Functions, including component functions or any other function that is not a Server Action 函数，包括组件函数或不是服务器操作的任何其他函数

* [Classes 类](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript)

* Objects that are instances of any class (other than the built-ins mentioned) or objects with [a null prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#null-prototype_objects)作为任何类（上述内置函数除外）的实例的对象或具有 null 原型的对象

* Symbols not registered globally, ex. `Symbol('my new symbol')`未在全球范围内注册的符号，例如。 `Symbol('my new symbol')`

Supported serializable return values are the same as [serializable props](https://react.dev/reference/react/use-client#passing-props-from-server-to-client-components) for a boundary Client Component.支持的可序列化返回值与边界客户端组件的可序列化 props 相同。

## Usage  用法usage

### Server Actions in forms 表单中的服务器操作server-actions-in-forms

The most common use case of Server Actions will be calling server functions that mutate data. On the browser, the [HTML form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) is the traditional approach for a user to submit a mutation. With React Server Components, React introduces first-class support for Server Actions in [forms](https://react.dev/reference/react-dom/components/form).服务器操作最常见的用例是调用更改数据的服务器函数。在浏览器上，HTML 表单元素是用户提交变更的传统方法。在 React Server Components 中，React 引入了对表单中服务器操作的一流支持。

Here is a form that allows a user to request a username.下面是一个允许用户请求用户名的表单。

```
// App.js

async function requestUsername(formData) {

'use server';

const username = formData.get('username');

// ...

}

export default App() {

<form action={requestUsername}>

<input type="text" name="username" />

<button type="submit">Request</button>

</form>

}
```

In this example `requestUsername` is a Server Action passed to a `<form>`. When a user submits this form, there is a network request to the server function `requestUsername`. When calling a Server Action in a form, React will supply the form’s [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) as the first argument to the Server Action.在此示例 `requestUsername` 中，是传递给 的服务器操作 `<form>` 。当用户提交此表单时，会向服务器功能 `requestUsername` 发出网络请求。在表单中调用服务器操作时，React 会提供表单的 FormData 作为服务器操作的第一个参数。

By passing a Server Action to the form `action`, React can [progressively enhance](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) the form. This means that forms can be submitted before the JavaScript bundle is loaded.通过将 Server Action 传递给表单，React 可以逐步增强表单 `action` 。这意味着可以在加载 JavaScript 包之前提交表单。

#### Handling return values in forms 处理表单中的返回值handling-return-values

In the username request form, there might be the chance that a username is not available. `requestUsername` should tell us if it fails or not.在用户名请求表单中，用户名可能不可用。 `requestUsername` 应该告诉我们它是否失败。

To update the UI based on the result of a Server Action while supporting progressive enhancement, use [`useFormState`](https://react.dev/reference/react-dom/hooks/useFormState).要根据服务器操作的结果更新 UI，同时支持渐进式增强，请使用 `useFormState` 。

```
// requestUsername.js

'use server';

export default async function requestUsername(formData) {

const username = formData.get('username');

if (canRequest(username)) {

// ...

return 'successful';

}

return 'failed';

}
```

```
// UsernameForm.js

'use client';

import {useFormState} from 'react-dom';

import requestUsername from './requestUsername';

function UsernameForm() {

const [returnValue, action] = useFormState(requestUsername, 'n/a');

return (

<>

<form action={action}>

<input type="text" name="username" />

<button type="submit">Request</button>

</form>

<p>Last submission request returned: {returnValue}</p>

</>

);

}
```

Note that like most Hooks, `useFormState` can only be called in [client code](https://react.dev/reference/react/use-client).请注意，像大多数 Hook 一样， `useFormState` 只能在客户端代码中调用。

### Calling a Server Action outside of `<form>`在 `<form>` 外部调用服务器操作 calling-a-server-action-outside-of-form

Server Actions are exposed server endpoints and can be called anywhere in client code.服务器操作是公开的服务器终结点，可以在客户端代码中的任何位置调用。

When using a Server Action outside of a [form](https://react.dev/reference/react-dom/components/form), call the Server Action in a [transition](https://react.dev/reference/react/useTransition), which allows you to display a loading indicator, show [optimistic state updates](https://react.dev/reference/react/useOptimistic), and handle unexpected errors. Forms will automatically wrap Server Actions in transitions.在窗体外部使用服务器操作时，请在转换中调用服务器操作，这允许您显示加载指示器、显示乐观状态更新以及处理意外错误。表单将自动在过渡中包装服务器操作。

```
import incrementLike from './actions';

import { useState, useTransition } from 'react';

function LikeButton() {

const [isPending, startTransition] = useTransition();

const [likeCount, setLikeCount] = useState(0);

const onClick = () => {

startTransition(async () => {

const currentCount = await incrementLike();

setLikeCount(currentCount);

});

};

return (

<>

<p>Total Likes: {likeCount}</p>

<button onClick={onClick} disabled={isPending}>Like</button>;

</>

);

}
```

```
// actions.js

'use server';

let likeCount = 0;

export default async incrementLike() {

likeCount++;

return likeCount;

}
```

To read a Server Action return value, you’ll need to `await` the promise returned.若要读取服务器操作返回值，需要返回 `await` promise。
