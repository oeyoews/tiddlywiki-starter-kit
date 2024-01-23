---
title: 'history-api'
tags: ['JavaScript']
created: 'Wed May 17 2023 15:53:44 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# history-api

HTML5 的 history API 提供了一组在 Web 应用程序中以编程方式与浏览器历史记录进行交互的方法和属性。使用这些方法和属性，开发人员可以在不刷新整个页面的情况下，更好地控制浏览器的前进、后退和当前位置。

以下是 HTML5 的 history API 常用的方法和属性：

- `history.pushState(state, title, url)`：将新的状态信息与指定的 URL 添加到浏览器历史记录中，并更新浏览器地址栏中的 URL。
- `history.replaceState(state, title, url)`：将新的状态信息与指定的 URL 替换当前页面在浏览器历史记录中的状态，并更新浏览器地址栏中的 URL。
- `history.back()`：向后导航到上一个历史记录条目。
- `history.forward()`：向前导航到下一个历史记录条目。
- `history.go(delta)`：导航到指定的历史记录条目，其中 delta 可以是正数或负数（例如 `history.go(-1)` 意味着向后导航一个历史记录条目）。

需要注意的是，当通过 `pushState()` 或 `replaceState()` 方法改变当前状态时，浏览器不会自动发送 HTTP 请求获取新的文档，而是仅仅简单地改变浏览器地址栏中的 URL 和浏览器历史记录。因此，开发人员需要手动编写代码来加载和更新页面内容。

以下是一个使用 HTML5 的 history API 实现无刷新页面加载并更新浏览器历史记录的示例代码：

```
```javascript
// 监听链接点击事件
document.addEventListener('click', function(event) {
  // 如果被点击的元素是链接
  if (event.target.tagName === 'A') {
    event.preventDefault(); // 阻止默认链接行为

    // 使用 AJAX 加载新页面 HTML
    fetch(event.target.href)
      .then(response => response.text())
      .then(html => {
        // 更新页面内容
        document.querySelector('#content').innerHTML = html;

        // 更新浏览器历史记录
        history.pushState({}, null, event.target.href);
      });
  }
});

// 监听 popstate 事件（比如点击浏览器的前进或后退按钮）
window.addEventListener('popstate', function(event) {
  // 使用 AJAX 加载当前页面 HTML
  fetch(location.href)
    .then(response => response.text())
    .then(html => {
      // 更新页面内容
      document.querySelector('#content').innerHTML = html;
    });
});
```

<button>javascript</button>
```

在上面的示例中，我们使用 `history.pushState()` 方法将新的 URL 添加到浏览器历史记录中，并使用 `history.popstate` 事件处理程序监听浏览器的前进或后退操作。在异步加载新页面数据时，我们可以通过 `fetch()` 函数获取新页面的 HTML，然后将其渲染到页面中指定的区域内。当用户点击浏览器的前进或后退按钮时，我们可以使用 `fetch()` 函数重新加载当前页面的 HTML，并将其渲染到页面中指定的区域内。

需要注意的是，为了保证 Web 应用程序在不同浏览器之间的兼容性，开发人员还需要考虑到一些额外的问题，例如使用 `popstate` 事件处理程序时的各种兼容性问题。
