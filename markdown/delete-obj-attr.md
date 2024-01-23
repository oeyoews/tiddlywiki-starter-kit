---
title: 'delete-obj-attr'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed Nov 01 2023 01:56:36 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# delete-obj-attr

:::abstract\

今天才知道还有这种语法，我还是以为是 sql\

:::

要从 JavaScript 对象中删除一个属性，可以使用`delete`运算符。这个运算符接受对象和要删除的属性作为操作数。以下是一个简单的示例：

```javascript
let obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};

console.log(obj); // 输出 { name: 'John', age: 30, city: 'New York' }

delete obj.age;

console.log(obj); // 输出 { name: 'John', city: 'New York' }
```

在上面的示例中，我们首先创建了一个名为`obj`的对象，并设置了三个属性：`name`、`age`和`city`。然后，我们使用`delete`运算符将`age`属性从对象中删除。最后，我们再次打印对象，发现`age`属性已经被移除。

需要注意的是，`delete`运算符只能删除对象自身的属性，不能删除继承的属性或变量。另外，如果尝试删除一个不存在的属性，不会产生错误，而只是什么都不会发生。

```javascript
delete obj.nonExistentProperty; // 不会产生错误，什么都不会发生
```

希望这可以帮助你理解如何从 JavaScript 对象中删除属性。
