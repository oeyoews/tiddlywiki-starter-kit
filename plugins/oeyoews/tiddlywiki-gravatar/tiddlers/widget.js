/*\
title: $:/plugins/oeyoews/tiddlywiki-gravatar/widget.js
type: application/javascript
module-type: widget

Gravatar and QQ GitHub Avatar Widget(Lastest gqg)

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class AvatarWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const ssr = parent.isTiddlyWikiFakeDom;
    if (ssr) return;

    const createElement = $tw.utils.domMaker;
    const md5 = require('$:/plugins/oeyoews/tiddlywiki-gravatar/md5.min.js');
    const { observer } = new $tw.ImageObserver();

    let getDefaultEmail =
      $tw.wiki.getTiddlerText(
        '$:/config/plugins/oeyoews/tiddlywiki-gravatar/email'
      ) || '2956398608@qq.com';
    const Username = $tw.wiki.getTiddlerText('$:/status/UserName') || 'oeyoews';

    const {
      email = getDefaultEmail /** @example url="./files/xxx.png" url="https://xxx.png" */,
      url,
      username = Username,
      center,
      inline,
      link,
      class: className = 'w-[48px]',
      size = 100,
      alt = 'Avatar',
      type,
      key = 'sea'
    } = this.attributes;

    const hash = md5(email.trim().toLowerCase());

    const UNSPLASH = 'http://source.unsplash.com';
    const QQ = 'https://q1.qlogo.cn';
    const GitHub = 'https://github.com';

    const types = {
      unsplash: `${UNSPLASH}/random?${key}`,
      qq: `${QQ}/g?b=qq&nk=${email}&s=${size}`,
      github: `${GitHub}/${username}.png?size=${size}`,
      gravatar: `https://gravatar.com/avatar/${hash}.png?s=${size}`,
      gcn: `https://cn.gravatar.com/avatar/${hash}.png?s=${size}`,
      url
    };

    const hasType = Object.keys(types).includes(type);

    const src = hasType ? types[type] : types.qq;

    const imgClass = `rounded-full align-middle transition-all object-cover object-center ${className} aspect-square`;

    const imageNode = createElement('img', {
      class: imgClass,
      attributes: {
        'data-src': src
        // alt,
      }
    });

    observer.observe(imageNode);

    if (inline) {
      imageNode.classList.remove('w-[48px]');
      imageNode.classList.add(
        'mx-0',
        'w-[20px]',
        // 'outline',
        // 'outline-1',
        'p-0.5'
      );
      // imageNode.style.width = '1em';
      // imageNode.style.height = '1em';
    }

    const tempClassList = 'mx-auto shadow-md block outline outline-1 p-1';

    center && imageNode.classList.add(...tempClassList.split(' '));

    // types[type]?.includes(type) && img.setAttribute('data-type', type);

    // 考虑图片加载失败，但是不考虑图片加载超时 (offline)
    imageNode.onerror = () => {
      // console.warn(src, '图片加载失败');
      imageNode.src =
        'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&s=100';
    };

    const linkNode = createElement('a', {
      attributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
        style: 'text-decoration: none;',
        href: link
      },
      children: [imageNode]
    });

    const domNode = link ? linkNode : imageNode;

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }

  refresh() {
    return false;
  }
}

/**
 * @description Gravatar and QQ  GitHub Avatar Widget
 * @param {string} username
 * @param {string} email
 * @param {string} type
 * @param {string} size
 * @param {string} link
 * @param {string} center
 * @param {string} alt
 */
exports.avatar = AvatarWidget;
