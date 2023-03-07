/*\
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

      const hitokotoSpan = this.document.createElement('center');
      hitokotoSpan.className = 'hitokoto';
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
            const hitokotoText = data.hitokoto + ' @' + data.from;
            hitokotoSpan.textContent = hitokotoText;
            console.log(hitokotoText); // 控制台输出 log
          })
          .catch(console.error)
          .finally(() => {
            this.executing = false;
          });
      };

      if (enableClick === 'yes') {
        parent.addEventListener('click', event => {
          if (event.target !== hitokotoSpan) {
            return;
          }
          fetchHitokoto();
        });
      }

      fetchHitokoto();
      if (refreshHitokoto === 'yes') {
        setInterval(fetchHitokoto, refreshTime);
      }
    }
  }

  exports.hitokoto = Hitokoto;
})();
