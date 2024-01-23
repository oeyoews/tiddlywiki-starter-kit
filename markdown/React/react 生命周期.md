---
title: 'react 生命周期'
tags: ['React']
type: 'text/markdown'
created: 'Thu Jun 01 2023 13:42:16 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# react 生命周期

React 组件的生命周期方法指的是在组件的生命周期中由 React 自动调用的一系列方法，这些方法可以用于在组件的不同阶段执行一些操作，例如初始化状态、更新 UI、处理错误等。React 组件的生命周期方法分为三个阶段：挂载、更新和卸载。下面是每个阶段的生命周期方法：

1. 挂载阶段（Mounting）：

    * constructor()：组件的构造函数，在组件创建时调用。在构造函数中可以初始化组件的状态（this.state）和绑定成员函数的 this。

    * static getDerivedStateFromProps(props, state)：在组件实例化和接收到新的 props 时调用，用于根据新的 props 更新 state（不推荐使用）。

    * render()：组件的渲染函数，在组件挂载到 DOM 上时调用。render() 必须返回一个 React 元素。

    * componentDidMount()：在组件挂载后调用，用于进行一些异步操作，例如从服务器获取数据、设置定时器等。

1. 更新阶段（Updating）：

    * static getDerivedStateFromProps(props,state)：在组件接收到新的 props 或 state 时调用，用于根据新的 props 或 state 更新 state（不推荐使用）。

    * shouldComponentUpdate(nextProps, nextState)：在组件接收到新的 props 或 state 时调用，用于决定是否重新渲染组件。如果返回 false，组件将不会重新渲染。

    * render()：同上。

    * componentDidUpdate(prevProps, prevState, snapshot)：在组件更新后调用，用于进行一些副作用操作，例如更新 DOM、记录日志等。可以通过第三个参数 snapshot 获取组件更新前的信息。

1. 卸载阶段（Unmounting）：

    * componentWillUnmount()：在组件卸载前调用，用于清理组件的副作用操作，例如取消定时器、移除事件监听器等。

除了上述生命周期方法之外，还有一些其他方法，例如 static getDerivedStateFromError(error) 和 componentDidCatch(error, info)，用于处理组件渲染过程中的错误。需要注意的是，在 React 17 之后，getDerivedStateFromProps 和 componentWillReceiveProps 方法被标记为不安全的方法，不推荐使用。
