/*\
title: $:/plugins/oeyoews/neotw-hitokoto/widget.js
type: application/javascript
module-type: widget

Hitokoto widget

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class Hitokoto extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.executing = false;
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      /* param */
      const refreshTime = this.getAttribute('refreshTime', '600000');
      const refreshHitokoto = this.getAttribute('refreshHitokoto', '');
      const enableClick = this.getAttribute('enableClick', 'yes');

      const hitokotoSpan = this.document.createElement('div');
      hitokotoSpan.textContent = 'Loading...';
      hitokotoSpan.className =
        'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-pink-500 to-yellow-500 cursor-pointer text-xs line-clamp-1 m-1';
      parent.insertBefore(hitokotoSpan, nextSibling);
      this.domNodes.push(hitokotoSpan);

      const fetchHitokoto = () => {
        if (parseInt(refreshTime) < 1000) {
          // alert('refreshTime 值过小， 请设置一个合适的数字');
          console.warn('refreshTime 值过小， 请设置一个合适的数字');
          return;
        }
        if (refreshTime === 'true' || refreshTime === '') {
          return;
        }
        // console.log(`🐛 ${refreshTime}`);
        if (this.executing) {
          return;
        }
        this.executing = true;
        fetch('https://v1.hitokoto.cn')
          .then(response => response.json())
          .then(data => {
            // add hover show TODO
            const hitokotoText = data.hitokoto;
            const hitokotoFrom = '@' + data.from;
            hitokotoSpan.textContent = `${hitokotoText} ${hitokotoFrom}`;
            // console.log(hitokotoText);
          })
          .catch(console.error)
          .finally(() => {
            this.executing = false;
          });
      };

      if (enableClick === 'yes' && window.innerWidth > 768) {
        parent.addEventListener('click', event => {
          if (event.target !== hitokotoSpan) {
            event.preventDefault();
            return;
          }
          fetchHitokoto();
        });
        // copy
        /* hitokotoSpan.setAttribute('title', '点击复制, 右键切换');
        hitokotoSpan.addEventListener('click', () => {
          document.execCommand('copy');
          window.getSelection().removeAllRanges();
        });
        document.addEventListener('copy', event => {
          event.preventDefault();
          if (event.clipboardData) {
            const hitokotoText = hitokotoSpan.textContent;
            event.clipboardData.setData('text/plain', hitokotoText);
          }
          pushNotify();
        }); */
      }

      fetchHitokoto();
      if (refreshHitokoto === 'yes') {
        setInterval(fetchHitokoto, refreshTime);
      }
    }
  }

  exports.hitokoto = Hitokoto;
})();
