---
title: 'Document：fullscreen_属性_-_Web_API_接口参考___MDN'
tags: ['剪藏']
type: 'text/plain'
created: 'Sun Nov 26 2023 07:26:39 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://developer.mozilla.org/zh-CN/docs/Web/API/Document/fullscreen'
---

# Document：fullscreen_属性_-_Web_API_接口参考___MDN

```
已弃用：不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；参见本页面底部的兼容性表格以指导你作出决定。请注意，该特性随时可能无法正常工作。
过时的 Document 接口的 fullscreen 只读属性表明页面当前是否以全屏模式显示内容。
尽管这个属性是只读的，但如果修改它，即使在严格模式下也不会抛出错误；它的 setter 方法是空操作将被忽略。
值返回一个布尔值，如果页面当前在全屏模式下显示元素，则为 true；否则为 false。示例这个简单的函数使用过时的 fullscreen 属性报告当前是否激活了全屏模式。
function isDocumentInFullScreenMode() {
  return document.fullscreen;
}

另一方面，下面的示例使用当前的 fullscreenElement 属性来确定同样的事情：
function isDocumentInFullScreenMode() {
  return document.fullscreenElement !== null;
}

如果 fullscreenElement 不为 null，则返回 true，表示全屏模式正处于生效状态。规范 SpecificationFullscreen API Standard # dom-document-fullscreen 浏览器兼容性 Report problems with this compatibility data on GitHubdesktopmobileChromeEdgeFirefoxOperaSafariChrome AndroidFirefox for AndroidOpera AndroidSafari on iOSSamsung InternetWebView AndroidfullscreenDeprecatedLegendTip: you can click/tap on a cell for more information.Full supportFull supportPartial supportPartial supportDeprecated. Not for use in new websites.Uses a non-standard name.Has more compatibility info.The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.参见
```
