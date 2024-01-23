---
title: 'spread-operator'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sun Jun 25 2023 04:27:14 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# spread-operator

剩余参数语法（Rest Parameters Syntax）和展开运算符（Spread Operator）在使用方式和作用上有所区别。

1. 剩余参数语法（Rest Parameters Syntax）：`...args`

剩余参数语法用于将多个参数收集到一个数组中。它在函数定义中使用，以表示函数可以接收任意数量的参数，并将它们作为数组访问。剩余参数语法只能在函数定义中使用，用于接收参数。

示例：

```javascript
function sum(...numbers) {
  // numbers 是一个包含所有参数的数组
  let total = 0;
  for (let num of numbers) {
    total += num;
  }
  return total;
}

console.log(sum(1, 2, 3)); // 输出 6
console.log(sum(4, 5, 6, 7)); // 输出 22
```

1. 展开运算符（Spread Operator）：`...array`

展开运算符用于在数组或对象字面量中展开数组或对象的元素。它可以在函数调用、数组字面量、对象字面量等地方使用。展开运算符将一个数组或对象拆分成各个元素，作为独立的参数或键值对进行使用。

示例：

```javascript
// 数组展开
const numbers = [1, 2, 3];
console.log(...numbers); // 输出 1 2 3

// 函数调用中使用展开运算符
function sum(a, b, c) {
  return a + b + c;
}

console.log(sum(...numbers)); // 输出 6

// 数组拼接
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const mergedArray = [...array1, ...array2];
console.log(mergedArray); // 输出 [1, 2, 3, 4, 5, 6]
```

总结：

* 剩余参数语法（Rest Parameters Syntax）用于函数定义中，将多个参数收集到一个数组中。

* 展开运算符（Spread Operator）用于展开数组或对象，在函数调用、数组字面量、对象字面量等地方使用。

虽然它们在语法上使用了相同的三个点（`...`），但根据它们所在的上下文和使用方式的不同，它们具有不同的作用和效果。
