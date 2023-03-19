/*\
title: $:/plugins/oeyoews/neotw-hitokoto/owidget.js
type: application/javascript
module-type: widget

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
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const refreshTime = this.getAttribute('refreshTime', '600000');
      const enableClick = this.getAttribute('enableClick', 'yes');

      if (refreshTime <= 0) {
        console.log('refreshTime 值过小，请设置一个合适的数字');
        return;
      }

      // const containerNode = this.document.createElement('container');

      const ohitokotoSpan = this.document.createElement('span');
      ohitokotoSpan.className = 'hitokoto';
      this.updateText(ohitokotoSpan);

      // use container
      const refreshButton = this.document.createElement('button');
      refreshButton.className = 'hitokoto-refresh';
      refreshButton.style.fontSize = '50%';
      refreshButton.style.marginLeft = '4px';
      refreshButton.style.color = '#7AA2F7';
      refreshButton.textContent = ' Next';
      refreshButton.onclick = this.handleRefresh.bind(this);

      parent.insertBefore(ohitokotoSpan, nextSibling);
      parent.insertBefore(refreshButton, nextSibling);
      this.domNodes.push(ohitokotoSpan);
      this.domNodes.push(refreshButton);
      // containerNode.appendChild(ohitokotoSpan);
      // containerNode.appendChild(refreshButton);
      // parent.insertBefore(containerNode, nextSibling);
      // this.domNodes.push(containerNode);

      setInterval(() => this.updateText(ohitokotoSpan), refreshTime);
    }

    updateText(domNode) {
      if (this.isUpdating) {
        return;
      }

      const sentences = $tw.wiki.getTiddlerData(
        '$:/plugins/oeyoews/neotw-hitokoto/sentences.json',
      );
      const randomIndex = Math.floor(Math.random() * sentences.length);
      const randomSentence =
        sentences[randomIndex].hitokoto + ' ' + sentences[randomIndex].from;
      this.isUpdating = true;
      domNode.textContent = randomSentence;
      this.isUpdating = false;
    }

    handleRefresh() {
      if (this.isUpdating) {
        return;
      }
      const ohitokotoSpan = this.domNodes[0];
      this.updateText(ohitokotoSpan);
      console.log(ohitokotoSpan.textContent);
    }
  }

  exports.ohitokoto = OHitokoto;
})();
