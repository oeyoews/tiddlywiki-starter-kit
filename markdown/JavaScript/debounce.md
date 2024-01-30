---
title: 'debounce'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Fri May 19 2023 12:02:39 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# debounce

:::tip\

debounce: 手机息屏\

throttle: 闹钟定时\

:::

```
graph LR;
    A[用户输入事件] -->|触发事件处理函数| B[执行事件处理函数]
    B -->|设置计时器| C{计时器是否到期}
    C -- 是 --> D[执行事件处理函数, 更新定时器]
    C -- 否 --> E[重置计时器]
		E --> D
```

防抖和节流都是为了减少函数的执行次数，避免频繁触发函数而影响性能。不同之处在于，防抖是在一定时间内只执行一次函数，而节流是在一定时间内间隔执行函数。

以下是防抖和节流的实现代码：

防抖：

```javascript
function debounce(func, delay) {
  let timer = null;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      func.apply(context, args);
    }, delay);
  };
}
```

好的，这个 `debounce` 函数的作用是用来__防止函数在短时间内多次执行__，它接收两个参数，第一个参数是要执行的函数，第二个参数是时间间隔。

在函数内部，我们定义了一个变量 `timer`，用来保存定时器的引用。接着，我们返回一个函数，这个函数会在一定时间间隔后执行传入的函数。

在这个返回的函数里，我们首先保存了 `this` 和 `arguments` 的值，因为在延迟执行的时候，这两个值可能会发生变化。接着，我们清除了之前设置的定时器，然后设置一个新的定时器，在一定时间间隔后执行传入的函数。

在执行函数的时候，我们使用了 `apply` 方法来改变函数执行时的上下文，以及传入函数的参数。这样就能保证函数在执行时使用的是正确的上下文和参数，避免了因为上下文或参数的改变而导致的问题。

通过这个 `debounce` 函数，我们就能够控制函数的执行频率，避免了在短时间内连续触发函数的情况，从而提高了代码的性能和效率。这个函数在实际开发中经常用于输入框的搜索、滚动事件等场景，能够避免频繁地进行请求和操作，提高用户体验。

使用方式：

```javascript
const debounceFn = debounce(function() {
  console.log('debounce');
}, 1000);
debounceFn();
```

节流：

```javascript
function throttle(func, delay) {
  let timer = null;
  return function() {
    const context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(function() {
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}
```

好的，这个 `throttle` 函数的作用是用来控制函数的执行频率，避免函数在短时间内多次执行。它接收两个参数，第一个参数是要执行的函数，第二个参数是时间间隔。

在函数内部，我们定义了一个变量 `timer`，用来保存定时器的引用。接着，我们返回一个函数，这个函数会在一定时间间隔后执行传入的函数。

在这个返回的函数里，我们首先检查 `timer` 是否已经存在，如果不存在，就表示现在没有定时器在运行，就可以设置一个新的定时器，并在一定时间间隔后执行传入的函数。在执行完函数之后，我们将 `timer` 设置为 `null`，这样就能保证在下一次函数执行前，`timer` 变量已经被清空了。

通过这个 `throttle` 函数，我们就能够控制函数的执行频率，避免了在短时间内连续触发函数的情况，从而提高了代码的性能和效率。

使用方式：

```javascript
const throttleFn = throttle(function() {
  console.log('throttle');
}, 1000);
throttleFn();
```

```js
const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            func.apply(null, args);
          }, delay);
        };
      };
```
