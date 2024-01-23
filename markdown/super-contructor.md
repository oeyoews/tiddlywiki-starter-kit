---
title: 'super-contructor'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Mon Aug 28 2023 09:23:02 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# super-contructor

在面向对象编程中，`constructor` 和 `super` 是两个重要的概念，尤其是在继承关系中的使用。

`constructor` 是一个类中的特殊方法，用于初始化对象的实例。当你创建一个对象的实例时，构造函数会被调用，以便执行一些初始化操作，例如设置对象的属性和状态。

`super` 是一个关键字，用于调用父类的构造函数。在子类中的构造函数中，你可以使用 `super()` 来调用父类的构造函数，从而执行父类的初始化操作。这对于继承来自父类的属性和方法非常有用。

以下是一个简单的示例代码，演示了如何在子类的构造函数中使用 `super`：

```
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 调用父类的构造函数
    this.breed = breed;
  }
}

const myDog = new Dog("Buddy", "Golden Retriever");
console.log(myDog.name);  // 输出：Buddy
console.log(myDog.breed); // 输出：Golden Retriever
```

<button>javascript</button>
```

在这个示例中，`Animal` 是父类，`Dog` 是子类。`Dog` 类的构造函数使用了 `super(name)` 来调用 `Animal` 类的构造函数，并传递了一个参数 `name`。

总之，`constructor` 用于初始化对象实例，`super` 用于在子类的构造函数中调用父类的构造函数以进行初始化操作。
