---
title: 'full-type-support-with-plain-javascript'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sun Jun 04 2023 14:11:22 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
page-cover: 'https://source.unsplash.com/random?fm=blurhash&w=50&full-type-support-with-plain-javascript'
---

# full-type-support-with-plain-javascript

## 使用纯 JavaScript 获得完整的类型支持

* 这听起来是不是很熟悉：你想写一个小脚本——无论是用于网络、命令行工具还是其他任何东西——你从 JavaScript 开始……直到你想起编写没有类型的代码是多么痛苦。因此，您将文件从 重命名.js 为.ts… 并意识到您已经打开了一罐蠕虫。

* 如果您正在为网站或图书馆编写代码，那么您需要进行编译步骤。如果你正在构建一个 CLI 脚本，你可以求助于 Deno（它支持开箱即用的 TypeScript），但是你需要设置你的 IDE 来理解 Deno API，而且混合和匹配 Deno 和节点并不总是那么容易。

* 一旦一切都在本地运行，您需要考虑如何分发您的代码。你检查你的编译.js 文件吗？您是否创建了一个 CI 管道来自动编译您的.ts 文件？如果您正在编写一个库，您如何发布您的库以便其他项目可以使用它？

## 你实际上并不需要 TypeScript

> 问题是您无需编写 TypeScript 即可获得静态类型分析！

* 通过使用 JSDoc，您可以在 JavaScript 中获得 TypeScript 的所有好处

* TypeScript 提供的是静态类型系统。这意味着类型信息对运行代码没有影响。当你的 TypeScript 被执行时，所有的类型信息都完全丢失了（这就是为什么你不能在不编写类型保护的情况下测试变量是否属于某种类型的原因）。

* 这也意味着 TypeScript 只是提供给 TypeScript 分析器的附加类型信息，对运行代码的 JavaScript 引擎没有任何意义。当您将 TypeScript 编译为 JavaScript 时，它基本上只是从您的代码中删除所有类型信息，因此它再次成为有效的 JavaScript 代码。

## JSDoc

在 25 年前 JavaScript 诞生的三年后，JSDoc 被引入作为一种注释 JavaScript 代码的方式。它是一种形式化的标记语言，允许 IDE 在开发人员看到功能时为他们提供额外的上下文。

大多数语言中都存在类似的注释标记，我相信您已经知道了。这是它的样子：

```
```js
/**
 * This is the JSDOC block. IDEs will show this text when you hover the
 * printName function.
 *
 * @param {string} name
 */
function printName(name) {
  console.log(name)
}
```

<button>js</button>
```

很少有人知道，JSDoc 是您充分利用 TypeScript 所需要的全部。TypeScript 分析器理解用 JSDoc 编写的类型，并为您提供与.ts 文件相同的静态分析。

JSDoc 中类型的语法\

我不会在这里提供语法的完整文档。最重要的是你知道，几乎所有你可以在.ts 文件中做的事情，你都可以用 JSDoc 做。但这里有几个例子：

具有本机类型的函数参数：

```
```js
/**
 * @param {string} a
 * @param {number} b
 */
function foo(a, b) {}
使用 TypeScript 开箱即用的类型：

/**
 * @param {HTMLElement} element
 * @param {Window} window
 */
function foo(element, window) {}

/** @type {number[]} */
let years
定义对象字面量和函数：

/** @type {{ name: string; age: number }} */
let person

/** @type {(s: string, b: boolean) => void} */
let myCallback
*.d.ts从文件导入类型：

/** @param {import('./types').User} user */
const deleteUser = (user) => {}
定义一个类型供以后使用：

/**
 * @typedef {object} Color
 * @property {number} chroma
 * @property {number} hue
 */

/** @type {Color[]} */
const colors = [
  { chroma: 0.2, hue: 262 },
  { chroma: 0.2, hue: 28.3 },
]
有关详尽列表，请参阅官方TypeScript JSDoc 文档。
```

<button>js</button>
```

如果您有复杂的类型，您仍然可以创作您的*.d.ts 文件并将它们导入您的 JSDoc 注释中。

tsconfig.json 请注意，您仍然需要为打字稿设置您的项目（和 IDE），并且您需要使用编译器选项创建一个文件 allowJs 并将 checkJs 其设置为 true：

```
```json
// tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
    // ...
  }
}
```

<button>json</button>
```

什么时候写 TypeScript\

尽管完全使用 JSDoc 进行类型声明是可能的，但这并不是最方便的。TypeScript 语法更好，重复更少。

TypeScript 团队创建了一个“类型作为注释”的 ECMAScript 提案，允许您编写 TypeScript 并在 JavaScript 引擎中运行它而无需修改（JavaScript 引擎会将这些类型注释视为注释。）

但在这个提案被接受之前，我们一直坚持使用 JSDoc 或 TypeScript 工具链的决定。

所以现在我的建议是：当你处理一个无论如何都有编译步骤的项目时，使用 TypeScript 没有任何缺点。这包括您想要优化生产脚本的典型网站。

但如果您不需要编译步骤，那么坚持使用 JSDoc 类型注释可能更容易。这方面的例子是库和简单的脚本。

> ref: <https://www.pausly.app/blog/full-type-support-with-plain-javascript>
