/*\
title: $:/plugins/oeyoews/neotw-otime/stage.js
type: application/javascript
module-type: widget

stage widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const { calculateTimeDiff } = require('./time');

  class StageWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.timestamp = null; // 初始设为 null
      this.interval = null; // 初始设为 null
    }

    computeAttributes() {
      super.computeAttributes();
      this.timestamp = this.getAttribute('timestamp', '2021-12-23');
      this.interval = this.getAttribute('interval', 1000);
    }

    startTimer() {
      this.update();
      this.timer = setInterval(() => {
        this.update();
      }, this.interval);
    }

    update() {
      if (!this.domNodes || !this.domNodes[0]) {
        clearInterval(this.timer);
        return;
      }
      this.domNodes[0].textContent = calculateTimeDiff(this.timestamp);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const StageNode = $tw.utils.domMaker('span', {
        text: calculateTimeDiff(this.timestamp),
      });

      parent.insertBefore(StageNode, nextSibling);
      this.domNodes.push(StageNode);

      this.startTimer();
    }
  }

  exports['ostage'] = StageWidget;
})();