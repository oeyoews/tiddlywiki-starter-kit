/*\
title: $:/plugins/oeyoews/spoiler-text/SpoilerText.js
type: application/javascript
module-type: library

\*/
class SpoilerText extends HTMLElement {
  constructor() {
    super();
    /** @type {'click' | 'dblclick'} */
    this.listenerType = 'click';
  }
  addEventListeners() {
    this.wrapper.classList.toggle('revealed');
  }
  // https://talk.tiddlywiki.org/t/web-component-cannot-get-textcontent/11756/3
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_custom_elements
  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `.spoiler{display:inline-block;filter:blur(0.5em);transition: filter 0.1s ease;user-select:none;cursor:pointer;}.spoiler:hover{filter:blur(0.18em);}.spoiler.revealed{filter:blur(0); user-select:auto;cursor:auto;}`;

    this.wrapper = document.createElement('span');
    this.wrapper.classList.add('spoiler');
    this.shadowRoot.append(style, this.wrapper);
    const text =
      this.getAttribute('text')?.length > 0 &&
      !['true', 'false'].includes(this.getAttribute('text'))
        ? this.getAttribute('text')
        : `<slot></slot>`;
    if (this.getAttribute('tiddler')) {
      this.wrapper.innerHTML = $tw.wiki.renderTiddler(
        'text/html',
        this.getAttribute('tiddler'),
        {
          parseAsInline: true,
        },
      );
      this.listenerType = 'dblclick';
    } else {
      this.wrapper.innerHTML = text;
    }
    this.wrapper.addEventListener(this.listenerType, () => {
      this.addEventListeners();
    });
  }
  disconnectedCallback() {
    this.wrapper.removeEventListener(this.listenerType, () => {
      this.addEventListeners();
    });
  }
}
class ST extends SpoilerText {}

module.exports = { SpoilerText, ST };
