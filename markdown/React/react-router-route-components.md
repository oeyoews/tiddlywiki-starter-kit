---
title: 'react-router-route-components'
tags: ['React']
type: 'text/markdown'
created: 'Tue May 02 2023 11:56:39 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# react-router-route-components

`react-router-dom` and `react-router` are two packages that are used for different purposes, but they both share a lot of the same code. Here’s a brief overview of the differences between the two:

* `react-router`: This is the core routing library for React. It provides the basic building blocks for creating a routing system in a React app. It includes components like `BrowserRouter`, `Route`, and `Link`.

* `react-router-dom`: This package builds on top of `react-router`. It adds support for web-specific features like handling browser history and rendering `<a>` tags instead of `<Link>` tags.

In other words, you would typically use `react-router` if you’re building a React app that needs to handle routing, regardless of whether it’s a web app or a mobile app. On the other hand, if you’re building a web app with React, you’ll probably want to use `react-router-dom` so you can take advantage of its web-specific features.

Here’s an example of how you might import each package:

```javascript
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// OR

import { BrowserRouter as Router, Route, Link } from 'react-router';
```

As you can see, the usage is very similar between the two packages - the only difference is the name of the package you’re importing from.

router 和 route 是两个不同的概念，它们在 React Router 中扮演不同的角色。

Router: Router 是 React Router 中最基本的组件之一。它是一个高阶组件，用于将整个应用程序包装在路由器中。它提供了一个上下文对象，使得子组件可以访问到 react-router 的一些路由信息和方法。

Route: Route 是用于路由匹配的组件，用来控制那个页面渲染。每个 Route 组件都要有一个 path 属性，它表示这个路由所匹配的路径，当 URL 与路径匹配时，就会显示相应的 UI 界面。

简单来说，Router 是一个组件，负责把整个应用程序进行路由处理。而 Route 是另外一个组件，用于匹配 URL 并对其进行处理渲染出相应的内容。当 URL 发生变化时，React Router 就会重新匹配当前 URL 对应的 Route，并且将对应的组件渲染到屏幕上。
