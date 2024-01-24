---
title: 'why-use-strict-mode'
tags: ['React']
type: 'text/markdown'
created: 'Sun Nov 19 2023 07:06:13 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# why-use-strict-mode

<https://github.com/facebook/react/issues/24502>

在 React 中，严格模式（Strict Mode）是一种开发模式，旨在帮助检测和纠正一些常见的问题，以提高应用的质量。它并不是用于生产环境的功能，而是为了在开发阶段更容易发现潜在的问题。

以下是一些 React 严格模式的优点和用途：

1. **识别副作用：** 严格模式下，React 会在组件渲染期间执行两次函数组件，并且会对不合理的副作用进行警告。这有助于开发者发现可能导致不稳定行为或副作用不一致的代码。

1. **检测过时的生命周期方法：** 严格模式下，React 会在使用已经过时的生命周期方法时发出警告，帮助开发者迁移到最新的生命周期方法。

1. **检测废弃的 API 使用：** React 会在检测到废弃的 API 使用时发出警告，以帮助开发者及早更新到新的 API。

1. **发现意外的副作用：** 严格模式下，一些副作用（如异步渲染中的副作用）会被更加敏感地检测，有助于避免一些潜在的问题。

使用严格模式是一种良好的实践，它有助于提高应用的可维护性和稳定性。在开发阶段，通过使用严格模式，开发者可以更早地发现并解决潜在的问题，从而减少在生产环境中出现意外错误的可能性。在生产环境中，严格模式并不会影响应用的性能，因此可以安全地关闭。

在 React 中，严格模式的一个方面是在异步渲染时更敏感地检测副作用。异步渲染是 React 中一种优化技术，可以将渲染工作分割成多个小任务，以提高性能。

在异步渲染中，如果某些副作用的执行时机不当，可能会导致意外的行为或错误。下面是一个简单的例子，展示了在异步渲染时可能出现的问题：

```jsx
import React, { useState, useEffect } from 'react';

function ExampleComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(); // 异步操作获取数据
  }, []);

  useEffect(() => {
    if (data) {
      console.log('Data has been updated:', data);
    }
  }, [data]);

  const fetchData = async () => {
    // 模拟异步操作
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setData('New Data');
  };

  return <div>Example Component</div>;
}

export default ExampleComponent;
```

在上面的例子中，我们有两个 `useEffect`。第一个用于在组件挂载时异步获取数据，第二个用于在数据更新时打印日志。然而，在异步渲染中，`fetchData` 中的异步操作可能导致第二个 `useEffect` 提前执行，因为它不会等待异步操作完成。

在严格模式下，React 会更敏感地检测到这种情况，并可能发出警告，提醒开发者需要注意异步操作对副作用的影响。这有助于防止在异步渲染中出现一些难以调试和处理的问题。
