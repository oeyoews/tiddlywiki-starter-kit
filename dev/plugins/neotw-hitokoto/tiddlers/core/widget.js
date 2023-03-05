/*\
Hitokoto widget
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  var Widget = require('$:/core/modules/widgets/widget.js').widget;

  var Hitokoto = function (parseTreeNode, options) {
    this.initialise(parseTreeNode, options);
  };

  /*
Inherit from the base widget class
*/
  Hitokoto.prototype = new Widget();

  /*
Render this widget into the DOM
*/
  Hitokoto.prototype.render = function (parent, nextSibling) {
    this.parentDomNode = parent;

    var data_ = null;
    fetch('https://v1.hitokoto.cn')
      .then(response => response.json())
      .then(data => {
        data_ = data.hitokoto + ' @' + data.from;
        var hitokotoSpan = this.document.createElement('div');
        hitokotoSpan.className = 'hitokoto';
        var textNode = this.document.createTextNode(data_);
        hitokotoSpan.appendChild(textNode);
        parent.insertBefore(hitokotoSpan, nextSibling);
        this.domNodes.push(hitokotoSpan);
      })
      .catch(console.error);
  };

  exports.hitokoto = Hitokoto;
})();
