# Tiddlywiki codemirror 6

> 你的下一个 TiddlyWiki5 编辑器：Codemirror6

## 插件在线地址

<TwPlugin name="tiddlywiki-codemirror-6" />

<img alt="version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Foeyoews%2Ftiddlywiki-codemirror6%2Fmain%2Fpackage.json&query=version&style=flat-square&logo=Codemirror&logoColor=white&label=codemirror&labelColor=black&color=black">

<center>
<video width="300" controls style="border-radius:8px;">
  <source src="https://user-images.githubusercontent.com/72405338/294956491-948b791f-04e1-4447-a5d3-81ebb13619de.mp4" type="video/mp4">
</video>
</center>

[[Demo|https://oeyoews.github.io/tiddlywiki-codemirror6/#%24%3A%2Fplugins%2Foeyoews%2Ftiddlywiki-codemirror-6]]


## 特性

* 自动完成预览（包括图片）
* 支持加载代码片段模块
* 迷你地图、Vim 模式、字数统计、彩虹括号、代码块高亮
* 自定义占位符、制表符大小、最小完成长度

## Completions
* `/` 获取代码片段
* `[[` 或 `{{` 获取 tiddlers
* `:` 获取表情符号
* `[img[` 获取图片
* `<$` 获取小部件
* `//` 更改 tiddler 类型
* `#` 插入标签
* `@#` 设置 codemirror6

## Tips

* Emoji 完成需要安装 [[$:/plugins/oeyoews/tiddlywiki-cmp-emoji]] 插件
* 如果你希望添加你的自定义代码片段，你可以编写一个简单的插件模块（模块类型：snippets）。
* 按 Tab 键接受当前完成
* 非 Vim 模式下按 `ctrl + /` 注释当前行
* Vim 模式：`"+y`（复制到系统剪贴板）
* Vim 模式：`"+p`（粘贴系统剪贴板内容到编辑器）

## Can be removed plugins

* Cm5 系列插件
* 自动列表插件
* 自动完成插件
* 插入当前时间插件
* 表情按钮插件
* 字符按钮插件
* ...

## Proposal

> 零 Js，纯 Wikitext。

将代码片段纳入插件，用于小部件、宏和模板，可以显著提升用户便利性。例如，kookma 插件展示了许多示例代码，包括宏、样式和常用片段，这些都可以转换为代码片段。

特别是 codemirror6 插件，它可以无缝加载这些代码片段，同时也支持占位符。此外，用户可以分享他们常用的代码片段，促进协作和支持性社区的建设。这些片段甚至可以作为独立插件打包，例如 zero-js 或纯 wikitext。这种方式无疑将简化编码过程，并有助于创造更高效和用户友好的体验。

[[example|https://github.com/oeyoews/tiddlywiki-codemirror6/blob/main/src/tiddlywiki-snippets/tiddlers/general/toc01.tid]]

## Motivation

* 希望统一 codemirror 插件，无需安装十几个 codemirror 插件，或因缺少某些插件而导致的界面错误。
* codemirror 增强插件的自动完成有时会导致界面冻结。
* 更好地支持代码片段
* 更佳的 markdown 编辑体验

如果你喜欢这个插件，欢迎 Star [ext[GitHub|https://github.com/oeyoews/tiddlywiki-codemirror6]]

## Credits

> BurningTreeC's tiddlywiki codemirror-6 plugin

## Report Bug

https://github.com/oeyoews/tiddlywiki-codemirror6/issues/new
