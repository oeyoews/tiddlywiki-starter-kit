---
title: 'Bye-bye_useState_&_useEffect__Revolutionizing_React_Development!'
tags: ['剪藏']
type: 'text/markdown'
created: 'Mon Oct 16 2023 00:27:04 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: 'oeyoews'
url: 'https://medium.com/@emmanuelodii80/bye-bye-usestate-useeffect-revolutionizing-react-development-d91f95891adb'
---

# Bye-bye_useState_&_useEffect__Revolutionizing_React_Development!

![](https://miro.medium.com/v2/resize:fit:1050/1*lA-_v4GToxBmh1v7D7xk3A.jpeg)

[![](https://miro.medium.com/v2/resize:fill:66:66/1*urianex_H3N9EL-Sy8KEnA.jpeg)](https://medium.com/@emmanuelodii80?source=post_page-----d91f95891adb--------------------------------)

**Thank you to our sponsors who keep my articles free:感谢我们的赞助商，他们让我的文章免费：**

If you’re building a SaaS, AI tool or any other web app, and you don’t have the all the time to set up boilerplate codes (e.g auth, DNS records, payment webhooks, components, animation, etc),如果您正在构建 SaaS、AI 工具或任何其他 Web 应用程序，并且您没有所有时间来设置样板代码（例如身份验证、DNS 记录、支付网络钩子、组件、动画等），\

Then, you need [ShipFast](https://shipfa.st/?via=76b1ktxw7bbln9yvdrh9). Shipfast saves 18+ hrs of development headache , it’s trusted by 300+ devs and it has a very great documentation.然后，您需要快速发货。Shipfast 节省了 18+ 小时的开发难题，它受到 300+ 开发人员的信任，并且它有一个非常好的文档。

Today, I want to show you an alternative for the **useState** and **useEffect** hook in React. (*It reduces a lot of boilerplate codes)*今天，我想向您展示 React 中 useState 和 useEffect 钩子的替代方案。（它减少了很多样板代码）

Many developers continue to use the useState and useEffect hooks to update states, but I have not been fond of this approach. The issue is that it causes the component to mount, remount, and unmount simultaneously, leading to unexpected behavior. As a result, when logging something into the console, you may see the result repeated three times.许多开发人员继续使用 useState 和 useEffect 钩子来更新状态，但我不喜欢这种方法。问题是它会导致组件同时装载、重新装载和卸载，从而导致意外行为。因此，在将某些内容登录到控制台时，您可能会看到结果重复三次。

## Introducing the useLoaderData Hook:介绍 useLoaderData Hook

The `useLoaderData` hook is a custom hook in React that helps you load data into your component. It simplifies the process of fetching data from an API or performing any asynchronous operation.钩 `useLoaderData` 子是 React 中的一个自定义钩子，可帮助您将数据加载到组件中。它简化了从 API 获取数据或执行任何异步操作的过程。

*When you use the **`useLoaderData`** hook, you provide it with a function that returns a Promise. This Promise represents an asynchronous operation that will fetch the data you need. Once the Promise resolves, the data becomes available to your component.*

The `useLoaderData` hook handles the loading state for you, so you don’t need to manually track whether the data is still loading or if it has finished loading. It provides you with a convenient way to access the data and also handles any potential errors that might occur during the data loading process.`useLoaderData` 挂钩为您处理加载状态，因此您无需手动跟踪数据是否仍在加载或是否已完成加载。它为您提供了一种访问数据的便捷方法，还可以处理数据加载过程中可能发生的任何潜在错误。

By using the `useLoaderData` hook, you can keep your component code clean and organized, separating the data-loading logic from the rest of your component’s responsibilities. It allows you to easily fetch and manage data in a more beginner-friendly way.通过使用 `useLoaderData` 挂钩，您可以保持组件代码干净有序，将数据加载逻辑与组件的其余职责分开。它允许您以更适合初学者的方式轻松获取和管理数据。

## Why the useLoaderHook? 为什么使用 LoaderHook？

The useLoaderHook* from react-router helps achieve the same functionality* with minimal effort. These are some examples of why you should use it.

* **Loading state management**: Loaders handle the loading state for you, providing a clear indication of when data is being fetched. This helps you manage loading spinners, progress indicators, or any other UI elements related to data loading.加载状态管理：加载程序为您处理加载状态，明确指示何时获取数据。这有助于管理加载微调器、进度指示器或与数据加载相关的任何其他 UI 元素。

* **Error handling**: Loaders often include error handling mechanisms, allowing you to handle and display errors that occur during the data loading process. They provide a standardized way to handle errors, making it easier to implement consistent error handling across your application.错误处理：加载程序通常包括错误处理机制，允许您处理和显示数据加载过程中发生的错误。它们提供了一种标准化的错误处理方法，可以更轻松地在整个应用程序中实现一致的错误处理。

* **Separation of concerns**: Loaders allow you to separate the data loading logic from other aspects of your component. This promotes better code organization and maintainability, as you can focus on specific responsibilities without mixing them.关注点分离：加载程序允许您将数据加载逻辑与组件的其他方面分开。这促进了更好的代码组织和可维护性，因为您可以专注于特定职责，而无需混合它们。

And lots more. 等等。

## Let’s see How This Works.让我们看看这是如何工作的

It’s assumed that you have a good knowledge of how react-router 6 works. If you don’t, Feel free to check out the docs [here](https://reactrouter.com/en/main)假设你对 react-router 6 的工作原理有很好的了解。如果您不这样做，请随时在此处查看文档

Firstly, we have to set up the routing system in our application to work with the Loader API. Before now, we have been using the BrowserRouter setup to handle the various routes for our application.首先，我们必须在应用程序中设置路由系统以使用加载器 API。在此之前，我们一直在使用 BrowserRouter 设置来处理应用程序的各种路由。\

Let’s spend a little time talking about this.让我们花一点时间谈谈这个。

```
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import HomeComponent from "./home"
import AboutCompoent from "./about"
function App () {
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Outlet />}>
                <Route index element={<HomeComponent /> } />
                <Route path='about' element={<AboutComponent/> } />
            </Route>
        </Routes>
    </BrowserRouter>
};
export default App;
```

Here, we have set up a routing system traditionally using those imports from react-router.在这里，我们建立了一个路由系统，传统上使用从 react-router 导入的路由系统。\

Think for a second about what’s happening.想一想正在发生的事情。

Well. The BrowserRouter from react-router creates an array of object from the `Routes` children. The snippet below provides a clear illustration of how this is working.井。来自 react-router 的 BrowserRouter 从 `Routes` 子对象创建一个对象数组。下面的代码片段清楚地说明了它是如何工作的。

```
BrowserRouter([
{
    path: '/',
    element: <HomeComponent />,
    children: []
},
{
    path: '/about',
    element: <AboutComponent/>,
    children: []
}
])
```

If they were to be a nested route, then it appends the children’s route to the children’s key in the parent route.如果它们是嵌套路由，则会将子路由附加到父路由中的子路由。\

Yes, That’s how it keeps being **recursive.**是的，这就是它保持递归的方式。

However, this method can’t be used to use the **loaderData** hook. We have to do a bit of refactoring. Don’t panic, It’s a bit similar to this. I highly recommend you check out the react-router docs for more information.但是，此方法不能用于使用 loaderData 挂钩。我们必须做一些重构。不要惊慌，它有点类似于这个。我强烈建议您查看 反应路由器文档 了解更多信息。

```
import { 
createBrowserRouter,
createRoutesFromElements,
RouterProvider,
Route, 
Outlet
 } from "react-router-dom"

import HomeComponent from "./home"
import AboutComponent from "./about"

function App() {
    const browserRoutes = createBrowserRouter(createRoutesFromElements(
       <Route path='/' element={<Outlet />}>
                <Route index element={<HomeComponent /> } />
                <Route path='about' element={<AboutComponent /> } />
        </Route>
    ))

     return (
        <RouterProvider router={browserRoutes} />
    );
}
```

I have imported `createBrowserRouter`, `createRoutesFromElement`, `RouterProvider`.我已经导入 `createBrowserRouter` 了、 、 `createRoutesFromElement` `RouterProvider` 。\

Then, initialize a variable named `browserRoutes` to serve as that object that should be rendered. Noticed that I called the `createRoutesFromElements` function inside of the `createBrowserRouter` function. This was because I want to parse or convert the Routes to an object and the `createRoutesFromElements` as the name implies can help me do that. Then lastly the `RouterProvider` was returned with the value of the new `browserRouter`. Let’s take a look at what we would have done without using the createRoutesFromElements function.然后，初始化一个名为 `browserRoutes` 作为应呈现的对象的变量。注意到我在函数内部调用了 `createRoutesFromElements` `createBrowserRouter` 函数。这是因为我想解析或将路由转换为对象，顾名思义 `createRoutesFromElements` 可以帮助我做到这一点。然后最后返回新的 `RouterProvider` `browserRouter` .让我们来看看如果不使用 createRoutesFromElements 函数，我们会做什么。

```
createBrowserRouter([
{
    path: '/',
    element: <HomeComponent />,
    children: []
},
{
    path: '/about',
    element: <AboutComponent/>,
    children: []
}])
```

I am not a big fan of this as your route can even go nested and at some point, this becomes confusing. You should keep things very simple.我不是这个的忠实粉丝，因为你的路线甚至可以嵌套，在某些时候，这变得令人困惑。你应该让事情变得非常简单。

## Exploring the Loader functions:探索加载器功能

As we now have a bit of an understanding of how we can set up our application to use the Loader API, let’s see how we can use the API.由于我们现在对如何设置应用程序以使用 Loader API 有了一定的了解，让我们看看如何使用 API。

Say you intend to fetch data from an endpoint andto be displayed on the `homeComponent`. What most developers would do is: initialize a state and update the state in the **useEffect **hook. The snippet below provides a clear illustration of what I am talking about.假设您打算从端点获取数据并显示在 . `homeComponent` 大多数开发人员会做的是：初始化一个状态并在 useEffect 钩子中更新状态。下面的片段清楚地说明了我在说什么。

```
import { useState } from 'react'

const HomeComponent = () => {
    const [data, setData] = useState([]);

        useEffect(async () => {
        const request = await fetch('http://localhost:3004/file');
         if(!request.ok) throw new Error('Failed to fetch data')
        const item= await request.json()
        setData(item)  
    }, [])

    return (
        <section>
            { data.length > 0 ? data.map((foundData) => (
                    <div key={foundData.id}>
                        <strong>{foundData.name}</strong>
                     </div>
                 )) : <p>Data currently unavailable</p>}
        </section>
    )
}
export default HomeComponent
```

This is a tonne of lines as we might want to simplify this a bit and maybe reuse the same function.这是一吨行，因为我们可能希望简化一点，并可能重用相同的功能。

To use **Loaders**, you have to define a **loader **function. Loader functions are like **Custom Hooks**.要使用加载器，您必须定义一个加载器函数。加载器函数类似于自定义钩子。\

Besides, the naming convention of the function doesn’t matter as you can call it anything. In the code snippet below, I will create a basic loader function that fetches data from an API like I showed in the snipppet above 此外，函数的命名约定并不重要，因为您可以称呼它为任何东西。在下面的代码片段中，我将创建一个基本的加载器函数，该函数从 API 获取数据，如我在上面的截图中显示的

```
export async function LoaderFunction () {
    const request = await fetch('http://localhost:3004/file');
    if (!request.ok) throw new Error ('Failed to fetch item')
    const item = await  response.json();
    return item;
};
```

Now, we have to import the loader function to component where our routes are being handled. After setting up your route system using the `createBrowserRouter` and `createRouteFromElements` you should have access to a prop called `loader`. There you should pass in the `LoaderFunction` you created as the value.现在，我们必须将加载器函数导入到处理路由的组件中。使用 `createBrowserRouter` 和 `createRouteFromElements` 设置路由系统后，您应该可以访问名为 `loader` 的道具。在那里，您应该传入 `LoaderFunction` 您创建的值。\

In the code snippet below provides a clear illustration of this.在下面的代码片段中提供了对此的清晰说明。

```
import { 
createBrowserRouter,
createRoutesFromElements,
RouterProvider,
Route, 
Outlet
 } from "react-router-dom"
import HomeComponent from "./home"
import AboutComponent from "./about"
import { LoaderFunction as HomeLoader} from "./loader"

function App() {
    const browserRoutes = createBrowserRouter(createRoutesFromElements(
       <Route path='/' element={<Outlet />}>
                <Route index element={<HomeComponent /> }
                     loader={HomeLoader}/>
                <Route path='about' element={<AboutComponent /> } />
        </Route>
    ))

     return (
        <RouterProvider router={browserRoutes} />
    );
}
```

After that, We can access the data returned by the loader function using the **useLoaderData **Hook from react-router in the HomeComponent.之后，我们可以使用 useLoaderData Hook 从 HomeComponent 中的 react-router 访问加载器函数返回的数据。\

The code snippet below best explains what just read.下面的代码片段最好地解释了刚刚阅读的内容。

```
import { useLoaderData } from "react-router-dom"

const HomeComponent = () => {
    const data = useLoaderData();

    return (
        <section>
            {data.map((foundData) => (
                    <div key={foundData.id}>
                         <strong>{foundData.name}</strong> 
                    </div> 
            ))}
        </section>
    )
}
export default HomeComponent
```

**Wow! 😲… 哇！😲…**\

Now see how we have just cleaned up the HomeComponent :) 现在看看我们刚刚如何清理主页组件:)\

Noticed we got rid of the guard clause that checks if the data is null.请注意，我们删除了检查数据是否为空的 guard 子句。\

This is because react-router makes it load the data as soon as the url/path is active. So, it Makes the necessary requests even before the **Component is Mounted**. Yes! 这是因为 react-router 让它在 url/path 处于活动状态时立即加载数据。因此，它甚至在挂载组件之前就发出了必要的请求。是的！

We are only making provisions for the happy path. What if we pass a non-existing endpoint? If that’s the case, don’t panic as react-router also allow us to pass components to another prop called `errorElement` .我们只是在为快乐的道路做准备。如果我们传递一个不存在的端点怎么办？如果是这种情况，请不要惊慌，因为 react-router 还允许我们将组件传递给另一个名为 `errorElement` .\

This is specifically for Errors just as we use `ErrorBoundaries`. Let’s see how this works in the snippet below 这是专门针对错误的，就像我们使用 `ErrorBoundaries` .让我们在下面的代码片段中看看它是如何工作的

```
import { 
createBrowserRouter,
createRoutesFromElements,
RouterProvider,
Route, 
Outlet
 } from "react-router-dom"
import HomeComponent from "./home"
import AboutComponent from "./about"
import { LoaderFunction as HomeLoader} from "./loader"

function App() {
    const browserRoutes = createBrowserRouter(createRoutesFromElements(
       <Route path='/' element={<Outlet />}>
                <Route index element={<HomeComponent /> }
                    loader={HomeLoader} errorElement={<h1>An Error occured</h1>}/>
                <Route path='about' element={<AboutComponent /> } />
        </Route>
    ))

     return (
        <RouterProvider router={browserRoutes} />
    );
}
```

I have just used a header tag to show the error. It is advisable you use a Component so that you can also get access to the `useRouteError` Hook. I’d show how to use the useRouteError Hook in one of my upcoming blog posts. If you’re keen to learn about it, Kindly use this [link](https://reactrouter.com/en/main/hooks/use-route-error).我刚刚使用标题标签来显示错误。建议您使用组件，以便您也可以访问 `useRouteError` 钩子。我将在我即将发布的一篇博客文章中展示如何使用 useRouteError Hook。如果您想了解它，请使用此链接。\

Since it pre-fetches the data before mounting the component, the loading state becomes irrelevant as it might either get the data or return the error message the you pass as a value to the **errorElement **prop.由于它在挂载组件之前预取数据，因此加载状态变得无关紧要，因为它可能会获取数据或返回错误消息，您将作为值传递给 errorElement 属性。

That’s all of the basics you need to know about making requests using the **Data Layer API**这就是您需要了解的有关使用数据层 API 发出请求的所有基础知识

If you found this helpful, please consider following me on [**Twitter**](https://twitter.com/devodii_), reacting to this post, leaving a comment, or support me by buying me a coffee through this [**link**](https://www.buymeacoffee.com/emmanuelod5).如果您觉得这有帮助，请考虑在 Twitter 上关注我，对此帖子做出反应，发表评论，或通过此链接为我买咖啡来支持我。
