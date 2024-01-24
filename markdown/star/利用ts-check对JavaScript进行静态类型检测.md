---
title: '利用ts-check对JavaScript进行静态类型检测'
tags: ['剪藏']
type: 'text/markdown'
created: 'Mon Oct 30 2023 08:40:33 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: 'oeyoews'
url: 'https://daotin.netlify.app/fw8lsf.html#jsdoc-%E7%B1%BB%E5%9E%8B%E6%A0%87%E8%AE%B0'
---

# 利用ts-check对JavaScript进行静态类型检测

我们知道 TypeScript 2.3 以后的版本支持使用`--checkJs`对`.js`文件进行类型检查和错误提示。但是由于 JavaScript 是弱类型语言，在编写代码的时候，是无法检测变量的类型的。

因此每次运行代码类型报错的时候，我心中都会冒出来一个强烈的愿望：要是 JavaScript 是强类型的多好！

好消息是，JSDoc 的 `@ts-check`，可以现实这个愿望。

## # 立即上手

如果能有机会使用 TypeScript 那当然是最好，但是往往开发的老项目在早期都是 JavaScript 完成的，如果都迁移到 TypeScript 版本工作量是庞大的，而且不可避免出现许多 bug 问题，那么有没有一种方式可以无痛的在使用 JavaScript 的同时享受到 TypeScript 的类型检查呢？

答案就是 `// @ts-check`，在 js 文件的头部引入这样一行注释，然后配合`JSDoc`就可以在 JavaScript 代码中使用 TypeScript 的类型检查了。

举个例子，在下图中我们首先声明了一个变量 a，然后把数字 1 赋给了它，接着又把字符串 ‘1’ 赋给了它，看起来好像没有什么问题，而且运行起来也不会报错。

然后我们加上 `// @ts-check` 试试：

神奇的一幕出现了，在变量 a 赋值的下面，出现了红色波浪线，鼠标放上去提示：

![](https://user-images.githubusercontent.com/23518990/70406434-a92fc080-1a7b-11ea-896f-2c286548ea8b.png)

也就是说我们将一个字符串赋值给了一个数字类型的变量是有问题的，这个时候我们未运行程序，但是编辑器已经帮我们分析出了代码可能存在的问题，这时候我们运行代码，是没有报错的。

因为这个类型检测只是让我们按照 TypeScript 的强类型语言检测类型问题，但是我们依然是 JavaScript 代码依然会按照 JavaScript 的代码逻辑运行，如是 TypeScript 代码的话，这里运行就会报错。

## # JSDoc 类型标记

既然 ts-check 这么好用，我们来看看 JSDoc 类型的注释支持哪些类型的检测。

根据官方文档，JSDoc 现在支持下面几个类型检测：

* `@type`

* `@param` (or `@arg` or `@argument`)

* `@returns` (or `@return`)

* `@typedef`

* `@callback`

* `@template`

* `@class` (or `@constructor`)

* `@this`

* `@extends` (or `@augments`)

* `@enum`

下面我们选择常用的标记进行说明，更多更详细的标记可以参考[官方文档](https://www.tslang.cn/docs/handbook/type-checking-javascript-files.html)。

### # @type

描述：用来声明变量的类型。

### # @param 和@returns

描述：`@param`语法和`@type`相同，但增加了一个参数名。

### # @typedef

描述：`@typedef` 可以用来声明复杂类型，和`@param`类似的语法。

> 可以在第一行上使用`object`或`Object`。

## # 实验要求

经测试，在 `VSCode` 和`IDEA`下可以直接使用`ts-check` 的类型检测，`sublime`等编辑器不可以，应该是要下载对应的插件才可以。

## # 写在最后

对于老项目，使用 `// @ts-check` 和 `JSDoc` 来来享受 TypeScript 类型系统的好处是最简单、学习成本最低的方法。

而对于新项目，则更加推荐直接使用 TypeScript 来进行代码编写，并且各大框架里面都是用的 TypeScript 进行的代码编写，在可期的未来，TypeScript 将会越来越受欢迎。
