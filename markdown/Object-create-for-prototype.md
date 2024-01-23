---
title: 'Object-create-for-prototype'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Tue Jan 23 2024 08:38:30 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# Object-create-for-prototype

`Object.create(null)` 的作用是创建一个空对象，该对象的原型链为空，即它不继承任何属性和方法。这样的对象通常被称为“纯净”对象或“字典对象”。

使用 `Object.create(null)` 创建的对象不继承任何默认的属性或方法，包括那些来自 `Object` 原型链的属性和方法。这使得这个对象在某些场景下更适用，特别是在需要确保对象不受原型链上的属性影响时。

例如，考虑以下情况：

```
```javascript
// 创建一个普通对象
var normalObject = {};
console.log(normalObject.toString); // [Function: toString]

// 创建一个使用 Object.create(null) 的纯净对象
var pureObject = Object.create(null);
console.log(pureObject.toString); // undefined
```

<button>javascript</button>
```

在上面的例子中，`normalObject` 是一个普通对象，它继承了 `Object` 原型链上的方法，如 `toString`。相比之下，`pureObject` 是使用 `Object.create(null)` 创建的对象，它不继承任何属性，因此 `toString` 是 `undefined`。

使用 `Object.create(null)` 的主要优势是可以避免意外地访问到原型链上的属性和方法，从而减少潜在的冲突或错误。这在需要一个纯净的对象来充当简单的键-值存储或字典时特别有用。

`Object.create` 主要用于创建一个新对象，并将新对象的原型链指向指定的对象。这在一些特定的场景下非常有用，例如在实现对象继承时或创建具有特定原型链的对象。

以下是一些 `Object.create` 的使用场景：

1. **对象继承：**

```
```javascript
var parent = {
  // 父对象的属性和方法
};

var child = Object.create(parent);
// child 现在继承了 parent 的属性和方法
```

<button>javascript</button>
```

1. **原型继承：**

```
```javascript
function Animal(name) {
  this.name = name;
}

function Dog(breed) {
  this.breed = breed;
}

// Dog 继承了 Animal 的原型
Dog.prototype = Object.create(Animal.prototype);

var myDog = new Dog('Bulldog');
```

<button>javascript</button>
```

1. **对象模板：**

```
```javascript
var template = {
  // 一些通用的属性和方法
};

var instance = Object.create(template);
// 创建新对象，共享 template 的属性和方法
```

<button>javascript</button>
```

1. **属性复制：**

```
```javascript
var source = {
  prop1: 'value1',
  prop2: 'value2'
};

var target = Object.create(null);

// 将 source 的属性复制到 target
for (var key in source) {
  if (source.hasOwnProperty(key)) {
    target[key] = source[key];
  }
}
```

<button>javascript</button>
```

在这些场景下，`Object.create` 提供了一种灵活的方式来创建对象，并指定它们的原型链关系。
