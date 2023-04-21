/*\
title: $:/plugins/oeyoews/tiddlywiki-palette-all-in-one/togglemode.js
type: application/javascript
module-type: widget

toggleDarkMode button

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) {
    return;
  }

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class ToggleModeWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const lightButton = this.document.createElement('button');
      lightButton.className = 'toggle-mode-widget__button';
      lightButton.textContent = 'Light';
      lightButton.onclick = document.documentElement.classList.remove('light');

      const darkButton = this.document.createElement('button');
      darkButton.className = 'toggle-mode-widget__button';
      darkButton.textContent = 'Dark';
      darkButton.onclick = document.documentElement.classList.add('dark');

      const osButton = this.document.createElement('button');
      osButton.className = 'toggle-mode-widget__button';
      osButton.textContent = 'Respect OS Preference';
      // osButton.onclick = setOSPreference;

      const container = this.document.createElement('div');
      container.className = 'toggle-mode-widget';
      container.appendChild(lightButton);
      container.appendChild(darkButton);
      container.appendChild(osButton);
      parent.insertBefore(container, nextSibling);
      this.domNodes.push(container);
    }
  }

  exports.togglemode = ToggleModeWidget;
})();
