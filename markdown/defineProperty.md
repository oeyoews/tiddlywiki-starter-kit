---
title: 'defineProperty'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Tue Dec 12 2023 10:00:51 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# defineProperty

`Object.defineProperty` 是 JavaScript 中用于在对象上定义新属性或修改现有属性的方法。它的语法如下：

```
```javascript
Object.defineProperty(obj, prop, descriptor)
```

<button>javascript</button>
```

* `obj`: 要定义属性的对象。

* `prop`: 要定义或修改的属性名称。

* `descriptor`: 描述符对象，用于指定属性的特性（如可写、可枚举等）和相关的值。

描述符对象 (`descriptor`) 可以包含以下属性：

* `value`: 属性的值。

* `writable`: 属性是否可写，默认为 `false`。

* `enumerable`: 属性是否可枚举，默认为 `false`。

* `configurable`: 属性是否可配置，默认为 `false`。

* `get`: 获取属性值的方法。

* `set`: 设置属性值的方法。

示例：

```
```javascript
const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'John',
  writable: false,
  enumerable: true
});

console.log(obj.name); // 输出："John"
obj.name = 'Jane'; // 不会改变属性的值，因为 writable 为 false

for (let key in obj) {
  console.log(key); // 输出："name"
}
```

<button>javascript</button>
```

注意：使用 `Object.defineProperty` 定义的属性是不可修改的，即无法通过赋值运算符修改其值。要修改属性值，可以使用 `Object.defineProperties` 方法定义多个属性，或者使用 `Object.assign` 方法进行浅拷贝。

<https://www.bilibili.com/video/BV1Zy4y1K7SH?p=11&vd_source=d6afd7eedd9f9c940321c63f0a1539e3>
