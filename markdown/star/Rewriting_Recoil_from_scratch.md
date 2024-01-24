---
title: 'Rewriting_Recoil_from_scratch'
tags: ['剪藏']
type: 'text/markdown'
created: 'Sun Nov 26 2023 13:59:10 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://bennett.dev/recoil-from-scratch/'
---

# Rewriting_Recoil_from_scratch

Recoil is a slick new React library written by some people at Facebook that work on a tool called [“Comparison View.”](https://www.youtube.com/watch?v=_ISAA_Jt9kI) It came about because of ergonomics and [performance issues with context](https://github.com/facebook/react/issues/14620) and `useState`. It’s a very clever library, and almost everyone will find a use for it - check out this [explainer video](https://www.youtube.com/watch?v=_ISAA_Jt9kI) if you want to learn more.Recoil 是一个漂亮的新 React 库，由 Facebook 的一些人编写，他们使用一个名为“比较视图”的工具。它的出现是因为人体工程学和上下文和 `useState` 性能问题。这是一个非常聪明的库，几乎每个人都会发现它的用途 - 如果您想了解更多信息，请查看此解释器视频。

At first I was really taken aback by the talk of graph theory and the wondrous magic that Recoil performs, but after a while I started to see that maybe it’s not that special after all. Here’s my shot at implementing something similar! 起初，我真的被图论和 Recoil 执行的奇妙魔术吓了一跳，但过了一段时间，我开始发现它可能毕竟没有那么特别。这是我实现类似东西的镜头！

Before I get started, please note that the way I’ve implemented my Recoil clone is completely different to how the actual Recoil is implemented. Don’t assume anything about Recoil from this.在开始之前，请注意，我实现 Recoil 克隆的方式与实际 Recoil 的实现方式完全不同。不要从中假设任何关于 Recoil 的事情。

## Atoms 原子

Recoil is built around the concept of “atoms”. Atoms are small atomic pieces of state that you can subscribe to and update in your components.Recoil 是围绕“原子”的概念构建的。原子是可以在组件中订阅和更新的小原子状态片段。

To begin, I’m going to create a class called `Atom` that is going to wrap some value `T`. I’ve added helper methods `update` and `snapshot` to allow you to get and set the value.首先，我将创建一个名为 The Class 的类， `Atom` 该类将包装一些值 `T` 。我添加了帮助程序方法 `update` ，并 `snapshot` 允许您获取和设置值。

To listen for changes to the state, you need to use [the observer pattern](https://www.tutorialspoint.com/design_pattern/observer_pattern.htm). This is commonly seen in libraries like [RxJS](https://rxjs-dev.firebaseapp.com/guide/overview), but in this case I’m going to write a simple synchronous version from scratch.若要侦听状态的更改，需要使用观察者模式。这在 RxJS 等库中很常见，但在本例中，我将从头开始编写一个简单的同步版本。

To know who is listening to the state I use a `Set` of callbacks. A `Set` (or Hash Set) is a data structure that only contains unique items. In JavaScript it can easily be turned into an array and has helpful methods for quickly adding and removing items.为了知道谁在监听状态，我使用了 `Set` 回调。（ `Set` 或哈希集）是一种仅包含唯一项的数据结构。在 JavaScript 中，它可以很容易地转换为数组，并具有快速添加和删除项目的有用方法。

Adding a listener is done through the `subscribe` method. The subscribe method returns `Disconnecter` - an interface containing a method that will stop a listener from listening. This is called when a React component is unmounted and you no longer want to listen for changes.添加侦听器是通过该 `subscribe` 方法完成的。subscribe 方法返回 `Disconnecter` - 一个接口，其中包含一个将阻止侦听器侦听的方法。当 React 组件被卸载并且您不再想侦听更改时，就会调用此函数。

Next, a method called `emit` is added. This method loops through each of the listeners and gives them the current value in the state.接下来，添加一个调用 `emit` 的方法。此方法遍历每个侦听器，并为其提供状态中的当前值。

Finally I update the `update` method to emit the new values whenever the state is set.最后，我更新了方法， `update` 以便在设置状态时发出新值。

Phew! 唷！

It’s time to write the atom up into our React components. To do this, I’ve created a hook called `useCoiledValue`. ([sound familiar?](https://recoiljs.org/docs/api-reference/core/useRecoilValue/)) 是时候将原子写入我们的 React 组件了。为此，我创建了一个名为 `useCoiledValue` .（听起来很熟悉？

This hook returns the current state of an atom, and listens and re-renders whenever the value changes. Whenever the hook is unmounted, it disconnects the listener.此钩子返回原子的当前状态，并在值更改时侦听并重新呈现。每当钩子被卸载时，它都会断开侦听器的连接。

One thing that’s a little weird here is the `updateState` hook. By performing a set state with a new object reference (`{}`), React will re-render the component. This is a little bit of a hack, but it’s an easy way to make sure the component re-renders.这里有点奇怪的一件事是 `updateState` 钩子。通过使用新的对象引用（ `{}` ）执行设置状态，React 将重新渲染组件。这有点小问题，但它是确保组件重新渲染的简单方法。

Next I’ve added a `useCoiledState` method. This has a very similar API to `useState` - it gives you the current value of the state and allows you to set a new one.接下来，我添加了一个 `useCoiledState` 方法。这与 API 非常相似 `useState` - 它为您提供状态的当前值，并允许您设置新的值。

Now that we’ve got those hooks out of the road, it’s time to move onto Selectors. Before that though, let’s refactor what we’ve got a little bit.现在我们已经摆脱了这些钩子，是时候转向选择器了。不过，在此之前，让我们稍微重构一下我们所拥有的东西。

A selector is a stateful value, just like an atom. To make implementing them a bit easier, I’ll move most of the logic out of `Atom` into a base class called `Stateful`.选择器是一个有状态的值，就像一个原子一样。为了更容易实现它们，我将大部分逻辑移 `Atom` 出到一个名为 `Stateful` .

Moving on! 继续前进！

## Selectors 选择

A selector is Recoil’s version of “computed values” or “reducers”. In their [own words](https://recoiljs.org/docs/basic-tutorial/selectors):选择器是 Recoil 的“计算值”或“减速器”版本。用他们自己的话说：

> A selector represents a piece of derived state. You can think of derived state as the output of passing state to a pure function that modifies the given state in some way.选择器表示一段派生状态。您可以将派生状态视为将状态传递给以某种方式修改给定状态的纯函数的输出。

The API for selectors in Recoil is quite simple, you create an object with a method called `get` and whatever that method returns is the value of your state. Inside the `get` method you can subscribe to other pieces of state, and whenever they update so too will your selector.Recoil 中选择器的 API 非常简单，你使用一个调用 `get` 的方法创建一个对象，该方法返回的任何内容都是你的状态值。在 `get` 方法中，您可以订阅其他状态片段，每当它们更新时，您的选择器也会更新。

In our case, I’m going to rename the `get` method to be called `generator`. I’m calling it this because it’s essentially a factory function that’s supposed to generate the next value of the state, based on whatever is piped into it.在我们的例子中 `get` ，我将重命名要调用 `generator` 的方法。我之所以这样称呼它，是因为它本质上是一个工厂函数，它应该根据管道输入到它的任何内容生成状态的下一个值。

![](https://bennett.dev/img/atom-selector-flow-UXBYJ5SZ.png)

In code, we can capture this `generate` method with the following type signature.在代码中，我们可以使用以下类型签名来捕获此 `generate` 方法。

For those unfamilar with Typescript, it’s a function that takes a context object (`GeneratorContext`) as a parameter and returns some value `T`. This return value is what becomes the internal state of the selector.对于那些不熟悉 Typescript 的人来说，它是一个将上下文对象（ `GeneratorContext` ）作为参数并返回一些值 `T` 的函数。此返回值将成为选择器的内部状态。

What does the `GeneratorContext` object do?`GeneratorContext` 物体有什么作用？

Well that’s how selectors use other pieces of state when generating their own internal state. From now on I’ll refer to these pieces of state as “dependencies”.这就是选择器在生成自己的内部状态时使用其他状态的方式。从现在开始，我将这些状态称为“依赖项”。

Whenever someone calls the `get` method on the `GeneratorContext`, it adds a piece of state as a dependency. This means that whenever a dependency updates, so too will the selector.每当有人调用该 `get` 方法时 `GeneratorContext` ，它都会添加一段状态作为依赖项。这意味着每当依赖项更新时，选择器也会更新。

Here’s what creating a selector’s generate function might look like:以下是创建选择器的生成函数的样子：

With the generate function out of the way, let’s create the `Selector` class. This class should accept the generate function as a constructor parameter and use a `getDep` method on the class to return the value of the `Atom` dependencies.有了 generate 函数，让我们创建类 `Selector` 。此类应接受 generate 函数作为构造函数参数，并在类上使用 `getDep` 方法返回 `Atom` 依赖项的值。

You might notice in the constructor that I’ve written `super(undefined as any)`. This is because `super` must be the very first line in a derived class’s constructor. If it helps, in this case you can think of `undefined` as uninitialised memory.您可能会注意到，在我编写 `super(undefined as any)` 的构造函数中。这是因为 `super` 必须是派生类构造函数中的第一行。如果有帮助，在这种情况下，您可以将其 `undefined` 视为未初始化的内存。

This selector is only good for generating state once. In order to react to changes in the dependencies, we need to subscribe to them.此选择器仅适用于生成一次状态。为了对依赖项中的更改做出反应，我们需要订阅它们。

To do this, let’s update the `getDep` method to subscribe to the dependencies and call the `updateSelector` method. To make sure the selector only updates once per change, let’s keep track of the deps using a `Set`.为此，让我们更新方法以订阅依赖项并调用该 `getDep` `updateSelector` 方法。为确保选择器每次更改仅更新一次，让我们使用 `Set` .

The `updateSelector` method is very similar to the constructor in the previous example. It creates the `GeneratorContext`, runs the `generate` method and then uses the `update` method from the `Stateful` base class.该 `updateSelector` 方法与上一示例中的构造函数非常相似。它创建，运行该 `generate` 方法 `GeneratorContext` ，然后使用基类中 `update` `Stateful` 的方法。

Almost done! Recoil has some helper functions for creating atoms and selectors. Since most JavaScript devs consider classes evil, they’ll help mask our atrocities.快完成了！Recoil 有一些用于创建原子和选择器的辅助函数。由于大多数 JavaScript 开发人员认为类是邪恶的，因此它们将有助于掩盖我们的暴行。

One for creating an atom…一个用于创建原子…

And one for creating a selector…还有一个用于创建选择器…

Oh, remember that `useCoiledValue` hook from before? Let’s update that to accept selectors too:哦，还记得之前的那个 `useCoiledValue` 钩子吗？让我们更新它以接受选择器：

That’s it! We’ve done it! 🎉就是这样！我们做到了！🎉

Give yourself a pat on your back! 拍拍自己的背！

Finished? 完成？

For the sake of brevity (and in order to use that clickbaity “100 lines” title) I decided to omit comments, tests and examples. If you want a more thorough explanation (or want to play with examples), all that stuff is up in my [“recoil-clone” Github repository.](https://github.com/bennetthardwick/recoil-clone)为了简洁起见（为了使用点击率“100 行”标题），我决定省略评论、测试和示例。如果你想要一个更彻底的解释（或者想玩例子），所有这些东西都在我的“recoil-clone”Github 存储库中。

There’s also an [example site](https://100-line-recoil-clone.netlify.app/) live so you can test it out.还有一个示例站点，因此您可以对其进行测试。

## Conclusion 结论

I once read that all good software should be simple enough that anyone could rewrite it if they needed to. Recoil has a lot of features that I haven’t implemented here, but it’s exciting to see such a simple and intuitive design that *can* reasonably be implemented by hand.我曾经读到过，所有好的软件都应该足够简单，任何人都可以在需要时重写它。Recoil 有很多功能我在这里没有实现，但看到这样简单直观的设计可以合理地手工实现，真是令人兴奋。

Before you decide to roll my bootleg Recoil in production though, make sure you look into the following things:不过，在你决定在生产中推出我的盗版《Recoil》之前，请确保你研究了以下几点：

* Selectors never unsubscribe from the atoms. This means they’ll leak memory when you stop using them.选择器从不取消订阅原子。这意味着当您停止使用它们时，它们会泄漏内存。

* React [has introduced](https://github.com/facebook/react/pull/18000) a hook called `useMutableSource`. If you’re on a recent version of React you should use this instead of `setState` in `useCoiledValue`.React 引入了一个名为 `useMutableSource` .如果你使用的是最新版本的 React，你应该使用它而不是 `setState` `useCoiledValue` in .

* Selectors and Atoms only do a shallow comparison between states before re-rendering. In some cases it might make sense to change this to be a deep comparison.选择器和原子在重新渲染之前只在状态之间做浅层比较。在某些情况下，将其更改为深度比较可能是有意义的。

* Recoil uses a `key` field for each atom and selector which is used as metadata for a feature called “app-wide observation”. I included it despite not using it to keep the API familiar.Recoil 为每个原子和选择器使用一个 `key` 字段，该字段用作称为“应用程序范围观察”的功能的元数据。尽管我没有使用它来保持对 API 的熟悉，但我还是包含了它。

* Recoil supports async in selectors, this would be a massive undertaking so I’ve made sure to exclude it.Recoil 在选择器中支持异步，这将是一项艰巨的任务，所以我确保排除它。

Other than that, hopefully I’ve shown you that you don’t always have to look to a library when deciding on state management solutions. More often then not you can engineer something that perfectly fits your solution - [that’s how Recoil was born](https://recoiljs.org/docs/introduction/motivation) after all.除此之外，希望我已经向你展示了，在决定状态管理解决方案时，你不必总是寻找库。更多的时候，你无法设计出完全适合你的解决方案的东西——毕竟，这就是 Recoil 的诞生方式。

---

After writing this post I was shown the [jotai](https://github.com/react-spring/jotai) library. It’s for a very similar feature set to my clone and supports async! 写完这篇文章后，我看到了 jotai 图书馆。它的功能集与我的克隆非常相似，并支持异步！
