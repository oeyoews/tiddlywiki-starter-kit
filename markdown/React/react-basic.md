---
title: 'react-basic'
tags: ['React']
type: 'text/markdown'
created: 'Fri Apr 28 2023 08:36:57 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# react-basic

* 在最新的 react 版本中，也可以直接使用<></>来代替 Fragment。其中<>唯一可以拥有的属性为 key。即< key=‘xxx’></>

* 使用数组 map 循环更新 li，一定要给 li 添加对应的 key 值，否则虽然正常运行，但是会报错误警告。不建议直接使用 index 作为 key 值。

* 在 JSX 中写注释，格式为：{/* xxxxx */}或{//xxxx}，注意如果使用单行注释，最外的大括号必须单独占一行。注释尽在开发源代码中显示，在导出的网页中不会有该注释。

* 给标签添加样式时，推荐使用 className，不推荐使用 class。如果使用 class 虽然运行没问题，但是会报错误警告，因为样式 class 这个关键词和 js 中声明类的 class 冲突。类似的还有标签中 for 关键词，推荐改为 htmlFor。

## 声明式开发" 概念解释

“声明式开发”：基于数据定义和数据改变，视图层自动更新。\

“命令式开发”：基于具体执行命令更改视图，例如 DOM 操作修改。

注意：声明式开发并不是不进行 DOM 操作，而是把 DOM 操作频率降到最低。
