// https://twikoo.oeyoewl.top
// add if (!$tw.browser) return;
(function () {
  // Interactive DOM not available when generating static pages
  if (!$tw.browser) return;
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class TwikooWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.twikooScriptSrc =
        'https://cdn.staticfile.org/twikoo/1.6.10/twikoo.all.min.js';
      console.log(this.twikooScriptSrc);
      this.envId = parseTreeNode.envId || 'https://twikoo.oeyoewl.top';
      this.el = parseTreeNode.el || '#tcomment';
      this.path =
        parseTreeNode.path ||
        $tw.wiki.getTiddlerText('$:/temp/focussedTiddler');
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;

      // Create the script element and append it to the head of the document
      const twikooScript = this.document.createElement('script');
      twikooScript.src = this.twikooScriptSrc;
      twikooScript.async = true;
      this.document.head.appendChild(twikooScript);
      // this.envId = envId;
      // this.el = el;

      // var path = $tw.wiki.getTiddlerText('$:/temp/focussedTiddler');
      // var path = this.path;
      console.log(`🐛current path is + ${this.path}`);
      //
      // if (!envId) {
      //   console.error("Missing 'envId' attribute for twikoo widget.");
      //   return;
      // } else {
      //   console.log(envId);
      // }
      //
      // if (!el) {
      //   console.error("Missing 'el' attribute for twikoo widget.");
      //   return;
      // }

      // Initialize Twikoo with options
      twikooScript.addEventListener('load', () => {
        twikoo.init({
          envId: this.envId,
          el: this.el,
          path: this.path,
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
      const twikooDiv = this.document.querySelector(this.el);
      if (twikooDiv) {
        twikooDiv.remove();
      }
    }
  }

  exports.twikoo = TwikooWidget;
})();
