---
title: 'object-to-array'
tags: ['JavaScript']
created: 'Sat May 27 2023 04:08:26 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# object-to-array

好的，将一个对象转换成数组可以使用 JavaScript 中的 Object.keys() 方法和 Array.prototype.map() 方法。具体的步骤如下：

1.使用 Object.keys() 方法获取对象中所有的属性名，返回一个由这些属性名组成的数组。

```
const obj = { name: 'Tom', age: 18, gender: 'male' };
const keys = Object.keys(obj); // ["name", "age", "gender"]
```

在这个例子中，我们定义了一个对象 obj，包含了三个属性：name、age 和 gender。然后使用 Object.keys() 方法获取 obj 对象中所有的属性名，返回一个数组 ["name", "age", "gender"]。

2.使用 Array.prototype.map() 方法遍历属性名数组，将每个属性名对应的属性值组成一个新的数组。

```
const obj = { name: 'Tom', age: 18, gender: 'male' };
const keys = Object.keys(obj); // ["name", "age", "gender"]
const values = keys.map(key => obj[key]); // ["Tom", 18, "male"]
```

在这个例子中，我们使用 Array.prototype.map() 方法遍历属性名数组 keys，将每个属性名对应的属性值组成一个新的数组 values，返回一个数组 ["Tom",18, "male"]。

3.将属性名数组和属性值数组组合成一个新的数组。

```
const obj = { name: 'Tom', age: 18, gender: 'male' };
const keys = Object.keys(obj); // ["name", "age", "gender"]
const values = keys.map(key => obj[key]); // ["Tom", 18, "male"]
const arr = keys.map((key, index) => [key, values[index]]); // [["name", "Tom"], ["age", 18], ["gender", "male"]]
```

在这个例子中，我们使用 Array.prototype.map() 方法将属性名数组和属性值数组组合成一个新的数组 arr，返回一个由多个包含属性名和属性值的数组组成的二维数组。

需要注意的是，使用 Object.keys() 方法获取属性名数组时，返回的数组中属性名的顺序是不确定的，因此不能保证转换后的数组中属性名和属性值的顺序一致。如果需要保持顺序一致，可以使用 ES6 中的 Map 数据结构来存储对象的属性和属性值。
