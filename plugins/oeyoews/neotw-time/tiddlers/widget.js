/*\
title: $:/plugins/oeyoews/neotw-time/widget.js
type: application/javascript
module-type: widget

neotw-time widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class TimeWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.interval = this.getAttribute('interval', 1000);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const classNames = this.getAttribute('class', '').split(' ');

      const divNode = $tw.utils.domMaker('div', {
        class: classNames.join(' '),
      });

      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);

      this.startTimer();
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

      const now = new Date();
      const timeString = now.toLocaleTimeString();
      this.domNodes[0].textContent = timeString;
    }
  }

  exports['otime'] = TimeWidget;
})();
