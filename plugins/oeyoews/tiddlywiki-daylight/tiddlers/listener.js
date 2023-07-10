/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/daylight-listener.js
type: application/javascript
module-type: library

daylight module
\*/

const darkMode = window.matchMedia?.('(prefers-color-scheme: dark)');
// const isDarkMode = darkMode?.matches;
let isDarkMode = $tw.wiki.getTiddlerText('$:/info/darkmode');
isDarkMode === 'yes' ? (isDarkMode = true) : (isDarkMode = false);
const currentPalette = $tw.wiki.getTiddlerText('$:/palette');
const notebookPalette = '$:/themes/nico/notebook/palettes/palette-beige';
const githubDark = '$:/palettes/GithubDark';

// 检测浏览器是否支持prefers-color-scheme媒体查询
isDarkMode && console.log('💻 操作系统当前处于 🌕 深色模式');

function setThemeMode(mode) {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(mode);

  const tips = mode === 'dark' ? '🌜深色' : '🌅 浅色';
  console.log(`🌈 Theme 切换到了 ${tips}模式`);
}

function setPalette(mode) {
  $tw.wiki.setText('$:/palette', 'text', null, mode);
  const tips = mode === githubDark ? '🌜GithubDark' : '🌅 Notebook';
  console.log(`🎨 Palette 切换到了 ${tips}`);
}

isDarkMode && setPalette(githubDark);
isDarkMode && setThemeMode('dark');

function handleThemeChange(event) {
  setThemeMode((event.matches && 'dark') || 'light');
  setPalette((event.matches && githubDark) || notebookPalette);
}

darkMode.addEventListener('change', handleThemeChange);
