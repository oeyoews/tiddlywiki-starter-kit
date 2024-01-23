---
title: 'Head-Stack'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Thu Dec 28 2023 08:34:28 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# Head-Stack

在JavaScript中，堆（Heap）和栈（Stack）是两个主要的内存区域，用于存储不同类型的数据。

1. **堆（Heap）：**

    * 堆是动态分配的内存区域，用于存储引用类型的数据，如对象和数组。

    * 对象和数组等复杂的数据结构存储在堆中。

    * 在堆上分配的内存需要手动释放，否则可能导致内存泄漏。

1. **栈（Stack）：**

    * 栈是一种静态分配的内存区域，用于存储基本类型的数据和引用类型的指针。

    * 基本类型的数据，例如数字、布尔值、字符串等，存储在栈上。

    * 函数调用时，栈用于存储函数的局部变量、参数和返回地址。

在JavaScript中，基本类型（如数字、布尔值、字符串、undefined、null）存储在栈上，而引用类型（如对象和数组）的实际数据存储在堆上，而栈中存储的是指向堆中实际数据的引用。

下面是一个简单的例子，演示了栈和堆的使用：

```javascript
// 栈中存储基本类型数据
let num = 10;
let bool = true;
let str = "Hello";

// 堆中存储引用类型数据
let obj = { key: "value" };
let arr = [1, 2, 3];

// 函数调用时，栈用于存储局部变量
function example() {
  let localVar = "I am a local variable";
  // ...
}

// 调用函数
example();
```

请注意，以上只是简单的示例，实际上JavaScript的内存管理是由JavaScript引擎负责的，开发者无需手动管理内存。
