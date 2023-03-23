/*\
title: $:/plugins/oeyoews/neotw-hitokoto/owidget-dev.js
type: application/javascript
// module-type: widget

owidget
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  if (!$tw.browser) return;
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class OHitokoto extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.isUpdating = false;
      this.ohitokotoSpan = null;
      this.refreshButton = null;
      this.refreshTime = null;
      this.enableClick = null;
      this.lastUpdateTime = null;
      this.requestId = null;
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      this.refreshTime = parseInt(
        this.getAttribute('refreshTime', '30000'),
        10,
      );
      this.enableClick = this.getAttribute('enableClick', 'yes') === 'yes';

      if (this.refreshTime <= 0) {
        console.log('refreshTime 值过小，请设置一个合适的数字');
        return;
      }

      this.ohitokotoSpan = this.document.createElement('span');
      this.ohitokotoSpan.className = 'hitokoto';
      this.updateText();

      this.refreshButton = this.document.createElement('button');
      this.refreshButton.className = 'hitokoto-refresh';
      this.refreshButton.style.fontSize = '50%';
      this.refreshButton.style.marginLeft = '4px';
      this.refreshButton.style.color = '#7AA2F7';
      this.refreshButton.textContent = ' Next';
      if (this.enableClick) {
        this.refreshButton.onclick = this.handleRefresh.bind(this);
      } else {
        this.refreshButton.style.display = 'none';
      }

      parent.insertBefore(this.ohitokotoSpan, nextSibling);
      parent.insertBefore(this.refreshButton, nextSibling);
      this.domNodes.push(this.ohitokotoSpan);
      this.domNodes.push(this.refreshButton);

      this.lastUpdateTime = performance.now();
      this.requestId = window.requestAnimationFrame(this.updateText.bind(this));
    }

    updateText() {
      if (this.isUpdating) {
        return;
      }

      const currentTime = performance.now();
      if (currentTime - this.lastUpdateTime < this.refreshTime) {
        this.requestId = window.requestAnimationFrame(
          this.updateText.bind(this),
        );
        return;
      }

      const sentences = $tw.wiki.getTiddlerData(
        '$:/plugins/oeyoews/neotw-hitokoto/sentences.json',
      );
      const randomIndex = Math.floor(Math.random() * sentences.length);
      const randomSentence =
        sentences[randomIndex].hitokoto + ' ' + sentences[randomIndex].from;
      this.isUpdating = true;
      this.ohitokotoSpan.textContent = randomSentence;
      this.isUpdating = false;

      this.lastUpdateTime = currentTime;
      this.requestId = window.requestAnimationFrame(this.updateText.bind(this));
    }

    handleRefresh() {
      if (this.isUpdating) {
        return;
      }
      window.cancelAnimationFrame(this.requestId);
      this.requestId = null; // 清除请求 ID
      this.updateText();
    }
  }

  exports.ohitokoto = OHitokoto;
})();
