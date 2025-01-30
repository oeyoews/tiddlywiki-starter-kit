/*\
title: $:/plugins/oeyoews/spoiler-text/startup.js
type: application/javascript
module-type: startup

\*/

exports.platforms = ['browser'];
exports.synchronous = true;
exports.startup = function () {
  class SpoilerText extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      const style = document.createElement('style');
      style.textContent = `.spoiler {
						display: inline-block;
						filter: blur(0.5em);
						transition: filter 0.1s ease;
					}
					.spoiler:hover {
						filter: blur(0.18em);
					}
					.spoiler.revealed {
						filter: blur(0);
					}
				`;

      this.wrapper = document.createElement('span');
      this.wrapper.classList.add('spoiler');
      setTimeout(() => {
        // const text = this.getAttribute('text') || `<slot></slot>`;
        const text = this.getAttribute('text') || this.textContent.trim();
        this.wrapper.innerHTML = text;
      }, 0);

      this.wrapper.addEventListener('click', () => {
        this.wrapper.classList.toggle('revealed');
      });

      this.shadowRoot.append(style, this.wrapper);
    }
  }
  customElements.define('spoilter-text', SpoilerText);
  class ST extends SpoilerText {}
  customElements.define('s-t', ST);
};
