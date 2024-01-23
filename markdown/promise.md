---
title: 'promise'
tags: ['JavaScript']
created: 'Wed May 03 2023 02:44:27 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
page-cover: 'https://source.unsplash.com/random?fm=blurhash&w=50&promise'
type: 'text/vnd.tiddlywiki'
---

# promise

Promise是一种用于异步编程的对象，可以将异步任务封装成一个Promise对象，并在异步任务完成后返回相应的结果或抛出错误。Promise对象有三种状态：Pending、Fulfilled和Rejected。当异步任务完成后，Promise对象会由Pending转换为Fulfilled或Rejected状态。

Promise对象通常包含两个方法：then和catch。then方法接受两个回调函数作为参数，分别表示异步任务成功和失败后的处理方式。catch方法用来捕获异步任务发生的错误，并进行相应的处理。

以下是一个Promise对象的基本使用示例：

```javascript
function asyncTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber > 0.5) {
        resolve(randomNumber);
      } else {
        reject(new Error("Random number is too small"));
      }
    }, 1000);
  });
}

asyncTask()
  .then(result => {
    console.log(`Async task successful, result: ${result}`);
  })
  .catch(error => {
    console.error(`Async task failed, error: ${error}`);
  });
```

在以上示例中，我们创建了一个名为asyncTask的异步任务，并将它封装成了一个Promise对象。在这个任务中，我们使用setTimeout模拟了一个耗时1秒的异步操作，并随机生成了一个数值，当数值大于0.5时，任务会成功完成并返回随机数值，否则任务会失败并抛出一个Error对象。

我们通过调用asyncTask方法来执行这个异步任务，并使用then和catch方法处理异步操作成功和失败的情况。当异步任务成功完成后，then方法会被调用，并接受异步操作返回的结果作为参数。当异步任务失败时，catch方法会被调用，并接受异步操作抛出的错误对象作为参数。

Promise对象可以方便地处理异步操作，避免了回调函数嵌套和代码复杂度增加的问题，因此在JavaScript中得到了广泛的应用。
