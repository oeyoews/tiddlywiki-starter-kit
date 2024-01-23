---
title: 'resolve-promise'
tags: ['JavaScript', 'ES6']
type: 'text/markdown'
created: 'Sun Sep 24 2023 06:29:43 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# resolve-promise

`resolve` 不是一个函数，而是 Promise 对象中的一个方法。它是 Promise 的内置方法之一，用于将一个 Promise 标记为已成功（fulfilled），并将一个值传递给与之关联的`.then`方法中的回调函数。

在 JavaScript 中，Promise 对象有三种状态：待定（pending）、已成功（fulfilled）、已拒绝（rejected）。`resolve`方法用于将一个待定的 Promise 状态转变为已成功的状态，并传递一个值作为成功的结果。

示例用法如下：

```javascript
const myPromise = new Promise((resolve, reject) => {
  // 一些异步操作，最终成功后调用 resolve
  setTimeout(() => {
    resolve("成功的结果");
  }, 1000);
});

myPromise.then((result) => {
  console.log(result); // 输出：成功的结果
});
```

在上面的示例中，`resolve`方法被调用，并将字符串"成功的结果"传递给了`.then`方法中的回调函数。这样，当 Promise 对象状态变为已成功时，`.then`中的回调函数就会被执行，并且可以访问到成功的结果。

总之，`resolve`是 Promise 对象的方法，用于标记 Promise 为已成功状态，并传递成功的结果。
