---
title: 'ci-info-package'
tags: ['JavaScript']
created: 'Sun Sep 10 2023 13:55:15 GMT+0000 (GMT)'
type: 'text/vnd.tiddlywiki'
---

# ci-info-package

```js
import ci from 'ci-info';

switch (ci.name) {
  case 'VERCEL':
    console.log('Running on Vercel');
  case 'GITHUB':
    console.log('Running on Github');
  case 'isCI':
    console.log('Running on CI');
  default:
    console.log('Running locally');
}
```
