---
title: 'js-in'
tags: ['JavaScript']
created: 'Sat Jun 03 2023 02:56:48 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# js-in

```js
const nav = {
  name: 'tom',
};

// const res = nav?.name; // tom
const res = 'name' in nav; // true

if (res) {
  console.log('demo');
  console.log(res);
} else {
  console.log('failed');
}
```

`'serviceWorker' in window.navigator` 是 JavaScript 中的一个语法，具体来说，它是一种运算符。这个运算符称为“in 运算符”，用于检测一个对象是否包含某个属性。

在这个例子中，`'serviceWorker' in window.navigator` 用于检测 `window.navigator` 对象是否包含名为 `'serviceWorker'` 的属性。如果存在，则表达式的值为 `true`，否则为 `false`。这个表达式可以用于判断当前浏览器是否支持 Service Worker 技术，从而决定是否使用 PWA（渐进式 Web 应用程序）技术。

`in` 运算符是 JavaScript 中的一种基本运算符，用于检测一个对象是否包含某个属性。它可以用于检测对象自身的属性，也可以用于检测对象原型链上的属性。`in` 运算符的语法如下：

```
propName in object
```

其中，`propName` 是要检测的属性名，`object` 是要检测的对象。如果 `object` 包含名为 `propName` 的属性，则表达式的值为 `true`，否则为 `false`。

`in` 运算符是 JavaScript 中的一个常用运算符，可以用于许多场景，例如检测对象是否包含某个属性、遍历对象的属性等。
