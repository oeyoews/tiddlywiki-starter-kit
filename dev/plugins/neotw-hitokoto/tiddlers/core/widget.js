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

    var self = this;

    var hitokotoSpan = this.document.createElement('span');
    hitokotoSpan.className = 'hitokoto';
    parent.insertBefore(hitokotoSpan, nextSibling);
    this.domNodes.push(hitokotoSpan);

    function fetchHitokoto() {
      fetch('https://v1.hitokoto.cn')
        .then(response => response.json())
        .then(data => {
          var hitokotoText = data.hitokoto + ' @' + data.from;
          hitokotoSpan.textContent = hitokotoText;
        })
        .catch(console.error);
    }

    hitokotoSpan.addEventListener('click', function () {
      fetchHitokoto();
    });

    fetchHitokoto();
  };

  exports.hitokoto = Hitokoto;
})();
