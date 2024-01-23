---
title: 'blur-focus-visibilitychange'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Tue Sep 26 2023 06:19:40 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# blur-focus-visibilitychange

`visibilitychange` 事件与 `onblur` 和 `onfocus` 事件有不同的用途和触发条件：

1. `visibilitychange` 事件：

    * `visibilitychange` 事件是 HTML5 的一个事件，用于检测浏览器标签页或窗口的可见性状态。

    * 当用户切换到其他标签页、最小化浏览器窗口或隐藏浏览器窗口时，会触发 `visibilitychange` 事件。

    * 通过监听 `visibilitychange` 事件，你可以在浏览器标签页或窗口变得不可见时执行特定的操作，如暂停音频或视频播放，节省资源。

1. `onblur` 和 `onfocus` 事件：

    * `onblur` 和 `onfocus` 事件是针对特定的 DOM 元素（通常是表单元素或可获得焦点的元素）而言的。

    * `onblur` 事件在元素失去焦点时触发，而 `onfocus` 事件在元素获得焦点时触发。

    * 这些事件通常用于处理用户与页面上的特定元素的交互，例如验证表单输入或在输入框获取焦点时显示帮助文本。

总结：

* `visibilitychange` 事件用于监测整个浏览器窗口或标签页的可见性状态，用于全局的操作。

* `onblur` 和 `onfocus` 事件用于处理特定 DOM 元素的焦点变化，通常用于改善用户交互体验和验证输入。
