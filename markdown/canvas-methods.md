---
title: 'canvas-methods'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Tue Oct 03 2023 03:34:36 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# canvas-methods

1. `toBlob()`: 这是一个 Canvas 元素的方法，它将当前 Canvas 中的图像数据转换为 Blob 对象。Blob 对象代表不可变、原始数据的片段，通常用于存储二进制数据或文件。`toBlob()`方法接受一个回调函数作为参数，该回调函数会在转换完成后被调用，并传递生成的 Blob 对象。示例代码如下：

```javascript
canvas.toBlob(function(blob) {
  // 在这里处理生成的 Blob 对象
}, 'image/png');
```

1. `toDataURL()`: 这也是一个 Canvas 元素的方法，它将当前 Canvas 中的图像数据转换为一个表示图像的 Data URL 字符串。Data URL 是一种用于内联嵌入数据的 URL 格式，可以包含图像、文本等各种类型的数据。`toDataURL()`方法接受一个可选的参数，用于指定图像格式，默认为’image/png’。示例代码如下：

```javascript
var dataURL = canvas.toDataURL('image/png');
// 在这里使用生成的 Data URL
```

1. `new Blob()`: 这是 JavaScript 中的构造函数，用于创建 Blob 对象。Blob 对象可以包含任意类型的数据，例如图像、音频、视频等。`new Blob()`接受一个数组作为参数，数组中的每个元素是要包含在 Blob 中的数据块。示例代码如下：

```javascript
var data = ['Hello, world!'];
var blob = new Blob(data, { type: 'text/plain' });
// 在这里使用生成的 Blob 对象
```
