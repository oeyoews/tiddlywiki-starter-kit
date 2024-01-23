---
title: 'multi-useEffect'
tags: ['React']
type: 'text/markdown'
created: 'Sat Apr 29 2023 01:32:28 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# multi-useEffect

可以在同一个组件中使用多个 useEffect hook。每个 useEffect hook 是独立的，可以用于添加不同的副作用。

例如，您可能希望在组件挂载时初始化一些数据，然后在某些数据发生更改时更新其他数据。这可以通过在同一个组件中使用多个 useEffect hook 来实现。

以下是一个示例，其中一个 useEffect 用于初始化数据，另一个 useEffect 用于在 id 发生更改时更新数据：

```jsx
function MyComponent({ id }) {
  const [data, setData] = useState(null);

  // This effect runs once, when the component mounts
  useEffect(() => {
    // Initialize data
    setData(fetchData(id));
  }, [id]);

  // This effect runs whenever `id` changes
  useEffect(() => {
    // Update data
    setData(fetchData(id));
  }, [id]);

  // Render the component
  return <div>{data}</div>;
}
```

在此示例中，第一个 useEffect 在组件挂载时初始化 data，第二个 useEffect 在 id 更改时更新 data。这两个 useEffect 是独立的，它们可以在同一个组件中使用，而不会相互干扰。
