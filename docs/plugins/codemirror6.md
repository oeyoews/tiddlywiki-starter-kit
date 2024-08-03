# Tiddlywiki codemirror6 plugin

* source: https://github.com/oeyoews/tiddlywiki-codemirror6
* online: https://tiddlywiki-codemirror6.vercel.app/#%24%3A%2Fplugins%2Foeyoews%2Ftiddlywiki-codemirror-6

## 背景介绍

* tw 的 codemirror5 插件为了可插拔性， 将codemirror的每个特性模块做成了单独的模块， 对于不熟悉的人来说， 经常会遇到依赖确实导致的报错。又正好看到codemirror6的稳定。 希望使用codemirror6重构一个插件。 当时社区正好有人开始了这个项目。 我第一次使用就觉得很不错。 但是我希望加上一些新特性， 比如vim 代码片段的自动提示， 补全， 借助moderndev项目， 我成功的重构了codemirror6。并且加上了很多新特性.

## 难点

* 主要是tw 本身的theme layout palette之间的概念比较模糊， 对于插件开发使用不同的主题颜色比较困难。还有暗亮模式的问题， 社区并没有一个一致的解决方案。还有就是i18n 的实现。 更多情况下还是要靠开发者自己去实现兼容。所以这一块目前插件虽然做了一部分实现。 但是肯定是不够通用的。 所以目前插件并不会对这些进行很全面的完善。 重点主要是新特性的添加， bug 修复维护.

* 代码高亮： 。。。
* 用户群体受众群体和反馈比较少. 所以主要都是解决自己遇到一些痛点和bug.

## 新特性

* 代码补全
* vim mode

## 安装方法

* just drop it to your tiddlywiki

## 使用技巧

* coming ...

## 常见问题

* coming ...