# TiddlyWiki API


> [!TIP]
> 主要介绍了一些常用的 tiddlywiki api(JavaScript), 搭配 tw5-typed 效果更好, 代码可在使用 tiddlywiki 网页的控制台进行测试

> 首先这是 99% 你写插件会用到的 api. 大部分常用的方法都在 wiki 里面了

::: code-group

<<< @/snippets/api.js

```html others
<!-- // ## 区分环境(sidebar or storylist) -->
<$list
filter="[<transclusion>prefix[{|$:/core/ui/PageTemplate/sidebar|||}]]"
emptyMessage="in the story river.">
in the sidebar.
</$list>
```

:::