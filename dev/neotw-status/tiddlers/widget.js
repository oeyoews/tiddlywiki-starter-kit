/*\
title: $:/plugins/oeyoews/neotw-status/widget.js
type: application/javascript
module-type: widget

neotw-status widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

  class ExampleWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const createElement = $tw.utils.domMaker;
      const optionsNode = [];
      const { field } = this.attributes;

      // TODO: support group, count
      // TODO: 支持 读取上次的状态, 参考tw-bot
      const options = [
        ['public', { color: 'red', icon: '🔥' }],
        ['private', { color: 'green', icon: '🔐' }],
        ['article', { color: 'blue', icon: '📝' }],
      ];

      const getCount = (value) =>
        $tw.wiki.filterTiddlers(`[field:${field}[${value}]]`).length;

      const disabledOption = createElement('option', {
        class: 'bg-gray-300 text-black',
        text: '📁 status',
        attributes: {
          // selected: '',
          value: 'status',
          disabled: 'true',
        },
      });
      optionsNode.push(disabledOption);

      options.forEach(([value, { color, icon }]) => {
        optionsNode.push(
          createElement('option', {
            class: `bg-${color}-300 text-black`,
            text: `${icon} ${value} (${getCount(value)})`,
            attributes: {
              value,
            },
          }),
        );
      });

      const currentTiddler = this.getVariable('currentTiddler');

      const domNode = createElement('select', {
        class: 'appearance-none border-none rounded p-0.5 cursor-pointer',
        children: optionsNode,
        attributes: {},
      });

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);

      domNode.addEventListener('change', () => {
        $tw.wiki.setText(currentTiddler, field, null, domNode.value);
      });
    }
  }

  /**
   * @description neotw-status widget
   * @param xxx
   */
  exports.status = ExampleWidget;
})();
