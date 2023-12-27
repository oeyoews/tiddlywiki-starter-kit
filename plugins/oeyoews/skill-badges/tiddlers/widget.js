/*\
title: $:/plugins/oeyoews/skill-badges/widget.js
type: application/javascript
module-type: widget

skill-badges widget
\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class SkillIconWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const { icon = 'tiddlywiki5' } = this.attributes;
    const { icons, badges } = require('./skill-badges.min.js');
    const createElement = $tw.utils.domMaker;

    const getIcon = () => {
      if (Array.isArray(icons)) {
        const index = icons.findIndex(
          (i) => i.toLowerCase() === icon.toLowerCase()
        );
        return icons[index] || 'tiddlywiki5';
      }
    };

    const domNode = createElement('img', {
      attributes: {
        src: badges[getIcon()]
      }
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description skill-badges widget
 */
exports.badge = SkillIconWidget;
