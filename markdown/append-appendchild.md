---
title: 'append-appendchild'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Thu Sep 28 2023 02:17:38 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# append-appendchild

在 JavaScript 中，`append` 和 `appendChild` 是用于向 DOM（文档对象模型）中添加新元素或节点的两个常用方法，它们有一些区别和不同的用途。

1. `appendChild` 方法：

    * `appendChild` 是 Node 对象的方法，用于将一个节点对象作为子节点插入到目标节点的最后一个子节点位置。

    * 使用 `appendChild` 方法时，需要创建一个节点对象，然后将其添加到目标节点中。

    * 示例代码：```
```javascript
const parent = document.getElementById('parent'); // 获取父节点
const child = document.createElement('div'); // 创建一个子节点（div）
parent.appendChild(child); // 将子节点添加到父节点中
```

<button>javascript</button>
```

1. `append` 方法：

    * `append` 是 Element 对象的方法，用于在目标元素的末尾插入一组指定的节点对象或 DOM 字符串。

    * 使用 `append` 方法时，可以直接传入一个或多个节点对象、DOM 字符串或其他可以转换为节点的对象。

    * 示例代码：```
```javascript
const parent = document.getElementById('parent'); // 获取父节点
const child1 = document.createElement('div'); // 创建子节点 1（div）
const child2 = document.createElement('span'); // 创建子节点 2（span）
parent.append(child1, child2); // 将多个子节点添加到父节点中
```

<button>javascript</button>
```

对比：

* `appendChild` 只能将一个节点对象作为子节点添加到目标节点中，需要先创建节点对象后再使用。

* `append` 可以将一个或多个节点对象或 DOM 字符串添加到目标元素中，更加灵活方便，且支持链式操作。

* 注意：`append` 是较新的方法，可能在一些旧版本的浏览器中不被支持，而 `appendChild` 是较旧的方法，具有更广泛的兼容性。

根据具体的需求和浏览器兼容性要求，您可以选择适合的方法来向 DOM 中添加新的内容。
