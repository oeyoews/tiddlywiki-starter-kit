---
title: 'Object-values'
tags: ['JavaScript']
created: 'Sat May 27 2023 09:26:09 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
page-cover: 'https://source.unsplash.com/random?fm=blurhash&w=50&Object-values'
type: 'text/vnd.tiddlywiki'
---

# Object-values

Object.keys() 和 Object.values() 都是 JavaScript 中内置的用于对象的遍历方法，分别用于获取对象的键名数组和键值数组。

Object.keys() 方法可以获取对象的所有键名，并将其以数组的形式返回。例如：

```
const obj = { name: 'Tom', age: 18, gender: 'male' };
const keys = Object.keys(obj); // ["name", "age", "gender"]
```

在这个例子中，我们定义了一个对象 obj，包含了三个属性：name、age 和 gender。然后使用 Object.keys() 方法获取 obj 对象中所有的属性名，返回一个数组 ["name", "age", "gender"]。

Object.values() 方法可以获取对象的所有键值，并将其以数组的形式返回。例如：

```
const obj = { name: 'Tom', age: 18, gender: 'male' };
const values = Object.values(obj); // ["Tom", 18, "male"]
```

在这个例子中，我们定义了一个对象 obj，包含了三个属性：name、age 和 gender。然后使用 Object.values() 方法获取 obj 对象中所有的属性值，返回一个数组 ["Tom", 18, "male"]。

需要注意的是，使用 Object.keys() 和 Object.values() 方法获取属性名数组和属性值数组时，返回的数组中属性名和属性值的顺序是不确定的，因此不能保证属性名和属性值的顺序一致。如果需要保持顺序一致，可以使用 ES6 中的 Map 数据结构来存储对象的属性和属性值，并使用 Map.prototype.forEach() 方法遍历 Map 对象。例如：

```
const obj = { name: 'Tom', age: 18, gender: 'male' };
const map = new Map(Object.entries(obj)); // 将对象转为 Map
const arr = []; // 定义一个空数组用于存储属性名和属性值
map.forEach((value, key) => arr.push([key, value])); // 遍历 Map
```

在这个例子中，我们使用 Object.entries() 方法将对象 obj 转换为 Map 对象 map，然后定义一个空数组 arr，用于存储属性名和属性值。接着使用 Map.prototype.forEach() 方法遍历 Map 对象 map，获取每个属性名和属性值，并将其分别存储到数组 arr 中。

使用 Map 数据结构遍历对象的优点是，可以保证属性名和属性值的顺序与对象定义时的顺序一致。
