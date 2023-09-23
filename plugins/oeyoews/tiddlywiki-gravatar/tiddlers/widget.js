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

      let getDefaultEmail = $tw.wiki.getTiddlerText(
        '$:/config/plugins/oeyoews/tiddlywiki-gravatar/email',
      );
      const Username = $tw.wiki.getTiddlerText('$:/status/UserName');
      const username = this.getAttribute('username', Username || 'oeyoews');
      let isCenter = this.getAttribute('center');
      const link = this.getAttribute('link');
      let className = this.getAttribute('class', 'w-14');
      let type = this.getAttribute('type');
      let email = this.getAttribute(
        'email',
        getDefaultEmail || '2956398608@qq.com',
      );

      let size = this.getAttribute('size', '100');
      let alt = this.getAttribute('alt', 'Avatar');
      let src = `https://q1.qlogo.cn/g?b=qq&nk=${email}&s=${size}`;
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
      const dynamicClasses = ['blur', 'scale-105'];
      const imgClass = `rounded-full align-middle m-1 duration-200 transition object-cover object-center ${className}`;
      img.className = imgClass;
      img.classList.add(...dynamicClasses);
      img.setAttribute('src', src);
      img.onload = () => {
        img.classList.remove(...dynamicClasses);
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

  /**
   * @description Gravatar and QQ  Github Avatar Widget
   * @param {string} username
   * @param {string} email
   * @param {string} type
   * @param {string} size
   * @param {string} link
   * @param {string} center
   * @param {string} alt
   */
  exports.avatar = AvatarWidget;
})();
