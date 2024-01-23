---
title: 'static-method'
tags: ['JavaScript']
created: 'Fri Jun 02 2023 16:09:31 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# static-method

```js
class MathUtils {
    static pi = 3.14159;
    static add(a, b) {
        return a + b;
    }
}

let pi = MathUtils.pi; // 访问静态常量
let sum = MathUtils.add(3, 5); // 调用静态方法
```
