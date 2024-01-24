---
title: '理解_React_18_中的_useId_Hooks'
tags: ['剪藏']
type: 'text/markdown'
created: 'Thu Nov 30 2023 06:15:44 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://juejin.cn/post/7148349754789855239'
---

# 理解_React_18_中的_useId_Hooks

持续创作，加速成长！这是我参与「掘金日新计划 · 10 月更文挑战」的第 1 天，[点击查看活动详情](https://juejin.cn/post/7147654075599978532)

React 18 带有许多特性，例如自动批处理、并发和新的 Hooks。

这些 Hooks 通常都有非常明确的使用目的，比如 useTransition 用于处理 React 中的转换；useSyncExternalStore 用来读取外部数据源。

本文将深入探讨 useId，它的用途以及一些其他方案的对比。

## 同构：useId 和 random、uuid

同构是指在服务器端和客户端之间共享相同的代码，这意味着服务器端代码也可以在客户端运行。

React 支持开箱即用的同构，在同构应用中渲染列表时，如果我们没有一个唯一的 id，很多人习惯使用 Math.random 或类似 uuid 这样的库来生成一个唯一 id。但这些方法有一个共同的缺点：当程序运行时，由服务端生成的 uuid 或 Math.random 会和客户端生成的不同。

这种 id 不匹配会导致水合和可访问性的问题。

在 useId 之前，React 有一个 useOpaqueIdentifier Hook，它是 useId 的第一个版本，但是它有很多问题。经过 React 团队的重构，它被重命名为 useId。

useId 的作用非常简单，生成一个唯一且稳定的 id，可以在应用的服务端或客户端使用。useId 生成的 Id 无论是在服务器端还是客户端都是稳定的。

id 还负责处理可访问性问题，这意味着可访问性 API 可以使用这些 id 将组件链接在一起。使用 useId 也可以解决水合问题。

## useId 使用方法

使用 useId 非常简单，只需调用 useId，它会返回一个值，然后使用这个值就可以了。具体示例可以看下面的代码：

```
import { useId } from 'react';
import './App.css';

function App() {
  const firstId = useId();
  const secondId = useId()

  return <div className="App">
    <h3>The first id generated is {firstId}</h3>
    <h3>The second id generated is {secondId} and different from {firstId} </h3>
  </div>;
}

export default App;
```

首先从 React 导入 useId。接下来从 useId 中获取两个随机 id，并在我们的组件中显示这些 id。我们看到的页面应该如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6de53412775a466f8ff9debf7dfcef6c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 在表单中使用 useId

使用 useId 的另外一个场景是表单。

我们可以给 useId 添加附加信息，拼接出唯一的字符串。如下面的代码所示：

```
import { useId } from 'react';
import './App.css';
function App() {
  const firstId = useId();
  const secondId = useId();
  return (
    <div className="App">
      <form>
        <div>
          <label htmlFor={`${firstId}-email`}>Email</label>
          <input id={`${firstId}-email`} type="text" placeholder="Your email" />
        </div>
        <div>
          <label htmlFor={`${secondId}-password`}>Password</label>
          <input
            id={`${secondId}-password`}
            type="password"
            placeholder="Your password"
          />
        </div>
      </form>
    </div>
  );
}
export default App;
```

在上面的代码中，我们将附加信息附加到生成的 ID 中，比如 xx-email。这种方法可以将额外的信息添加到生成的 ID 中。

你可以看到下图所示的结果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/258e53deab554e708334aaae5b13ee2a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 什么时候使用 useId？什么时候不用？

我们现在已经了解了 useId 的用处；接下来要知道的事情就是要知道该在什么时候使用它，什么时候不使用它。

你应该在以下情况下使用 useId：

* 你想生成唯一 ID

* 你想要连接 HTML 元素，比如 label 和 input。

在以下情况下不应该使用 useId：

* 映射列表后需要 key。

* 你需要定位 CSS 选择器。useId 会返回一个包含冒号的字符串，如上面的示例所示。CSS 选择器不支持从 useId 中生成的字符串。

* 你正在使用不可变的值。
