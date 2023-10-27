/*\
title: $:/plugins/oeyoews/hitokoto/widget.js
type: application/javascript
module-type: widget

hitokoto widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const MarkdownIt = require('$:/plugins/tiddlywiki/markdown/markdown-it');

class HitokotoWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;
    // getall journal tiddler
    const journalTiddlers = $tw.wiki.filterTiddlers(
      '[tag[Journal]!sort[created]]',
    );

    const children = [];
    function parseAsBoolean(tiddlerName) {
      return (
        $tw.wiki.getTiddlerText(tiddlerName, 'false').trim().toLowerCase() ===
        'true'
      );
    }

    const md = new MarkdownIt({
      html: true,
      xhtmlOut: true,
      breaks: parseAsBoolean('$:/config/markdown/breaks'),
      quotes: $tw.wiki.getTiddlerText('$:/config/markdown/quotes').trim(),
      typographer: parseAsBoolean('$:/config/markdown/typographer'),
      linkify: parseAsBoolean('$:/config/markdown/linkify'),
    });

    md.use(require('$:/plugins/cdr/markdown-more/markdown-it-checklist.js'))
      // bug
      // .use(require('$:/plugins/tiddlywiki/markdown/markdown-it-tiddlywiki.js'))
      .use(require('$:/plugins/cdr/markdown-more/markdown-it-admonition'));

    function getRandomColor(colors) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }

    const colors = [
      'slate',
      'gray',
      'zinc',
      'neutral',
      'stone',
      'red',
      'orange',
      'amber',
      'yellow',
      'lime',
      'green',
      'emerald',
      'teal',
      'cyan',
      'sky blue',
      'indigo',
      'violet',
      'purple',
      'fuchsia',
      'pink',
      'rose',
    ];

    journalTiddlers.map((tiddler) => {
      const color = getRandomColor(colors);
      const { text, created, creator, type, title } =
        $tw.wiki.getTiddler(tiddler).fields;
      let content;
      if (type == 'text/markdown') {
        content = md.render(text);
      } else {
        // https://github.com/Jermolene/TiddlyWiki5/pull/7413
        content = $tw.wiki.renderText('text/html', 'text/vnd.tiddlywiki', text);
      }
      const link = `[[${title}]]`;
      content += $tw.wiki.renderText('text/html', 'text/vnd.tiddlywiki', link);
      const htNode = this.document.createElement('blockquote');
      htNode.className = `my-4 bg-${color}-200 p-2 rounded border-l-[3px] border-l-${color}-300`;
      htNode.innerHTML = content;
      children.push(htNode);
    });

    const domNode = createElement('div', {
      children,
    });

    parent.insertBefore(domNode, nextSibling);
    this.domNodes.push(domNode);
  }
}

/**
 * @description hitokoto widget
 * @param text
 */
exports.ht = HitokotoWidget;
