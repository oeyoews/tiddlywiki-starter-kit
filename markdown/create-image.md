---
title: 'create-image'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Sep 18 2023 15:18:28 GMT+0000 (GMT)'
---

# create-image

`new Image()` 和 `createElement('img')` 都可以用来创建一个新的 `<img>` 元素，但它们的实现方式有所不同：

* `new Image()` 是使用了 `Image` 构造函数来创建一个新的 `HTMLImageElement` 对象。这个对象具有所有 `<img>` 元素的特性和方法，例如 `src` 属性用于设置图像的源，`addEventListener` 方法用于添加事件监听器等。使用 `new Image()` 创建的对象是专门用于处理图像的元素。

* `createElement('img')` 是使用 DOM 的 `createElement` 方法创建一个新的元素节点，类型为 `HTMLUnknownElement`。通过给这个元素节点设置标签名为 “img”，我们将创建一个 `<img>` 元素。与 `new Image()` 不同，使用 `createElement('img')` 创建的元素节点在初始时是一个普通的元素节点，不具备所有针对图像的特性和方法。

综上所述，如果我们需要创建一个专门用于处理图像的元素，则推荐使用 `new Image()`。但如果只是简单地创建一个 `<img>` 元素节点，则可以使用 `createElement('img')`。
