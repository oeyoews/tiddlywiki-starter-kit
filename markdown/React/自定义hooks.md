---
title: '自定义hooks'
tags: ['React']
type: 'text/markdown'
created: 'Sat Dec 02 2023 07:28:26 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# 自定义hooks

自定义 Hooks 是 React 中的一项功能，它允许你提取组件中的状态逻辑，以便在不同组件之间共享和重用。通过自定义 Hooks，你可以将组件的状态逻辑从组件本身抽离出来，形成可独立测试、可复用的函数。

以下是自定义 Hooks 的一些关键特性和用法：

1. **以 “use” 开头：** 为了明确标识一个函数是自定义 Hook，按照 React 社区的约定，自定义 Hook 的函数名通常以 “use” 开头。

1. **提取状态逻辑：** 自定义 Hooks 主要用于提取和复用状态逻辑。这可以包括状态管理、副作用处理（如订阅和取消订阅事件）、数据获取等。

1. **独立性和可测试性：** 通过将状态逻辑提取为自定义 Hooks，你可以更轻松地进行单元测试，因为你可以单独测试这些 Hooks，而不需要渲染整个组件。

1. **共享状态逻辑：** 自定义 Hooks 可以在多个组件之间共享。这使得在不同组件中使用相同的状态逻辑变得简单，促使了逻辑的复用。

1. **Hook 规则：** 在自定义 Hooks 中可以使用其他 Hooks，但是有一些规则需要遵循。例如，自定义 Hooks 中不允许在条件语句中使用 Hooks，确保 Hook 的调用顺序在每次渲染中都是相同的。

以下是一个简单的例子，展示了如何使用自定义 Hook 来处理计数逻辑：

```javascript
import React, { useState } from 'react';

// 自定义 Hook，用于处理计数逻辑
function useCounter(initialCount) {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return { count, increment, decrement };
}

// 使用自定义 Hook 的组件
function CounterComponent() {
  const { count, increment, decrement } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

在这个例子中，`useCounter` 是一个自定义 Hook，处理了计数的状态逻辑。`CounterComponent` 组件使用了这个 Hook，并通过解构赋值获取计数值和操作函数。这样，计数逻辑可以在其他组件中被复用，而且它与组件的渲染逻辑是独立的。

:::warning\

自定义 Hook 共享的是状态逻辑，而不是状态本身\

:::
