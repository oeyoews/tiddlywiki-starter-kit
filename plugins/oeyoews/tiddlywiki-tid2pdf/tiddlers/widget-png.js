/*\
title: tid2png/widget
type: application/javascript
module-type: widget

tid2png/widget

\*/
(function () {
  'use strict';

  if (!$tw.browser) return;

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class PNGWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const title = this.getVariable('currentTiddler');
      const param = this.getAttribute('param', `Download ${title}.png`);
      const cornerRadius = parseInt(this.getAttribute('cornerRadius', '0'));

      const buttonNode = this.document.createElement('button');
      buttonNode.textContent = param;
      buttonNode.className =
        'rounded-sm bg-lime-200 hover:bg-lime-300 duration-200 transition py-1 px-2 m-1';
      buttonNode.onclick = () => {
        const selector = `[data-tiddler-title="${title}"]`;
        const element = document.querySelector(selector);

        html2canvas(element).then(canvas => {
          const imgData = canvas.toDataURL('image/png');

          const linkNode = document.createElement('a');
          linkNode.href = imgData;
          linkNode.download = `${title}.png`;
          document.body.appendChild(linkNode);

          if (cornerRadius > 0) {
            const img = new Image();
            img.src = imgData;
            img.onload = function () {
              const canvas = document.createElement('canvas');
              canvas.width = this.width;
              canvas.height = this.height;
              const ctx = canvas.getContext('2d');

              ctx.save();
              ctx.beginPath();
              ctx.moveTo(0, cornerRadius);
              ctx.lineTo(0, canvas.height - cornerRadius);
              ctx.quadraticCurveTo(
                0,
                canvas.height,
                cornerRadius,
                canvas.height,
              );
              ctx.lineTo(canvas.width - cornerRadius, canvas.height);
              ctx.quadraticCurveTo(
                canvas.width,
                canvas.height,
                canvas.width,
                canvas.height - cornerRadius,
              );
              ctx.lineTo(canvas.width, cornerRadius);
              ctx.quadraticCurveTo(
                canvas.width,
                0,
                canvas.width - cornerRadius,
                0,
              );
              ctx.lineTo(cornerRadius, 0);
              ctx.quadraticCurveTo(0, 0, 0, cornerRadius);
              ctx.closePath();
              ctx.clip();

              ctx.drawImage(img, 0, 0);

              ctx.restore();

              const newImgData = canvas.toDataURL('image/png');
              linkNode.href = newImgData;
              linkNode.download = `${title}-rounded.png`;
            };
          }

          linkNode.click();
          document.body.removeChild(linkNode);
        });
      };
      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }

    refresh() {
      var changedAttributes = this.computeAttributes();
      if (Object.keys(changedAttributes).length > 0) {
        this.refreshSelf();
        return true;
      } else {
        return false;
      }
    }
  }

  exports.tid2png = PNGWidget;
})();
