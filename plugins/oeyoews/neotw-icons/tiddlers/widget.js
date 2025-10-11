/*\
title: $:/plugins/oeyoews/neotw-icons/widget.js
type: application/javascript
module-type: widget

neotw-icons widget
\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class IconsWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const {
      title = '',
      style = '',
      icon = 'simple-icons:tiddlywiki',
      class: className = ''
    } = this.attributes;

    // NOTE: dont use dommaker
    const iconNode = this.document.createElement('iconify-icon');

    const attributes = {
      icon,
      title,
      style,
      class: className
    };

    Object.keys(attributes).forEach((key) => {
      iconNode.setAttribute(key, attributes[key]);
    });

    iconNode.style.verticalAlign = 'middle';

    parent.insertBefore(iconNode, nextSibling);
    this.domNodes.push(iconNode);
  }
}

exports.iconify = IconsWidget;
exports['iconify-icon'] = IconsWidget;
