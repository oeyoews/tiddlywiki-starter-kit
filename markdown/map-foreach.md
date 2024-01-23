---
title: 'map-foreach'
tags: ['JavaScript']
created: 'Fri Jun 02 2023 15:43:18 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# map-foreach

`map` 和 `forEach` 是两种不同的数组遍历方法，它们的主要区别在于返回值和使用方式上。

`forEach` 方法可以用来遍历数组中的每一个元素，对于每个元素都执行指定的操作。但是，`forEach` 方法没有返回值，它仅仅是执行了指定的操作，而<u>不会返回任何值</u>。

`map` 方法则可以用来将数组中的每个元素映射成新的值，返回一个新的数组。它会根据回调函数的返回值来生成新的数组。也就是说，`map` 方法可以通过对数组进行转换，生成一个新的数组，而不会修改原始数组。

下面是 `forEach` 和 `map` 方法的使用示例：

```
```js
const arr = [1, 2, 3, 4];

// 使用 forEach 方法
arr.forEach(item => {
  console.log(item);
});

// 使用 map 方法
const newArr = arr.map(item => item * 2);
console.log(newArr);
```

<button>js</button>
```

在使用这两种方法时，需要注意的是，回调函数的参数不同。`forEach` 方法的回调函数有三个参数：当前遍历的元素、当前元素的索引和整个数组。而 `map` 方法的回调函数只有两个参数：当前遍历的元素和当前元素的索引。

希望这些信息可以帮助您更好地理解 `forEach` 和 `map` 方法之间的区别。
