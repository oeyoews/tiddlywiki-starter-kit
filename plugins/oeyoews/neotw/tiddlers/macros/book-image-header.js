/*\
title: $:/plugins/oeyoews/neotw/macros/book-image-header.js
type: application/javascript
module-type: macro

book image header
\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  exports.name = 'bih'; // book image header

  exports.params = [
    {
      name: 'field',
    },
  ];

  // @usage
  // <<bih field:"image">>
  // <<bih "image">>
  // <<bih>>
  exports.run = function (field) {
    const tiddler = this.getVariable('currentTiddler');
    const src = $tw.wiki.getTiddler(tiddler).fields?.[field || 'image'];
    if (src) {
      return `<img src="${src}" class="spotlight rounded-md h-48" alt="${tiddler}" />`;
    }
  };
})();
