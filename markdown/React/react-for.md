---
title: 'react-for'
tags: ['React']
type: 'text/markdown'
created: 'Tue May 02 2023 13:05:00 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# react-for

在 HTML 中，`for`是`label`元素的属性，用于与`input`元素相关联。当用户单击标签时，浏览器将把焦点转移到关联的输入元素上。例如：

```html
<label for="username">用户名：</label>
<input type="text" id="username">
```

在这个例子中，`label`元素的`for`属性指定了它所关联的`input`元素的 ID。因此，当用户单击标签时，输入元素将被选中。

在 React JSX 中，因为`for`是 JavaScript 的保留字，应该使用`htmlFor`代替标签元素中的`for`属性。

希望这个回答能够解决您的疑问！
