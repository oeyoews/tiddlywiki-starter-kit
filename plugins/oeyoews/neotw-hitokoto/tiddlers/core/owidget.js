/*\
title: $:/plugins/oeyoews/neotw-hitokoto/owidget.js
type: application/javascript
module-type: widget

owidget
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  // 在 JSLint 注释中，$tw: false 表示 $tw 是一个全局变量，但它的值是 false。这是因为在某些情况下，JSLint 可能会检测到 $tw 变量被重新赋值，从而抛出警告或错误。通过将 $tw: false 设置为全局变量的值，可以告诉 JSLint，$tw 变量是只读的，不应该被重新赋值。这可以避免 JSLint 报错或警告，同时确保代码中正确使用 $tw 变量。

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class OHitokoto extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const ohitokotoNode = this.document.createElement('div');
      ohitokotoNode.className = 'hitokoto cursor-pointer truncate';
      ohitokotoNode.textContent = 'Loading ...';

      parent.insertBefore(ohitokotoNode, nextSibling);
      this.domNodes.push(ohitokotoNode);

      const fetchOHitokoto = () => {
        const sentences = $tw.wiki.getTiddlerData(
          '$:/plugins/oeyoews/neotw-hitokoto/sentences.json',
        );
        const randomIndex = Math.floor(Math.random() * sentences.length);
        const randomSentence =
          sentences[randomIndex].hitokoto + ' ' + sentences[randomIndex].from;
        ohitokotoNode.textContent = randomSentence;
      };

      const _ = require('lodash.min.js');
      const throttleOHitokotoHandleClick = _.throttle(
        fetchOHitokoto.bind(this),
        1000,
      );

      ohitokotoNode.addEventListener('click', () => {
        throttleOHitokotoHandleClick();
      });
      fetchOHitokoto();
    }
  }

  exports.ohitokoto = OHitokoto;
})();
