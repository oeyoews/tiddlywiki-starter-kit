---
title: 'path-basename-ext'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Tue Oct 31 2023 13:40:12 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# path-basename-ext

`parse` 是一个常用的编程术语，代表解析（parsing）的意思。在计算机科学中，解析是从给定输入数据中提取有意义信息的过程。具体来说，在编程中，解析通常用于将复杂的数据结构或格式转换为更易于处理和理解的形式。

在 Node.js 的 `path` 模块中，`parse` 是该模块提供的一个方法，用于解析文件路径。它接收一个文件路径作为参数，并返回一个解析后的对象，该对象包含了文件路径的各个部分的信息，如目录、根路径、文件名、扩展名等。

以下是一个示例代码：

```javascript
const path = require("path");
const file = "/home/user/docs/file.txt";

const fileInfo = path.parse(file);
console.log(fileInfo);
```

上述代码中，我们使用 `path.parse()` 方法将文件路径 `/home/user/docs/file.txt` 解析为一个对象 `fileInfo`。然后，我们通过输出 `fileInfo` 可以看到解析后的结果，其中包含了目录信息、根路径、文件名、扩展名等。

对于给定的文件路径 `/home/user/docs/file.txt`，`fileInfo` 对象的属性如下：

* `root`: 文件的根路径，对于 Unix 系统来说就是 `/`。

* `dir`: 文件所在的目录路径，即 `/home/user/docs`。

* `base`: 文件名和扩展名，即 `file.txt`。

* `name`: 文件名（不包括扩展名），即 `file`。

* `ext`: 文件扩展名，即 `.txt`。

通过 `parse` 方法的使用，我们可以方便地从文件路径中提取出各个部分的信息，进而进行后续处理或操作。

使用 Node.js 的 path.basename() 方法来提取文件的基本名称（不包括目录路径）是非常常见和方便的。但是，当文件名包含一个或多个句点（.）时，它就会返回带有扩展名的文件名称。这是因为在这种情况下，Node.js 会将最后一个句点和之后的文本视为文件扩展名。

例如，如果你有一个文件名为 “example.file.txt” 的文件，当你使用 path.basename() 方法来提取它的基本名称时，它将返回 “example.file.txt” 而不是预期的 “example.file”。

如果你需要去掉扩展名，可以使用 path.parse() 方法来分解文件路径并获取文件名和扩展名，然后再使用 string.slice() 或其他字符串操作方法来删除扩展名。例如：

```javascript
const path = require('path');
const filename = 'example.file.txt';
const parsed = path.parse(filename);
const basenameWithoutExt = parsed.name; // "example.file"
```
