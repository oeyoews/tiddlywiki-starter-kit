---
title: 'setState异步、同步与进阶_-_掘金'
tags: ['剪藏']
type: 'text/markdown'
cn: 'setState异步、同步与进阶_-_掘金-cn'
created: 'Tue Dec 05 2023 15:01:35 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://juejin.cn/post/6844903715921477640'
---

# setState异步、同步与进阶_-_掘金

### 如何使用 setState

在 React 日常的使用中，一个很重要的点就是，不要直接去修改 state。例如：`this.state.count = 1`是无法触发 React 去更新视图的。因为 React 的机制规定，一个 state 的更新，首先需要调用 setState 方法。

```
this.setState({
    count: 1
})
```

这样便能触发重新渲染。稍有经验的开发者会知道，setState 方法其实是“异步”的。即立马执行之后，是无法直接获取到最新的 state 的，需要经过 React 对 state 的所有改变进行合并处理之后，才会去计算新的虚拟 dom，再根据最新的虚拟 dom 去重新渲染真实 dom。

```
class App extends Component {
	state = {
        count: 0
	}

    componentDidMount(){
        this.setState({count: this.state.count + 1})
        console.log(this.state.count) // 0
    }

    render(){
        ...
    }
}
```

[demo 请点击](https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Fxpk8qqx9pz%3Fexpanddevtools%3D1)

那怎么才能获取到修改后的 state 呢？React 为我们提供了一个回调去实现。

```
...
this.setState({count: this.state.count + 1}, ()=>{
    console.log(this.state.count) // 1
})
...
```

回调里的 state 便是最新的了，原因是该回调的执行时机在于 state 合并处理之后。如果我们这样去做：

```
...
	this.setState({count: this.state.count + 1})
	this.setState({count: this.state.count + 1})
...
```

实际最终的 count 会等于 1，原因是执行时得到的 `this.state.count = 0`。那怎么实现结果为 2 呢？

```
...
this.setState(prevState => {count: prevState.count + 1});
this.setState(prevState => {count: prevState.count + 1});
...
```

`setState()`实际上可以接受一个函数作为参数，函数的首个参数就是上一次的 state。

以上介绍了`setState`的三种使用方式，下面我们来看看它们的执行时机是怎样的：

```
...
	this.setState({ count: this.state.count + 1 });
    console.log("console: " + this.state.count); // 0
    this.setState({ count: this.state.count + 1 }, () => {
      console.log("console from callback: " + this.state.count); // 2
    });
    this.setState(prevState => {
      console.log("console from func: " + prevState.count); // 1
      return {
        count: prevState.count + 1
      };
    }, ()=>{
      console.log('last console: '+ this.state.count)
    });
...
```

执行结果：

```
console: 0 
console from func: 1 
console from callback: 2
last console: 2
```

React 其实会维护着一个 state 的更新队列，每次调用 setState 都会先把当前修改的 state 推进这个队列，在最后，React 会对这个队列进行合并处理，然后去执行回调。根据最终的合并结果再去走下面的流程（更新虚拟 dom，触发渲染）。

### setState 为什么要设计成异步的

因为`setState()`之后无法立马获取最新的 state，给人的感觉便是异步去设置状态。也确实是有异步的感觉（实 际原理后面讲诉）。那么为什么 React 要把状态的更新设计成这种方式呢？直接 `this.state.count = 1 `不好吗？

有兴趣的可以点击看看：[github.com/facebook/re…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact%2Fissues%2F11527%23issuecomment-360199710)

这边简单总结下：

* 保证内部的一致性：即使`state`是同步更新，`props`也不是。（你只有在父组件重新渲染时才能知道`props`）

* 将`state`的更新延缓到最后批量合并再去渲染对于应用的性能优化是有极大好处的，如果每次的状态改变都去重新渲染真实 dom，那么它将带来巨大的性能消耗。

### setState 真的是异步吗

我们先来看一段代码，执行前建议大家先预估下结果：

[demo 请点击](https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Fk2jwvz03m3%3Fexpanddevtools%3D1)

```
class App extends Component {
  state = {
    count: 0
  };

  componentDidMount() {
    // 生命周期中调用
    this.setState({ count: this.state.count + 1 });
    console.log("lifecycle: " + this.state.count);
    setTimeout(() => {
      // setTimeout中调用
      this.setState({ count: this.state.count + 1 });
      console.log("setTimeout: " + this.state.count);
    }, 0);
    document.getElementById("div2").addEventListener("click", this.increment2);
  }

  increment = () => {
    // 合成事件中调用
    this.setState({ count: this.state.count + 1 });
    console.log("react event: " + this.state.count);
  };

  increment2 = () => {
    // 原生事件中调用
    this.setState({ count: this.state.count + 1 });
    console.log("dom event: " + this.state.count);
  };

  render() {
    return (
      <div className="App">
        <h2>couont: {this.state.count}</h2>
        <div id="div1" onClick={this.increment}>
          click me and count+1
        </div>
        <div id="div2">click me and count+1</div>
      </div>
    );
  }
}
```

探讨前，我们先简单了解下 react 的事件机制：react 为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，像在`jsx`中常见的`onClick`、`onChange`这些都是合成事件。

那么以上 4 种方式调用`setState()`，后面紧接着去取最新的 state，按之前讲的异步原理，应该是取不到的。然而，`setTimeout`中调用以及原生事件中调用的话，是可以立马获取到最新的 state 的。根本原因在于，setState 并不是真正意义上的异步操作，它只是模拟了异步的行为。React 中会去维护一个标识（`isBatchingUpdates`），判断是直接更新还是先暂存 state 进队列。`setTimeout`以及原生事件都会直接去更新 state，因此可以立即得到最新 state。而合成事件和 React 生命周期函数中，是受 React 控制的，其会将`isBatchingUpdates`设置为 `true`，从而走的是类似异步的那一套。

### 总结

此处总结是直接引用了：[juejin.cn/post/684490…](https://juejin.cn/post/6844903636749778958#heading-7)

1. `setState` 只在合成事件和钩子函数中是“异步”的，在原生事件和 `setTimeout` 中都是同步的。

1. `setState`的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。

1. `setState` 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 `setState` ， `setState` 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 `setState` 多个不同的值，在更新时会对其进行合并批量更新。

**参考：**

* [你真的理解 setState 吗？](https://juejin.cn/post/6844903636749778958#comment)

* [浅出深入 setState（上）](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000015615057)

* [浅出深入 setState（下）](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000015821018)

坦白说，自己的水平还是挺有限的，还需要努力努力再努力。只有懂了很多，才能写出有意义的东西吧。现在写的，大多都是根据别人的文章，自己理解了之后，换成自己的语言再表达一遍而已。。

慢慢来，总有一天可以突破这个界限的，真正写出属于自己的东西。

另外，真心感谢这些文章的作者给予的帮助。
