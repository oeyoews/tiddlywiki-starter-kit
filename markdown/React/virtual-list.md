---
title: 'virtual-list'
tags: ['React', 'JavaScript']
type: 'text/markdown'
created: 'Wed Jan 24 2024 07:48:04 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# virtual-list

虚拟列表是一种优化大型数据集的常见方式，通常与滚动到底部加载更多数据结合使用。下面是一个简单的示例，使用React和React Hooks创建一个虚拟列表，并在滚动到底部时加载更多数据。

```jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';

const VirtualList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  const fetchData = async () => {
    // 模拟异步加载数据
    setIsLoading(true);
    const newData = await fetchMoreData(); // 你需要替换为实际的数据获取逻辑
    setData((prevData) => [...prevData, ...newData]);
    setIsLoading(false);
  };

  const handleScroll = useCallback(() => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight - 20 &&
      !isLoading
    ) {
      fetchData();
    }
  }, [isLoading]);

  useEffect(() => {
    // 初始加载数据
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      style={{
        height: '400px',
        overflowY: 'auto',
        border: '1px solid #ccc',
      }}
      onScroll={handleScroll}
    >
      <ul>
        {data.map((item, index) => (
          <li key={index} style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
            {item}
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

// 模拟异步加载更多数据的函数
const fetchMoreData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, index) => `Item ${index}`);
      resolve(newData);
    }, 1000);
  });
};

export default VirtualList;
```

在这个例子中，我们创建了一个 `VirtualList` 组件，它包含一个滚动容器（`<div>`）和一个虚拟列表。通过监控滚动事件，当用户滚动到底部时，触发 `fetchData` 函数加载更多数据。加载数据时，显示一个加载提示。

请注意，这只是一个简单的示例，实际项目中你需要根据你的需求进行调整。此外，`fetchMoreData` 函数是一个模拟异步加载更多数据的函数，你需要替换为实际的数据获取逻辑。
