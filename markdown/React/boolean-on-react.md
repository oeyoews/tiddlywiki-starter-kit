---
title: 'boolean-on-react'
tags: ['React']
type: 'text/markdown'
created: 'Mon Dec 04 2023 10:49:47 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# boolean-on-react

在 JSX 里，React 会将 false 视为一个“空值”，就像 null 或者 undefined，这样 React 就不会在这里进行任何渲染

:::warning\

切勿将数字放在 && 左侧。

JavaScript 会自动将左侧的值转换成布尔类型以判断条件成立与否。然而，如果左侧是 0，整个表达式将变成左侧的值（0），React 此时则会渲染 0 而不是不进行渲染。

例如，一个常见的错误是 `messageCount && <p>New messages</p>`。其原本是想当 messageCount 为 0 的时候不进行渲染，但实际上却渲染了 0。

为了更正，可以将左侧的值改成布尔类型：messageCount > 0 && `<p>New messages</p>`。

:::
