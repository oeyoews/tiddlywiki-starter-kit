/*\
title: $:/plugins/oeyoews/neotw-image-gallery/netease-banners.js
type: application/javascript
module-type: widget

neotw-image-gallery widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const createImage = require('./createImage');
const neteasefetcher = require('./netease-fetcher');

class BannersWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  async render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const data = await neteasefetcher();
    const twimageobserver = require('$:/plugins/oeyoews/neotw-notion-gallery/twimageobserver.js');

    const createElement = $tw.utils.domMaker;

    const children = [];

    data.forEach(({ src }) => {
      const imageNode = createImage('', src);
      twimageobserver.observe(imageNode);
      children.push(imageNode);
    });

    let domNode = createElement('div', {
      class: 'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
      children,
    });

    // TODO: add skeleton loading
    const loading = createElement('div', {
      text: 'loading',
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description neotw-image-gallery widget
 * @param {json}
 */
exports.nbanners = BannersWidget;
