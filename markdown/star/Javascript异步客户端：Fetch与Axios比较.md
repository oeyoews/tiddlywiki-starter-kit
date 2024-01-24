---
title: 'Javascript异步客户端：Fetch与Axios比较'
tags: ['剪藏']
type: 'text/markdown'
created: 'Sat Nov 25 2023 02:03:14 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://www.jdon.com/60167.html'
---

# Javascript异步客户端：Fetch与Axios比较

当我们构建需要我们向后端或第三方 API 发出网络请求的应用程序时，我们使用 Axios 和 Fetch 等 HTTP 客户端来执行此类请求。 \

在本指南中，我们介绍了 Axios 和 Fetch 并对它们进行比较，以便我们可以做出明智的决定来选择哪一个。

**Fetch 和 Axios 的快速概览**\

Fetch API 是一个接口，它公开了一个 fetch() 为发出网络请求而调用的方法。它内置于现代浏览器中，因此无需安装。它也可以作为[node.js 中的实验性功能使用](https://github.com/nodejs/node/pull/41749)。

[Axios](https://github.com/axios/axios)是一个基于浏览器提供的 XMLHttpRequest 接口的客户端 HTTP API。一些开发人员更喜欢 Axios 而不是内置 Fetch API，因为它易于使用。\

我们可以通过内容分发网络或 CDN 将其添加到我们的项目中，或者通过包管理器（如 npm 或 yarn）安装它。Axios 可以在浏览器或 node.js 环境中运行。\

Fetch 和 axios 都是基于 Promise 的 HTTP 客户端。这意味着当我们使用它们发出网络请求时，它们会返回一个可以解决或拒绝的承诺 promise。

比较 Fetch 和 Axios 的功能\

让我们从语法开始。

**句法比较**\

Fetch 接受两个参数。第一个参数是我们要获取的资源的 URL。第二个是一个可选参数，它是一个包含用于发出请求的配置选项的对象。因此，语法是：

如果没有配置选项，请求将默认发出 GET 请求：\

fetch(url)\

使用配置选项，我们可以为请求定义一些自定义设置，包括：

```
fetch(url, {
  method: 'GET', // other options: POST, PUT, DELETE, etc.
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({}),
})
```

axios 语法类似，但有很多不同的调用方式：

```
axios(url, {
  // configuration options
})
```

\

我们还可以像这样附加 HTTP 方法：

```
axios.get(url, {
  // configuration options
})
```

\

与 fetch 方法一样，我们可以忽略 axios 中的 HTTP 方法，默认为 GET，如下所示： \

axios(url)\

同样，我们可以使用第二个参数为请求定义一些自定义设置：

```
axios(url, {
  method: 'get', // other options: post, put, delete, etc.
  headers: {},
  data: {},
})
```

\

我们也可以这样写：

```
axios({
  method: 'get',
  url: url,
  headers: {},
  data: {},
})
```

\

现在让我们看看 Axios 和 fetch 处理响应的不同方式。

**处理 JSON 数据**

[在下面的示例中，我们对名为 JSONPlaceholder](https://jsonplaceholder.typicode.com/)的 REST API 执行 GET 请求，以使用 fetch 和 Axios 获取待办事项列表并比较差异。\

使用 Fetch API，我们的代码如下所示：

```
const url = "https://jsonplaceholder.typicode.com/todos";

fetch(url)
  .then(response => response.json())
  .then(console.log);
```

返回一个承诺，其 fetch() 响应由.then() 方法处理。此时，我们还没有我们需要的 JSON 数据格式，所以我们调用.json() 响应对象上的方法。这将返回另一个使用 JSON 格式的数据解析的 promise。因此，典型的 fetch 请求包含两个.then() 调用。\

但是，如果我们使用 Axios 执行相同的 fetch，我们有以下代码：

```
const url = "https://jsonplaceholder.typicode.com/todos";

axios.get(url)
.then(response => console.log(response.data));
```

使用 Axios，响应数据默认以 JSON 格式提供。响应数据始终 data 在响应对象的属性上可用。\

responseType 我们可以通过在配置选项中指定 来覆盖默认的 JSON 数据类型，如下所示：

```
axios.get(url, {
  responseType: 'json' // options: 'arraybuffer', 'document', 'blob', 'text', 'stream'
})
```

**自动字符串化**\

现在让我们尝试使用[JSONPlaceholder](https://jsonplaceholder.typicode.com/) API 发送数据。 \

为此，我们需要将数据序列化为 JSON 字符串。当我们使用方法将 JavaScript 对象发送到 API POST 时，Axios 会自动对数据进行字符串化。\

以下代码 post 使用 Axios 执行请求：

```
const url = "https://jsonplaceholder.typicode.com/todos";

const todo = {
  title: 

"A new todo",
  completed: false
} 

axios.post(url, {
  headers: {
    'Content-Type': 'application/json',
  },
  data: todo
})
.then(console.log);
```

当我们用 axios 发出一个 post 请求时，我们会把要发送的数据作为请求主体分配给 data 属性。我们还可以设置内容类型头。默认情况下，axios 将 Content-Type 设置为 application/json。

如果我们使用 Fetch API，我们必须使用 JSON.stringify() 手动串联该对象，然后将其分配到我们的请求正文。

```
const url = "https://jsonplaceholder.typicode.com/todos";

const todo = {
  title: 

"A new todo",
  completed: false
};

fetch(url, {
  method: 

"post",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})
  .then((response) => response.json())
  .then((data) => console.log(data))
```

我们还必须用 Fetch 明确地将 Content-Type 设置为 application/json。

**错误处理**\

fetch 和 axios 都会返回一个被解决或拒绝的承诺。\

当承诺被拒绝时，我们可以使用.catch() 来处理这个错误。与 Fetch 方法相比，我们用 axios 处理错误的方式更加简洁。

从 axios 开始，用.catch() 处理的典型错误是这样的。

```
const url = "https://jsonplaceholder.typicode.com/todos";

axios.get(url)
  .then((response) => console.log(response.data))
  .catch((err) => {
    console.log(err.message);
  });
```

如果状态代码不在 2xx 的范围内，Axios 的承诺将拒绝。我们可以通过检查 err 对象是否包含响应或请求属性来确定关于错误的更多信息，就像这样：

```
.catch((err) => {
  // handling error
  if (err.response) {
    // Request made and server responded

    const { status, config } = err.response;

    if (status === 404) {
      console.log(`${config.url} not found`);
    }
    if (status === 500) {
      console.log(

"Server error");
    }
  } else if (err.request) {
    // Request made but no response from server
    console.log("Error", err.message);
  } else {
    // some other errors
    console.log("Error", err.message);
  }
});
```

错误对象上的 response 属性表示客户端收到了一个状态代码在 2xx 范围之外的错误响应。错误对象上的请求属性表明提出了一个请求，但客户端没有收到响应。否则，如果没有请求或响应属性，说明在设置网络请求时出现了错误。

如果我们得到一个 404 错误或任何其他的 HTTP 错误，Fetch 不会拒绝一个承诺。Fetch 只在网络失败时拒绝一个承诺。所以我们必须在.then 子句中手动处理 HTTP 错误。

让我们看一下下面的代码。

```
const url = "https://jsonplaceholder.typicode.com/todos";

fetch(url) 
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    return response.json();
  })
  .then(console.log)
  .catch(err => {
    console.log(err.message);
  });
```

在响应块中，我们正在检查响应的 ok 状态是否为 false，然后我们抛出一个自定义的错误，在.catch 块中处理。

**响应超时/取消请求**\

让我们看看这些 HTTP 客户端是如何处理 HTTP 请求的响应超时的。通过 Axios，我们可以在配置对象中添加一个超时属性，并指定请求终止前的时间，单位为毫秒。

在下面的代码段中，我们的目的是在请求超过 4 秒时终止请求，然后在控制台记录一个错误。

```
const url = "https://jsonplaceholder.typicode.com/todos";

axios.get(url, {
  timeout: 4000, 

// default is `0` (no timeout)
})
  .then((response) => console.log(response.data))
  .catch((err) => {
    console.log(err.message);
  });
```

为了取消 Fetch 的请求，我们可以使用 AbortController 接口。请看下面的用法。

```
const url = "https://jsonplaceholder.typicode.com/todos";

const controller = new AbortController();
const signal = controller.signal;
setTimeout(() => controller.abort(), 4000);

fetch(url, {
  signal: signal
})
  .then((response) => response.json())
  .then(console.log)
  .catch((err) => {
    console.error(err.message);
  });
```

我们首先创建了一个控制器对象，获得了对信号对象和 abort() 方法的访问权。然后我们通过配置选项将信号对象传递给 fetch()。有了这个，只要调用 abort 方法，fetch 请求就会终止。我们可以看到，在 setTimeout 函数的帮助下，如果服务器在 4 秒内没有回应，操作就会终止。

本地的 Fetch 比 axios 略快。这并不重要，因为两个客户端都是异步的。

Axios 和 Fetch 在现代浏览器中被广泛支持。对于像 IE 11 这样不支持 ES6 Promises 的旧环境，我们必须使用一个 polyfill。另外，特别是对于 Fetch，我们将添加另一个 polyfill 来支持旧版浏览器的实现。
