---
title: 'in-hasOwnProperty'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sat Jun 24 2023 14:41:17 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# in-hasOwnProperty

在 JavaScript 中，除了使用`hasOwnProperty`方法来检查对象是否具有特定的自有属性外，还可以使用`in`运算符来检查对象是否具有某个属性，包括自有属性和继承属性。

下面是使用`in`运算符的示例：

```
```javascript
const object1 = {
  property1: 42,
};

console.log('property1' in object1);
// 输出：true

console.log('toString' in object1);
// 输出：true，因为 toString 是从 Object 原型继承而来的方法

console.log('hasOwnProperty' in object1);
// 输出：false，因为 hasOwnProperty 是从 Object 原型继承而来的方法
```

<button>javascript</button>
```

在上述示例中，我们使用`in`运算符来检查对象`object1`是否具有指定的属性。如果对象拥有该属性（不论是自有属性还是继承属性），则返回`true`，否则返回`false`。

请注意，在使用`in`运算符时，如果属性存在于对象的原型链上，也会返回`true`。这就是为什么`'toString' in object1`返回`true`，因为`toString`方法是从`Object`原型继承而来的。相比之下，`hasOwnProperty`方法是`Object`自身的方法，而不是从原型继承而来的，因此`'hasOwnProperty' in object1`返回`false`。

与`in`运算符不同，`hasOwnProperty`方法只检查对象是否具有自有属性，不会检查继承属性。
