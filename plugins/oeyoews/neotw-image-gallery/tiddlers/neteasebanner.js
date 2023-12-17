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
    const createElement = $tw.utils.domMaker;
    // NOTE: tw 支持基于tw 内部路由, 但是仅仅支持js with module-type library(json not support)
    // const twimageobserver = require('$:/plugins/oeyoews/neotw-notion-gallery/twimageobserver.js');
    const twimageobserver = require('../neotw-notion-gallery/twimageobserver.js');

    const loading = createElement('div', {
      class: 'bg-gray-200 rounded w-full h-48 animate-pulse',
    });
    parent.insertBefore(loading, nextSibling);
    this.domNodes.push(loading);

    const data = await neteasefetcher();
    this.removeChildDomNodes(loading);

    const children = [];

    data.slice(0, 9).forEach(({ src }) => {
      const imageNode = createImage('', src, 'false');
      twimageobserver.observe(imageNode);
      children.push(imageNode);
    });

    const domNode = createElement('div', {
      class: 'grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
      children,
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
