---
title: 'router.push-replace'
tags: ['React']
type: 'text/markdown'
created: 'Mon Dec 11 2023 16:48:52 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# router.push-replace

`router.push` 和 `router.replace` 是 Vue Router 中用于导航的两个方法，它们之间有一些关键的区别。

1. **History Stack**

    * `router.push`: 将新的路由添加到历史记录堆栈中，可以通过浏览器的后退按钮返回先前的路由。

    * `router.replace`: 用新的路由替换当前的路由，不会在历史记录中创建新的条目，因此后退按钮将不会返回到先前的路由。

1. **页面刷新**

    * `router.push`: 切换路由时，页面不会刷新。

    * `router.replace`: 同样不会导致页面刷新。

1. **适用场景**

    * `router.push`: 适用于普通的导航场景，例如从一个页面跳转到另一个页面。

    * `router.replace`: 适用于在不改变当前页面 URL 的情况下更新路由，比如在某些表单提交后跳转，不希望用户通过后退按钮回到表单页面。

示例代码：

```javascript
// 使用 router.push
this.$router.push ('/new-route')

// 使用 router.replace
this.$router.replace ('/new-route')
```

总之，选择使用 `router.push` 还是 `router.replace` 取决于你希望如何管理路由历史记录以及是否需要在浏览器中触发页面的刷新。
