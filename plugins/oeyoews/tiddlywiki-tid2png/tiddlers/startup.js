/*\
title: $:/plugins/oeyoews/tiddlywiki-tid2png/startup.js
type: application/javascript
module-type: startup

tid2pdf module

\*/

exports.name = 'tid2png-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  const exportPng = require('./export-png.js');
  $tw.rootWidget.addEventListener('om-export-png', (event) => {
    const {
      tiddlerTitle,
      selector,
      paramObject: { customSelector } = {}
    } = event;

    exportPng(tiddlerTitle, customSelector || selector);
  });
};
