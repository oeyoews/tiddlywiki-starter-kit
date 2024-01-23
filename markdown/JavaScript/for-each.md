---
title: 'for-each'
tags: ['JavaScript']
created: 'Sat May 27 2023 01:18:56 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# for-each

forEach 是 JavaScript 中的一个数组方法，它的作用是遍历数组中的每个元素，并执行指定的函数。该方法接受一个函数作为参数，该函数会接受三个参数：当前元素的值、当前元素的索引和数组本身。下面是一个简单的例子：

```
const arr = [1, 2, 3, 4, 5];
arr.forEach((item, index) => {
  console.log(`元素值为${item}，索引为${index}`);
});
```

在这个例子中，我们定义了一个包含 5 个元素的数组，然后使用 forEach 方法遍历该数组，并在每次遍历时输出元素值和索引。运行结果如下：

```
元素值为1，索引为0
元素值为2，索引为1
元素值为3，索引为2
元素值为4，索引为3
元素值为5，索引为4
```

可以看到，forEach 方法遍历了整个数组，并在每次遍历时执行了指定的函数。

需要注意的是，forEach 方法不会修改原数组，也不会返回任何值，它仅仅是用来遍历数组并执行指定的函数。如果需要修改原数组，可以在函数内部进行操作，或者使用其他的数组方法，例如 map、filter 等。
