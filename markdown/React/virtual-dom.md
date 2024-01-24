---
title: 'virtual-dom'
tags: ['React']
type: 'text/markdown'
created: 'Fri Apr 28 2023 09:31:39 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# virtual-dom

虚拟 DOM(Virtual Dom) 就是一个 JS 对象 (数组对象)，用来描述真实 DOM。相对通过 html 标签创建的真实 DOM，虚拟 DOM 是保存在客户端内存里的一份 JS 表述 DOM 的数组对象。

虚拟 DOM 更新性能快的原因并不是因为在内存中 (理论上任何软件都是运行在内存中)，而是因为虚拟 DOM 储存的数据格式为 JS 对象，用 JS 来操作 (生成/查询/对比/更新)JS 对象很容易。用 JS 操作 (生成/查询/对比/更新) 真实 DOM 则需要调用 Web Action 层的 API，性能相对就慢。

react 运行 (更新) 步骤，大致为：

* 定义组件数据变量

* 定义组件模板 JSX

* 数据与模板结合，生成一份虚拟 DOM

* 将虚拟 DOM 转化为真实 DOM

* 将得到的真实 DOM 挂载到 html 中 (通过真实 DOM 操作)，用来显示

* 监听变量发生改变，若有改变重新执行第 3 步 (数据与模板结合，生成另外一份新的虚拟 DOM)

* 在内存中对比前后两份虚拟 DOM，找出差异部分 (diff 算法)

* 将差异部分转化为真实的 DOM

* 将差异化的真实 DOM，通过真实 DOM 操作进行更新

[ref](https://github.com/puxiao/react-hook-tutorial/blob/master/%E9%99%8401%EF%BC%9AReact%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.md#%E5%A3%B0%E6%98%8E%E5%BC%8F%E5%BC%80%E5%8F%91-%E6%A6%82%E5%BF%B5%E8%A7%A3%E9%87%8A)
