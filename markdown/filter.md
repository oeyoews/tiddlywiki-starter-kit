---
title: 'filter'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sat Jul 22 2023 18:20:23 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# filter

`Array.filter()` 是 JavaScript 数组提供的一个高阶函数，用于筛选数组中满足条件的元素，并返回一个新的、由满足条件的元素组成的数组。

`Array.filter()` 使用一个回调函数作为参数，该回调函数接受三个参数：当前正在遍历的元素、当前元素的索引和正在遍历的数组本身。回调函数应返回一个布尔值，决定是否保留当前元素在最终的结果数组中。

语法结构如下：

```javascript
const newArray = array.filter((element, index, arr) => {
  // 进行条件判断，返回布尔值
});
```

* `element`：当前正在遍历的元素。

* `index`：当前元素的索引（可选）。

* `arr`：正在遍历的数组（可选）。

例如，假设我们有一个数字数组，要筛选出其中的偶数：

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter((number) => {
  return number % 2 === 0;
});

console.log(evenNumbers); // 输出：[2, 4, 6]
```

在上述例子中，回调函数 `number % 2 === 0` 用于判断元素是否为偶数，满足条件的元素将被保留在 `evenNumbers` 数组中。

需要注意的是，`Array.filter()` 不会修改原始数组，而是返回一个新数组。如果不满足筛选条件，元素将被忽略。如果所有元素都不满足条件，将返回一个空数组。

`Array.filter()` 是一种非常常用和灵活的数组操作方法，可以根据自己的需要编写不同的筛选条件来满足特定的需求。
