---
title: 'debounce-throttle'
tags: ['JavaScript']
type: 'text/markdown'
created: 'Wed Apr 12 2023 10:44:00 GMT+0000 (GMT)'
creator: 'oeyoews'
modifier: 'oeyoews'
---

# debounce-throttle

```
graph LR;
    A[用户输入事件] -->|触发事件处理函数| B[执行事件处理函数]
    B -->|设置计时器| C{计时器是否到期}
    C -- 是 --> D[执行事件处理函数, 更新定时器]
    C -- 否 --> E[等待]
```

> <https://www.bilibili.com/video/BV1dv4y117mY/?spm_id_from=333.788&vd_source=d6afd7eedd9f9c940321c63f0a1539e3>
> 
> <https://www.cnblogs.com/aurora-ql/p/13757733.html>

闭包的典型应用就是函数防抖(重新开始)和节流(不要打断我)

> 搜索框输入, 文本实时保存(定时器实现)

> 快速点击, 鼠标滑动, 下拉加载, scroll, resize, 视频播放记录时间

函数防抖（debounce）\

函数防抖，就是指触发事件后，在 n 秒后只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数的执行时间。

简单的说，当一个动作连续触发，只执行最后一次。

打个比方，坐公交，司机需要等最后一个人进入才能关门。每次进入一个人，司机就会多等待几秒再关门。

函数节流（throttle）\

限制一个函数在一定时间内只能执行一次

举个例子，乘坐地铁，过闸机时，每个人进入后3秒后门关闭，等待下一个人进入
