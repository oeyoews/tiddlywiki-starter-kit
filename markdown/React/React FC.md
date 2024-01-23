---
title: 'React FC'
tags: ['React']
type: 'text/markdown'
created: 'Sun Jul 09 2023 06:36:40 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# React FC

这段代码是使用 ES6 模块语法导入 React 库中的 FC（函数组件）组件。在 React 中，FC（FunctionComponent 的缩写）是一种定义函数组件的类型，它是一个接受 props 并返回 JSX 元素的函数。

通过这行代码导入 FC，你可以在代码中使用它来定义和使用函数组件，例如：

```jsx
import React, { FC } from 'react';

const MyComponent: FC = () => {
  return <div>Hello, World!</div>;
};

export default MyComponent;
```

FC 组件类型是使用 TypeScript 编写 React 代码时的通用约定之一，它有助于提供静态类型检查和代码补全的功能，让开发更加可靠和方便。
