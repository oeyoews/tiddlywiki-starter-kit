---
title: 'indexOf'
tags: ['JavaScript']
created: 'Sat Jun 03 2023 05:10:41 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# indexOf

好的，`indexOf` 是 JavaScript 中的一个数组方法，用于返回指定元素在数组中第一次出现的位置。如果数组中不存在该元素，则返回 -1。

以下是 `indexOf` 方法的语法：

```
```javascript
array.indexOf(searchElement[, fromIndex])
```

<button>javascript</button>
```

其中，`array` 是要搜索的数组，`searchElement` 是要查找的元素，`fromIndex` 是一个可选的参数，用于指定开始查找的索引位置。如果省略 `fromIndex` 参数，则默认从数组的第一个元素开始查找。

以下是一个示例，演示如何使用 `indexOf` 方法：

```
```javascript
const fruits = ['apple', 'banana', 'orange', 'grape'];
const index1 = fruits.indexOf('orange'); // 返回 2
const index2 = fruits.indexOf('pear'); // 返回 -1
```

<button>javascript</button>
```

在这个示例中，我们首先定义了一个包含多个水果名称的数组 `fruits`。然后，使用 `indexOf` 方法来查找数组中第一次出现 `'orange'` 和 `'pear'` 的位置。由于 `'orange'` 出现在数组的第 3 个位置（从 0 开始计数），因此 `index1` 的值为 2。而 `'pear'` 并不存在于数组中，因此 `index2` 的值为 -1。

需要注意的是，`indexOf` 方法是区分大小写的。如果要忽略大小写进行查找，可以使用 `toLowerCase()` 或 `toUpperCase()` 方法将字符串转换为统一的大小写。

要忽略大小写，可以使用 `toLowerCase()` 或 `toUpperCase()` 方法将要查找的字符串转换为统一的大小写形式，然后再使用 `indexOf()` 方法进行查找。这样可以确保在查找时忽略大小写的差异。以下是一个示例：

```
```javascript
const fruits = ['apple', 'banana', 'orange', 'grape'];
const index1 = fruits.indexOf('Orange'.toLowerCase()); // 返回 2
const index2 = fruits.indexOf('PEAR'.toUpperCase()); // 返回 -1
```

<button>javascript</button>
```

在这个示例中，我们在查找之前，先使用 `toLowerCase()` 方法将要查找的字符串 `'Orange'` 转换为小写形式。这样，即使数组中的 `'orange'` 是小写的，我们也能够正确地找到它，并返回它在数组中第一次出现的位置。同样地，我们也可以使用 `toUpperCase()` 方法将要查找的字符串转换为大写形式。这样，即使数组中的 `'pear'` 是小写的，我们也能够正确地找到它，并返回 -1 表示没有找到。

需要注意的是，在使用 `toLowerCase()` 或 `toUpperCase()` 方法时，需要注意不要直接修改原始字符串，而是将转换后的字符串保存到一个新的变量中。这是因为 JavaScript 中的字符串是不可变的，一旦创建就不能修改。如果直接修改原始字符串，会导致程序出现错误。
