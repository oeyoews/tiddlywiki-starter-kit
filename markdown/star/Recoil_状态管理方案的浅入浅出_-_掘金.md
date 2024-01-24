---
title: 'Recoil_状态管理方案的浅入浅出_-_掘金'
tags: ['剪藏']
type: 'text/markdown'
created: 'Sun Nov 26 2023 14:08:29 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://juejin.cn/post/7153072987162279943'
---

# Recoil_状态管理方案的浅入浅出_-_掘金

> 本文作者：[江水](https://link.juejin.cn/?target=https%3A%2F%2Fwww.zhihu.com%2Fpeople%2Fli-quan-wei-41)

背景：`Recoil` 是 `Facebook` 推出的一款专门针对`React`应用的状态管理库，在一定程度上代表了目前的一种发展趋势，在使用时觉得一些理念很先进，能极大地满足作为一个前端开发者的数据需求，本文对 `Recoil` 的这些特性做一个梳理。

根据官网的介绍，`Recoil` 的数据定义了一个有向图 (directed graph)，状态的变更是通过改变图的根节点 (atom)，再通过纯函数 (selector) 流向 `React` 组件。

![](https://p5.music.126.net/obj/LSnCvQ4FwpzDoBQ/288041617628/5dfc/9f78/4e10/44561cf62aaa0f1128238c3eb8079667.png)

同时 `Recoil` 的状态定义是增量和分布式的，增量意味着我们可以在用的时候再定义新的状态，而不必将所有状态提前定义好再消费。分布式意味着状态的定义可以放在任何位置，不必统一注册到一个文件中。这样的好处是一方面可以简化状态的定义过程，另一方面也可以很好地应用在 code-splitting 场景。

在一个应用中开启 `Recoil` 非常简单，只需要包裹一个 `RecoilRoot` 即可。

```
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <RecoilRoot>
     <App />
  </RecoilRoot>,
  root);
```

## 状态定义，原子和选择器

`Recoil` 允许使用 `atom` 和 `selector` 两个函数定义基础和推导状态。

`atom` 基本用法，这里定义了相关的原子属性，需要使用唯一 `key` 来描述这个 `atom` 。 `Recoil` 中不允许重复的 key 出现，包括后面提到的 `selector` 。

```
const firstNameAtom = atom({
  key: 'first name atom',
  default: ''
});

const lastNameAtom = atom({
  key: 'last name atom',
  default: ''
});
```

使用时通过 `useRecoilState` 这个 hooks 获取状态，可以看到它和 `useState` 很像，所以可以很轻松地将传统的 React 状态迁移到 `Recoil` 中。

```
function UserProfile() {
-  const [firstName, setFirstName] = useState('');
+  const [firstName, setFirstName] = useRecoilState(firstNameAtom);

  return (
    <div> { firstName } </div>
  );
}
```

很多时候我们只想获取数据而不想修改，或者反之，此时可以用语法糖 `useRecoilValue` 和 `useSetRecoilState`

```
function UserProfile() {
  const firstName = useRecoilValue(firstNameAtom);

  return (
    <div> { firstName } </div>
  );
}
```

`Recoil` 会根据哪里用到了这些状态自动建立一种依赖关系，当发生变更时 `Recoil` 只会通知对应的组件进行更新。

`selector` 的用法和 `atom` 很像，构造一个 `selector` 至少需要一个唯一的 `key` 和 `get` 函数。

```
const nameSelector({
  key: 'my name selector',
  get: ({ get }) => {
    return get(firstNameAtom) + ' ' + get(lastNameAtom);
  }
});
```

在 `selector` 中可以读写任意 `atom` / `selector` ，没有任何限制。只有 `get` 方法的 `selector` 是只读的，如果需要可写，也支持传入 `set` 方法。

```
const nameSelector({
  key: 'my name selector',
  get: ({ get }) => {
    return get(firstNameAtom) + ' ' + get(lastNameAtom);
  },
  set: ({ get, set }, value) => {
     const names = value.split(' ');
     set(firstNameAtom, names?.[0]);
     set(lastNameAtom, names?.[1]);
  }
});
```

值得一提的是，**selector 支持从网络异步获取数据，这里才是有趣的开始，也是和其他状态管理的最大的不同，Recoil 的状态不仅是纯状态，也可以是来自网络的状态**。

```
const userSelector = selector({
  name: 'user selector',
  get: () => {
    return fetch('/api/user');
  }
});
```

使用 `selector` 时和 `atom` 一样可以通过 `useRecoilState`, `useRecoilValue`, `useSetRecoilState` 这几个 hook。

```
function App() {
    const user = useRecoilValue(userSelector);

    ...
}
```

这样的特性使得我们的代码很容易重构，假如一开始一个属性是一个 `atom`, 后面希望变成一个计算属性，此时可以很轻松地替换这部分逻辑，而无需修改业务层代码。

`Recoil` 还可以更强大，用下面一张图可以大致概括下，**其完全可以当成一个统一的数据抽象层**，将后端数据通过 http, ws, GraphQL 等技术映射到前端组件中。

![](https://p6.music.126.net/obj/LSnCvQ4FwpzDoBQ/288041617663/c4de/adf3/e0a4/31712aae8785995e9c27796741217106.png)

## atomFamily selectorFamily 批量创建状态的解决方案

在一些场景中会有需要批量创建状态的情况，我们会实例化多个相同的组件，每个组件都需要对应一个自己独立的状态元素，此时就可以使用 `xxxFamily` api。

```
const nodeAtom = atomFamily({
  key: 'node atom',
  default: {}
});

function Node({ nodeId }) {
  const [node, setNode] = useRecoilState(nodeAtom(nodeId));
}
```

可以看到，`atomFamily` 返回的是一个函数，而不是一个 `RecoilState` 对象。传入不同的 `nodeId` 会检查是否之前已存在，如果存在则复用之前的，不存在则创建并使用默认值初始化。

同理，对于 `selectorFamily` 。

```
const userSelector = selectorFamily({
  key: 'user selector family',
  get: (userId) => () => {
    return fetch(`/api/user/${userId}`);
  }
});

function UserDetail({ userId }) {
  const user = useRecoilValue(userSelector(userId));
}
```

由于批量创建可能会导致内存泄漏，所以 `Recoil` 也提供了缓存策略管理，分别为 `lru`, `keep-all`, `most-recent`，可以根据实际需要选取。

## Suspense 与 Hooks

上文提到每个 `atom`, `selector` 背后可以是本地数据，也可以是网络状态（对，没错， `atom` 也可以是个异步数据，常用的如 `atom` 初始化是个异步，后续变成同步数据），在组件消费时无需关心背后的实际来源，使用远程数据就像使用本地数据一样轻松。

来看一个普通的获取数据并展示组件的例子。

```
function getUser() {
  return fetch('/api/user');
}

function LocalUserStatus() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    getUser().then((user) => {
      setUser(user);
      setLoading(false);
    })
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div>
      { user.name }
    </div>
  )
}
```

对于这种开发习惯 (往往被称为 Fetch-on-Render）：我们需要一个 `useEffect` 来获取数据，再需要设置一些 `loading`, `error` 状态处理边界状态，如果这个数据不是一个放在全局且处在顶层的数据，而是散落在子组件中消费，则每一个使用的地方都要执行类似的逻辑。

下面看下 `Recoil` 的写法

```
const localUserAtom = atom({
  key: 'local user status',
  default: selector({   // <-------- 默认值来自 selector
    key: 'user selector',
    get: () => {
      return fetch('/api/user');
    }
  })   
});

function LocalUserStatus() {
    const localUser = useRecoilValue(localUserAtom);

    return (
      <div>
        { localUser.name }
      </div>
    )
}
```

这里在组件层是不关心数据从哪来的， `Recoil` 会自动按需请求数据。

相比之下，后者的代码就简洁许多 (Render-as-You-Fetch)，而且背后并没有发明新的概念，用到的都是 `React` 原生的特性，这个特性就是 `Suspense`。

如果使用了一个异步的 `atom` 或 `selector` ，则外层需要一个 `Suspense` 处理网络未返回时的 `loading` 状态。也可以套一层 `ReactErrorBoundary` 处理网络异常的情况。

```
// UserProfile 中使用了一个需要从网络中加载的数据
function LocalUserStatus() {
  const user = useRecoilValue(localUserAtom);

  ...
}

function App() {
  return (
    <div>
        <div>
            hello, 外部组件在这里
        </div>

        <Suspense fallback={<Loading />}>
            <LocalUserStatus />
        </Suspense>

        <div>底部</div>
    </div>
  );
}
```

通过把通用的 `Loading` 和 `Error` 逻辑剥离出去，使得一般组件内的条件分支减少 66%，首次渲染即是数据准备完成的状态，减少了额外的处理逻辑以及 hooks 过早初始化问题。

![](https://p5.music.126.net/obj/LSnCvQ4FwpzDoBQ/288041617669/b0b5/95a3/20f6/6218fb472cfcd61185a187f5431d0f1a.gif)

> hooks 过早初始化问题可参考拙文：[Recoil 这个状态管理库，用起来可能是最爽的](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F528844615)

---

### useRecoilValueLoadable(state) 读取数据，但返回的是个 Loadable

和 `useRecoilValue` 不同，`useRecoilValueLoadable` 不需要外层 `Suspense` ，相当于将边界情况交给用户处理。

`Loadable` 的对象结构如下：![](https://p5.music.126.net/obj/LSnCvQ4FwpzDoBQ/288041617673/6017/8637/ea8d/d57bfacc149bf68135e4dbafc799aca3.png) 它的作用就是我们能够获取到当前数据是 `loading`, 还是已经 `hasValue`, 手动处理这些状态，适合灵活处理页面渲染的场景。

```
const userLoadable = useRecoilValueLoadable(userSelector);

const isLoading = userLoadable.state  === 'loading';
const isError = userLoadable.state === 'hasError';
const value = userLoadable.getValue();
```

## Recoil 用来映射外部系统

在一些场景下我们希望 `Recoil` 能够和外部系统进行同步，典型的例子例如 `react-router` 的 `history` 同步到 `atom` 中，原生 js 动画库状态和 `Recoil` 同步，将 `atom` 和远程 `mongodb` 同步。通过直接读写 `atom` 就能直接读写外部系统，开发效率可以大大提高。

这种场景下可以借助 `recoil-sync` 这个包，下面列举两个案例。

使用 `sharedb` + `recoil-sync` 可以让 `atom` 和 `mongodb`/`postgres` 等数据库进行状态同步，从而让远程数据库修改如同本地修改一样方便。

```
// 对其的修改会实时同步到远程mongodb中
const [name, setName] = useRecoilState(nameAtom);
```

![](https://p6.music.126.net/obj/LSnCvQ4FwpzDoBQ/288041617692/4df6/196b/fb00/07f5f3c68a6a4caea6334394ba8a74dd.png)

使用 `recoil-sync` 将 `atom` 和 `pixi.js` 动画元素进行状态同步

[codesandbox.io/s/nice-swir…](https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Fnice-swirles-dmdlq0%3Ffile%3D%2Fsrc%2Fanimation-canvas.js)

![](https://p5.music.126.net/obj/LSnCvQ4FwpzDoBQ/288041617746/e4a5/784e/58a9/94480d3c45b0f2e85f48a3fa2316e7f5.png)

此时可以将画布上的一些精灵变成受控模式。

由于同步过程中会产生数据格式校验问题， `recoil-sync` 使用 `@recoiljs/refine` 用来提供数据校验和不同版本数据迁移功能。

## Recoil 状态快照

由于状态粒度较细，对于需要批量设置 `RecoilState` 的场景， `Recoil` 有 `Snapshot` 的概念，适合 `ssr` 时注入首屏数据，创建快照进行回滚，批量更新等场景。

填充 SSR 的数据

```
function initState(snapshot) {
  snapshot.set(atoms.userAtom, {
    name: 'foo',
  });
  snapshot.set(atoms.countAtom, 0);
}

export default function App() {
  return (
    <RecoilRoot initializeState={initState}>
      ...
    </RecoilRoot>
  );
}
```

应用数据回滚

```
function TimeMachine() {
  const snapshotRef = useRef(null);
  const [count, setCount] = useRecoilState(countAtom);

  const onSave = useRecoilCallback(
    ({ snapshot }) => () => {
      snapshot.retain();
      snapshotRef.current = snapshot;
    },
    []
  );

  const onRevoca = useRecoilCallback(
    ({ gotoSnapshot }) => () => {
      if (snapshotRef.current) {
        gotoSnapshot(snapshotRef.current);
      }
    },
    []
  );

  return (
    <div>
      <button onClick={onSave}>save</button>
      <button onClick={onRevoca}>recova </button>
      <button onClick={() => setCount((v) => v + 1)}> add {count} </button>
    </div>
  );
}
```

## 不使用 async-await 也能实现异步转同步代码

在 `React` 的世界里一直存在着一种很奇怪的代码技巧，这种技巧能够不利用 `generator` 或者 `async` 就能达到异步转同步的功能，在了解 `Recoil` 的一些用法时我也留意到这种现象，很有意思，这里介绍下：假如 `userSelector` 是一个需要从网络中获取的状态，对其的读取可视作一个异步操作，但是在写 `selector` 时我们可以以一种同步的方式来写。

```
const userNameSeletor = selector({
  key: 'user name selector',
  get: ({ get }) => {
    const user = get(userSelector);  <--- 这里背后是个网络请求
    return user.name;
  }
});
```

这种写法之前出现过，在组件中使用 `selector` 时我们也没有考虑其异步性。

```
function UserProfile() {
  const user = useRecoilValue(userProfile); <---- 这里背后也是个网络请求
  const userId = user.id;
  return <div>uid: {userId}</div>;
}
```

在组件中使用时是利用了外层的 `Suspense` 执行，在上述的 `get` 回调中内部也隐式地使用了相似手段，当发生异步时 `get` 方法会将`Promise`当成异常抛出，当异步结束时再重新执行这个函数，所以这个函数本身会执行两次，有点黑魔法的感觉，这也同样要求我们在此时应该保证`get`是一个纯函数。如果一个 `selector` 的 `get` 回调中存在网络请求，那就不再是一个纯函数，此时需要保证：**网络请求是在所有异步 selector 执行之后调用**。

```
// 正确的用法
const nameSelector = selector({
    key: "name selector",
    get: async ({ get }) => {
        get(async1Selector);
        get(async2Selector);
        await new Promise((resolve) => {
            setTimeout(resolve, 0);
        });
        return 1;
    }
});

// 错误的用法
const nameSelector = selector({
    key: "name selector",
    get: async ({ get }) => {
        get(async1Selector);
        await new Promise((resolve) => {
            setTimeout(resolve, 0);
        });
        get(async2Selector);
        return 1;
    }
});
```

## 最后，关于代码直觉，心智负担

最近很多人会讨论一个库是否适合引入时会说到这两个词，在对一个库不了解的情况下我们很容易就说出“这个库太复杂了”，“要记忆的 api 太多了”这类的话。在 `Recoil` 的世界里如果我们接受了 `atom`, `selector` ，那么 `atomFamily`, `selectorFamily` 也很容易理解。由于已经习惯了 `useState` 那么 `useRecoilValue`, `useSetRecoilValue` 也很容易接受，都很符合 hooks 的直觉。

`Recoil` 的 api 和 `react` 自身的 `useState`, `useCallback`, `Suspense` 是概念一致的，二者的使用反而会加深对 `react` 框架本身的理解，一脉相承，没有引入其他的编程概念，api 虽多但心智负担并不大。举个反例，如果在 `react` 中使用 `observable` 类型的状态管理，我可能会思考 `useEffect` 在一些场景是否能够按预期工作，虽然某些特性使用起来很舒服，但却加深了心智负担。

如果有误还望指正。

> 本文发布自网易云音乐技术团队，文章未经授权禁止任何形式的转载。我们常年招收各类技术岗位，如果你准备换工作，又恰好喜欢云音乐，那就加入我们 grp.music-fe(at)[corp.netease.com](http://corp.netease.com)！
