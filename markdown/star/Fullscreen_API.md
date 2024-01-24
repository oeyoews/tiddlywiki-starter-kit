---
title: 'Fullscreen_API'
tags: ['剪藏']
type: 'text/markdown'
created: 'Sun Nov 26 2023 06:40:55 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://zhuanlan.zhihu.com/p/98963015'
---

# Fullscreen_API

### 最近需求中遇到关于全屏展示的需求，于是深入了解了一下 demo 如下所示？

[demo](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%253A%252F%252Fcodepen.io%252Fpengxiaohui00%252Fpen%252FNWPjYyJ)

**MDN 介绍**：

使用提供的 API，让一个元素与其子元素，可以占据整个屏幕，并在此期间，从屏幕上隐藏所有的浏览器用户界面以及其他应用。

**chrome 下的全屏表现**：

1. **全屏会隐藏标签栏，书签栏**

1. 如果网页一开始不是全部撑开的形式，全屏下，也会**将要全屏的元素充满整个屏幕**

---

**总共用到 6 个 API**：

1. 浏览器是否支持全屏模式：`document.fullscreenEnabled`

1. 使元素进入全屏模式：`Element.requestFullscreen()`

1. 退出全屏：`document.exitFullscreen()`

1. 检查当前是否有节点处于全屏状态：`document.fullscreenElement`

1. 进入全屏/离开全屏，触发事件：`document.fullscreenchange`

1. 无法进入全屏时触发：`document.fullscreenerror`

### 浏览器前缀：

目前并不是所有的浏览器都实现了 API 的无前缀版本，所以我们需要针对不同浏览器，做一下 API 的兼容：

### 1.1 属性

### 1.1.1 浏览器是否支持全屏模式：document.fullscreenEnabled

`document.fullscreenEnabled`属性返回一个布尔值，表示当前文档是否可以切换到全屏状态。

```
const fullscreenEnabled =  document.fullscreenEnabled ||  document.mozFullScreenEnabled ||  document.webkitFullscreenEnabled ||  document.msFullscreenEnabled; if (fullscreenEnabled) {  videoElement.requestFullScreen(); } else {  console.log('浏览器当前不能全屏'); }
```

### 1.1.1.2 返回全屏状态的 Element 节点 document.fullscreenElement

fullscreenElement 属性返回正处于全屏状态的 Element 节点，如果当前没有节点处于全屏状态，则返回 null

```
const  fullscreenElement =   document.fullscreenElement ||   document.mozFullScreenElement ||   document.webkitFullscreenElement;
```

### 1.2 方法

### 1.2.1 使元素进入全屏模式：Element.requestFullscreen()

```
Fullscreen(domName) { const element = document.querySelector(domName); // 获取dom const methodName = this.prefixName === '' ? 'requestFullscreen' : `${this.prefixName}RequestFullScreen`; // API前缀   element[methodName](); // 调用全屏 } 复制代码
```

值得注意的是：**调用此 API 并不能保证元素一定能够进入全屏模式**

1. MDN：例如`<iframe>` 元素具有 allowfullscreen 属性，可选择是否将其内容以全屏模式显示\

这种不被允许全屏的元素属于极少数情况。

1. 全屏请求必须在事件处理函数 (`点击事件等`) 中调用，否则将会被拒绝。

初始化直接全屏，会触发进入全屏失败回调。因为这样那就是容易造成欺骗，因为使用了全屏幕 API，就会欺骗到人，被成功钓鱼。大概意思是这样的，看另一个例[https://feross.org/html5-fullscreen-api-attack/](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%253A%252F%252Ffeross.org%252Fhtml5-fullscreen-api-attack%252F)

### 1.2.2 退出全屏：document.exitFullscreen()

document 对象的 exitFullscreen 方法用于取消全屏

```
function exitFullscreen() { if (document.exitFullscreen) {     document.exitFullscreen(); } else if (document.msExitFullscreen) {     document.msExitFullscreen(); } else if (document.mozCancelFullScreen) {     document.mozCancelFullScreen(); } else if (document.webkitExitFullscreen) {     document.webkitExitFullscreen(); } } exitFullscreen();
```

调用这个方法会让文档回退到上一个调用 Element.requestFullscreen() 方法进入全屏模式之前的状态。

### 1.3 全屏事件

### 1.3.1 进入全屏/离开全屏，触发事件：document.fullscreenchange

当我们进入全屏和离开全屏的时候，都会触发一个`fullscreenchange`事件。

**[MDN 注意](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%253A%252F%252Fdeveloper.mozilla.org%252Fzh-CN%252Fdocs%252FWeb%252FAPI%252FFullscreen_API%2523%2525E9%252580%25259A%2525E7%25259F%2525A5)：此事件不会提供任何信息，表明是进入全屏或退出全屏**。

看了好久事件返回的信息，确实找不到一个值，表明这是在进入全屏，或者离开全屏！

可以说相当不人性化了！但我们可以通过检查当前是否有节点处于全屏状态，判断当前是否处于全屏模式。

```
document.addEventListener("fullscreenchange", function( event ) { if (document.fullscreenElement) {     console.log('进入全屏'); } else {     console.log('退出全屏'); } });
```

### 6. 无法进入全屏时触发：document.fullscreenerror

浏览器无法进入全屏时触发，可能是技术原因，也可能是用户拒绝。

比如全屏请求不是在事件处理函数中调用，会在这里拦截到错误

```
screenError(enterErrorFn) { const methodName = `on${this.prefixName}fullscreenerror`;   document[methodName] = e => {     enterErrorFn && enterErrorFn(e) }; } 复制代码
```

### 1.4 全屏状态的 CSS

### 1.4.1 :full-screen 伪类

全屏状态下，大多数浏览器的 CSS 支持:full-screen 伪类，只有 IE11 支持:fullscreen 伪类。使用这个伪类，可以对全屏状态设置单独的 CSS 属性。

```
/* 针对dom的全屏设置 */ .div:-webkit-full-screen { background: #fff; } /* 全屏属性 */ :-webkit-full-screen {} :-moz-full-screen {} :-ms-fullscreen {} /* 全屏伪类 当前chrome:70 不支持 */ :full-screen { } :fullscreen { /* IE11支持 */ }
```

### 1.4.2 :backdrop 伪元素

全屏模式的元素下的即刻渲染的盒子（并且在所有其他在堆中的层级更低的元素之上），可用来给下层文档设置样式或隐藏它

1. 默认设置 背景灰

```
:not(:root):-webkit-full-screen::backdrop {   position: fixed;   top: 0px;   right: 0px;   bottom: 0px;   left: 0px;   background: #999; // 会将背景设为灰色的 如果你没为你的dom设置背景的话，全屏下会为灰色 }
```

1. 默认样式：

```
:not(:root):-webkit-full-screen { object-fit: contain; position: fixed !important; top: 0px !important; right: 0px !important; bottom: 0px !important; left: 0px !important; box-sizing: border-box !important; min-width: 0px !important; max-width: none !important; min-height: 0px !important; max-height: none !important; width: 100% !important; height: 100% !important; transform: none !important; margin: 0px !important; }
```

1.5 在项目中使用\

由于我这个个项目用到的是 Vue 里面用到了[这个库](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%253A%252F%252Fgithub.com%252Frafrex%252Ffscreen)，它对各个方法和属性做了很好的兼容，在开发中可以作参考。用法很简单，导入库，就可以直接这样调用方法：

```
fscreen.requestFullscreen(element) // replacement for: element.requestFullscreen - without calling the function // mapped to: element.vendorMappedRequestFullscreen
```

我项目中 js 使用如下所示

```
import fscreen from "fscreen"; import Message from "@/components/Message"; export default {   name: "FullScreen",   components: {}, data() { return {       isFullscreen: false }; },    computed: { fullscreenEnabled() { return fscreen.fullscreenEnabled; }, fullscreenElement() { return JSON.stringify(fscreen.fullscreenElement); } },    methods: { onTriggerClick(e) { if (this.isFullscreen) { this.onExitFullsreen(); } else { this.requestFullscreen(document.querySelector(".fullscreen-content")); } this.isFullscreen = !this.isFullscreen; }, requestFullscreen(ele) { if (fscreen.requestFullscreen) { return fscreen.requestFullscreen(ele); } else { alert("浏览器不支持全屏API"); } }, onExitFullsreen() { if (fscreen.exitFullscreen) { return fscreen.exitFullscreen(); } else { alert("浏览器不支持全屏API"); } } }, mounted() {     fscreen.addEventListener("fullscreenchange", e => {       Message.info(this.isFullscreen ? "进入全屏" : "退出全屏");       console.log(e); });      fscreen.addEventListener("fullscreenerror", e => {       Message.info("全屏切换出错");       console.log(e); }); } };
```

参考资料

* [Fullscreen API](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%253A%252F%252Fdeveloper.mozilla.org%252Fen-US%252Fdocs%252FWeb%252FAPI%252FFullscreen_API)

* [Element.requestFullscreen()](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%253A%252F%252Fdeveloper.mozilla.org%252Fzh-CN%252Fdocs%252FWeb%252FAPI%252FElement%252FrequestFullScreen)

* [Fullscreen API](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%253A%252F%252Ffullscreen.spec.whatwg.org%252F)

* [How to Use the HTML5 Full-Screen API](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%253A%252F%252Fwww.sitepoint.com%252Fhtml5-full-screen-api%252F)

* [https://github.com/rafrex/fscreen](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%253A%252F%252Fgithub.com%252Frafrex%252Ffscreen%252Fblob%252Fmaster%252Fsrc%252Findex.js)
