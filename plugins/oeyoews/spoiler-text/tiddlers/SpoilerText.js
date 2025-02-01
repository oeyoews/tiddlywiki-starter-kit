/*\
title: $:/plugins/oeyoews/spoiler-text/SpoilerText.js
type: application/javascript
module-type: library

\*/
class SpoilerText extends HTMLElement {
  constructor() {
    super();
  }
  addEventListeners() {
    this.wrapper.classList.toggle('revealed');
  }
  // https://talk.tiddlywiki.org/t/web-component-cannot-get-textcontent/11756/3
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_custom_elements
  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `.spoiler{display:inline-block;filter:blur(0.5em);transition: filter 0.1s ease;}.spoiler:hover{cursor:pointer;filter:blur(0.18em);}.spoiler.revealed{filter:blur(0); }`;

    this.wrapper = document.createElement('span');
    this.wrapper.classList.add('spoiler');
    this.shadowRoot.append(style, this.wrapper);
    const text =
      this.getAttribute('text')?.length > 0 &&
      !['true', 'false'].includes(this.getAttribute('text'))
        ? this.getAttribute('text')
        : `<slot></slot>`;
    this.wrapper.innerHTML = $tw.wiki.renderText(
      'text/html',
      'text/vnd.tiddlywiki',
      text,
      {
        parseAsInline: true,
      },
    );

    this.wrapper.addEventListener('click', () => {
      this.addEventListeners();
    });
  }
  disconnectedCallback() {
    this.wrapper.removeEventListener('click', () => {
      this.addEventListeners();
    });
  }
}
class ST extends SpoilerText {}

module.exports = { SpoilerText, ST };
