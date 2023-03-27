/*\
title: $:/plugins/oeyoews/tiddlywiki-widgets/widget/fps
type: application/javascript
// module-type: widget

fps widget
\*/
(function () {
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class FPSWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.fpsPanel = null;
      this.showFPS = this.showFPS.bind(this);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      const fpsPanel = this.document.createElement('center');
      fpsPanel.className = 'o-fps';
      parent.insertBefore(fpsPanel, nextSibling);
      this.domNodes.push(fpsPanel);
      this.fpsPanel = fpsPanel;
      this.showFPS();
    }

    showFPS() {
      const requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };

      let fps = 0;
      let last = Date.now();
      const step = () => {
        const offset = Date.now() - last;
        fps += 1;
        if (offset >= 1000) {
          last += offset;
          this.appendFps(fps);
          fps = 0;
        }
        requestAnimationFrame(step);
      };

      this.appendFps = fps => {
        if (this.fpsPanel) {
          this.fpsPanel.innerHTML = 'Current FPS is ' + fps + ' FPS';
        }
      };

      step();
    }

    refresh() {
      var changedAttributes = this.computeAttributes();
      if (Object.keys(changedAttributes).length > 0) {
        this.refreshSelf();
        return true;
      } else {
        return false;
      }
    }
  }

  exports.fps = FPSWidget;
})();
