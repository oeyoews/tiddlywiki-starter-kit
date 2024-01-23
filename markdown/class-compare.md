---
title: 'class-compare'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed May 24 2023 10:17:43 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# class-compare

> [ref](https://www.bilibili.com/video/BV1UX4y1C7gQ/?spm_id_from=333.788&vd_source=d6afd7eedd9f9c940321c63f0a1539e3)

```js
const Person = function (name, age) {
  this.name = name;
  this.age = age;
};
Person.prototype.greeting = function () {
  console.log(`Hi, my name is ${this.name}`);
};

class P {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greeting() {
    console.log(`Hi, my name is ${this.name}`);
  }
}

const person1 = new Person("John", 30);
console.log(person1.age);
person1.greeting();
const p = new P("John", 30);
console.log(p.age);
p.greeting();
```
