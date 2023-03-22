/*\
title: $:/plugins/oeyoews/tiddlywiki-gravatar/gqwidget.js
type: application/javascript
module-type: widget

Gravatar and QQ Avatar Widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  var Widget = require('$:/core/modules/widgets/widget.js').widget;
  var md5 = require('$:/plugins/oeyoews/tiddlywiki-gravatar/md5.min.js');

  var AvatarWidget = function (parseTreeNode, options) {
    this.initialise(parseTreeNode, options);
  };

  /*
  Inherit from the base widget class
  */
  AvatarWidget.prototype = new Widget();

  /*
  Render this widget into the DOM
  */
  AvatarWidget.prototype.render = function (parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    var getDefaultEmail = $tw.wiki.getTiddlerText(
      '$:/config/plugins/oeyoews/tiddlywiki-gravatar/email',
    );
    const Username = $tw.wiki.getTiddlerText('$:/status/UserName');
    const username = this.getAttribute('username', Username || 'oeyoews');
    var width = this.getAttribute('width', '56');
    var type = this.getAttribute('type', 'qq');
    var email = this.getAttribute(
      'email',
      getDefaultEmail || '2956398608@qq.com',
    );

    var gclass = this.getAttribute('gclass', 'gravatar-56');
    var size = this.getAttribute('size', '100');
    var alt = this.getAttribute('alt', 'Avatar');
    var src = `https://q1.qlogo.cn/g?b=qq&nk=${email}&s=${size}`;

    // qq is default
    if (type === 'qq') {
      src = `https://q1.qlogo.cn/g?b=qq&nk=${email}&s=${size}`;
    }

    if (type === 'github') {
      src = `https://github.com/${username}.png?size=${size}`;
    }

    // gravatar en
    if (type === 'gravatar-en') {
      const hash = md5(email.trim().toLowerCase());
      src = `https://en.gravatar.com/avatar/${hash}?s=${size}`;
    }
    // gravatar cn
    if (type === 'gravatar-cn') {
      const hash = md5(email.trim().toLowerCase());
      src = `https://cn.gravatar.com/avatar/${hash}?s=${size}`;
    }
    // Create element
    const avatarContainer = this.document.createElement('div');
    avatarContainer.className = gclass;
    avatarContainer.setAttribute('style', `max-width: ${width}px`);

    var img = this.document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    // img.setAttribute('class', gclass);
    img.setAttribute('style', `max-width: ${width}px`);

    avatarContainer.appendChild(img);
    // Insert element
    parent.insertBefore(avatarContainer, nextSibling);
    this.domNodes.push(avatarContainer);
  };

  /*
  Compute the internal state of the widget
  */
  AvatarWidget.prototype.execute = function () {
    // Nothing to do
  };

  exports['avatar'] = AvatarWidget;
})();
