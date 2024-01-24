---
title: '浅析_zustand_状态管理器___LeeZhian_Blog'
tags: ['剪藏']
type: 'text/markdown'
created: 'Wed Nov 29 2023 14:36:57 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://www.leezhian.com/web/framework/zustand-analysis'
---

# 浅析_zustand_状态管理器___LeeZhian_Blog

**zustand** 是轻量型、快速的状态管理工具，而且使用很简单，也解决了很多常见的问题，比如可怕的 zombie child 问题、react concurrency，以及混合渲染器之间的上下文丢失。

## 使用 ​

这 part 不会多说，因为官网文档都写的很清楚。

### 创建一个 store ​

javascript

```
import create from 'zustand'

export const useStore = create((set, get) => ({
  todoList: [
    {
      date: 1671523153045,
      content: '起床刷牙',
    },
    {
      date: 1671523153046,
      content: '去旅游',
    },
  ],
}))
```

### 读取 store hooks ​

在任何地方使用这个 hook，不需要 provider。组件会在你选择的状态变化时重新渲染。

jsx

```
import { useStore } from 'store'

function App() {
  const todoList = useStore(state => state.todoList)

  return <div>
	{
	  todoList.map(item => (
		<div key={item.date}>{item.content}</div>
	  ))
	}
  </div>
}
```

### actions ​

**zustand** 不关心你的 action 是否是异步。你只需要在恰当的时候调用 `set` 即可。（你可以理解为就是一个处理函数）

javascript

```
import create from 'zustand'

export const useStore = create((set, get) => ({
  // 省略部分代码
  // 异步 action
  insert: async (content) => {
    const todo = {
      date: Date.now(),
      content,
    }
    await fetchInsert() // 这里为了模拟异步，就是简单的 setTimeout
    // set() 支持接收一个函数或状态对象
    set((state) => ({ todoList: [todo, ...state.todoList] }))
  },
  // 同步 action
  delete: (key) => {
    // get() 读取外部 状态, 就类似 redux reducer 中的 state
    const prevTodoList = get().todoList
    const targetIndex = prevTodoList.findIndex((todo) => todo.date === key)
    if (targetIndex < 0) return
    prevTodoList.splice(targetIndex, 1)
    set({ todoList: [...prevTodoList] })
  },
}))

// 使用
const insert = useStore(state => state.insert)
insert('actions')
```

如果你觉得离不开 redux 中的 `reducers` 和 `action types`，也可以写成这样👇🏻

javascript

```
import create from 'zustand'

const types = { insert: 'INSERT_TODO', delete: 'DELETE_TODO' }

const reducer = (state, { type, payload } => {
  switch (type) {
    case types.insert:
	  const todo = {
        date: Date.now(),
        content: payload.content,
      }
      
	  return { todoList: [todo, ...state.todoList] }
	case typs.delete:
	  const prevTodoList = get().todoList
      const targetIndex = prevTodoList.findIndex((todo) => todo.date === payload.key)
      if (targetIndex < 0) return prevTodoList
      prevTodoList.splice(targetIndex, 1)
      return { todoList: [...prevTodoList] }
  }
})

const useStore = create(set => ({
  todoList: [],
  dispatch: (payload) => set(state => reducer(state, payload))
}))

// 使用
const dispatch = useStore(state => state.dispatch)
dispatch({ type: types.insert, payload: { content: 'mock redux' } })
```

*到此为止，已经可以简单使用 zustand 了*。

### 多状态 ​

在上面的例子中，都是使用这种读取方式（单个状态），它基于严格相等来检测变化 `old === new`

javascript

```
const todoList = useStore(state => state.todoList)
const insert = useStore(state => state.insert)
```

如果我们想要一次获取多个状态，类似 `mapStateToProps` 时，可以采取这种方式👇🏻

javascript

```
import shallow from 'zustand/shallow' // 内置的比较函数(浅层diff)

const [ todoList, insertTodo, deleteTodo ] = useStore(state => [state.todoList, state.insert, state.delete], shallow) // state.todoList, state.insert, state.delete 改变时，重新渲染组件
// or
const { todoList, insertTodo, deleteTodo } = useStore(state => {state.todoList, state.insert, state.delete}, shallow)
```

提示

获取所有状态 `const state = useStore()` ，但不建议使用，因为任意 `state` 修改，都会导致组件重新渲染。

### 覆盖状态 ​

`set` 有第二个参数，默认值为 `false`，即进行合并操作；若为 `true` 则为覆盖操作

javascript

```
import create from 'zustand'

export const useStore = create((set, get) => ({
  // 省略部分代码
  destoryApp: () => set({}, true), // 这一步会将 store 覆盖为 {}
}))
```

### 在没有 React 情况下使用 ​

也就是在外部 `js` 文件下使用 zustand。

javascript

```
// 创建 store，与前面案例一致
export const useStore = create(
  // ...
)

// useStore 有 4 个属性，分别为 getState, setState, subscribe, destroy

// getState 获取 state，与 create 中的 get 一致
const todoList = useStore.getState().todoList

// setState 设置 state，与 create 中的 set 一致
useStore.setState({
  todoList: []
})

// subscribe 订阅器，每当 state 发生变化时都会触发
useStore.subscribe(() => {
  console.log('触发了')
})

// destroy 销毁store，删除所有订阅
useStore.destroy()

// 取消订阅
useStore()
```

[完整 ToDoList 案例代码](https://github.com/leezhian/react-demo/tree/master/zustand-crud)*更多高级用法自行查阅[官方仓库](https://github.com/pmndrs/zustand)*

## 源码解析 ​

插叙

如果想要学习一下 `rollup` 打包 和 `swc` 的话也可以看看 `zustand` 源码库，它里面也有使用到，而且都比较简单，容易入门。swc 是基于 `Rust` 实现的编译工具，它可以实现 `babel` 的功能和 `typescript` 编译，并且速度更快。同时它也推出 `swcpack` 打包工具，但目前问题还是比较多，更多只是用来代替 `babel`。

**zustand** 的源码主要是涉及 `src/react.ts` 和 `src/vanilla.ts` 这两个文件。中间件的源代码放在 `src/middleware`，有兴趣可以阅读一下，在一 part 不会讲它。😬 zustand 也提供了丰富的测试文件 `tests`，可以很方便的进行调试。

**回到正题**：zustand 状态管理库主要思想就是利用 [发布订阅模式](https://www.leezhian.com/web/design/observer.html) 和 `use-sync-external-store` (本质是 `React.useSyncExternalStore` 的单独一个包，用于正确订阅储存中的值，解决并发渲染导致的 Tearing 问题，即 `React concurrent`)

🔍 这一段就是创建 store( `create` 函数) 的核心代码👇🏻

javascript

```
const createStoreImpl = (createState) => {
  let state
  const listeners = new Set() // 储存订阅者
  
  /**
   * @description: 设置 state，等价于 set
   * @param {funtion|object} partial 更新后的state 或 更新函数(state) => set(...)
   * @param {boolean} replace true 为覆盖，默认false 合并
   * @return {void}
   */
  const setState = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial
    // 判断两边的值是否是同一个，如果不是同一个就更新
    if (!Object.is(nextState, state)) {
      const previousState = state
      state = replace ?? typeof nextState !== 'object' 
       ? nextState // 覆盖
       : Object.assign({}, state, nextState) // 合并
      listeners.forEach((listener) => listener(state, previousState)) // 发布事件（即通知更新），参数主要给我们自定义订阅事件使用，react 的 listenr (后面有讲这个怎么来)并没有用到
    }
  }

  // 返回 state，等价于 get
  const getState = () => state
  
  /**
   * @description: 监听器
   * @param {StoreApi<TState>['subscribe']} listener (state, prevState) => void
   * @return {function} 返回取消订阅函数
   */
  const subscribe = (listener) => {
    listeners.add(listener)
    // 返回销毁监听器函数
    return () => listeners.delete(listener)
  }

  /**
   * @description: 销毁（清空）监听器 函数
   * @return {void}
   */
  const destroy = () => listeners.clear()
  const api = { setState, getState, subscribe, destroy }

  // 这一步就是你 create 传入的函数，如 const useStore = create((set, get) => ({}))
  state = createState(setState, getState, api)
  return api
}
```

🏷️ 倘若我们有一段这样的代码，就好理解很多了。

javascript

```
export const useStore = createStoreImpl((set, get) => ({
  todoList: [],
  insert: () => {}
}))
```

`useStore` 对应就是函数的返回，即 `api = { setState, getState, subscribe, destroy }`。 `createState` 对应的就是创建 `state` 函数，即 `(set, get) => ({})`。 `state` 对应的就是 `creaetState` 的返回值 `{...}` 。

至此，在 **没有 React 情况下使用** 的功能已经完成，主要的 `listener` 是通过 `subscribe` 进行绑定的，然而在 `React` 下是如何触发更新的呢？

🤔 如何在 react 中正确的订阅外部储存的值？**主要就是利用到 `useSyncExternalStoreWithSelector`**，它是 `useSyncExternalStore` 指定选择器优化版。

> [React 18 - 了解 useSyncExternalStore](https://andyyou.github.io/2022/01/05/use-sync-external-store-with-solving-problem/) 我们都知道 React Fiber 调度是在 16 版本后采用的，它将复杂任务进行分片，优先调度高优先级，调度过程中可以挂起、恢复、终止。因此会进行并发渲染，就导致了一个问题，比如有 A、B、C 三个节点，都是渲染同一个外部存储 state，但渲染完 A 时，React 暂停了当前任务调度，将外部存储 state 修改了，当 React 恢复渲染的时候，B、C 都渲染为新值，而 A 依旧是旧值。React 为了解决这个问题加入了 `useMutableSource`，后面重新设计为 `useSyncExternaStore`。

✏️ 先使用一个简单的案例，理解 `useSyncExternaStore`，`store` 设计很简单，重点在 `useStore`。

jsx

```
import useSyncExternalStoreExports from 'use-sync-external-store/shim/with-selector'
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports

const store = {
  state: { data: 0 },
  listeners: [],
  subscribe(l) {
    store.listeners.push(l)
  },
  getState() {
    return store.state
  },
  setState(partial) {
    const nextState = partial(store.state)
    store.state = Object.assign({}, store.state, nextState)
    // 每当值修改的时候，就会触发所有订阅器，达到组件更新（因为在调用useSyncExternalStoreWithSelector 时 react 已经往 subscribe 注入了一个 listener）
    store.listeners.forEach((listener) => listener())
  },
  add() {
    store.setState(state => ({ data: state.data + 1 }))
  }
}

// 前身 useMutableSource
// useSyncExternalStoreWithSelector 用于读取和订阅外部数据源的 hook，与 useSyncExternalStore 类似
// 参数一：用于注册一个回调函数，当存储值发生更改时被调用，react会传入一个listener，当数据发生改变时必须调用这个listener
// 参数二：返回当前存储值的函数，即返回 state 的函数。
// 参数三：返回服务端渲染期间使用的存储值的函数。
// 参数四：选择返回指定状态的 seletor 函数，利用参数二其实也能达到效果，但获取不同的值都要修改参数二会比较麻烦。
// 参数五：对比函数，决定是否更新
const useStore = (selector, equalityFn) => useSyncExternalStoreWithSelector(
  store.subscribe,
  store.getState,
  store.getState,
  selector,
  equalityFn
)
  
function App() {
  // selector = state => state.data
  const count = useStore(state => state.data)
 
  return <div>
    <div>count:{count}</div>
    <div>
      <button onClick={() => store.add()}>add+</button>
    </div>
  </div>
}

export default App
```

**React 中能正确订阅且触发更新的核心代码**👇🏻

`api` 对应 `createStoreImpl` 返回值，即 `{setState, getState, subscribe, destroy}` 。

`selector` 对应使用 `store` 传入的函数，如 `useStore(state => state.data)`。

*也就是不建议为空，获取所有数据，只要 任意数据一改变就会导致频繁触发更新*。

javascript

```
/**
 * @description: 返回对应 state 的值
 * @param {{ setState, getState, subscribe, destroy }} api 
 * @param {(snapshot: Snapshot) => Selection} selector 选择器
 * @param {(a, b) => boolean} equalityFn 对比函数，是否更新
 * @return {any} 
 */
export function useStore(
  api,
  selector = (state) => api.getState,
  equalityFn
) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  )

  // react hooks (不重要)
  useDebugValue(slice)
  return slice
}
```

**zustand 的核心代码告一段落了，这个库代码量不多，设计简单，但不可否认是一个优秀状态管理解决方案**。

最后这段只是简单的导出 `create` 函数，用于理解整个流程。将 `createStoreImpl` 的返回值与 `useStore` 的建立函数合并 构成 `createImpl`(完整 `create` 函数) 的返回值。

javascript

```
// 创建接口（createState 依旧是那个创建 state 函数）
const createImpl = (createState) => {
  // api = { setState, getState, subscribe, destroy }
  // createStore 对应的就是 create 核心，也就是上面的 createStoreImpl
  const api =
    typeof createState === 'function' ? createStore(createState) : createState

  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn)
  
  Object.assign(useBoundStore, api)
  return useBoundStore
}

// 真正的 create 函数
const create = (createState) => createState ? createImpl(createState) : createImpl
```
