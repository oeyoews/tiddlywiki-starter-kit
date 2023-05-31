/*\
title: $:/plugins/oeyoews/neotw-battery/widget.js
type: application/javascript
module-type: widget

neotw-battery widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DivWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.intervalId = null;
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const classNames = this.getAttribute('class', '').split('');
      const isGradient = this.hasAttribute('gradient', false);

      const divNode = $tw.utils.domMaker('div', {
        class: '',
        attributes: {
          id: 'battery-level',
        },
      });

      parent.insertBefore(divNode, nextSibling);
      this.domNodes.push(divNode);

      const showBatteryLevel = () => {
        navigator.getBattery().then(battery => {
          const level = (battery.level * 100).toFixed(0);
          const batteryLevelEl = this.domNodes[0];
          batteryLevelEl.textContent = level + '%';
          console.log('updated');
        });
      };

      showBatteryLevel();
      // TODO: how to disabled this on dom removed
      const batteryId = document.getElementById('battery-level');
      if (batteryId) {
        this.intervalId = setInterval(showBatteryLevel, 60000);
        console.log('updated');
      } else {
        clearInterval(this.intervalId);
        console.log('cleared');
      }

      classNames.forEach(className => {
        if (className) {
          divNode.classList.add(className);
        }
      });
    }

    destroy() {
      clearInterval(this.intervalId);
      super.destroy();
    }
  }

  exports['battery'] = DivWidget;
})();
