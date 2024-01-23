---
title: 'array-from'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Fri Oct 20 2023 13:58:10 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# array-from

```
```js
// 虚构数组
const data = Array.from({ length: 10 }, (_, i) => i + 1);

const d1 = [1, 2, 3];
const d2 = [
  {
    id: 1,
    name: 'John',
  },
  {
    id: 2,
    name: 'Jane',
  },
];
const data1 = Array.from(d1, (arr) => arr * 2);
const data2 = Array.from(d2, (obj) => obj.name);
console.log(data, data1, data2);

// data:  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// data1: [2, 4, 6]
// data2: [('John', 'Jane')]
```

<button>js</button>
```

`Array.from()` 是一个用于将类数组对象或可迭代对象（如字符串、Set、Map 等）转换为数组的方法。以下是如何使用 `Array.from()` 进行转换的示例：

```
```javascript
// 将字符串转换为数组
const str = "Hello, World!";
const arr = Array.from(str);
console.log(arr); // 输出：['H', 'e', 'l', 'l', 'o', ',', ' ', 'W', 'o', 'r', 'l', 'd', '!']

// 将 Set 转换为数组
const mySet = new Set([1, 2, 3, 4, 5]);
const arrFromSet = Array.from(mySet);
console.log(arrFromSet); // 输出：[1, 2, 3, 4, 5]

// 将 Map 转换为数组
const myMap = new Map([['a', 1], ['b', 2], ['c', 3]]);
const arrFromMap = Array.from(myMap);
console.log(arrFromMap); // 输出：[['a', 1], ['b', 2], ['c', 3]]
```

<button>javascript</button>
```

你可以看到，`Array.from()` 能够将不同类型的可迭代对象转换为数组，并且你还可以提供一个可选的映射函数，用于对数组的每个元素进行转换。例如：

```
```javascript
// 使用映射函数将数字加倍
const numbers = [1, 2, 3, 4, 5];
const doubled = Array.from(numbers, x => x * 2);
console.log(doubled); // 输出：[2, 4, 6, 8, 10]
```

<button>javascript</button>
```

这种方式可以在将类数组对象或其他可迭代对象转换为数组时非常方便。

使用 `Array.from()` 方法可以很方便地虚构一个数组。你可以通过传递一个可迭代对象或类数组对象来创建一个新的数组实例。下面是一个使用 `Array.from()` 方法虚构数组的示例：

```
```javascript
// 虚构一个包含 1 到 5 的数组
const arr = Array.from({ length: 5 }, (_, index) => index + 1);
console.log(arr); // 输出 [1, 2, 3, 4, 5]

// 虚构一个包含 A 到 E 的数组
const alphabet = Array.from({ length: 5 }, (_, index) => String.fromCharCode(65 + index));
console.log(alphabet); // 输出 ["A", "B", "C", "D", "E"]

// 虚构一个包含随机数的数组
const randomArray = Array.from({ length: 5 }, () => Math.random());
console.log(randomArray); // 输出包含 5 个随机数的数组
```

<button>javascript</button>
```

在上面的示例中，我们使用了 `Array.from()` 方法来创建了不同类型的数组。通过传递一个具有 `length` 属性的对象，我们可以指定数组的长度。然后，我们可以使用第二个参数 `mapFn` 来对数组中的每个元素进行处理，从而虚构出我们想要的数组。

希望这个示例能够帮助你理解如何使用 `Array.from()` 方法来虚构数组。如果你有任何其他问题，请随时提问！
