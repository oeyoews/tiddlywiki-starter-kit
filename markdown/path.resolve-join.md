---
title: 'path.resolve-join'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed Sep 13 2023 05:46:42 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# path.resolve-join

`path.join` 方法和 `path.resolve` 方法都可以用于拼接路径，但它们在处理路径的方式上有一些不同：

1. `path.join`:

    * 接受多个参数并将它们连接起来形成一个路径。

    * 将会根据平台的特定规则来拼接路径，确保生成的路径是合法的。

    * 不会解析 `..`（上级目录）和 `.`（当前目录）这样的相对路径符号。

1. `path.resolve`:

    * 接受一个或多个参数，并将它们视为目录或文件路径，从右到左解析它们并生成一个绝对路径。

    * 解析过程中会考虑当前工作目录，并根据绝对路径规则生成最终的路径。

    * 能够解析 `..`（上级目录）和 `.`（当前目录）等相对路径符号。

下面是两者的使用示例：

```
```javascript
const path = require('path');

// 使用 path.join
const joinedPath = path.join('/home', 'user', 'documents', 'file.txt');
console.log(joinedPath); // 输出：/home/user/documents/file.txt

// 使用 path.resolve
const resolvedPath = path.resolve('/home', 'user', '..', 'documents', 'file.txt');
console.log(resolvedPath); // 输出：/home/documents/file.txt
```

<button>javascript</button>
```

总结来说，如果你只是简单地需要将多个路径片段连接起来形成一个路径，可以使用 `path.join`。而如果你需要解析相对路径，并返回一个绝对路径，或者需要考虑当前工作目录，可以使用 `path.resolve`。
