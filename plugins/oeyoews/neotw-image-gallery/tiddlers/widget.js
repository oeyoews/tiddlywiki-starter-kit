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

    const { observer } = new $tw.ImageObserver();

    const createElement = $tw.utils.domMaker;
    const { json = 'image-list.json' } = this.attributes;
    this.jsonfile = json;

    // need check this file
    const isFile = $tw.wiki.tiddlerExists(json);
    if (!isFile) {
      console.warn(json, 'file not founded !');
      return;
    }
    const data = $tw.wiki.getTiddlerData(json);
    const imagesURL = Object.entries(data);

    const children = [];

    imagesURL.forEach(([title, src]) => {
      const imageNode = createImage(title, src);
      observer.observe(imageNode);
      children.push(imageNode);
    });

    const domNode = createElement('div', {
      class: 'grid grid-cols-1 md:grid-cols-3 gap-4',
      children
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
