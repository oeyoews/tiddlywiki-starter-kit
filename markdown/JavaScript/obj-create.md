---
title: 'obj-create'
tags: ['JavaScript']
created: 'Tue May 30 2023 15:18:48 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# obj-create

Object.create() 是 JavaScript 中的一个方法，它可以创建一个新的对象，并将其原型指向传入的对象。传入的对象可以是 null，这种情况下创建的新对象不会继承任何属性和方法。

举个例子，如果我们想要创建一个新的对象，并让它继承一个现有的对象的属性和方法，可以这样写：

```js
const parentObj = {
  sayHello() {
    console.log('Hello!');
  }
};

const childObj = Object.create(parentObj);

childObj.sayHello(); // 输出 "Hello!"
```

在这个例子中，我们创建了一个名为 parentObj 的对象，并给它定义了一个 sayHello() 方法。然后我们使用 Object.create() 创建了一个新的对象 childObj，并将其原型指向 parentObj。这样，childObj 就继承了 parentObj 的 sayHello() 方法。

Object.create() 的应用场景比较多，其中最常见的就是实现对象继承。通过 Object.create()，我们可以创建一个新的对象，并将其原型指向另一个对象，从而实现对象之间的继承关系。在一些面向对象的程序设计中，继承是非常常见的操作，Object.create() 就是一个非常方便的工具。

另外，Object.create() 还可以用于创建纯净的对象，在 JavaScript 中，所有的对象都会继承一些属性和方法，比如 Object.prototype 上的方法。如果我们想要创建一个完全没有继承关系的新对象，可以使用 Object.create(null) 来创建一个没有原型的纯净对象。这种对象可以用来存储键值对，不会受到原型的影响，也不会有原型链相关的性能损失。
