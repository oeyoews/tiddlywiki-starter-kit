---
title: 'mvvm'
tags: ['React', 'Vue']
type: 'text/markdown'
created: 'Wed Apr 26 2023 04:12:36 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# mvvm

Vue.js 和 React.js 是两个不同的 JavaScript 框架，都可以用于构建现代 Web 应用程序。在数据绑定方面，Vue.js 使用了 MVVM（Model-View-ViewModel）模式，而 React.js 使用了单向数据流模式。

MVVM 模式将应用程序分为三个部分：模型（Model）、视图（View）和视图模型（ViewModel）。视图是用户界面，模型是数据层，而视图模型则是连接两者之间的桥梁。在 Vue.js 中，Vue 实例作为视图模型，处理用户交互和渲染输出。当数据更新时，Vue 的响应式系统会自动更新 DOM 元素。

React.js 没有显式地使用 MVVM 模式，而是基于单向数据流的思想。React.js 中的组件是基于数据的，当数据发生变化时，React.js 会重新计算和渲染组件，然后更新 DOM 元素。React.js 还提供了一种称为“hooks”的特性，使开发人员能够更好地管理组件状态和行为。

因此，尽管 Vue.js 和 React.js 都可以用于构建现代 Web 应用程序，它们在数据绑定方面采用了不同的方法。Vue.js 使用了 MVVM 模式，而 React.js 使用了单向数据流模式。
