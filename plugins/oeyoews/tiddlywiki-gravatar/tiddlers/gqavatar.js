/*\
title: $:/plugins/oeyoews/tiddlywiki-gravatar/gqwidget.js
type: application/javascript
module-type: widget

Gravatar and QQ  Github Avatar Widget(Lastest gqg)

\*/

/**
 * 提供一个名为 $avatar 的自定义标签, 用于生成用户的头像。
 * 这个插件的实现依赖了 md5.min.js 这个 JavaScript 库，用于计算 Gravatar 头像的哈希值.
 *
 * 该自定义标签支持以下属性：
 * type：头像类型，可选值为 qq、github、gravatar、gravatar-cn。默认值是 qq。
 * email：用户电子邮件地址，用于计算 Gravatar 头像哈希值。默认值是作者的 QQ 邮箱。
 * size：头像大小，单位是像素。默认值是 100。
 * alt：图片的 alt 属性值，用于文字替换或说明。默认值是 Avatar。
 * width：设置图片的最大宽度，如果没有指定 width 属性，则默认为 56px。
 * username：在 GitHub 中使用的用户名，仅在 type 设置为 github 时有效。
 * center：bool 类型，默认值为 false。当设置为 true 时，图片将居中显示。
 * link：要链接到的网址。如果设置了 link，则会为图片添加链接，并且点击头像将跳转到指定网站。
 *
 * 在 render 方法中，该标签会根据属性的设置来生成头像，并添加到 TiddlyWiki 页面中。
 * 整个插件是一个 IIFE（Immediately Invoked Function Expression）函数，其中定义了一个 AvatarWidget 类，在类的内部实现了 render 方法来生成头像。最后通过 exports.avatar = AvatarWidget; 部分将 AvatarWidget 类导出为 $avatar 标签供 TiddlyWiki 使用。
 *
 */

(function() {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;
  const md5 = require('$:/plugins/oeyoews/tiddlywiki-gravatar/md5.min.js');

  class AvatarWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render = function(parent, nextSibling) {
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
      var type = this.getAttribute('type', 'qq');
      var email = this.getAttribute(
        'email',
        getDefaultEmail || '2956398608@qq.com',
      );

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

      // gravatar
      // https://en.gravatar.com/site/implement/images/
      if (type === 'gravatar') {
        const hash = md5(email.trim().toLowerCase());
        src = `https://gravatar.com/avatar/${hash}.png?d=identicon&s=${size}`;
      }
      // gravatar cn not support identicon options
      if (type === 'gravatar-cn') {
        const hash = md5(email.trim().toLowerCase());
        src = `https://cn.gravatar.com/avatar/${hash}.png?s=${size}`;
      }

      var img = this.document.createElement('img');
      img.className = 'rounded-full align-middle m-1 duration-200 transition object-cover object-center';
      if (isCenter) {
        img.className += ' ' + 'block mx-auto  shadow-lg';
      }
      img.setAttribute('style', `max-width: ${width}px`);
      img.setAttribute('src', src);
      img.setAttribute('alt', alt);

      let ele = null;
      if (link) {
        var a = this.document.createElement('a');
        a.appendChild(img);
        a.href = link;
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
        a.setAttribute('style', 'text-decoration: none;');
        ele = a;
      } else {
        ele = img;
      }

      parent.insertBefore(ele, nextSibling);
      this.domNodes.push(ele);
    };
  }

  exports.avatar = AvatarWidget;
})();
