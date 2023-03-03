(function () {
  'use strict';

  var Widget = require('$:/core/modules/widgets/widget.js').widget;
  var TwikooNodeWidget = function (parseTreeNode, options) {
    this.initialise(parseTreeNode, options);
  };

  var giscusConfigTiddler = '$:/plugins/oeyoews/tiddlywiki-giscus/config';
  var giscusConfigTiddlerGet = $tw.wiki.getTiddler(giscusConfigTiddler);
  var config = giscusConfigTiddlerGet ? giscusConfigTiddlerGet.fields : {};

  TwikooNodeWidget.prototype = new Widget();
  TwikooNodeWidget.prototype.render = function (parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    var id = this.getAttribute('id', '');
    if (id === '') return;
    var scriptNode = this.document.createElement('script');
    scriptNode.setAttribute(
      'src',
      'https://cdn.staticfile.org/twikoo/1.6.10/twikoo.all.min.js',
    );
    console.log('twikoo one');
    // twikoo({
    //   envId: 'https://twikoo.oeyoewl.top', // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
    //   el: '#twikoo', // 容器元素
    //   lang: 'en',
    //   path: id,
    // });

    scriptNode.setAttribute('crossorigin', 'anonymous');
    // scriptNode.setAttribute('async', 'true');
    // Clear other comment nodes' giscus class
    var commentNodes = this.document.querySelectorAll('.giscus');
    for (var i = 0, len = commentNodes.length; i < len; i++) {
      commentNodes[i].classList.remove('giscus');
    }
    // Find or create
    var commentNode = this.document.querySelector(
      '.oeyoews-giscus[tiddler-title="' + id.replace('"', '\\"') + '"]',
    );
    if (!commentNode) {
      commentNode = this.document.createElement('div');
      commentNode.setAttribute('class', 'giscus oeyoews-giscus');
      commentNode.setAttribute('tiddler-title', id);
      parent.insertBefore(commentNode, nextSibling);
      this.domNodes.push(commentNode);
    }
    parent.insertBefore(scriptNode, nextSibling);
    this.domNodes.push(scriptNode);
  };
  TwikooNodeWidget.prototype.execute = function () {};
  TwikooNodeWidget.prototype.refresh = function () {
    var changedAttributes = this.computeAttributes();
    if (Object.keys(changedAttributes).length > 0) {
      this.refreshSelf();
      return true;
    } else {
      return false;
    }
  };
  exports.twikoo = TwikooNodeWidget;
})();
