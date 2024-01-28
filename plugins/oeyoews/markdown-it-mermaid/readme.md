## markdownit mermaid

```mermaid forest
---
title: plugin dependencies
---
graph LR;
a[(markdown)] --> markdown-it-mermaid & orange/mermaid-tw5 & markdown-extensions-startup
		linkStyle 0 stroke:red;
		linkStyle 1 stroke:blue;
		linkStyle 2 stroke:yellow;
```

## Motivation

Although I can use mermaid through `<$mermaid text="xxx" />` or `$$$$text/vnd.tiddlywiki/mermaid xxxx$$$`, or create a new type of text/vnd.tiddlywiki/mermaid tiddler, but these are not very convenient for me.

And there are some areas in the original mermaid plugin that I would like to improve, but I have not rewritten that plugin. I created a markdown-it-mermaid plugin suitable for tiddlywiki. Fortunately, github also supports this format, so I can not only browse in tiddlywiki, but users on GitHub can also view mermaid

![img](https://talk.tiddlywiki.org/uploads/default/original/2X/b/b7e4e40f767fb0a27dc5839a1540942808e5c9fc.gif)