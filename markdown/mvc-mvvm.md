---
title: 'mvc-mvvm'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed May 03 2023 03:13:28 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# mvc-mvvm

MVC（Model-View-Controller）和 MVVM（Model-View-ViewModel）是两种常见的前端应用程序架构模式，它们的主要区别如下：

1. 模型与视图的关系不同：在 MVC 中，视图和模型是分离的。控制器作为桥梁，将模型和视图链接在一起。而在 MVVM 中，视图通过数据绑定直接绑定到 ViewModel 上，ViewModel 与模型交互并提供必要的方法。

1. 数据双向绑定：MVVM 引入了数据双向绑定的概念，使得视图和 ViewModel 之间的交互更加便捷。当 ViewModel 中的数据发生变化时，视图会自动更新；当用户在视图中输入数据时，ViewModel 会自动更新数据模型。

1. 控制器与 ViewModel 的区别：MVVM 中没有控制器的概念，而是引入了 ViewModel。ViewModel 既可以处理视图的显示逻辑，也可以与模型进行交互。而控制器则只负责处理视图和模型之间的通信。

1. 独立性不同：在 MVC 中，视图、模型和控制器都是独立的组件，彼此之间没有强耦合。而在 MVVM 中，ViewModel 是视图和模型之间的桥梁，它们之间的联系更加紧密。

总的来说，MVC 和 MVVM 都是优秀的前端应用程序架构模式，它们各有优缺点，适用于不同的场景和需求。对于需要频繁更新视图的复杂单页应用程序，MVVM 更为适合；而对于传统的多页 Web 应用程序，MVC 则更加适用。
