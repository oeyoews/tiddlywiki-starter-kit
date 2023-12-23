/*\
title: $:/plugins/oeyoews/ejs/widget.js
type: application/javascript
module-type: widget

ejs widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class EJSWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const templateFile = '$:/plugins/oeyoews/ejs/templates/test.ejs';
    // NOTE: 不要用$tw.wiki.tiddlerExists 判断插件的某一个 tiddler 是否存在
    // if ($tw.wiki.tiddlerExists(templateFile)) {
    //   console.warn(templateFile, '文件不存在');
    //   return;
    // }
    const template = $tw.wiki.getTiddlerText(templateFile);

    if (!template) {
      return;
    }

    const ejs = require('ejs.min.js');
    const createElement = $tw.utils.domMaker;
    const people = ['geddy', 'neil', 'alex'];
    const html = ejs.render(template, { people });

    const domNode = createElement('div', {});
    domNode.innerHTML = html;

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description ejs widget
 */
exports.ejsTest = EJSWidget;
