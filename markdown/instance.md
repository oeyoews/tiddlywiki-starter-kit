---
title: 'instance'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Tue May 30 2023 10:35:39 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
page-cover: 'https://source.unsplash.com/random?fm=blurhash&w=50&instance'
---

# instance

`instanceof` 是 JavaScript 中的运算符，用于检测一个对象是否是某个构造函数的实例。

语法格式：`object instanceof constructor`

其中，`object` 是要检测的对象，`constructor` 是构造函数。该运算符返回一个布尔值，如果 `object` 是 `constructor` 的实例，则返回 `true`，否则返回 `false`。

例如：

```javascript
function Person(name) {
  this.name = name;
}

const person = new Person('Alice');

console.log(person instanceof Person); // true
console.log(person instanceof Object); // true
console.log({} instanceof Object); // true
console.log([] instanceof Object); // true
console.log([] instanceof Array); // true
console.log({} instanceof Array); // false
```

在上面的代码中，`person` 是 `Person` 的实例，因此 `person instanceof Person` 返回 `true`。同时，由于所有对象都是 `Object` 的实例，因此 `person` 也是 `Object` 的实例，`{}，[]` 也是 `Object` 的实例。`[]` 是 `Array` 的实例，因此 `[] instanceof Array` 返回 `true`，而 `{}` 不是 `Array` 的实例，因此 `{} instanceof Array` 返回 `false`。

需要注意的是，`instanceof` 运算符的判断是基于原型链的。也就是说，如果 `constructor` 的原型链上有一个对象与 `object` 的原型链上的任意一个对象相等，那么 `object` 就被认为是 `constructor` 的实例。因此，如果 `constructor` 是一个自定义的构造函数，需要确保它的原型链被正确地设置。

此外，如果 `constructor` 不是一个函数，`instanceof` 运算符会抛出一个 `TypeError` 异常。因此，在使用 `instanceof` 运算符时，需要确保 `constructor` 是一个函数。
