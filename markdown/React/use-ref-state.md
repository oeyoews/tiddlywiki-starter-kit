---
title: 'use-ref-state'
tags: ['React']
type: 'text/markdown'
---

# use-ref-state

`useState`和`useRef`是 React 中两个不同的 Hook 函数，它们有不同的用途和区别。

1. `useState`用于在函数组件中创建和管理状态。它返回一个包含当前状态值和一个用于更新状态的函数的数组。每当状态更新时，React 会重新渲染组件。

```javascript
import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  
  const handleIncrement = () => {
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
```

在上面的例子中，我们使用`useState`创建了一个名为`count`的状态变量，并将其初始值设置为 0。我们还使用`setCount`函数来更新`count`的值。每当按钮被点击时，`count`的值会增加 1，并且组件会重新渲染。

1. `useRef`用于在函数组件中创建可变的引用。Ref 对象在整个组件的生命周期中保持不变。它不能直接触发组件的重新渲染。

```javascript
import React, { useRef, useEffect } from 'react';

function MyComponent() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return (
    <input ref={inputRef} type="text" />
  );
}
```

在上面的例子中，我们使用`useRef`创建了一个名为`inputRef`的引用。我们将`inputRef`赋值给`<input>`元素的`ref`属性，以便可以在组件中引用该 DOM 元素。我们还使用`useEffect`钩子来确保在组件挂载后，将焦点设置在`<input>`元素上。

总结：

* `useState`用于创建和管理状态，每当状态更新时，组件会重新渲染。

* `useRef`用于创建可变的引用，它在整个组件的生命周期中保持不变，不能直接触发组件的重新渲染。它通常用于访问 DOM 元素、存储组件中的可变值或在函数组件之间共享数据。
