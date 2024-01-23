---
title: 'scrollIntoView'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Jan 22 2024 09:06:10 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# scrollIntoView

`scrollIntoView` 是一个 JavaScript API，用于将元素滚动到可见区域。该方法被用于将页面滚动到包含指定元素的父容器中，以确保该元素在视图中可见。

基本用法如下：

```javascript
element.scrollIntoView();
```

这将使包含该元素的父容器滚动，以确保该元素出现在可见区域内。你还可以传递一个配置对象，以指定滚动行为的各种选项：

```javascript
element.scrollIntoView({
  behavior: 'smooth', // 平滑滚动
  block: 'start',      // 开始位置
  inline: 'nearest'    // 最靠近视口的位置
});
```
