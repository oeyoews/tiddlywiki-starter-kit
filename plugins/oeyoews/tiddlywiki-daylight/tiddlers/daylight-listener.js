/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/daylight-listener.js
type: application/javascript
module-type: library

daylight listener module
\*/

// 01: system: 跟随操作系统模式
// 02: light/dark: 跟随用户配置更新, 这里是 $:config/theme-mode

// 如果修改了配置需要重新启动才能生效, 因为配置是从文件读取的,tw不会自动更新, 如果是使用localstorage,就可以自动更新配置
localStorage.theme =
  $tw.wiki.getTiddlerText('$:/config/theme-mode') || 'system';
const currentMode = localStorage.theme;

// 注意操作系统是否支持切换系统的暗亮模式, 理论上都支持(Linux 的各种发行版和个别移动端除外)

// 注意浏览器是否支持 window.matchMedia
const darkMode = window.matchMedia?.('(prefers-color-scheme: dark)');
let isDarkMode = $tw.wiki.getTiddlerText('$:/info/darkmode') === 'yes'; // let isDarkMode = darkMode?.matches;

// TODO: 配置ui
// preset: 默认的浅色和深色调色板
const lightPalette = '$:/themes/nico/notebook/palettes/palette-beige';
const darkPalette = '$:/palettes/GithubDark';

function updateMode(mode) {
  // document.documentElement.style.animation = 'expand 0.5s ease-in-out';
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(mode);
  // palette
  const palette = mode === 'dark' ? darkPalette : lightPalette;
  $tw.wiki.setText('$:/palette', 'text', null, palette);
  // update mode
  localStorage.theme = mode;
}

// 手动切换light/dark
function toggleMode() {
  const NProgress = require('nprogress.min.js'); // 这一步由于插件加载顺序的问题, 可能还没有加载nprogress,会报错, 需要手动加载
  NProgress?.start();
  // 需要获取到当前tiddlywiki的模式
  const nextMode = isDarkMode ? 'light' : 'dark';
  // 更新mode
  isDarkMode = !isDarkMode;
  updateMode(nextMode);
  NProgress?.done();
}

// 监听
function checkModeListener() {
  darkMode.addEventListener('change', (event) => {
    const systemMode = (event?.matches && 'dark') || 'light';
    // 更新mode
    if (!systemMode === 'dark') isDarkMode = false;
    // 仅仅监听跟随系统
    if (currentMode === 'system') {
      updateMode(systemMode);
    }
  });
}

module.exports = {
  checkModeListener,
  toggleMode,
};
