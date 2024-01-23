---
title: 'Null-Undefined'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Jun 19 2023 14:40:51 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# Null-Undefined

* **null**表示一个空值或不存在的对象。当我们将变量初始化为 null 时，意味着它没有被赋予任何值。null 是一个特殊的关键字，用于表示一个空的或无效的对象。例如，如果你有一个指向对象的变量，但是你想要明确地表示该对象为空，你可以将该变量设置为 null。

    以下是一个示例：

```
```javascript
let obj = null;
console.log(obj); // 输出：null
```

<button>javascript</button>
```

* **undefined**表示一个未定义的值。当变量声明但没有被赋值时，它的默认值就是 undefined。此外，如果你访问一个对象的属性或函数，而该对象本身未被定义，那么该属性或函数的值也将是 undefined。

    以下是一些示例：

```
```javascript
let x; // 声明一个变量但未赋值
console.log(x); // 输出：undefined

let obj; // 声明一个对象变量但未定义
console.log(obj.property); // 输出：undefined
```

<button>javascript</button>
```

* 在总结上述区别时，可以将 null 视为已定义但空的值，而 undefined 表示未定义的值。

* null 是一个表示“空”的对象，转为数值时为 0；undefined 是一个表示"此处无定义"的原始值，转为数值时为 NaN。
