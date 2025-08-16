/*\
title: $:/plugins/oeyoews/neotw-sitemap/sitemapentries.js
type: application/javascript
module-type: macro

Macro to output tiddlers matching a filter to sitemap.xml entries.
http://www.sitemaps.org/protocol.html

\*/

(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'sitemapentries';

  exports.params = [{ name: 'filter' }];

  let XML = {};

  XML.escapify = function (input) {
    return input
      .replace(/</gm, '&lt;')
      .replace(/>/gm, '&gt;')
      .replace(/&/gm, '&amp;')
      .replace(/"/gm, '&quot;')
      .replace(/'/gm, '&apos;');
  };

  XML.twDateToWebDate = function (twDate) {
    return $tw.utils.formatDateString(twDate, 'YYYY-0MM-0DD');
  };

  XML.stringify = function (data) {
    let x = '';
    data.forEach(function (element, index, array) {
      x += '\t<url>\n';
      const server = $tw.wiki.getTiddlerText(
        '$:/plugins/oeyoews/neotw-sitemap/site',
      );
      if (!server) {
        console.info(
          'sitemapentries.js: $:/plugins/oeyoews/neotw-sitemap/site not set',
        );
      }
      x += `\t\t<loc>${server}#:${element.title.replace(/ /g, '%2520')}</loc>\n`;
      if (element.modified) {
        x +=
          '\t\t<lastmod>' +
          XML.twDateToWebDate($tw.utils.parseDate(element.modified)) +
          '</lastmod>\n';
      }
      x += '\t\t<changefreq>';
      if (
        element.title.toLowerCase() === 'index' ||
        element.title.toLowerCase() === 'home'
      ) {
        x += 'weekly';
      } else {
        x += 'monthly';
      }
      x += '</changefreq>\n';
      x += '\t\t<priority>';
      if (
        element.title.toLowerCase() === 'index' ||
        element.title.toLowerCase() === 'home'
      ) {
        x += '1.0';
      } else if (element.color !== undefined) {
        x += '0.8';
      } else {
        x += '0.5';
      }
      x += '</priority>\n';
      x += '\t</url>\n';
    });
    return x;
  };

  exports.run = function (filter) {
    const tiddlers = this.wiki.filterTiddlers(filter);
    const data = [];
    for (let t = 0; t < tiddlers.length; t++) {
      const tiddler = this.wiki.getTiddler(tiddlers[t]);
      if (tiddler) {
        const fields = {};
        for (const field in tiddler.fields) {
          fields[field] = XML.escapify(tiddler.getFieldString(field));
        }
        data.push(fields);
      }
    }
    return XML.stringify(data);
  };
})();
