# TiddlyWiki5 Vue3

> 直接用 Vue 写 tiddlywiki 插件

## Why use Vue, not React or others?

* Vue 更接近原生 js 的写法，虽然 React 也支持 CDN 引入，但是体验极差，而 Vue 则天然的对 CDN 的用法更加友好。

* Vue is closer to the native JS syntax, and although React also supports CDN inclusion, the experience is extremely poor, while Vue naturally offers a much more friendly approach to CDN usage.

<!-- https://unpkg.com/browse/vue@3.4.21/dist/vue.global.prod.js -->

## For developers

* 组合式 选项式两种风格都支持，也支持两种写法掺杂, 真正原汁原味的 Vue 代码, 这两种写法表面上最大的区别就是前者直接将所有的代码放在了 setup 函数里面，后者是将 代码分散到了多个方法里面. 需要注意的是一些微小的区别，比如 this, 解包问题.

* The Vue framework supports both composition and option styles, allowing for a mix of both; authentic Vue code can either place all code inside the setup function or distribute it across multiple methods. It's important to note some subtle differences, like the usage of 'this' and the unpacking issue.

* 使用示例参照 https://github.com/oeyoews/tiddlywiki-starter-kit/tree/main/plugins/oeyoews/vue-plugin-template

* More Vue Usage [Vue Doc](https://cn.vuejs.org/guide/essentials/application.html)

## Usage

```js
window.Vue = require('$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js')
```

::: code-group

<<< @/snippets/neotw-vue3/app.js

<<< @/snippets/neotw-vue3/widget.js

:::

## Vue Devtools 使用方法


> 由于 Vue 在这里只是部分页面挂载, 所以需要手动定位到 Vue 实例

```js
// 1.借助控制台定位元素，获取 Vue 实例, 先定位到 Vue app 节点
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

Links：https://juejin.cn/post/7052955565944733709
```