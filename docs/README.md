# TiddlyWiki Starter Kit?

<img src="/img/tiddlywiki-starter-kit.webp" class="rounded-md mt-2" />

> 你的下一个笔记软件又何必不是 TiddlyWiki5 ?(your next note software is not TiddlyWiki5?), 让 TiddlyWiki5 给你带来亿点点震撼，重新定义笔记软件.

<audio controls class="w-full my-2">
  <source src="/tw.mp3" type="audio/mp3">
Your browser does not support the audio element.
</audio>

:::tip
什么是 TiddlyWiki Starter Kit?, 可以简单理解成 NextJs 和 React, Nuxt 和 vue, Svelte 和 SvelteKit 之间的关系(what is TiddlyWiki Starter Kit?, can be simplified as nextjs and react, nuxt and vue, svelte and sveltekit)
:::

<!-- * 像很多人一样， 我也对记笔记很感兴趣。曾经为了找到一款好用的软件，经常到处尝试各类笔记软件， 虽然各有优点， 但是我总感觉哪里不对， 甚至有的软件在我进去看到的第一眼我就关掉了它。 后来我才发现， 原来是笔记内容要么是过于依赖软件本身， 要么是软件本身使用过于繁琐，界面过于花哨。要么是软件扩展性不够好， 甚至没有。同时我是一名programmer+vimer, 编辑器自然要支持vim. 我想同时满足我这些条件的软件尚且不存在。 但是直到我发现了tiddlywiki, 当时的感觉就好比哥伦布发现新大陆， 心中狂喜， 豪不夸张的说，它满足了我对所有笔记软件的幻想， 当然它有很多不足， 但是在我和tiddlywiki的磨合中， 通过我不断的改进， 这个笔记软件已经可以满足我所有的需求了。真的，这是我的最后一款比较软件。 -->

<!-- * 其实， 在我第一次看到tiddlywiki时， 那是一次偶然， 我完全不知道那个网页就是tiddlywiki, 只是当时觉得，它优点不太一样。然后我就随手关掉了它。 不知道过了多久， 我看到了太微文档。 从此开始了不解之缘 -->

* 其实在写这个之前，我还写了 [tw5](https://github.com/oeyoews/tw5), 算是前身. Nodejs TiddlyWiki 启动 TiddlyWiki5 也就是一条命令行的事，很简单，但是为了满足自己的各种需求，比如启动部署，更多的功能，tiddlywiki starter kit 就经过多个版本的迭代诞生了。
* (actually, tiddlywiki starter kit is a series of iterations from the original tw5, and I have written it in Nodejs. It is a simple command line, but it is also used for different needs, such as deployment, more features, and tiddlywiki starter kit is developed in multiple versions.)

tiddlywiki starter kit 目前是极其高度自定义化的，从安装，启动，构建，部署，使用等每个步骤都加入了自定义化配置。

(tiddlywiki starter kit is highly customized from installation, startup, construction, deployment, and use. It includes customization configuration for each step.)

- 安装：支持 cli, git, docker, html 等多种安装使用方式(installing: cli, git, docker, html)
- 启动：支持切换不同类别的存储文件夹
- 构建：支持为第三方框架构建数据源
- 部署：支持 windows, linux, vercel, netlify, docker 多种本地/云服务厂商部署方式
- 使用：基于 tiddlywiki starter kit 的插件的各种使用场景

* 本地优先 (Local First), 数据自由且安全
* Everything is Possible.

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

## 安装

```bash
npm create neotw-app # cli: The simplest and easiest way
```

> 其他方法
```bash
# dependcies: git node bun docker docker-compose

# method 01: docker
docker run -d --name tiddlywiki -p 8080:8080 -v $(pwd)/wiki:/app/wiki oeyoews/tiddlywiki:latest tiddlywiki wiki --listen port=8080 host=0.0.0.0

# method 02: use docker-compose(推荐使用, 最为方便快捷的方法)
docker-compose up -d ## docker-compose.yml 参考 [docker-compose.yml](./docker-compose.yml)

# method 03: clone repo directly
Git clone --depth 1 https://github.com/oeyoews/tiddlywiki-starter-kit
cd tiddlywiki-starter-kit && pnpm install  # install packages
pnpm start  # start tiddlywiki on https://localhost:8099 or use pm2 with yarn pm2:start

# method 04:
单文件版本 打开 https://tiddlywiki-starter-kit.oeyoews.top/offline.html,  直接保存网页到本地

# method 05: systemd https://www.freedesktop.org/software/systemd/man/systemd.service.html

```

## 运行

- 事实上 tiddlywiki starter kit 由三部分组成

1. tiddlywiki-starter-kit（核心）
2. neotw-tiddlers（用户 markdown 文件）
3. subwiki（用户个人 wiki）

`tiddlywiki.info` 实际上一个 json 类型的文件，但是 json 文件不支持注释，每次只能手动编辑这个文件手动更新，因此 tiddlywiki-starter-kit 借助 dotenv 将配置放在.env 文件中，每次启动 TiddlyWiki5 的时候动态生成 tiddlywiki.info 文件，这可以在不同的环境使用不同的配置，目前主要针对本地和部署环境，部署环境下可以自动移除不需要的插件，并且使用仅仅在部署时使用的插件，因此不建议手动编辑 tiddlywiki.info 文件，此文件仅仅用来让 TiddlyWiki5 来读取启动

- 每个 TiddlyWiki5 网页都可以看作是一个 playground，你可以在上面任情玩耍，而不用担心弄坏什么

## 配置：指定保存目录

```bash
'default-tiddler-location': 'tiddlers'
```

TiddlyWiki5 会一直读取这个文件的内容，无论修改成什么值，可以看作值 public folder, 但是注意，如果在改成了别的之后，如果修改了 tiddlers 文件夹的内容，对应的文件会转移到新的文件。https://github.com/oeyoews/tiddlywiki-starter-kit/issues/117

## 为什么写这么多 TiddlyWiki 插件

* 前后大概写了 200 款插件，但是现在主要维护的只有 90 多个，其实我写插件的目的主要有两个，一个是练习代码，熟悉一些技术栈，所以每天都会逛论坛找一些写插件的点子, 其次就是，tiddlywiki 很符合我对笔记软件的幻想，虽然有一些不完美，但是刚好可以通过我的第一个目的来弥补这个不完美. 现在这两个目的几乎全部达到了

[online preview](https://tiddlywiki-starter-kit.vercel.app/#docs%2FREADME)

## 资源

- usewiki: 类似于 usememo 的扩展插件，但是同时也支持剪切网页，markdown 支持友好
- moderndev: https://github.com/tiddly-gittly/Modern.TiddlyDev
- tiddlywiki: https://tiddlywiki.com and https://github.com/Jermolene/TiddlyWiki5
- tiddlywiki talk: https://talk.tiddlywiki.org and ~~https://talk.tidgi.fun/ (偶尔无法访问)~~
- tiddlywiki dev: https://tiddlywiki.com/dev
- prelease: https://tiddlywiki.com/prerelease
- full editions: https://tiddlywiki.com/editions/full
- tiddlywiki host: https://tiddlyhost.com/