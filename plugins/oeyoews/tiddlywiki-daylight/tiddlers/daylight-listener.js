/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/daylight-listener.js
type: application/javascript
module-type: library

Daylight Listener Module
\*/

// 注意: 手动切换和自动切换要共享状态,与此同时还要遵循用户的配置

const config = $tw.wiki.getTiddlerData(
  '$:/plugins/oeyoews/tiddlywiki-daylight/config',
);

const { darkPalette, lightPalette } = config;

// if theme is empty，setup to system
localStorage.theme = localStorage.theme || 'system';

// 需要浏览器和操作系统支持
const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
// 后续使用 isDarkmode 存储最新的模式, $:/info/darkmode 有一个listener, 会自动更新, 但是使用yes/no
// let isDarkMode = $tw.wiki.getTiddlerText('$:/info/darkmode') === 'yes'; // or mediaQuery.matches
let isDarkMode = mediaQuery.matches;

/**
 * @param {string} mode 获取需要切换到的模式
 * @param {boolean} isSaveMode 是否保存到localStorage
 */
function updateMode(mode, isSaveMode = true) {
  // BUG: 如果使用switch 会将里面的情况都过一遍， 有问题
  document.documentElement.classList.remove('light', 'dark');
  let nextMode, nextPalette;

  if (mode === 'system') {
    nextMode = mediaQuery.matches ? 'dark' : 'light';
  }

  document.documentElement.classList.add(nextMode || mode);

  const nextPaletteMode = nextMode || mode;

  nextPalette = nextPaletteMode === 'light' ? lightPalette : darkPalette;

  $tw.wiki.setText('$:/palette', 'text', null, nextPalette);
  // change event dont need storage
  if (isSaveMode) {
    localStorage.theme = nextMode ? 'system' : mode;
  }
}

// TODO: 切换system/dark/light 配置, 并且刷新theme, 配置存在store里面
const NProgress = require('nprogress.min.js'); // This step may cause an error due to plugin loading order; NProgress might not be loaded yet, so manual loading is needed.

function toggleMode() {
  NProgress?.start();

  const listmode = ['system', 'light', 'dark'];

  /* if (hasSystemMode) {
    listmode.push('system');
  } */

  // 获取下一个模式light/dark/system
  const nextMode =
    listmode[(listmode.indexOf(localStorage.theme) + 1) % listmode.length];
  updateMode(nextMode);
  NProgress?.done();
}

function preset() {
  const systemMode = isDarkMode ? 'dark' : 'light';
  const mode =
    localStorage.theme === 'system' ? systemMode : localStorage.theme;
  updateMode(mode, false);
}

function checkModeListener() {
  preset(mediaQuery);
  mediaQuery?.addEventListener?.('change', () => {
    const systemMode = mediaQuery.matches ? 'dark' : 'light';
    if (localStorage.theme === 'system') {
      updateMode(systemMode, false);
    }
  });
}

module.exports = {
  checkModeListener,
  toggleMode,
};
