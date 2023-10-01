<center>
    <img src="https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/img/snapshot02.png" alt="neotw banner" title="neotw"/>
</center>

> CME的粘贴无效导致无法编辑（无法稳定复现), 甚至会导致系统直接卡死（无法排查）， 不确定是不是tw导致的，默认禁用cme, 如果你想要启用，修改.env 文件即可

## TiddlyWiki starter kit

> 面向(neo)vim用户的 tiddlywiki starter kit

## Installation :package:

```bash
## 仅作为初始体验方式, 生产环境建议使用 docker-compose 方式
docker run -d --name tiddlywiki -p 8080:8080 -v $(pwd)/wiki:/app/wiki oeyoews/tiddlywiki:latest tiddlywiki wiki --listen port=8080 host=0.0.0.0
```

<details>
<summary>其他安装方式</summary>

```bash
# dependcies: git node bun docker docker-compose

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

## 如何使用最新的 tiddlywiki-starter-kit

* 克隆这个仓库, 然后运行 `docker-compose build`

## Deploy :gear:

<!-- https://vercel.com/docs/deploy-button -->
<a target="_blank" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foeyoews%2Fneotw">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a>

![cat](https://cdn.jsdelivr.net/gh/oeyoews/neotw@main/img/cat.svg 'cat')

<!-- - [ ] 配置ci https://github.com/elgohr/Publish-Docker-Github-Action -->
