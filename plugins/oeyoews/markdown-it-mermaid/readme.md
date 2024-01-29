## markdownit mermaid

> [!NOTE]
> mermaid 使用 9.3.0 版本，9.4.0 体积增加了 2MB(但是官方文档没有明确说明增加了什么，没有找到，), 9.4.0 使最后一个 cjs 版本，v10.0.0 以后是 ESM only, 所以 mermid 的库将会固定为 9.3.0，没有更新的必要。GitHub 使用的 mermaid 版本目前是 10.0.2.

## Features

* support to html(orange/mermaid-tw5 not support)

```mermaid
info
```

```mermaid
---
title: plugin dependencies
---
graph LR;
%% mermaid in tiddlywiki
a[(<strong>markdown</strong>)] --> markdown-it-mermaid & orange/mermaid-tw5 & markdown-extensions-startup
a -.->|option dependency| e([medium-zoom])
		linkStyle 0 stroke:red;
		linkStyle 1 stroke:blue;
		linkStyle 2 stroke:yellow;
		style a stroke-width: 2px,stroke:#333;
```


## Motivation

Although I can use mermaid through `<$mermaid text="xxx" />` or `$$$$text/vnd.tiddlywiki/mermaid xxxx$$$`, or create a new type of text/vnd.tiddlywiki/mermaid tiddler, but these are not very convenient for me.

And there are some areas in the original mermaid plugin that I would like to improve, but I have not rewritten that plugin. I created a markdown-it-mermaid plugin suitable for tiddlywiki. Fortunately, github also supports this format, so I can not only browse in tiddlywiki, but users on GitHub can also view mermaid

![img](https://talk.tiddlywiki.org/uploads/default/original/2X/b/b7e4e40f767fb0a27dc5839a1540942808e5c9fc.gif)

## TODO

* https://github.com/mermaid-js/mermaid/issues/4358 v10 以后添加了一个 mermaid.run, 其中有一个 supresserror 选项可以做到这一点，但是由于 esm 的问题，暂时无法升级
* support event: 只有新版支持 click 的写法.
* 旧版不支持 markdown 标记语法，比如加粗斜体
* 旧版不支持一些 class 写法，包括 fontawesome
* 不支持 timeline, quadrantChart
* add config option for png or svg
* support svg to zoom:  https://github.com/bumbu/svg-pan-zoom
* 渲染成 image, 导致 markdown export 导出爆粗