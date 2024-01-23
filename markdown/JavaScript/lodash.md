---
title: 'lodash'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed May 03 2023 02:40:16 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# lodash

Lodash 是一个流行的 JavaScript 实用工具库，提供了许多常见的函数和方法，可以帮助我们更加方便地操作数值、字符串、对象、数组等各种数据类型。Lodash 已经被广泛应用于 Web 开发、移动端开发、服务器端开发等多个领域。

以下是几个 Lodash 中常用的方法：

1. map：循环遍历数组或对象，并对其中的每个元素进行处理，返回处理后的新数组或对象。

```javascript
_.map([1, 2, 3], function(n) { return n * 2; });
// => [2, 4, 6]
```

1. filter：过滤出符合条件的数组元素，并返回一个新的数组。

```javascript
_.filter([1, 2, 3, 4, 5, 6], function(n) { return n % 2 == 0; });
// => [2, 4, 6]
```

1. reduce：对数组中的元素进行累加处理，并返回结果。

```javascript
_.reduce([1, 2, 3], function(sum, n) { return sum + n; }, 0);
// => 6
```

1. find：查找符合条件的第一个数组元素，并返回该元素。

```javascript
var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];

_.find(users, function(o) { return o.age < 40; });
// => { 'user': 'barney', 'age': 36, 'active': true }
```

以上是 Lodash 中的几个常用方法，Lodash 还提供了许多其他实用的函数和方法，可以根据需要使用。
