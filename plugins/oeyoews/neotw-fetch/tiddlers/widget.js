/*\
title: fetch-mdfile/widget
type: application/javascript
module-type: widget

fetch-mdfile widget

\*/
// TODO: refresh textContent
// debounce
(function() {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class FetchWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const time = new Date().toLocaleString();
      let param = this.getAttribute('param', `Fetch Mdfile `);
      const timestamp = new Date().getTime();
      const fileName = this.getAttribute('fileName', `MDFile-${timestamp}`);
      const modified = $tw.wiki.getTiddler(fileName)?.fields.modified;
      const url = this.getAttribute(
        'url',
        'https://raw.githubusercontent.com/oeyoews/neotw/main/README.md',
      );

      const buttonNode = this.document.createElement('button');
      buttonNode.textContent = `${fileName}`;
      if (modified) {
        buttonNode.textContent = `${fileName} updated ${modified}`;
      }
      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
      buttonNode.onclick = async () => {
        const response = await fetch(url);
        const text = await response.text();
        $tw.wiki.setText(fileName, 'text', null, text);
        $tw.wiki.setText(fileName, 'type', null, 'text/markdown');
        buttonNode.textContent = `${fileName} updated ${modified}`;
      };
    }
    /* refresh() {
      var changedAttributes = this.computeAttributes();
      changedAttributes.title;
      if (Object.keys(changedAttributes).length > 0) {
        this.refreshSelf();
        return true;
      } else {
        return false;
      }
    } */
  }

  exports['fetch-mdfile'] = FetchWidget;
})();
