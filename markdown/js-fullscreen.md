---
title: 'js-fullscreen'
tags: ['JavaScript']
created: 'Mon May 29 2023 03:12:26 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# js-fullscreen

JavaScript函数进入全屏和F11键进入全屏的本质区别在于，JavaScript函数进入全屏是通过调用浏览器提供的全屏API实现的，而F11键进入全屏是通过浏览器自身实现的全屏模式实现的。这两种方式的实现方式不同，导致在退出全屏时也有所不同。

具体来说，JavaScript函数进入全屏是通过调用`document.documentElement.requestFullscreen()`方法实现的，退出全屏是通过调用`document.exitFullscreen()`方法实现的。这些方法是浏览器提供的全屏API，可以控制网页进入和退出全屏模式。在使用这些方法时，我们可以通过JavaScript代码控制进入和退出全屏模式，可以更加灵活和自由地控制全屏模式。

而F11键进入全屏是浏览器自身实现的全屏模式，不同于JavaScript函数进入全屏的方式。在F11键进入全屏模式时，浏览器会将当前窗口或标签页切换到全屏模式，并隐藏浏览器工具栏、地址栏和标签栏等界面元素，以最大化显示网页内容。这种全屏模式是浏览器自身实现的，与JavaScript函数进入全屏的方式不同。在F11键进入全屏模式时，用户可以通过按下F11键再次退出全屏模式，恢复正常窗口模式。这是因为F11键是浏览器快捷键，在浏览器中具有特殊的功能，可以控制进入和退出全屏模式。但是，由于F11键是浏览器自身实现的全屏模式，因此无法通过JavaScript来控制F11键进入和退出全屏模式。
