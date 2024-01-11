/*\
title: $:/plugins/oeyoews/children-test/widget.js
type: application/javascript
module-type: widget

children-test widget

\*/
var Widget = require('$:/core/modules/widgets/widget.js').widget;

var TWSRRuby = function (parseTreeNode, options) {
  this.initialise(parseTreeNode, options);
};

TWSRRuby.prototype = new Widget(); //Inherit from the basey widget class

TWSRRuby.prototype.execute = function () {
  Widget.prototype.execute.call(this);
};

//Render this widget into the DOM
_RubyRender = function (_this, parent, nextSibling, useAnswer) {
  var oc = _this.parseTreeNode.children;
  if (true) {
    _this.parentDomNode = parent;
    _this.computeAttributes();
    var rubyPosition = 'over';
    var ruby = _this.getAttribute('u');
    if (!ruby || ruby == '') {
      var ruby = _this.getAttribute('l');
      if (!ruby || ruby == '') {
      } else {
        rubyPosition = 'under';
      }
    }

    var p = _this;
    var tags = [];
    while (p) {
      var ct = p.getVariable('currentTiddler');
      var tid = $tw.wiki.getTiddler(ct);
      if (tid) {
        tags = tags.concat(tid.getFieldList('tags'));
        tags = tags.filter(function (item, pos) {
          return tags.indexOf(item) == pos;
        });
      }
      p = p.parentWidget;
    }

    var container = _this.document.createElement('span');
    Widget.prototype.render.call(_this, container, null);
    var rtTxt =
      '<rt>' +
      (useAnswer ? '<$a s>' : '') +
      ruby +
      (useAnswer ? '</$a>' : '') +
      '</rt>';
    var wikiParser = $tw.wiki.parseText(
      'text/vnd.tiddlywiki',
      '<ruby style="ruby-position:' +
        rubyPosition +
        '">' +
        container.innerHTML +
        rtTxt +
        '</ruby>',
      { parseAsInline: true }
    );
    console.log(wikiParser.tree);
    _this.parseTreeNode.children = wikiParser.tree;
  }
  Widget.prototype.render.call(_this, parent, nextSibling);
  _this.parseTreeNode.children = oc;
};

TWSRRuby.prototype.render = function (parent, nextSibling) {
  _RubyRender(this, parent, nextSibling, true);
};

exports.r = TWSRRuby;
