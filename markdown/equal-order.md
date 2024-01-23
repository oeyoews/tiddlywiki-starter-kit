---
title: 'equal-order'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Nov 20 2023 09:33:26 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# equal-order

这两个表达式都涉及到条件判断和逻辑运算符。

1. mvComment.code !== 200:\

这是一个条件判断表达式，意思是当 mvComment 对象的 code 属性不等于 200 时为真。换句话说，这个条件会在 mvComment 的 code 属性不等于 200 时成立。

1. !mvcomment.code === 200：\

这也是一个条件判断表达式，但它使用了逻辑非（!）运算符。首先，!mvcomment.code 会对 mvcomment.code 的值取非，然后再与 200 进行相等性比较。这个表达式的意思是，当 mvcomment.code 的值取非之后等于 200 时为真。

需要注意的是，第二个表达式可能存在一些问题。因为逻辑非运算符的优先级高于相等性比较运算符，所以这个表达式会被解释为 (!mvcomment.code) === 200，而不是！(mvcomment.code === 200)。这可能不是你想要表达的意思。

因此，正确的表达式应该是 mvComment.code !== 200。
