---
title: 'debounce-throttle-code'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Jun 05 2023 11:20:03 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
publish: 'public'
---

# debounce-throttle-code

---

# 防抖和节流的立即执行和非立即执行版本的代码

## 防抖

### 立即执行版本

```js
function debounceImmediate(fn, wait) {
  let timer = null; // 定义计时器，初始值为 null
  return function (...args) {
    // 返回一个函数，利用闭包来保存 timer 变量
    if (timer) {
      // 如果 timer 存在，则说明函数还在等待执行
      clearTimeout(timer); // 清除计时器
    } else {
      // 如果 timer 不存在，则说明可以立即执行函数
      fn.apply(this, args); // 执行函数，并将上下文和参数传递进去
    }
    timer = setTimeout(() => {
      // 设置计时器，在规定时间后将 timer 设为 null
      timer = null;
    }, wait);
  };
}
```

这个函数实现了立即执行一次函数，并在规定的时间内限制函数的调用次数。在函数被调用时，会判断计时器是否存在，如果存在则说明函数还在等待执行，此时需要清除计时器。如果计时器不存在，则说明可以立即执行函数，并将上下文和参数传递进去。在函数执行后，会设置一个计时器，在规定时间内将计时器设为 null，从而限制接下来的函数调用。这个函数也使用了闭包来保存计时器变量，从而实现了防抖的效果。

### 非立即执行版本

```javascript
function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
```

## 节流

### 立即执行版本

```js
function throttleImmediate(fn, wait) {
  let timer = null; // 定义计时器，初始值为 null
  return function (...args) {
    // 返回一个函数，利用闭包来保存 timer 变量
    if (!timer) {
      // 如果 timer 不存在，则说明可以立即执行函数
      fn.apply(this, args); // 执行函数，并将上下文和参数传递进去
      timer = setTimeout(() => {
        // 设置计时器，在规定时间后将 timer 设为 null
        timer = null;
      }, wait);
    }
  };
}
```

这个函数实现了立即执行一次函数，并在规定的时间内限制函数的调用次数。在函数被调用时，会判断计时器是否存在，如果不存在则说明可以立即执行函数。在函数执行后，会设置一个计时器，在规定时间内将计时器设为 null，从而限制接下来的函数调用。这个函数也使用了闭包来保存计时器变量，从而实现了节流的效果。

### 非立即执行版本

```javascript
function throttle(fn, wait) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      const context = this;
      fn.apply(context, args);
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    }
  };
}
```

在这些代码中，立即执行版本的函数会在第一次触发时立即执行，而非立即执行版本的函数会在等待一定时间后执行。这两种函数都可以根据需要使用防抖或节流功能来限制函数的执行次数。

> <https://juejin.cn/post/7087286029551403015>
