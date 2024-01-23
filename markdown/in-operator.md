---
title: 'in-operator'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Thu Sep 07 2023 13:28:51 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# in-operator

“in” 在 JavaScript 中是一个运算符，用于检查一个对象是否包含某个属性。它的语法是：

```
```javascript
属性名 in 对象
```

<button>javascript</button>
```

例如，你可以使用它来检查一个对象是否包含特定的属性，如下所示：

```
```javascript
var person = {name: "John", age: 30};

if ("name" in person) {
  console.log("person 对象包含 name 属性");
} else {
  console.log("person 对象不包含 name 属性");
}
```

<button>javascript</button>
```

这段代码会输出 “person 对象包含 name 属性”，因为 `person` 对象包含一个名为 “name” 的属性。如果属性不存在，它将返回 `false`。这个运算符通常用于遍历对象的属性或检查特定属性是否存在。
