---
title: 'Map'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sat May 27 2023 13:45:22 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# Map

:::abstract\

一击命中\

:::

map 是什么呢？在 JavaScript 中，map 是一种数据结构，用于存储键值对的集合。与普通的对象不同，map 的键可以是任意类型的值，包括基本类型和对象等。map 的键值对可以使用 set() 方法添加，使用 get() 方法获取。map 还有一些常用的方法，包括 has() 判断是否存在某个键、delete() 删除某个键值对、clear() 清空所有的键值对等。下面是一个使用 map 的示例：

```javascript
const myMap = new Map(); // 创建一个空的 map

// 使用 set() 方法添加键值对
myMap.set('name', '张三');
myMap.set('age', 18);
myMap.set({x: 1, y: 2}, '一个对象');

// 使用 get() 方法获取键对应的值
console.log(myMap.get('name')); // 输出：张三
console.log(myMap.get('age')); // 输出：18
console.log(myMap.get({x: 1, y: 2})); // 输出：undefined（注意这里的对象不是同一个对象）

// 使用 has() 方法判断是否存在某个键
console.log(myMap.has('name')); // 输出：true
console.log(myMap.has('gender')); // 输出：false

// 使用 delete() 方法删除某个键值对
myMap.delete('age');
console.log(myMap); // 输出：Map(2) { 'name' => '张三', { x: 1, y: 2 } => '一个对象' }

// 使用 clear() 方法清空所有的键值对
myMap.clear();
console.log(myMap); // 输出：Map(0) {}
```

map 是一种非常有用的数据结构，可以用于解决很多问题，比如需要存储键值对的场景、需要按照某种顺序存储元素的场景等。

键的唯一性：在 Map 中，每个键都是唯一的，不会出现重复的键。这意味着你可以使用任意类型的值作为键，并确保键的唯一性。

保持插入顺序：与普通的对象不同，Map 会维护插入键值对的顺序。这意味着当你迭代 Map 时，键值对的顺序与插入顺序保持一致。

支持任意类型的键：在 Map 中，你可以使用任意类型的值作为键，包括字符串、数字、布尔值、对象或其他 Map。这使得 Map 对象非常灵活，适用于各种场景。

可以快速地查找、插入和删除：Map 提供了一系列方法来操作键值对，包括 get() 获取值、set() 设置值、has() 判断键是否存在、delete() 删除指定的键值对等等。这些方法的时间复杂度通常是 O(1)，因此在大多数情况下，操作 Map 的效率非常高。

可以使用迭代器遍历：Map 支持迭代器，可以使用 for…of 循环或 forEach() 方法来遍历键值对。这使得处理和操作 Map 中的数据变得非常方便。
