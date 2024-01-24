---
title: '一文搞懂exports和module.exports的关系和区别_-_掘金'
tags: ['剪藏']
type: 'text/markdown'
created: 'Tue Dec 19 2023 13:22:00 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://juejin.cn/post/6844904079626338318'
---

# 一文搞懂exports和module.exports的关系和区别_-_掘金

> 我们知道 NodeJS 遵循 `CommonJS` 的规范，使用 `require` 关键字来加载模块，使用 `exports` 和 `module.exports` 来导出模块，那么这两个导出又有什么关系或者区别呢？

其实，在 node 执行一个文件时，会给这个文件内生成一个 `exports` 对象和一个 `module` 对象，而这个`module` 对象又有一个属性叫做 `exports`

新建一个 index.js 文件 执行 `node index.js` 命令

```
console.log(exports)
console.log(module)
```

可以看出控制台的输出结果如下：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/2/1709a788d1639410~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

我们再来看看 `exports` 和 `module.exports` 有什么关系呢？我们在 index.js 文件中添加一句代码

```
console.log(exports === module.exports)
```

会发现结果是 `true` 这说明，文件开始执行的时候，它们是指向同一块内存区域的

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/3/1709df85ab1f6fd6~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

当文件执行完毕的时候，只有`module.exports` 变量被返回了，以便后续被其他模块 `require` 引用，为了证明这个观点，我们可以新建一个文件 index2.js 进行测试 index2.js

```
exports.a = 1
```

然后在 index3.js 中引用

```
const module2 = require('./index2')
console.log(module2)
```

控制台输出：`{ a: 1 }` 然后我们在 index2.js 中添加代码：

```
exports.a = 1
module.exports = {
  b:2
}
```

在这里同时使用两个导出方法，查看控制台输出结果为 `{ b: 2 }` 此时，我们继续在 index2.js 文件中添加

```
console.log(exports === module.exports)
```

结果为`false`,此时的 `exports` 和 `module.exports` 已经不是指向同一块内存地址了，因为前面的代码里面，我们使用了

```
module.exports = {
  b:2
}
```

这导致了 `module.exports`重新指向了新的内存地址，但是当我们执行 `node index3.js` 查看 index3.js 的运行结果时，看到的是 `{b:2}` 而不是 `{a:1}` 证明了我们上面的观点：只有`module.exports` 变量被返回了 因此，初始化的状态，我们可以用如下代码来帮助理解：

```
var module = {
	exports:{}
}
var exports = module.exports
```

而最终的导出结果是 `module.exports` 这个对象。到了这里，可能有人又会有疑问，为啥之前很多的模块都是需要引入才能使用，但是`exports`和`module.exports` 我们没有引用却能直接使用？这个问题的答案我们可以从 Node 的官方文档中找到答案，

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/2/1709a788d65c38a5~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

Node API 传送门：[module wrapper](https://link.juejin.cn/?target=https%3A%2F%2Fnodejs.org%2Fdist%2Flatest-v13.x%2Fdocs%2Fapi%2Fmodules.html) 这里，Node 的官方文档里面提到，NodeJS 应用在文件被执行前会被包装一层：

```
(function(exports,require,module,__filename,__dirname){
  ...
})
```

在进行了头尾封装后，各模块之间进行了作用域的隔离，避免了污染全局变量，通过头尾封装，实现了

* 保持顶层变量（用 var、const 或 let 定义）作用在模块范围内，而不是全局对象。

* 提供一些看似全局的但实际上是模块特定的变量

    * 实现了从模块中导出值的 module 和 exports 对象

    * 包含模块绝对文件名 (__filename) 和目录路径 (__dirname) 的快捷变量

**总结：**

1. `exports` 对象是 `module` 对象的一个属性，在初始时 `module.exports` 和 `exports` 指向同一块内存区域

1. 模块导出的是 `module.exports` , `exports` 只是对它的引用，在不改变`exports` 内存的情况下，修改`exports` 的值可以改变 `module.exports` 的值

1. 导出时尽量使用 `module.exports` ,以免因为各种赋值导致的混乱
