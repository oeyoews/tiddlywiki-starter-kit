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
    this.isUpdating = false; // 标记变量
    this.updateText(ohitokotoSpan); // 初始化ohitokoto文本
    ohitokotoSpan.onclick = this.handleRefresh.bind(this); // 绑定点击事件处理程序
    parent.insertBefore(ohitokotoSpan, nextSibling);
    this.domNodes.push(ohitokotoSpan);

    setInterval(this.updateText.bind(this, ohitokotoSpan), 1000); // 每隔2秒刷新文本
  };

  OHitokoto.prototype.updateText = function updateHitokoto(domNode) {
    if (this.isUpdating) {
      // 正在更新文本，直接返回
      return;
    }
    var sentences = $tw.wiki.getTiddlerData(
      '$:/plugins/oeyoews/neotw-hitokoto/random-sentences.json',
    );
    var randomIndex = Math.floor(Math.random() * sentences.length);
    var randomSentence =
      sentences[randomIndex].hitokoto + '  ' + sentences[randomIndex].from;
    this.isUpdating = true; // 设置标记变量为 true
    domNode.textContent = randomSentence;
    this.isUpdating = false; // 更新完文本后，设置标记变量为 false
  };

  OHitokoto.prototype.handleRefresh = function () {
    if (this.isUpdating) {
      // 正在更新文本，直接返回
      return;
    }
    console.log('🚀 Click Owidget');
    var ohitokotoSpan = this.domNodes[0];
    this.updateText(ohitokotoSpan); // 刷新ohitokoto文本
  };

  exports.ohitokoto = OHitokoto;
})();
