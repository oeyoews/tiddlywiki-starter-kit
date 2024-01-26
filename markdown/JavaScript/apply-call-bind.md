---
title: 'apply-call-bind'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon May 22 2023 10:56:48 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
page-cover: 'https://source.unsplash.com/random?fm=blurhash&w=50&change-this'
---

# apply-call-bind

`call`、`apply` 和 `bind` 是 JavaScript 中的三个方法，它们都是用于改变函数的 `this` 指向。

`call` 和 `apply` 的作用一样，它们都可以在指定的作用域中调用函数，并将 `this` 指向第一个参数。

## apply vs call

1. `call` 的参数是逐个传入的，

1. `apply` 的参数是以数组(array, apply 都是a开头的)的形式传入的。

## bind

`bind` 的作用是创建一个新的函数，新函数的 `this` 指向第一个参数，后续的参数作为新函数的参数传入。与 `call` 和 `apply` 不同的是，`bind` 方法不会立即执行函数，而是返回一个新函数，需要手动调用才会执行。

下面是这三个方法的用法示例：

```javascript
const obj = {
  name: 'Alice',
  age: 18,
};

function sayHi() {
  console.log(`Hi, my name is ${this.name}, I'm ${this.age} years old.`);
}

// 使用 call 方法调用函数
sayHi.call(obj);

// 使用 apply 方法调用函数
sayHi.apply(obj);

// 使用 bind 方法创建新函数并调用
const newSayHi = sayHi.bind(obj);
newSayHi();
```

在实际开发中，这三个方法经常用于改变函数的 `this` 指向，例如在回调函数中使用，或者在函数式编程中使用柯里化等技术。

```js
const demo = {
  version: 1,
  log: function () {
    console.log(this.version);
  },
};

const { log } = demo;
// log.apply(demo, []);
// log.bind(demo, null);
const bunLog = log.bind(demo);
bunLog();
```

在这个例子中，`demo` 对象的 `log` 方法被定义为一个箭头函数。箭头函数的一个重要特点是它们继承了定义时的上下文，而不是在运行时绑定到一个新的上下文。因此，在这个例子中，箭头函数的 `this` 值将继承自它的父级上下文，即全局上下文。

在这个例子中，当 `log` 方法被解构并作为独立函数调用时，它的 `this` 值将指向全局上下文，因为它的父级上下文是全局上下文。在浏览器环境中，全局上下文通常是 `window` 对象。由于 `window` 对象没有名为 `version` 的属性，因此 `console.log(this.version)` 表达式将输出 `undefined`。

因此，箭头函数的 `this` 值与普通函数的 `this` 值有很大的区别。普通函数的 `this` 值在运行时根据调用方式和上下文动态绑定，而箭头函数的 `this` 值在定义时就已经确定，无法通过 `call()`、`apply()` 或 `bind()` 等方法进行修改。

```js
const version = 1;
const demo = {
  log: () => {
    console.log(this.version);
  },
};

const { log } = demo;
log();
```

如果想使箭头函数的 `this` 值指向 `demo` 对象，可以将 `log` 方法改为普通函数，或者使用 `Function.prototype.bind()` 方法将 `log` 方法绑定到 `demo` 对象上，如下所示：

```javascript
const demo = {
  version: 1,
  log: function() {
    console.log(this.version);
  },
};

const { log } = demo;
log.bind(demo)(); // 输出：1
```

在这个例子中，`log` 方法被改为普通函数，它的 `this` 值将根据调用方式和上下文动态绑定。接下来，使用 `bind()` 方法将 `log` 方法绑定到 `demo` 对象上，并立即调用返回的新函数。这样，`log` 方法就会在 `demo` 对象的上下文中被调用，从而正确地输出 `version` 属性。
