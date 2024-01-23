---
title: 'bind-01'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed Jun 07 2023 04:23:46 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# bind-01

`call` 和 `apply` 方法只是在函数调用时临时绑定 `this` 值，并不会对函数本身产生永久的影响。如果我们需要永久地将一个函数绑定到一个对象上，可以使用 `bind` 方法。

`bind` 方法返回一个新的函数，这个函数的 `this` 值被永久绑定到指定的对象上。当调用这个新函数时，它会在绑定的对象上下文中执行，而不是在全局上下文中执行。下面是一个简单的例子：

```
```javascript
const obj = {
  name: 'Alice',
  sayName() {
    console.log(this.name);
  },
};

const boundSayName = obj.sayName.bind(obj);
boundSayName(); // 输出：Alice
```

<button>javascript</button>
```

在这个例子中，我们定义了一个对象 `obj`，它有一个 `sayName` 方法，用于输出对象的 `name` 属性。然后，我们使用 `bind` 方法将 `sayName` 方法绑定到 `obj` 对象上，并将返回的新函数保存在变量 `boundSayName` 中。最后，我们调用 `boundSayName` 函数，它会在 `obj` 对象的上下文中执行，输出 `Alice`。

需要注意的是，`bind` 方法返回的是一个新函数，它和原函数是不同的函数实例。如果对原函数的修改不会影响到绑定后的新函数。此外，一旦使用 `bind` 绑定了函数和对象，就无法再使用 `call` 或 `apply` 方法来改变绑定的对象。
