/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/daylight-listener.js
type: application/javascript
module-type: library

Daylight Listener Module
\*/

localStorage.theme =
  $tw.wiki.getTiddlerText('$:/config/theme-mode') || 'system'; // 如果修改配置, 重启生效
const currentMode = localStorage.theme;

// 需要浏览器和操作系统支持
let isDarkMode = $tw.wiki.getTiddlerText('$:/info/darkmode') === 'yes'; // let isDarkMode = darkMode?.matches;

// 配置默认调色板
const lightPalette = '$:/themes/nico/notebook/palettes/palette-beige';
const darkPalette = '$:/palettes/GithubDark';

function preset(event) {
  const systemMode = (event?.matches && 'dark') || 'light';
  const mode = currentMode === 'system' ? systemMode : currentMode;
  updateMode(mode);
}

function updateMode(mode) {
  // 使用toggle,第一次需要多按一次,也可以remove, add
  document.documentElement.classList.toggle('dark', mode === 'dark');
  const palette = mode === 'dark' ? darkPalette : lightPalette;
  $tw.wiki.setText('$:/palette', 'text', null, palette);
  localStorage.theme = mode;
}

function toggleMode() {
  const NProgress = require('nprogress.min.js'); // This step may cause an error due to plugin loading order; NProgress might not be loaded yet, so manual loading is needed.
  NProgress?.start();
  const nextMode = isDarkMode ? 'light' : 'dark';
  isDarkMode = !isDarkMode;
  updateMode(nextMode);
  NProgress?.done();
}

function checkModeListener() {
  const darkMode = window.matchMedia?.('(prefers-color-scheme: dark)');
  preset(darkMode); // NOTE: this will change your palette
  darkMode?.addEventListener?.('change', (event) => {
    const systemMode = (event?.matches && 'dark') || 'light';
    if (!systemMode === 'dark') isDarkMode = false;
    if (currentMode === 'system') {
      updateMode(systemMode);
    }
  });
}

module.exports = {
  checkModeListener,
  toggleMode,
};
