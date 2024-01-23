---
title: 'react-basic01'
tags: ['React']
type: 'text/markdown'
created: 'Tue May 02 2023 12:39:40 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# react-basic01

React 基础概念包括以下几个方面：

1. 组件：在 React 中，一切都是组件。组件是 React 应用程序的基本构建块，它可以接受输入（称为属性）并返回特定的输出。组件可以是函数型组件或类型组件。

1. 属性（Props）：组件可以通过属性来接收外部数据。属性是只读的，即子组件不能修改父组件传递过来的属性值。

1. 状态（State）：状态是组件内部的可变数据。它通常由组件自己管理，并且可以在组件生命周期中随时更改。当状态发生更改时，React 会自动重新渲染组件。

1. 生命周期：组件有不同的生命周期阶段，这些阶段分别是创建、更新和销毁。每个生命周期阶段都有对应的钩子函数，可以在特定的时刻执行特定的操作。例如，在组件创建时执行某些初始化操作，在组件销毁时清理资源等。

1. 虚拟 DOM：React 使用虚拟 DOM 来管理页面元素，它是一个轻量级的 JavaScript 对象。每次状态或属性更改时，React 都会重新计算虚拟 DOM 并比较它与上一次的版本之间的差异，然后仅对需要进行更新的部分进行实际 DOM 操作。

1. JSX：JSX 是一种将 HTML 和 JavaScript 结合起来的语法，可以让你直接在 JavaScript 中编写 HTML 代码，从而轻松创建 React 组件。例如：

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

以上就是 React 基础概念的简要介绍。理解了这些概念之后，你就可以开始构建基本的 React 应用程序了。
