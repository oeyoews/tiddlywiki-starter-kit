---
title: 'set-timeout-interval'
tags: ['JavaScript']
created: 'Tue May 30 2023 16:12:45 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
page-cover: 'https://source.unsplash.com/random?fm=blurhash&w=50&set-timeout-interval'
type: 'text/vnd.tiddlywiki'
---

# set-timeout-interval

好的，setTimeout() 和 setInterval() 都是 JavaScript 中的定时器方法，用来在指定的时间间隔后执行一段代码。它们的主要区别在于时间间隔的处理方式和执行次数的限制。

setTimeout() 方法会在指定的时间间隔后，执行一次指定的函数。它只会执行一次，不会重复执行。如果我们需要在一段时间后执行一次特定的操作，可以使用 setTimeout() 方法。

举个例子，我们可以编写一个名为 showMessage 的函数，用来显示一条消息。在该函数中，我们使用 setTimeout() 方法来延迟 3 秒钟后执行 showMesssage 函数：

```
function showMessage() {
  alert('Hello, World!');
}

setTimeout(showMessage, 3000);
```

在这个例子中，我们定义了一个名为 showMessage 的函数，用来显示一条消息。然后，我们使用 setTimeout() 方法来延迟 3 秒钟后执行 showMessage 函数。由于 setTimeout() 方法只会执行一次，因此 showMessage 函数只会被执行一次。

相比之下，setInterval() 方法会在指定的时间间隔后，重复执行指定的函数。它会不断执行，直到我们使用 clearInterval() 方法来停止它。如果我们需要在固定的时间间隔内，重复执行一个操作，可以使用 setInterval() 方法。

举个例子，我们可以编写一个名为 showTime 的函数，用来显示当前的时间。在该函数中，我们使用 setInterval() 方法来每秒钟执行一次 showTime 函数：

```
function showTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString();
  console.log(timeStr);
}

setInterval(showTime, 1000);
```

在这个例子中，我们定义了一个名为 showTime 的函数，用来显示当前的时间。然后，我们使用 setInterval() 方法来每秒钟执行一次 showTime 函数。由于 setInterval() 方法会不断执行，因此 showTime 函数会每秒钟被执行一次。

需要注意的是，setTimeout() 和 setInterval() 方法都是 JavaScript 中的定时器方法，它们都可以用来延迟执行一段代码。它们的主要区别在于时间间隔的处理方式和执行次数的限制。如果我们需要延迟执行一次特定的操作，可以使用 setTimeout() 方法；如果我们需要在固定的时间间隔内，重复执行一个操作，可以使用 setInterval() 方法。

通常情况下，我们可以使用 clearInterval() 方法来清除 setInterval() 定时器。clearInterval() 方法接受一个参数，这个参数是 setInterval() 返回的定时器 ID。通过传入定时器 ID，我们可以清除该定时器。

举个例子，我们可以先使用 setInterval() 方法创建一个定时器，并将返回的定时器 ID 保存到一个变量中。然后，我们可以使用 clearInterval() 方法来清除该定时器：

```
const intervalId = setInterval(function() {
  // 这里是定时器执行的代码
}, 1000);

// 清除定时器
clearInterval(intervalId);
```

在这个例子中，我们使用 setInterval() 方法创建了一个每秒钟执行一次的定时器，并将返回的定时器 ID 保存到 intervalId 变量中。然后，我们可以使用 clearInterval() 方法来清除该定时器。

需要注意的是，setInterval() 方法返回的定时器 ID 是一个数字，表示该定时器在定时器队列中的位置。如果我们需要清除一个定时器，需要传入该定时器的 ID。如果我们不清楚该定时器的 ID，可以将 setInterval() 方法返回的值保存到一个变量中，然后在需要清除定时器的时候使用 clearInterval() 方法来清除该定时器。

另外，如果我们在使用 setInterval() 方法时，没有保存定时器 ID，可以使用 clearInterval() 方法来清除所有的定时器。可以使用一个变量来存储 setInterval() 方法返回的定时器 ID，然后在需要清除定时器的时候，通过该变量来清除定时器。如果没有保存定时器 ID，可以使用 clearInterval() 方法来清除所有的定时器，如下所示：

```
// 创建多个定时器
setInterval(function() {
  // 代码
}, 1000);

setInterval(function() {
  // 代码
}, 2000);

setInterval(function() {
  // 代码
}, 3000);

// 清除所有定时器
for (var i = 0; i < 1000; i++) {
  clearInterval(i);
}
```

在这个例子中，我们创建了三个定时器，但是没有保存它们的定时器 ID。然后，我们使用一个循环来清除所有的定时器，因为 clearInterval() 方法只会清除传入的定时器 ID，所以我们可以传入一个很大的数值来清除所有的定时器。需要注意的是，这种方式可能会清除其他地方创建的定时器，因此需要谨慎使用。
