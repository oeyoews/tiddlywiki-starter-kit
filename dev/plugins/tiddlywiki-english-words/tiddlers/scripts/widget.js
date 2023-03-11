/*\
title: $:/plugins/oeyoews/tiddlywiki-english-words/owidget.js
type: application/javascript
module-type: widget

tiddlywiki-english-words
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  if (!$tw.browser) return;
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class EnglishWidget extends Widget {
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
      ohitokotoSpan.style.fontSize = '18px';
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

      setInterval(() => this.updateText(ohitokotoSpan), refreshTime);
    }

    updateText(domNode) {
      if (this.isUpdating) {
        return;
      }

      const sentences = $tw.wiki.getTiddlerData(
        '$:/plugins/oeyoews/tiddlywiki-english-words/voc.json',
      );
      const randomIndex = Math.floor(Math.random() * sentences.length);
      const randomSentence =
        sentences[randomIndex].word + ' ' + sentences[randomIndex].definition;
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

  exports.english = EnglishWidget;
})();
