---
title: 'getElementById querySelector'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed Jan 31 2024 10:03:20 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# getElementById querySelector

在性能方面，通常来说，`getElementById` 的效率会比 `querySelector` 更高。这是因为 `getElementById` 是针对特定ID进行查找的，而且在实现上通常会使用更优化的算法。相比之下，`querySelector` 是一个通用的选择器，可以通过任何CSS选择器来查找元素，因此它的实现会更加复杂，可能会涉及更多的计算。

所以，如果你只是需要通过ID获取元素，那么 `getElementById` 会是更好的选择，因为它更直接，更高效。而如果你需要使用更复杂的选择器来获取元素，那么 `querySelector` 可能是更合适的选择，尤其是当你需要使用类名、属性等选择器时。
