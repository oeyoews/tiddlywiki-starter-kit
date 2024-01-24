---
title: 'React_18中的useId'
tags: ['剪藏']
type: 'text/markdown'
created: 'Thu Nov 30 2023 06:25:33 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://segmentfault.com/a/1190000042178205'
---

# React_18中的useId

#### 语法

`const id = useId();`

#### 简介

useId 是新增的用于生成**唯一 ID 值**的 hook 钩子，主要用于**客户端和服务器端**使用，同时避免 dehydrate 过程中数据不匹配的问题。

在服务端，我们会将 React 组件渲染成为一个字符串，这个过程叫做**脱水**「dehydrate」。字符串以 html 的形式传送给客户端，作为首屏直出的内容。到了客户端之后，React 还需要对该组件重新激活，用于参与新的渲染更新等过程中，这个过程叫做**注水**「hydrate」。

![image.png](https://segmentfault.com/img/bVc1aVB)

它主要用于与需要唯一 ID 的可访问性 API 集成的组件库。这解决了 React 17 及更低版本中已经存在的问题，但在 React 18 中更为重要，因为新的流式服务器渲染器如何无序交付 HTML。

但是，不建议用于 List 中作为 key 使用，列表中的唯一 key 应该使用 List 中的数据。

#### 问题

React 渲染有客户端渲染（CSR）和服务端渲染（SSR）。

假设有如下代码片段：

```
const id = Math.random();

export default function App() {
  return <div id={id}>Hello</div>
}
```

如果应用是 CSR（客户端渲染），id 是稳定的，App 组件没有问题。

但如果应用是 SSR（服务端渲染），那么 App.tsx 会分为以下几步：

1. React 在服务端渲染，生成随机 id（假设为 0.1234），这一步叫 dehydrate（脱水）；

1. <div id=“0.12345”>Hello</div>作为 HTML 传递给客户端，作为首屏内容；

1. React 在客户端渲染，生成随机 id（假设为 0.6789），这一步叫 hydrate（注水）。

**客户端、服务端生成的 id 不匹配！**

**原始解决方式：**

```
let globalIdIndex = 0;

export default function App() {
  const id = useState(() => globalIdIndex++);
  return <div id={id}>Hello</div>
}
```

只要 React 在服务端、客户端的运行流程一致，那么双端产生的 id 就是对应的。

但是，随着 React Fizz（React 新的服务端流式渲染器）的到来，渲染顺序不再一定。

比如，有个特性叫 Selective Hydration，可以根据用户交互改变 hydrate 的顺序。

当下图左侧部分在 hydrate 时，用户点击了右下角部分：

![image.png](https://segmentfault.com/img/bVc08Cf)\

此时 React 会优先对右下角部分 hydrate：

![image.png](https://segmentfault.com/img/bVc08Cn)

**因此，自增的全局计数变量作为 id，不再准确！！**

那么，有没有什么是服务端、客户端都稳定的标记呢？

答案是：**组件的层次结构。**

#### useId 的原理

假设应用的组件树如下图：

![image.png](https://segmentfault.com/img/bVc08CI)\

不管 B 和 C 谁先 hydrate，他们的层级结构是不变的，所以「层级」本身就能作为服务端、客户端之间不变的标识。

比如 B 可以使用 2-1 作为 id，C 使用 2-2 作为 id：

```
function B() {
  // id为"2-1"
  const id = useId();
  return <div id={id}>B</div>;
}
```

如何在一个组件中使用多个 useId()?

react 推荐使用相同的 id+ 后缀：

```
function NameFields() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id + '-firstName'}>First Name</label>
      <div>
        <input id={id + '-firstName'} type="text" />
      </div>
      <label htmlFor={id + '-lastName'}>Last Name</label>
      <div>
        <input id={id + '-lastName'} type="text" />
      </div>
    </div>
  );
}
```
