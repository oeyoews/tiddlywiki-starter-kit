/*\
title: $:/plugins/oeyoews/tiddlywiki-gravatar/widget.js
type: application/javascript
module-type: widget

gravatar widget
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  // if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  // this md5 lib maybe is the reason of failure to render html
  const md5 = require('$:/plugins/oeyoews/tiddlywiki-gravatar/md5.min.js');

  class Gravatar extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    // TODO support use fancybox to view
    render(parent, nextSibling) {
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
      // image size(container)
      const width = this.getAttribute('width', '56');
      // add width
      // dont modify it, unless you know that how to work
      const galt = this.getAttribute('alt', 'gravatar');

      const gravatarUrl = this.getGravatarUrl(email, size);

      const img = this.document.createElement('img');
      img.src = gravatarUrl;
      img.alt = galt;

      gContainer.appendChild(img);
      parent.insertBefore(gContainer, nextSibling);
      this.domNodes.push(gContainer);
    }

    getGravatarUrl(email, size) {
      const hash = md5(email.trim().toLowerCase());
      // cn or en add options
      const url = `https://cn.gravatar.com/avatar/${hash}?s=${size}`;
      return url;
    }
  }

  exports.gravatar = Gravatar;
})();
