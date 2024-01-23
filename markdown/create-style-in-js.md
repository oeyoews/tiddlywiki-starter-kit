---
title: 'create-style-in-js'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Tue Dec 19 2023 12:54:24 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# create-style-in-js

```js
// Create a style element
    const style = document.createElement('style');
    // Append the CSS styles to the style element
    style.textContent = `
  .resizer {
    cursor: ew-resize;
    background-color: #f3f3f3;
    border-radius: 50%;
    height: 100%;
    width: 5px;
    position: absolute;
    top: 0;
    transition: all 0.2s ease;
  }
  .resizer:hover {
    background-color: #e5e5e5;
  }
  .dark .resizer {
    background-color: #666;
  }
  .dark .resizer:hover {
    background-color: #4d4d4d;
  }
`;
    // Append the style element to the document head
    document.head.appendChild(style);
```
