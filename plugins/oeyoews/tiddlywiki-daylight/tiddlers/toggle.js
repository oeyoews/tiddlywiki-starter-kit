/*\
title: toggle.js
type: application/javascript
module-type: library

toggle
\*/

const htmlTag = document.documentElement;

function setTheme(mode) {
  htmlTag.classList.remove('light', 'dark');
  htmlTag.classList.add(mode);
}

function toggle() {
  /* const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    setTheme(currentTheme);
  } else  */
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }

  // 切换主题模式
  const newMode = htmlTag.classList.contains('dark') ? 'light' : 'dark';
  setTheme(newMode);

  // 将选中的主题模式保存至 Local Storage
  // localStorage.setItem('theme', newMode);
}

module.exports = { toggle, setTheme };
