/*\
title: $:/plugins/oeyoews/neotw-refresh-site-cache/widget.js
type: application/javascript
module-type: widget

neotw-refresh-site-cache widget

\*/
// show cache size on button
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DivWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      /* const isPWA =
        'serviceWorker' in window.navigator &&
        navigator.serviceWorker.controller; */
      const isPWA = navigator.serviceWorker?.controller;
      const param = this.getAttribute('param', 'Clear cache');
      const classNames = this.getAttribute('class', '').split('');

      const buttonNode = $tw.utils.domMaker('button', {
        text: isPWA
          ? param
          : 'Your tiddlywiki site no register serviceWorker(not supported PWA)',
        class: isPWA ? '' : 'text-red-500 font-bold cursor-not-allowed',
        attributes: {},
        children: [],
        eventListeners: [
          {
            name: 'click',
            handlerObject: this,
            handlerMethod: isPWA ? 'handlerClick' : '',
          },
        ],
      });
      classNames.forEach(className => {
        if (className) {
          buttonNode.classList.add(className);
        }
      });
      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }

    /**
     * Refreshes the site cache by clearing the cache for each resource and shows a popup with cache size.
     *
     * @return {void}
     */
    async refreshSiteCache() {
      let cacheSize = 0;
      const cacheNames = await caches.keys();
      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        for (const request of keys) {
          const response = await cache.match(request);
          if (response) {
            const headers = response.headers.entries();
            for (const header of headers) {
              if (header[0].toLowerCase() === 'content-length') {
                cacheSize += parseInt(header[1]);
              }
            }
            await cache.delete(request);
          }
        }
      }
      const message = 'Cache cleared. Total size: ' + cacheSize + ' bytes.';
      alert(message);
      cacheSize > 0 && window.location.reload();
    }

    handlerClick = () => {
      this.refreshSiteCache();
    };
  }

  exports['refresh-site-cache'] = DivWidget;
})();
