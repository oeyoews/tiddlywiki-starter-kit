/*\
title: $:/plugins/oeyoews/skill-badges/icons.js
type: application/javascript
module-type: widget

skill-badges widget
\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class SkillIconsWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const { badges } = require('./skill-badges.min.js');
    const createElement = $tw.utils.domMaker;

    const children = [];
    Object.values(badges).forEach((icon) => {
      children.push(
        createElement('img', {
          attributes: {
            src: icon
          }
        })
      );
    });

    const domNode = createElement('div', {
      children
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description skill-badges widget
 */
exports.badgeIcons = SkillIconsWidget;
