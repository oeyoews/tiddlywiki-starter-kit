---
title: 'process.argv'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sun Sep 24 2023 02:15:31 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# process.argv

```
```js
// node main.js 1 2 3
const argv = process.argv.slice(2);
console.log([...argv]);
```

<button>js</button>
```
