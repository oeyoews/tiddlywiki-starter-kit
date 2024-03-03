## Tiddlywiki5 Vue3

<$vue-example />

## For developers

```js
const vue = require('$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js')
const { ref, createApp } = vue
```

* 此插件使用 `vue.global.prod.js`, 所以不依赖于任何构建工具，所以无法使用组合式 (composition)API 的写法，只能使用选项式 (options)API.
* 使用示例参照 https://github.com/oeyoews/tiddlywiki-starter-kit/blob/main/plugins/oeyoews/neotw-vue3/tiddlers/widget.js

* 更多用法请参考 [Vue3 官方文档](https://cn.vuejs.org/guide/essentials/application.html)

## NOTE

* v-focus 指令注冊，在 tiddlywiki 似乎不起作用
* :autofocus="'autofocus'" is work

## Motivation

<!-- your plugin motivation, or why you write this plugin -->
