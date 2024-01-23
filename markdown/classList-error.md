---
title: 'classList-error'
tags: ['JavaScript', 'TiddlyWiki']
type: 'text/markdown'
created: 'Tue Oct 17 2023 01:25:52 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# classList-error

`classList.add` 是 JavaScript 中用于向元素的 class 列表添加一个或多个类名的方法。通常情况下，它不会报错，但有一些情况下可能会出现问题：

1. **参数为空或非字符串值**：如果你尝试将一个空的字符串或非字符串值传递给 `classList.add`，它不会报错，但不会有任何效果。

```
```javascript
element.classList.add("");  // 无效操作，不会报错
element.classList.add(123);  // 无效操作，不会报错
```

<button>javascript</button>
```

1. **DOM 未加载完全**：如果你尝试在文档的 DOM 结构尚未完全加载的时候调用 `classList.add`，它也可能会无效，因为元素尚不存在。

```
```javascript
document.addEventListener("DOMContentLoaded", function() {
    var element = document.getElementById("myElement");
    element.classList.add("myClass"); // 正确的使用方式
});
```

<button>javascript</button>
```

1. **不存在的元素**：如果你尝试将类名添加到不存在的元素上，也会出现问题。

```
```javascript
var element = document.getElementById("nonExistentElement");
element.classList.add("myClass"); // 无效操作，不会报错
```

<button>javascript</button>
```

总的来说，`classList.add` 主要在处理 DOM 元素时使用，因此确保元素存在并且参数是有效的字符串值，通常可以避免出现错误。如果不符合这些条件，它可能会失败，但通常不会抛出异常。
