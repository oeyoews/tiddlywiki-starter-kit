---
title: 'Electron_原作者是谁？_-_知乎'
tags: ['剪藏']
type: 'text/markdown'
created: 'Sat Nov 04 2023 03:44:32 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://www.zhihu.com/question/365145291/answer/2767987551'
---

# Electron_原作者是谁？_-_知乎

是他，[赵成（zcbenz）](https://link.zhihu.com/?target=https%3A//github.com/zcbenz)（如侵权，马上删）

![](https://picx.zhimg.com/50/v2-86152a714adff286d97dd9a32848a373_720w.jpg?source=2c26e567)

没错，是中国人（华人），聊 Electron 初创时期的历史不得不说[NW.js](https://link.zhihu.com/?target=https%3A//nwjs.io/)

2011 年左右，中国英特尔开源[技术中心](https://www.zhihu.com/search?q=%E6%8A%80%E6%9C%AF%E4%B8%AD%E5%BF%83&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A2767987551%7D)的[王文睿（Roger Wang）](https://link.zhihu.com/?target=https%3A//github.com/rogerwang)希望能用 Node.js 来操作 WebKit，而创建了 node-webkit 项目，这就是 NW.js 的前身。[英特尔公司](https://www.zhihu.com/search?q=%E8%8B%B1%E7%89%B9%E5%B0%94%E5%85%AC%E5%8F%B8&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A2767987551%7D)大力支持了这个项目，不但允许王文睿分出一部分精力来做这个[开源项目](https://www.zhihu.com/search?q=%E5%BC%80%E6%BA%90%E9%A1%B9%E7%9B%AE&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A2767987551%7D)，还给了他招聘名额，允许他招聘其他工程师来一起完成这个项目。

2012 年，[赵成（zcbenz）](https://link.zhihu.com/?target=https%3A//github.com/zcbenz)加入到王文睿的小组，并对 [node-webkit](https://www.zhihu.com/search?q=node-webkit&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A2767987551%7D) 项目做出了大量的改进。后来赵成离开了英特尔，帮助 GitHub 团队尝试把 node-webkit 应用到 Atom [编辑器](https://www.zhihu.com/search?q=%E7%BC%96%E8%BE%91%E5%99%A8&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A2767987551%7D)上，但由于当时 node-webkit 还并不稳定，且 node-webkit 项目的走向也不再受赵成的控制了，这个尝试最终以失败告终。

但赵成和 GitHub 团队并没有放弃，而是着手开发另一个类似 node-webkit 的项目：Atom Shell（2013 年 4 月），这个项目就是 Electron 的前身，赵成在这个项目上倾注了大量的心血，这也是这个项目后来广受欢迎的关键因素之一，再后来 GitHub 把这个项目开源出来（2014 年 5 月），最终更名为 Electron（2015 年 4 月）。

**现如今赵成好像已经不再负责 Electron 项目的管理工作了**，而是交棒给了一个小姐姐了，就是这张照片里的 C 位女孩儿：[Shelley（codebytere）](https://link.zhihu.com/?target=https%3A//github.com/codebytere)

![](https://pica.zhimg.com/50/v2-9ab25ba5b83e15c6be2d0daef8c2d6f6_720w.jpg?source=2c26e567)

这个女孩儿也厉害的很，在做 Electron 开发工作的同时，还是[nodejs](https://www.zhihu.com/search?q=nodejs&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A2767987551%7D)、tc39 和 openjs-foundation 的成员。不过我个人感觉她对待开发者提的 Issue 和 PR 比较草率，没有赵成认真。

相对于[Shelley（codebytere）](https://link.zhihu.com/?target=https%3A//github.com/codebytere)来说，我更喜欢[Jeremy Rose（nornagon）](https://link.zhihu.com/?target=https%3A//github.com/nornagon)，是他最早提出[remote](https://www.zhihu.com/search?q=remote&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A2767987551%7D)模块的危害性的！不知道是照片里的哪一位（应该是坐着的右一）。

另外 VSCode 团队工程师[Robo（deepak1556）](https://link.zhihu.com/?target=https%3A//github.com/deepak1556)，也是 Electron 的核心贡献者，他提了很多很有深度的 PR。（没错，当他们觉得 Electron 无法满足 VSCode 的需求的时候，他们就来帮着改 Electron 的代码。）
