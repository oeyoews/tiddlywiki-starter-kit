/*\
title: $:/plugins/oeyoews/tiddlywiki-gravatar/widget.js
type: application/javascript
module-type: widget

gravatar widget
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  // this md5 lib maybe is the reason of failure to render html
  const md5 = require('$:/plugins/oeyoews/tiddlywiki-gravatar/md5.min.js');

  class Gravatar extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const getDefaultEmail = $tw.wiki.getTiddlerText(
        '$:/config/plugins/oeyoews/tiddlywiki-gravatar/email',
      );
      const email = this.getAttribute(
        'email',
        getDefaultEmail || 'jyao4783@gmail.com',
      );
      // size conflict with style be fixed
      // size will effect this image clear, dont modify it easily
      const size = this.getAttribute('size', '100');
      const galt = this.getAttribute('alt', 'gravatar');

      const gravatarUrl = this.getGravatarUrl(email, size);

      const img = new Image();
      img.src = gravatarUrl;
      img.alt = galt;

      gContainer.appendChild(img);
      parent.insertBefore(gContainer, nextSibling);
      this.domNodes.push(gContainer);
    }

    getGravatarUrl(email, size) {
      const hash = md5(email.trim().toLowerCase());
      // cn or en add options
      return `https://cn.gravatar.com/avatar/${hash}?s=${size}`;
    }
  }

  exports.gravatar = Gravatar;
})();
