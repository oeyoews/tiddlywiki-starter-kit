/*\
title: $:/plugins/oeyoews/tiddlywiki-settings/widget.js
type: application/javascript
module-type: widget

tiddlywiki-settings widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class SeetingsWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    const settings = require('./settings');

    // filter
    // click
    // update

    const domNode = createElement('div', {
      text: settings.editorRefreshTime.text
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/** @description tiddlywiki-settings widget */
exports['tw-settings'] = SeetingsWidget;
