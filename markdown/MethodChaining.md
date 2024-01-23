---
title: 'MethodChaining'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Jun 12 2023 05:24:02 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# MethodChaining

方法链（Method Chaining）是一种编程技术，它允许在一个对象上连续地调用多个方法，而不需要每次调用都使用一个中间变量保存对象的引用。通过方法链，可以在一行代码中依次调用多个方法，并且每个方法的返回值都是该对象本身，从而可以在同一个对象上连续地调用多个方法。

方法链的语法通常是在对象上直接调用一个方法，然后在该方法的返回值上继续调用另一个方法，以此类推。例如：

```js
obj.method1().method2().method3();
```

```js
// obj method

class Person {
  constructor() {
    this.name = "John";
    this.age = 30;
  }
  log1 = () => {
    console.log("one");
    return this;
  };

  log2 = () => {
    console.log("two");
    return this;
  };
}

const p = new Person();
p.log1().log2();
```

上述代码中，obj 是一个对象，method1、method2 和 method3 是该对象上的三个方法。通过方法链的方式，可以依次调用这三个方法，并且每个方法的返回值都是该对象本身，所以可以连续调用下一个方法。

方法链的好处是可以使代码更加简洁和易读，尤其是在需要对同一个对象执行多个连续操作的情况下。它可以减少临时变量的使用，并且可以在一行代码中清晰地表达多个操作的逻辑关系。

需要注意的是，方法链并不适用于所有情况，特别是当某个方法的返回值类型与后续方法不兼容时，方法链就无法继续进行。此外，过度使用方法链可能会导致代码可读性下降，因此在使用方法链时需要根据具体情况进行权衡和选择。
