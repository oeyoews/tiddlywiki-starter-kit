/*\
title: $:/plugins/oeyoews/tiddlywiki-widgets/widget/githubcalendar
type: application/javascript
module-type: widget

github-calendar js
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
      const GitHubCalendar = require('$:/plugins/oeyoews/tiddlywiki-widgets/githubcalendar.min.js');

      const options = {};
      if (this.getAttribute('responsive', 'yes') === 'yes') {
        options.responsive = true;
      }
      if (this.getAttribute('proxy')) {
        const proxyUrl = this.getAttribute('proxy');
        options.proxy = function (username) {
          return fetch(proxyUrl.replace('${username}', username));
        };
      }

      // Create a div element to hold the calendar
      const githubCalendarDiv = this.document.createElement('div');
      githubCalendarDiv.className = 'calendar';
      githubCalendarDiv.textContent = `Loading the data just for ${username}.`;
      parent.insertBefore(githubCalendarDiv, nextSibling);
      this.domNodes.push(githubCalendarDiv);

      GitHubCalendar(githubCalendarDiv, username, options);

      console.log(
        '%c🎉 GitHub contributions calendar is now a widget! 🎉',
        'background: linear-gradient(45deg, #fc466b, #3f5efb); color: black;border-radius: 3px;padding: 3px;',
      );
    }
  }

  exports['github-calendar'] = GithubCalendarWidget;
})();
