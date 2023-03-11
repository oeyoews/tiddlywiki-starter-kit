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
      this.githubCalendarScriptSrc =
        'https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js';
      // this.githubCalendarCssSrc =
      //   'https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css';
    }

    render(parent, nextSibling) {
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const username = this.getAttribute('username', 'oeyoews');
      const GitHubCalendar = require('githubcalendar.js');

      // Create the script element and append it to the head of the document
      // const githubCalendarScript = this.document.createElement('script');
      // githubCalendarScript.src = this.githubCalendarScriptSrc;
      // githubCalendarScript.async = true;
      // this.document.head.appendChild(githubCalendarScript);

      // Create the CSS link element and append it to the head of the document
      // const githubCalendarCss = this.document.createElement('link');
      // githubCalendarCss.rel = 'stylesheet';
      // githubCalendarCss.href = this.githubCalendarCssSrc;
      // this.document.head.appendChild(githubCalendarCss);

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

      // Initialize GitHubCalendar with options
      // githubCalendarScript.addEventListener('load', () => {
      GitHubCalendar(githubCalendarDiv, username, options);
      // });

      console.log(
        '%c🎉 GitHub contributions calendar is now a widget! 🎉',
        'background: linear-gradient(45deg, #fc466b, #3f5efb); color: black;border-radius: 3px;padding: 3px;',
      );
    }

    refresh() {
      return false;
    }

    // detach() {
    // Remove the GitHubCalendar script and CSS link and calendar div
    // const githubCalendarScript = this.document.querySelector(
    //   `[src="${this.githubCalendarScriptSrc}"]`,
    // );
    // if (githubCalendarScript) {
    //   githubCalendarScript.remove();
    // }
    // const githubCalendarCss = this.document.querySelector(
    //   `[href="${this.githubCalendarCssSrc}"]`,
    // );
    // if (githubCalendarCss) {
    //   githubCalendarCss.remove();
    // }
    // const githubCalendarDiv = this.document.querySelector('.calendar');
    // if (githubCalendarDiv) {
    //   githubCalendarDiv.remove();
    // }
    // }
  }

  exports['github-calendar'] = GithubCalendarWidget;
})();
