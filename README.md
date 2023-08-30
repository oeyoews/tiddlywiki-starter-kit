<center>
<figure>
<img src="https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/img/snapshot.png" class="hidden" alt="neotw banner" title="neotw"/>
<!-- <img src="https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/img/snapshot01.png" class="hidden" alt="neotw banner" title="neotw"/> -->
</figure>
</center>

<hr>

# Intro

<figcaption class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-pink-500 to-yellow-500 line-clamp-1">
    A modern style and elegant notebook built with Tiddlywiki5 and Tailwindcss
</figcaption>

> 面向neovim(vim)用户的 tiddlywiki starter kit

## Status :tada:

> [neotw](https://github.com/oeyoews/neotw) 的所有配置及插件现在全部处于**稳定状态**

> 为了减少tiddlers文件夹变动导致diff困难以及增加仓库大小, 因此将tiddlers单独放置到一个[仓库](https://github.com/oeyoews/neotw-tiddlers), 每次更新tiddlywiki-starter-kit仓库时, 会自动用tiged获取最新的tiddlers文件夹, 借助pnpm和vercel的缓存, 整个构建时间平均在9s~13s之间(主要是tiddlywiki build 耗时)(由于tiged的机制问题,neotw-tiddlers的仓库的更新,不会再实时更新此网站的内容, 需要手动触发)

## Installation :package:

```bash
# cli
pnpm dlx create neotw-app
# git
git clone --depth 1 https://github.com/oeyoews/tiddlywiki-starter-kit
cd tiddlywiki-starter-kit && pnpm install  # install packages
pnpm start  # start tiddlywiki on https://localhost:8099 or use pm2 with yarn pm2:start
```

😜 最简单的使用办法就是打开Neotw模板站点, 直接保存网页到本地;
或者直接下载Release里面的[Zip](https://github.com/oeyoews/tiddlywiki-starter-kit/releases) 压缩包

[oeyoews 是如何使用Tiddlywiki的](https://neotw.oeyoewl.top/#how-to-use-tiddlywiki%40oeyoews)

## usage

* 所有编辑的内容都会自动保存在项目的tiddlers文件夹下, tiddlywiki默认读取这个文件夹, 但是也可以通过配置指定其他的文件夹(不过强烈不建议修改)

* 理论上你也复制不同内容的tiddlers到这个目录下, 比如你曾经使用obsdian写的markdown文件

## Deploy :gear:

<!-- https://vercel.com/docs/deploy-button -->
<a target="_blank" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foeyoews%2Fneotw">
<img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a>
<!-- https://docs.netlify.com/site-deploys/create-deploys/ -->
<a target="_blank" href="https://app.netlify.com/start/deploy?repository=https://github.com/oeyoews/neotw">
<img src="https://www.netlify.com/img/deploy/button.svg">
</a>

<center>

![cat](https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/img/cat.svg 'cat') ↥︎

</center>
