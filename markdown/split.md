---
title: 'split'
tags: ['JavaScript']
created: 'Sat May 27 2023 01:18:32 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# split

split 方法是 JavaScript 中的一个字符串方法，它的作用是将一个字符串分割成子字符串，并将这些子字符串存储在一个数组中。这个方法可以接受一个参数，用来指定分割字符串的标准，也可以不传入任何参数，此时默认按照空格进行分割。下面是一个简单的例子：

```
const str = 'hello world';
const arr = str.split(' ');
console.log(arr); // ["hello", "world"]
```

在这个例子中，我们将字符串 'hello world' 按照空格进行分割，得到了一个包含 'hello' 和 'world' 的数组。

另外，如果我们要将一个字符串按照某个字符串进行分割，可以将该字符串作为参数传入 split 方法，例如：

```
const str = 'apple,orange,banana';
const arr = str.split(',');
console.log(arr); // ["apple", "orange", "banana"]
```

在这个例子中，我们将字符串 'apple,orange,banana' 按照逗号进行分割，得到了一个包含 'apple'、'orange' 和 'banana' 的数组。
