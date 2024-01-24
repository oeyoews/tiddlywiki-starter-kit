---
title: '虚拟列表___LeeZhian_Blog'
tags: ['剪藏']
type: 'text/markdown'
created: 'Fri Dec 01 2023 11:32:55 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://www.leezhian.com/web/base/virtual-scroll'
---

# 虚拟列表___LeeZhian_Blog

## 虚拟列表 ​

在渲染大数据列表的时候，如果一次性进行渲染，可能会导致页面卡顿或者空白。在不使用分页的情况下，主要展示优化有两种：**时间分片和虚拟列表**。

> **时间分片就是把大数据分成一小部分数据，进行延时循环渲染。**

**虚拟列表则是，根据容器元素的高度以及列表项元素的高度来显示长列表数据中的某一个部分。而不是完整地渲染长列表。简单来说就是 按需显示。**

这里主要讲的是虚拟列表。

## 实现思想 ​

根据上文所说，**虚拟列表是根据容器元素的高度以及列表项元素的高度来显示长列表数据中的某一个部分。**

因此这里先提几个概念：

* **滚动容器元素**

手写过轮播图的应该都知道清楚。之所以产生滚动，是内部元素 A 高度或宽度超过了外部元素 C 的高度或宽度，产生纵向或横线滚动，此时外部元素称为滚动容器元素。比如：我们可以视为浏览器就是一个滚动容器元素（指可滚动时）。

* **可滚动区域**

滚动容器元素的内部区域。如上概念例子的内部元素 A。假如内部元素中有 100 条列表项，每条为`50px`，则可滚动区域为 `100 * 50px`。

* **可视区域**

滚动容器元素的视角可见区域。如果容器为 window 对象，则可视区域就是为视口的大小。如果有一个滚动容器元素 div 高度是 `100px` 的话，则可视区域就是 `100px`。

根据概念，所以在处理用户滚动的时候，我们首先要得知一下数值。

* 计算当前可视区域**起始数据**的 `startIndex`

* 计算当前可视区域**结束数据**的 `endIndex`

* 计算当前可视区域的**渲染数据** `visibleData`，即 `startIndex` 到 `endIndex` 的数据

* 计算 `startIndex` 对应的数据在整个列表中的**偏移位置** `startOffset`

* 计算 `endIndex` 对应的数据在整个列表中的偏移位置 `endOffset`

如图：

![](https://oss.leezhian.top/images/202305/fe9564e669f7113c51fe73b56fa0bb36.png)

## 列表项高度为固定值的实现 ​

**PS：这里使用的是 React 来实现**。因为只为了快速实现这功能，所有案例代码可能不太规范。

此案例使用的是 window 作为滚动容器元素。实际是因为 滚动容器元素 的高度和宽度与视口相同。

**index.less**

less

```
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.list-box {
  height: 100%;
  overflow-y: scroll;
}

.list-item {
  height: 50px;
}
```

**index.jsx**

首先会初始化一系列数据，如`startIndex` 等。设置监听器，监听滚动事件。当触发滚动事件时，重新求出 `startIndex`、`endIndex`、`startOffset`、`endOffset` 以及 可视区域的数据 `visibleData`。这里需要注意的是 `endIndex` 和 `endOffset`的取值范围。

![](https://oss.leezhian.top/images/202305/84be22e1a9b023760960b78826b1ebd9.png)

jsx

```
import React, { useEffect, useMemo, useState } from 'react';
import ListItem from "./component/ListItem";
import styles from './index.less';

// 测试数据 start
let arr = new Array(1000).fill(0);
arr = arr.map((item, index) => {
  return index;
})
// 测试数据 end

function List() {
  let doc = null; // 滚动容器元素

  const bufferSize = 5; // 缓存条数
  const itemHeight = 50; // 固定列表项的高度
  const listBoxHeight = window.innerHeight; // 可视区域
  // const listHeight = arr.length * itemHeight; // 滚动区域
  const visibleCount = Math.ceil(listBoxHeight / itemHeight) + bufferSize; // 可视条数
  let startIndex = 0; // 起始条目索引
  let endIndex = visibleCount; // 末尾条目索引

  const [visibleData, setVisibleData] = useState(arr.slice(startIndex, endIndex)); // 可视数据
  const [startOffset, setStartOffset] = useState(0); // startIndex 偏移值
  const [endOffset, setEndOffset] = useState((arr.length - endIndex) * itemHeight) // endIndex 偏移值

  // 滚动监听
  function handleScroll() {
    if (!doc) {
      doc = window.document.body.scrollTop ? window.document.body : window.document.documentElement
    }
    const scrollTop = doc.scrollTop // 当前滚动高度

    startIndex = Math.floor(scrollTop / itemHeight); // 向下取整 求出当前应该要显示的startIndex
    endIndex = startIndex + visibleCount >= arr.length ? arr.length : startIndex + visibleCount; // 求出最后的index，并做限制
    updateVisibleData();
  }

  // 更新数据
  function updateVisibleData() {
    const visibleData = arr.slice(startIndex, endIndex); // 更新可视区域的数据
    setStartOffset(startIndex * itemHeight);
    setEndOffset((arr.length - endIndex) * itemHeight);
    setVisibleData(visibleData)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false)

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className={ styles['list-box'] }>
      <div style={ { paddingTop: startOffset, paddingBottom: endOffset } }>
        {
          visibleData.map((item, index) => <ListItem  num={ item } key={ index }/>)
        }
      </div>
    </div>
  );
}

export default List
```

**ListItem.jsx**

jsx

```
import React from 'react';
import styles from '../index.less';

function ListItem(props) {
  const { num } = props;

  return (
    <div className={ styles['list-item'] }>
      <div>NO.{ num }, OH MY GOD</div>
      <div>怎么有这么帅的男人</div>
    </div>
  )
}

export default ListItem;
```
