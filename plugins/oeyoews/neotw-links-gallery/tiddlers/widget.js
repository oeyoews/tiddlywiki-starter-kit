/*\
title: $:/plugins/oeyoews/neotw-links-gallery/widget.js
type: application/javascript
module-type: widget

neotw-links-gallery widget

\*/

const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class ListlinksWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;
    const { json = 'list-links.json' } = this.attributes;
    const { caption } =
      $tw.wiki.getTiddler(json).fields || {}

    const data = $tw.wiki.getTiddlerData(json) || {};
    const linksURL = Object.entries(data);

    let linkcount = 0;
    const createTableData = (text, href) => {
      const createLinkNode = (text, href) =>
        createElement('a', {
          text,
          attributes: {
            href,
            target: '_blank',
          },
        });

      const tr = this.document.createElement('tr');
      const td = this.document.createElement('td');
      td.className = 'p-2 bg-gray-200 dark:bg-black capitalize';
      tr.append(td);
      td.append(createLinkNode(text, href));
      return tr;
    };

    const createThNode = (caption) => {
      const tr = this.document.createElement('tr');
      const th = this.document.createElement('th');
      tr.append(th);
      th.textContent = `${caption} (${linkcount} links)`;
      th.className = 'font-bold capitalize';
      return tr;
    };

    const children = [];

    linksURL.forEach(([text, href]) => {
      children.push(createTableData(text, href));
      linkcount++;
    });
    children.unshift(createThNode(caption));

    const domNode = createElement('table', {
      children,
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description
 * @param {json}
 */
exports['list-links'] = ListlinksWidget;
