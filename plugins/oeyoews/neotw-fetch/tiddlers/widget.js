/*\
title: fetch-mdfile/widget
type: application/javascript
module-type: widget

fetch-mdfile widget

\*/
// TODO: refresh textContent
// debounce
(function () {
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

      const timestamp = new Date().getTime();
      let filename = this.getAttribute('filename', `MDFile-${timestamp}`);
      filename += ' 📝';
      const modified = $tw.wiki.getTiddler(filename)?.fields.modified;
      const url = this.getAttribute(
        'url',
        'https://raw.githubusercontent.com/oeyoews/neotw/main/README.md',
      );

      const buttonNode = this.document.createElement('button');
      buttonNode.textContent = `${filename}`;
      if (modified) {
        buttonNode.textContent = `${filename} updated ${modified}`;
      }

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);

      buttonNode.onclick = async () => {
        NProgress.start();
        const response = await fetch(url);
        const text = await response.text();
        $tw.wiki.setText(filename, 'text', null, text);
        $tw.wiki.setText(filename, 'type', null, 'text/markdown');
        NProgress.done();
        // buttonNode.textContent = `${fileName} updated ${modified}`;
      };
    }
  }

  exports['fetch-mdfile'] = FetchWidget;
})();
