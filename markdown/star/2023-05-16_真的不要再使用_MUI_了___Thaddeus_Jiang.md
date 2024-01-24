---
title: '2023-05-16_真的不要再使用_MUI_了___Thaddeus_Jiang'
tags: ['剪藏']
type: 'text/plain'
created: 'Wed Nov 22 2023 10:31:01 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://thaddeusjiang.com/2023-05-16-zhen-de-bu-yao-zai-shi-yong-mui-liao'
---

# 2023-05-16_真的不要再使用_MUI_了___Thaddeus_Jiang

```
我不是针对 MUI，我是说所有巨型 UI components framework 都是垃圾。发自内心的呐喊，各位在做 web frontend 项目时，真的不要再用巨型的 UI components framework 了，如：mui、antd 之类的。真的太难用了。推荐采用 Tailwind CSS 的 UI components library，并且一定要确认覆盖默认风格也是使用 CSS。如果一个 UI components library 需要编写很多 JS 才能覆盖默认风格，千万不要使用。有很多例子，分享一个刚刚对应的 UI 需求。如果你想要修改 Dialog components 的边框的圆角大小，MUI 需要你写一大堆代码。并且这些都是 MUI 专用的 API，不通用，对你的技术没有任何成长。// 1. 引入 createTheme, ThemeProvider
import { createTheme, ThemeProvider } from '@mui/material/styles';

// 2. 创建新的 theme，并且你必须知道如何精确覆盖 paper.borderRadius

const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "12px", // 自定义边框半径
        },
      },
    },
  },
});

// 3. 使用 ThemeProvider 包裹 Dialog
<ThemeProvider theme={theme}>
  <Dialog open={true}>
    {/* 对话框内容 */}
  </Dialog>
</ThemeProvider>优秀的 UI Components library 应该怎么做？通常只需要追加一个 CSS class 即可，形如：<Dialog class="rounded-2xl">
    {/* 对话框内容 */}
</Dialog>ConclusionMUI is too bad, recommend to try daisyUI.ref: 2021-04-02 永远不要再使用巨型 UI 框架了
```
