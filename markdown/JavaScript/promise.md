---
title: 'promise'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed May 03 2023 02:44:27 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# promise

:::abstract\

Promise 是一个构造函数， 所以使用的时候需要使用new 关键字。 当然Promise 也有一些静态方法， 比如Promise.all Promise.then\

:::

Promise是一种用于异步编程的对象，可以将异步任务封装成一个Promise对象，并在异步任务完成后返回相应的结果或抛出错误。

## Promise对象有三种状态

1. Pending

1. Fulfilled

1. Rejected

promise-status.mermaid

## Promise.all

* 只有当所有的任务都成功后， 才执行成功

## Promise.allSettled

* 只要所有的任务有结果就可以,无论成功还是失败。

## Promise.any

* 只要有一个成功就可以

## Promise.race

* 只要有一个结果就行， 无论成功还是失败。

## Promise.reject

* 返回一个状态为reject的Promise 对象

当异步任务完成后，Promise对象会由Pending转换为Fulfilled或Rejected状态。

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
