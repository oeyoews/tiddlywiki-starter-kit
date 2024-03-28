# TiddlyWiki Starter Kit 插件介绍

<!-- <Callout type='warning'>
以上仅仅列出了部分插件. 更多细节请点击 [tiddlywiki-starter-kit](https://tiddlywiki-starter-kit.vercel.app/)
</Callout> -->

## 底层库 (library) 插件

* <TwPlugin name="neotw-vue3" />: 支持用 vue 给 tiddlywiki 写插件
* <TwPlugin name="tiddlywiki-tailwindcss-plus" /> : 为了更快的做出一个插件, 我将 tailwindcss 移植到了 tiddlywiki 中, 提升插件开发效率. 同时整体可以将 样式文件的大小占用控制在一个稳定的范围内. 同时可以快速适配 dark/light 模式.
* <TwPlugin name="nprogress" />: 添加了 `$tw.NProgress` api.
* <TwPlugin name="confetti" />: 添加了 $tw.Confetti api, 在编写 tw 插件可以轻松的使用 confetti.
* <TwPlugin name="notify" />: 由于 $tw.notifier api 的扩展性不够, 因此借助于 simple-notify, 添加了新的 $tw.Notify api.

## 功能类 (API) 插件

* <TwPlugin name="qrcode" />: 使用 svg 渲染更清晰的二维码.
* <TwPlugin name="markdown-extensions-startup" />: 支持加载 markdownit 的插件模块.
* <TwPlugin name="neotw-copy-code" />: 添加了 tiddlywiki 中代码块的复制按钮
* <TwPlugin name="neotw-pwa" />: 支持将其作为 pwa 引用安装 (新版的 google chrome 似乎已经内置了这个类似的功能, )
* <TwPlugin name="ejs" />: 支持在 tiddlywiki 中使用 html 模板引擎
* <TwPlugin name="neotw-spotlight" />: 只需要在图片的 class 中添加 `spotlight`, 即可点击放大图片.
* <TwPlugin name="image-observer" /> 图片懒加载
* <TwPlugin name="notebook-theme-sidebar-resizer" />:  调整侧边栏宽度,适应大多数主题


## 美化类插件

* <TwPlugin name="plum-blosssom" />: 随机梅花生长动画
* <TwPlugin name="confetti-background" />: 使用 canvas 绘制的 confetti 动画
* <TwPlugin name="neotw-icons" />: iconify 的 tiddlywiki 移植版, 可以嵌入各类 svg 图标集, 免去复制粘贴的繁琐步骤.
* <TwPlugin name="neotw-homepage" />: 定制 tiddlywiki 的主页.

<img src="https://camo.githubusercontent.com/8fb3c8f3d1e983c274f13d79dc864e0e350768c90d082366c3261ed2d368b828/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6f65796f6577732f746964646c7977696b692d737461727465722d6b6974406d61696e2f696d672f62616e6e657230312e706e67" />
<img src="https://camo.githubusercontent.com/13da7ff117fe005a3f93b3ed3647b5db0337f9be1950396349b1630f77705c4f/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6f65796f6577732f746964646c7977696b692d737461727465722d6b6974406d61696e2f696d672f62616e6e657230322e706e67" />

##  编辑插件

* <TwPlugin name="tiddlywiki-codemirror-6" author="oeyoews" />: 由于 tw5 一直没有很好的编辑体验, 在 tw 社区有人将 cm6 移植到 tw 后, 我将其迁移到了 Moderndev, 并且添加了 VIM 编辑模式支持, 并且得益于 esbuild 的打包优化, 插件大小减少了将近 500kb. cm6 内置了更多的功能, 比如 autolist, 字符统计, 自动补全.

## 阅读类插件

* book-status: 记录 tiddlywiki 书籍阅读进度