/*\
title: toggle.js
type: application/javascript
module-type: library

toggle

\*/

/**
 写一个切换html 按钮的自定义事件, 有一下要求:

  * 点击切换 html 的整体 dark 或者 light, 将value存到localStorage中
  * 不需要获取按钮元素
 */

function toggle() {
  // 获取 HTML 元素
  const htmlTag = document.documentElement;

  // 初始化主题模式
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    setTheme(currentTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }

  // 切换主题模式
  const newMode = htmlTag.classList.contains('dark') ? 'light' : 'dark';
  setTheme(newMode);

  // 将选中的主题模式保存至 Local Storage
  localStorage.setItem('theme', newMode);

  // 设置主题模式
  function setTheme(mode) {
    htmlTag.classList.remove('light', 'dark');
    htmlTag.classList.add(mode);
  }
}

module.exports = { toggle };
