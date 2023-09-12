<center>
<figure>
<img src="https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/img/snapshot.png" class="hidden" alt="neotw banner" title="neotw"/>
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
# method 01: use docker-compose(推荐使用, 最为方便快捷的方法)
docker-compose up -d ## docker-compose.yml 参考 [docker-compose.yml](./docker-compose.yml)

# method 02: docker
docker pull oeyoews/tiddlywiki:latest
docker run -d -p 8080:8080 -v $(pwd)/tiddlywiki:/app/tiddlywiki oeyoews/tiddlywiki:latest --listen port=8080 host=0.0.0.0

# method 03: cli: neotw-app cli 零依赖, 包仅有450kb
pnpm create neotw-app@latest

# method 04: git
git clone --depth 1 https://github.com/oeyoews/tiddlywiki-starter-kit
cd tiddlywiki-starter-kit && pnpm install  # install packages
pnpm start  # start tiddlywiki on https://localhost:8099 or use pm2 with yarn pm2:start

# method 05: 单文件版本 打开 https://neotw.oeyoewl.top/editions, 直接保存网页到本地
```

## Deploy :gear:

<!-- https://vercel.com/docs/deploy-button -->
<a target="_blank" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foeyoews%2Fneotw">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a>

<center>

![cat](https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/img/cat.svg 'cat') ↥︎

</center>

## TODO

- [ ] 配置ci https://github.com/elgohr/Publish-Docker-Github-Action
