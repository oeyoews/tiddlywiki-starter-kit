---
title: 'useFormState_–_React'
tags: ['剪藏']
type: 'text/markdown'
created: 'Thu Nov 09 2023 03:02:16 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://react.dev/reference/react-dom/hooks/useFormState'
---

# useFormState_–_React

### Canary 金丝雀

The `useFormState` Hook is currently only available in React’s canary and experimental channels. Learn more about [release channels here](https://react.dev/community/versioning-policy#all-release-channels). In addition, you need to use a framework that supports [React Server Components](https://react.dev/reference/react/use-client) to get the full benefit of `useFormState`.`useFormState` Hook 目前仅在 React 的 Canary 和实验频道中可用。在此处了解有关发布渠道的更多信息。此外，您需要使用支持 React Server 组件的框架才能充分利用 `useFormState` .

`useFormState` is a Hook that allows you to update state based on the result of a form action.`useFormState` 是一个 Hook，允许您根据表单操作的结果更新状态。

```
const [state, formAction] = useFormState(fn, initialState);
```

* Reference  参考

    * `useFormState(action, initialState)`

* Usage  用法

    * Using information returned by a form action 使用表单操作返回的信息

* Troubleshooting  故障 排除

    * My action can no longer read the submitted form data 我的操作无法再读取提交的表单数据

---

## Reference  参考reference

### `useFormState(action, initialState)` useformstate

Call `useFormState` at the top level of your component to create component state that is updated [when a form action is invoked](https://react.dev/reference/react-dom/components/form). You pass `useFormState` an existing form action function as well as an initial state, and it returns a new action that you use in your form, along with the latest form state. The latest form state is also passed to the function that you provided.在组件的顶层调用以创建在调用 `useFormState` 表单操作时更新的组件状态。您传递 `useFormState` 现有的表单操作函数以及初始状态，它会返回您在表单中使用的新操作以及最新的表单状态。最新的窗体状态也会传递给您提供的函数。

```
import { useFormState } from "react-dom";

async function increment(previousState, formData) {

return previousState + 1;

}

function StatefulForm({}) {

const [state, formAction] = useFormState(increment, 0);

return (

<form>

{state}

<button formAction={formAction}>Increment</button>

</form>

)

}
```

The form state is the value returned by the action when the form was last submitted. If the form has not yet been submitted, it is the initial state that you pass.表单状态是上次提交表单时操作返回的值。如果表单尚未提交，则这是您通过的初始状态。

If used with a Server Action, `useFormState` allows the server’s response from submitting the form to be shown even before hydration has completed.如果与服务器操作一起使用， `useFormState` 则允许在冻结完成之前显示服务器提交表单的响应。

See more examples below. 请参阅下面的更多示例。

#### Parameters  参数parameters

* `fn`: The function to be called when the form is submitted or button pressed. When the function is called, it will receive the previous state of the form (initially the `initialState` that you pass, subsequently its previous return value) as its initial argument, followed by the arguments that a form action normally receives.`fn` ：提交表单或按下按钮时要调用的函数。调用该函数时，它将接收窗体的先前状态（最初是您传递的状态 `initialState` ，随后是其先前的返回值）作为其初始参数，后跟窗体操作通常接收的参数。

* `initialState`: The value you want the state to be initially. It can be any serializable value. This argument is ignored after the action is first invoked.`initialState` ：您希望状态初始的值。它可以是任何可序列化的值。首次调用操作后，将忽略此参数。

#### Returns  返回returns

`useFormState` returns an array with exactly two values:`useFormState` 返回一个正好有两个值的数组：

1. The current state. During the first render, it will match the `initialState` you have passed. After the action is invoked, it will match the value returned by the action.当前状态。在第一次渲染期间，它将匹配您传递的。 `initialState` 调用操作后，它将与操作返回的值匹配。

1. A new action that you can pass as the `action` prop to your `form` component or `formAction` prop to any `button` component within the form.一个新操作，您可以将其作为 prop 传递给您的 `form` 组件或 `formAction` `action` prop 传递给表单中的任何 `button` 组件。

#### Caveats  警告caveats

* When used with a framework that supports React Server Components, `useFormState` lets you make forms interactive before JavaScript has executed on the client. When used without Server Components, it is equivalent to component local state.当与支持 React Server 组件的框架一起使用时， `useFormState` 允许您在客户端上执行 JavaScript 之前使表单具有交互性。在没有服务器组件的情况下使用时，它等效于组件本地状态。

* The function passed to `useFormState` receives an extra argument, the previous or initial state, as its first argument. This makes its signature different than if it were used directly as a form action without using `useFormState`.传递给的函数 `useFormState` 接收一个额外的参数，即前一个或初始状态，作为其第一个参数。这使得它的签名不同于直接用作表单操作而不使用 `useFormState` .

---

## Usage  用法usage

### Using information returned by a form action 使用表单操作返回的信息using-information-returned-by-a-form-action

Call `useFormState` at the top level of your component to access the return value of an action from the last time a form was submitted.在组件的顶层调用 `useFormState` 以访问上次提交表单时操作的返回值。

```
import { useFormState } from 'react-dom';

import { action } from './actions.js';

function MyComponent() {

const [state, formAction] = useFormState(action, null);

// ...

return (

<form action={formAction}>

{/* ... */}

</form>

);

}
```

`useFormState` returns an array with exactly two items:`useFormState` 返回一个包含两个项目的数组：

1. The current state of the form, which is initially set to the initial state you provided, and after the form is submitted is set to the return value of the action you provided.表单的当前状态（最初设置为您提供的初始状态）在提交表单后设置为您提供的操作的返回值。

1. A new action that you pass to `<form>` as its `action` prop.作为其 `action` 道具传递到 `<form>` 的新操作。

When the form is submitted, the action function that you provided will be called. Its return value will become the new current state of the form.提交表单后，将调用您提供的操作函数。其返回值将成为表单的新当前状态。

The action that you provide will also receive a new first argument, namely the current state of the form. The first time the form is submitted, this will be the initial state you provided, while with subsequent submissions, it will be the return value from the last time the action was called. The rest of the arguments are the same as if `useFormState` had not been used 您提供的操作还将收到一个新的第一个参数，即表单的当前状态。首次提交表单时，这将是您提供的初始状态，而在后续提交时，它将是上次调用操作时的返回值。其余参数与 `useFormState` 未使用时相同

```
function action(currentState, formData) {

// ...

return 'next state';

}
```

## Troubleshooting  故障 排除troubleshooting

### My action can no longer read the submitted form data 我的操作无法再读取提交的表单数据my-action-can-no-longer-read-the-submitted-form-data

When you wrap an action with `useFormState`, it gets an extra argument *as its first argument*. The submitted form data is therefore its *second* argument instead of its first as it would usually be. The new first argument that gets added is the current state of the form.当您用 包装 `useFormState` 一个动作时，它会获得一个额外的参数作为它的第一个参数。因此，提交的表单数据是它的第二个参数，而不是通常的第一个参数。添加的第一个新参数是表单的当前状态。

```
function action(currentState, formData) {

// ...

}
```
