---
title: 'React18的useEffect会执行两次-腾讯云开发者社区-腾讯云'
tags: ['剪藏']
type: 'text/markdown'
created: 'Tue Nov 28 2023 07:24:21 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://cloud.tencent.com/developer/article/2110645'
---

# React18的useEffect会执行两次-腾讯云开发者社区-腾讯云

### 一、执行两次的 useEffect。

前段时间在本地启了一个 React Demo 项目，在编码的过程中遇到一个很奇怪的“Bug”。其中简化版的代码如下所示。

```
// 入口文件
import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```
// 组件代码
import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    console.log('组件挂载完成！');
  }, []);
  return <>Hello world!</>;
};
```

我是万万没想到，就这样几行简单的代码竟然会触发一个“Bug”。

此“Bug”的表现为：

```
在 Chrome 控制台里发现 “Hello world!” 被打印了 “两次”。
```

刷新之后依然如此，当时就给我整懵了，第一感觉就是，这怎么可能？很是纠结一番之后依然没想明白，于是试着去网上搜了一下，发现竟然有人同样遇到过这个问题。

通过网上指引，同时去官网查了一下，终于得出答案。

```
这不是 Bug，这是 React18 新加的特性。
```

### 二、React18 useEffect 新特性

```
1.这是 React18 才新增的特性。
2.仅在开发模式("development")下，且使用了严格模式("Strict Mode")下会触发。
  生产环境("production")模式下和原来一样，仅执行一次。
3.之所以执行两次，是为了模拟立即卸载组件和重新挂载组件。
  为了帮助开发者提前发现重复挂载造成的 Bug 的代码。 
  同时，也是为了以后 React的新功能做铺垫。 
  未来会给 React 增加一个特性，允许 React 在保留状态的同时，能够做到仅仅对UI部分的添加和删除。
  让开发者能够提前习惯和适应，做到组件的卸载和重新挂载之后， 重复执行 useEffect的时候不会影响应用正常运行。
```

### 三、如何应对

看过文档以及了解他们这么做的本意之后，我也能够理解他们会这样做了。只是，对于这种半强迫式操作多少有些不喜欢，感觉是在代码中”被强迫打一针疫苗？”。

当然，人家就是这么干了，作为 React 的普通使用者，能做的就是 **适应它** ，并按照它的规范来做。

<h5>1.首先先了解一下 React 中 useEffect 执行的时机</h5>
```
Every time your component renders, React will update the screen and then run the
code inside useEffect.
```

每次组件渲染时，React 都会更新页面 UI，然后运行 useEffect 中的代码。

```
Effects run at the end of the rendering process after the screen updates
```

Effect 在屏幕更新之后的 rendering 进程结束的时候执行。

从上面可以得出结论，React 中的 useEffect 执行时机是在组件渲染之后（类似于 window(component).onload？）。因此，对于某些“副作用”的渲染，比如异步接口请求，事件绑定等操作我们通常都放在 useEffect 中执行。

当然，useEffect 除了在组件渲染的时候执行外，在组件卸载的时候也有**相关**执行操作。在组件卸载的时候会执行 useEffect 方法的`return`语句。

```
useEffect(() => {
  window.a = 100;
  return (window.a = 0);
}, []);
```

如上代码段，当组件渲染的时候会执行`window.a = 100`，当组件卸载的时候会执行`window.a = 0`。

知道了 useEffect 的执行时机，也就能明白为什么 React18 中 useEffect 会执行两次了。

```
因为， React18 在开发环境中除了必要的挂载之外，还 "额外"模拟执行了一次组件的卸载和挂载。
```

既然知道了原因，那么，接下来就是想办法解决了。

<h5>2.怎么样才能让 Effect 执行一次？。</h5>
对于这个问题，官方文档上面有一句原话：

```
The right question isn’t “how to run an Effect once,” but “how to fix my Effect
so that it works after remounting”.
```

翻译一下，就是说：

```
正确的问题不是“怎么样让 Effect 执行一次”，而是“怎样修复我的 Effect，让它在(重复)挂载之后正常工作”
```

也可以理解，毕竟在 React 的未来版本中做**离屏渲染**的时候 useEffect 肯定会多次执行的。而且，即使是当前版本，在做页面的前进后退也会面临触发多次 `useEffect`。

所以，解决办法其实就是解决 **重复挂载卸载之后** 应用正常工作了。

<h5>3.具体的解决方法</h5>
我们知道 useEffect 支持返回一个函数，在组件卸载的时候就会执行该函数。因此，通常正确解法就是 **实现清理函数**，并将其在 useEffect 中返回。当然，不同的 Effect 需要有不同的清理方式。

在常用 Effect 分类下，大致有如下几类清理。

**1）清理事件监听**

```
useEffect(() => {
  function handleScroll(e) {
    console.log(e.clientX, e.clientY);
  }
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

对于事件监听类函数，在返回函数内部“取消掉事件监听”即可。

**2-1）重置页面数据，清理属性状态**

```
useEffect(() => {
  const node = ref.current;
  node.style.opacity = 1; // Trigger the animation
  return () => {
    node.style.opacity = 0; // Reset to the initial value
  };
}, []);
```

对于一些页面属性的变更，在返回函数内部将其变更的属性进行还原。

**2-2）重置页面数据，还原元素状态**

```
import { useEffect, useRef } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}
```

涉及到元素状态的，比如播放器之类，需要对（元素）播放器的状态进行重置。

**2-3）重置页面数据，弹窗类。**

```
useEffect(() => {
  const dialog = dialogRef.current;
  dialog.showModal();
  return () => dialog.close();
}, []);
```

如果是默认弹窗类，这种也算是元素状态，同样需要对其（弹出）状态进行重置。

**3-1）异步请求页面数据处理，处理异步数据渲染**

```
useEffect(() => {
  let ignore = false;
  async function startFetching() {
    const json = await fetchTodos(userId);
    // 这里执行是异步的，所以第一次执行到此处的时候组件已经被卸载了
    // 此时的 ignore 已经被 return 里面的方法置为 true 了
    // 所以这里第一次执行的时候不执行 setTodos(json)
    // setTodos 其实是在第二次执行的时候才触发
    if (!ignore) {
      setTodos(json);
    }
  }
  startFetching();

  return () => {
    ignore = true;
  };
}, [userId]);
```

如上代码，对于异步请求数据并渲染这一类。我们可以设置一个 **标识位**，做到对 **请求返回的数据** 仅做一次处理与渲染`setTodos(json)`。 [codesandbox 测试代码段](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Freact18-useeffect-render-twice-nmf5rs)

**3-2）异步请求页面数据处理，处理接口请求** 上面的方法虽然仅会渲染一次，但是请求依然发起了多次。如果不希望请求多次，也可以使用请求接口数据的缓存方案，对返回数据进行缓存。

```
const cache = useRef(null);
useEffect(() => {
  let ignore = false;
  async function startFetching() {
    if (!cache.current) {
      cache.current = await fetchTodos(userId);
    }
    if (!ignore) {
      setTodos(cache.current);
    }
  }
  startFetching();

  return () => {
    ignore = true;
  };
}, [userId]);
```

对于异步请求，除了可以处理渲染频率，还可以对接口的请求本身做缓存。在前面**3-1**的基础上，缓存接口返回的数据，下次请求的时候如果已经有缓存数据了就直接用，无须再次发起请求。

**4）无须清理类** 并不是所有的 useEffect 函数都需要清理，对于一些没有副作用的函数，我们完全可以不做处理

```
useEffect(() => {
  const map = mapRef.current;
  map.setZoomLevel(zoomLevel);
}, [zoomLevel]);
```

如上代码所示，setZoomLevel 方法仅仅是设置一下 Dom 元素的层级。这种操作无论同时执行多少次都不会有太大的影响，所以对于这一类我们就随他去吧，毕竟线上也不会执行多次。

**5）日志 log 上报类**

```
useEffect(() => {
  reportLog({ name: 'viewCount' });
}, []);
```

对于日志上报类，其实也可以算是无须清理类，但是又有点特殊。因为，对于日志类，首先在开发环境中我们其实是无须进行上报的，毕竟这种日志打上去也没啥用。当然，如果是要对**上报日志本身**这个进行调试等必须上报的情形，这种也有三种应对方式：

```
方式一，在本地开发环境使用 console.log 来代替 reportLog。
方式二，取消掉严格模式（StrictMode） 方式三，构建一个 production
版本启动，或者将其部署到 QA 环境，部署的时候，指定 production 模式。
```

以上就是常见的几类解决 useEffect 多次挂载和卸载所导致副作用的方法。实际开发过程中肯定不止如上几类，只不过原理都是一样的，我们的最终目标都一致，那就是想办法消除 useEffect 执行之后的副作用，只要本着这一个目标去做，任何合理方式都是可行的。

### 四、总结

对于 React18 这种操作确实有点膈应。但是正如前面所解释的那样，对于未来的**离屏渲染**或者当前**其它会导致重复挂载取消**的操作，如果开发者没处理好确实很可能出现 bug。因此，深入了解一下 useEffect 执行机制以及解决其副作用的方式还是有必要的。

### 相关链接

[useEffect 执行两次官方英文文档](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fbeta.reactjs.org%2Flearn%2Fsynchronizing-with-effects%23how-to-handle-the-effect-firing-twice-in-development)

本文参与 [腾讯云自媒体分享计划](https://cloud.tencent.com/developer/support-plan)，分享自作者个人站点/博客。

原始发表：2022-08-30，如有侵权请联系 [cloudcommunity@tencent.com](mailto:cloudcommunity@tencent.com) 删除
