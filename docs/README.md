> [!NOTE]
>  WIP 正在制作中..., 目前文档结构暂未整理.

## 写在前面

完备的文档可以让开发者快速了解一个项目进行开发，很遗憾，tiddlywiki(以下简称 tw) 虽然有文档，但不多。如果想要深入了解，只能通过源代码.

<!--
好在 tw 的源代码的注释还是比较友好的（我并没有看完 tw 的源代码，只是大致过了一遍，然后需要的时候就直接搜索关键词再仔细看具体的代码，难道这就是面向 api 开发？） ... 未完待续
-->

<!--
这无疑增加了每个开发者的负担，并且严重影响效率，tw 的用户很少很少，一直坚持使用的大概是真爱了吧，使用 tw 并且进行开发 tw 插件的就少上加少了，tw 没有进行商业化开发，所以很多功能虽然有了，但是使用体验过上并不好，但 tw 真的是一款令人瞬间眼前一亮的软件.
-->

## 关于插件

tiddlywiki 的这些插件大多都是几个小时或者几分钟做出来的, 几乎都是 js plugin, 几乎每个插件代码函数都是 200 行以内。

codemirror6 插件除外，大概有 3000 行代码.

## 大致会写什么

- js 系列插件开发经验技巧 (会对比 react vue 来说，便于理解),技巧，关于 js, 在项目中我会为每个大型插件使用 ts, 类型推断，自动提示可以获得更好的开发体验，moderndev 对于一些比较复杂的 tw 插件就很有帮助，不过大多数情况下，每个插件的代码函数不会超过 300 行，我更倾向于使用无依赖的 js 单文件来写，不依赖构建工具，干净整洁.

[online preview](https://tiddlywiki-starter-kit.vercel.app/#docs%2FREADME)

## 为什么写 tiddlywiki starter kit？

本身 Node.js 启动 tw 也就是一条命令行的事，很简单，但是为了满足自己的各种需求，命令行就不方便了，tiddlywiki starter kit 经过多版本迭代，历经两年 + 打磨而成。

tiddlywiki starter kit 目前是极其高度自定义化的，从安装，启动，构建，部署，使用等每个步骤都加入了自定义化配置。

- 安装：支持 cli, git, docker, html 等多种安装使用方式
- 启动：支持切换不同类别的存储文件夹
- 构建：支持为第三方框架构建数据源
- 部署：支持 windows, linux, vercel, netlify, docker 多种本地/云服务厂商部署方式
- 使用：基于 tiddlywiki starter kit 的插件的各种使用场景

* 本地优先 (Local First), 数据自由且安全

## 使用场景

- 日记
- 图片画廊
- 链接汇总
- 视频汇总
- 剪藏文章
- 在线分享
- 文章写作
- 代码展示
- 个人主页
- 电视，电影，动漫纪律
- 书籍整理
- ...

* Everything is Possible.
* 你的下一个笔记软件又何必是 Notion ?

# Tutorials

## 安装方式

```bash
npm create neotw-app@latest
```

```bash
# dependcies: git node bun docker docker-compose

# method 01: docker
docker run -d --name tiddlywiki -p 8080:8080 -v $(pwd)/wiki:/app/wiki oeyoews/tiddlywiki:latest tiddlywiki wiki --listen port=8080 host=0.0.0.0

# method 02: use docker-compose(推荐使用, 最为方便快捷的方法)
docker-compose up -d ## docker-compose.yml 参考 [docker-compose.yml](./docker-compose.yml)

# method 03: clone repo directly
git clone --depth 1 https://github.com/oeyoews/tiddlywiki-starter-kit
cd tiddlywiki-starter-kit && pnpm install  # install packages
pnpm start  # start tiddlywiki on https://localhost:8099 or use pm2 with yarn pm2:start

# method 04: 单文件版本 打开 https://neotw.oeyoewl.top/editions, 直接保存网页到本地

# method 05: systemd https://www.freedesktop.org/software/systemd/man/systemd.service.html

# method 06: pnpm pm2 start（我目前使用的方式， 因为我主要在本地使用，需要频繁更新tiddlywiki-starter-kit源码，避免每次都要构建docker mirror的步骤）

```

## Introduce

## 开发依赖

- FONTS: maple
- ENV: nodejs/bun pnpm/npm Git
- EDITOR: vscode/neovim/others

## 使用 moderndev 构建 的插件

- cm6: https://github.com/oeyoews/tiddlywiki-codemirror6
- echarts: https://github.com/oeyoews/tw-echarts(forked)

## How to use tiddlywiki starter kit with locally ?

- 事实上 tiddlywiki starter kit 由三部分组成

1. tiddlywiki-starter-kit（核心）
2. neotw-tiddlers（用户 markdown 文件）
3. subwiki（用户个人 wiki）

`tiddlywiki.info` 实际上一个 json 类型的文件，但是 json 文件不支持注释，每次只能手动编辑这个文件手动更新，因此 tiddlywiki-starter-kit 借助 dotenv 将配置放在.env 文件中，每次启动 tw 的时候动态生成 tiddlywiki.info 文件，这可以在不同的环境使用不同的配置，目前主要针对本地和部署环境，部署环境下可以自动移除不需要的插件，并且使用仅仅在部署时使用的插件，因此不建议手动编辑 tiddlywiki.info 文件，此文件仅仅用来让 tw 来读取启动

## Playground

- 每个 tw 网页都可以看作是一个 playground，你可以在上面任情玩耍，而不用担心弄坏什么

## 构建

- 在 tiddlywiki.info 文件中，build 是一个数组，在里面可以添加多个构建步骤，在构建的时候如果 build 后面不加具体的构建步骤，默认会执行里面的所有步骤，在 tiddlywiki-starter-kit 里面默认支持目录为.tiddlywiki, 默认使用 external.js 同时生成 offline.html/index.html

## 部署

- tw 生成的是单文件可部署文件，因此不限制部署平台，甚至可以直接使用 tw server，tiddlywiki-starter-kit 使用的 vercel/github pages 方式

## How to use tiddlywiki starter kit with docker ?

## How to write tiddlywiki plugin for yourself ?

## 插件配置

...

## 插件加载顺序

很抱歉，tw 并不支持指定插件的加载顺序，但是你可以决定条目的优先级 ...未完待续

## 文件后缀

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

## 插件名字

$:/plugins/author/pluginname (插件名字可以任意命名但不推荐，建议使用官方写法）

## 插件介绍

```bash
--- tiddlers
--- readme.tid
--- plugin.info
--- icon.tid
```

在 tw 里面存储 tiddler 的文件目录默认是 tiddlers，所以在插件目录里面也默认使用 tiddlers 名字，可以看作 src 的意思，核心代码都在这个木里面;

icon.tid 提供插件的图标，就是插件 logo 的意思

readme.tid 是关于插件的 readme，同样你也可以使用 readme.md 代替，你可以在 readme.md 文件里面使用 markdown 语法，但是需要安装 markdown 插件，在 tw 里面才能识别

## 插件的开发方式

> 下面顺序还没有经过整理，想到哪写到哪，如有错误遗漏之处欢迎 pr。

- tw5 里面的插件开发由于其独特的风格，开发方式有很多种，tw 官方的 dev 文档也没有明确说明，仅仅展示了一些具体的插件代码示例，并没有具体说明（tw 的文档是多个 tiddler 组成的，全靠链接进行联系，如果没有按照官方的顺序来看，很容易犹豫不知道 tiddler 的上下文环境感到迷惑
- 如果你对 tw 的插件代码编写熟悉后，建议在 tw 源代码仓库里面搜索相关的关键词，查看对应的源码，或者直接看 tw 官方的插件是如何编写的（js 插件官方使用 es5 编写，建议直接使用 es6 的 class 编写代码

- 由于 wikitext 编写体验没有 js/ts 代码体验好（wikitext 没有 lsp，提示全靠 snippet，我个人写的更多是 js 插件，下面如果没有特殊说明，默认就是 js 插件开发细节

- 你可以直接在 tw 里面新建一个文件，文件类型选择 javascript，额外添加一个 key-value 字段 module-type: widget

## UI

在 tw 经常需要操作一些 dom，一般 js 的写法就是使用`document.createElement('xxx')`的做法，但是如果有多个节点需要插入，就需要不断进行 append，看起来比较混乱，tw 基于 createElement 封装了了一个函数 `$tw.utils.domMaker`

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

## 指定保存目录

```bash
'default-tiddler-location': 'tiddlers'
```

tw 会一直读取这个文件的内容，无论修改成什么值，可以看作值 public folder, 但是注意，如果在改成了别的之后，如果修改了 tiddlers 文件夹的内容，对应的文件会转移到新的文件。https://github.com/oeyoews/tiddlywiki-starter-kit/issues/117

## Data

- tw 里面的数据有两种格式 json 和 tw 自带的 x-dictionary-tiddler 类型的文件，但是获取后都是一个 json 对象，没有区别，x-dictionary-tiddler 的形式都是 key- value 的类型，形式比较固定，直接使用 require（'xxx.json') 即可加载，就像加载普通的 json 文件一样，唯一需要注意的是文件名字需要使用 tw 里面的文件名字

## meta

- tw 识别每个 tiddler 的 title 全靠 meta 数据，如果一个 tiddler 没有 title 字段，就会默认使用文件系统的真实路径作为 title，比如 `/home/username/workspace/wiki/tiddlers/GettingStarted.tid`，

## 相对路径

- require 在 tw 里面同样支持相对路径，只不过是基于 tw 的虚拟文件路由

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

## Recipes

- 如果你的插件经常需要添加样式，请考虑使用 css library，手写样式真的很影响 js 插件的编写体验，推荐 css in js 的解决方案，如果你熟悉一个 css library，就不需要为此烦恼（css library 不要过大，在 tw 里面如果一个插件的大小超过 500 开，就可以算得上一个大插件了，一定程度上会影响加载速度）
- tw 源代码使用 es5，但是你也可以使用 es6+，这主要取决于你的浏览器的支持程度（2023 年了，只要你的浏览器不是很旧 => IE，几乎都支持），但是注意 import 机制在这里是不支持的，tw 使用 自己的 require 机制；使用 es6 可以极大程度上简化代码，比如最常使用的箭头函数，解构赋值，展开运算符，模版字符串，Promise 等

- 由于 tw 为了兼容性，没有什么 es6，只能手动封装一些比较常用的函数

## 源码解读系列

on github: [code.js](./code.js)
on tw: [[docs/code.js]]

## bug 排查

- tiddlywiki starter kit 含有大量的定制化插件，插件可以使用配置文件动态加载，tiddlers 文件夹默认为空，尽量保持了高内聚低耦合，但是仍然会有一些奇怪的问题排查起来很费时费力 (尤其是多个 bug)

## 关于中文教程

中文教程里面也有一些相关的插件开发介绍，但是不够系统，在 tw 里面分散为多个文件，很容易失去文章的上下文，不利于快速通读了解 tw 的大致插件开发流程，但也值得一看。

## Plugins template

[template](https://github.com/oeyoews/tiddlywiki-starter-kit/tree/main/templates/new-plugin)

> Coming

> 这个目录的文件已经通过软链接的相对路径链接到 tiddlers（neotw-tiddlers）里面，所以你也可以在 [website](https://neotw.oeyoewl.top) 里面看到这些文章（docs 开头）

## Related Links

- moderndev: https://github.com/tiddly-gittly/Modern.TiddlyDev
- tiddlywiki: https://tiddlywiki.com and https://github.com/Jermolene/TiddlyWiki5
- tiddlywiki talk: https://talk.tiddlywiki.org and ~~https://talk.tidgi.fun/ (时常离线无法访问)~~
- tiddlywiki dev: https://tiddlywiki.com/dev
- prelease: https://tiddlywiki.com/prerelease
- full editions: https://tiddlywiki.com/editions/full
- tiddlywiki host: https://tiddlyhost.com/
