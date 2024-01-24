---
title: '如何高性能渲染十万条数据？___LeeZhian_Blog'
tags: ['剪藏']
type: 'text/markdown'
created: 'Fri Dec 01 2023 11:32:02 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://www.leezhian.com/web/base/list-render'
---

# 如何高性能渲染十万条数据？___LeeZhian_Blog

## 如何高性能渲染十万条数据？ ​

当我们遇到需要渲染大量数据时，如果一次性进行渲染，往往可能会出现页面卡顿现象。\

所以，**一般有两种解决方法**：

* 时间分片

* [虚拟列表](https://www.leezhian.com/web/base/virtual-scroll)（or 分页）

这里主要介绍时间分片方法。

**涉及的知识**：

* `setTimeout`

* event loop

**主要思路是：将一组大数据，进行定时循环分片渲染，直到渲染完毕。比如吃包子，一小口一小口吃，直到吃完，而不是一口一个大包子，小心咽不下。**

提一下，为什么与 event loop 有关呢？因为 JS 的运行是先把所有微任务执行完毕后，再从栈中取下一个宏任务，当宏任务执行完毕，检查该宏任务是否有微任务，如果有则执行，反之继续取下一个宏任务，一直循环，直到栈被清空。而 `setTimeout` 则为宏任务。\

所以 `setTimeout` 设置的时间实际是有偏差的。我提这个实际与时间分片关系不大，主要是如果想要更好的渲染效果，下文提到附加项。

**例：**\

利用 `slice` 每次截取一段数据，利用 `setTimeout` 定时执行一次，直到所有数据渲染完成。（PS：思路是这样的，但不一定与我相同的实现方法）

html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
<ul id="list"></ul>

<script>
  const ul = document.getElementById('list');
  const arr = new Array(100000).fill(0);

  function render(list, ele) {
    for (let i = 0; i < list.length; i++) {
      ul.appendChild(ele(i));
    }
  }

  function createLi(text) {
    const li = document.createElement('li');
    li.innerHTML = text;

    return li
  }

  let loop = (function (data, count) {
    const d = data;
    const c = count;
    let start = 0;
    const pageCount = Math.ceil(d.length / count);
    return function() {
      setTimeout(() => {
        const list = d.slice(start * c, start * c + c);
        render(list, createLi)
        start += 1;
        if (start < pageCount) {
          arguments.callee()
        }
      }, 0);
    }
  })(arr, 20)

  loop();
  loop = null;
</script>
</body>
</html>
```

**附加**：\

还可以使用 `window.requestAnimationFrame()` 来代替 `setTimeout` ，此方法为要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
