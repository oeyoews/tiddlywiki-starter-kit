---
title: 'arrow-function'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sat May 06 2023 06:02:28 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# arrow-function

箭头函数（Arrow Function）是 ES6 提出的一种新的函数语法，它可以更简洁地定义函数，并且不会改变 this 的指向。

箭头函数的参数有以下几种形式：

1. 无参数：如果函数没有参数，那么可以在括号中省略参数部分，如下所示：

```javascript
const sayHello = () => {
  console.log('Hello');
};

sayHello(); // 输出 "Hello"
```

1. 单个参数：如果函数只有一个参数，则可以省略参数括号。例如：

```javascript
const double = x => {
  return x * 2;
};

console.log(double(5)); // 输出 10
```

1. 多个参数：如果函数有多个参数，则需要使用圆括号将这些参数括起来。例如：

```javascript
const add = (x, y) => {
  return x + y;
};

console.log(add(2, 3)); // 输出 5
```

注意事项：

* 如果只有一个参数，也可以选择加上括号，如 `(x)` 或者 `(y)`，但是不允许只有右侧的括号，如 `x)`。

* 如果没有参数或者有多个参数，就必须使用圆括号。

* 如果函数体只有一条语句，可以省略花括号和 return 语句，例如：

```javascript
const add = (x, y) => x + y;

console.log(add(2, 3)); // 输出 5
```

* 如果函数体中包含多条语句，就必须使用花括号和 return 语句。
