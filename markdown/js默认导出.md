---
title: 'js默认导出'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sat Sep 02 2023 09:12:24 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# js默认导出

```
```js
// mjs
export default {
  a: 1,
};

import aa from "./d.mjs";
console.log(aa.a);
```

<button>js</button>
```

```
```js
// cjs
module.exports = {
  a: 1,
};

const ab = require('./d.js')
console.log(ab.a);
```

<button>js</button>
```
