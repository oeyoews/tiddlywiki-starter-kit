# Tutorials

## Introduce

## How to use tiddlywiki starter kit with locally ?

## How to use tiddlywiki starter kit with docker ?

## How to write tiddlywiki plugin for yourself ？ 

## 插件的开发方式

> 下面顺序还没有经过整理，想到哪写到哪，如有错误遗漏之处欢迎pr。

* tw5里面的插件开发由于其独特的风格，开发方式有很多种，tw 官方的dev文档也没有明确说明，仅仅展示了一些具体的插件代码示例，并没有具体说明（tw的文档是多个tiddler组成的，全靠链接进行联系， 如果没有按照官方的顺序来看，很容易犹豫不知道tiddler的上下文环境感到迷惑
* 如果你对tw的插件代码编写熟悉后，建议在tw源代码仓库里面搜索相关的关键词，查看对应的源码，或者直接看tw官方的插件是如何编写的（js 插件官方使用es5编写，建议直接使用es6 的class编写代码）

* 由于wikitext编写体验没有js/ts代码体验好（wikitext没有lsp，提示全靠snippet， 我个人写的更多是js插件，下面如果没有特殊说明，默认就是js插件开发细节

* 你可以直接在tw里面新建一个文件，文件类型选择javascript，额外添加一个key-value 字段 module-type: widget

## Concepts

* 数据原子：tiddlywiki(以下简称tw）的每一个tiddler都可以看作是一条数据，所有的tiddler可以类比为一个数据库，我们可以重新拿到这些数据以适当的形式重新展示这些数据， 比如写一个卡片组件，时间线组件，轮播图组件，文件树组件等各种ui组件， UI本身没有任何意义， 有了数据后才有了灵魂。

* 灵活性： 可以任意操作dom

## Recipes 

* 如果你的插件经常需要添加样式，请考虑使用css library， 手写样式真的很影响插件的编写体验，如果你熟悉一个css library， 就不需要为此烦恼（css library 不要过大， 在tw里面如果一个插件的大小超过500开， 就可以算得上一个大插件了，一定程度上会影响加载速度）
* tw源代码使用es5， 但是你也可以使用es6，这主要取决于你的浏览器的支持程度（2023年了， 只要你的浏览器不是很旧，几乎都支持）， 但是注意import机制在这里肯定是不支持的，tw使用require； 使用es6可以极大程度上简化代码，比如最常使用的箭头函数，解构赋值，展开运算符，模版字符串， Promise等

## Plugins template

[template](https://github.com/oeyoews/tiddlywiki-starter-kit/tree/main/templates/new-plugin)


> Coming
