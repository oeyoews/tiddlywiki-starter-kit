- 支持 <$pangu /> widget 和 om-format-tiddler 的 wikitext 写法。

> 由于 autocorrect 和对剪藏插件的 remark-pangu 支持，和 markdown-it-pangu 的插件的移植后，外加我在 tiddlywiki 中仅仅使用 markdown, 所以很少使用此插件了

## Note

pangu 格式化 markdown/wikitext, 还是需要 remark 等额外 package 才能完美支持 (在 tiddlywiki 可能不会支持)，否则会有一些异常的小问题，请谨慎使用!!!
@see-also: https://github.com/vinta/pangu.js/issues/91

## TODO

- [ ] 借鉴 remark-pangu /markdown-it-pangu(cdn) 支持 pangu format markdown cdn

- pangu 格式化 markdown, 还是需要 remark 等额外 package 才能完美支持，否则会有一些异常的小问题

## Motivation

- 由于中英文掺杂，有时忘记在中英文之间添加空格，还有些写直接复制粘贴过来的内容，或者剪藏的文章，所以我在部署 tiddlywiki 的过程中加上了自动格式化文本的步骤，但是总是有一部分没有识别出来，并且我希望在某些情况下，我可以直接在本机就可以一键自动在中英文之间加上空格，由于 tiddlywiki 的编辑体验很差，自然就不会像 vscode 支持格式化了，所以就把 pangu 移植到了 tiddlywiki 里面。

## Tips

- 翻 pangu issue 的时候看到了 autocorrect(CJK 支持友好), 建议安装 vscode 的对应 autocorrect extension

- markdown-it-pangu 我将会移植到 tiddlywiki 中，但是它不修改 tiddler 文件，仅仅针对 UI 界面，就不会出现不支持 markdown 的情况了，不过仅仅支持 md 的 tiddler.
