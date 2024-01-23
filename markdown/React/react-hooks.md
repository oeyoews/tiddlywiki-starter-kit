---
title: 'react-hooks'
tags: ['React']
type: 'text/markdown'
created: 'Sun Apr 30 2023 09:42:51 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# react-hooks

useState：用于在函数组件内部添加 state 状态管理。

useEffect：用于控制函数组件的副作用，比如异步请求、定时器、事件监听等。

useContext：用于在函数组件中使用上下文信息。

useReducer：可用于替代 useState 实现复杂的状态逻辑，尤其在多个组件需要协同工作时效果更好。

useCallback：用于避免重复创建函数实例，提高组件性能，优化 useCallback 内部引用的函数的依赖项列表。

useMemo：用于缓存计算结果，优化性能。

useRef：用于在函数组件之间保留变量的引用，以便跨组件状态共享和访问 DOM 元素。

useImperativeHandle：与 useRef 配合使用，使得父组件可以直接访问和调用子组件上的方法。

useLayoutEffect：与 useEffect 类似，但会在 DOM 更新前同步执行。

useDebugValue：可用于方便地在 React 开发者工具中查看钩子函数的值。
