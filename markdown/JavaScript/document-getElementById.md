---
title: 'document-getElementById'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Tue Aug 29 2023 13:50:39 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# document-getElementById

`getElementById` 方法只能通过 `document` 对象来调用，因为它是 Document 接口的一部分，用于在文档对象模型（DOM）中通过元素的 ID 来获取相应的元素节点。这个方法的调用形式如下：

```javascript
var element = document.getElementById("elementId");
```

在这里，`document` 是一个全局对象，代表整个文档。通过 `getElementById` 方法，你可以在文档中查找匹配指定 ID 的元素节点。这是因为 HTML 规范要求一个文档中每个 ID 都是唯一的，所以可以通过 ID 来精确地获取一个特定的元素。

需要注意的是，`getElementById` 方法只在浏览器环境中可用，因为它是浏览器提供的 DOM API 的一部分。在其他 JavaScript 运行环境（例如 Node.js）中，是无法直接使用该方法的，因为那些环境没有浏览器的 DOM。
