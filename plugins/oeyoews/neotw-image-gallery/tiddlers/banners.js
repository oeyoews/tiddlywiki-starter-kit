/*\
title: $:/plugins/oeyoews/neotw-image-gallery/banners.js
type: application/javascript
module-type: widget

neotw-image-gallery widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const createImage = require('./createImage');

class BannersWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const twimageobserver = require('$:/plugins/oeyoews/neotw-notion-gallery/twimageobserver.js');

    const createElement = $tw.utils.domMaker;

    const children = [];

    // https://cdn.jsdelivr.net/gh/oeyoews/tiddlywiki-starter-kit@main/img/012.png?raw=true
    const imageProvider = 'https://cdn.jsdelivr.net/gh/';
    const urlPrefix = imageProvider + 'oeyoews/tiddlywiki-starter-kit/img/';
    const versions = ['012'];

    const imageURLs = versions.map((version) => ({
      title: version,
      src: `${urlPrefix}${version}.png`,
    }));

    imageURLs.forEach(({ title, src }) => {
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
exports.banners = BannersWidget;
