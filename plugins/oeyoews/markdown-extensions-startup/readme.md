<!-- plugin template readme -->

- 声明对应的 markdow-it 插件为 `module-type: markdownit` 即可, tiddlywiki 将会通过此插件 (markdown-extensions-startup) 加载对应的 markdown-it 插件.

## TODO

- 暂不支持 markdown-it plugins option

## Motivation

仿照 codemirror5 的插件模块加载机制, 将 markdown-it 的每个插件单独打包成插件, 按需加载

<!-- your plugin motivation, or why you write this plugin -->
