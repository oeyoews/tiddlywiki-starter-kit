---
title: '使用_Jotai_抽离组件状态的经验___静かな森'
tags: ['剪藏']
type: 'text/markdown'
created: 'Sun Nov 26 2023 15:16:51 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://innei.in/posts/programming/jotai-experience-with-component-state-abstraction'
---

# 使用_Jotai_抽离组件状态的经验___静かな森

Jotai 是一个非常优秀的基于原子模型的 React 状态管理库。它采用自下而上的方法来构建全局 React 状态管理，通过组合原子来构建状态，并根据原子依赖关系优化渲染。这解决了 React 上下文的额外重新渲染问题，并消除了对 memoization 的需求。

使用 Jotai 可以很方便的把顶层组件揉在一起的状态（State），拆分成多次 Atom，将状态和 UI 分离，可以很高效的管理状态，在组件内部也可以按需获取状态的 Getter / Setter，减少大量的重渲染。

## 使用 `useAtom` 代替 `useState`

Jotai atom 的使用方式非常简单，一般的只需要把 `useState` 的 initialValue 写到 `atom()` 里，然后直接替换 `useState` 即可。

```
const isShowAtom = atom(true)
const Foo = () => {
  const [isShow, setIsShow] = useState(true)
  // change to
  const [isShow, setIsShow] = useAtom(isShowAtom)
}
```

除此之外，Jotai 还提供了 `useAtomValue` 和 `useSetAtomValue`，可以按需使用。在没有消费 atomValue 场景下，你大可不必使用 `useAtom`，而可以直接使用 `useSetAtomValue`这样的好处是当 atomValue 变化时不会导致该组件发生重渲染。如以下的例子当父组件点击 Button 时不会发生重渲染，只有 Bar 会发生更新：

```
const isShowAtom = atom(true)
const Foo = () => {
  const setIsShow = useSetAtom(isShowAtom)
  
  return <>
   <Bar />
   <button onClick={() => setIsShow(true)}>Show</button>
  </>
}

const Bar = () => {
  const isShow = useAtomValue(isShowAtom)
  // ...
}
```

题外话：如果不使用 Jotai，我应该如何避免 useState 导致的过多重渲染？

上面的例子中，我们可以使用 useState + useContext 来代替。

```
const IsShowContext = createContext(false)
const SetIsShowContext = createContext<SetStateAction<boolean>>(() => {})
const Foo = () => {
  const [isShow, setIsShow] = useState(false)
  return (
    <IsShowContext.Provider value={isShow}>
      <SetIsShowContext.Provider value={setIsShow}>
        <FooImpl />
      </SetIsShowContext.Provider>
    </IsShowContext.Provider>
  )
}
const FooImpl = () => {
  const setIsShow = useContext(SetIsShowContext)

  return (
    <>
      <Bar />
      <button onClick={() => setIsShow(true)}>Show</button>
    </>
  )
}

const Bar = () => {
  const isShow = useContext(IsShowContext)
  // ...
}
```

而这种为了实现性能优化而把 Context 才碎的方式，在状态过多的情况下非常难维护。

如果你不想使用 Jotai 类似的状态库，可以试试 [foxact](https://foxact.skk.moe/)** 的 `useContextState` 实现和上面大同小异。

## 使用 `useContext` 和 `atom` 把全局状态收缩到组件内部

上述使用了 `useAtom` 替换 `useState` 之后，把组件状态外置了，导致组件不能复用了，一旦复用他的状态都是共享的。我们可以使用 `useContext` 和 `atom` 配合把组件的状态再收缩到组件内部。

还是以上面的简单例子的举例。

```
const FooContext = createContext(null)
const createCtxValue = () => {
    isShowAtom: atom(false),
}
const Foo = () => {
  const contextValue = useMemo(createCtxValue, [])
  return (
    <FooContext.Provider value={contextValue}>
      <FooImpl />
    </FooContext.Provider>
  )
}
const FooImpl = () => {
  const { isShowAtom } = useContext(FooContext)
  const setIsShow = useSetAtom(isShowAtom)

  return (
    <>
      <Bar />
      <button onClick={() => setIsShow(true)}>Show</button>
    </>
  )
}

const Bar = () => {
  const { isShowAtom } = useContext(FooContext)
  const isShow = useAtomValue(isShowAtom)
  // ...
}
```

利用一个 context 非常巧妙的把状态再次打入组件内部，从顶层传入一个 contextValue，context 内部挂载 `atom`，子组件按需消费 atom，又因为这个 Context 没有任何依赖，所以你可以在自带组件任意的使用 contextValue 不用担心 contextValue 变化导致的重渲染问题，在这里 contextValue 永远不会变化，又得益于 Jotai，在任何地方从 contextValue 获取 atom 然后使用 `useAtomValue` 订阅 atom 的变化并响应到组件中。

## 按需订阅 Atom 的利器 - `selectAtom`

Jotai 提供了 `selectAtom` 函数，该函数可以在原有 atom 基础上创建一个新的 readOnly atom，主要的使用方法是实现 selector。

一般的 atomValue 如果本身就是 primitive 类型的大可不必使用这个函数。如果是引用类型的值，比如对象。根据 Immutable 的特性，庞大的对象内部需要发生更改，就会创建一个新的对象。对象内部的任何改变会导致订阅了整个 atomValue 的组件发生更新。

```
const objectAtom = atom({
  type: 'object',
  value: {
    foo: 1
  }
})
const Foo = () => {
  const setter = useSetAtom(objectAtom)
  
  return <>
   <Bar />
   <button onClick={() => setter(prev => ({...prev, value: { foo:1 }}))}>Show</button>
  </>
}

const Bar = () => {
  const { type } = useAtomValue(objectAtom)
  // ...
}
```

在上面的例子中，虽然 Bar 只消费了 `type`，但是 Foo 中的 button 点击后，Bar 也会因为 objectAtom 的 value 改变而改变。

```
const objectAtom = atom({
  type: 'object',
  value: {
    foo: 1,
  },
})
const Foo = () => {
  const setter = useSetAtom(objectAtom)

  return (
    <>
      <Bar />
      <button
        onClick={() => setter((prev) => ({ ...prev, value: { foo: 1 } }))}
      >
        Show
      </button>
    </>
  )
}

const Bar = () => {
  const type = useAtomValue(
    selectAtom(
      objectAtom,
      useCallback((atomValue) => atomValue.type, []),  // 注意这里
    ),
  )
  // ...
}
```

而使用 selectAtom 提取内部的值就不会发生这样的问题了。注意这里需要用 `useCallback`包裹传入的 selector，或者提取这个函数到组件外部，需要保证在下次重渲染中函数不变，负责就造成重渲染地狱。

---

以上三点，能覆盖到大部分场景。赶快试试吧。
