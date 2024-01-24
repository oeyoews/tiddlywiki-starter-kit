---
title: '理解_React_Suspense__·_Issue_'
tags: ['剪藏']
type: 'text/markdown'
created: 'Mon Nov 13 2023 06:10:50 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://github.com/yuxino/blog/issues/116'
---

# 理解_React_Suspense__·_Issue_

要了解一个技术首先要理解技术代表的含义才能更加容易的去理解背后的想法。

[![](https://user-images.githubusercontent.com/12481935/103646644-f5a64200-4f94-11eb-8282-89a3153cfab6.png)](https://user-images.githubusercontent.com/12481935/103646644-f5a64200-4f94-11eb-8282-89a3153cfab6.png)

> 在维基百科的定义里\
> 
> Suspense is a state of mental uncertainty, anxiety, of being undecided, or of being doubtful.\
> 
> 悬念是一种精神上的不确定性，焦虑，未定或怀疑的状态。

那么带入一下在`react`里`suspense`就是一种对组件怀疑的组件，这么说可能有点抽象让我们继续深入。

**Suspense 现在还是 experimental features，并不推荐在开发环境中使用，**

> Suspense lets your components “wait” for something before they can render.

官方对 `Suspense` 功能最简单的描述，`Suspense` 允许我们在组件可以完成渲染之前渲染点东西出来，但看这一段的话会感觉为什么不就叫做 `<Loader />` 呢，毕竟目前 `Suspense` 给人的感觉就是 `loading ? <component /> : ...` 这个感觉。

首先它确实可以叫`<Loader />`在大多数情况下，`Suspense`接受的 `fallback` 参数看起来就像是为了渲染 `<Spin />` 之类而生的，其实不然，因为 `fallback` 不单单可以处理加载中，也可以处理失败的状态。也就是说，处理组件未加载成功的状态。所以综合来说 `Suspense` 是更为准确的定义。而且 `fallback` 更加准确的中文翻译是 `回退` 。

> Suspense is not a data fetching library. It’s a mechanism for data fetching libraries to communicate to React that the data a component is reading is not ready yet.

从定义来看，如果 `Suspense` 只是单纯拿来做数据获取的东西未免也太大材小用了使用到这个名字。`React` 团队其实更倾向把 `Suspense` 作为一种职能能对接那些包含异步 (Promise) 的状态的组件而且还有一些额外的功能比如并行化。

体验 `Suspense` 之前我们先看官方给的代码案例来对比用和没用 `Suspense` 的区别。

## 第一种常见的方式 useEffect 或者 componentDidMount

先定义类似这样的东西去获取数据

```
// 函数式组件:
useEffect(() => {
  fetchSomething();
}, []);

// Class 组件:
componentDidMount() {
  fetchSomething();
}
```

> We call this approach “fetch-on-render” because it doesn’t start fetching until after the component has rendered on the screen. This leads to a problem known as a “waterfall”.

我们把这种渲染方式叫做 `fetch-on-rende`，什么意思呢，就是在 组件渲染在视图之后才开始获取数据，这会导致一个叫做 `waterfall` 的问题。那什么是 `waterfall` 看下去就明白了。

```
function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser().then(u => setUser(u));
  }, []);

  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline />
    </>
  );
}

function ProfileTimeline() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts().then(p => setPosts(p));
  }, []);

  if (posts === null) {
    return <h2>Loading posts...</h2>;
  }
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

渲染这俩个组件会在视图上发生什么事情呢。首先看到俩个组件都有不同的获取数据的方法，一个是 `fetchUser` 还有一个是 `fetchPosts` 。

还有一个关键的地方是`ProfilePage`的`render`部分。

```
if (user === null) {
  return <p>Loading profile...</p>;
}
<>
  <h1>{user.name}</h1>
  <ProfileTimeline />
</>
```

注意看这句`if (user === null)`绝对是绝大多数人会犯的，因为逻辑上来说没毛病啊，`user`没加载完就该显示`Loading`对吧，并且`user`都没加载完干嘛要显示`post`呢，实际上这句话会阻塞掉`<ProfileTimeline />`的渲染导致`<ProfileTimeline />`的数据延迟被获取。

我们会看到一个类似这样的流程发生。

* 先开始渲染 `user details` 组件

* 开始获取数据

* 判断数据好了没有

* 没好 -> 显示 `Loading profile...`

* 好了 -> 开始渲染 `<ProfileTimeline />`

* 然后 `<ProfileTimeline />` 也开始做类似的事情

* 获取数据

* 没好 -> 显示 `Loading posts...`

* 好了 -> 显示具体的 `posts`

客观的来看待这件事情，首先这件事情，在平时的大多数业务里都不会出问题，但是这个`<ProfileTimeline />`组件等待的过程其实是无意义的。它理论上也应该一起并行的渲染，并行的获取数据。因为如果获取 `users` 很慢的话，那么 `<ProfileTimeline />` 会一直被卡住。

`waterfall`就是来形容这种现象的：`an unintentional sequence that should have been parallelized.`就是这个东西本来应该要并行的却变成了一个无意义的序列化操作。

## 第二种改造版本 Promise.then

先不考虑 Relay, Graphql 那些东西把请求合并起来，就说一个前端能想到的最常规的玩法 `Promise.all`。

把之前提到的俩个请求合体。

```
function fetchProfileData() {
  return Promise.all([
    fetchUser(),
    fetchPosts()
  ]).then(([user, posts]) => {
    return {user, posts};
  })
}
```

变成这个样子。这样就能保证这俩是并行的了。并且可以保证这俩在获取完成后再处理。

```
// Kick off fetching as early as possible
const promise = fetchProfileData();

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    promise.then(data => {
      setUser(data.user);
      setPosts(data.posts);
    });
  }, []);

  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline posts={posts} />
    </>
  );
}

// The child doesn't trigger fetching anymore
function ProfileTimeline({ posts }) {
  if (posts === null) {
    return <h2>Loading posts...</h2>;
  }
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

来看看它的渲染流程

* 同时获取 `users details` 和 `posts`

* 等待

* 俩个都没好 - 都显示 loading

* 俩个都好了 - 都显示对应的内容

是的，`waterfall`的问题没了，但是带来了新的问题，这俩必须的同时好了，才会更新视图，就是说如果有哪个一直没获取到，或者失败了，就渲染不出来了，一直处理 `loading` 状态，并且异常也蛮难处理的这么整。

这样其实已经足够好了，组以应对很多场景了，但是随着代码增加，接口越来越多等问题，维护这个东西会非常麻烦，并且组件层级越来越多，需要传递的状态也越来越多，引入的概念和东西也会越来越多。

有人可能会说我们不一定要用 `Promise.all`，确实可以，因为我们只需要把东西抽到最顶上去，通过 `useEffect` 去更新就好了，这确实是一种方案，但是也不够好，跟前面说的差不多，所以我们也不用太纠结这个写法了。

```
useEffect(() => {
   fetchUser().then(user => setUser(user));
   fetchPosts().then(posts => setPosts(posts));
 });
```

## Suspense

以前我们都是通过状态去控制数据获取的。像是`setState`, `useState` 之类的。

从现在开始要颠覆你的概念。忘掉这些，把`获取数据`这一过程就当做一种状态，或者说我们只关心获取的结果，不想整那些 `loading` 之类中间状态的烂活。

> **With Suspense, we don’t wait for the response to come back before we start rendering.** In fact, we start rendering pretty much immediately after kicking off the network request.

这段话是什么意思呢，就是说用了 `Suspense` 我们会马上渲染只要一连上网络。其实这么说也有点作弊，毕竟示例代码里没有什么 `=== null` 之类的这样的控制语句。来看示例还是刚才的那个 demo。

```
// 伪代码
function fetchProfileData() {
  let userPromise = fetchUser();
  let postsPromise = fetchPosts();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  };
}

// This is not a Promise. It's a special object from our Suspense integration.
const resource = fetchProfileData();

function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

> This is not a Promise. It’s a special object from our Suspense integration.

注意一下第一句话，这句话很关键。`Suspense` 它虽然跟 `Promise` 有关系。但是它也没直接拿 `Promise` 来用，它会要求用户写一种特定的格式去使用 `Suspense`。这种格式大概是这样的输入输出对应关系。

* pending (对应 promise 的 pending) -> **抛出 (throw)** 一个 `promise` 对象

* error (对应 promise 的 fulfilled) -> 返回一个错误

* success (对应 promise 的 rejected) -> 返回一个结果

最终定义出来的函数类似这样。

```
function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}
```

抛开原理，先就不管 `react` 是怎么用这个数据结构的和 `suspense` 那个组件有什么猫腻，但是就是这样简简单单的一个函数一包，就能实现之前提到：

* 没有 `waterfall` 的代码

* 可维护，可读性比较好的代码

这是一个重大突破了。关于实现原理之类的我打算开一个别的文章讲，估计篇幅会比较长。另外这只是个简单的代码案例，其实还有更加复杂的并发的竞态情况还没有说，也打算放在别的文章讲。

这个 Demo 是官方的可以直接点[这个](https://codesandbox.io/s/frosty-hermann-bztrp)看效果。

这里可以看到 `Suspense` 有一个最外层的和一个小的包住 `<ProfileTimeline />`，就是为了实现之前的那个等`user`加载完了再显示完整内容的效果 (`user === null` 那段)。

还是来理解它是怎么渲染的

* 首先在最开始的地方调用了 `fetchProfileData` 来获取 `user` 和 `post` 俩个对象。

* React 开始**尝试**渲染`ProfilePage`这个组件，然后它发现里面有俩个东东 `ProfileDetails`和 `ProfileTimeline`。

* 再然后 React 开始**尝试**渲染`ProfileDetails`, 开始调用 `resource.user.read()`，因为是刚发起，所以什么东西都没有，组件被挂起 (`suspends`) 了。React 把它丢一边不管了，开始渲染其他的东东，比如 `ProfileTimeline`。

* React 又开始**尝试**渲染`ProfileTimeline`，发现它跟`ProfileDetails`差不多啥也没有，也把它挂起 (`suspends`)。

* OK，到此为止，因为都没好，所以就会开始显示`fallback`的组件。

* 随着时间的推移，`resource.user`有东西了，最外层的`fallback`会给去掉，这时候就不会显示 `<h1>Loading profile...</h1>` 这个组件了。但是依旧会显示 `<h1>Loading posts...</h1>`直到 `posts` 的数据获取完成后。

* 最终所有的 `fallback` 都没有了。

## 额外的玩法

`<Suspense />` 跟组件其实不是一对一的关系，它还可以一对多，比如这样

```
<Suspense fallback={<h1>Loading Content...</h1>}>
  <ProfileDetails />
   <ProfileTimeline />  
</Suspense>
```

也可以正常工作，我特意把时间改长了，可以[试试](https://codesandbox.io/s/bold-booth-r3usz?file=/src/index.js)，这也意味着我们可以玩其他更多的玩法。

## 假想的实现

其实透过这个现象我们都可以揣测，`Suspense` 会收集子组件的 `Promise`，但是每个`Suspense`都是一个作用域，如果子组件是通过`Suspense`包裹过的，这个 `Suspense` 就不会再收集被包裹过的组件的 `Promise` 了。并且可以大胆的推测如 `Suspense` 只会收集第一层级的 `Promise`，如果连子集的都收集，那确实是有点反人类的，而且耗费性能。。

因为之前说过`suspenser`是通过异常这样的形式抛出来的，所以我们还需要使用`componentDidCatch`来捕获`suspenser`。并且依赖`componentDidCatch`去展示对应 `fallback` 组件。

有点遗憾的是 直接 `throw suspender` 不行了，估计 `react` 魔改了什么东西吧，导致我拿不到 `then` 方法了，于是我换了个写法逃过了检查。`throw { suspender }`。这样就 ok 了。

```
read() {
  if (status === "pending") {
    throw { suspender };
  } else if (status === "error") {
    throw result;
  } else if (status === "success") {
    return result;
  }
}
```

其他的代码均没变。换上了我自己实现的 `Suspense` 版本。虽然控制台有一堆错误，无视就好暂时。。

简易版本[链接](https://codesandbox.io/s/magical-hawking-rhoo7)。进去的时候会发现有一个错误：

点 右边的 `X` 关掉就看得到效果了。
