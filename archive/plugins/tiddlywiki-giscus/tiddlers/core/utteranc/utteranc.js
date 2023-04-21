(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'github-comments';

  exports.params = [{ name: 'current' }];

  /*
  Run the macro
  */
  exports.run = function (current) {
    // Interactive DOM not available when generating static pages
    if (!$tw.browser) return;

    /* Remove current Utteranc.es parent element */
    const currentGhCommentsEL = document.getElementById('gh-comments');
    if (currentGhCommentsEL !== null) {
      currentGhCommentsEL.remove();
    }
    var configUtterancTiddler = '$:/plugins/oeyoews/tiddlywiki-utteranc/config';
    var configUtteranc = $tw.wiki.getTiddler(configUtterancTiddler);
    var config = configUtteranc ? configUtteranc.fields : {};

    /* Load Utteranc.es */
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', config.repo);
    script.setAttribute('issue-term', current);
    script.setAttribute('theme', config.theme || 'github-light');
    script.setAttribute('crossorigin', 'anonymous');

    /* Create Github Comments Element */
    const ghCommentsEl = document.createElement('div');
    ghCommentsEl.id = 'gh-comments';
    ghCommentsEl.appendChild(script);

    /* Append to Wrapper */
    document
      .querySelector(
        'div[data-tiddler-title="' + current + '"] .gh-comments-wrapper',
      )
      .appendChild(ghCommentsEl);
  };
})();
