---
title: 'type-infer-on-loop'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Thu Dec 21 2023 08:14:27 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# type-infer-on-loop

在 TypeScript 中，如果你使用 for…in 循环遍历对象的属性，通常会丢失属性的具体类型信息，因此 TypeScript 无法正确进行类型推断。为了解决这个问题，你可以使用 Object.keys 方法结合数组的 forEach 方法，以便 TypeScript 正确推断属性的类型
