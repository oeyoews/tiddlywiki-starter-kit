/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/daylight-listener.js
type: application/javascript
module-type: library

daylight module
\*/

// 总共分为两个阶段, 启动时候设置的主题, 和监听系统主题

// TODO: set localstorage

// pagecontrol, like three notebookPalette
const currentMode = 'auto'; // dark || light || auto

const darkMode = window.matchMedia?.('(prefers-color-scheme: dark)');
// const isDarkMode = darkMode?.matches;
let isDarkMode = $tw.wiki.getTiddlerText('$:/info/darkmode');
isDarkMode === 'yes' ? (isDarkMode = true) : (isDarkMode = false);
const lightPalette = '$:/themes/nico/notebook/palettes/palette-beige';
const darkPalette = '$:/palettes/GithubDark';

// 检测浏览器是否支持prefers-color-scheme媒体查询
isDarkMode && console.log('💻 操作系统当前处于 🌕 深色模式');

function toggleMode() {
  const currentStorageMode = localStorage.theme;
  const nextMode = currentStorageMode === 'dark' ? 'light' : 'dark';
  setThemeMode(nextMode);
  setPalette(nextMode);
}

function setThemeMode(mode) {
  // document.documentElement.classList.remove('light', 'dark');
  // document.documentElement.classList.add(mode);
  document.body.classList.toggle(mode);
  localStorage.theme = mode;

  const tips = mode === 'dark' ? '🌜深色' : '🌅 浅色';
  console.log(`🌈 Theme 切换到了 ${tips}模式`);
}

function setPalette(mode) {
  const palette = mode === 'dark' ? darkPalette : lightPalette;
  const tips = mode === 'dark' ? '🌜GithubDark' : '🌅 Notebook';
  $tw.wiki.setText('$:/palette', 'text', null, palette);
  console.log(`🎨 Palette 切换到了 ${tips}`);
}

function handleThemeChange(event) {
  NProgress.start();
  if (currentMode === 'auto') {
    const autoMode = (event.matches && 'dark') || 'light';
    setPalette(autoMode);
    setThemeMode(autoMode);
  } else {
    setPalette(currentMode);
    setThemeMode(currentMode);
  }
  NProgress.done();
}

function checkModeListener() {
  darkMode.addEventListener('change', handleThemeChange);
}

function checkMode() {
  handleThemeChange(darkMode);
}

module.exports = {
  checkMode,
  checkModeListener,
  toggleMode,
};
