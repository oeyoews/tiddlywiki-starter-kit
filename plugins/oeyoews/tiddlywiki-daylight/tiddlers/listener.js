/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/daylight-listener.js
type: application/javascript
module-type: library

daylight module
\*/

// matchMedit bug 浏览器支持, 但是浏览器不兼容系统;
// window.matchMedia || alert('您的浏览器不支持prefers-color-scheme媒体查询');

// 01: system: 跟随系统模式
// 02: light/dark: 跟随localStorage.theme更新

// 如果修改了配置需要重新启动才能生效, 因为配置是从文件读取的,tw不会自动更新, 如果是使用localstorage,就可以自动更新配置
localStorage.theme =
  $tw.wiki.getTiddlerText('$:/config/theme-mode') || 'system';
const currentMode = localStorage.theme;

const darkMode = window.matchMedia?.('(prefers-color-scheme: dark)');
let isDarkMode = $tw.wiki.getTiddlerText('$:/info/darkmode') === 'yes'; // let isDarkMode = darkMode?.matches;

// preset for theme and palette
// TODO: 配置ui
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

// step 01: 启动设置
function handleThemeChange(event) {
  // 这一步由于插件加载顺序的问题, 可能还没有加载nprogress,会报错, 需要手动加载
  // const NProgress = require('nprogress.min.js');
  // NProgress?.start();
  const systemMode = (event?.matches && 'dark') || 'light';
  const nextMode = currentMode === 'system' ? systemMode : currentMode;
  updateMode(nextMode);
  // NProgress?.done();
}

// step 02: 手动监听变换
function toggleMode() {
  // 需要获取到当前tiddlywiki的模式
  const nextMode = isDarkMode ? 'light' : 'dark';
  // 更新mode
  isDarkMode = !isDarkMode;
  updateMode(nextMode);
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
  checkMode: () => handleThemeChange(darkMode),
  checkModeListener,
  toggleMode,
};
