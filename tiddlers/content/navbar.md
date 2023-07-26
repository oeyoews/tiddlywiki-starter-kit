<nav class="flex items-center justify-between bg-gray-800 p-4 sticky">
  <div class="flex items-center">
    <a href="#" class="text-white text-xl font-semibold">
      <!-- 这里放置你的图标 -->
			demo
      <i class="fas fa-icon"></i>
    </a>
  </div>
  <div class="flex">
    <a href="#" class="text-gray-300 mx-2 hover:text-white">链接1</a>
    <a href="#" class="text-gray-300 mx-2 hover:text-white">链接2</a>
    <a href="#" class="text-gray-300 mx-2 hover:text-white">链接3</a>
  </div>
</nav>

`justify-between` 是 Tailwind CSS 中的一个类，用于在 Flex 容器中将项目（子元素）以两端对齐的方式排列。它会在主轴（水平方向）上将项目拉伸以填充剩余空间，并在项目之间创建平均的空间分配。

具体来说，`justify-between` 类可以用于以下场景：

1. 创建两端对齐的导航栏：将 `justify-between` 应用于导航栏容器，使导航栏中的链接或按钮分散对齐。

2. 创造两端对齐的工具栏或选项卡：将 `justify-between` 应用于工具栏或选项卡容器，使工具或选项在两端对齐，并在宽度上平均分配剩余空间。

3. 实现两端对齐的网格布局：将 `justify-between` 应用于网格容器，使网格中的单元格以两端对齐的方式布局，从而产生平均分配的效果。

这只是 `justify-between` 的一些常见用途。Tailwind CSS 提供了许多其他实用的 Flexbox 类，可用于处理布局和对齐。你可以根据自己的需求组合使用不同的类来创建灵活且强大的布局。