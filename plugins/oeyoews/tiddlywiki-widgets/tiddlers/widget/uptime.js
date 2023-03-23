/*\
title: $:/plugins/oeyoews/tiddlywiki-widgets/widget/uptime
type: application/javascript
module-type: widget

uptime
\*/

(function () {
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class SiteUptimeWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
      this.timestamp = Math.round(
        new Date(Date.UTC(2021, 11, 27, 6, 6, 6)).getTime() / 1000,
      );
      this.currentTimeSpan = null;
    }

    updateTime() {
      const timestamp = Math.round(
        (new Date().getTime() + 8 * 60 * 60 * 1000) / 1000,
      );
      const diff = timestamp - this.timestamp;
      const time = this.secondToDate(diff);
      const currentTimeHtml = `This Neotw site has been running ${time[0]} years ${time[1]} days ${time[2]} hours ${time[3]} minutes ${time[4]} seconds`;
      if (this.currentTimeSpan) {
        this.currentTimeSpan.textContent = currentTimeHtml;
      }
      requestAnimationFrame(this.updateTime.bind(this));
    }

    secondToDate(second) {
      if (!second) {
        return [0, 0, 0, 0, 0];
      }
      const time = [0, 0, 0, 0, 0];
      if (second >= 365 * 24 * 3600) {
        time[0] = parseInt(second / (365 * 24 * 3600));
        second %= 365 * 24 * 3600;
      }
      if (second >= 24 * 3600) {
        time[1] = parseInt(second / (24 * 3600));
        second %= 24 * 3600;
      }
      if (second >= 3600) {
        time[2] = parseInt(second / 3600);
        second %= 3600;
      }
      if (second >= 60) {
        time[3] = parseInt(second / 60);
        second %= 60;
      }
      if (second > 0) {
        time[4] = second;
      }
      return time;
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.currentTimeSpan = this.document.createElement('center');
      this.currentTimeSpan.className = 'hitokoto';
      parent.insertBefore(this.currentTimeSpan, nextSibling);
      this.domNodes.push(this.currentTimeSpan);

      this.updateTime();
    }

    refresh() {
      return false;
    }

    detach() {}
  }

  exports.siteuptime = SiteUptimeWidget;
})();
