---
title: '回望过去，展望未来-_2024_React_生态一览表-腾讯云开发者社区-腾讯云'
tags: ['剪藏']
type: 'text/markdown'
created: 'Fri Dec 01 2023 15:05:08 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://cloud.tencent.com/developer/article/2357811'
---

# 回望过去，展望未来-_2024_React_生态一览表-腾讯云开发者社区-腾讯云

> ❝实力决定下限，运气决定上限 ❞

大家好，我是**「柒八九」**。

## **前言**

`React` 最初是由 `Facebook`（`Meta`）内部开发的，然后于 `2013 年 5 月 29 日`在 `Facebook` 的 F8 开发者会议上首次公开宣布，并**「于同一天开源发布」**。不知不觉中，`React`已经开源 10 年了。

也不知道，大家是在何时接触的`React`的。我是大学（`2016年`）开始就关注`React`。当时，国内**「前后端分离技术」**都还没这么流行，(大部分公司都是`JSP`一把梭哈)。之前的`职业前端`更多的被戏称为**「切图仔」**。无非就是切切图和写样式，别笑。老前端真的会切图的。而且`PS`玩的贼溜。甚至当时有一个职业就是`CSS工程师`，他啥都不干，只负责页面样式的书写。

在我毕业后，参与了一个项目，此时命运的齿轮转动了，前端就是用`React`，后端用的是`Java`。然后，你没看错，我们当时都是`全栈开发`，前后端都是自己来弄。

现在还记得当时通过`config.js`配置简单的命令，那个时候是真的简单，我记得好像不到`10行`的代码量，然后启动了一个`Webpack Dev Server`随后进行代码开发。现在还记得当时的`React`版本还是`0.x`版本，创建一个类组件都需要`React.createClass`。

```
import React from "react";

// 定义一个名为 SomeMixin 的混合（mixin），这是一种在 React 之前用于共享代码的方式
let SomeMixin = {
  doSomething() {
    // 在混合中定义一个方法
    // 你可以在组件中使用这个混合的方法
  },
};

const App = React.createClass({
  // 使用 mixins 属性来引入 SomeMixin，以共享混合中的方法
  mixins: [SomeMixin],

  // 定义组件的属性类型（propTypes），在此为空对象，可以在此处定义属性的类型和验证
  propTypes: {},

  // 定义组件的初始状态（initial state），在此返回一个空对象
  getInitialState() {
    return {};
  },

  // 定义组件的默认属性（default props），在此返回一个空对象
  getDefaultProps() {
    return {};
  },

  // 定义一个名为 handleClick 的方法，当点击事件发生时，将在控制台中打印出组件实例（this）
  handleClick() {
    console.log(this);
  },

  // 定义组件的渲染方法，
  render() {
    return <div>前端柒八九</div>;
  },
});

export default App;
```

估计大家都没见过这种写法，不过，这都不重要，历史的车轮早已将这种写法碾压到风尘中。如果你没见证过`0.x`版本，想必你肯定接触过`15.x`版本，就是`React.Component`。

```
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  // 这里省去了一堆生命周期

  handleClick() {
    console.log(this); // React Component 实例
  }
  render() {
    return <div>前端柒八九</div>;
  }
}

export default App;
```

当然，我们读者当中还有一些，纯新手或者`蛋蛋后`的新生势力，想必对`React.Component`也很陌生，大家现在接触到的概念和推荐写法都是`Hook`的函数组件。没得关系，**「条条大路，通罗马」**，我们都是结果导向性，只要能把活干了，拿原生纯手搓照样可以。

回想过去，一个古老`React`项目拿都是老三件

* 组件库 (`Antd`)

* 状态管理 (`Redux`)

* 路由 (`React Router`)

当时，我就是照着观看了几天的这几个的官方文档，入职到京东金融。毫不夸张的说，当时你要是能说出`React`的类组件的生命周期运行顺序，`Redux`的数据流向，还有`React Router`的配置处理，就可以找到一个工作。

那是一个野蛮生长的年代也是一个充满挑战的年代。当然，**「回顾过去，是为了更好的走向未来」**。

现在，当我们再次停下脚步审视前端，会发现`Angular`已经没落，原先`Angular`/`Vue`/`React`三足鼎立的局面，现在已经变成了`Vue`/`React`两个超巨，傲视群雄。(当然，也有很多后起之秀`Svelte`等)。

同时，就单单的`React`的生态也发生的翻天覆地的变化。各种工具库层出不穷。

接下来，让我们就看看如果要开发一个功能完备的`React`项目，可能会遇到哪些技术。

![](https://developer.qcloudimg.com/http-save/yehe-9016259/fba59242c014c5f9aa77dc09f7d63b01.png)

![](https://developer.qcloudimg.com/http-save/yehe-9016259/228525ebcebc688fe82027596bac75f3.png)

上面两个图，是本篇文章中可能会涉及到的技术的官网。

通过对一些技术的讲解，我们还可以展望一下未来，在`2024`年，我们在开发一个新的`React`项目，可能会遇到哪些技术点。

好了，天不早了，干点正事哇。

![](https://developer.qcloudimg.com/http-save/yehe-9016259/4874d39636aa01ba521989fbcc46592d.gif)

#### **我们能所学到的知识点**

> ❝

1. 前置知识点

1. 路由

1. 客户端状态管理

1. 客户端状态管理

1. 表单处理

1. 测试

1. 样式

1. UI 组件库

1. 动画

1. [数据可视化](https://cloud.tencent.com/product/yuntu?from_column=20065&from=20065)

1. 表格

1. 国际化（i18n）

1. 开发工具

1. 拖拽

1. 文件上传

❞

---

## **1. 前置知识点**

> ❝**「前置知识点」**，只是做一个概念的介绍，不会做深度解释。因为，这些概念在下面文章中会有出现，为了让行文更加的顺畅，所以将本该在文内的概念解释放到前面来。**「如果大家对这些概念熟悉，可以直接忽略」** 同时，由于阅读我文章的群体有很多，所以有些知识点可能**「我视之若珍宝，尔视只如草芥，弃之如敝履」**。以下知识点，请**「酌情使用」**。 ❞

### **无头 UI**

`无头 UI`（`Headless UI`）是指提供 UI 元素和交互逻辑、状态、处理和 API 的库和工具，但不提供标记（`markup`）、样式或预先构建的实现。这个概念的名称**「无头」**来源于它剥离了传统的用户界面的外观（头部）部分，**「只关注提供操作和逻辑」**。

> ❝无头组件是一种通过不提供界面来提供最大视觉灵活性的组件 ❞

假设现在有一个要求，要实现一个抛硬币的功能，当在`A页面`渲染时执行一些逻辑以模拟硬币的翻转！有一半的时间组件应该渲染为`正面`，另一半的时间应该渲染为`反面`。

同时，这个组件在原有功能的基础上，还会被其他页面 (`B`) 调用，通过传人`showLabels`字段来显示`正面`和`反面`的字样，并且还有通过传人`showButton`来控制是否显示`Button`并用于触发硬币翻转。

也就是在原有页面 A 中，我们是不传入`showLabels`,结果就是页面不会显示`正面`和`反面`的字样，但是在页面 B 中，我们传入了`showLabels`字段，会显示对应的字样。

同理，在页面 A 中也不会传人`showButton`,而在`B`页面中传人`showButton`为`true`。表示要这个功能点。

如果按照我们以往的操作处理的话，我们会写出如下的组件：

```
import React, { useState, useEffect } from "react";

const CoinFlip = ({
    showLabels: false,// 为B页面新增的参数
    showButton:false, // 为B页面新增的参数
}) => {
  const [flipResults, setFlipResults] = useState(Math.random());

  const handleClick = () => {
    setFlipResults(Math.random());
  };

  return (
    <>
        {showButton&&
            <button onClick={handleClick}>重新翻转</button>
        }
        {flipResults < 0.5 ? (
            <div>
                <img src="/heads.svg" alt="正面" />
                {showLabels && <span>正面</span>}
            </div>
        ) : (
            <div>
                <img src="/tails.svg" alt="反面" />
                {showLabels && <span>反面</span>}
            </div>
        )}
    </>
  );
};

export default CoinFlip;
```

其实，上面的案例在我们平时开发中是显而易见的，在`A组件`的基础上，要新增部分功能需求，就需要使用`三元运算`或者`if`判断将页面的显示逻辑，变的支离破碎。

此时，让我们讲上面的组件换一种实现方式 –**「无头组件」**。

```
import React, { useState } from "react";

const CoinFlip = ({ children }) => {
  const [flipResults, setFlipResults] = useState(Math.random());

  const handleClick = () => {
    setFlipResults(Math.random());
  };

  return children({
    callback:handleClick
    flipResults,
  });
};

export default CoinFlip;
```

其中`CoinFlip`的核心点都没变化，`flipResults/handleClick`都在。只是构建页面的逻辑变了，变成了用`children`来接。

`CoinFlip`的调用。

在`A`页面时候，`CoinFlip`的`children`代码中只接受`flipResults`。

```
<CoinFlip>
  {({ flipResults }) => (
    <>
      {flipResults < 0.5 ? (
        <div>
          <img src="/heads.svg" alt="正面" />
        </div>
      ) : (
        <div>
          <img src="/tails.svg" alt="反面" />
        </div>
      )}
    </>
  )}
</CoinFlip>
```

在`B页面`，我们可以直接按照我们想要显示的页面结构来搭建页面。而不需要考虑 (`showLabels/showButton`)

```
<CoinFlip>
  {({ callback, flipResults }) => (
    <>
      <button onClick={callback}>重新翻转</button>
      {flipResults < 0.5 ? (
        <div>
          <img src="/heads.svg" alt="正面" />
          <span>正面</span>
        </div>
      ) : (
        <div>
          <img src="/tails.svg" alt="反面" />
          <span>反面</span>
        </div>
      )}
    </>
  )}
</CoinFlip>
```

通过，一个简单的案例，我们分析了一下，无头组件的使用方式。其实，还有很多用法，比如，多个无头组件的嵌套，还有传递参数等。今天我们就先讨论到这里。

---

## **2. 路由**

我们先从三大金刚之一的`Router`说起。

前端路由是指在单页面应用（`SPA`）中，通过 `JavaScript` 实现的一种页面导航方式，使用户在浏览网站时无需重新加载整个页面，而是通过切换视图来展示不同的内容。前端路由的实现通常基于浏览器的 `History API` 或 `Hash`（#）来管理 URL 和页面状态。

### **基础概念**

1. **「****路由器****（Router）：」** 前端路由的核心是路由器，它负责监听 `URL` 的变化并决定何时加载哪个组件或视图。路由器通常会维护一个路由表，将 `URL` 和对应的组件或视图进行映射。

1. **「路由表（Route Table）：」** 路由表是路由器中存储的一种数据结构，用于将 `URL` 映射到相应的组件或视图。路由表可以手动配置，也可以通过自动化工具生成。

1. **「路由视图（Route View）：」** 路由视图是指在页面中展示的特定组件或视图，它根据当前 `URL` 从路由表中选择对应的内容进行显示。当用户在应用中导航时，路由视图会动态更新以显示相应的页面。

1. **「路由参数（Route Parameters）：」** 有时，`URL` 中包含一些动态的数据，例如`文章 ID`、`用户 ID` 等。这些数据可以通过路由参数传递给相应的组件，以便在页面中显示相关的内容。

1. **「导航守卫（Navigation Guards）：」** 导航守卫是一种机制，用于在导航发生之前或之后执行一些逻辑。例如，可以在导航到某个页面前检查用户是否有权限访问该页面。常见的导航守卫有路由的`beforeEach`、`beforeResolve`和`afterEach`等。

1. **「History API 和 Hash 模式：」** 前端路由通常使用浏览器的 `History API` 或 `Hash` 来实现。`History API` 允许更友好的 `URL`，而 `Hash` 模式则通过在 `URL` 中使用`#`来避免刷新页面。例如，`/users/1`（History API）和`/#/users/1`（Hash 模式）都可以表示相同的路由。

### **解决方案**

![](https://developer.qcloudimg.com/http-save/yehe-9016259/1572fc94fc80a3a8ea503fb488e21f2e.png)

由于`Next.js`是自带的路由系统，在 npmtrends[1]中无法显现。

* React Router[2]：`React Router`仍然是处理 `React` 应用中路由的**「第一选择」**。凭借其丰富的文档和积极的社区，它继续是我们应用中声明性路由的可靠选择。

* React Query[3]：在 `2023` 年的普及基础上，`Tanstack` 的 `React Query` 将进一步增强数据获取和状态管理。它简化了在 `React` 应用中管理、缓存和同步数据的过程。

* Next.js[4]：`Next.js`，建立在 `React` 之上的框架，它作为[服务器渲染](https://cloud.tencent.com/solution/render?from_column=20065&from=20065) `React` 应用的首选选择，并提供灵活的路由选项。

---

## **3. 客户端状态管理**

客户端状态管理是指在前端应用中有效地管理和维护应用的状态（`data state`）以及用户界面的状态（`UI state`）。这种管理通常涉及到复杂的应用逻辑、数据获取、状态变更和用户交互等方面。为了更有效地处理这些问题，许多前端应用选择采用客户端状态管理来组织和管理应用的状态。

### **基础概念**

1. **「状态（State）：」** 在客户端状态管理中，`状态`是指应用的数据和用户界面的当前状态。这包括应用的各种数据（如用户信息、应用配置、[服务器](https://cloud.tencent.com/act/pro/promotion-cvm?from_column=20065&from=20065)返回的数据等）以及用户界面的展示状态（例如打开的弹窗、选中的菜单项等）。

1. **「状态****容器****（State Container）：」** `状态容器`是存储和管理应用状态的对象。在一些流行的前端框架和库中，如 `Redux`（`React`）、`Vuex`（`Vue`），都提供了状态容器的实现。这些状态容器提供了一种集中管理状态的机制，使得状态的变更和访问更加可控。

1. **「动作（Action）：」** `动作`是指对状态进行更改的指令。它描述了发生了什么事情，通常以一个包含`type`字段的纯对象的形式存在。在状态管理中，动作用于触发状态的变更。

1. **「Reducer：」** Reducer 是一个纯函数，接收当前的状态和一个动作，返回一个新的状态。Reducer 定义了状态的更新逻辑，负责处理动作并生成新的状态。

1. **「派发（Dispatch）：」** `派发`是指发出动作以触发状态的更新。通过派发动作，应用可以通知状态容器进行相应的状态变更。

1. **「订阅（Subscribe）：」** `订阅`是指通过监听状态的变更来执行一些逻辑。应用中的其他部分可以订阅状态的变更，以便在状态发生变化时执行相应的操作，例如更新用户界面。

1. **「异步操作：」** 在实际应用中，经常需要进行异步操作，例如网络请求、定时器等。状态管理工具通常提供中间件来处理异步操作，确保状态的一致性。

1. **「连接到视图层：」** 客户端状态管理通常需要与视图层（例如 React 组件、Vue 组件）进行连接，以便状态的变更能够反映在用户界面上。这通常通过提供高阶组件、组件的装饰器或者使用特定的钩子函数来实现。

### **解决方案**

![](https://developer.qcloudimg.com/http-save/yehe-9016259/a6d8ea7e6738e2b354b3c37e0a5c3eed.png)

### **1. Redux Toolkit**

Redux Toolkit[5] 是建立在 `Redux` 之上的全面状态管理库，`Redux` 是 `React` 应用程序中的状态管理库。它提供了一组工具和最佳实践，以简化以可预测和高效的方式管理状态的过程。`Redux Toolkit` 的结构化方法，包括操作、减速器和存储，非常**「适合复杂的大型项目」**。它倡导集中和声明性的状态管理方法。

### **2. Zustand**

Zustand[6] 是一款轻量级和灵活的状态管理库，专为**「较小的项目」**或喜欢更简单解决方案的开发人员设计。它简化了状态管理，无需复杂的设置和概念。

当然，还有`recoil/jotai`等，这里可以参考之前的[React-全局状态管理的群魔乱舞](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3NjU2OTE1Mw%3D%3D%26mid%3D2247485562%26idx%3D1%26sn%3Df38cad7b25f7f94990722e8e66ed67bb%26scene%3D21%23wechat_redirect&source=article&objectId=2357811)

在上面的内容中，我们没有涉及`Redux`，其实我刚开始接触的就是`Redux`，但是在后面的使用中，慢慢的发现它的**「样板代码」**太多，有一段时间差不多变成了，为了使用而使用，导致项目中的代码变得臃肿，而且还不够优雅。

---

## **4. 服务器状态管理**

服务器状态管理是指在服务器端有效地管理和维护应用的状态。与客户端状态管理类似，服务器状态管理关注的是服务器上的数据和逻辑状态，以确保应用能够稳定、可维护、可扩展地运行。

它适用于既涵盖客户端又涵盖服务器的应用程序。

### **解决方案**

![](https://developer.qcloudimg.com/http-save/yehe-9016259/1ea61d513dc7a2e8bc5e97890f47dea2.png)

### **1. TanStack Query (React Query)**

`TanStack Query` 是用于处理应用程序中服务器状态的强大而灵活的状态管理库。它允许我们轻松地获取、缓存和更新来自服务器的数据。该库提供了自动缓存、高效的数据获取以及自定义 API 端点的功能。它非常适合需要实时数据更新和高效数据同步的应用程序，是管理服务器状态的绝佳选择。

### **2. Redux Toolkit - RTK Query**

RTK Query[7] 是 `Redux Toolkit` 生态系统的一部分，提供了全面的解决方案，用于管理服务器状态。它简化了进行 API 请求、缓存数据以及以可预测和高效的方式更新状态的过程。`RTK Query` 与 `Redux` 无缝集成，非常适合在状态管理中使用 `Redux` 的应用程序。它倡导最佳实践，并提供了处理服务器状态的结构化方法。

---

## **5. 表单处理**

想必作为一个功能完善的前端应用，处理表单是大家绕不开的一座大山。如果给你一个类似的功能需求，想必第一时间想到的是利用**「组件库」**(`antd/arco`) 来完成此项任务。(`组件库`我们后面会单讲)

但是，如果表单过于复杂或者由于某些原因无法使用组件库，那你就需要手搓`from`了。

所以，再次给大家提供额外的选择。

### **解决方案**

![](https://developer.qcloudimg.com/http-save/yehe-9016259/e454aa2df5635f88323318b8b9741c35.png)

### **1. Formik**

Formik[8] 提供一组工具和组件，使管理表单状态、验证和提交变得容易。使用 `Formik` 的唯一缺点是它没有维护。

### **2. React Hook Form**

React Hook Form[9] 是一种现代表单库，利用 `React` 钩子来高效处理表单状态和验证。它目前得到积极维护，并提供了轻量且直观的 API。`React Hook Form `以其性能和灵活性而闻名，是处理 `React` 应用程序中表单的绝佳选择。

---

## **6. 测试**

`前端测试`是指通过自动化测试工具和方法来验证前端应用的正确性、性能和用户体验。前端测试通常包括**「****单元测试****」**、**「****集成测试****」**和**「端到端测试」**等多个层次，以确保整个应用在不同层面上的功能和性能都能够正常工作。

### **基础概念**

1. **「单元测试（Unit Testing）：」** 单元测试是对应用中**「最小的可测试单元」**进行测试，通常是一个函数、一个模块或一个组件。单元测试旨在验证这些单元的行为是否符合预期。

1. **「集成测试（Integration Testing）：」** 集成测试是验证**「多个单元之间」**的协作和集成是否正确。在前端应用中，这可能涉及到多个组件、服务或模块的协同工作。集成测试的目标是确保这些组件在一起能够正常运行。

1. **「端到端测试（End-to-End Testing）：」** 端到端测试是对**「整个应用」**进行测试，模拟用户的实际使用场景。这类测试通常涉及到模拟用户在浏览器中的交互，如点击、输入等。

1. **「覆盖率测试（Code Coverage）：」** 代码覆盖率测试用于衡量测试用例对源代码的覆盖程度。它可以帮助开发者了解哪些部分的代码被测试过，哪些部分还需要更多的测试用例。

### **解决方案**

![](https://developer.qcloudimg.com/http-save/yehe-9016259/23ff431f172c2c304c2fde5a8eb51a19.png)

### **1. ViTest**

ViTest[10] 是一个由 `vite` 支持的单元测试框架。它提供了一个简单的方法来为 `React`、`Vue`、`Svelte` 等应用程序编写**「单元测试」**、**「组件测试」**和**「端到端」**测试。如果我们正在使用 `React`，`ViTest` 可以通过全面的测试帮助我们确保代码的可靠性和质量。

### **2. React Testing Library**

React Testing Library[11] 是用于 `React` 应用程序的一种流行的测试库。它侧重于编写模仿用户交互的测试，帮助我们确保组件从用户的角度行为如预期。该库鼓励测试 `React` 组件的最佳实践。

### **3. Playwright**

Playwright[12] 是一个**「端到端测试框架」**，支持多种浏览器，包括 `Chromium`、`Firefox` 和 `WebKit`。它提供了一个统一的浏览器自动化 API，允许我们编写跨不同浏览器验证 Web 应用程序功能的测试。`Playwright` 是确保跨浏览器兼容性的强大工具。

---

## **7. 样式**

在之前的[浏览器第四种语言-WebAssembly](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3NjU2OTE1Mw%3D%3D%26mid%3D2247488556%26idx%3D1%26sn%3D34632e2cf0420e0646ae248fa86de356%26scene%3D21%23wechat_redirect&source=article&objectId=2357811)中通过如下的图，介绍了在网页中`JS/CSS/HTML/WASM`的重要职责。

![](https://developer.qcloudimg.com/http-save/yehe-9016259/707f357a428237e884a63299c66b8263.png)

`CSS`作为**「表现层」**，是一个页面锦上添花的存在。

由于`CSS`语言的自身特点 (凌乱且不好进行管理)，导致一些项目中由于不合理使用，到时乱像丛生。

天下苦`CSS`久矣。于是，奋起反抗。出现了很多优秀的方案。

### **解决方案**

![](https://developer.qcloudimg.com/http-save/yehe-9016259/6dad5dd6282e94f2d1cb3c6483ba4d8a.png)

#### **1. Tailwind CSS**

Tailwind CSS[13] 是一个以实用为先的 CSS 框架，提供一组预构建的**「原子 CSS 类」**，用于为我们的 Web 应用程序添加样式。它旨在帮助我们通过在 `HTML` 中**「组合实用类」**来快速创建响应式和高度可定制的设计。`Tailwind CSS` 以其灵活性而闻名，是希望采用实用驱动样式方法的开发人员的绝佳选择。（我们后期，也会有相关的介绍）

#### **2. Styled Components**

Styled Components[14] 是用于为 `React` 组件添加样式的 `CSS-in-JS` 库。它允许我们通过使用标记模板文字来定义样式组件，直接在 `JavaScript` 文件中编写 `CSS`。这种方法使我们能够**「在组件内封装样式」**，从而更容易管理和维护我们的 `CSS`。

#### **3. Emotion**

Emotion[15] 是另一个关注性能和灵活性的 `CSS-in-JS` 库。它提供了多种方式来定义和应用样式到 `React` 组件，包括字符串和对象样式。`Emotion` 以其可预测性和适用于使用 `JavaScript` 编写不同 `CSS` 样式而闻名。它提供了一个与框架无关的方法，使其适用于各种 `JavaScript` 框架。

* `Tailwind CSS` 在使用实用类的情况下在 UI 开发中表现出色。

* `Styled Components` 和 `Emotion` 非常适合 `React` 应用程序中的组件级样式。

---

## **8. UI 组件库**

自我感觉，`UI`组件库的出现，大大提升了`SPA`的开发效率，不用我们去用原生硬搓界面。同时，一个良好的`UI组件库`，通过合理的封装，能够让我们在开发中省去不少工作量。

### **解决方案**

![](https://developer.qcloudimg.com/http-save/yehe-9016259/1833cda611dd4138bc7e138930c5590c.png)

### **1. Ant Design**

Ant Design[16] 是一个用于构建企业级 `React` 应用程序的综合设计系统和组件库。它在国内的地位属于老大的地位呢。

### **2. Arco Design**

Arco Design[17] 字节跳动出品的企业级设计系统。它有`Vue`和`React`的版本。

#### **3. Material-UI**

Material-UI[18] 是一个受欢迎且得到良好维护的 React UI 框架。它基于 `Google` 的 `Material Design` 指南，并提供各种组件，用于创建现代和视觉吸引人的用户界面。

### **2. Mantine**

Mantine[19] 是一个现代的 `React` 组件库，专注于提供高质量的组件和钩子。它提供各种 UI 元素和工具，以简化我们的开发过程。

### **4. Chakra UI**

Chakra UI[20] 是创建 `React` 中可访问且高度可定制的用户界面的热门选择。它提供了一组可组合的组件和样式属性系统，用于灵活的样式。

### **5. Headless UI（Tailwind CSS 框架）**

Headless UI[21] 是一组完全可访问的未经样式化的 UI 组件，旨在与 `Tailwind CSS` 无缝协作。它允许我们构建可访问的界面，同时保留对样式的完全控制。

### **6. DaisyUI（Tailwind CSS 框架）**

DaisyUI[22] 是 `Tailwind CSS` 的扩展，带来了额外的组件和工具，以增强我们的开发体验。如果我们已经使用 `Tailwind CSS`，它将特别有用。

---

## **9. 动画**

在之前[CSS Transitions](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3NjU2OTE1Mw%3D%3D%26mid%3D2247489850%26idx%3D1%26sn%3Df1e7b35a5b0018297d565eafebcca4b4%26scene%3D21%23wechat_redirect&source=article&objectId=2357811)我们系统的介绍了，如果要启动一个动画需要的基本信息。但是呢，如果想要写一些炫酷的动画，还是需要我们大费周折的。

所以，市面上也存在一些方案来为我们在写动画时，提升效率。

### **解决方案**

![](https://developer.qcloudimg.com/http-save/yehe-9016259/9ffa2171d37afb6331b680627c9ab95b.png)

1. React Spring[23] - `React Spring` 是一个功能丰富的动画库，利用基于物理的动画来创建流畅和交互式的动画效果。

1. Framer Motion[24] - `Framer Motion` 以其设计用于 React 的功能丰富的动画库而闻名。它提供了灵活性，非常适合在 `React` 应用程序中创建流畅和流畅的动画效果。

* `React Spring` 提供基于物理的动画和丰富的功能集，

* `Framer Motion` 以其易用性和灵活性而闻名。

## **10. 数据可视化**

在一下大屏项目或者后天项目中，总是会有数据可视化的需求。下面的几个库可以帮助我们创建交互式和信息丰富的图表和图形。

![](https://developer.qcloudimg.com/http-save/yehe-9016259/d071cb27dad2bf6a1ebe68926053462c.png)

1. Victory[25] 是用于 `React` 的功能强大的数据可视化库，提供各种图表类型和自定义选项。它旨在帮助我们轻松创建视觉上吸引人和交互式的数据可视化。

1. React Chartjs 2[26] - 是 `Chart.js` 的 `React` 包装库，`Chart.js` 是一款受欢迎的 `JavaScript` 图表库。它提供了将 `Chart.js` 集成到我们的 `React` 应用程序的简单方法，使我们能够使用 `Chart.js` 的基本功能创建各种图表和图形。

1. Recharts[27] 是一个使用 `React` 构建的可组合图表库。它提供了一个简单且灵活的 API，用于创建各种类型的图表，非常适合将数据可视化添加到 `React` 项目中。

1. AntV-G2[28]是阿里旗下的可视化工具。

## **11. 表格**

也不知道，大家平时接触编辑器相关的内容不，亦或者大家是否用过飞书项目中的表格。

![](https://developer.qcloudimg.com/http-save/yehe-9016259/348c345b296ee26486690950844d2c2b.png)

这种`Table`的复杂程度，已经远远超出一般**「组件库」**中的`Table`的能力范围，想要实现相关的内容，我们可能利用原生`from`进行`cell/row`的数据拼接，简单的内容还是可以胜任的。但是，如果中间的操作多且繁琐，就是页面的搭建和逻辑的处理，都让人望尘莫及。

如果，真有相关的需求，我们可以使用 TanStack Table[29]。这是一个**「无头 UI 库」**，可以让我们在各种框架中构建强大的表格和数据网格，如 `TS/JS`、`React`、`Vue`、`Solid` 和 `Svelte`，同时保留对标记和样式的控制

---

## **12. 国际化（i18n）**

如果大家的公司有海外业务的话，那肯定是逃不过国际化的摧残。那么，找一个称手的工具就势在必行了。

![](https://developer.qcloudimg.com/http-save/yehe-9016259/d87b59355cc5aba73ea56411fd9c15ff.png)

1. i18next[30] 是 `JavaScript` 的一种流行的国际化框架，包括 `React`。它提供了一个全面的解决方案，用于处理翻译、格式化等。

1. React-Intl（Format.js）[31] - 是 `Format.js` 项目的一部分，。`React-Intl` 是一个库，提供了在 `React` 应用程序中格式化和处理国际化文本的工具。

当然，如果上面两种方案都不想用的话，我们之前在[美丽的公主和它的 27 个 React 自定义 Hook](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3NjU2OTE1Mw%3D%3D%26mid%3D2247490072%26idx%3D1%26sn%3De2398b4567c624fa1b0317c8cd6d222b%26scene%3D21%23wechat_redirect&source=article&objectId=2357811)中介绍过`useTranslation`的自定义`hook`。

```
import { useLocalStorage } from "@hooks/useStorage";
import * as translations from "./translations";

type TranslationFunction = (key: string) => string | undefined;

export default function useTranslation(lang: string, fallbackLang: string) {
  const [language, setLanguage] = useLocalStorage < string > ("language", lang);
  const [fallbackLanguage, setFallbackLanguage] =
    useLocalStorage < string > ("fallbackLanguage", fallbackLang);

  const translate: TranslationFunction = (key) => {
    const keys = key.split(".");
    return (
      getNestedTranslation(language, keys) ??
      getNestedTranslation(fallbackLanguage, keys) ??
      key
    );
  };

  return {
    language,
    setLanguage,
    fallbackLanguage,
    setFallbackLanguage,
    t: translate,
  };
}

function getNestedTranslation(
  language: string,
  keys: string[]
): string | undefined {
  return keys.reduce((obj, key) => {
    return obj?.[key];
  }, translations[language]);
}
```

---

## **13. 开发工具**

开发工具对于调试和改进 Web 应用程序的开发工作流程至关重要。以下是一些用于 React 和相关库的流行开发工具：

1. React Developer Tools[32] - 这个工具可作为 `Chrome` 扩展使用。它允许我们检查 `React` 组件层次结构，查看组件的状态和属性，甚至对组件的状态进行更改以进行测试。

1. Redux DevTools[33] 是另一个 `Chrome` 扩展，可增强我们的 `Redux` 开发工作流程。它提供了对 `Redux` 存储的洞察，允许我们检查操作和状态更改，回溯和重放操作等。

1. Testing Playground[34] 是一个简化 `React` 组件测试的 `Chrome` 扩展。它提供了一个用于实验组件和其属性的可视化环境。

1. React Hook Form DevTools[35] - 对于那些使用 `React Hook Form` 的人，有可用于帮助调试表单行为的` DevTools`。

1. TanStack Query DevTools[36] - `TanStack Query` 是用于 `React` 的数据获取库，它提供了用于调试和检查查询和突变的 `DevTools`。我们可以参考官方文档以获取更多信息。

这些开发工具帮助开发人员简化开发和调试过程，使构建和维护 Web 应用程序更加容易。

上面的`1/2/3`有些同学可能因为墙的原因，无法访问。如果想本地，可以私聊我，我已经为大家下载了。

---

## **14. 拖拽**

在一些功能复杂的页面中，页面元素拖拽也是一种比较麻烦的功能点，而浏览器原生其实为我们提供了`API`，但是如果对组件使用`draggable`是一件繁琐的事情。（在我的待写清单中，其实有一篇关于`draggable`的内容，等哪天总结一下，给大家分享出来）

### **解决方案**

![](https://developer.qcloudimg.com/http-save/yehe-9016259/f33e10a05d99f32477467c09c642cd7e.png)

1. DND Kit[37] 用于拖放功能

    * `DND Kit` 是一个功能强大的库，用于为我们的 `React` 应用程序添加拖放功能。它提供了一种简单且可定制的方式来实现重新排序、重新排列或组织用户界面中的元素的拖放功能。

1. react-dnd[38]这是一个老牌的`Dnd`库。

1. react-draggable[39]也是成名已久的`Dnd`库。

1. react-beautiful-dnd[40]专注于`List`拖拽解决方案

---

## **15. 文件上传**

1. React Dropzone[41] 用于文件上传

    * React Dropzone 是一个用于处理 `React` 应用程序中文件上传的热门库。它提供了一个用户友好且高度可定制的拖放区组件，简化了上传文件的过程，使其成为需要文件上传的任何项目的有价值的部分。

1. 当然，在上面提到的各种组件库中，也有`Uploader`的组件，这就看个人需求了。

---

## **后记**

**「分享是一种态度」**。

**「全文完，既然看到这里了，如果觉得不错，随手点个赞和“在看”吧。」**

![](https://developer.qcloudimg.com/http-save/yehe-9016259/71012ec0f293cf736b4122bc959657fa.gif)

#### **Reference**

[1]

**npmtrends: <https://npmtrends.com/>**

[2]

**React Router: <https://reactrouter.com/en/main>**

[3]

**React Query: <https://refine.dev/blog/react-query-guide/>**

[4]

**Next.js: <https://nextjs.org/docs>**

[5]

**Redux Toolkit: <https://redux-toolkit.js.org/introduction/getting-started>**

[6]

**Zustand: <https://docs.pmnd.rs/zustand/getting-started/introduction>**

[7]

**RTK Query: <https://redux-toolkit.js.org/rtk-query/overview>**

[8]

**Formik: <https://formik.org/docs/tutorial>**

[9]

**React Hook Form: <https://www.react-hook-form.com/get-started/>**

[10]

**ViTest: <https://vitest.dev/guide/>**

[11]

**React Testing Library: <https://testing-library.com/docs/react-testing-library/intro/>**

[12]

**Playwright: <https://playwright.dev/docs/intro>**

[13]

**Tailwind CSS: <https://tailwindcss.com/docs/installation>**

[14]

**Styled Components: <https://styled-components.com/docs>**

[15]

**Emotion: <https://emotion.sh/docs/introduction>**

[16]

**Ant Design: <https://ant.design/components/overview-cn>**

[17]

**Arco Design: <https://arco.design/react/docs/start>**

[18]

**Material-UI: <https://mui.com/material-ui/getting-started/>**

[19]

**Mantine: <https://mantine.dev/getting-started/>**

[20]

**Chakra UI: <https://chakra-ui.com/getting-started>**

[21]

**Headless UI: <https://headlessui.com/>**

[22]

**DaisyUI: <https://daisyui.com/>**

[23]

**React Spring: <https://www.react-spring.dev/docs/getting-started>**

[24]

**Framer Motion: <https://www.framer.com/motion/>**

[25]

**Victory: <https://formidable.com/open-source/victory/docs/>**

[26]

**React Chartjs 2: <https://react-chartjs-2.js.org/>**

[27]

**Recharts: <https://recharts.org/zh-CN/>**

[28]

**AntV-G2: <https://g2.antv.antgroup.com/manual/introduction/what-is-g2>**

[29]

**TanStack Table: <https://tanstack.com/table/v8/docs/guide/introduction>**

[30]

**i18next: <https://react.i18next.com/>**

[31]

**React-Intl (Format.js): <https://formatjs.io/docs/react-intl/>**

[32]

**React Developer Tools: <https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi>**

[33]

**Redux DevTools: <https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd>**

[34]

**Testing Playground: <https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano>**

[35]

**React Hook Form DevTools: <https://www.react-hook-form.com/dev-tools/>**

[36]

**TanStack Query DevTools: <https://tanstack.com/query/v4/docs/react/devtools>**

[37]

**DND Kit: <https://docs.dndkit.com/>**

[38]

**react-dnd: <https://react-dnd.github.io/react-dnd/about>**

[39]

**react-draggable: <https://github.com/react-grid-layout/react-draggable>**

[40]

**react-beautiful-dnd: <https://github.com/atlassian/react-beautiful-dnd>**

[41]

**React Dropzone: <https://react-dropzone.js.org/>**

本文参与 [腾讯云自媒体分享计划](https://cloud.tencent.com/developer/support-plan)，分享自微信公众号。

原始发表：2023-11-11，如有侵权请联系 [cloudcommunity@tencent.com](mailto:cloudcommunity@tencent.com) 删除
