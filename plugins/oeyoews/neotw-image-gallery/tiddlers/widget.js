/*\
title: $:/plugins/oeyoews/neotw-image-gallery/widget.js
type: application/javascript
module-type: widget

neotw-image-gallery widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const createImage = require('./createImage');

class GalleryWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.jsonfile = null;
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const twimageobserver = require('$:/plugins/oeyoews/neotw-notion-gallery/twimageobserver.js');

    const createElement = $tw.utils.domMaker;
    const { json = 'image-list.json' } = this.attributes;
    this.jsonfile = json;

    const data = $tw.wiki.getTiddlerData(json);
    const imagesURL = Object.entries(data);

    const children = [];

    imagesURL.forEach(([title, src]) => {
      const imageNode = createImage(title, src);
      twimageobserver.observe(imageNode);
      children.push(imageNode);
    });

    const domNode = createElement('div', {
      class: 'grid grid-cols-1 md:grid-cols-3 gap-4',
      children,
    });

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

/**
 * @description neotw-image-gallery widget
 * @param {json}
 */
exports.gallery = GalleryWidget;
