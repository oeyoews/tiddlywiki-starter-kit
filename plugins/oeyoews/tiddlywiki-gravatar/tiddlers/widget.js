/*\
title: $:/plugins/oeyoews/tiddlywiki-gravatar/gqwidget.js
type: application/javascript
module-type: widget

Gravatar and QQ Github Avatar Widget(Lastest gqg)

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

      let getDefaultEmail =
        $tw.wiki.getTiddlerText(
          '$:/config/plugins/oeyoews/tiddlywiki-gravatar/email',
        ) || '2956398608@qq.com';
      const Username =
        $tw.wiki.getTiddlerText('$:/status/UserName') || 'oeyoews';

      /** @example url="./files/xxx.png" url="https://xxx.png" */
      const url = this.getAttribute('url', '');
      const username = this.getAttribute('username', Username);
      let isCenter = this.getAttribute('center');
      const inline = this.getAttribute('inline');
      const link = this.getAttribute('link');
      let className = this.getAttribute('class', 'w-12');
      const email = this.getAttribute('email', getDefaultEmail);

      let size = this.getAttribute('size', '100');
      let alt = this.getAttribute('alt', 'Avatar');
      const hash = md5(email.trim().toLowerCase());

      let src;

      const types = {
        qq: 'https://q1.qlogo.cn/g?b=qq&nk=${email}&s=${size}',
        github: `https://github.com/${username}.png?size=${size}`,
        gravatar: `https://gravatar.com/avatar/${hash}.png?s=${size}`,
        gravatar_cn: `https://cn.gravatar.com/avatar/${hash}.png?s=${size}`,
        url,
      };

      const type = this.getAttribute('type', 'gravatar');
      if (types[type]) {
        src = types[type];
      }

      types[type]?.includes(type)
        ? (src = types[type])
        : (src = types.gravatar);

      const img = new Image();
      const dynamicClasses = ['blur', 'scale-105'];
      const imgClass = `rounded-full align-middle duration-200 transition object-cover object-center ${className}`;
      img.className = imgClass;
      img.classList.add(...dynamicClasses);
      img.setAttribute('src', src);
      if (inline) {
        img.classList.remove('w-12');
        img.classList.add('mx-0', 'w-4');
      }
      if (isCenter) {
        img.classList.add(
          'block',
          'mx-auto',
          'shadow-md',
          'border-dashed',
          'border',
          'border-indigo-400',
          'p-1',
        );
      }
      img.setAttribute('data-type', type);
      // 考虑图片加载失败, 但是不考虑图片加载超时(offline)
      img.onerror = () => {
        img.classList.remove(...dynamicClasses);
        img.src =
          'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&s=100';
      };
      img.onload = () => {
        img.classList.remove(...dynamicClasses);
      };
      img.setAttribute('alt', alt);

      let domNode = img;
      if (link) {
        domNode = $tw.utils.domMaker('a', {
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
            style: 'text-decoration: none;',
            href: link,
          },
          children: [img],
        });
      }

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
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
