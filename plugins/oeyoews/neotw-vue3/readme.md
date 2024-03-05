## Tiddlywiki5 Vue3

<$vue-example />

## Latest Vue3 Lib

https://unpkg.com/browse/vue@3.4.21/dist/vue.global.prod.js

## For developers

```js
const vue = require('$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js')
const { ref, createApp } = vue
```

## 第三方 Vue3 库 的 Tiddlywiki5 插件

* vue-i18n
* vue-toastify
* vue-table
* vue-vant
* floating-vue(wip)

* 此插件使用 `vue.global.prod.js`, 所以不依赖于任何构建工具，所以无法使用组合式 (composition)API 的写法，只能使用选项式 (options)API.
* 使用示例参照 https://github.com/oeyoews/tiddlywiki-starter-kit/blob/main/plugins/oeyoews/neotw-vue3/tiddlers/widget.js

* 更多用法请参考 [Vue3 官方文档](https://cn.vuejs.org/guide/essentials/application.html)

## devtools

* 由于是局部 vue 应用，所以可以参考这篇文章开启 devtools, 注意使用 neotw-vue3-dev 进行调试, 而不是 neotw-vue3 插件, 因为无法调试数据在 prod 模式下

```js
// 1.获取 Vue 实例, 先定位到 vue 节点，
let vue3 = $0.__vue_app__; (重点注意 $0)

// 2.强制开启
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps.push({
    app: vue3,
    version: vue3.version,
    types: {
      Comment: Symbol("Comment"),
      Fragment: Symbol("Fragment"),
      Static: Symbol("Static"),
      Text: Symbol("Text"),
    },
})
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.enabled = true

链接：https://juejin.cn/post/7052955565944733709
```

## vue3 ui 组件库 推荐

* mobile: vant 230kb js+ 200kb css
* pc: element: 将近 1000kb

## NOTE

* v-focus 指令注冊，在 tiddlywiki 似乎不起作用
* :autofocus="'autofocus'" is work

## Motivation

<!-- your plugin motivation, or why you write this plugin -->
