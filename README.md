<center>
    <img src="https://cdn.jsdelivr.net/gh/oeyoews/tiddlywiki-starter-kit@main/docs/public/img/tiddlywiki-starter-kit.webp" title="tiddlywiki starter kit" class="spotlight rounded-lg" />
    <!-- <img src="https://cdn.jsdelivr.net/gh/oeyoews/tiddlywiki-starter-kit@main/img/banner5.svg" title="tiddlywiki starter kit" class="spotlight rounded-lg" /> -->

| <img src="https://cdn.jsdelivr.net/gh/oeyoews/tiddlywiki-starter-kit@main/img/banner06.png"  class="spotlight rounded-lg" /> | <img src="https://cdn.jsdelivr.net/gh/oeyoews/tiddlywiki-starter-kit@main/img/banner08.png"  class="spotlight rounded-lg" /> |
|------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
<!-- <img src="https://img.shields.io/badge/Tiddlywiki5-neotw-green?style=for-the-badge&logo=tiddlywiki"> <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Foeyoews%2Ftiddlywiki-starter-kit%2Fraw%2Fmain%2Fpackage.json&query=version&style=for-the-badge&logo=tiddlywiki&label=version"> -->

<img src="https://img.shields.io/badge/tiddlywiki-black?style=flat-square&logo=tiddlywiki&logoColor=white" alt="badge"> <img src="https://img.shields.io/badge/tailwindcss-black?style=flat-square&logo=tailwindcss&logoColor=white" alt="badge"> <img src="https://img.shields.io/badge/nodejs-black?style=flat-square&logo=node.js&logoColor=white" alt="badge"> <img src="https://img.shields.io/badge/docker-black?style=flat-square&logo=docker&logoColor=white" alt="badge"> <img src="https://img.shields.io/badge/typescript-black?style=flat-square&logo=typescript&logoColor=white" alt="badge"> <img src="https://img.shields.io/badge/codemirror6-black?style=flat-square&logo=codemirror&logoColor=white" alt="badge">

</center>

<hr>

<center>

[Stackblitz Demo](https://stackblitz.com/~/github.com/oeyoews/tiddlywiki-starter-kit) |  [Documentation](https://tiddlywiki-starter-kit.vercel.app/docs/)

</center>

## Features

- 📦 Out of the box: TiddlyWiki Starter Kit comes with most configurations pre-packaged, reducing the need for tedious setup.
- 🎨 Powered by Tailwind CSS: Utilizes Tailwind CSS for responsive design, minimizing the need for extensive style files.
- 📚️ Multiple wiki support: Supports custom folders for different purposes such as work, life, reading, etc., making switching between them effortless.
- 🚀 Quick operations: Provides keyboard shortcuts and full keyboard navigation for efficient workflow.
- 🔧 Simplified configuration: Easily customize the TiddlyWiki Starter Kit by editing the .env file.
- 💡 One-click installation: Quickly install the TiddlyWiki Starter Kit using the npm create create-neotw-app command.

## Requirements

- Node.js(with npm)
- Git(optional)

```mermaid
graph LR;
NodeJs & TiddlyWiki5 & Git -.-> Local --> GitHub --> Build -.->  b[[Blog Page]]

```

```mermaid
sequenceDiagram
    actor user as TiddlyWiki5 用户
    participant nodejs as TiddlyWiki5 Node.js
    participant website as 浏览器
    participant git as Git
    participant github as GitHub
    user ->>+ github : 克隆 TiddlyWiki5 Starter Kit 仓库, 安装依赖
    user ->> nodejs : 启动 TiddlyWiki5 Node.js
    nodejs ->>+ website : 进入 TiddlyWiki
    website -->>- nodejs : 文件变动同步到项目文件夹 /tiddlers
    loop
		nodejs --> website:文件同步
	end
    user ->> git : 提交 /tiddlers 文件
    git ->> github : 保存到 GitHub
```

## Getting Started

<!-- pnpm install --production -->
```bash
npm create neotw-app@latest
```

## Deploy

<!-- https://vercel.com/docs/deploy-button -->
<!-- <a target="_blank" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foeyoews%2Ftiddlywiki-starter-kit">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a> -->

[Fork](https://github.com/oeyoews/tiddlywiki-starter-kit/fork) this project, Go to vercel to deploy it manually

> I recommend shallow cloning this project and deploying it manually on Vercel

<!-- folders -->
<!-- ./tiddlywiki.info(1)
./src
    └── tiddlers/
    └── tiddlywiki.info(2.1)
./src-dev
    └── tiddlers/
    └── tiddlywiki.info(2.2) -->