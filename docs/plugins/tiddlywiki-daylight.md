# Tiddlywiki Daylight

> 主流的经典三模式切换 (浅色模式，深色模式，系统模式)

> 提供了 daylight widget

> 右键点击图标查看配置

```wiki
<$daylight btn class="rounded-full p-2 hover:scale-105 transition"/>
```

## TODO

* 添加配置 UI: 模拟 shiraz 的两种 palette 选择，$:/plugins/kookma/shiraz/ui/set-dark-light-palette
* 去除插件依赖：nprogress, tailwindcss, overwrite template
* 添加过渡动画：https://antfu.me/posts
* palette 是如何修改 x-tiddler-dictionary

> darkmode 写起来不难，但是如果想要写得很完备，细节真的不少 (darmode.js 是一个简单的库，不过不具备很好的扩展性)

<!-- darkmode.js 大概是重写了 body.bg, 带有动画 -->