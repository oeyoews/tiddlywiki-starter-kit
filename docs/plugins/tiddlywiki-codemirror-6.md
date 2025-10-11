# Tiddlywiki codemirror 6

> 你的下一个 TiddlyWiki5 编辑器：Codemirror6, 专注TiddlyWiki5写作体验的优化，和TiddlyWiki5深度集成.

<img src="./img/codemirror6.webp" class="rounded-md mt-2" alt="codemirror6"/>

## 插件在线地址

<TwPlugin name="tiddlywiki-codemirror-6" />

<img alt="version" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Foeyoews%2Ftiddlywiki-codemirror6%2Fmain%2Fpackage.json&query=version&style=flat-square&logo=Codemirror&logoColor=white&label=codemirror&labelColor=black&color=black">

<center>
<video width="300" controls style="border-radius:8px;">
  <source src="https://user-images.githubusercontent.com/72405338/294956491-948b791f-04e1-4447-a5d3-81ebb13619de.mp4" type="video/mp4">
</video>
</center>

[[Demo|https://oeyoews.github.io/tiddlywiki-codemirror6/#%24%3A%2Fplugins%2Foeyoews%2Ftiddlywiki-codemirror-6]]


## 背景介绍

* tw 的 codemirror5 插件为了可插拔性， 将codemirror的每个特性模块做成了单独的模块， 对于不熟悉的人来说， 经常会遇到依赖确实导致的报错。又正好看到codemirror6的稳定。 希望使用codemirror6重构一个插件。 当时社区正好有人开始了这个项目。 我第一次使用就觉得很不错。 但是我希望加上一些新特性， 比如vim 代码片段的自动提示， 补全， 借助moderndev项目， 我成功地重构了codemirror6。并且加上了很多新特性.

## 难点

* 目前插件开发重点为自动补全提示.
* 主要是tw 本身的theme layout palette之间的概念比较模糊， 对于插件开发使用不同的主题颜色比较困难。还有暗亮模式的问题， 社区并没有一个一致的解决方案。还有就是i18n 的实现。 更多情况下还是要靠开发者自己去实现兼容。所以这一块目前插件虽然做了一部分实现。 但是肯定是不够通用的。 所以目前插件并不会对这些进行较为全面的完善。

* 代码高亮：...
* 用户群体受众群体和反馈比较少. 所以主要都是解决自己遇到一些痛点和bug.

## 特性

* 自动完成预览（包括图片）
* 支持加载代码片段模块
* 迷你地图、Vim 模式、字数统计、彩虹括号、代码块高亮
* 自定义占位符、制表符大小、最小完成长度

## Completions

> 输入 `/?`, 你将看到所有的补全命令列表(注意目前插件加上了较多的特性, 更加高级具体的用法可能尚未在文档中列出. 关于cm6 的全部使用说明需要一篇文章来补充, 待填坑)

* `/` 获取用户代码片段
* `[[` 或 `{{` 获取 tiddlers
* `:` 获取emoji表情符号
* `[img[` 获取图片tiddler
* `<$` 获取小部件
* `//` 更改 tiddler 类型
* `#` 插入tiddler标签
* `@#` 打开 codemirror6 设置页面弹窗

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
* all in codemirror6 with tiddlywiki5

<!-- 如果你喜欢这个插件，欢迎 Star [ext[GitHub|https://github.com/oeyoews/tiddlywiki-codemirror6]] -->

## Credits

> BurningTreeC's tiddlywiki codemirror-6 plugin

## Report Bug

https://github.com/oeyoews/tiddlywiki-codemirror6/issues/new