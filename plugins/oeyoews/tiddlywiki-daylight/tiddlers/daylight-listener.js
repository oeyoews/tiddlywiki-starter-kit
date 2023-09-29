/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/daylight-listener.js
type: application/javascript
module-type: library

Daylight Listener Module
\*/

// 注意: 手动切换和自动切换要共享状态,与此同时还要遵循用户的配置

const { darkPalette, lightPalette, system } = $tw.wiki.getTiddlerDataCached(
  '$:/plugins/oeyoews/tiddlywiki-daylight/config.json',
);

localStorage.theme = system;

const currentMode = localStorage.theme;

// 需要浏览器和操作系统支持
const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
// 后续使用 isDarkmode 存储最新的模式
let isDarkMode = $tw.wiki.getTiddlerText('$:/info/darkmode') === 'yes'; // or mediaQuery.matches

function preset() {
  const systemMode = isDarkMode ? 'dark' : 'light';
  const mode = currentMode === 'system' ? systemMode : currentMode;
  updateMode(mode);
}

function updateMode(mode) {
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
  preset(mediaQuery);
  mediaQuery?.addEventListener?.('change', () => {
    const systemMode = mediaQuery.matches ? 'dark' : 'light';
    if (systemMode !== 'dark') {
      isDarkMode = false;
    } else {
      isDarkMode = true;
    }
    if (currentMode === 'system') {
      updateMode(systemMode);
    }
  });
}

module.exports = {
  checkModeListener,
  toggleMode,
};
