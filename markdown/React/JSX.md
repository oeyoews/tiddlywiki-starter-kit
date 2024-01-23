---
title: 'JSX'
tags: ['React']
type: 'text/markdown'
created: 'Wed Apr 26 2023 03:43:39 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# JSX

JSX 是 React 中用于描述用户界面的一种语言，它类似于 XML，但具有更强的表达能力和灵活性。在 JSX 中，我们可以通过使用花括号（{}）来插入 JavaScript 表达式，从而实现动态生成用户界面。

JSX 表达式可以在花括号内包含任何有效的 JavaScript 表达式，例如变量、函数调用、运算符等，例如：

```jsx
const name = 'John';
const element = <h1>Hello, {name}!</h1>;
在上面的代码中，我们定义了一个名为name的变量，然后使用花括号将其插入到了一个JSX元素中。在这个JSX元素中，花括号内的表达式会被求值，并将结果作为文本节点插入到元素中。
```

我们也可以在 JSX 中使用条件语句、循环语句等 JavaScript 语言特性，例如：

```
const isLoggedIn = true;
const element = (
  <div>
    {isLoggedIn ? (
      <p>Welcome back!</p>
    ) : (
      <p>Please log in.</p>
    )}
  </div>
);
```

在上面的代码中，我们使用了条件运算符（?:）来根据用户是否登录来动态生成不同的 JSX 元素。如果用户已经登录，我们会显示一条欢迎消息，否则会显示一条提示消息。

总之，JSX 表达式可以帮助我们在 React 中动态生成用户界面，使得我们可以更加灵活地控制界面的生成和样式。

```jsx
const header = (
  <header>
    <h1>Mozilla Developer Network</h1>
  </header>
);
```

备注：上一个代码段中的括号并非 JSX 的一部分，它对您的应用程序没有任何影响，括号只是用来向您（和您的计算机）表明其中的多行代码属于同一个表达式 (译者注：原文表述实在有点啰嗦)。因此上面的代码等同于：

```jsx
const header = <header>
    <h1>Mozilla Developer Network</h1>
</header>
```

这看起来多少有点不适感，因为表达式前面的 <header>标记没有缩进与其对应的结束标记相同的位置。
</p>
</div></header>
