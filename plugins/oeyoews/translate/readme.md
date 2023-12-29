<!-- plugin template readme -->

> 默认翻译引擎为 Google Translate

## Usage

- 在 tiddler 的字段上添加一个 `translate: yes`, 就会自动显示翻译按钮了.

## Recipes

- 建议翻译纯文本, 不建议翻译带有 wikitext, 因为 wikitext 不支持全角字符 ! 等字符, 所以一些标题不会被识别, markdown 遇到 ## 会报错

~~其实也可以将翻译的内容提前渲染成 html, 然后翻译(还没试过)~~ 试过了, 不行, 有 bug.

## Motivation

<!-- your plugin motivation, or why you write this plugin -->
