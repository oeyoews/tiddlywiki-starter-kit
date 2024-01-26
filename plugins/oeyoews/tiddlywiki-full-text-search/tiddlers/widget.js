/*\
title: $:/plugins/oeyoews/tiddlywiki-full-text-search/widget.js
type: application/javascript
module-type: widget

tiddlywiki-full-text-search widget

\*/

// @ts-check
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class FullTextWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = parent.isTiddlyWikiFakeDom;
    if (ssr) return;

    if (this.term && this.term.length >= Number(this.minTermLength)) {
      this.createRegexp();
      const matches = this.executeRegexp();
      if (matches.length > 0) {
        this.domNode = this.document.createElement(this.element);
        this.domNode.className = 'tw-context';
        this.composeResults(matches); //this appends to domNode
        // Insert element
        parent.insertBefore(this.domNode, nextSibling);
        this.renderChildren(this.domNode, null);
        this.domNodes.push(this.domNode);
      }
    }
  }

  execute() {
    // Get the parameters from the attributes
    this.matchedClass = this.getAttribute('matchClass', 'matched');
    this.minTermLength = this.getAttribute('min-term-length', '3');
    this.tiddler = this.getAttribute(
      'tiddler',
      this.getVariable('currentTiddler')
    );
    this.term = this.getAttribute('term', this.getAttribute('searchTerm'));
    this.contextLength = this.getAttribute('length', '50');
    this.before = this.getAttribute('before', this.contextLength);
    this.after = this.getAttribute('after', this.contextLength);
    this.maxMatches = this.getAttribute('maxMatches', '10');
    this.element = this.getAttribute('element', 'pre');
    this.makeChildWidgets();
  }

  createRegexp() {
    var regString =
      '(\\w+[\\s\\S]{0,#before#})?(#term#)([\\s\\S]{0,#after#}\\w+)?';

    var regString = regString
      .replace('#before#', this.before)
      .replace('#term#', $tw.utils.escapeRegExp(this.term))
      .replace('#after#', this.after);
    this.regexp = new RegExp(regString, 'ig');
  }

  executeRegexp() {
    const text = this.wiki.getTiddlerText(this.tiddler);
    let match = [];
    const results = [];
    while (
      (match = this.regexp.exec(text)) &&
      results.length < Number(this.maxMatches)
    ) {
      results.push(match);
    }
    //console.log("matches",results);
    return results;
  }
  composeResults(matches) {
    const result = [],
      self = this,
      node = this.domNode,
      dots = textNode('...\n'),
      span = matchedNode(this.term);

    for (let i = 0; i < matches.length; i++) {
      processMatch(matches[i]);
    }

    function processMatch(match) {
      if (match.index !== 0) node.appendChild(dots.cloneNode(true));
      for (let i = 1; i < match.length; i++) {
        //match[0] full matched text (all groups together)
        if (match[i]) {
          if (match[i].toLowerCase() == self.term.toLowerCase())
            node.appendChild(
              match[i] == self.term
                ? span.cloneNode(true)
                : matchedNode(match[i])
            );
          else node.appendChild(textNode(match[i]));
        }
      }
      if (match.index + match[0].length < match.input.length)
        node.appendChild(dots.cloneNode(true));
    }

    function textNode(text) {
      return self.document.createTextNode(text);
    }
    function matchedNode(text) {
      const node = self.document.createElement('span');
      node.appendChild(textNode(text));
      node.className = self.matchedClass;
      return node;
    }
  }

  refresh(changedTiddlers) {
    // here use debounce almost no more performace better. because widget selcdom refresh.
    this.debounce(() => {
      const changedAttributes = this.computeAttributes();
      if (
        changedAttributes.tiddler ||
        changedAttributes.term ||
        changedAttributes.length ||
        changedAttributes.matchedClass
      ) {
        this.refreshSelf();
        return true;
      }
      return this.refreshChildren(changedTiddlers);
    }, 400);
  }

  debounce(fn, delay = 400) {
    let timer = null;

    return function (...arg) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...arg);
      }, delay);
    };
  }
}

/** @description tiddlywiki-full-text-search widget */
exports['fulltextSearch'] = FullTextWidget;
