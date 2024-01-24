---
title: 'undo-state'
tags: ['React']
type: 'text/markdown'
created: 'Mon Nov 27 2023 02:19:23 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# undo-state

```tsx
import { create } from 'zustand';

const useUndoStore = create((set, get) => ({
  // 初始状态
  count: 0,
  // 撤销历史记录
  history: [],
  // 增加计数
  increment: () => {
    const { count, history } = get();
    // 更新状态
    set({ count: count + 1, history: [...history, count] });
  },
  decrement: () => {
    const { count, history } = get();
    // 更新状态
    set({ count: count - 1, history: [...history, count] });
  },
  // 撤销
  undo: () => {
    const { history } = get();
    if (history.length > 0) {
      const previousCount = history[history.length - 1];
      // 移除最后一条历史记录
      const newHistory = history.slice(0, -1);
      // 恢复到之前的状态
      set({ count: previousCount, history: newHistory });
    }
  },
}));

export default useUndoStore;
```
