# Neotw notion gallery

## 在线地址

<TwPlugin name="neotw-notion-gallery" />

> 支持书单，博客，日志等卡片视图

ps: 支持豆瓣图片链接 (不受防盗链影响)
pss: 建议开启浏览器 GPU 加速，浏览效果更佳 (tailwindcss 影响)

## 使用方法 j

```bash
<$cards />

## 可选参数filter, filter 默认为 [!is[system]!has[draft.of]!sort[created]limit[9]]
<$cards filter="[tag[Journal]limit[9]]"/>

## 指定某一个(或者多个)固定tiddler
<$cards filter="[[$:/core/ui/ControlPanel/Plugins]] [[GettingStarted]]" />

## 杂合(混用)
## tiddler 的筛选器用法没有明确的术语表达,导致教程只能`show me the code`, 不像大众化的编程语言(比如JS,React,Vue),官方统一制定了术语, 比较浅显易懂
<$cards filter="[[GettingStarted]] [!is[system]!has[draft.of]!sort[modified]!is[shadow]limit[8]]" />
```

> 图片默认使用每个 tiddler 的 page-cover 字段，如果 page-cover 字段不存在，则使用 `https://source.unsplash.com/random/1920x1080?fm=blurhash&${title}`

> 依赖插件：tailwindcss

> 默认使用 (16:9)1920x1080 的分辨率 (分辨率越大 (图片质量越高), 图片加载速度就相对较慢)

> 已经借助 tailwindcss 对页面进行了防抖动处理，图片按需加载

> 之所以目前仅仅显示图片，而不是像 notion 的 gallery 布局，是因为由于 filter 的不同会导致不同的样式，此插件目前处于 beta 阶段，暂时不打算支持类似 notion 的动态字段配置 (时间有限，理论上是完全可以做到)

## Recipes

> 每个 tiddler 的标题不要像论文标题那样过长 (也许我正文的部分还没你的标题长 😀), 尽量简短扼要

<!-- > 其实使用 wikitext 可以很快写一个，但是 wikitext 的 enlist, set, var(用法), 每次都记不住 (文档搜索真的不好用), 头疼 -->
<!-- 会有闪烁，由于 tailwindcss 为加载完成应用样式 -->

<!-- 事实证明 js 写的 widget 更具有扩展性，灵活性 -->

## v1.TODO

* 修复 //xxx 开头的链接 // 符号丢失
* add title params
* support gallery to show all images(暂时不做)
* 自动生成 today jounal card(use bing today wallpaper)(暂时不做)
* 图片默认启用，或者部分可选择性启用，图片加载速度较慢
* 🟩 icon: 不使用 icon 字段 (改用 page-icon),这里借助 iconify 插件
* 🟥 sort(filter): add dynamic filter interface
* 🟥 peek: 实现 peek, 支持全屏，tm-modal 可以借鉴 (灵活性不够), 但是全屏还是要另外想办法 square
* 🟥 tag: tag 可点击，可以修改 tag
* 🟥 dropmenu: 支持 tiddler 的删除，复制 (clone), 链接复制，重命名，star(favourite 提供支持)
* 🟥 UI: 添加 title(支持修改), tag(tag manager)
* 🟥 支持新增 tiddler
* 🟥 search: current filter tiddler search
* 🟥 view: 支持 gallary-table-magazine 的切换，支持字段可视化实时编辑
* 支持列出所有的插件：使用 plugin-name 代替过长的 title

> 如果过于复杂并且有时间的话，可能会引入 xstate 进行状态管理

> 这里绝对保证不了 1:1 完全复刻 notion

> ps: notion 的功能太花哨了 (复刻到 tiddlywiki 需要很多精力), 如果想要更好的体验，可以直接使用 notion