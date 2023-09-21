/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/daylight-listener.js
type: application/javascript
module-type: library

daylight module
\*/

// 总共分为两个阶段, 启动时候设置的主题, 和监听系统主题

// TODO: set localstorage

// window.matchMedia || alert('您的浏览器不支持prefers-color-scheme媒体查询');
// 浏览器支持, 但是浏览器不兼容系统;

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
  // TODO
  // document.documentElement.style.animation = 'expand 0.5s ease-in-out';
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(mode);
  // bug
  // document.body.classList.toggle(mode);
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
  // 这一步由于插件加载顺序的问题, 可能还没有加载nprogress
  // const NProgress = require('nprogress.min.js');
  // NProgress.start();
  if (currentMode === 'auto') {
    const autoMode = (event.matches && 'dark') || 'light';
    setPalette(autoMode);
    setThemeMode(autoMode);
  } else {
    setPalette(currentMode);
    setThemeMode(currentMode);
  }
 // NProgress.done();
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
