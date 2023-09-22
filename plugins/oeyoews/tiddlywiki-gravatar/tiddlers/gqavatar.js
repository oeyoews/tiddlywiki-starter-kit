/*\
title: $:/plugins/oeyoews/tiddlywiki-gravatar/gqwidget.js
type: application/javascript
module-type: widget

Gravatar and QQ  Github Avatar Widget(Lastest gqg)

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const md5 = require('$:/plugins/oeyoews/tiddlywiki-gravatar/md5.min.js');
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class AvatarWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      var getDefaultEmail = $tw.wiki.getTiddlerText(
        '$:/config/plugins/oeyoews/tiddlywiki-gravatar/email',
      );
      const Username = $tw.wiki.getTiddlerText('$:/status/UserName');
      const username = this.getAttribute('username', Username || 'oeyoews');
      var isCenter = this.getAttribute('center');
      const link = this.getAttribute('link');
      var width = this.getAttribute('width', '56');
      var type = this.getAttribute('type');
      var email = this.getAttribute(
        'email',
        getDefaultEmail || '2956398608@qq.com',
      );

      var size = this.getAttribute('size', '100');
      var alt = this.getAttribute('alt', 'Avatar');
      var src = `https://q1.qlogo.cn/g?b=qq&nk=${email}&s=${size}`;
      const hash = md5(email.trim().toLowerCase());

      switch (type) {
        case 'qq':
          src = `https://q1.qlogo.cn/g?b=qq&nk=${email}&s=${size}`;
          break;
        case 'github':
          src = `https://github.com/${username}.png?size=${size}`;
          break;
        case 'gravatar':
          src = `https://gravatar.com/avatar/${hash}.png?d=identicon&s=${size}`;
          break;
        case 'gravatar-cn':
          src = `https://cn.gravatar.com/avatar/${hash}.png?s=${size}`;
          break;
        default:
          src = `https://gravatar.com/avatar/${hash}.png?d=identicon&s=${size}`;
          break;
      }

      const img = new Image();
      img.className =
        'rounded-full align-middle m-1 duration-200 transition object-cover object-center blur scale-105';
      img.setAttribute('style', `max-width: ${width}px`);
      img.setAttribute('src', src);
      img.onload = () => {
        img.classList.remove('blur', 'scale-105');
        if (isCenter) {
          img.classList.add(
            'block',
            'mx-auto',
            'shadow-lg',
            'border-dashed',
            'border',
            'border-indigo-400',
            'p-1',
            'hover:scale-105',
            'delay-200',
          );
        }
      };
      img.setAttribute('alt', alt);
      img.title = "Click to open this user's profile";

      let ele = img;
      if (link) {
        ele = $tw.utils.domMaker('a', {
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
            style: 'text-decoration: none;',
            href: link,
          },
          children: [img],
        });
      }

      parent.insertBefore(ele, nextSibling);
      this.domNodes.push(ele);
    }
  }

  exports.avatar = AvatarWidget;
})();
