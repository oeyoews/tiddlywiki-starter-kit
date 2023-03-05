(function () {
  'use strict';

  var Widget = require('$:/core/modules/widgets/widget.js').widget;
  var GiscusNodeWidget = function (parseTreeNode, options) {
    this.initialise(parseTreeNode, options);
  };

  var giscusConfigTiddler = '$:/plugins/oeyoews/tiddlywiki-giscus/config';
  var giscusConfigTiddlerGet = $tw.wiki.getTiddler(giscusConfigTiddler);
  var config = giscusConfigTiddlerGet ? giscusConfigTiddlerGet.fields : {};

  GiscusNodeWidget.prototype = new Widget();
  GiscusNodeWidget.prototype.render = function (parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    var id = this.getAttribute('id', '');
    var lang = this.getAttribute('lang', 'en');
    var theme = this.getAttribute('theme', 'light');
    if (id === '') {
      console.log(`💎 请传入正确的评论区id`);
      return;
    }
    // 如果已经存在相同 id 的评论区，直接返回
    var existingCommentNode = this.document.querySelector(
      '.oeyoews-giscus[tiddler-title="' + id.replace('"', '\\"') + '"]',
    );
    if (existingCommentNode) {
      console.warn(`💎 评论区 "${id}" 已存在`);
      // 如果已经存在评论区，则在插件所在的位置添加一个 span 元素，内容为警告信息
      var warnNode = this.document.createElement('center');
      warnNode.className = 'o-giscus-warn';
      warnNode.textContent = '此评论区已存在，请勿重复渲染！';
      parent.insertBefore(warnNode, nextSibling);
      this.domNodes.push(warnNode);
      console.warn('此评论区已存在，请勿重复渲染！');
      return;
    }
    console.log(`💎 当前评论区为 "${id}"`);
    var scriptNode = this.document.createElement('script');
    scriptNode.setAttribute('src', 'https://giscus.app/client.js');
    var { repo, repoId, categoryId } = config;
    scriptNode.setAttribute('data-repo', repo);
    scriptNode.setAttribute('data-repo-id', repoId);
    scriptNode.setAttribute('data-category', 'General');
    scriptNode.setAttribute('data-category-id', categoryId);

    scriptNode.setAttribute('data-mapping', 'specific');
    scriptNode.setAttribute('data-term', id);
    scriptNode.setAttribute('data-reactions-enabled', '1');
    scriptNode.setAttribute('data-emit-metadata', '1');
    scriptNode.setAttribute('data-input-position', 'bottom');
    scriptNode.setAttribute('data-loading', 'lazy');
    scriptNode.setAttribute('data-theme', theme);
    scriptNode.setAttribute('data-lang', lang);
    scriptNode.setAttribute('crossorigin', 'anonymous');
    scriptNode.setAttribute('async', 'true');
    // 清除其他评论区节点的 giscus class
    var commentNodes = this.document.querySelectorAll('.giscus');
    for (var i = 0, len = commentNodes.length; i < len; i++) {
      commentNodes[i].classList.remove('giscus');
    }
    // 创建新的评论区节点
    var commentNode = this.document.createElement('div');
    commentNode.setAttribute('class', 'giscus oeyoews-giscus');
    commentNode.setAttribute('tiddler-title', id);
    parent.insertBefore(commentNode, nextSibling);
    this.domNodes.push(commentNode);

    parent.insertBefore(scriptNode, nextSibling);
    this.domNodes.push(scriptNode);
  };
  GiscusNodeWidget.prototype.execute = function () {};
  GiscusNodeWidget.prototype.refresh = function () {
    var changedAttributes = this.computeAttributes();
    if (Object.keys(changedAttributes).length > 0) {
      this.refreshSelf();
      return true;
    } else {
      return false;
    }
  };
  exports.giscus = GiscusNodeWidget;
})();
