(function () {
  'use strict';

  var Widget = require('$:/core/modules/widgets/widget.js').widget;

  var OHitokoto = function (parseTreeNode, options) {
    this.initialise(parseTreeNode, options);
  };

  OHitokoto.prototype = new Widget();

  OHitokoto.prototype.render = function (parent, nextSibling) {
    this.parentDomNode = parent;
    var ohitokotoSpan = this.document.createElement('span');
    ohitokotoSpan.className = 'hitokoto';
    this.updateText(ohitokotoSpan); // 初始化ohitokoto文本
    ohitokotoSpan.onclick = this.handleRefresh.bind(this); // 绑定点击事件处理程序
    parent.insertBefore(ohitokotoSpan, nextSibling);
    this.domNodes.push(ohitokotoSpan);
  };

  OHitokoto.prototype.updateText = function (domNode) {
    var tiddlerData = $tw.wiki.getTiddlerData(
      '$:/plugins/oeyoews/neotw-hitokoto/random-sentences.json',
    );
    var sentences = tiddlerData.sentences;
    var randomIndex = Math.floor(Math.random() * sentences.length);
    var randomSentence = sentences[randomIndex] + '  @oeyoews';
    domNode.textContent = randomSentence;
  };

  OHitokoto.prototype.handleRefresh = function () {
    var ohitokotoSpan = this.domNodes[0];
    this.updateText(ohitokotoSpan); // 刷新ohitokoto文本
  };

  exports.ohitokoto = OHitokoto;
})();
