---
title: 'reduce'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sun May 28 2023 11:02:16 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# reduce

```js
const arr = [1, 22, 3];
console.log(arr.reduce((a, b) => a + b));
```

对一个数组进行求和，可以使用 JavaScript 的 `reduce()` 方法。该方法接受一个回调函数作为参数，该回调函数接受累加器和当前值作为参数，然后返回新的累加器值。

下面是一个将数组中所有元素相加的示例代码：

```javascript
const arr = [1, 2, 3, 4, 5];

const sum = arr.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(sum); // 输出 15
```

在这个例子中，我们先定义了一个数组 `arr`，它包含了一些数字。然后，我们使用 `reduce()` 方法来计算这些数字之和。我们将初始值设置为 0，并且将每个元素加到累加器上。最后，我们将计算得出的总和输出到控制台。

你也可以将 `reduce()` 函数写成更简洁的形式：

```javascript
const arr = [1, 2, 3, 4, 5];

const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log(sum); // 输出 15
```

在这个例子中，我们省略了 `return` 语句，并将箭头函数缩写为一行。

无论是哪种写法，`reduce()` 方法都是一个非常有用的数组方法，可以用于计算任何类型的累加器值，例如求和、求平均值等。

`reduce()` 是 JavaScript 数组的一个高阶函数，用于对数组中的每个元素进行累积操作，最终返回一个单一的结果。

`reduce()` 方法的语法如下：

```javascript
array.reduce(callback, initialValue)
```

参数解释：

* `callback`：一个回调函数，用于对数组中的每个元素执行操作。它可以接收四个参数：

    * `accumulator`：累积器，保存回调函数的返回值，也就是上一次回调的结果。

    * `currentValue`：当前元素的值。

    * `currentIndex`：当前元素的索引（可选）。

    * `array`：原始数组（可选）。\

回调函数必须返回一个值，该值将在下一次回调时作为累积器的值。

* `initialValue`（可选）：作为初始累积器的值。如果没有提供初始值，则使用数组的第一个元素作为初始值，并从第二个元素开始迭代。

使用 `reduce()` 方法时，它会按顺序遍历数组的每个元素，并将每个元素传递给回调函数进行处理，将处理结果作为下一次回调的输入，直到处理完所有元素并得到最终的累积结果。

下面是一个使用 `reduce()` 方法计算数组元素之和的简单示例：

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(sum); // 输出 15
```

在上面的示例中，初始累积器的值设置为 0。在每次回调中，回调函数将累积器与当前元素相加，并返回结果作为下一次回调的累积器。最终得到数组元素之和 15。

`reduce()` 方法还有其他用法，例如可以在回调函数中进行过滤、映射或其他复杂的操作来实现更多功能。它是一个非常强大和灵活的数组方法，在处理数组数据时非常有用。

reduce是JavaScript的一个数组方法，用于将数组中的元素归纳为一个单独的值。reduce方法接收一个回调函数作为参数，该回调函数接收两个参数：累加器和当前元素。在每次迭代时，回调函数都会将当前元素与累加器作为参数，并返回一个新的累加器。最终，reduce方法会返回最后一次迭代后的累加器的值。下面是一个使用reduce方法的示例：

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);

console.log(sum); // 输出：15
```

在这个示例中，我们定义了一个numbers数组，包含了一些数字。然后，我们调用了该数组的reduce方法，并传入一个回调函数作为参数。回调函数接收两个参数，accumulator表示累加器的值，current表示当前元素的值。我们在回调函数中将accumulator和current相加，并返回新的累加器的值。在调用reduce方法时，我们传入了一个初始值0作为累加器的初始值。这样，reduce方法会从数组的第一个元素开始迭代，将该元素和累加器的初始值0作为参数传递给回调函数，并返回新的累加器的值1；然后，将第二个元素2和上一次迭代的结果1作为参数传递给回调函数，并返回新的累加器的值3；接着，将第三个元素3和上一次迭代的结果3作为参数传递给回调函数，并返回新的累加器的值6；以此类推，直到迭代到最后一个元素5，返回最终的累加器的值15。最终，我们输出了累加器的值15，表示数组中所有元素的和。
