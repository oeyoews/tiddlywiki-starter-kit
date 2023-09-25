<center>
    <img src="https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/img/snapshot02.png" alt="neotw banner" title="neotw"/>
</center>

## TiddlyWiki starter kit

<!-- <figcaption class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-pink-500 to-yellow-500 line-clamp-1">
    A modern style and elegant notebook built with Tiddlywiki5 and Tailwindcss
</figcaption> -->

> 面向(neo)vim用户的 tiddlywiki starter kit

## Installation :package:

```bash
docker run -d --name tiddlywiki -p 8080:8080 -v $(pwd)/wiki:/app/wiki oeyoews/tiddlywiki:latest tiddlywiki wiki --listen port=8080 host=0.0.0.0
```

<details>
<summary>其他安装方式</summary>

```bash
# method 01: use docker-compose(推荐使用, 最为方便快捷的方法)
docker-compose up -d ## docker-compose.yml 参考 [docker-compose.yml](./docker-compose.yml)

# method 03: cli: neotw-app cli 零依赖, 包仅有450kb
pnpm dlx create-neotw-app@latest

# method 04: git
git clone --depth 1 https://github.com/oeyoews/tiddlywiki-starter-kit
cd tiddlywiki-starter-kit && pnpm install  # install packages
pnpm start  # start tiddlywiki on https://localhost:8099 or use pm2 with yarn pm2:start

# method 05: 单文件版本 打开 https://neotw.oeyoewl.top/editions, 直接保存网页到本地
```
</details>

## Deploy :gear:

<!-- https://vercel.com/docs/deploy-button -->
<a target="_blank" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foeyoews%2Fneotw">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a>

![cat](https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/img/cat.svg 'cat')

<!-- - [ ] 配置ci https://github.com/elgohr/Publish-Docker-Github-Action -->
