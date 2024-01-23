---
title: 'find-method'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Fri Jul 21 2023 15:58:35 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# find-method

`Array.prototype.find()` 方法是 JavaScript 数组的一个内置方法，用于在数组中查找满足给定条件的第一个元素，并返回该元素。它的语法如下：

```javascript
array.find(callback(element[, index[, array]])[, thisArg])
```

参数说明：

* `callback`：回调函数，用来测试每个元素是否满足某个条件。该函数接收三个参数：

    * `element`：当前正在被测试的数组元素。

    * `index`（可选）：当前被测试元素的索引。

    * `array`（可选）：调用 `find` 方法的数组。

* `thisArg`（可选）：执行回调函数时使用的 `this` 值。

返回值：

* 如果找到满足条件的元素，则返回该元素。

* 如果没有找到满足条件的元素，则返回 `undefined`。

示例代码：

```javascript
const numbers = [1, 2, 3, 4, 5];

// 查找第一个大于 3 的数
const result = numbers.find((num) => num > 3);
console.log(result); // 输出：4

// 查找第一个索引为偶数的数
const evenIndexNum = numbers.find((num, index) => index % 2 === 0);
console.log(evenIndexNum); // 输出：1

// 在对象数组中查找 name 属性为 "Alice" 的对象
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];
const user = users.find((user) => user.name === "Alice");
console.log(user); // 输出：{ name: "Alice", age: 25 }
```

`find()` 方法在找到符合条件的元素后会停止搜索，不会继续遍历整个数组。如果需要查找所有满足条件的元素，可以使用 `filter()` 方法。
