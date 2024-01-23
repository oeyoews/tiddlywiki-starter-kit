---
title: 'react-components'
tags: ['React']
created: 'Thu Jun 01 2023 13:39:38 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# react-components

在 React 中，组件是构建用户界面的基本单元。组件可以是函数组件或类组件。下面是它们的概述：

1. 函数组件：函数组件是一个接受 props 作为参数并返回 React 元素的纯函数。这种组件通常用于简单的 UI 呈现，不需要维护组件状态。例如：

```js
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

2. 类组件：类组件是一个继承自 React.Component 的 JavaScript 类，它可以包含状态和生命周期方法。类组件必须实现 render() 方法，该方法返回 React 元素。例如：

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

除了这两种常见的组件类型之外，还有一些其他类型的组件，例如高阶组件、渲染属性组件、容器组件等。但是，函数组件和类组件是 React 中最常用的两种组件类型。
