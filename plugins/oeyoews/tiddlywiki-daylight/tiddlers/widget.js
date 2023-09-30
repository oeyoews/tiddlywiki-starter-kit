/*\
title: $:/plugins/oeyoews/tiddlywiki-daylight/widget.js
type: application/javascript
module-type: widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DaylightWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      const { toggleMode } = require('./daylight-listener');

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const createElement = $tw.utils.domMaker;
      const wiki = $tw.wiki;

      function getIcon(mode) {
        return wiki.getTiddlerText(
          '$:/plugins/oeyoews/tiddlywiki-daylight/' + mode,
        );
      }
      const sun = getIcon('sun');
      const dark = getIcon('dark');
      const { btn } = this.attributes;

      const lightNode = createElement('span', {
        class: 'inline dark:hidden',
      });
      lightNode.innerHTML = sun;

      const darkNode = createElement('span', {
        class: 'hidden dark:inline',
      });
      darkNode.innerHTML = dark;

      const domNode = createElement('button', {
        class: 'aspect-square bg-transparent m-0',
        children: [lightNode, darkNode],
      });

      btn && domNode.classList.remove('bg-transparent');

      domNode.addEventListener('click', toggleMode);

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    }
  }

  exports.daylight = DaylightWidget;
})();