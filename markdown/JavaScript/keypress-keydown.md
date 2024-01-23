---
title: 'keypress-keydown'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sun Nov 26 2023 07:30:28 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# keypress-keydown

这三个事件，`keydown`、`keypress`和`keyup`，都是用于监听键盘事件的，但它们之间有一些关键的区别：

1. **`keydown`事件：**

    * 触发时机：在按下键盘上的任意键时触发。

    * 提供的信息：`keydown`事件提供被按下的键的信息，包括键码（keyCode）和字符（key）。

    * 注意事项：这个事件在按下键的瞬间触发，而且在按住键的情况下会重复触发。

1. **`keypress`事件：**

    * 触发时机：在按下能够产生字符的键时触发，比如字母和数字键。

    * 提供的信息：`keypress`事件提供与键关联的字符信息（charCode）。

    * 注意事项：与`keydown`不同，`keypress`事件不会在按住键时重复触发。

1. **`keyup`事件：**

    * 触发时机：在释放键盘上的按键时触发。

    * 提供的信息：`keyup`事件提供释放的键的信息，包括键码（keyCode）和字符（key）。

    * 注意事项：这个事件在释放按键的瞬间触发。

在实际应用中，通常使用`keydown`和`keyup`来检测按键的按下和释放，而`keypress`则在大多数情况下用得较少，因为它并不会提供所有键的信息，尤其是不可打印字符。需要注意的是，随着浏览器的发展，`keydown`和`keyup`事件现在更常用，而`keypress`事件在某些场景下可能会不被触发。

如果你需要在按下某个键时触发事件，通常使用`keydown`。如果你需要在释放键时触发事件，通常使用`keyup`。
