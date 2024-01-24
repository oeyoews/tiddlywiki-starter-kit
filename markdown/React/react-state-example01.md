---
title: 'react-state-example01'
tags: ['React']
type: 'text/markdown'
created: 'Sun Apr 30 2023 11:09:41 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# react-state-example01

在 React 中，Provider 是一个高阶组件，用于向组件树中的所有子组件传递共享的数据或状态。Provider 接受一个名为 “value” 的 prop，该 prop 包含要共享的数据或状态。然后，Provider 将该值传递给其所有子组件，这些子组件可以通过使用 Consumer 组件来访问该值。

以下是一个示例，演示如何在 React 中使用 Provider 和 Consumer：

```jsx
import React from 'react';

// 创建一个上下文
const MyContext = React.createContext();

// 创建一个 Provider 组件
class MyProvider extends React.Component {
  state = {
    data: 'Hello, world!'
  };

  render() {
    return (
      <MyContext.Provider value={this.state.data}>
        {this.props.children}
      </MyContext.Provider>
    );
```

在这个示例中，我们创建了一个上下文 MyContext，并使用 MyProvider 组件将状态数据 “Hello, world!” 传递给其所有子组件。然后，我们在 App 组件中使用 MyConsumer 组件来访问该值，并将其呈现为一个段落元素。这样，我们就成功地在组件树中共享了数据，并在子组件中使用 Consumer 组件来访问这些数据
