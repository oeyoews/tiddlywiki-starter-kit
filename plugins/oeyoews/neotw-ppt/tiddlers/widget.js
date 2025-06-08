/*\
title: $:/plugins/oeyoews/neotw-ppt/widget.js
type: application/javascript
module-type: widget

neotw-ppt widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');
const { assignDataset } = require('./utils');

function loadReveal() {
  return [
    require('$:/plugins/oeyoews/neotw-ppt/reveal.js'),
    [
      require('$:/plugins/oeyoews/neotw-ppt/highlight.js'),
      require('$:/plugins/oeyoews/neotw-ppt/zoom.js'),
      require('./markdown.js'),
    ],
  ];
}

class PresentationWidget extends Widget {
  render(parent, nextSibling) {
    let [Reveal, revealPlugins] = loadReveal();
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    let revealNode = this.document.createElement('DIV');
    let slidesNode = this.document.createElement('DIV');
    revealNode.classList.add('reveal');
    revealNode.style.height = this.getHeight();
    slidesNode.classList.add('slides');
    this.renderChildren(slidesNode);
    this.pruneErroneousWrappings(slidesNode);
    revealNode.appendChild(slidesNode);
    parent.insertBefore(revealNode, nextSibling);
    this.domNodes.push(revealNode);
    this.revealInstance = new Reveal(revealNode, {
      embedded: true,
      keyboardCondition: 'focused',
      plugins: revealPlugins,
    });
    this.revealInstance.initialize(assignDataset({}, this.attributes));
  }

  refresh(changedTiddlers) {
    let shouldRerender = this.refreshChildren(changedTiddlers);
    if (shouldRerender) {
      this.refreshSelf();
    }
    return shouldRerender;
  }

  getHeight() {
    let height = this.getAttribute('$height', '400');
    if (/[0-9]$/.test(height)) {
      height = `${height}px`;
    }
    return height;
  }

  pruneErroneousWrappings(root) {
    let sections = root.querySelectorAll('section');
    for (let section of sections) {
      if (section.parentNode.tagName !== 'P') {
        continue;
      }
      this.pruneErroneousWrapping(section.parentNode);
    }
  }

  pruneErroneousWrapping(el) {
    let parent = el.parentNode;
    while (el.firstChild) {
      parent.insertBefore(el.firstChild, el);
    }
    parent.removeChild(el);
  }
}

exports.presentation = PresentationWidget;
