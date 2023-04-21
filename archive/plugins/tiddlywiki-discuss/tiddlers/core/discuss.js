(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  // Interactive DOM not available when generating static pages
  if (!$tw.browser) return;
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DiscussWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.discussScriptSrc =
        'https://cdn.jsdelivr.net/npm/discuss@1.2.1/dist/discuss.js';
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;

      // Create the script element and append it to the head of the document
      const discussScript = this.document.createElement('script');
      discussScript.src = this.discussScriptSrc;
      discussScript.async = true;
      this.document.head.appendChild(discussScript);
      this.computeAttributes();
      var serverURLs = this.getAttribute('serverURLs', '');
      console.log(`🐛 DiscussWidget serverURLs is ${serverURLs}`);

      // Create a div element to hold the comments
      const discussDiv = this.document.createElement('div');
      discussDiv.id = 'Discuss-Comments';
      parent.insertBefore(discussDiv, nextSibling);
      this.domNodes.push(discussDiv);

      // Initialize Discuss with options
      discussScript.addEventListener('load', () => {
        discuss.init({
          el: '#Discuss-Comments',
          // serverURLs: serverURLs,
          serverURLs: 'https://discuss-notion.vercel.app',
          // TODO use currentTiddler
          path: 'xxx',
        });
      });
    }

    refresh() {
      return false;
    }

    detach() {
      // Remove the Discuss script and comments div
      const discussScript = this.document.querySelector(
        `[src="${this.discussScriptSrc}"]`,
      );
      if (discussScript) {
        discussScript.remove();
      }
      const discussDiv = this.document.querySelector('#Discuss-Comments');
      if (discussDiv) {
        discussDiv.remove();
      }
    }
  }

  exports.discuss = DiscussWidget;
})();
