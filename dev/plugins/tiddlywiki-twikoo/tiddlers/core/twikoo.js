(function () {
  // Interactive DOM not available when generating static pages
  if (!$tw.browser) return;
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class TwikooWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.twikooScriptSrc =
        'https://cdn.staticfile.org/twikoo/1.6.10/twikoo.all.min.js';
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;

      // Create the script element and append it to the head of the document
      const twikooScript = this.document.createElement('script');
      twikooScript.src = this.twikooScriptSrc;
      twikooScript.async = true;
      this.document.head.appendChild(twikooScript);
      this.computeAttributes();
      var path = this.getAttribute('path', 'Index');
      var envId = this.getAttribute('envId', 'https://twikoo.oeyoewl.top');
      var el = this.getAttribute('el', '#tcomment');
      console.log(`🐛 当前twikoo评论区 为 ${path}`);

      // Initialize Twikoo with options
      twikooScript.addEventListener('load', () => {
        twikoo.init({
          envId: envId,
          el: el,
          path: path,
        });
      });

      // Create a div element to hold the comments
      const twikooDiv = this.document.createElement('div');
      twikooDiv.id = 'tcomment';
      parent.insertBefore(twikooDiv, nextSibling);
      this.domNodes.push(twikooDiv);
    }

    refresh() {
      return false;
    }

    detach() {
      // Remove the Twikoo script and comments div
      const twikooScript = this.document.querySelector(
        `[src="${this.twikooScriptSrc}"]`,
      );
      if (twikooScript) {
        twikooScript.remove();
      }
      const twikooDiv = this.document.querySelector(el);
      if (twikooDiv) {
        twikooDiv.remove();
      }
    }
  }

  exports.twikoo = TwikooWidget;
})();
