/*\
title: $:/plugins/oeyoews/tiddlywiki-medius-zoom/startup.js
type: application/javascript
module-type: startup

zoomjs
\*/

('use strict');
module.exports = {
  ...module.exports,
  name: 'medius-zoom-startup-hook',
  platforms: ['browser'],
  after: ['load-modules'],
  synchronous: !0,
  startup: () => {
    try {
      const mediumZoom = require('medium-zoom.min.js');
      // CSS selector
      mediumZoom('[data-zoomable]', {
        margin: 24,
        background: '#BADA55',
        scrollOffset: 0,
        container: '#zoom-container',
        template: '#zoom-template',
      });

      // HTMLElement
      mediumZoom(document.querySelector('#cover'));

      // NodeList
      mediumZoom(document.querySelectorAll('[data-zoomable]'));

      // Array
      const images = [
        document.querySelector('#cover'),
        ...document.querySelectorAll('[data-zoomable]'),
      ];

      mediumZoom(images);
    } catch (r) {
      console.error(r);
    }
  },
};
