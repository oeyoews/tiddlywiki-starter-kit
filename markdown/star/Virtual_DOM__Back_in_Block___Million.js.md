---
title: 'Virtual_DOM__Back_in_Block___Million.js'
tags: ['剪藏']
type: 'text/markdown'
created: 'Fri Dec 08 2023 07:29:43 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://million.dev/blog/virtual-dom'
---

# Virtual_DOM__Back_in_Block___Million.js

[![](https://million.dev/_next/image?url=%2Fback-in-block.webp&w=750&q=75)](https://www.youtube.com/watch?v=2-fR2rrmw3I)

---

\

[High-school student makes React a million times faster](https://www.youtube.com/embed/VkezQMb1DHw?enablejsapi=1&origin=https%3A%2F%2Fmillion.dev&widgetid=1)

---

A little over four years ago, Rich Harris released [Virtual DOM is pure overhead (opens in a new tab)](https://svelte.dev/blog/virtual-dom-is-pure-overhead)四年多前，Rich Harris 发布了 Virtual DOM is pure overhead, analyzing the performance of traditional virtual DOM manipulation.[0]，分析了传统虚拟 DOM 操作的性能。 [0]

> [0] “you’ve probably heard the phrase ‘the virtual DOM is fast’, often said to mean that it’s faster than the real DOM. It’s a surprisingly resilient meme” - Harris, 2018[0] “你可能听说过’虚拟 DOM 很快’这句话，通常说它比真正的 DOM 快。这是一个令人惊讶的弹性模因“——哈里斯，2018 年

In his article “Virtual DOM is pure overhead,” Rich Harris argues that the virtual DOM, a widely praised feature of frameworks like React, is not as efficient as many developers believe. He goes on to critique the way it works and presents an alternative approach.Rich Harris 在他的文章“虚拟 DOM 是纯粹的开销”中认为，虚拟 DOM 是 React 等框架的一个广受赞誉的特性，并不像许多开发人员认为的那样高效。他继续批评了它的工作方式，并提出了另一种方法。

But what followed years after was the emergence of a new meme: that the virtual DOM **is pure overhead**. The meme became so resilient that it turned the “no virtual DOM” framework movement from an iconoclastic subgroup to a fully fledged crusade.但几年后，出现了一种新的模因：虚拟 DOM 纯粹是开销。这个模因变得如此有弹性，以至于它把“无虚拟 DOM”框架运动从一个反传统的子群体变成了一个成熟的十字军东征。

Thus, the virtual DOM was relegated to the “annoying cousin nobody likes but has to invite to family gatherings” status. It became necessary evil, a performance tax that we had to pay for the convenience of declarative UIs.因此，虚拟 DOM 被降级为“没人喜欢但必须邀请参加家庭聚会的烦人表弟”状态。它变成了必要的邪恶，为了声明式 UI 的便利性，我们必须支付性能税。

Until now. 直到现在。

## Origin story 起源故事origin-story

The virtual DOM was created to address performance issues caused by frequent manipulation of the real DOM. It is a lightweight, in-memory representation of the real DOM, which can be later used as a reference to update the actual web page.创建虚拟 DOM 是为了解决频繁操作真实 DOM 导致的性能问题。它是真实 DOM 的轻量级内存表示，以后可以用作更新实际网页的参考。

When a component is rendered, the virtual DOM calculates the difference between the new state and the previous state (a process called “diffing”) and makes the minimal set of changes to the real DOM to bring it in sync with the updated virtual DOM (a process called “reconciliation”).当一个组件被渲染时，虚拟 DOM 会计算新状态和以前状态之间的差异（一个称为“diffing”的过程），并对真实 DOM 进行最少的更改，以使其与更新的虚拟 DOM 同步（一个称为“协调”的过程）。

### Visual Example 可视化示例visual-example

Let’s say we’re given some React component `<Numbers />`:假设我们得到了一些 React 组件 `<Numbers />` ：

When React renders this component, it will go through the process of diffing (checking for changes) and reconciliation (updating the DOM). The process looks something like this:当 React 渲染这个组件时，它将经历 diffing（检查更改）和 reconciliation（更新 DOM）的过程。该过程如下所示：

We diff the fifth node and find a difference. We make the update in the DOM and finish.

### The problem 问题the-problem

In the previous example, you can see that diffing depends on the size of the tree, ultimately resulting in the bottleneck of the virtual DOM. The more nodes you have, the more time it takes to diff.在前面的示例中，您可以看到差异取决于树的大小，最终导致虚拟 DOM 的瓶颈。您拥有的节点越多，差异所需的时间就越长。

With newer frameworks like Svelte, the virtual DOM isn’t even used because of the performance overhead. Instead, Svelte uses a technique called “dirty checking” to determine what has changed. Fine-grained reactivity frameworks like SolidJS take this a step further by pinpointing exactly what has changed and updating only that part of the DOM.对于像 Svelte 这样的较新框架，由于性能开销，甚至不使用虚拟 DOM。相反，Svelte 使用一种称为“脏检查”的技术来确定发生了什么变化。像 SolidJS 这样的细粒度响应式框架更进一步，精确地指出了哪些变化并仅更新 DOM 的那部分。

## The Block Virtual DOM 块虚拟 DOMthe-block-virtual-dom

In 2022, [Blockdom (opens in a new tab)](https://github.com/ged-odoo/blockdom) 2022 年，Blockdom was released. Taking a fundamentally different approach, Blockdom introduced the idea of a "block virtual DOM."被释放。Blockdom 采用了一种根本不同的方法，引入了“块虚拟 DOM”的概念。

The Block virtual DOM takes a different approach to diffing, and can be broken down into two parts:块虚拟 DOM 采用不同的差异方法，可以分为两部分：

1. **Static Analysis**: The virtual DOM is analyzed to extract dynamic parts of the tree into an “Edit Map,” or the list of the “edits” (mappings) of the dynamic parts of the virtual DOM to the state.静态分析：分析虚拟 DOM 以将树的动态部分提取到“编辑映射”中，或将虚拟 DOM 的动态部分的“编辑”（映射）列表提取到状态中。

1. **Dirty Checking**: The state (**not** the virtual DOM tree) is diffed to determine what has changed. If the state has changed, the DOM is updated directly via the Edit Map.脏检查：对状态（不是虚拟 DOM 树）进行差异化，以确定更改的内容。如果状态已更改，则 DOM 将直接通过 Edit Map 进行更新。

Since Million.js takes a similar approach to Blockdom, we’ll be using Million.js syntax for the rest of this article.由于 Million.js 采用了与 Blockdom 类似的方法，因此我们将在本文的其余部分使用 Million.js 语法。

### Counter Example 计数器示例counter-example

Let’s take a look at a simple counter example and how it would be handled with Million.js:让我们看一个简单的计数器示例，以及如何使用 Million.js 处理它：

* 5

* 6

### Static Analysis 静态分析static-analysis

The static analysis step can occur at compile time or the first thing at runtime, depending on whether you use Million.js’ experimental compiler or not.静态分析步骤可以在编译时发生，也可以在运行时首先发生，这取决于你是否使用 Million.js 的实验性编译器。

This step is responsible for extracting dynamic parts of the virtual DOM into the Edit Map.此步骤负责将虚拟 DOM 的动态部分提取到编辑映射中。

Instead of rendering the JSX with React, we render it using Million.js, which passes “holes” (represented with “?”) to the virtual DOM. These holes will act as placeholders for dynamic content and are used during static analysis.我们没有使用 React 渲染 JSX，而是使用 Million.js 渲染它，它将“孔”（用“？”表示）传递给虚拟 DOM。这些孔将充当动态内容的占位符，并在静态分析期间使用。

### Dirty Checking 脏检查dirty-checking

After the Edit Map is created, the dirty checking step can begin. This step is responsible for determining what has changed in the state, and updating the DOM accordingly.创建编辑地图后，可以开始脏检查步骤。此步骤负责确定状态中发生了哪些更改，并相应地更新 DOM。

Instead of diffing by element, we can just diff `prop1` and `prop2`. Since both have associations to their respective nodes with the “Edit Mapping” we created during static analysis, once we determine a difference, we can directly update the DOM.我们可以不按元素区分，而是区分 ‘prop1’ 和 ‘prop2’。由于两者都与我们在静态分析期间创建的“编辑映射”相关联，因此一旦我们确定差异，我们就可以直接更新 DOM。

You can see that the dirty checking example takes much less computation than the diffing step. This is because the dirty checking step is only concerned with the state, not the virtual DOM, as each virtual node might need many levels of recursion to determine if it has changed, state just needs a shallow equality check.您可以看到，脏检查示例比差异步骤花费的计算量少得多。这是因为脏检查步骤只与状态有关，而不与虚拟 DOM 有关，因为每个虚拟节点可能需要许多级别的递归来确定它是否已更改，状态只需要一个浅层的相等性检查。

## Is this technique effective？这种技术有效吗？is-this-technique-effective

**Yes, but it’s not a silver bullet.** [(View latest benchmark) (opens in a new tab)](https://krausest.github.io/js-framework-benchmark/2023/table_chrome_112.0.5615.49.html)是的，但这不是灵丹妙药。（查看最新基准）

Million.js sports pretty high performance and is able to outperform React in the JavaScript Framework Benchmark. But it’s important to understand how Million.js can be fast in this case.Million.js 具有相当高的性能，并且能够在 JavaScript 框架基准测试中超越 React。但重要的是要了解在这种情况下 Million.js 如何快速。

The JavaScript Framework Benchmark is a benchmark that tests the performance of frameworks by rendering a large table of rows and columns. The benchmark is designed to test the performance of highly unrealistic performance tests (like adding/replacing 1000 rows), and is not necessarily representative of real world applications.JavaScript 框架基准测试是一个基准测试，它通过呈现一个包含行和列的大型表来测试框架的性能。该基准测试旨在测试高度不切实际的性能测试（如添加/替换 1000 行）的性能，并不一定代表实际应用程序。

So where can Million.js or the block virtual DOM be used？那么 Million.js 或块虚拟 DOM 可以在哪里使用呢？

### Lots of static content with little dynamic content 静态内容多，动态内容少lots-of-static-content-with-little-dynamic-content

Block virtual DOM is best used when there is a lot of static content with little dynamic content. The biggest advantage the block virtual DOM has is that it doesn’t need to think about the static parts of the virtual DOM, so if it can skip over a lot of static content, it can be very fast.当静态内容较多而动态内容很少时，最好使用块虚拟 DOM。块虚拟 DOM 最大的优点是它不需要考虑虚拟 DOM 的静态部分，所以如果它能跳过很多静态内容，它可以非常快。

For example, the block virtual DOM would be much faster than the regular virtual DOM in this case:例如，在这种情况下，块虚拟 DOM 将比常规虚拟 DOM 快得多：

But you may not see much difference between the block virtual DOM and the regular virtual DOM if you have a lot of dynamic content:但是，如果你有很多动态内容，你可能看不到块虚拟 DOM 和常规虚拟 DOM 之间的太大区别：

If you’re building an admin dashboard, or a website of components with lots of static content, the block virtual DOM might be a good fit for you. But if you’re building a website where the computation it takes to diff the data is significantly greater than the computation it takes to diff the virtual DOM, you might not see much of a difference.如果您正在构建一个管理仪表板，或者一个包含大量静态内容的组件网站，那么块虚拟 DOM 可能非常适合您。但是，如果你正在构建一个网站，其中差异数据所需的计算量明显大于差异虚拟 DOM 所需的计算量，那么你可能不会看到太大的差异。

For example, this component would be a **bad** candidate for the block virtual DOM, since there are more data values to diff than there are virtual DOM nodes:例如，对于块虚拟 DOM 来说，这个组件将不是一个糟糕的候选者，因为要比较的数据值比虚拟 DOM 节点多：

### “Stable” UI trees “稳定”UI 树stable-ui-trees

The block virtual DOM is also good for “stable” UI trees, or UI trees that don’t change much. This is because the Edit Map is only created once, and shouldn’t need to be recreated on every render.块虚拟 DOM 也适用于“稳定”的 UI 树，或变化不大的 UI 树。这是因为编辑贴图只创建一次，不需要在每次渲染时重新创建。

For example, the following component would be a good candidate for the block virtual DOM:例如，以下组件是块虚拟 DOM 的良好候选者：

But this component might be *slower* than the regular virtual DOM:但是这个组件可能比常规的虚拟 DOM 慢：

If you need to use undeterministic / unstable returns that follow a “List-like” shape, you can use the [`<For />`](https://million.dev/docs/quickstart#for-) component to help you:如果您需要使用遵循“列表状”形状的不确定/不稳定的返回，您可以使用该 `<For />` 组件来帮助您：

Notice how there is a limitation on how the application UI can be structured. “Stable” returns mean that components with non-list-like dynamic shapes (like a conditional return in the same component) are not allowed.请注意，应用程序 UI 的结构存在限制。“稳定”返回意味着不允许使用具有非列表式动态形状的组件（如同一组件中的条件返回）。

### Use granularly 精细使用use-granularly

One of the biggest mistakes beginners make is using the block virtual DOM everywhere. This is a bad idea, because the block virtual DOM is not a silver bullet, and is not always faster than the regular virtual DOM.初学者犯的最大错误之一是到处使用块虚拟 DOM。这是一个坏主意，因为块虚拟 DOM 不是灵丹妙药，而且并不总是比常规虚拟 DOM 快。

Instead, you should recognize certain patterns where the block virtual DOM is faster, and use it only in those cases. For example, you might use the block virtual DOM for a large table, but use the regular virtual DOM for a small form with a little static content.相反，您应该识别块虚拟 DOM 更快的某些模式，并仅在这些情况下使用它。例如，您可以将块虚拟 DOM 用于大型表，但将常规虚拟 DOM 用于具有少量静态内容的小窗体。

## Closing Thoughts 结束语closing-thoughts

The block virtual DOM offers a fresh perspective on the virtual DOM concept, providing an alternative approach to managing updates and minimizing overhead. Despite its potential, it is not a one-size-fits-all solution, and developers should evaluate the specific needs and performance requirements of their applications before deciding whether to adopt this approach.块虚拟 DOM 为虚拟 DOM 概念提供了一个全新的视角，为管理更新和最小化开销提供了一种替代方法。尽管它很有潜力，但它并不是一个放之四海而皆准的解决方案，开发人员在决定是否采用这种方法之前，应该评估其应用程序的特定需求和性能要求。

For many applications, the conventional virtual DOM may be sufficient, and there may be no need to switch to the block virtual DOM or other performance-focused frameworks. If your application runs smoothly without performance issues on most devices, it might not be worth the time and effort to transition to a different framework. It’s essential to carefully weigh the trade-offs and evaluate your application’s unique requirements before making any major changes to your tech stack.对于许多应用程序来说，传统的虚拟 DOM 可能就足够了，可能不需要切换到块虚拟 DOM 或其他以性能为中心的框架。如果您的应用程序在大多数设备上都能顺利运行，没有性能问题，那么可能不值得花费时间和精力来过渡到不同的框架。在对技术堆栈进行任何重大更改之前，必须仔细权衡利弊并评估应用程序的独特要求。

That said, I’m excited to see what the future holds for it. Are you too? ([Go build your own! (opens in a new tab)](https://github.com/aidenybai/hundred#readme)也就是说，我很高兴看到它的未来会怎样。你也是吗？（去建造你自己的！)

[Discuss on Twitter 在 Twitter 上讨论 (opens in a new tab)](https://twitter.com/search?q=https%3A%2F%2Fmillion.dev%2Fblog%2Fvirtual-dom) | [Edit on GitHub (opens in a new tab)](https://github.com/aidenybai/million/blob/main/website/pages/blog/virtual-dom.mdx)|在 GitHub 上修改

### Acknowledgements 确认acknowledgements

* [Seb Lorber 塞布·洛伯 (opens in a new tab)](https://twitter.com/sebastienlorber) for suggesting this post idea 提出这个帖子的想法

* [Jesse Pense 杰西·彭斯 (opens in a new tab)](https://twitter.com/JessePence5) for helping read and edit the post 帮助阅读和编辑帖子

* [Dan Jutan 丹·菊潭 (opens in a new tab)](https://twitter.com/jutanium) for making the [fastest investment of 2023 (opens in a new tab)](https://twitter.com/jutanium/status/1652907080330665984)进行 2023 年最快的投资

* [Rich Harris 里奇·哈里斯 (opens in a new tab)](https://twitter.com/Rich_Harris)'s "Virtual DOM is pure overhead"的“虚拟 DOM 是纯粹的开销”

* [Dan Abramov 丹·阿布拉莫夫 (opens in a new tab)](https://twitter.com/dan_abramov)'s "React as a UI runtime"的“React as a UI runtime”

* [Ryan Carniato 瑞安·卡尼亚托 (opens in a new tab)](https://twitter.com/RyanCarniato)'s "Components are Pure Overhead"的“组件是纯粹的开销”

* [Chung Wu 吴忠 (opens in a new tab)](https://twitter.com/chungwu)'s "How React server components work: an in-depth guide"的“React 服务器组件如何工作：深入指南”
