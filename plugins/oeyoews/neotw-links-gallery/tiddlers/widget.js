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
    this.jsonfile = null;
  }

  render(parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;
    const { json = 'list-links.json' } = this.attributes;
    this.jsonfile = json;
    const { caption } = $tw.wiki.getTiddler(json).fields || {};
    const isStoryRiver = this.getVariable('storyTiddler') !== undefined;

    const data = $tw.wiki.getTiddlerData(json) || {};
    const linksURL = Object.entries(data);

    let linkcount = 0;
    const createTableData = (text, href, order) => {
      const tr = this.document.createElement('tr');
      const orderNode = this.document.createElement('td');
      const descriptionNode = this.document.createElement('td');
      const linkNode = this.document.createElement('td');
      if (!href.startsWith('http')) {
        console.warn(`${href} is not a valid link`);
      }

      try {
        const { protocol, hostname } = new URL(href);
        const url = `${protocol}//${hostname}`;
        const createLinkNode = (text, href) =>
          createElement('a', {
            text: hostname,
            attributes: {
              href,
              title: url,
              target: '_blank',
            },
          });

        descriptionNode.className =
          'p-2 bg-gray-200 dark:bg-black font-bold capitalize';
        linkNode.className = 'p-2 bg-gray-200 dark:bg-black font-bold';
        descriptionNode.textContent = text;
        orderNode.textContent = order;
        orderNode.className =
          'font-bold bg-gray-100 dark:bg-black group-hover:bg-gray-300 group-hover:dark:bg-gray-800 transiton';
        const children = [descriptionNode, linkNode];
        isStoryRiver && children.unshift(orderNode);
        tr.append(...children);

        tr.className = 'group';
        linkNode.append(createLinkNode(text, href));
      } catch (e) {
        console.warn(e);
      }
      return tr;
    };

    const createThNode = (caption) => {
      const tr = this.document.createElement('tr');
      const orderNode = this.document.createElement('th');
      const descriptionNode = this.document.createElement('th');
      const linkNode = this.document.createElement('th');

      const children = [orderNode, descriptionNode, linkNode];
      tr.append(...children);

      orderNode.textContent = 'Order';
      descriptionNode.textContent = 'Description';
      linkNode.textContent = 'Link';
      tr.className = 'font-bold capitalize';
      return tr;
    };

    const children = [];

    linksURL.forEach(([text, href]) => {
      linkcount++;
      children.push(createTableData(text, href, linkcount));
    });

    isStoryRiver && children.unshift(createThNode(caption));

    const domNode = createElement('table', {
      children,
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
  refresh(changedTiddlers) {
    if (Object.keys(changedTiddlers).includes(this.jsonfile)) {
      this.refreshSelf();
      return true;
    } else {
      return false;
    }
  }
}

/**
 * @description
 * @param {json}
 */
exports['list-links'] = ListlinksWidget;
