/*\
title: test-twikoo
type: application/javascript
module-type: widget

twikoo widget
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  // Interactive DOM not available when generating static pages
  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const twikoo = require('lib-twikoo.js');

  class TwikooWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      var path = this.getAttribute('path', 'Index');
      var envId = this.getAttribute('envId', '');
      var el = this.getAttribute('el', '#tcomment');

      if (!envId) {
        // alert('twikoo not have a valid envId');
        console.warn('twikoo not have a valid envId');
        // console.log(envId);
        return;
      }

      // Create a div element to hold the comments
      const twikooDiv = this.document.createElement('div');
      twikooDiv.id = 'tcomment';
      parent.insertBefore(twikooDiv, nextSibling);
      this.domNodes.push(twikooDiv);

      const runTwikoo = twikoo.init({
        envId: envId,
        el: el,
        path: path,
      });

      // weired
      runTwikoo;

      console.log(`🐛 当前twikoo评论区 为 ${path}`);
    }

    refresh() {
      var changedAttributes = this.computeAttributes();
      // changedAttributes.title;
      if (Object.keys(changedAttributes).length > 0) {
        this.refreshSelf();
        return true;
      } else {
        return false;
      }
    }
  }

  exports.twikoo = TwikooWidget;
})();
