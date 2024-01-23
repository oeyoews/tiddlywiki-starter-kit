---
title: 'oncefunction'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sun Dec 17 2023 04:49:23 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# oncefunction

```js
const once = (fn) => {
  let executed = false;
  return (...args) => {
    if (!executed) {
      executed = true;
      fn(...args);
    }
  };
};
```
