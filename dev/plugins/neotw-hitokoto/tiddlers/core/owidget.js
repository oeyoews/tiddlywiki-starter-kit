/*\
OHitokoto widget
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  var Widget = require('$:/core/modules/widgets/widget.js').widget;

  var OHitokoto = function (parseTreeNode, options) {
    this.initialise(parseTreeNode, options);
  };

  /*
Inherit from the base widget class
*/
  OHitokoto.prototype = new Widget();

  /*
Render this widget into the DOM
*/
  OHitokoto.prototype.render = function (parent, nextSibling) {
    this.parentDomNode = parent;
    var tiddlerData = $tw.wiki.getTiddlerData(
      '$:/plugins/oeyoews/neotw-hitokoto/random-sentences.json',
    );
    var sentences = tiddlerData.sentences;
    console.log(tiddlerData);

    var randomIndex = Math.floor(Math.random() * sentences.length);
    var randomSentence = sentences[randomIndex] + '  @oeyoews';
    console.log(randomSentence);

    var ohitokotoSpan = this.document.createElement('span');
    ohitokotoSpan.className = 'hitokoto';
    var textNode = this.document.createTextNode(randomSentence);
    ohitokotoSpan.appendChild(textNode);
    parent.insertBefore(ohitokotoSpan, nextSibling);
    this.domNodes.push(ohitokotoSpan);
  };

  exports.ohitokoto = OHitokoto;
})();
