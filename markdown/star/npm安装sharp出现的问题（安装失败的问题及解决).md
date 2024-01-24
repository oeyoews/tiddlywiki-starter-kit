---
title: 'npm安装sharp出现的问题（安装失败的问题及解决)'
tags: ['剪藏']
type: 'text/markdown'
created: 'Fri Nov 03 2023 10:21:16 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: 'oeyoews'
url: 'https://blog.csdn.net/weixin_53737663/article/details/128958712'
---

# npm安装sharp出现的问题（安装失败的问题及解决)

:::warning sharp bug\

使用 Windows 开发，你遇到的 bug 数量将会是以前的十倍以上。\

:::

#### <>npm 安装 sharp 库出现的问题及解决

* npm 安装 sharp 出现的问题及解决：

Buffer 的使用以及对图片的操作（通过 sharp 库对图片进行操作）

## <><>npm 安装 sharp 出现的问题及解决：

![](https://img-blog.csdnimg.cn/eaf7aeb9ee9845aba1e6463bfd88d727.png#pic_center)

* 在使用 npm 安装 sharp 一直安装不成功。后面发现安装 sharp 需要依赖 libvips，然后通过查看 npm 路径下的_libvips 文件夹确实为空。（可通过 npm config get cache 查询自己的 npm 存放路径）

* 后面尝试自己下载 libvips 的安装包，然后在进行安装，发现也还是不行。

* 最后我是通过修改镜像终于安装成功。

* 使用镜像地址（仅设置 sharp）：

```
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
```

```
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
```

**sharp 是基于 libvips 的封装，所以在安装的时候会去下载 libvips 的本体，所以最好提前配置好镜像源。**

![](https://img-blog.csdnimg.cn/a610326ec63740718164b69940a82cc1.png)
