/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/daylight-listener.js
type: application/javascript
module-type: library

Daylight Listener Module
\*/

// 01: system: Follow the operating system mode
// 02: light/dark: Follow user configuration updates, here it is $:config/theme-mode

// If configuration is modified, a restart is needed for it to take effect because the configuration is read from a file, and tw won't automatically update. If using localstorage, it can update the configuration automatically.
localStorage.theme =
  $tw.wiki.getTiddlerText('$:/config/theme-mode') || 'system';
const currentMode = localStorage.theme;

// Pay attention to whether the operating system supports switching between dark and light modes; in theory, it's supported everywhere (except for some Linux distributions and certain mobile platforms).

let isDarkMode = $tw.wiki.getTiddlerText('$:/info/darkmode') === 'yes'; // let isDarkMode = darkMode?.matches;

// TODO: Configure UI
// check palette if exist
// preset: Default light and dark palettes
const lightPalette = '$:/themes/nico/notebook/palettes/palette-beige';
const darkPalette = '$:/palettes/GithubDark';

function preset(event) {
  const systemMode = (event?.matches && 'dark') || 'light';
  const mode = currentMode === 'system' ? systemMode : currentMode;
  updateMode(mode);
}

function updateMode(mode) {
  document.documentElement.className = mode;
  // Palette
  const palette = mode === 'dark' ? darkPalette : lightPalette;
  $tw.wiki.setText('$:/palette', 'text', null, palette);
  // Update mode
  localStorage.theme = mode;
}

// Manually toggle light/dark
function toggleMode() {
  const NProgress = require('nprogress.min.js'); // This step may cause an error due to plugin loading order; NProgress might not be loaded yet, so manual loading is needed.
  NProgress?.start();
  // Need to get the current tiddlywiki mode
  const nextMode = isDarkMode ? 'light' : 'dark';
  // Update mode
  isDarkMode = !isDarkMode;
  updateMode(nextMode);
  NProgress?.done();
}

// Listener
function checkModeListener() {
  const darkMode = window.matchMedia?.('(prefers-color-scheme: dark)');
  preset(darkMode); // NOTE: this will change your palette
  // Pay attention to whether the browser supports window.matchMedia
  darkMode?.addEventListener?.('change', (event) => {
    const systemMode = (event?.matches && 'dark') || 'light';
    // Update mode
    if (!systemMode === 'dark') isDarkMode = false;
    // Only listen to system mode
    if (currentMode === 'system') {
      updateMode(systemMode);
    }
  });
}

module.exports = {
  checkModeListener,
  toggleMode,
};
