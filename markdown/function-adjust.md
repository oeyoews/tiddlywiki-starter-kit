---
title: 'function-adjust'
tags: ['JavaScript']
created: 'Sun May 21 2023 04:03:56 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# function-adjust

在JavaScript中，可以使用typeof运算符或者直接判断函数名的方式来判断一个函数是否存在。

1. 使用typeof运算符：

```
```js
if (typeof functionName === 'function') {
  // 函数存在，执行相关操作
} else {
  // 函数不存在或者不是一个函数类型
}
```

<button>js</button>
```

2. 直接判断函数名：

```
```js
if (window.functionName) {
  // 函数存在，执行相关操作
} else {
  // 函数不存在
}
```

<button>js</button>
```

需要注意的是，在浏览器环境下，全局函数通常会被定义在window对象中。因此，我们可以通过window对象来访问和判断全局函数是否存在。如果在其他环境下使用，可能需要针对不同的上下文对象进行处理。

另外，如果需要判断某个函数是否为对象的属性，也可以使用in运算符。例如：

```
```js
const obj = {
  foo() {
    console.log('Hello, world!');
  }
};

if ('foo' in obj) {
  obj.foo(); // Hello, world!
} else {
  console.log('Function not found.');
}
```

<button>js</button>
```

在这个例子中，我们通过in运算符来判断obj对象是否包含名为`foo`的函数，如果存在，则调用该函数。
