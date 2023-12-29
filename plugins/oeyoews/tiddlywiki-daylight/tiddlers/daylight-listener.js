/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/daylight-listener.js
type: application/javascript
module-type: library

Daylight Listener Module
\*/

// 注意：手动切换和自动切换要共享状态，与此同时还要遵循用户的配置

const config = $tw.wiki.getTiddlerData(
  '$:/plugins/oeyoews/tiddlywiki-daylight/config'
);

const { darkPalette, lightPalette } = config;

const listmode = ['system', 'light', 'dark'];
// 放置用户手动修改该数值
if (!listmode.includes(localStorage.theme)) {
  localStorage.theme = 'system';
}

// 需要浏览器和操作系统支持
const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
// 后续使用 isDarkmode 存储最新的模式，$:/info/darkmode 有一个 listener, 会自动更新，但是使用 yes/no
// let isDarkMode = $tw.wiki.getTiddlerText('$:/info/darkmode') === 'yes'; // or mediaQuery.matches
let isDarkMode = mediaQuery.matches;

/**
 * @param {string} mode 获取需要切换到的模式
 * @param {boolean} isSaveMode 是否保存到 localStorage
 */
function updateMode(mode, isSaveMode = true) {
  // support storage share
  mode = mode === 'null' ? 'system' : mode;
  if (!listmode.includes(mode)) return;
  // BUG: 如果使用 switch 会将里面的情况都过一遍，有问题
  document.documentElement.classList.remove('light', 'dark');
  let nextMode,
    nextPalette = null;

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

// TODO: 切换 system/dark/light 配置，并且刷新 theme, 配置存在 store 里面
function toggleMode() {
  const progress = $tw.NProgress;
  progress.start();

  /* if (hasSystemMode) {
    listmode.push('system');
  } */

  // 获取下一个模式 light/dark/system
  const nextMode =
    listmode[(listmode.indexOf(localStorage.theme) + 1) % listmode.length];
  updateMode(nextMode);
  progress.done();
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

  // 共享数据
  window.addEventListener('storage', function (event) {
    if (event.key === 'theme') {
      const newTheme = event.newValue;
      // 发送消息给其他页面
      window.postMessage(
        {
          type: 'localStorageUpdate',
          key: 'theme',
          value: newTheme
        },
        '*'
      );
      if (event.oldValue !== newTheme) {
        updateMode(newTheme);
      }
    }
  });
}

module.exports = {
  checkModeListener,
  toggleMode
};
