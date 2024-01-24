---
title: 'Strict_Mode_–_React'
tags: ['剪藏', 'React']
type: 'text/markdown'
created: 'Sun Nov 19 2023 07:15:25 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: 'oeyoews'
url: 'https://legacy.reactjs.org/docs/strict-mode.html#ensuring-reusable-state'
---

# Strict_Mode_–_React

* [`StrictMode`](https://react.dev/reference/react/StrictMode)

`StrictMode` is a tool for highlighting potential problems in an application. Like `Fragment`, `StrictMode` does not render any visible UI. It activates additional checks and warnings for its descendants.`StrictMode` 是一种用于突出显示应用程序中潜在问题的工具。Like `Fragment` ， `StrictMode` 不呈现任何可见的 UI。它为其后代激活额外的检查和警告。

> Note: 注意：
> 
> 
> Strict mode checks are run in development mode only; *they do not impact the production build*.严格模式检查仅在开发模式下运行;它们不会影响生产版本。

You can enable strict mode for any part of your application. For example:您可以为应用程序的任何部分启用严格模式。例如：

```
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>      <Footer />
    </div>
  );
}
```

In the above example, strict mode checks will *not* be run against the `Header` and `Footer` components. However, `ComponentOne` and `ComponentTwo`, as well as all of their descendants, will have the checks.在上面的示例中，不会对 `Header` 和 `Footer` 组件运行严格模式检查。但是，和 `ComponentTwo` 以及他们所有的后代， `ComponentOne` 都将有支票。

`StrictMode` currently helps with:`StrictMode` 目前有助于：

* Identifying components with unsafe lifecycles 识别具有不安全生命周期的组件

* Warning about legacy string ref API usage 有关旧字符串引用 API 使用情况的警告

* Warning about deprecated findDOMNode usage 关于弃用 findDOMNode 用法的警告

* Detecting unexpected side effects 检测意外的副作用

* Detecting legacy context API 检测旧上下文 API

* Ensuring reusable state 确保可重用状态

Additional functionality will be added with future releases of React.React 的未来版本将添加其他功能。

### identifying-unsafe-lifecyclesIdentifying unsafe lifecycles 识别不安全的生命周期

As explained [in this blog post](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html), certain legacy lifecycle methods are unsafe for use in async React applications. However, if your application uses third party libraries, it can be difficult to ensure that these lifecycles aren’t being used. Fortunately, strict mode can help with this! 正如这篇博文中所解释的，某些遗留的生命周期方法在异步 React 应用程序中使用是不安全的。但是，如果应用程序使用第三方库，则很难确保不使用这些生命周期。幸运的是，严格模式可以帮助解决这个问题！

When strict mode is enabled, React compiles a list of all class components using the unsafe lifecycles, and logs a warning message with information about these components, like so:启用严格模式后，React 会使用不安全的生命周期编译所有类组件的列表，并记录一条警告消息，其中包含有关这些组件的信息，如下所示：

[![](https://legacy.reactjs.org/static/e4fdbff774b356881123e69ad88eda88/1e088/strict-mode-unsafe-lifecycles-warning.png)](https://legacy.reactjs.org/static/e4fdbff774b356881123e69ad88eda88/1628f/strict-mode-unsafe-lifecycles-warning.png)

Addressing the issues identified by strict mode *now* will make it easier for you to take advantage of concurrent rendering in future releases of React.现在解决严格模式识别的问题将使你更容易在未来的 React 版本中利用并发渲染。

### warning-about-legacy-string-ref-api-usageWarning about legacy string ref API usage 有关旧字符串引用 API 使用情况的警告

Previously, React provided two ways for managing refs: the legacy string ref API and the callback API. Although the string ref API was the more convenient of the two, it had [several downsides](https://github.com/facebook/react/issues/1373) and so our official recommendation was to [use the callback form instead](https://legacy.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs).以前，React 提供了两种管理 ref 的方法：遗留的字符串 ref API 和回调 API。尽管字符串 ref API 是两者中更方便的，但它有几个缺点，因此我们的官方建议是改用回调表单。

React 16.3 added a third option that offers the convenience of a string ref without any of the downsides:React 16.3 添加了第三个选项，它提供了字符串 ref 的便利性，没有任何缺点：

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();  }

  render() {
    return <input type="text" ref={this.inputRef} />;  }

  componentDidMount() {
    this.inputRef.current.focus();  }
}
```

Since object refs were largely added as a replacement for string refs, strict mode now warns about usage of string refs.由于对象引用在很大程度上是作为字符串引用的替代品添加的，因此严格模式现在会警告字符串引用的使用。

> **Note: 注意：**
> 
> 
> Callback refs will continue to be supported in addition to the new `createRef` API.除了新的 `createRef` API 之外，还将继续支持回调引用。
> 
> 
> You don’t need to replace callback refs in your components. They are slightly more flexible, so they will remain as an advanced feature.您无需替换组件中的回调引用。它们稍微灵活一些，因此它们将保留为高级功能。

[Learn more about the new `createRef` API here.在此处了解有关新 `createRef` API 的更多信息。](https://legacy.reactjs.org/docs/refs-and-the-dom.html)

### warning-about-deprecated-finddomnode-usageWarning about deprecated findDOMNode usage 关于弃用 findDOMNode 用法的警告

React used to support `findDOMNode` to search the tree for a DOM node given a class instance. Normally you don’t need this because you can [attach a ref directly to a DOM node](https://legacy.reactjs.org/docs/refs-and-the-dom.html#creating-refs).React 曾经支持 `findDOMNode` 在树中搜索给定类实例的 DOM 节点。通常你不需要这个，因为你可以将 ref 直接附加到 DOM 节点。

`findDOMNode` can also be used on class components but this was breaking abstraction levels by allowing a parent to demand that certain children were rendered. It creates a refactoring hazard where you can’t change the implementation details of a component because a parent might be reaching into its DOM node. `findDOMNode` only returns the first child, but with the use of Fragments, it is possible for a component to render multiple DOM nodes. `findDOMNode` is a one time read API. It only gave you an answer when you asked for it. If a child component renders a different node, there is no way to handle this change. Therefore `findDOMNode` only worked if components always return a single DOM node that never changes.`findDOMNode` 也可以用于类组件，但这通过允许父级要求呈现某些子级来破坏抽象级别。它会产生重构风险，您无法更改组件的实现细节，因为父组件可能会访问其 DOM 节点。 `findDOMNode` 只返回第一个子节点，但通过使用 Fragments，一个组件可以渲染多个 DOM 节点。 `findDOMNode` 是一次性读取 API。它只在你提出要求时给你一个答案。如果子组件呈现不同的节点，则无法处理此更改。因此 `findDOMNode` ，仅当组件始终返回一个永不更改的 DOM 节点时才有效。

You can instead make this explicit by passing a ref to your custom component and pass that along to the DOM using [ref forwarding](https://legacy.reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components).相反，您可以通过将 ref 传递给自定义组件并使用 ref 转发将其传递给 DOM 来明确这一点。

You can also add a wrapper DOM node in your component and attach a ref directly to it.您还可以在组件中添加一个包装器 DOM 节点，并将 ref 直接附加到它。

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();  }
  render() {
    return <div ref={this.wrapper}>{this.props.children}</div>;  }
}
```

> Note: 注意：
> 
> 
> In CSS, the [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#display_contents) attribute can be used if you don’t want the node to be part of the layout.在 CSS 中，如果您不希望节点成为布局的一部分，则可以使用该 `display: contents` 属性。

### detecting-unexpected-side-effectsDetecting unexpected side effects 检测意外的副作用

Conceptually, React does work in two phases:从概念上讲，React 确实分为两个阶段：

* The **render** phase determines what changes need to be made to e.g. the DOM. During this phase, React calls `render` and then compares the result to the previous render.渲染阶段决定了需要对 DOM 进行哪些更改。在此阶段，React 调用 `render` 结果，然后将结果与之前的渲染进行比较。

* The **commit** phase is when React applies any changes. (In the case of React DOM, this is when React inserts, updates, and removes DOM nodes.) React also calls lifecycles like `componentDidMount` and `componentDidUpdate` during this phase.提交阶段是 React 应用任何更改的时候。（在 React DOM 的情况下，这是 React 插入、更新和删除 DOM 节点的时候。React 也在此阶段调用生命周期，例如 `componentDidMount` 和 `componentDidUpdate` 。

The commit phase is usually very fast, but rendering can be slow. For this reason, the upcoming concurrent mode (which is not enabled by default yet) breaks the rendering work into pieces, pausing and resuming the work to avoid blocking the browser. This means that React may invoke render phase lifecycles more than once before committing, or it may invoke them without committing at all (because of an error or a higher priority interruption).提交阶段通常非常快，但渲染速度可能很慢。出于这个原因，即将到来的并发模式（默认情况下尚未启用）将渲染工作分解为多个部分，暂停和恢复工作以避免阻塞浏览器。这意味着 React 可能会在提交之前多次调用渲染阶段生命周期，或者它可能在不提交的情况下调用它们（因为错误或更高优先级的中断）。

Render phase lifecycles include the following class component methods:渲染阶段生命周期包括以下类组件方法：

* `constructor`

* `componentWillMount` (or `UNSAFE_componentWillMount`)`componentWillMount` （或 `UNSAFE_componentWillMount` ）

* `componentWillReceiveProps` (or `UNSAFE_componentWillReceiveProps`)`componentWillReceiveProps` （或 `UNSAFE_componentWillReceiveProps` ）

* `componentWillUpdate` (or `UNSAFE_componentWillUpdate`)`componentWillUpdate` （或 `UNSAFE_componentWillUpdate` ）

* `getDerivedStateFromProps`

* `shouldComponentUpdate`

* `render`

* `setState` updater functions (the first argument)`setState` updater 函数（第一个参数）

Because the above methods might be called more than once, it’s important that they do not contain side-effects. Ignoring this rule can lead to a variety of problems, including memory leaks and invalid application state. Unfortunately, it can be difficult to detect these problems as they can often be [non-deterministic](https://en.wikipedia.org/wiki/Deterministic_algorithm).由于上述方法可能会被多次调用，因此它们不包含副作用非常重要。忽略此规则可能会导致各种问题，包括内存泄漏和无效的应用程序状态。不幸的是，很难检测到这些问题，因为它们通常是不确定的。

Strict mode can’t automatically detect side effects for you, but it can help you spot them by making them a little more deterministic. This is done by intentionally double-invoking the following functions:严格模式无法自动为您检测副作用，但它可以通过使它们更具确定性来帮助您发现它们。这是通过有意双重调用以下函数来完成的：

* Class component `constructor`, `render`, and `shouldComponentUpdate` methods 类组件 `constructor` 、 `render` 和 `shouldComponentUpdate` 方法

* Class component static `getDerivedStateFromProps` method 类组件静态 `getDerivedStateFromProps` 方法

* Function component bodies 功能组件主体

* State updater functions (the first argument to `setState`) 状态更新程序函数（的第一个 `setState` 参数）

* Functions passed to `useState`, `useMemo`, or `useReducer`传递给 `useState` 或 `useMemo` `useReducer` 的函数

> Note: 注意：
> 
> 
> This only applies to development mode. *Lifecycles will not be double-invoked in production mode.*这仅适用于开发模式。生命周期不会在生产模式下重复调用。

For example, consider the following code:例如，请考虑以下代码：

```
class TopLevelRoute extends React.Component {
  constructor(props) {
    super(props);

    SharedApplicationState.recordEvent('ExampleComponent');
  }
}
```

At first glance, this code might not seem problematic. But if `SharedApplicationState.recordEvent` is not [idempotent](https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning), then instantiating this component multiple times could lead to invalid application state. This sort of subtle bug might not manifest during development, or it might do so inconsistently and so be overlooked.乍一看，这段代码似乎没有问题。但是，如果 `SharedApplicationState.recordEvent` 不是幂等的，则多次实例化此组件可能会导致应用程序状态无效。这种微妙的错误可能不会在开发过程中显现出来，或者它可能不一致，因此被忽略。

By intentionally double-invoking methods like the component constructor, strict mode makes patterns like this easier to spot.通过有意双重调用组件构造函数等方法，严格模式使这样的模式更容易被发现。

> Note: 注意：
> 
> 
> In React 17, React automatically modifies the console methods like `console.log()` to silence the logs in the second call to lifecycle functions. However, it may cause undesired behavior in certain cases where [a workaround can be used](https://github.com/facebook/react/issues/20090#issuecomment-715927125).在 React 17 中，React 会自动修改控制台方法，例如 `console.log()` 在第二次调用生命周期函数时将日志静音。但是，在某些情况下，它可能会导致不良行为，而可以使用解决方法。
> 
> 
> Starting from React 18, React does not suppress any logs. However, if you have React DevTools installed, the logs from the second call will appear slightly dimmed. React DevTools also offers a setting (off by default) to suppress them completely.从 React 18 开始，React 不会抑制任何日志。但是，如果安装了 React DevTools，则第二次调用的日志将显示为略微变暗。React DevTools 还提供了一个设置（默认关闭）来完全抑制它们。

### detecting-legacy-context-apiDetecting legacy context API 检测旧上下文 API

The legacy context API is error-prone, and will be removed in a future major version. It still works for all 16.x releases but will show this warning message in strict mode:旧上下文 API 容易出错，并将在将来的主要版本中删除。它仍然适用于所有 16.x 版本，但在严格模式下会显示以下警告消息：

[![](https://legacy.reactjs.org/static/fca5c5e1fb2ef2e2d59afb100b432c12/1e088/warn-legacy-context-in-strict-mode.png)](https://legacy.reactjs.org/static/fca5c5e1fb2ef2e2d59afb100b432c12/51800/warn-legacy-context-in-strict-mode.png)

Read the [new context API documentation](https://legacy.reactjs.org/docs/context.html) to help migrate to the new version.阅读新的上下文 API 文档，以帮助迁移到新版本。

### ensuring-reusable-stateEnsuring reusable state  确保可重用状态

In the future, we’d like to add a feature that allows React to add and remove sections of the UI while preserving state. For example, when a user tabs away from a screen and back, React should be able to immediately show the previous screen. To do this, React will support remounting trees using the same component state used before unmounting.将来，我们想添加一个功能，允许 React 在保留状态的同时添加和删除 UI 的各个部分。例如，当用户离开屏幕并返回时，React 应该能够立即显示上一个屏幕。为此，React 将支持使用与卸载前相同的组件状态重新挂载树。

This feature will give React better performance out-of-the-box, but requires components to be resilient to effects being mounted and destroyed multiple times. Most effects will work without any changes, but some effects do not properly clean up subscriptions in the destroy callback, or implicitly assume they are only mounted or destroyed once.这个特性将为 React 提供更好的开箱即用性能，但要求组件能够灵活应对多次挂载和销毁的效果。大多数效果无需任何更改即可工作，但某些效果无法正确清理销毁回调中的订阅，或者隐式假定它们仅装载或销毁一次。

To help surface these issues, React 18 introduces a new development-only check to Strict Mode. This new check will automatically unmount and remount every component, whenever a component mounts for the first time, restoring the previous state on the second mount.为了帮助解决这些问题，React 18 在严格模式下引入了一个新的仅限开发的检查。每当组件首次挂载时，此新检查将自动卸载并重新挂载每个组件，从而在第二次挂载时恢复以前的状态。

To demonstrate the development behavior you’ll see in Strict Mode with this feature, consider what happens when React mounts a new component. Without this change, when a component mounts, React creates the effects:为了演示您将在严格模式下看到此功能的开发行为，请考虑当 React 挂载新组件时会发生什么。如果没有此更改，当组件挂载时，React 会创建以下效果：

```
* React mounts the component.
  * Layout effects are created.
  * Effects are created.
```

With Strict Mode starting in React 18, whenever a component mounts in development, React will simulate immediately unmounting and remounting the component:在 React 18 中开始严格模式时，每当一个组件在开发中挂载时，React 都会模拟立即卸载和重新挂载该组件：

```
* React mounts the component.
    * Layout effects are created.
    * Effects are created.
* React simulates effects being destroyed on a mounted component.
    * Layout effects are destroyed.
    * Effects are destroyed.
* React simulates effects being re-created on a mounted component.
    * Layout effects are created
    * Effect setup code runs
```

On the second mount, React will restore the state from the first mount. This feature simulates user behavior such as a user tabbing away from a screen and back, ensuring that code will properly handle state restoration.在第二次挂载时，React 将恢复第一次挂载的状态。此功能模拟用户行为，例如用户在屏幕外切换并返回，确保代码能够正确处理状态还原。

When the component unmounts, effects are destroyed as normal:当组件卸载时，效果会像往常一样被销毁：

```
* React unmounts the component.
  * Layout effects are destroyed.
  * Effects are destroyed.
```

Unmounting and remounting includes:卸载和重新安装包括：

* `componentDidMount`

* `componentWillUnmount`

* `useEffect`

* `useLayoutEffect`

* `useInsertionEffect`

> Note: 注意：
> 
> 
> This only applies to development mode, *production behavior is unchanged*.这仅适用于开发模式，生产行为不变。

For help supporting common issues, see:有关支持常见问题的帮助，请参阅：

* [How to support Reusable State in Effects 如何在效果中支持可重用状态](https://github.com/reactwg/react-18/discussions/18)
