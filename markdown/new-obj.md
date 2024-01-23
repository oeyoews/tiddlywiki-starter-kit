---
title: 'new-obj'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Fri Jun 09 2023 14:31:45 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# new-obj

当我们使用 `new` 关键字创建一个对象时，实际上会发生下面三件事情：

1. 创建一个空的 JavaScript 对象。

1. 将该对象的原型指向构造函数的原型。

1. 将该对象作为 `this` 关键字传递给构造函数，并执行构造函数。

因此，在使用 `new` 关键字创建对象时，我们通常可以直接将对象赋值给变量，而不需要先将变量声明并赋值为 `null` 或 `undefined`。这是因为 `new` 关键字会自动为我们创建一个对象并将其赋值给变量。

例如，我们可以这样创建一个对象：

```js
const obj = new Object();
```

在这个例子中，我们使用 `new` 关键字创建了一个空的 `Object` 对象，并将其赋值给 `obj` 变量。这个过程可以简写成下面这样：

```js
const obj = {};
```

这样就创建了一个空的对象，并将其赋值给 `obj` 变量。
