---
title: 'react-methods'
tags: ['React']
type: 'text/markdown'
created: 'Mon May 22 2023 11:53:35 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# react-methods

1. 使用 JSX 创建组件

1. 使用组件 props 传递数据和方法

1. 使用 state 存储组件状态

1. 使用生命周期方法管理组件生命周期

1. 使用事件处理函数处理用户交互

1. 使用条件渲染和循环渲染控制组件显示

1. 使用 ref 获取组件和 DOM 元素的引用

1. 使用 Context 全局共享数据

1. 使用 Redux 管理应用状态

1. 使用 React Router 管理应用路由

1. 使用 JSX 创建组件

```jsx
import React from 'react';

function MyComponent() {
  return <h1>Hello World!</h1>;
}

export default MyComponent;
```

1. 使用组件 props 传递数据和方法

```jsx
import React from 'react';

function MyComponent(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}

export default MyComponent;
```

1. 使用 state 存储组件状态

```jsx
import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default MyComponent;
```

1. 使用生命周期方法管理组件生命周期

```jsx
import React, { Component } from 'react';

class MyComponent extends Component {
  componentDidMount() {
    console.log('Component mounted');
  }

  componentWillUnmount() {
    console.log('Component unmounted');
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

export default MyComponent;
```

1. 使用事件处理函数处理用户交互

```jsx
import React from 'react';

function MyComponent() {
  function handleClick() {
    console.log('Button clicked');
  }

  return <button onClick={handleClick}>Click me</button>;
}

export default MyComponent;
```

1. 使用条件渲染和循环渲染控制组件显示

```jsx
import React from 'react';

function MyComponent(props) {
  if (props.isVisible) {
    return <h1>Hello World!</h1>;
  } else {
    return null;
  }
}

export default MyComponent;
```

```jsx
import React from 'react';

function MyComponent(props) {
  const items = props.items.map(item => <li key={item.id}>{item.name}</li>);

  return <ul>{items}</ul>;
}

export default MyComponent;
```

1. 使用 ref 获取组件和 DOM 元素的引用

```jsx
import React, { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus input</button>
    </div>
  );
}

export default MyComponent;
```

1. 使用 Context 全局共享数据

```jsx
import React, { createContext, useContext } from 'react';

const MyContext = createContext();

function MyComponent() {
  return (
    <MyContext.Provider value="Hello World!">
      <ChildComponent />
    </MyContext.Provider>
  );
}

function ChildComponent() {
  const value = useContext(MyContext);

  return <h1>{value}</h1>;
}

export default MyComponent;
```

1. 使用 Redux 管理应用状态

```jsx
import React from 'react';
import { connect } from 'react-redux';

function MyComponent(props) {
  function handleClick() {
    props.dispatch({ type: 'INCREMENT' });
  }

  return (
    <div>
      <p>Count: {props.count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    count: state.count,
  };
}

export default connect(mapStateToProps)(MyComponent);
```

1. 使用 React Router 管理应用路由

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function MyComponent() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </Router>
  );
}

export default MyComponent;
```
