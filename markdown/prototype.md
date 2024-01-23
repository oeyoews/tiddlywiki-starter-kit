---
title: 'prototype'
tags: ['JavaScript']
created: 'Sun May 21 2023 03:58:30 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# prototype

JavaScript中的每一个对象都有一个内部属性Prototype，也称为原型。如果我们需要访问一个对象的属性或方法，但该对象本身没有定义这个属性或方法，那么JavaScript引擎就会沿着该对象的原型链向上查找，直到找到该属性或方法为止。

JavaScript中的原型可以通过以下方式来处理：

1. 构造函数（Constructor）：构造函数是一种特殊的函数，用于创建新的对象。在使用构造函数创建对象时，该对象会自动继承构造函数的原型。

```
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
```

<button>js</button>
```

2. 原型对象（Prototype Object）：每个函数都有一个prototype属性，该属性指向函数的原型对象。该原型对象包含了该函数的所有公共属性和方法。

```
```js
Person.prototype.greet = function() {
  console.log(`Hi, my name is ${this.name} and I'm ${this.age} years old.`);
};
```

<button>js</button>
```

3. 实例化对象（Instance Object）：通过new关键字调用构造函数来实例化一个新对象，该对象会自动继承构造函数的原型对象。

```
```js
const person = new Person('John Doe', 30);
person.greet(); // Hi, my name is John Doe and I'm 30 years old.
```

<button>js</button>
```

4. 原型链（Prototype Chain）：每个对象都有一个内部属性Prototype，该属性指向该对象的原型。如果一个对象的属性或方法没有被找到，JavaScript引擎会沿着该对象的原型链向上查找，直到找到该属性或方法为止。

```
```js
console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
```

<button>js</button>
```

在JavaScript中，原型和原型链是非常重要的概念。理解它们可以帮助我们更好地理解JavaScript中的面向对象编程方式，并进一步提高我们的JavaScript编程能力。

```
```js
function Role() {}

const role1 = new Role();

console.log(role1.__proto__ === Role.prototype); // true
```

<button>js</button>
```
