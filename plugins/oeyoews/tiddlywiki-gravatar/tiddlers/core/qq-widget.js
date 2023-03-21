/*\
title: $:/plugins/oeyoews/tiddlywiki-gravatar/qq-avatar/widget.js
type: application/javascript
module-type: widget

QQ Avatar Widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  var Widget = require('$:/core/modules/widgets/widget.js').widget;

  var QQAvatarWidget = function (parseTreeNode, options) {
    this.initialise(parseTreeNode, options);
  };

  /*
Inherit from the base widget class
*/
  QQAvatarWidget.prototype = new Widget();

  /*
Render this widget into the DOM
*/
  QQAvatarWidget.prototype.render = function (parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    const getDefaultEmail = $tw.wiki.getTiddlerText(
      '$:/config/plugins/oeyoews/tiddlywiki-gravatar/email',
    );
    const width = this.getAttribute('width', '56');
    var qq = this.getAttribute('qq', getDefaultEmail || '2956398608'),
      size = this.getAttribute('size', '100'),
      alt = this.getAttribute('alt', 'QQ Avatar'),
      gclass = this.getAttribute('gclass', 'gravatar-56'),
      src = 'https://q1.qlogo.cn/g?b=qq&nk=' + qq + '&s=' + size;
    // Create element
    const qqContainer = this.document.createElement('div');
    qqContainer.setAttribute('style', `max-width: ${width}px`);
    qqContainer.className = gclass;

    var img = this.document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    img.setAttribute('class', gclass);

    qqContainer.appendChild(img);
    // Insert element
    parent.insertBefore(qqContainer, nextSibling);
    this.domNodes.push(qqContainer);
  };

  /*
Compute the internal state of the widget
*/
  QQAvatarWidget.prototype.execute = function () {
    // Nothing to do
  };

  exports['qq-avatar'] = QQAvatarWidget;
})();
