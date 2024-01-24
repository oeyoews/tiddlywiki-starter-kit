---
title: 'react-hook-tutorial_附01：React基础知识.md_at_master_·_puxiao_react-hook-tutorial'
tags: ['剪藏']
type: 'text/markdown'
created: 'Wed Dec 06 2023 07:10:32 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://github.com/puxiao/react-hook-tutorial/blob/master/%E9%99%8401%EF%BC%9AReact%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.md'
---

# react-hook-tutorial_附01：React基础知识.md_at_master_·_puxiao_react-hook-tutorial

说明：以下这些基础知识适用于类组件和函数组件，并不是函数组件独有的。

## 安装 react 并初始化

<h5>1、安装：npm install -g create-react-app</h5>
<h5>2、创建 hello-react 目录并初始化：npx create-react-app hello-react</h5>
注意：

1. 目录名不允许有大写字母

1. 初始化过程比较慢，甚至可能需要 5-10 分钟

1. 如果报错：npm ERR! Unexpected end of JSON input while parsing near ‘…n\r\nwsFcBAEBCAAQBQJd’，解决方法：npm root -g 找到本机 npm 全局安装目录，cd 进入该目录，执行清除缓存：npm cache clean --force，然后再次初始化。

<h5>3、启动项目：cd hello-react、npm start</h5>
默认将启动：[http://localhost:3000](http://localhost:3000/)

## 自定义组件基础知识

1、自定义组件必须以大写字母开头、默认网页原生标签还以小写开头。请注意这里表述的"默认网页原生标签"本质上并不是真实的原生网页标签，他们是 react 默认定义好的、内置的自定义组件标签，只不过这些标签刚好和原生标签的作用，功能，名称一模一样而已。

2、自定义组件如果不希望设定最外层的标签，那么可以使用 react(16+ 版本) 提供的占位符 Fragment 来充当最外层标签；

```
import React,{Component,Fragment} from 'react';  
类组件：render(){return <Fragment>xxxxxxx</Fragment>}  
函数组件：return <Fragment>xxxxxxx</Fragment>
```

在最新的 react 版本中，也可以直接使用<></>来代替 Fragment。其中<>唯一可以拥有的属性为 key。即< key=‘xxx’></>

3、使用数组 map 循环更新 li，一定要给 li 添加对应的 key 值，否则虽然正常运行，但是会报错误警告。不建议直接使用 index 作为 key 值。

4、在最新的 react 版本中，为了提高更新性能，推荐采用异步的方式更新数据。具体使用方式为：setXxx((prevData) => {return xxx})。其中参数 prevData 指之前的变量值，return 的对象指修改之后的数据值。

可以将上面代码简写为：setXxx(prevData => xxx) 若没有用到 prevData 参数，还可以省略，即 setXxx(() => xxx);

异步的目的是为了优化更新性能，react 短期内发现多条数据变量发生修改，那么他会将所有修改合并成一次修改再最终执行。

5、在 JSX 中写注释，格式为：{/* xxxxx */}或{//xxxx}，注意如果使用单行注释，最外的大括号必须单独占一行。注释尽在开发源代码中显示，在导出的网页中不会有该注释。

6、给标签添加样式时，推荐使用 className，不推荐使用 class。如果使用 class 虽然运行没问题，但是会报错误警告，因为样式 class 这个关键词和 js 中声明类的 class 冲突。类似的还有标签中 for 关键词，推荐改为 htmlFor。

7、通常情况下，react 是针对组件开发，并且只负责对 html 中某一个 div 进行渲染，那么意味着该 html 其他标签不受影响，这样引申出来一个结果：一个 html 既可以使用 react，也可以使用 vue，两者可以并存。

8、为了方便调试代码，可以在谷歌浏览器中安装 React Developer Tools 插件。安装后可在谷歌浏览器调试模式下，查看 component 标签下的内容。若访问本机 react 调试网页则该插件图标为红色、若访问导出版本的 React 网页则该插线显示为蓝色、若访问的网页没使用 react 框架则为灰色。

9、给组件设定属性，只有属性名没有属性值，那么默认 react 会将该属性值设置为 true。在 ES6 中如果只有一个属性对象没有属性值，通常理解为该属性名和属性值是相同的。为了避免混淆，不建议不给属性不设置属性值。

10、ReactDOM.createPortal() 用来将元素渲染到任意 DOM 元素中 (包括顶级组件之外的其他 DOM 中)。

## “纯函数” 概念解释

JS 中定义的所有函数都可以增加参数，所谓"纯函数"是指函数内部并未修改过该参数的函数。

例如以下函数：function myFun(a){let c=a }，该函数内部从未更改过参数 a，那么这个函数就是纯函数。

反例，非纯函数 例如：function myFun(a){a=a+2; let c=a}，该函数内部修改过参数 a，那么这个函数就不再是纯函数了。

纯函数的特殊意义是什么？\

因为纯函数内部从不会直接修改参数，那么无论运行多少次，执行结果永远是一致的。

若仅仅有一个函数，那么也无所谓，但是如果有多个函数都是都需要调用执行同一个变量 (参数)，为了确保多个函数执行结果是符合预期的，那么就要求每个函数都不能在自己内部修改该变量 (参数)。

这就是为什么 react 不允许直接修改某变量的原因。

## “受控组件” 概念解释

像 input、select、textarea、form 等将自身 value 与某变量进行绑定的组件，称之为受控组件。

"受控"即这些组件的可以值受到某变量的控制。

与之对应的是"非受控组件"，即该组件对应的值并不能被某变量控制。

例如"<input type=‘file’/>“，该组件的值为用户选中本地的文件信息，该值并不能直接通过某变量来进行 value 值的设定，因此该组件属于"非受控组件”。

## “声明式开发” 概念解释

“声明式开发”：基于数据定义和数据改变，视图层自动更新。\

“命令式开发”：基于具体执行命令更改视图，例如 DOM 操作修改。

注意：声明式开发并不是不进行 DOM 操作，而是把 DOM 操作频率降到最低。

## “单项数据流” 概念解释

react 框架的原则中规定，子组件只可以使用父组件传递过来的 xxx 属性对应的值或方法，不可以改变。

数据只能单向发生传递 (父传向子，不允许子直接修改父)，若子组件想修改父组件中的数据，只能通过父组件暴露给子组件的函数 (方法) 来间接修改。

react 框架具体实现方式是设置父组件传递给子组件的"数据值或方法"仅仅为可读，但不可修改。

为什么要做这样的限制？\

因为一个父组件可以有多个子组件，如果每个子组件都可修改父组件中的数据 (子组件之间彼此共用父组件的数据)，一个子组件的数据修改会造成其他子组件数据更改，最终会让整个组件数据变得非常复杂。

为了简化数据操作复杂程度，因此采用单向数据流策略，保证父组件数据的唯一最终可修改权归父组件所有。

## “视图层渲染框架” 概念解释

react 框架自身定位是"视图层渲染框架"，单向数据流概念很好，但是实际项目中页面会很复杂。

例如顶级组件 Root 中分别使用了组件 A(由子组件 A0、A1、A2 构成)、组件 B(由子组件 A0、A1、A2 构成)、组件 C(由子组件 C0、C1、C2 构成)，若此时组件 A 的子组件 A2 想和组件 C 的子组件 C1 进行数据交互，那么按照单向数据流的规范，数据操作流程为 A2 -> A -> Root -> C - C1，可以看出操作流程非常复杂。

所以实际开发中，React 框架也许会结合其他"数据层框架"(例如 Redux、Flux 等)，但是请注意，只从有了 hook 以后，可以通过 useReducer+useContext 来实现类似 Redux 的功能。

## “函数式编程” 概念解释

react 自定义组件的各种交互都在内部定义不同的函数 (js 语法规定：类 class 中定义的函数不需要在前面写 function 关键词)，因此成为函数式编程。不像原生 JS 和 html 交互那样，更多侧重 html 标签、DOM 操作来实现视图和交互。

函数式编程的几点好处：\

1、可以把复杂功能的处理函数拆分成多个细小的函数。\

2、由于都是通过函数来进行视图层渲染和数据交互，更加方便编写"前端自动化测试"代码。

## “虚拟 DOM” 概念解释

虚拟 DOM(Virtual Dom) 就是一个 JS 对象 (数组对象)，用来描述真实 DOM。相对通过 html 标签创建的真实 DOM，虚拟 DOM 是保存在客户端内存里的一份 JS 表述 DOM 的数组对象。

用最简单的一个 div 标签来示意两者的差异，数据格式如下：

```
//真实DOM数据格式(网页标签)
<div id='mydiv'>hell react</div>

//虚拟DOM数据格式(JS数组对象)
//虚拟DOM数组对象格式为：标签名+属性集合+值
['div',{id:'mydiv'},'hell react']

//在JSX的创建模板代码中，通常代码格式为
render(){return <div id='mydiv'>hello react</>}

//还可以使用react提供的，更加底层的方法来实现
render(){return React.createElement('div',{id:'mydiv'},'hello react')}
```

虚拟 DOM 更新性能快的原因并不是因为在内存中 (理论上任何软件都是运行在内存中)，而是因为虚拟 DOM 储存的数据格式为 JS 对象，用 JS 来操作 (生成/查询/对比/更新)JS 对象很容易。用 JS 操作 (生成/查询/对比/更新) 真实 DOM 则需要调用 Web Action 层的 API，性能相对就慢。

react 运行 (更新) 步骤，大致为：\

1、定义组件数据变量\

2、定义组件模板 JSX\

3、数据与模板结合，生成一份虚拟 DOM\

4、将虚拟 DOM 转化为真实 DOM\

5、将得到的真实 DOM 挂载到 html 中 (通过真实 DOM 操作)，用来显示\

6、监听变量发生改变，若有改变重新执行第 3 步 (数据与模板结合，生成另外一份新的虚拟 DOM)\

7、在内存中对比前后两份虚拟 DOM，找出差异部分 (diff 算法)\

8、将差异部分转化为真实的 DOM\

8、将差异化的真实 DOM，通过真实 DOM 操作进行更新

当变量发生更改时，虚拟 DOM 减少了真实 DOM 的创建和对比次数 (通过虚拟 DOM 而非真实 DOM)，从而提高了性能。

## “Diff 算法” 概念解释

当变量发生改变时，需要重新生成新的虚拟 DOM，并且对旧的虚拟 DOM 进行差异化比对。\

Diff 算法就是这个差异化比对的算法。

Diff 算法为了提高性能，优化算法，通常原则为：

<h5>同层 (同级) 虚拟 DOM 比对</h5>
先从两个虚拟 DOM(JS 对象) 同层 (即顶层) 开始比对，如果发现同层就不一致，那么就直接放弃下一层 (级别) 的对比，采用最新的虚拟 DOM。

疑问点：假如两心虚拟 DOM 顶层不一致，但下一级别以及后面的更多级别都一致，如果仅仅因为顶层不一致而就该放弃下一级别，重新操作真实 DOM 从头渲染，岂不是性能浪费？

答：同层 (同级) 虚拟 DOM 比对，"比对"算法相对简单，比对速度快。如果采用多层 (多级) 比对，“比对"算法会相对复杂，比对速度慢。同层虚拟 DOM 比对就是利用了比对速度快的优势来抵消"操作真实 DOM 操作性能上的浪费”。

<h5>列表元素使用 key 值进行比对</h5>
这里的 key 值是值"稳定的 key 值 (是有规律的字符串，非数字)"，若 key 值为索引数字 index，那么顺序发生改变时，索引数字也会发生变化，无法判断之前的和现在的是否是同一个对象。

如果 key 值是稳定的，那么在比对的时候，比较容易比对出是否发生变化，以及具体的变化是什么。

Diff 算法还有非常多的其他性能优化算法，以上列出的"同层比对、key 值比对"仅仅为算法举例。

## “高阶组件” 概念解释

高阶组件是一种组件设计方式 (设计模式)，就是将一个组件作为参数传递给一个函数，该函数接收参数 (组件) 后进行处理和装饰，并返回出一个新的组件。

简单来说就是，普通组件是根据参数 (props) 生成一个 UI(JSX 语法支持的标签)。而高阶组件是根据参数 (组件) 生成一个新的组件。

## “生命周期函数” 概念解释

生命周期函数指在某一时刻组件会自动调用执行的函数。

这里的"某一时刻"可以是指组件初始化、挂载到虚拟 DOM、数据更改引发的更新 (重新渲染)、从虚拟 DOM 卸载这 4 个阶段。

#### 生命周期 4 个阶段和该阶段内的生命周期函数：

<h5>初始化 (Initialization)</h5>
constructor() 是 JS 中原生类的构造函数，理论上他不专属于组件的初始化，但是如果把它归类成组件组初始化也是可以接受的。

<h5>挂载 (Mounting)</h5>
componentWillMount(即将被挂载)、render(挂载)、componentDidMount(挂载完成)

<h5>更新 (Updation)：</h5>
props 发生变化后对应的更新过程：componentWillReceiveProps(父组件发生数据更改，父组件的 render 重新被执行，子组件预测到可能会发生替换新数据)、shouldComponentUpdate(询问是否应该更新？返回 true 则更新、返回 flash 则不更新)、componentWillUpate(准备要开始更新)、render(更新)、componentDidUpdate(更新完成)

变量数据发生变化后对应的更新过程：shouldComponentUpdate(询问是否应该更新？返回 true 则更新、返回 flash 则不更新)、conponentWillUpdate(准备要开始更新)、、render(更新)、componentDidUpdate(更新完成)

props 和 states 发生变化后的更新过程，唯一差异是 props 多了一个 componentWillReceiveProps 生命周期函数。

componentWillReceiveProps 触发的条件是：\

1、一个组件要从父组件接收参数，并且已存在父组件中 (子组件第一次被创建时是不会执行 componentWillReceiveProps 的)\

2、只要父组件的 render 函数重新被执行 (父组件发生数据更改，子组件预测到可能会发生替换新数据)，componentWillReceiveProps 就会被触发

<h5>捕获子组件错误：</h5>
componentDidCatch(捕获到子组件错误时被触发)

<h5>卸载 (Unmounting)：</h5>
componentWillUnmount(即将被卸载)

备注：类组件继承自 Component 组件，Component 组件内置了除 render() 以外的所有生命周期函数。因此自定义组件 render() 这个生命周期函数必须存在，其他的生命周期函数都可以忽略不写。而使用了 hook 的函数组件，简化了生命周期函数调用的复杂程度。

<h5>生命周期函数的几个应用场景：</h5>
对于类组件 (由 class 创建的) 和函数组件 (由 function 创建的)，他们对于生命周期的调用方法不同。

1、只需要第一次获取数据的 Ajax 请求\

如果类组件有 ajax 请求 (只需请求一次)，那么最好把 ajax 请求写在 componentDidMount 中 (只执行一次)。因为"初始化、挂载、卸载"在一个组件的整个生命周期中只会发生一次，而"更新"可以在生命周期中多次执行。\

如果是函数组件，则可以写在 useEffect() 中，并且将第 2 个参数设置为空数组，这样 useEffect 只会执行一次。

2、防止子组件不必要的重新渲染\

如果是类组件，父组件发生变量改变，那么会调用 render()，会重新渲染所有子组件。但是如果变量改变的某个值与某子组件并不相关，如果此时也重新渲染该子组件会造成性能上的浪费。为了解决这个情况，可以在子组件中的 shouldComponentUpdate 生命周期函数中，做以下操作：

```
shouldComponentUpdate(nextProps,nextStates){
  //判断xxx值是否相同，如果相同则不进行重新渲染
  return (nextProps.xxx !== this.props.xxx); //注意是 !== 而不是 !=
}
```

还可以让组件继承由 React.Component 改为 React.PureComponent，react 会自动帮我们在 shouldComponentUpdate 生命周期函数中做浅对比。

如果是函数组件，则在子组件导出时，使用 React.memo() 进行包裹，同时结合 useCallback 来阻止无谓的渲染，实现提高性能。

## React 中设置样式的几种形式

<h5>第一种：引用外部 css 样式</h5>
伪代码示例：\

import from ‘./xxx.css’;\

return <div className=‘xxx’ />

注意：在 jsx 语法中，使用驼峰命名。例如原生 html 中的 classname 需要改成 className、background-color 要改成 backgroundColor。

<h5>第二种：内部样式</h5>
伪代码示例：\

return <div style= />

注意：内联样式值为一个对象，对象属性之间用",“分割而不是原生 html 中的”;"。\

因为是一个对象，因此下面代码也是可行的：\

const mystyle = {backgroundColor:‘green’,width:‘100px’}; return <div style={mystyle} />

## Hook 用法

Hook 是 react16.8 以上版本才出现的新特性，可以在函数组件中使用组件生命周期函数，且颗粒度更加细致。

可以把 Hook 逻辑从组件中抽离出来，多个组件可以共享该 hook 逻辑。

**请注意 hook 本质上是为了解决组件之间共享逻辑，并不是单纯为了解决组件之间共享数据。**

hook 表现出来特别像一个普通的 JS 函数 (仅仅是表现出来但绝不是真的普通 JS 函数)。
