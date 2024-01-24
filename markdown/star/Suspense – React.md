---
title: 'Suspense – React'
tags: ['剪藏']
type: 'text/markdown'
created: 'Wed Dec 20 2023 07:07:45 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://react.dev/reference/react/Suspense'
---

# Suspense – React

`<Suspense>` lets you display a fallback until its children have finished loading.`<Suspense>` 允许您显示回退，直到其子级完成加载。

```
<Suspense fallback={<Loading />}>

<SomeComponent />

</Suspense>
```

* Reference  参考

    * `<Suspense>`

* Usage  用法

    * Displaying a fallback while content is loading 在加载内容时显示回退

    * Revealing content together at once 一次一起显示内容

    * Revealing nested content as it loads 在加载嵌套内容时显示嵌套内容

    * Showing stale content while fresh content is loading 在加载新内容时显示陈旧内容

    * Preventing already revealed content from hiding 防止已泄露的内容被隐藏

    * Indicating that a transition is happening 表示正在发生转换

    * Resetting Suspense boundaries on navigation 重置导航上的悬念边界

    * Providing a fallback for server errors and client-only content 为服务器错误和仅限客户端的内容提供回退

* Troubleshooting  故障 排除

    * How do I prevent the UI from being replaced by a fallback during an update？如何防止 UI 在更新期间被回退替换？

---

## Reference  参考reference

### `<Suspense>` suspense

#### Props  道具props

* `children`: The actual UI you intend to render. If `children` suspends while rendering, the Suspense boundary will switch to rendering `fallback`.`children` ：要呈现的实际 UI。如果 `children` 在渲染时挂起，则悬念边界将切换到渲染 `fallback` 。

* `fallback`: An alternate UI to render in place of the actual UI if it has not finished loading. Any valid React node is accepted, though in practice, a fallback is a lightweight placeholder view, such as a loading spinner or skeleton. Suspense will automatically switch to `fallback` when `children` suspends, and back to `children` when the data is ready. If `fallback` suspends while rendering, it will activate the closest parent Suspense boundary.`fallback` ：如果实际 UI 尚未完成加载，则用于代替实际 UI 进行渲染的备用 UI。任何有效的 React 节点都是可以接受的，但在实践中，回退是轻量级的占位符视图，例如加载微调器或骨架。Suspense 将自动切换到 `fallback` 挂起时间 `children` ，并切换回数据准备就绪 `children` 时。如果 `fallback` 在渲染时挂起，它将激活最接近的父悬念边界。

#### Caveats  警告caveats

* React does not preserve any state for renders that got suspended before they were able to mount for the first time. When the component has loaded, React will retry rendering the suspended tree from scratch.React 不会为在首次挂载之前被挂起的渲染保留任何状态。当组件加载完毕后，React 将重试从头开始渲染挂起的树。

* If Suspense was displaying content for the tree, but then it suspended again, the `fallback` will be shown again unless the update causing it was caused by [`startTransition`](https://react.dev/reference/react/startTransition) or [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue).如果 Suspense 正在显示树的内容，但随后它再次挂起，则将再次显示， `fallback` 除非导致它的更新是由 `startTransition` 或 `useDeferredValue` 引起的。

* If React needs to hide the already visible content because it suspended again, it will clean up [layout Effects](https://react.dev/reference/react/useLayoutEffect) in the content tree. When the content is ready to be shown again, React will fire the layout Effects again. This ensures that Effects measuring the DOM layout don’t try to do this while the content is hidden.如果 React 因为再次挂起而需要隐藏已经可见的内容，它将清理内容树中的布局效果。当内容准备好再次显示时，React 将再次触发布局 Effects。这可确保测量 DOM 布局的效果不会在隐藏内容时尝试执行此操作。

* React includes under-the-hood optimizations like *Streaming Server Rendering* and *Selective Hydration* that are integrated with Suspense. Read [an architectural overview](https://github.com/reactwg/react-18/discussions/37) and watch [a technical talk](https://www.youtube.com/watch?v=pj5N-Khihgc) to learn more.React 包括与 Suspense 集成的底层优化，例如 Streaming Server Rendering 和 Selective Hydration。阅读架构概述并观看技术讲座以了解更多信息。

---

## Usage  用法usage

### Displaying a fallback while content is loading 在加载内容时显示回退displaying-a-fallback-while-content-is-loading

You can wrap any part of your application with a Suspense boundary:您可以使用悬念边界包装应用程序的任何部分：

```
<Suspense fallback={<Loading />}>

<Albums />

</Suspense>
```

React will display your loading fallback until all the code and data needed by the children has been loaded.React 将显示你的加载回退，直到加载子项所需的所有代码和数据。

In the example below, the `Albums` component *suspends* while fetching the list of albums. Until it’s ready to render, React switches the closest Suspense boundary above to show the fallback—your `Loading` component. Then, when the data loads, React hides the `Loading` fallback and renders the `Albums` component with data.在下面的示例中， `Albums` 组件在获取专辑列表时挂起。在准备好渲染之前，React 会切换上面最接近的 Suspense 边界来显示回退 - 你的 `Loading` 组件。然后，当数据加载时，React 会隐藏 `Loading` 回退并用数据渲染 `Albums` 组件。

### Note 注意

**Only Suspense-enabled data sources will activate the Suspense component.** They include:只有启用了 Suspense 的数据源才会激活 Suspense 组件。它们包括：

* Data fetching with Suspense-enabled frameworks like [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) and [Next.js](https://nextjs.org/docs/getting-started/react-essentials)使用支持 Suspense 的框架（如 Relay 和 Next.js）获取数据

* Lazy-loading component code with [`lazy`](https://react.dev/reference/react/lazy)延迟加载组件代码 `lazy`

* Reading the value of a Promise with [`use`](https://react.dev/reference/react/use)阅读 `use` Promise 的价值

Suspense **does not** detect when data is fetched inside an Effect or event handler.Suspense 不会检测何时在 Effect 或事件处理程序中获取数据。

The exact way you would load data in the `Albums` component above depends on your framework. If you use a Suspense-enabled framework, you’ll find the details in its data fetching documentation.在上面的 `Albums` 组件中加载数据的确切方式取决于你的框架。如果您使用启用了 Suspense 的框架，则可以在其数据提取文档中找到详细信息。

Suspense-enabled data fetching without the use of an opinionated framework is not yet supported. The requirements for implementing a Suspense-enabled data source are unstable and undocumented. An official API for integrating data sources with Suspense will be released in a future version of React.尚不支持在不使用固执框架的情况下启用悬念的数据提取。实现启用了 Suspense 的数据源的要求不稳定且未记录。用于将数据源与 Suspense 集成的官方 API 将在 React 的未来版本中发布。

---

### Revealing content together at once 一次一起显示内容revealing-content-together-at-once

By default, the whole tree inside Suspense is treated as a single unit. For example, even if *only one* of these components suspends waiting for some data, *all* of them together will be replaced by the loading indicator:默认情况下，Suspense 中的整个树被视为一个单元。例如，即使这些组件中只有一个挂起等待某些数据，它们也会一起被加载指示器替换：

```
<Suspense fallback={<Loading />}>

<Biography />

<Panel>

<Albums />

</Panel>

</Suspense>
```

Then, after all of them are ready to be displayed, they will all appear together at once.然后，在它们都准备好显示后，它们将同时一起出现。

In the example below, both `Biography` and `Albums` fetch some data. However, because they are grouped under a single Suspense boundary, these components always“pop in”together at the same time.在下面的示例中，两者都 `Biography` `Albums` 获取了一些数据。但是，由于它们被分组到单个悬念边界下，因此这些组件总是同时“弹出”在一起。

Components that load data don’t have to be direct children of the Suspense boundary. For example, you can move `Biography` and `Albums` into a new `Details` component. This doesn’t change the behavior. `Biography` and `Albums` share the same closest parent Suspense boundary, so their reveal is coordinated together.加载数据的组件不必是 Suspense 边界的直接子级。例如，您可以移动 `Biography` 并 `Albums` 进入新 `Details` 组件。这不会改变行为。 `Biography` 并 `Albums` 共享相同的最接近的父级悬念边界，因此它们的揭示是协调在一起的。

```
<Suspense fallback={<Loading />}>

<Details artistId={artist.id} />

</Suspense>

function Details({ artistId }) {

return (

<>

<Biography artistId={artistId} />

<Panel>

<Albums artistId={artistId} />

</Panel>

</>

);

}
```

---

### Revealing nested content as it loads 在加载嵌套内容时显示嵌套内容revealing-nested-content-as-it-loads

When a component suspends, the closest parent Suspense component shows the fallback. This lets you nest multiple Suspense components to create a loading sequence. Each Suspense boundary’s fallback will be filled in as the next level of content becomes available. For example, you can give the album list its own fallback:当组件挂起时，最接近的父 Suspense 组件会显示回退。这使您可以嵌套多个 Suspense 组件以创建加载序列。随着下一级别内容的可用，每个悬念边界的回退都将被填充。例如，您可以为专辑列表提供自己的回退：

```
<Suspense fallback={<BigSpinner />}>

<Biography />

<Suspense fallback={<AlbumsGlimmer />}>

<Panel>

<Albums />

</Panel>

</Suspense>

</Suspense>
```

With this change, displaying the `Biography` doesn’t need to “wait” for the `Albums` to load.通过此更改，显示 `Biography` 不需要“等待”加载 `Albums` 。

The sequence will be: 顺序将是：

1. If `Biography` hasn’t loaded yet, `BigSpinner` is shown in place of the entire content area.如果 `Biography` 尚未加载， `BigSpinner` 则显示代替整个内容区域。

1. Once `Biography` finishes loading, `BigSpinner` is replaced by the content.完成加载后 `Biography` ， `BigSpinner` 将替换为内容。

1. If `Albums` hasn’t loaded yet, `AlbumsGlimmer` is shown in place of `Albums` and its parent `Panel`.如果 `Albums` 尚未加载， `AlbumsGlimmer` 则显示代替 `Albums` 和 其父级 `Panel` 。

1. Finally, once `Albums` finishes loading, it replaces `AlbumsGlimmer`.最后，一旦 `Albums` 完成加载，它将替换 `AlbumsGlimmer` .

Suspense boundaries let you coordinate which parts of your UI should always“pop in”together at the same time, and which parts should progressively reveal more content in a sequence of loading states. You can add, move, or delete Suspense boundaries in any place in the tree without affecting the rest of your app’s behavior.通过悬念边界，可以协调 UI 的哪些部分应始终同时“弹出”在一起，以及哪些部分应在加载状态序列中逐步显示更多内容。您可以在树中的任意位置添加、移动或删除 Suspense 边界，而不会影响应用的其余行为。

Don’t put a Suspense boundary around every component. Suspense boundaries should not be more granular than the loading sequence that you want the user to experience. If you work with a designer, ask them where the loading states should be placed—it’s likely that they’ve already included them in their design wireframes.不要在每个组件周围设置悬念边界。悬念边界不应比您希望用户体验的加载顺序更精细。如果您与设计人员合作，请询问他们应该将加载状态放置在何处，因为他们可能已经将它们包含在设计线框图中。

---

### Showing stale content while fresh content is loading 在加载新内容时显示陈旧内容showing-stale-content-while-fresh-content-is-loading

In this example, the `SearchResults` component suspends while fetching the search results. Type `"a"`, wait for the results, and then edit it to `"ab"`. The results for `"a"` will get replaced by the loading fallback.在此示例中 `SearchResults` ，组件在获取搜索结果时挂起。键入 `"a"` ，等待结果，然后将其编辑为 `"ab"` 。的结果 `"a"` 将被加载回退所取代。

A common alternative UI pattern is to *defer* updating the list and to keep showing the previous results until the new results are ready. The [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue) Hook lets you pass a deferred version of the query down:一种常见的替代 UI 模式是延迟更新列表并继续显示以前的结果，直到新结果准备就绪。 `useDeferredValue` Hook 允许您向下传递查询的延迟版本：

```
export default function App() {

const [query, setQuery] = useState('');

const deferredQuery = useDeferredValue(query);

return (

<>

<label>

        Search albums:

<input value={query} onChange={e => setQuery(e.target.value)} />

</label>

<Suspense fallback={<h2>Loading...</h2>}>

<SearchResults query={deferredQuery} />

</Suspense>

</>

);

}
```

The `query` will update immediately, so the input will display the new value. However, the `deferredQuery` will keep its previous value until the data has loaded, so `SearchResults` will show the stale results for a bit.将 `query` 立即更新，因此输入将显示新值。但是，在加载数据之前，将 `deferredQuery` 保留其以前的值，因此 `SearchResults` 将显示过时的结果一段时间。

To make it more obvious to the user, you can add a visual indication when the stale result list is displayed:为了让用户更明显，您可以在显示过时的结果列表时添加视觉指示：

```
<div style={{

opacity: query !== deferredQuery ? 0.5 : 1 

}}>

<SearchResults query={deferredQuery} />

</div>
```

Enter `"a"` in the example below, wait for the results to load, and then edit the input to `"ab"`. Notice how instead of the Suspense fallback, you now see the dimmed stale result list until the new results have loaded:在下面的示例中输入，等待结果加载，然后将输入 `"a"` 编辑为 `"ab"` .请注意，在加载新结果之前，您现在看到的不是 Suspense 回退，而是灰色的陈旧结果列表：

### Note 注意

Both deferred values and transitions let you avoid showing Suspense fallback in favor of inline indicators. Transitions mark the whole update as non-urgent so they are typically used by frameworks and router libraries for navigation. Deferred values, on the other hand, are mostly useful in application code where you want to mark a part of UI as non-urgent and let it“lag behind”the rest of the UI.延迟值和转换都允许您避免显示 Suspense 回退，而支持内联指标。转换将整个更新标记为非紧急更新，因此框架和路由器库通常使用它们进行导航。另一方面，延迟值在应用程序代码中非常有用，在这些代码中，您希望将 UI 的一部分标记为非紧急，并让它“滞后”于 UI 的其余部分。

---

### Preventing already revealed content from hiding 防止已泄露的内容被隐藏preventing-already-revealed-content-from-hiding

When a component suspends, the closest parent Suspense boundary switches to showing the fallback. This can lead to a jarring user experience if it was already displaying some content. Try pressing this button:当组件挂起时，最接近的父级 Suspense 边界将切换为显示回退。如果它已经显示某些内容，这可能会导致不和谐的用户体验。尝试按下此按钮：

When you pressed the button, the `Router` component rendered `ArtistPage` instead of `IndexPage`. A component inside `ArtistPage` suspended, so the closest Suspense boundary started showing the fallback. The closest Suspense boundary was near the root, so the whole site layout got replaced by `BigSpinner`.当您按下该按钮时，组件将 `Router` 呈现 `ArtistPage` 而不是 `IndexPage` .内部 `ArtistPage` 的一个组件被挂起，因此最近的 Suspense 边界开始显示回退。最近的悬念边界靠近根，因此整个站点布局被替换为 `BigSpinner` 。

To prevent this, you can mark the navigation state update as a *transition* with [`startTransition`:](https://react.dev/reference/react/startTransition)为防止出现这种情况，可以使用以下命令将 `startTransition` 导航状态更新标记为过渡：

```
function Router() {

const [page, setPage] = useState('/');

function navigate(url) {

startTransition(() => {

setPage(url);      

});

}

// ...
```

This tells React that the state transition is not urgent, and it’s better to keep showing the previous page instead of hiding any already revealed content. Now clicking the button “waits” for the `Biography` to load:这告诉 React 状态转换并不紧急，最好继续显示上一页，而不是隐藏任何已经显示的内容。现在单击“等待” `Biography` 按钮加载：

A transition doesn’t wait for *all* content to load. It only waits long enough to avoid hiding already revealed content. For example, the website `Layout` was already revealed, so it would be bad to hide it behind a loading spinner. However, the nested `Suspense` boundary around `Albums` is new, so the transition doesn’t wait for it.过渡不会等待所有内容加载完毕。它只等待足够长的时间以避免隐藏已经显示的内容。例如，该网站 `Layout` 已经公开，因此将其隐藏在加载微调器后面会很糟糕。但是，周围的 `Albums` 嵌套 `Suspense` 边界是新的，因此转换不会等待它。

### Note 注意

Suspense-enabled routers are expected to wrap the navigation updates into transitions by default.默认情况下，启用了悬念的路由器应将导航更新包装到过渡中。

---

### Indicating that a transition is happening 表示正在发生转换indicating-that-a-transition-is-happening

In the above example, once you click the button, there is no visual indication that a navigation is in progress. To add an indicator, you can replace [`startTransition`](https://react.dev/reference/react/startTransition) with [`useTransition`](https://react.dev/reference/react/useTransition) which gives you a boolean `isPending` value. In the example below, it’s used to change the website header styling while a transition is happening:在上面的示例中，单击该按钮后，没有视觉指示正在进行导航。要添加指标，您可以将其 `useTransition` 替换为 `startTransition` 它为您提供一个布尔 `isPending` 值。在下面的示例中，它用于在进行转换时更改网站标题样式：

---

### Resetting Suspense boundaries on navigation 重置导航上的悬念边界resetting-suspense-boundaries-on-navigation

During a transition, React will avoid hiding already revealed content. However, if you navigate to a route with different parameters, you might want to tell React it is *different* content. You can express this with a `key`:在过渡期间，React 将避免隐藏已经显示的内容。但是，如果你导航到具有不同参数的路由，你可能想告诉 React 它是不同的内容。你可以用一个 `key` 来表达这一点：

```
<ProfilePage key={queryParams.id} />
```

Imagine you’re navigating within a user’s profile page, and something suspends. If that update is wrapped in a transition, it will not trigger the fallback for already visible content. That’s the expected behavior.想象一下，您正在用户的个人资料页面中导航，并且某些内容被挂起。如果该更新包装在过渡中，则不会触发已可见内容的回退。这是预期的行为。

However, now imagine you’re navigating between two different user profiles. In that case, it makes sense to show the fallback. For example, one user’s timeline is *different content* from another user’s timeline. By specifying a `key`, you ensure that React treats different users’profiles as different components, and resets the Suspense boundaries during navigation. Suspense-integrated routers should do this automatically.但是，现在假设您正在两个不同的用户配置文件之间导航。在这种情况下，显示回退是有意义的。例如，一个用户的时间线与另一个用户的时间线的内容不同。通过指定 `key` ，可以确保 React 将不同用户的配置文件视为不同的组件，并在导航过程中重置悬念边界。悬念集成路由器应自动执行此操作。

---

### Providing a fallback for server errors and client-only content 为服务器错误和仅限客户端的内容提供回退providing-a-fallback-for-server-errors-and-client-only-content

If you use one of the [streaming server rendering APIs](https://react.dev/reference/react-dom/server) (or a framework that relies on them), React will also use your `<Suspense>` boundaries to handle errors on the server. If a component throws an error on the server, React will not abort the server render. Instead, it will find the closest `<Suspense>` component above it and include its fallback (such as a spinner) into the generated server HTML. The user will see a spinner at first.如果你使用其中一个流服务器渲染 API（或依赖于它们的框架），React 也会使用你的 `<Suspense>` 边界来处理服务器上的错误。如果一个组件在服务器上抛出错误，React 不会中止服务器渲染。相反，它将在其上方找到最接近 `<Suspense>` 的组件，并将其回退（例如微调器）包含在生成的服务器 HTML 中。用户首先会看到一个微调器。

On the client, React will attempt to render the same component again. If it errors on the client too, React will throw the error and display the closest [error boundary.](https://react.dev/reference/react/Component#static-getderivedstatefromerror) However, if it does not error on the client, React will not display the error to the user since the content was eventually displayed successfully.在客户端上，React 将尝试再次渲染相同的组件。如果它在客户端上也出错，React 将抛出错误并显示最接近的错误边界。但是，如果它在客户端上没有错误，React 将不会向用户显示错误，因为内容最终成功显示。

You can use this to opt out some components from rendering on the server. To do this, throw an error in the server environment and then wrap them in a `<Suspense>` boundary to replace their HTML with fallbacks:您可以使用它来选择退出某些组件在服务器上的呈现。为此，请在服务器环境中抛出错误，然后将它们包装在 `<Suspense>` 边界中，以将其 HTML 替换为回退：

```
<Suspense fallback={<Loading />}>

<Chat />

</Suspense>

function Chat() {

if (typeof window === 'undefined') {

throw Error('Chat should only render on the client.');

}

// ...

}
```

The server HTML will include the loading indicator. It will be replaced by the `Chat` component on the client.服务器 HTML 将包含加载指示器。它将被客户端上的 `Chat` 组件替换。

---

## Troubleshooting  故障 排除troubleshooting

### How do I prevent the UI from being replaced by a fallback during an update？如何防止 UI 在更新期间被回退替换？preventing-unwanted-fallbacks

Replacing visible UI with a fallback creates a jarring user experience. This can happen when an update causes a component to suspend, and the nearest Suspense boundary is already showing content to the user.将可见 UI 替换为回退会造成不和谐的用户体验。当更新导致组件挂起，并且最近的 Suspense 边界已向用户显示内容时，可能会发生这种情况。

To prevent this from happening, mark the update as non-urgent using `startTransition`. During a transition, React will wait until enough data has loaded to prevent an unwanted fallback from appearing:为防止这种情况发生，请使用 `startTransition` 将更新标记为非紧急更新。在过渡期间，React 将等到加载了足够的数据，以防止出现不需要的回退：

```
function handleNextPageClick() {

// If this update suspends, don't hide the already displayed content

startTransition(() => {

setCurrentPage(currentPage + 1);

});

}
```

This will avoid hiding existing content. However, any newly rendered `Suspense` boundaries will still immediately display fallbacks to avoid blocking the UI and let the user see the content as it becomes available.这将避免隐藏现有内容。但是，任何新呈现 `Suspense` 的边界仍将立即显示回退，以避免阻塞 UI，并让用户在内容可用时查看内容。

**React will only prevent unwanted fallbacks during non-urgent updates**. It will not delay a render if it’s the result of an urgent update. You must opt in with an API like [`startTransition`](https://react.dev/reference/react/startTransition) or [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue).React 只会在非紧急更新期间防止不必要的回退。如果渲染是紧急更新的结果，则不会延迟渲染。您必须使用 API 选择加入 `useDeferredValue` ，例如 `startTransition` 或。

If your router is integrated with Suspense, it should wrap its updates into [`startTransition`](https://react.dev/reference/react/startTransition) automatically.如果您的路由器与 Suspense 集成，它应该会自动将其更新打包。 `startTransition`
