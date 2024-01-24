---
title: 'useref-dom'
tags: ['React']
type: 'text/markdown'
created: 'Sat Nov 18 2023 02:52:58 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# useref-dom

在 React 中，通常不直接使用 `getElementById`，而是使用 React 的状态管理和组件化特性。React 提供了一种更现代、声明性的方式来处理 DOM 元素，而不需要直接操作 DOM。

如果你需要获取一个组件的引用，你可以使用 React 的 `ref` 属性。以下是一个简单的例子：

```jsx
import React, { useRef, useEffect } from 'react';

function MyComponent() {
  // 创建一个 ref
  const myElementRef = useRef(null);

  // 在组件加载后执行的副作用
  useEffect(() => {
    // 使用 ref.current 获取 DOM 元素
    const myElement = myElementRef.current;

    // 在这里可以执行其他操作，例如修改元素的样式、添加事件监听器等

    return () => {
      // 在组件卸载时执行清理操作
      // 例如移除事件监听器等
    };
  }, []); // 第二个参数是依赖数组，如果为空数组，则只在组件加载和卸载时执行

  return <div ref={myElementRef}>这是我的元素</div>;
}

export default MyComponent;
```

在这个例子中，`useRef` 创建了一个引用，然后将它绑定到 `div` 元素上。在 `useEffect` 中，你可以通过 `myElementRef.current` 来获取这个元素的引用，并进行相应的操作。

请注意，直接操作 DOM 的情况应该尽量避免，因为 React 的目标是通过状态管理和组件化来处理视图。直接操作 DOM 可能会导致应用的不稳定性和难以维护。
