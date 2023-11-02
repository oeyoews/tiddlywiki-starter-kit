/*\
title: $:/plugins/oeyoews/neotw-image-better/widget.js
type: application/javascript
module-type: widget

oimg widget
\*/

const Widget = require('$:/core/modules/widgets/widget.js').widget;

class ImageWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  // TODO: support preset width height
  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const twimageobserver = require('$:/plugins/oeyoews/neotw-notion-gallery/twimageobserver.js');

    const {
      keyword = 'sea',
      resolution = '1920x1080',
      class: classNames,
      src = `https://source.unsplash.com/random/${resolution}/?${keyword}`,
    } = this.attributes;

    const imageNode = this.document.createElement('img');

    imageNode.classList.add(
      'bg-cover',
      'aspect-video',
      'rounded',
      'spotlight',
      'w-full',
    );
    imageNode.alt = ' ';
    imageNode.setAttribute('data-src', src);
    if (!this.hasAttribute('src')) {
      imageNode.title = keyword;
    }
    classNames && imageNode.classList.add(...classNames.split(' '));
    twimageobserver.observe(imageNode);

    parent.insertBefore(imageNode, nextSibling);
    this.domNodes.push(imageNode);
  }
}

/**
 * unsplash keyword image
 * @description 使用unsplash的图片组件
 * @param {string} keyword
 * @param {string} class
 */
exports.oimg = ImageWidget;
