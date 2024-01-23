---
title: 'switch-case'
tags: ['JavaScript']
created: 'Sat May 27 2023 01:35:57 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
page-cover: 'https://source.unsplash.com/random?fm=blurhash&w=50&switch-case'
type: 'text/vnd.tiddlywiki'
---

# switch-case

使用 switch case 重写代码的主要思路是将 if 语句中的条件判断改为 switch case 语句中的分支判断，这样可以提高代码的可读性和可维护性。

switch case 语句是 JavaScript 中的一种流程控制语句，用于根据一个变量的值进行分支判断。switch case 语句的基本语法如下：

```
```
switch (variable) {
  case value1:
    // 当 variable 等于 value1 时执行的代码
    break;
  case value2:
    // 当 variable 等于 value2 时执行的代码
    break;
  // ...
  default:
    // 当 variable 不等于任何一个值时执行的代码
    break;
}
```
```

在这个语法中，variable 表示需要进行分支判断的变量，value1、value2 等表示每个分支的值，default 表示当变量不等于任何一个值时需要执行的代码。

switch case 语句的执行流程是先计算 variable 的值，然后与每个 case 对应的值进行比较，如果匹配成功，则执行相应的代码，直到遇到 break 关键字或者整个 switch case 语句结束。如果所有的 case 都不匹配，则执行 default 分支中的代码。

需要注意的是，在 switch case 语句中，case 后面的值可以是数字、字符串、布尔值等基本类型，也可以是对象或函数等复杂类型。另外，case 后面的值可以是常量表达式，也可以是变量和表达式的组合。

下面是一个简单的例子，展示了 switch case 语句的基本用法：

```
```
const fruit = 'apple';
switch (fruit) {
  case 'apple':
    console.log('这是一个苹果');
    break;
  case 'banana':
    console.log('这是一个香蕉');
    break;
  case 'orange':
    console.log('这是一个橘子');
    break;
  default:
    console.log('这不是一个水果');
    break;
}
```
```

在这个例子中，我们定义了一个变量 fruit，然后使用 switch case 语句对其进行分支判断，输出相应的信息。由于变量 fruit 的值为 'apple'，因此执行第一个 case 中的代码，输出 '这是一个苹果'。
