# markdown-extensions-startup

> 仿照 codemirror5 的插件模块加载机制, 将 markdown-it 的每个插件单独打包成插件, 按需加载

## 插件在线地址

<TwPlugin name="markdown-extensions-startup" />

## 介绍

- 声明对应的 markdow-it 插件为 `module-type: markdownit` 即可, tiddlywiki 将会通过此插件 (markdown-extensions-startup) 加载对应的 markdown-it 插件.

## Why it

* 我不想要在 tiddlywiki 里面写 难用的 wikitext, 所以就添加了很多的 markdown-it 插件来优化 markdown 相关的使用体验
