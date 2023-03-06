(function () {
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class OHitokoto extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.isUpdating = false;
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      const ohitokotoSpan = this.document.createElement('center');
      ohitokotoSpan.className = 'hitokoto';
      this.updateText(ohitokotoSpan);
      ohitokotoSpan.onclick = this.handleRefresh.bind(this);
      parent.insertBefore(ohitokotoSpan, nextSibling);
      this.domNodes.push(ohitokotoSpan);

      setInterval(() => this.updateText(ohitokotoSpan), 20000);
    }

    updateText(domNode) {
      if (this.isUpdating) {
        return;
      }
      const sentences = $tw.wiki.getTiddlerData(
        '$:/plugins/oeyoews/neotw-hitokoto/random-sentences.json',
      );
      const randomIndex = Math.floor(Math.random() * sentences.length);
      const randomSentence =
        sentences[randomIndex].hitokoto + '  ' + sentences[randomIndex].from;
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
      console.log('Refreshed: ' + ohitokotoSpan.textContent);
    }
  }

  exports.ohitokoto = OHitokoto;
})();
