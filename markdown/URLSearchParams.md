---
title: 'URLSearchParams'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Tue Jul 04 2023 05:59:11 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# URLSearchParams

`const params = new URLSearchParams();` 是创建一个新的 URLSearchParams 对象的代码。URLSearchParams 是一个内建的 JavaScript 对象，用于处理 URL 查询参数。

URLSearchParams 对象提供了一种方便的方式来构建、解析和操作 URL 查询参数。您可以使用它来添加、获取、删除和迭代查询参数。

以下是一些常见的 URLSearchParams 方法示例：

* `append(name, value)`: 向 URLSearchParams 对象中添加一个新的查询参数。

* `get(name)`: 获取指定名称的查询参数的值。

* `delete(name)`: 删除指定名称的查询参数。

* `toString()`: 将 URLSearchParams 对象转换为字符串，以便于在 URL 中使用。

下面是一个使用 URLSearchParams 的示例：

```
```javascript
const params = new URLSearchParams();
params.append("name", "John");
params.append("age", "25");

console.log(params.get("name")); // 输出："John"
console.log(params.toString()); // 输出："name=John&age=25"

params.delete("age");
console.log(params.toString()); // 输出："name=John"
```

<button>javascript</button>
```

在这个示例中，我们首先创建了一个空的 URLSearchParams 对象，然后使用 `append` 方法添加了两个查询参数：`name` 和 `age`。我们可以使用 `get` 方法获取指定名称的查询参数的值，并使用 `toString` 方法将 URLSearchParams 对象转换为字符串，以便于在 URL 中使用。最后，我们使用 `delete` 方法删除了名为 `age` 的查询参数。

URLSearchParams 对象在处理 URL 查询参数时非常有用，使得操作和处理查询参数变得更加简单和方便。
