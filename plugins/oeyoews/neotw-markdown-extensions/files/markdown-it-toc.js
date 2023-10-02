// href: https://github.com/peoplefund-tech/markdown-it-wiki-toc/blob/master/index.js

// TODO: 各级标题折叠, 目录折叠, 样式控制, 一级标题序号zero
(function() {
  'use strict';

  var defaultOptions = {
    tocRegexp: /@\[toc\]/im,
    tocTitle: '🌴 Table of Contents',
    tocId: 'toc',
    tocWrapperClass: 'toc',
    tocLevelWrapperClass: 'toc-level',
    anchorIdPrefix: '#h-',
    reverseLink: false,
  };

  module.exports = function(md, options) {
    // Set default options
    var options = Object.assign({}, defaultOptions, options);

    // Global variables
    var headingInfos = [];

    md.inline.ruler.after('emphasis', 'toc', function(state, silent) {
      if (silent) {
        return false;
      }

      var match = options.tocRegexp.exec(state.src);
      match = !match
        ? []
        : match.filter(function(m) {
          return m;
        });
      if (match.length < 1) {
        return false;
      }

      var token;

      token = state.push('toc_open', 'toc', 1);
      token.markup = match[0];
      token = state.push('toc_body', '', 0);
      token = state.push('toc_close', 'toc', -1);

      // to continue pasing, Update pos
      state.pos = state.pos + match[0].length;
      return true;
    });

    // TODO: NAN
    // 折叠
    // 悬浮显示标题
    md.core.ruler.push('init_toc', function(state) {
      // For each rendering, initialize heading count
      var headingCounts = [0, 0, 0, 0, 0, 0, 0];
      var tokens = state.tokens;

      // Parses all heading information to render the TOC
      for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].type === 'heading_open') {
          var tagLevel = parseInt(tokens[i].tag[1]);
          var numbering = [];

          headingCounts[tagLevel] += 1;

          for (var j = 1; j < headingCounts.length; j++) {
            if (j <= tagLevel) {
              numbering.push(headingCounts[j]);
            } else {
              headingCounts[j] = 0;
            }
          }

          var hInfo = {
            numbering: numbering,
            content: tokens[i + 1].content,
          };

          headingInfos.push(hInfo);
        }
      }
    });

    md.renderer.rules.toc_open = function(tokens, index) {
      return `
      <div id="${options.tocId}" class="${options.tocWrapperClass}">
        <h3>${options.tocTitle}</h3>
    `;
    };

    md.renderer.rules.toc_close = function(token, index) {
      return '</div>';
    };

    md.renderer.rules.toc_body = function(tokens, index) {
      var results = [];
      var previousLevel = 0;

      for (var i = 0; i < headingInfos.length; i++) {
        var hInfo = headingInfos[i];

        // 跳过超过三级的标题
        if (hInfo.numbering.length > 3) {
          continue;
        }

        var levelDiff = hInfo.numbering.length - previousLevel;

        if (levelDiff > 0) {
          for (var _ = 0; _ < levelDiff; _++) {
            results.push('<ul class="' + options.tocLevelWrapperClass + '">');
          }
        } else if (levelDiff < 0) {
          for (var _ = 0; _ > levelDiff; _--) {
            results.push('</ul>');
          }
        }

        var numberingStr = hInfo.numbering.join('.');
        var anchor = options.anchorIdPrefix + numberingStr;

        // TODO: how to support multiple tiddlers anchors
        results.push(`
          <li class="capitalize">
            <a href="#${anchor}">
              📝 ${numberingStr} ${hInfo.content}
            </a>
          </li>
        `);

        previousLevel = hInfo.numbering.length;
      }

      for (var i = 0; i < previousLevel; i++) {
        results.push('</ul>');
      }

      return results.join('');
    };

    md.renderer.rules.heading_open = function(tokens, index) {
      var hInfo = headingInfos.shift();
      var numberingStr = hInfo.numbering.join('.');
      var anchor = options.anchorIdPrefix + numberingStr;

      return `
    <${tokens[index].tag}>
      <a href="#${options.reverseLink ? options.tocId : anchor}" id="${anchor}"></a>
  `;
    };
  };
})();
