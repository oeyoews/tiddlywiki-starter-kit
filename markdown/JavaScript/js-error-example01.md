---
title: 'js-error-example01'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed Jun 07 2023 03:38:03 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# js-error-example01

```js
const demo = {
  version: 1,
  log: function () {
    console.log(this.version);
  },
};

const { log } = demo;
log()
```

在这个代码片段中，首先定义了一个名为 `demo` 的对象，它包含一个 `version` 属性和一个名为 `log` 的方法。`log` 方法使用 `console.log` 函数输出当前对象的 `version` 属性。

接下来，使用对象解构将 `demo` 对象中的 `log` 方法分配给变量 `log`。然后，调用 `log()` 方法，但是此时 `log` 方法已经脱离了原来的对象，因此它的 `this` 指向已经发生了变化。

在 JavaScript 中，函数的 `this` 值是在函数被调用时确定的，它的值取决于函数的调用方式和上下文。在这个例子中，当 `log()` 方法被调用时，它已经被解构到了全局作用域中，因此它的 `this` 值将指向全局对象（在浏览器中通常是 `window` 对象）。

由于全局对象没有 `version` 属性，因此当 `log()` 方法被调用时，会在控制台中输出 `undefined`。要正确地输出 `version` 属性，可以使用 `Function.prototype.bind()` 方法将 `log` 方法绑定到原始的 `demo` 对象上，如下所示：

```javascript
const { log } = demo;
const boundLog = log.bind(demo);
boundLog(); // 输出：1
```

这样，`log` 方法就会在 `demo` 对象的上下文中被调用，它的 `this` 值将指向 `demo` 对象，从而正确地输出 `version` 属性。
