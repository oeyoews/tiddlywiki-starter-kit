---
title: 'remove-obj-arrt'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed Nov 01 2023 02:00:44 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# remove-obj-arrt

如果你想删除 JavaScript 对象的属性，但又不想改变原始对象，则可以使用 `Object.assign()` 或扩展运算符（`...`）等方法来创建新对象并复制原始对象的所有属性，然后再从新对象中删除属性。以下是一个示例：

```javascript
const originalObj = {
  name: 'John',
  age: 30,
  city: 'New York'
};

// 使用 Object.assign() 复制对象并删除属性
const newObj = Object.assign({}, originalObj);
delete newObj.age;

console.log(originalObj); // 输出 { name: 'John', age: 30, city: 'New York' }
console.log(newObj); // 输出 { name: 'John', city: 'New York' }

// 使用扩展运算符复制对象并删除属性
const anotherObj = { ...originalObj };
delete anotherObj.city;

console.log(originalObj); // 输出 { name: 'John', age: 30, city: 'New York' }
console.log(anotherObj); // 输出 { name: 'John', age: 30 }
```

在上面的示例中，我们首先创建了一个名为 `originalObj` 的对象，并设置了三个属性：`name`、`age` 和 `city`。然后，我们使用 `Object.assign()` 方法或扩展运算符（`...`）复制 `originalObj` 并将其存储在 `newObj` 或 `anotherObj` 中。接着，我们从 `newObj` 和 `anotherObj` 中分别删除了 `age` 和 `city` 属性。最后，我们分别打印了 `originalObj` 和 `newObj` 或 `anotherObj`，以显示删除属性后的结果。

需要注意的是，这两种方法都只复制了原始对象的浅层副本。如果原始对象包含嵌套的对象或数组，则嵌套对象或数组仍然是通过引用共享的。

使用 `filter` 方法来过滤对象属性并创建一个新的对象是不太适用的，因为 `filter` 方法是用于数组的，而不是对象。

如果你想删除 JavaScript 对象的属性，但又不想改变原始对象，并且希望使用其他方法，可以考虑使用解构赋值来创建一个新对象，只包含需要保留的属性。以下是一个示例：

```javascript
const originalObj = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const { age, ...newObj } = originalObj;

console.log(originalObj); // 输出 { name: 'John', age: 30, city: 'New York' }
console.log(newObj); // 输出 { name: 'John', city: 'New York' }
```

在上面的示例中，我们使用解构赋值语法从 `originalObj` 中提取 `age` 属性，并将其存储在变量 `age` 中。然后，我们使用剩余参数（`...`）来创建一个名为 `newObj` 的新对象，它只包含除了 `age` 以外的其他属性。最后，我们分别打印了 `originalObj` 和 `newObj`，以显示删除属性后的结果。

需要注意的是，这种方法只能用于较新版本的 JavaScript（ES6+）。它通过将需要保留的属性提取到单独的变量中，并使用剩余参数来创建新对象，实现了从原始对象中删除属性的效果。
