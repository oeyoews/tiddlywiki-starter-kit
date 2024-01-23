---
title: 'NodeList'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Fri Jun 09 2023 13:07:58 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# NodeList

`NodeList` 是一个类数组对象，它包含一组 `Node` 对象，这些对象通常是由 `querySelectorAll` 方法返回的。`NodeList` 对象具有以下特点：

* 它是一个类数组对象，它的每个成员都是一个 `Node` 对象。

* 它是只读的，不能修改它的成员。

* 它是动态的，意味着它会随着文档的变化而自动更新。

你可以使用 `NodeList` 对象的属性和方法来访问和操作它的成员。例如，你可以使用 `length` 属性获取 `NodeList` 对象的长度，使用 `item` 方法或方括号语法访问 `NodeList` 对象的成员，使用 `forEach` 方法迭代 `NodeList` 对象的成员，等等。

以下是一个使用 `NodeList` 对象的示例：

```
```js
// 获取所有 p 元素
const paragraphs = document.querySelectorAll('p');

// 获取 paragraphs 的长度
const length = paragraphs.length;

// 访问 paragraphs 的第一个元素
const firstParagraph = paragraphs[0];
const firstParagraph2 = paragraphs.item(0);

// 迭代 paragraphs 中的每个元素
paragraphs.forEach((paragraph) => {
  console.log(paragraph.textContent);
});
```

<button>js</button>
```

在这个例子中，我们使用 `querySelectorAll` 方法获取了所有 `p` 元素，并将它们存储在一个 `NodeList` 对象 `paragraphs` 中。然后，我们使用 `length` 属性获取 `paragraphs` 的长度，使用方括号语法和 `item` 方法访问 `paragraphs` 的第一个元素，使用 `forEach` 方法迭代 `paragraphs` 中的每个元素，并在控制台中打印每个段落元素的文本内容。

```
```js
// 创建 MutationObserver 对象
const observer = new MutationObserver((mutations) => {
  console.log("tc-story-river 元素变化啦！", mutations);

  // 暂停观察目标元素
  observer.disconnect();
  copyButton();
  // 恢复观察目标元素
  observer.observe(document.querySelector(".tc-story-river"), {
    childList: true,
    subtree: true,
  });
});

// 指定要观察的元素选择器以及要观察的变化类型
observer.observe(document.querySelector(".tc-story-river"), {
  childList: true,
  subtree: true,
});
```

<button>js</button>
```
