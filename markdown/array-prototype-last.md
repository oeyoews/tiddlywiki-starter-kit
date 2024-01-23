---
title: 'array-prototype-last'
tags: ['JavaScript']
created: 'Sat May 27 2023 16:17:34 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
type: 'text/vnd.tiddlywiki'
---

# array-prototype-last

```
```js
/**
 * link: https://leetcode.cn/problems/array-prototype-last/
 * Order: 2619
 * Type: Javascript
 * Description:
 * 	Write code that enhances all arrays such that you can call the array.last() method on any array and it will return the last element. If there are no elements in the array, it should return -1.
 * 	请你编写一段代码实现一个数组方法，使任何数组都可以调用 array.last() 方法，这个方法将返回数组最后一个元素。如果数组中没有元素，则返回 -1 。
 */

Array.prototype.last = function () {
    if (this.length === 0) { return -1; }
    else {
        return this[this.length - 1];
    }
};

/**
 * const arr = [1, 2, 3];
 * arr.last(); // 3
 */
```

<button>js</button>
```
