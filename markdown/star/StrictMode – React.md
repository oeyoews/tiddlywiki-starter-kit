---
title: 'StrictMode – React'
tags: ['剪藏']
type: 'text/markdown'
created: 'Wed Dec 20 2023 07:06:43 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://react.dev/reference/react/StrictMode'
---

# StrictMode – React

`<StrictMode>` lets you find common bugs in your components early during development.`<StrictMode>` 允许您在开发过程中尽早发现组件中的常见错误。

```
<StrictMode>

<App />

</StrictMode>
```

* Reference  参考

    * `<StrictMode>`

* Usage  用法

    * Enabling Strict Mode for entire app 为整个应用启用严格模式

    * Enabling Strict Mode for a part of the app 为应用的一部分启用严格模式

    * Fixing bugs found by double rendering in development 修复开发中双重渲染发现的错误

    * Fixing bugs found by re-running Effects in development 修复在开发中重新运行效果时发现的错误

    * Fixing deprecation warnings enabled by Strict Mode 修复严格模式启用的弃用警告

---

## Reference  参考reference

### `<StrictMode>` strictmode

Use `StrictMode` to enable additional development behaviors and warnings for the component tree inside:用于 `StrictMode` 为内部的组件树启用其他开发行为和警告：

```
import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(

<StrictMode>

<App />

</StrictMode>

);
```

See more examples below. 请参阅下面的更多示例。

Strict Mode enables the following development-only behaviors:严格模式支持以下仅开发行为：

* Your components will re-render an extra time to find bugs caused by impure rendering.您的组件将重新渲染额外的时间，以查找由不纯渲染引起的错误。

* Your components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.您的组件将额外重新运行效果，以查找因缺少效果清理而导致的错误。

* Your components will be checked for usage of deprecated APIs.将检查您的组件是否使用了已弃用的 API。

#### Props  道具props

`StrictMode` accepts no props.`StrictMode` 不接受任何道具。

#### Caveats  警告caveats

* There is no way to opt out of Strict Mode inside a tree wrapped in `<StrictMode>`. This gives you confidence that all components inside `<StrictMode>` are checked. If two teams working on a product disagree whether they find the checks valuable, they need to either reach consensus or move `<StrictMode>` down in the tree.无法在包裹在 `<StrictMode>` 中的树内选择退出严格模式。这让您确信内部 `<StrictMode>` 的所有组件都已检查。如果两个开发产品的团队不同意他们是否认为检查有价值，他们需要达成共识或在树中向下移动 `<StrictMode>` 。

---

## Usage  用法usage

### Enabling Strict Mode for entire app 为整个应用启用严格模式enabling-strict-mode-for-entire-app

Strict Mode enables extra development-only checks for the entire component tree inside the `<StrictMode>` component. These checks help you find common bugs in your components early in the development process.严格模式允许对组件内的整个 `<StrictMode>` 组件树进行额外的仅开发检查。这些检查可帮助您在开发过程的早期发现组件中的常见错误。

To enable Strict Mode for your entire app, wrap your root component with `<StrictMode>` when you render it:若要为整个应用启用严格模式，请在渲染根组件时将其包装： `<StrictMode>`

```
import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(

<StrictMode>

<App />

</StrictMode>

);
```

We recommend wrapping your entire app in Strict Mode, especially for newly created apps. If you use a framework that calls [`createRoot`](https://react.dev/reference/react-dom/client/createRoot) for you, check its documentation for how to enable Strict Mode.我们建议将整个应用包装在严格模式下，尤其是对于新创建的应用。如果您使用的框架 `createRoot` 需要您，请查看其文档以了解如何启用严格模式。

Although the Strict Mode checks **only run in development,** they help you find bugs that already exist in your code but can be tricky to reliably reproduce in production. Strict Mode lets you fix bugs before your users report them.尽管严格模式检查仅在开发中运行，但它们可帮助您查找代码中已存在的 bug，但在生产中可靠地重现可能很棘手。严格模式允许您在用户报告错误之前修复错误。

### Note 注意

Strict Mode enables the following checks in development:严格模式在开发中启用以下检查：

* Your components will re-render an extra time to find bugs caused by impure rendering.您的组件将重新渲染额外的时间，以查找由不纯渲染引起的错误。

* Your components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.您的组件将额外重新运行效果，以查找因缺少效果清理而导致的错误。

* Your components will be checked for usage of deprecated APIs.将检查您的组件是否使用了已弃用的 API。

**All of these checks are development-only and do not impact the production build.所有这些检查仅用于开发，不会影响生产版本。**

---

### Enabling Strict Mode for a part of the app 为应用的一部分启用严格模式enabling-strict-mode-for-a-part-of-the-app

You can also enable Strict Mode for any part of your application:您还可以为应用程序的任何部分启用严格模式：

```
import { StrictMode } from 'react';

function App() {

return (

<>

<Header />

<StrictMode>

<main>

<Sidebar />

<Content />

</main>

</StrictMode>

<Footer />

</>

);

}
```

In this example, Strict Mode checks will not run against the `Header` and `Footer` components. However, they will run on `Sidebar` and `Content`, as well as all of the components inside them, no matter how deep.在此示例中，严格模式检查不会针对 `Header` 和 `Footer` 组件运行。但是，无论有多深，它们都会在 和 `Content` 以及它们内部的所有组件上运行 `Sidebar` 。

---

### Fixing bugs found by double rendering in development 修复开发中双重渲染发现的错误fixing-bugs-found-by-double-rendering-in-development

[React assumes that every component you write is a pure function.](https://react.dev/learn/keeping-components-pure) This means that React components you write must always return the same JSX given the same inputs (props, state, and context).React 假设你编写的每个组件都是一个纯函数。这意味着你编写的 React 组件必须始终返回相同的 JSX，给定相同的输入（props、state 和 context）。

Components breaking this rule behave unpredictably and cause bugs. To help you find accidentally impure code, Strict Mode calls some of your functions (only the ones that should be pure) **twice in development.** This includes:违反此规则的组件行为不可预测，并导致错误。为了帮助您发现意外的不纯代码，严格模式在开发过程中会调用某些函数（仅那些应该是纯函数的函数）两次。这包括：

* Your component function body (only top-level logic, so this doesn’t include code inside event handlers) 组件函数体（仅顶层逻辑，因此不包括事件处理程序中的代码）

* Functions that you pass to [`useState`](https://react.dev/reference/react/useState), [`set` functions](https://react.dev/reference/react/useState#setstate), [`useMemo`](https://react.dev/reference/react/useMemo), or [`useReducer`](https://react.dev/reference/react/useReducer)传递给 `useState` 、 `set` 函数或 `useMemo` `useReducer`

* Some class component methods like [`constructor`](https://react.dev/reference/react/Component#constructor), [`render`](https://react.dev/reference/react/Component#render), [`shouldComponentUpdate`](https://react.dev/reference/react/Component#shouldcomponentupdate) ([see the whole list](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)) 一些类组件方法，如 `constructor` ， ， `render` `shouldComponentUpdate` （查看完整列表）

If a function is pure, running it twice does not change its behavior because a pure function produces the same result every time. However, if a function is impure (for example, it mutates the data it receives), running it twice tends to be noticeable (that’s what makes it impure!) This helps you spot and fix the bug early.如果一个函数是纯函数，则运行它两次不会改变其行为，因为纯函数每次都会产生相同的结果。但是，如果一个函数是不纯的（例如，它改变了它接收到的数据），那么运行它两次往往会很明显（这就是它不纯的原因！这有助于您及早发现并修复错误。

**Here is an example to illustrate how double rendering in Strict Mode helps you find bugs early.下面是一个示例，用于说明严格模式下的双重渲染如何帮助您及早发现错误。**

This `StoryTray` component takes an array of `stories` and adds one last“Create Story”item at the end:该 `StoryTray` 组件采用一个数组， `stories` 并在末尾添加最后一个“创建故事”项：

There is a mistake in the code above. However, it is easy to miss because the initial output appears correct.上面的代码有误。但是，它很容易被遗漏，因为初始输出看起来是正确的。

This mistake will become more noticeable if the `StoryTray` component re-renders multiple times. For example, let’s make the `StoryTray` re-render with a different background color whenever you hover over it:如果 `StoryTray` 组件多次重新渲染，此错误将变得更加明显。例如，每当您将鼠标悬停在它上面时，让我们使用不同的背景颜色 `StoryTray` 重新渲染它：

Notice how every time you hover over the `StoryTray` component, “Create Story” gets added to the list again. The intention of the code was to add it once at the end. But `StoryTray` directly modifies the `stories` array from the props. Every time `StoryTray` renders, it adds “Create Story” again at the end of the same array. In other words, `StoryTray` is not a pure function—running it multiple times produces different results.请注意，每次将鼠标悬停在 `StoryTray` 组件上时，“创建故事”都会再次添加到列表中。代码的目的是在末尾添加一次。而是 `StoryTray` 直接从道具修改 `stories` 数组。每次渲染时 `StoryTray` ，它都会在同一数组的末尾再次添加“创建故事”。换句话说，它不是一个纯粹的函数， `StoryTray` 多次运行它会产生不同的结果。

To fix this problem, you can make a copy of the array, and modify that copy instead of the original one:若要解决此问题，可以创建数组的副本，并修改该副本而不是原始副本：

```
export default function StoryTray({ stories }) {

const items = stories.slice(); // Clone the array

// ✅ Good: Pushing into a new array

items.push({ id: 'create', label: 'Create Story' });
```

This would [make the `StoryTray` function pure.](https://react.dev/learn/keeping-components-pure) Each time it is called, it would only modify a new copy of the array, and would not affect any external objects or variables. This solves the bug, but you had to make the component re-render more often before it became obvious that something is wrong with its behavior.这将使 `StoryTray` 函数变得纯粹。每次调用它时，它只会修改数组的新副本，而不会影响任何外部对象或变量。这解决了错误，但您必须更频繁地重新渲染组件，然后才能发现其行为有问题。

**In the original example, the bug wasn’t obvious. Now let’s wrap the original (buggy) code in `<StrictMode>`:在原始示例中，该错误并不明显。现在让我们将原始（错误）代码包装在： `<StrictMode>`**

**Strict Mode *always* calls your rendering function twice, so you can see the mistake right away** (“Create Story” appears twice). This lets you notice such mistakes early in the process. When you fix your component to render in Strict Mode, you *also* fix many possible future production bugs like the hover functionality from before:严格模式总是调用你的渲染函数两次，所以你可以立即看到错误（“创建故事”出现两次）。这使您可以在流程的早期注意到此类错误。当您将组件修复为在严格模式下渲染时，您还会修复许多未来可能的生产错误，例如之前的悬停功能：

Without Strict Mode, it was easy to miss the bug until you added more re-renders. Strict Mode made the same bug appear right away. Strict Mode helps you find bugs before you push them to your team and to your users.如果没有严格模式，很容易错过错误，直到您添加更多重新渲染。严格模式使相同的错误立即出现。严格模式可帮助您在将 bug 推送给团队和用户之前发现它们。

[Read more about keeping components pure.阅读有关保持组件纯净的更多信息。](https://react.dev/learn/keeping-components-pure)

### Note 注意

If you have [React DevTools](https://react.dev/learn/react-developer-tools) installed, any `console.log` calls during the second render call will appear slightly dimmed. React DevTools also offers a setting (off by default) to suppress them completely.如果安装了 React DevTools，则第二次渲染调用期间的任何 `console.log` 调用都会略微变暗。React DevTools 还提供了一个设置（默认关闭）来完全抑制它们。

---

### Fixing bugs found by re-running Effects in development 修复在开发中重新运行效果时发现的错误fixing-bugs-found-by-re-running-effects-in-development

Strict Mode can also help find bugs in [Effects.](https://react.dev/learn/synchronizing-with-effects)严格模式还可以帮助查找效果中的错误。

Every Effect has some setup code and may have some cleanup code. Normally, React calls setup when the component *mounts* (is added to the screen) and calls cleanup when the component *unmounts* (is removed from the screen). React then calls cleanup and setup again if its dependencies changed since the last render.每个效果都有一些设置代码，也可能有一些清理代码。通常，React 在组件挂载（添加到屏幕）时调用 setup，在组件卸载（从屏幕中删除）时调用 cleanup。然后，如果 React 的依赖项自上次渲染以来发生了变化，则再次调用 cleanup 和 setup。

When Strict Mode is on, React will also run **one extra setup+cleanup cycle in development for every Effect.** This may feel surprising, but it helps reveal subtle bugs that are hard to catch manually.当严格模式开启时，React 还将在开发中为每个 Effect 运行一个额外的 setup+cleanup 周期。这可能会让人感到惊讶，但它有助于揭示难以手动捕获的细微错误。

**Here is an example to illustrate how re-running Effects in Strict Mode helps you find bugs early.以下示例说明了在严格模式下重新运行效果如何帮助您及早发现错误。**

Consider this example that connects a component to a chat:请考虑以下将组件连接到聊天的示例：

There is an issue with this code, but it might not be immediately clear.此代码存在问题，但可能不会立即清楚。

To make the issue more obvious, let’s implement a feature. In the example below, `roomId` is not hardcoded. Instead, the user can select the `roomId` that they want to connect to from a dropdown. Click“Open chat”and then select different chat rooms one by one. Keep track of the number of active connections in the console:为了使问题更加明显，让我们实现一个功能。在下面的示例中， `roomId` 未进行硬编码。相反，用户可以从下拉列表中选择要连接到的。 `roomId` 单击“打开聊天”，然后逐个选择不同的聊天室。跟踪控制台中的活动连接数：

You’ll notice that the number of open connections always keeps growing. In a real app, this would cause performance and network problems. The issue is that [your Effect is missing a cleanup function:](https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed)您会注意到，打开的连接数始终在不断增长。在实际应用中，这会导致性能和网络问题。问题是你的效果缺少清理功能：

```
useEffect(() => {

const connection = createConnection(serverUrl, roomId);

connection.connect();

return () => connection.disconnect();

}, [roomId]);
```

Now that your Effect“cleans up”after itself and destroys the outdated connections, the leak is solved. However, notice that the problem did not become visible until you’ve added more features (the select box).现在，您的效果器会自行“清理”并破坏过时的连接，泄漏问题就解决了。但是，请注意，在添加更多功能（选择框）之前，问题不会变得可见。

**In the original example, the bug wasn’t obvious. Now let’s wrap the original (buggy) code in `<StrictMode>`:在原始示例中，该错误并不明显。现在让我们将原始（错误）代码包装在： `<StrictMode>`**

**With Strict Mode, you immediately see that there is a problem** (the number of active connections jumps to 2). Strict Mode runs an extra setup+cleanup cycle for every Effect. This Effect has no cleanup logic, so it creates an extra connection but doesn’t destroy it. This is a hint that you’re missing a cleanup function.使用严格模式时，您会立即看到存在问题（活动连接数跳到 2）。严格模式为每个效果运行额外的设置 + 清理周期。此效果没有清理逻辑，因此它会创建一个额外的连接，但不会破坏它。这暗示您缺少清理功能。

Strict Mode lets you notice such mistakes early in the process. When you fix your Effect by adding a cleanup function in Strict Mode, you *also* fix many possible future production bugs like the select box from before:严格模式可让您在流程的早期注意到此类错误。当您通过在严格模式下添加清理功能来修复效果时，您还会修复许多未来可能的生产错误，例如之前的选择框：

Notice how the active connection count in the console doesn’t keep growing anymore.请注意，控制台中的活动连接计数不再继续增长。

Without Strict Mode, it was easy to miss that your Effect needed cleanup. By running *setup → cleanup → setup* instead of *setup* for your Effect in development, Strict Mode made the missing cleanup logic more noticeable.如果没有严格模式，很容易错过你的效果需要清理。通过在开发中运行设置→清理→设置而不是设置效果，严格模式使缺失的清理逻辑更加明显。

[Read more about implementing Effect cleanup.阅读有关实现效果清理的更多信息。](https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

---

### Fixing deprecation warnings enabled by Strict Mode 修复严格模式启用的弃用警告fixing-deprecation-warnings-enabled-by-strict-mode

React warns if some component anywhere inside a `<StrictMode>` tree uses one of these deprecated APIs:如果 `<StrictMode>` 树中任何位置的某个组件使用这些已弃用的 API 之一，React 会发出警告：

* [`findDOMNode`](https://react.dev/reference/react-dom/findDOMNode). [See alternatives.](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)`findDOMNode` 。查看替代项。

* `UNSAFE_` class lifecycle methods like [`UNSAFE_componentWillMount`](https://react.dev/reference/react/Component#unsafe_componentwillmount). [See alternatives.](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#migrating-from-legacy-lifecycles)`UNSAFE_` 类生命周期方法，如 `UNSAFE_componentWillMount` .查看替代项。

* Legacy context ([`childContextTypes`](https://react.dev/reference/react/Component#static-childcontexttypes), [`contextTypes`](https://react.dev/reference/react/Component#static-contexttypes), and [`getChildContext`](https://react.dev/reference/react/Component#getchildcontext)). [See alternatives.](https://react.dev/reference/react/createContext)旧上下文（ `childContextTypes` 、 `contextTypes` 和 `getChildContext` ）。查看替代项。

* Legacy string refs ([`this.refs`](https://react.dev/reference/react/Component#refs)). [See alternatives.](https://reactjs.org/docs/strict-mode.html#warning-about-legacy-string-ref-api-usage)旧字符串引用（ `this.refs` ）。查看替代项。

These APIs are primarily used in older [class components](https://react.dev/reference/react/Component) so they rarely appear in modern apps.这些 API 主要用于较旧的类组件中，因此它们很少出现在现代应用中。
