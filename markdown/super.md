---
title: 'super'
tags: ['JavaScript']
created: 'Fri Jun 02 2023 16:03:06 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# super

在 JavaScript 中，"super" 关键字也用于访问父类的属性和方法。它通常在 ES6 中的类和继承中使用。

在使用 "super" 关键字时，它可以在子类构造函数中作为函数调用来调用父类构造函数，也可以在子类方法中作为对象来调用父类方法。在子类构造函数中，使用 "super" 关键字调用父类构造函数时，可以通过传递参数来设置父类的属性。在子类方法中使用 "super" 关键字时，它可以用来引用父类的方法，并在子类方法中进行进一步的处理。

以下是使用 "super" 关键字的示例：

```
```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // 调用父类的构造函数
  }
  speak() {
    super.speak(); // 调用父类的方法
    console.log(this.name + ' barks.');
  }
}

let d = new Dog('Mitzie');
d.speak(); // 输出 "Mitzie makes a noise." 和 "Mitzie barks."
```

<button>js</button>
```

在这个例子中，子类 `Dog` 继承自父类 `Animal`，并且在子类构造函数中使用 "super" 关键字调用了父类的构造函数，以便为父类的属性进行初始化。在子类方法 `speak` 中，使用 "super" 关键字调用了父类的 `speak` 方法，并在其后添加了额外的行为。
