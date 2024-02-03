/*\
title: $:/plugins/oeyoews/neotw-contextmenu/listener.js
type: application/javascript
module-type: widget

neotw-contextmenu widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class ContextMenuWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.menu = null;
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const menuNode = this.document.createElement('div');
    menuNode.className = 'context-menu';
    this.menu = menuNode;

    menuNode.id = 'contextMenu';
    menuNode.style.display = 'none';
    menuNode.style.zIndex = '9999';
    const btn = this.document.createElement('li');
    btn.textContent = '99';
    menuNode.append(btn);

    parent.addEventListener('contextmenu', (event) => this.contextmenu(event));

    // parent.insertBefore(menuNode, nextSibling);
    // this.domNodes.push(menuNode);
  }

  contextmenu(event) {
    console.log(event.pageX);
    const menu = this.menu;
    if (menu.style.display == 'block') {
      console.log('hide');
    } else {
      console.log('showmenu');
      menu.style.display = 'block';
      menu.style.left = event.pageX + 'px';
      menu.style.top = event.pageY + 'px';
    }

    event.preventDefault();
    return false;
  }
  sanitize(string) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
  }

  menuClicked(event) {
    var action = event.target.getAttribute('action');
    var targ = event.target.getAttribute('targ');
    let text;
    // this.hideMenu();

    switch (action) {
      case 'tm-copy-to-clipboard':
        text = $tw.wiki.getTiddlerText(targ);
        this.dispatchEvent({ type: action, param: text });
        break;
      default:
        this.dispatchEvent({ type: action, param: targ });
    }

    event.preventDefault();
    return false;
  }

  refresh() {
    return false;
  }
}

exports.contextMenu = ContextMenuWidget;
