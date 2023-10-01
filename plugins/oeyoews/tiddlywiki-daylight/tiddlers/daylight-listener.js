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

const { darkPalette, lightPalette, system } = config;

if (!localStorage.theme) {
  localStorage.theme = system;
}

// 需要浏览器和操作系统支持
const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
// 后续使用 isDarkmode 存储最新的模式, $:/info/darkmode 有一个listener, 会自动更新, 但是使用yes/no
// let isDarkMode = $tw.wiki.getTiddlerText('$:/info/darkmode') === 'yes'; // or mediaQuery.matches
let isDarkMode = mediaQuery.matches;

function updateMode(mode, store = true) {
  document.documentElement.classList.toggle('dark', mode === 'dark');
  const palette = mode === 'dark' ? darkPalette : lightPalette;
  $tw.wiki.setText('$:/palette', 'text', null, palette);
  // 随着系统模式切换, 不需要更新localstorage
  if (store) {
    localStorage.theme = mode;
  }
}

// TODO: 切换system/dark/light 配置, 并且刷新theme, 配置存在localstorage里面
const NProgress = require('nprogress.min.js'); // This step may cause an error due to plugin loading order; NProgress might not be loaded yet, so manual loading is needed.
// TODO: 添加一个参数， 是2/3色转换
function toggleMode() {
  NProgress?.start();

  const listmode = ['system', 'light', 'dark'];

  /* if (hasSystemMode) {
    listmode.push('system');
  } */

  // 需要考虑localStorage.theme = 'system'的情况
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
