/*\
title: $:/plugins/oeyoews/tiddlywiki-widgets/widget/loadtime
type: application/javascript
// module-type: widget

loadtime
\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  // Interactive DOM not available when generating static pages
  if (!$tw.browser) return;
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class LoadTimeWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.loadTimeSpan = null;
      this.isUpdating = false;
      this.handleLoad = this.handleLoad.bind(this);
      this.updateTime = this.updateTime.bind(this);
    }

    handleLoad() {
      if (this.isUpdating && this.loadTimeSpan) {
        const loadTime = Date.now() - performance.timing.navigationStart;
        this.loadTimeSpan.textContent = `This page takes ${loadTime}ms to load`;
        console.log(`Load time updated: ${loadTime}ms`);
        this.isUpdating = false;
      }
    }

    updateTime() {
      this.isUpdating = true;
      console.log('Load time updating...');
      requestAnimationFrame(this.updateTime);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.loadTimeSpan = this.document.createElement('center');
      this.loadTimeSpan.textContent = 'Loading page ...';
      this.loadTimeSpan.className = 'hitokoto';
      parent.insertBefore(this.loadTimeSpan, nextSibling);
      this.domNodes.push(this.loadTimeSpan);

      window.addEventListener('load', this.handleLoad);
      requestAnimationFrame(this.updateTime);
    }

    refresh() {
      return false;
    }

    detach() {
      window.removeEventListener('load', this.handleLoad);
    }
  }

  exports.loadtime = LoadTimeWidget;
  exports.platforms = ['browser'];
})();
