---
title: 'fetch-cache'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Fri Nov 03 2023 04:21:51 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# fetch-cache

要了解 HTTP 协议的缓存策略，可以查看服务器返回的 HTTP 响应头中的缓存相关字段。以下是一些常见的缓存相关的响应头字段：

1. Cache-Control：该字段指定了缓存的控制策略。常见的指令有：

    * `public`：允许任何地方的缓存（包括客户端和代理服务器）缓存该响应。

    * `private`：只允许客户端缓存该响应，不允许代理服务器缓存。

    * `no-cache`：需要在使用缓存之前先向服务器验证是否过期。

    * `no-store`：禁止缓存该响应，每次都需要向服务器请求最新数据。

    * `max-age=seconds`：指定缓存的最大有效时间，以秒为单位。

1. Expires：指定了响应的过期时间，是一个具体的日期/时间。当当前时间超过过期时间时，缓存被认为是过期的。

1. ETag：指定了一个唯一标识符，用于判断资源是否发生了变化。当资源没有发生变化时，可以使用缓存副本。如果服务器返回的响应中包含此字段，则客户端可以将其发送回服务器进行验证。

1. Last-Modified：指定了资源的最后修改时间。与 ETag 一样，它也用于验证资源是否发生了变化。

通过查看响应头中的这些字段，可以了解 HTTP 协议的缓存策略，判断是否可以使用缓存以及何时需要重新请求最新的数据。

可以使用浏览器的开发者工具（如 Chrome DevTools）来查看网络请求的响应头字段，或者在代码中使用 Fetch API 或其他 HTTP 请求库获取响应头并进行分析。

---

在使用 Fetch API 发起网络请求的时候，可以通过设置缓存来提高性能和用户体验。Fetch API 提供了一个 `cache` 选项，可以指定请求的缓存模式。一共有 5 种缓存模式可供选择：

* `default`：默认模式，采用 HTTP 协议的缓存机制；

* `no-store`：不允许缓存，每次请求都会向服务器发送请求；

* `reload`：强制从服务器刷新缓存，即使本地存在缓存；

* `no-cache`：可以使用缓存，但首先必须向服务器验证缓存是否过期；

* `force-cache`：强制使用缓存，即使它已经过期。

在使用 Fetch API 的 `fetch()` 方法时，可以通过设置 `cache` 选项来指定缓存模式。例如：

```
```javascript
fetch(url, {
  cache: 'no-cache'
})
```

<button>javascript</button>
```

在上面的示例中，我们将缓存模式设置为 `no-cache`，表示可以使用缓存，但首先必须向服务器验证缓存是否过期。如果缓存未过期，则使用缓存；如果缓存已过期，则会向服务器发送请求获取最新数据。

另外，还可以使用第二个参数 `init` 中的 `headers` 选项设置缓存控制头，例如：

```
```javascript
fetch(url, {
  headers: {
    'Cache-Control': 'no-cache'
  }
})
```

<button>javascript</button>
```

在上面的示例中，我们使用 `Cache-Control` 头设置缓存控制，将缓存模式设置为 `no-cache`。

需要注意的是，如果服务器返回了有效的缓存控制头，则 Fetch API 会自动触发相应的缓存操作，不需要进行任何额外的设置。因此，在设置缓存模式时，建议同时设置合适的缓存控制头，以便在网络请求时能够正确地处理缓存。

---

`cache: "no-cache"`和`cache: "no-store"`是用于控制浏览器缓存行为的两个不同选项。

1. `cache: "no-cache"`:

    * 当设置为`"no-cache"`时，浏览器会发送请求到服务器进行验证，并在缓存中存储响应。

    * 如果服务器返回的响应状态是 200，则表示响应有效，可以使用缓存中的响应。如果响应状态是其他值（如 304），则表示响应无效，需要重新从服务器获取新的响应。

    * 这意味着浏览器会强制进行验证，但仍然允许缓存响应。

1. `cache: "no-store"`:

    * 当设置为`"no-store"`时，浏览器不会缓存任何响应，并且每次都会向服务器发送请求获取最新的数据。

    * 响应不会被保存在浏览器的缓存中，也不会被替换或更新。

    * 这意味着浏览器每次都会完全忽略缓存，并始终从服务器获取最新的响应。

总结：

* `"no-cache"`选项允许浏览器缓存响应，但需要验证响应的有效性。

* `"no-store"`选项禁止浏览器缓存响应，始终请求最新的数据。

---

“fetch” 的 “res.headers” 是一个包含响应头信息的 Map。这个 Map 包含了响应的各种头部字段，通常用于获取有关响应的信息，比如内容类型、响应时间等。你可以使用不同的键来访问特定的响应头字段，比如：

* “Content-Type”：响应的内容类型。

* “Date”：响应的日期和时间信息。

* “Server”：响应的服务器信息。

* …

你可以通过 JavaScript 中的代码来访问这些响应头字段，例如：

```
```javascript
fetch('https://example.com')
  .then(response => {
    const contentType = response.headers.get('Content-Type');
    const date = response.headers.get('Date');
    const server = response.headers.get('Server');
    
    // 进行你的操作
  })
  .catch(error => {
    console.error('发生错误：', error);
  });
```

<button>javascript</button>
```
