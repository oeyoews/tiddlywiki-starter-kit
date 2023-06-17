/*\
title: $:/plugins/oeyoews/neotw-otime/stage.js
type: application/javascript
module-type: widget

stage widget

\*/
// TODO: add param
// update logic
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
      this.interval = this.getAttribute('interval', 1000);
      this.timestamp = '2021-12-23';
      this.timeStage = calculateTimeDiff(this.timestamp);
    }

    startTimer() {
      // 使用箭头函数来绑定正确的 this 引用
      this.timer = setInterval(() => {
        // 更新 widget 的内容
        this.update();
      }, this.interval);
    }

    update() {
      if (!this.domNodes || !this.domNodes[0]) {
        clearInterval(this.timer);
        return;
      } else {
        this.domNodes[0].textContent = calculateTimeDiff(
          this.getAttribute('timestamp', this.timestamp),
        );
      }
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const buttonNode = $tw.utils.domMaker('span', {
        text: calculateTimeDiff(this.getAttribute('timestamp', this.timestamp)),
      });

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);

      this.update();
      this.startTimer();
    }
  }

  exports['ostage'] = StageWidget;
})();