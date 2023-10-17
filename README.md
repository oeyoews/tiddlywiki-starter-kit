<center>
    <img src="https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/img/snapshot02.png" alt="neotw banner" title="neotw"/>
</center>

![TIDDLY Static Badge](https://img.shields.io/badge/Tiddlywiki5-neotw-green?style=for-the-badge&logo=tiddlywiki) ![Version JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Foeyoews%2Ftiddlywiki-starter-kit%2Fraw%2Fmain%2Fpackage.json&query=version&style=for-the-badge&logo=tiddlywiki&label=version)

## TiddlyWiki starter kit

> 面向但不限于(neo)vim用户的 tiddlywiki starter kit

## Features

- UI: 借助 Tailwindcss 快速优化页面展示, 响应式页面
- 动态目录: 直接切换读取的tiddlers

## Installation

```bash
npm create neotw-app@latest
```

<details>
<summary>其他安装方式</summary>

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

</details>

## Deploy

> 点击下面的按钮, 一键部署到Vercel.

<!-- https://vercel.com/docs/deploy-button -->
<a target="_blank" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foeyoews%2Ftiddlywiki-starter-kit">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a>

> NOTE: vercel不会进行浅克隆，很大几率导致部署失败，此仓库提交次数过多，建议用户手动潜浅克隆仓库，手动在vercel上进行部署

## Preview

<!-- [tiddlywiki starter kit](https://tiddlywiki-starter-kit.xxx) -->

- [Tiddlyhost Site](https://tiddlywiki-starter-kit.tiddlyhost.com/)
- [Github Pages](https://oeyoews.github.io/tiddlywiki-starter-kit/) Empty
- [Vercel Site](https://tiddlywiki-starter-kit.vercel.app/)

![cat](https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/img/cat.svg 'cat')

<!-- - [ ] 配置ci https://github.com/elgohr/Publish-Docker-Github-Action -->
