---
title: 'Object-assign'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Fri Oct 27 2023 12:18:10 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# Object-assign

`Object.assign()` 方法是一个用于将一个或多个源对象的属性复制到目标对象的方法。它接受两个或多个参数，第一个参数是目标对象，后面的参数都是源对象。

语法如下：

```
```
Object.assign(target, ...sources)
```

<button>plain</button>
```

其中，`target` 参数是目标对象，`...sources` 是一个或多个源对象。

`Object.assign()` 方法会将每个源对象中可枚举的、自有的属性复制到目标对象中。如果目标对象和源对象具有相同的属性，则后来的属性会覆盖先前的属性。该方法会返回目标对象。

下面是一个简单的示例，演示了如何使用 `Object.assign()` 方法将两个对象合并到一个新对象中：

```
```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const newObj = Object.assign({}, obj1, obj2);

console.log(newObj); // { a: 1, b: 2, c: 3, d: 4 }
```

<button>javascript</button>
```

在上面的示例中，我们创建了两个源对象 `obj1` 和 `obj2`，并使用 `Object.assign()` 方法将它们合并到一个新对象 `newObj` 中。注意，我们首先传递了一个空对象 `{}` 作为目标对象，这样就不会修改任何已有的对象。

除了合并对象外，`Object.assign()` 方法还可以用于复制对象。例如，如果你想要创建一个新对象，该对象与现有对象具有相同的属性和值，可以使用 `Object.assign()` 方法：

```
```javascript
const obj = { a: 1, b: 2 };
const newObj = Object.assign({}, obj);

console.log(newObj); // { a: 1, b: 2 }
```

<button>javascript</button>
```

在上面的示例中，我们创建了一个新对象 `newObj`，它与现有对象 `obj` 具有相同的属性和值。这样做的好处是，你可以修改 `newObj`，而不会影响到原始对象 `obj`。

需要注意的是，`Object.assign()` 方法只会复制源对象自有的、可枚举的属性。如果源对象的属性是继承来的，或者是不可枚举的，则不会被复制。此外，该方法只会复制属性的值，而不会复制属性所代表的特性（例如，是否可写、可枚举等）。

`Object.assign(one, two)` 会将 `two` 对象的属性和值合并到 `one` 对象中，并返回合并后的 `one` 对象。如果 `one` 对象中已经存在相同的属性，则会覆盖原有的值。

`Object.assign({}, one, two)` 会创建一个新的空对象，然后将 `one` 和 `two` 对象的属性和值合并到该空对象中，并返回合并后的新对象。如果 `one` 和 `two` 对象中都存在相同的属性，则后面的对象的属性值会覆盖前面的对象的属性值。

因此，两者的区别在于：

* `Object.assign(one, two)` 会改变 `one` 对象本身，而 `Object.assign({}, one, two)` 不会改变 `one` 和 `two` 对象本身。

* `Object.assign({}, one, two)` 会返回一个新的合并后的对象，而 `Object.assign(one, two)` 不会返回新的对象，而是返回合并后的 `one` 对象。

需要注意的是，`Object.assign()` 方法是浅拷贝，即如果属性值是一个对象，则只会复制对象的引用，而不会复制对象本身。如果要实现深拷贝，需要使用其他方法。
