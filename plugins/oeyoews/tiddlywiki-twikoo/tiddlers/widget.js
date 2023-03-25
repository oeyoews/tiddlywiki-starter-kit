/*\
title: $:/plugins/oeyoews/tiddlywiki-twikoo/widget.js
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
  const twikoo = require('$:/plugins/oeyoews/tiddlywiki-twikoo/twikoo.min.js');

  class TwikooWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const currentTiddler = this.getVariable('currentTiddler');
      var path = this.getAttribute('path', currentTiddler || 'Index');
      console.log(`🐛 当前twikoo评论区 为 ${path}`);

      // "this envid just support nodejs, not support static html"
      var envId = this.getAttribute('envId', process.env.envId || '');
      var el = this.getAttribute('el', '#tcomment');

      if (!envId) {
        console.warn('twikoo not have a valid envId');
        // alert('twikoo not have a valid envId');
        // console.log(envId);
        return;
      }

      // Create a div element to hold the comments
      const twikooDiv = this.document.createElement('div');
      twikooDiv.id = 'tcomment';
      parent.insertBefore(twikooDiv, nextSibling);
      this.domNodes.push(twikooDiv);

      const twikooInit = twikoo.init({
        envId: envId,
        el: el,
        path: path,
      });

      twikooInit;
    }

    refresh() {
      var changedAttributes = this.computeAttributes();
      changedAttributes.title;
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
