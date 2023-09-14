/*\
title: $:/plugins/oeyoews/neotw-battery/battery.js
type: application/javascript
module-type: widget

neotw-battery widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class BatteryWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.intervalId = null;
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const classNames = this.getAttribute('class', '').split(' ');

      const divNode = $tw.utils.domMaker('div', {
        class: `inline` + classNames.join(' '),
        attributes: {
          id: 'battery-level',
        },
      });

      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);

      const showBatteryLevel = () => {
        navigator.getBattery().then((battery) => {
          const level = (battery.level * 100).toFixed(0);
          const batteryLevelEl = this.domNodes[0];
          batteryLevelEl.textContent = level + '%';
        });
      };

      showBatteryLevel();
      const batteryId = document.getElementById('battery-level');
      if (batteryId) {
        this.intervalId = setInterval(showBatteryLevel, 60000);
      } else {
        clearInterval(this.intervalId);
      }
    }

    destroy() {
      clearInterval(this.intervalId);
      super.destroy();
    }
  }

  exports['battery'] = BatteryWidget;
})();
