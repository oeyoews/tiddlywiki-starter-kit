---
title: 'pjax'
tags: ['JavaScript']
created: 'Wed May 17 2023 15:52:25 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# pjax

PJAX（Partial JavaScript and XML）是一种在 Web 应用程序中实现局部页面刷新的技术，它利用 Ajax、HTML5 的 history API 和浏览器的 pushState 方法来实现无需重新加载整个页面而更新部分页面内容的效果。

与传统的网页跳转方式不同，PJAX 可以通过异步请求方式获取数据，然后使用 JavaScript 将新的数据渲染到当前页面中的指定区域。这样可以提高页面加载速度、减少服务器的负载，并且可以获得更好的用户体验。

以下是一个使用 PJAX 实现无刷新页面加载的示例代码：

```
```javascript
// 监听链接点击事件
document.addEventListener('click', function(event) {
  // 如果被点击的元素是链接
  if (event.target.tagName === 'A') {
    event.preventDefault(); // 阻止默认链接行为

    // 使用 AJAX 加载新页面 HTML
    fetch(event.target.href, { headers: { 'X-PJAX': true } })
      .then(response => response.text())
      .then(html => {
        // 创建一个新的虚拟 DOM 对象
        const tmp = document.createElement('div');
        tmp.innerHTML = html;

        // 获取需要更新的页面内容
        const content = tmp.querySelector('#content');

        // 更新页面内容
        document.querySelector('#content').innerHTML = content.innerHTML;

        // 更新浏览器历史记录
        history.pushState({}, null, event.target.href);
      });
  }
});

// 监听 popstate 事件（比如点击浏览器的前进或后退按钮）
window.addEventListener('popstate', function(event) {
  // 使用 AJAX 加载当前页面 HTML
  fetch(location.href, { headers: { 'X-PJAX': true } })
    .then(response => response.text())
    .then(html => {
      // 创建一个新的虚拟 DOM 对象
      const tmp = document.createElement('div');
      tmp.innerHTML = html;

      // 获取需要更新的页面内容
      const content = tmp.querySelector('#content');

      // 更新页面内容
      document.querySelector('#content').innerHTML = content.innerHTML;
    });
});
```

<button>javascript</button>
```

在上面的示例中，我们使用 `fetch()` 函数来通过 PJAX 进行异步数据请求并处理响应。在点击链接时，我们通过 `fetch()` 函数异步地加载新的页面 HTML，并将其渲染到当前页面中指定的区域中。然后，我们使用浏览器的 pushState 方法将新的 URL 添加到浏览器历史记录中。在浏览器前进或后退时，我们可以通过监听 popstate 事件来异步加载当前页面的 HTML 内容，并将其渲染到当前页面中指定的区域中。

需要注意的是，PJAX 技术仅适用于一部分 Web 应用程序场景，例如简单的静态网站、博客等，对于复杂的动态应用程序（例如社交网络、电子商务网站等），PJAX 可能无法满足需求。此外，在实际开发中，您还需要考虑 PJAX 在 SEO、浏览器兼容性等方面的问题。
