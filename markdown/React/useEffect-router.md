---
title: 'useEffect-router'
tags: ['React']
type: 'text/markdown'
---

# useEffect-router

是的，当路由发生变化时，`useEffect`也会触发。

`useEffect`是 React 中的一个副作用钩子函数，它在组件渲染完成后执行。它接收两个参数：一个是要执行的回调函数，另一个是用于控制它何时执行的依赖数组。

当依赖数组为空时，`useEffect`只会在组件首次渲染完成后执行一次。但是，如果依赖数组中包含了某些值，那么当这些值发生变化时，`useEffect`也会重新执行。

当路由发生变化时，通常会导致组件重新渲染。因此，如果你将路由相关的值添加到`useEffect`的依赖数组中，那么每当路由发生变化时，`useEffect`都会触发。

例如：

```jsx
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function MyComponent() {
  const history = useHistory();

  useEffect(() => {
    console.log("Route changed!");
  }, [history.location.pathname]);

  // 组件的其他代码...

  return (
    // 组件的 JSX...
  );
}

export default MyComponent;
```

在上面的示例中，当路由的路径名（`history.location.pathname`）发生变化时，`useEffect`回调函数会被调用，并打印出"Route changed!"的消息。这样，你可以在路由发生变化时执行一些逻辑或处理。
