/*\
title: $:/plugins/oeyoews/tiddlywiki-github-calendar/widget.js
type: application/javascript
module-type: widget

tiddlywiki-github-calendar widget

\*/
(function () {
  // Interactive DOM not available when generating static pages
  if (!$tw.browser) return;
  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class GithubCalendarWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const username = this.getAttribute('username', 'oeyoews');
      const GitHubCalendar = require('$:/plugins/oeyoews/tiddlywiki-github-calendar/githubcalendar.min.js');

      const options = {};
      /* if (this.getAttribute('responsive', 'yes') === 'yes') {
        options.responsive = true;
      }
      if (this.getAttribute('proxy')) {
        const proxyUrl = this.getAttribute('proxy');
        options.proxy = function (username) {
          return fetch(proxyUrl.replace('${username}', username));
        };
      } */

      // Create a div element to hold the calendar
      const githubCalendarDiv = this.document.createElement('div');
      githubCalendarDiv.className = 'calendar';
      githubCalendarDiv.textContent = `Loading the data just for ${username}.`;
      parent.insertBefore(githubCalendarDiv, nextSibling);
      this.domNodes.push(githubCalendarDiv);

      GitHubCalendar(githubCalendarDiv, username, options);
    }
  }

  exports.gcalendar = GithubCalendarWidget;
})();
