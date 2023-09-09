/*\
title: $:/plugins/oeyoews/neotw-deepl/widget.js
type: application/javascript
module-type: widget

neotw-deepl widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DeeplWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      const deepl = require('./deepl');

      const textareaClass =
        'shadow border-0 resize-none h-48 w-full rounded p-2 focus:outline-none focus:ring-0 focus:ring-blue-500';
      const buttonClass = 'mt-2 p-2 text-white rounded w-auto';
      const selectClass =
        'mt-2 p-2 border rounded focus:outline-none border-none shadow focus:ring-2 focus:ring-blue-500 flex';

      const leftOptionEN = $tw.utils.domMaker('option', {
        text: 'EN',
      });

      const leftOptionCN = $tw.utils.domMaker('option', {
        text: 'ZH',
      });

      const selectNode = $tw.utils.domMaker('select', {
        class: selectClass,
        children: [leftOptionEN, leftOptionCN],
        attributes: {
          id: 'languageSelect',
        },
      });

      const copyButton = $tw.utils.domMaker('button', {
        text: '📋',
        class: buttonClass,
        attributes: {
          type: 'button',
          id: 'copyButton',
        },
      });

      const textareaLeft = $tw.utils.domMaker('textarea', {
        class: textareaClass,
        attributes: {
          placeholder: '输入需要翻译的语言',
          id: 'input',
        },
      });

      const textareaRight = $tw.utils.domMaker('textarea', {
        class: textareaClass,
        attributes: {
          placeholder: '翻译的内容',
          readonly: '',
          id: 'output',
        },
      });

      const deeplRightContainer = $tw.utils.domMaker('div', {
        children: [textareaRight, copyButton],
      });

      const deeplLeftContainer = $tw.utils.domMaker('div', {
        children: [textareaLeft, selectNode],
      });

      const deeplSecContainer = $tw.utils.domMaker('div', {
        class: 'grid grid-cols-2 gap-4',
        children: [deeplLeftContainer, deeplRightContainer],
      });

      // TODO: 移除重复节点
      const deeplContainer = $tw.utils.domMaker('div', {
        class: 'container mx-auto p-4',
        children: [deeplSecContainer],
      });

      parent.insertBefore(deeplContainer, nextSibling);
      this.domNodes.push(deeplContainer);

      deepl();
    }
  }

  exports['deepl'] = DeeplWidget;
})();
