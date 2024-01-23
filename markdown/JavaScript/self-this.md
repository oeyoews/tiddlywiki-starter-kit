---
title: 'self-this'
tags: ['JavaScript']
created: 'Fri May 26 2023 05:06:58 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
page-cover: 'https://source.unsplash.com/random?fm=blurhash&w=50&self-this'
type: 'text/vnd.tiddlywiki'
---

# self-this

在JavaScript中，回调函数在被调用时可能会失去其原始的`this`引用。这是因为JavaScript中的函数是基于调用的，而不是基于定义的。当一个函数作为一个回调函数传递给另一个函数时，该函数的`this`引用可能会指向全局对象（在非严格模式下）或undefined（在严格模式下），而不是原始的对象或类实例。

例如，在以下代码中，`setTimeout`函数的回调函数中的`this`引用指向的是全局对象（在非严格模式下）。

```
class Person {
  constructor(name) {
    this.name = name;
  }
  info() {
    setTimeout(function() {
      console.log(this.name); // 输出undefined或全局对象的name属性
    }, 1000);
  }
}

const person = new Person('John');
person.info();
```

在这个例子中，`setTimeout`函数的回调函数中的`this`引用指向的是全局对象，而不是`Person`对象。因此，当我们尝试访问`this.name`属性时，会返回undefined或全局对象的name属性值。

为了解决这个问题，我们可以使用一些技巧来保留原始的`this`引用，并在回调函数内部使用它，例如使用`bind()`方法、箭头函数或保存`this`引用到变量中。

- 使用`bind()`方法显式绑定`this`引用：

```
class Person {
  constructor(name) {
    this.name = name;
  }
  info() {
    setTimeout(function() {
      console.log(this.name); // 输出John
    }.bind(this), 1000);
  }
}

const person = new Person('John');
person.info();
```

在这个例子中，我们使用`bind()`方法将回调函数中的`this`引用绑定到`Person`对象上，从而保留原始的`this`引用。

- 使用箭头函数继承父级作用域的`this`引用：

```
class Person {
  constructor(name) {
    this.name = name;
  }
  info() {
    setTimeout(() => {
      console.log(this.name); // 输出John
    }, 1000);
  }
}

const person = new Person('John');
person.info();
```

在这个例子中，我们使用箭头函数来定义回调函数，箭头函数会继承父级作用域的`this`引用。因此，在回调函数中，`this`引用指向`Person`对象，从而可以访问`name`属性。

- 保存`this`引用到变量中：

```
class Person {
  constructor(name) {
    this.name = name;
  }
  info() {
    let self = this; // 保存当前对象的引用到self变量
    setTimeout(function() {
      console.log(self.name); // 输出John
    }, 1000);
  }
}

const person = new Person('John');
person.info();
```

在这个例子中，我们将当前对象的引用保存到`self`变量中，并在回调函数中使用`self`变量来访问`name`属性。这种方式可以避免在回调函数中直接使用`this`引用，从而避免`this`引用丢失的问题。

总之，在JavaScript中，回调函数不能直接使用`this`引用，因为它可能会失去原始的引用。因此，我们需要使用一些技巧来保留原始的`this`引用，并在回调函数内部使用它，例如使用`bind()`方法、箭头函数或保存`this`引用到变量中。

在JavaScript中，通常使用`self`或`that`变量来保存当前函数的`this`引用，以便在函数作用域内访问它。这种技术通常用于回调函数或嵌套函数中，这些函数的this引用可能会丢失或引用错误的对象。

在例子中，`self = this`行的意思是将当前对象的引用赋值给一个名为`self`的变量。通过这种方式，我们可以在函数作用域内使用`self`变量来访问当前对象的属性和方法，而不用担心`this`引用的问题。

```
class Person {
  constructor(name) {
    this.name = name;
  }
  info() {
    let self = this; // 将当前对象的引用赋值给self变量
    setTimeout(function() {
      console.log(self.name); // 使用self变量来访问当前对象的name属性
    }, 1000);
  }
}

const person = new Person('John');
person.info();
```

在这个例子中，`setTimeout`函数的回调函数中使用了`self`变量来访问当前对象的`name`属性，而不是直接使用`this`。需要注意的是，由于JavaScript中的函数作用域机制，我们可以在函数内部创建一个新的作用域，并且在该作用域中使用`self`变量。这样做可以避免在外部作用域中暴露`this`引用，从而提高代码的可维护性和安全性。

然而，在ES6中，我们可以使用箭头函数来避免`self`变量的使用，因为箭头函数不会创建自己的作用域，而是继承父级作用域的`this`引用。因此，箭头函数中的`this`引用始终指向定义该函数时的对象。

下面是使用箭头函数的示例：

```
class Person {
  constructor(name) {
    this.name = name;
  }
  info() {
    setTimeout(() => {
      console.log(this.name); // 使用箭头函数中的this引用来访问当前对象的name属性
    }, 1000);
  }
}

const person = new Person('John');
person.info();
```

在这个例子中，我们使用箭头函数来定义`setTimeout`的回调函数，这样就可以直接使用`this`引用来访问当前对象的`name`属性，而不需要使用`self`变量。这种方式更加简洁和易读，而且不需要额外的变量来保存`this`引用。
