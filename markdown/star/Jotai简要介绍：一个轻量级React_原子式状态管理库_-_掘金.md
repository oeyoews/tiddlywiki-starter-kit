---
title: 'Jotai简要介绍：一个轻量级React_原子式状态管理库_-_掘金'
tags: ['剪藏']
type: 'text/markdown'
created: 'Sun Nov 26 2023 15:19:44 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://juejin.cn/post/7026970225643880484'
---

# Jotai简要介绍：一个轻量级React_原子式状态管理库_-_掘金

## 前言

随着前端应用承载的功能越来越复杂，状态管理一直是前端社区讨论的热门，从 Flux，Redux，MobX 到 Hooks 推出以来的 unstated-next 和 Recoli，这些实现方式迥异的状态管理库实质上都是为了满足相似的需求：状态共享和逻辑的组织提取。\

​

根据状态`store`存放方式的不同可以将状态管理方案分为两类：

* 依赖于 React `State`和`Context` API，状态存放在 React tree 中，因此只能在 React 中使用：Recoil

* 与 UI 层无关，状态存放在外部的 store 中：Redux，Mobx

或者根据实现理念的不同分为以下三类：

* Flux: 中心化`store`，通过 action 写入：Redux, Zustand

* Proxy: 双向绑定的响应式：Mobx, Valtio

* Atomic: 状态以原子式存在于 React tree，和 React 的 state 类似：以 Recoil, Jotai

​

本文要介绍的就是受到 Recoil 启发，但更轻量、更灵活的原子式状态管理库 Jotai (狀態)。作者 Daishi Kato 是 React 社区中的著名开发者，产出了多个优秀状态管理库，包括上述提到的三类方案中的 Zustand，Valtio 和 Jotai 相比“前辈”都更简单轻量。\

​

<https://link.juejin.cn/?target=>

## 原子式解决了什么问题？

React Hooks 的提出使得 state 的拆分和逻辑共享变得更容易，但`useState + useContext`对于多个 store 仍需要维护多个 Context Provider。因为当 context 值改变，所有消费该 context 的组件都会重新渲染，即使是组件仅用到了 context 的一部分，容易导致不必要的无用渲染，造成性能损失。（比如 react-redux v6 完全基于 Context API 而导致性能大幅下降，v7 又回退到之前的内部订阅方案，详见这个[issue](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Freduxjs%2Freact-redux%2Fissues%2F1177%23issue-406051556)）context 更适合放类似主题这种变化不大的全局数据，而并不适合存放频繁更新的复杂状态集合。\

​

<https://link.juejin.cn/?target=>

#### 一个简单例子：

* 定义两个 Counter 子组件 A 和 B，分别消费同一个 Context 中的 a 值和 b 值

* Counter 组件包含了显示渲染时的时间（`Date.now()`），如果组件重新渲染，显示的时间就会改变。

```
import React, { useState, useContext, createContext } from "react";

const context = createContext(null);

const CounterA = () => {
  const [value, setValue] = useContext(context);
  return (
    <div>
      <div>
        A: {value.a};<span> Time: {Date.now()}</span>
      </div>
      <button onClick={() => setValue((prev) => ({ ...prev, a: prev.a + 1 }))}>
        A+1
      </button>
    </div>
  );
};

const CounterB = () => {
  const [value, setValue] = useContext(context);
  return (
    <div>
      <div>
        B: {value.b};<span> Time: {Date.now()}</span>
      </div>
      <button onClick={() => setValue((prev) => ({ ...prev, b: prev.b + 1 }))}>
        B+1
      </button>
    </div>
  );
};

const TimeC = () => {
  return <div>TimeC: {Date.now()}</div>;
};

const initValue = {
  a: 0,
  b: 1
};

const Provider = ({ children }) => {
  const [value, setValue] = useState(initValue);
  return (
    <context.Provider value={[value, setValue]}>{children}</context.Provider>
  );
};

export default function App() {
  return (
    <Provider>
      <div className="App">
        <CounterA />
        <CounterB />
        <TimeC />
      </div>
    </Provider>
  );
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f19dcf014ccd46c1a107f64fa96d2831~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)\

可以看到，只要一个 Counter 改变了 Context，另一个消费该 Context 的 Counter 也同样进行了重新渲染，作为对照的 TimeC 组件则没有重新渲染。<https://link.juejin.cn/?target=>

### 原子式

以往 Context API 和 Redux 这类中心化状态管理方案中，所有状态都是一个对象自顶向下构建而成的。但在[Recoil](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffacebookexperimental%2FRecoil)，复杂状态集合拆分成一个个最小粒度的`atom`，每个`atom`可以理解为 Redux Store 中的一部分，不过是渐进式（可以按需创建）和分布式（可以在任何地方创建）的。

`atom`通过 hooks 和 selector 纯函数来组合、创建、更新。只有使用到该`atom`的组件才会在`atom`更新时触发 re-render。因此在原子式中，无需定义模版代码和大幅改动组件设计，直接沿用类似于`useState`的 API 就能实现高性能的状态共享和代码分割。

## 更轻量、更灵活的 Jotai

虽然 Recoil 宣称的高性能原子式状态管理非常诱人，但不能忽视的是 Reocil 本身设计相当复杂，为了适用于更复杂的大型场景，Recoil 拥有高达数十个 APIs，上手成本不低。而且为了规避 Context API 的问题，Reocil 使用了`useRef` API 来存放状态并在内部管理状态订阅和更新，严格意义上状态也并不算在 React Tree 中，同样面临着外部状态的 Concurrent Mode 兼容性问题。\

但 Context API 这种能在 React Tree 中很方便地共享状态并且天然兼容未来 Concurrent Mode 的方案还是很香的，在意识到性能问题后 React 社区也提出`[useContextSelecotr](https://github.com/reactjs/rfcs/pull/119)`提案和社区实现方案`[use-context-selector](https://github.com/dai-shi/use-context-selector)` (作者同样也是 Daishi Kato)，通过一个额外的 selector 来局部订阅 Context 的数据。

> `use-context-selector` 早期是在`creatContext`中回传 `changedBits=0` 这个没有出现在 API 文档的特性来阻断 Provider 触发组件更新。

那么有没有一种方案是兼顾原子式和 Concurrent Mode 呢，下面我们来介绍下更轻量，更灵活，为解决 Context API 而生的 Jotai：

* 既然主打的是轻量级原子式状态管理，Jotai 打包体积远小于 Recoil（Gziped 后 2.8KB vs 20.4KB）。并且核心 API 仅有 3 个：`atom`，`Provider`和`useAtom`（扩展能力由`jotai/utils`和`jotai/devtools`提供）

* Jotai 中的`atom`不需要 Recoil 中的 string key，而是用的 Object Reference。使用上更直观方便，但也损失了 debug 上直接利用 string key 的便利。

* 在 Provider-Less mode 推出之前，Jotai 的`atom`存放在 React Context 中，利用`use-context-selector`来避免重复渲染问题。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9dcb5886c1f4059b09afdffca925a35~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)([github.com/pmndrs/jota…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpmndrs%2Fjotai))\

最简例子：

```
import { atom, useAtom } from 'jotai'

// 原始Atom
const countAtom = atom(0) 
// 派生Atom
const doubleCountAtom = atom((get) => get(countAtom) * 2) 
// 仅有更新函数的Atom
const increaseTenAtom = atom(null, (get, set, _arg) => set(countAtom, get(countAtom) + 10))

const Counter = () => {
  const [count, setCount] = useAtom(countAtom)
  return (
    <h1>
      {count}
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </h1>
  )
}
const DoubleText = () => {
  const [doubleCount] = useAtom(doubleCountAtom)
  const [increase] = useAtom(increaseTenAtom)
  return (
    <h1>
      {doubleCount}
    	<button onClick={increase}>+10</button>
    </h1>
  )
}

const App = () => {
 return (
 		<>
   		<DoubleText />
   		<Counter />
   	</>
 ) 
}
```

在 Jotai 中，只需要通过单个`atom` API 的第一个参数来创建原始状态和派生状态，区别是后者参数是传入一个函数来对其他`atom`进行派生，第二个参数则用于生成指定更新函数的`atom` (writable derived atom 和 write only atom)。

下面从一个最常见的 CURD 场景展示下 Jotai 在更复杂实际场景的实践（参考[7GUIs](https://link.juejin.cn/?target=https%3A%2F%2Feugenkiss.github.io%2F7guis%2Ftasks)中的场景）：

* 三个受控输入框，别名，内容和过滤。

* 一个列表显示添加的项目。

* 三个操作按钮，创建，删除，更新。

```
// atom.js
import { atom } from "jotai";

// 三个输入框的atom
export const aliasAtom = atom("");
export const textAtom = atom("");
export const filterAtom = atom("");

// 全部列表atom，每个atom都是包含alias和text的对象
const itemListAtom = atom([]);

// 当前选中atom，包含alias和text的对象
const currentSelectAtom = atom(null);

// 派生atom，获取过滤后的列表
export const filteredByAliasListAtom = atom((get) => {
  const filter = get(filterAtom);
  const list = get(itemListAtom);

  return filter
    ? list.filter((itemAtom) => get(itemAtom).alias.includes(filter))
    : list;
});

// 派生atom，获取/设定当前选中的列表项atom
export const selectItemAtom = atom(
  (get) => get(currentSelectAtom),
  (get, set, itemAtom) => {
    set(currentSelectAtom, itemAtom);
    if (itemAtom) {
      const { alias, text } = get(itemAtom);
      set(aliasAtom, alias);
      set(textAtom, text);
    }
  }
);

// 仅更新atom，创建列表的新项
export const createItemAtom = atom(null, (get, set) => {
  const alias = get(aliasAtom);
  const text = get(textAtom);

  if (alias && text) {
    const itemAtom = atom({ alias, text });
    set(itemListAtom, (prev) => [...prev, itemAtom]);
    set(aliasAtom, "");
    set(textAtom, "");
  }
});

// 仅更新atom，更新列表中选中的单项atom
export const updateItemAtom = atom(null, (get, set) => {
  const alias = get(aliasAtom);
  const text = get(textAtom);
  const current = get(selectItemAtom);
  if (alias && text && current) {
    set(current, { alias, text });
  }
});

// 仅更新atom，删除列表中选中的单项atom
export const deleteItemAtom = atom(null, (get, set) => {
  const current = get(selectItemAtom);
  if (current) {
    set(itemListAtom, (prev) => prev.filter((item) => item !== current));
  }
});
```

可以看到，Jotai 比较推崇的是把状态相关的逻辑都写在单独的`atom`里，和 React 中的自定义 Hooks 的做法类似。

```
// App.js (部分内容)
const Item = ({ itemAtom }) => {
  const [value] = useAtom(itemAtom);
  const [selected, setSelected] = useAtom(selectItemAtom);
 
  const { alias, text } = value;
  const isSelected = selected === itemAtom;

  const onSelect = () => {
    setSelected(itemAtom);
  };

  return (
    <div
      onClick={onSelect}
      style={{ backgroundColor: isSelected ? "grey" : "#fff" }}
    >
      <span>{alias}</span>
      <span> - </span>
      <span>{text}</span>
    </div>
  );
};

const ItemList = () => {
  const [list] = useAtom(filteredByAliasListAtom);

  return (
    <div>
      List
      <ul>
        {list.map((item, i) => (
          <li key={i}>
            <Item itemAtom={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
```

[CodeSanbox](https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Felastic-tu-sm2tt)\

实际用起来和原来写 Hooks 区别和改动都不大，还是比较容易上手的。<https://link.juejin.cn/?target=>

## 第三方集成

虽然 Jotai 的状态存放在 React tree 中，所以官方同时也提供了第三方库的集成插件用于和 React Redux 之类的外部状态交互，比如`jotai/query`，`jotai/valtio`和`jotai/redux`。而`jotai/immer`则集成了 immer 作为状态更新的方法。

* `jotai/redux` 例子：

```
import { useAtom } from 'jotai'
import { atomWithStore } from 'jotai/redux'
import { createStore } from 'redux'

const initialState = { count: 0 }
const reducer = (state = initialState, action: { type: 'INC' }) => {
  if (action.type === 'INC') {
    return { ...state, count: state.count + 1 }
  }
  return state
}
const store = createStore(reducer)
// 对Redux Store进行双向绑定，既可以从Redux更新状态，也可以从Jotai这边更新
const storeAtom = atomWithStore(store)

const Counter = () => {
  const [state, dispatch] = useAtom(storeAtom)

  return (
    <>
      count: {state.count}
      <button onClick={() => dispatch({ type: 'INC' })}>button</button>
    </>
  )
}
```

* `jotai/immer` 例子：

```
import { useAtom, atom } from 'jotai'
import { atomWithImmer } from 'jotai/immer'

// 注册一个以immer为更新状态方法的immer atom
const demoAtom = atomWithImmer({a: 0, b: 0})

const Display = () => {
  const [demo] = useAtom(demoAtom)
  return <div>a: {demo.a} and b: {demo.b}</div>
}

const Updater = () => {
	const [, setDemo] = useAtom(demoAtom)
	const onUpdate = () => setDemo((demo) => {
  	demo.a += 1
    demo.b += 2
  })
	return <button onClick={onUpdate}>Update!</button>
}
```

除了基本的 immer atom，该插件还有个实用的 hook `useImmerAtom` 来以 immer 的方式来更新已有的 atom。<https://link.juejin.cn/?target=>

## 调试工具

根据开发文档，Jotai 官方提供了两种 Debug 方式：

1. 用 Redux DevTools 去查看特定`atom`的状态，只需要将`atom`和 label 传进`jotai/devtools`中的`useAtomDevtools` Hooks。

1. 用 React Dev Tools 去查看 Jotai 的 Provider，全部`atom`的状态都存放在`DebugState`中，但需要额外设定`atom`的 debugLabel 作为 key，否则会显示为`<no debugLabel>`。

```
// 1. Redux DevTools
import { useAtomDevtools } from 'jotai/devtools'
useAtomDevtools(cuntAtom, 'label')

// 2. React Dev Tools
countAtom.debugLabel = 'label'
```

总体而言，Jotai 以及 Recoil 的调试都要额外的配置和 API，开发体验上还有进步的空间。<https://link.juejin.cn/?target=>

## Concurrent Mode 支持

前面多次提到外部状态方案在 React 的 Concurrent Mode（并发模式）中会存在兼容性问题就是指的 tearing（撕裂），即在同一次渲染中状态不一致。因为在 Concurrent Mode 中，同一次 render 过程不像是过去那样是阻塞性的，而是可以被中断和恢复的。\

在同一层级下，如果一个 child 组件在 render 时读取了一个外部状态，而一个新的事件中断 render 并更新了这个状态，那么后续的 child 组件开始 render 时读取到的就是不一样的状态。关于 tearing 的更多细节可以看 React 18 的这个[讨论](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Freactwg%2Freact-18%2Fdiscussions%2F69)。\

在 React 18 发布计划公布以后，React 官方发了一篇[公告](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Freactwg%2Freact-18%2Fdiscussions%2F70)来说明 Concurrent Mode 对第三方库的影响和修改建议。其中提到三个避免 tearing 的方式和阶段：

1. Level 1: 检测到外部状态不一致就让 React 进行 re-render（`use-subscription`）。该方法还是可能会有短暂的 UI 不一致（首次 render），而且下一次的 re-render 会是同步的从而享受不到 Concurrent Mode 带来的性能和体验提升。

1. Level 2: render 时检测到外部状态不一致就让中断该 render 并进行 re-render（`useMutableSource` [提案](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Freactjs%2Frfcs%2Fblob%2Fmain%2Ftext%2F0147-use-mutable-source.md)）。该方法好处是完全不会像 Level 1 那样出现 tearing 现象，但因为中断并重新调度了 re-render，性能还是不如纯 Concurrent Mode。

1. Level 3: 使用 React 内置的状态（`state`和`context`），或者外部状态在状态突变时有一个 immutable 的数据引用 snapshots（还处于实验性质）。该方法始终 render 一致的 UI，不会出现 tearing，同时享受到 Concurrent Mode 的全部特性。

因为`useMutableSource`仍处于提案状态，还没有正式推出，所以大部分用到外部状态的状态管理库都或多或少有 tearing。Jotai[目前是处于第一阶段](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdai-shi%2Fwill-this-react-global-state-work-in-concurrent-rendering%2Fissues%2F45)，但其实已经用到了部分`useMutableSource`的特性，所以作者也表示只要 React 正式推出该 API，Jotai 就能到达第二阶段。等第三阶段的那个实验性方法通过后，理论上在 Jotai 的 API 中加入 immutable 限制也能够完美兼容 Concurrent Mode。<https://link.juejin.cn/?target=>

## 总结

虽然 Jotai 很简单，也已经具备一个 React 全局状态管理应有的特性，在一些特定场景也有相当不错的表现。但因为面世时间还不长，社区上关于 Jotai 的最佳实践还在探索中（作者甚至开发了[jotai-jsx](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdai-shi%2Fjotai-jsx)，基于 Jotai 同时不需要依赖 React 来渲染 UI）。毕竟原子式也并不是一个能解决所有需求的银弹，能不能用于需要长期维护的大型项目还待考验。
