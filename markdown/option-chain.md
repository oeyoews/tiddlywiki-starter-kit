---
title: 'option-chain'
tags: ['JavaScript']
created: 'Sat May 27 2023 11:26:45 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# option-chain

可选链是 JavaScript 中一个有用的语法功能。

它允许读取现有对象的嵌套属性,即使该属性链中的 intermediary 属性不存在或 undefined 也没有问题。

简单来说,如果你想读取:

```
```js
obj.foo.bar
```

<button>js</button>
```

但 `obj.foo` 可能是 undefined,可选链可以让你安全地这样写:

```
```js
obj.foo?.bar
```

<button>js</button>
```

如果 `obj.foo` 存在,则获取 `obj.foo.bar`,否则返回 undefined。

这可以避免写大量的 nullish 合并操作:

```
```js
let bar = (obj.foo && obj.foo.bar) || 'default';
```

<button>js</button>
```

可以简化为:

```
```js
let bar = obj.foo?.bar || 'default';
```

<button>js</button>
```

可选链还支持方法调用:

```
```js
obj.foo?.bar();
```

<button>js</button>
```

如果 `obj.foo` 存在,则调用 `obj.foo.bar()`,否则不执行任何操作。

总的来说,可选链可以让你安全地读取可能不存在的中间对象,免于频繁检查 null/undefined。
