# 插件开发

> [!WARNING]
> 文档正在整理中

- tw5 里面的插件开发由于其独特的风格，开发方式有很多种，tw 官方的 dev 文档也没有明确说明，仅仅展示了一些具体的插件代码示例，并没有具体说明（tw 的文档是多个 tiddler 组成的，全靠链接进行联系，如果没有按照官方的顺序来看，很容易犹豫不知道 tiddler 的上下文环境感到迷惑
- 如果你对 tw 的插件代码编写熟悉后，建议在 tw 源代码仓库里面搜索相关的关键词，查看对应的源码，或者直接看 tw 官方的插件是如何编写的（js 插件官方使用 es5 编写，建议直接使用 es6 的 class 编写代码

- 由于 wikitext 编写体验没有 js/ts 代码体验好（wikitext 没有 lsp，提示全靠 snippet，我个人写的更多是 js 插件，下面如果没有特殊说明，默认就是 js 插件开发细节

- 你可以直接在 tw 里面新建一个文件，文件类型选择 javascript，额外添加一个 key-value 字段 module-type: widget


## 插件技巧: 文件后缀

一般文件后缀都是 tid 开头，但是如果你看过 tw 的官方插件的写法，你会发现也可以直接使用 js 后缀，而不需要使用 tid，
那么 tw 是靠什么识别的呢，就是文件开头的注释，tw 会自动识别注释中的一些特殊格式的数据（注释删除真的会影响代码运行）

```js
/*\
title: plugin/username/pluginname/widget.js
type: application/javascript
module-type: widget

here is a js file description

filename: widget.js

\*/
```

就是类似上面的那种格式，或者你也可以直接写 js 代码，将这些数据注释放在 widget.js.meta 的文件中去，写法和 tid 写法一致，注意 meta 前面的名字文件一定要保持一致，其它类型的文件也同理，比如 style.css 和 style.css.meta

- tw 识别每个 tiddler 的 title 全靠 meta 数据，如果一个 tiddler 没有 title 字段，就会默认使用文件系统的真实路径作为 title，比如 `/home/username/workspace/wiki/tiddlers/GettingStarted.tid`，


## 插件命名

推荐写法:

```bash
$:/plugins/author/pluginname
```

## 插件目录介绍

```bash
--- tiddlers
--- readme.tid
--- plugin.info
--- icon.tid
```

在 tw 里面存储 tiddler 的文件目录默认是 tiddlers，所以在插件目录里面也默认使用 tiddlers 名字，可以看作 src 的意思，核心代码都在这个木里面;

icon.tid 提供插件的图标，就是插件 logo 的意思

readme.tid 是关于插件的 readme，同样你也可以使用 readme.md 代替，你可以在 readme.md 文件里面使用 markdown 语法，但是需要安装 markdown 插件，在 tw 里面才能识别

## 插件 UI

在 tw 经常需要操作一些 dom，一般 js 的写法就是使用`document.createElement('xxx')`的做法，但是如果有多个节点需要插入，就需要不断进行 append，看起来比较混乱，tw 基于 createElement 封装了了一个函数 `$tw.utils.domMaker`

建议对每个 widget，加上 fakdom 的特殊处理，防止报错.

```js
const createElement = $tw.utils.domMaker;

const div = createElement('div', {
  class: 'm-2',
  text: 'this is a div node',
  attributes: {
    title: 'tooptip'
  },
  children: [divNode1, divNode2, xxx]
});
```

> 不过现在你可以使用 vue 给 tiddlywiki 写插件了

## Data

- tw 里面的数据有两种格式 json 和 tw 自带的 x-dictionary-tiddler 类型的文件，但是获取后都是一个 json 对象，没有区别，x-dictionary-tiddler 的形式都是 key- value 的类型，形式比较固定，直接使用 require（'xxx.json') 即可加载，就像加载普通的 json 文件一样，唯一需要注意的是文件名字需要使用 tw 里面的文件名字

## 插件相对路径

- require 在 tw 里面同样支持相对路径，只不过是基于 tw 的虚拟文件路由

- tw 模拟了一个 require 机制模块

## 插件文档

- 除了写出好的插件代码，详尽的插件文档或者是教程也是很重要的，因为你的插件面向的是用户，用户只有通过文档才能了解作者的插件应当如何使用，进而完全发挥插件的最大作用，尽可能简洁扼要的说明插件的功能，用法，注意事项，使用示例等必要的说明

## 插件示例

[template](https://github.com/oeyoews/tiddlywiki-starter-kit/tree/main/plugins/oeyoews)

## Concepts

- 数据原子：tw 的每一个 tiddler 都可以看作是一条数据，所有的 tiddler 可以类比为一个数据库，我们可以重新拿到这些数据以适当的形式重新展示这些数据，比如写一个卡片组件，时间线组件，轮播图组件，文件树组件等各种 ui 组件，UI 本身没有任何意义，有了数据后才有了灵魂。每个组件（widget）都可以看作是 react 的组件（component），可以在 tw 的任何地方嵌入使用。

- 灵活性：可以任意操作 dom

## 插件：Suspense

- 如果你使用过 react,vue, 你可能希望在这里也使用上 suspense, 大致思路就是，先把 suspense 的内容放在 dom 中，然后开始获取数据，数据就绪后，移除之前 suspense 的内容，然后把新的内容放在 dom 中

@see-also $:/plugins/oeyoews/neotw-image-gallery/netease-banners.js

## 插件：export

- 类似 vue 的单文件组件 SFC, nextjs 的文件路由的组件默认导出，每一个 widget 的都是一个默认导出 exports.xxx =xxx

## 插件：Require

- tw 插件支持 require, 只不过是基于 tw 内部命名系统，不是本机的文件路由

@see-also $:/plugins/oeyoews/neotw-image-gallery/netease-banners.js

## 插件：样式

- 如果你的插件经常需要添加样式，请考虑使用 css library，手写样式真的很影响 js 插件的编写体验，推荐 css in js 的解决方案，如果你熟悉一个 css library，就不需要为此烦恼（css library 不要过大，在 tw 里面如果一个插件的大小超过 500 开，就可以算得上一个大插件了，一定程度上会影响加载速度）
- tw 源代码使用 es5，但是你也可以使用 es6+，这主要取决于你的浏览器的支持程度（2023 年了，只要你的浏览器不是很旧 => IE，几乎都支持），但是注意 import 机制在这里是不支持的，tw 使用 自己的 require 机制；使用 es6 可以极大程度上简化代码，比如最常使用的箭头函数，解构赋值，展开运算符，模版字符串，Promise 等

- 由于 tw 为了兼容性，没有什么 es6，只能手动封装一些比较常用的函数

## 插件问题排查

- tiddlywiki starter kit 含有大量的定制化插件，插件可以使用配置文件动态加载，tiddlers 文件夹默认为空，尽量保持了高内聚低耦合，但是仍然会有一些奇怪的问题排查起来很费时费力 (尤其是多个 bug)

## 插件模版

[template](https://github.com/oeyoews/tiddlywiki-starter-kit/tree/main/templates/)

> Coming

> 这个目录的文件已经通过软链接的相对路径链接到 tiddlers（neotw-tiddlers）里面，所以你也可以在 [website](https://neotw.oeyoewl.top) 里面看到这些文章（docs 开头）
