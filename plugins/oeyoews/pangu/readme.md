- 支持 <$pangu /> widget 和 om-format-tiddler 的wikitext 写法.

## Note

pangu 格式化markdown, 还是需要remark等额外package才能完美支持, 否则会有一些异常的小问题

## TODO

pangu 格式化markdown, 还是需要remark等额外package才能完美支持, 否则会有一些异常的小问题

```md
**中文**
```

会被自动分开

## Motivation

- 由于中英文掺杂, 有时忘记在中英文之间添加空格,还有些写直接复制粘贴过来的内容, 或者剪藏的文章, 所以我在部署tiddlywiki的过程中加上了自动格式化文本的步骤, 但是总是有一部分没有识别出来, 并且我希望在某些情况下, 我可以直接在本机就可以一键自动在中英文之间加上空格, 由于tiddlywiki的编辑体验很差, 自然就不会像vscode支持格式化了, 所以就把pangu移植到了tiddlywiki里面.
