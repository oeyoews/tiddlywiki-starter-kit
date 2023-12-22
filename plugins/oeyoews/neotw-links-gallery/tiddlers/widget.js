/*\
title: $:/plugins/oeyoews/neotw-links-gallery/widget.js
type: application/javascript
module-type: widget

neotw-links-gallery widget
\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class ListlinksWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.jsonfile = null;
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const ejs = require('ejs.min.js');
    const { json = 'list-links.json' } = this.attributes;
    this.jsonfile = json;
    const isStoryRiver = this.getVariable('storyTiddler') !== undefined;

    const data = $tw.wiki.getTiddlerData(json) || {};
    const linksURL = Object.entries(data);

    const template = $tw.wiki.getTiddlerText(
      '$:/plugins/oeyoews/neotw-links-gallery/template.ejs',
    );
    const html = ejs.render(template, { linksURL, isStoryRiver });
    const domNode = this.document.createElement('div');
    domNode.innerHTML = html;

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }

  refresh(changedTiddlers) {
    if (Object.keys(changedTiddlers).includes(this.jsonfile)) {
      this.refreshSelf();
      return true;
    } else {
      return false;
    }
  }
}

exports['list-links'] = ListlinksWidget;
