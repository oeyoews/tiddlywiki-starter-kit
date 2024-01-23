---
title: 'decorator'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Tue Jun 06 2023 09:34:27 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# decorator

装饰器函数是一种在 JavaScript 中常用的语法，它可以用来修改类、方法或属性的行为。装饰器函数通常被定义为一个函数，它接受一个类或函数作为参数，并返回一个新的类或函数。在应用装饰器函数时，我们可以使用 `@` 符号来注释一个类、方法或属性，例如：

```javascript
@decorator
class MyClass {
  // ...
}

class MyClass {
  @decorator
  myMethod() {
    // ...
  }
}

class MyClass {
  @decorator
  myProperty = 123;
}
```

装饰器函数可以用来实现很多功能，例如修改函数的参数、修改类的属性等等。需要注意的是，装饰器函数目前还不是 JavaScript 的标准语法，需要使用特定的工具来进行转换才能使用。
