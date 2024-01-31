---
title: 'floor-parseInt'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Sat Jan 20 2024 16:01:40 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# floor-parseInt

```
graph TD;
    parseInt((parseInt))-->|字符串转整数| num[整数];
    floor((floor))-- 向下取整 -->roundedDown[最接近的整数];

    subgraph parseInt函数
        parseInt -->  num
    end

    subgraph floor函数
        floor -->  roundedDown
    end
```

parseInt 是向 0 取整，Math.floor 是向下取整 2.5 -> 2 -2.5 -> -3(接近整数即可，不论正负号)

:::note\

在正数范围上, 取值结果一致.\

:::
