/*\
title: $:/plugins/dullroar/atomfeed/tw-dombuilder.js
type: application/javascript
module-type: utils

Defines $tw.utils.DomBuilder and extends DomBuilder with Tiddly Wiki addons.

\*/

/**
 * @module Atomfeed
 * @author Devin Weaver
 */
/*jshint node: true, browser: true */
/*global $tw: false */
(function() {
  /**
   * @class DomBuilder
   */
  var DomBuilder = require('$:/plugins/dullroar/atomfeed/dombuilder');

  /**
   * Render a tiddler's text and construct a node tre for it.
   *
   * Will auto wrap the output in a `div` but will continue the chain so the
   * wrapped div can be modified with `add()`, `text()`, and `attr()`.
   *
   * @method renderTiddler
   * @param {String} title the tiddler title to render
   * @return {DomBuilder} a wrapped DomBuilder with the rendered nodes within
   * @chainable
   * @public
   */
  DomBuilder.prototype.renderTiddler = function renderTiddler(title) {
    var widgetNode = $tw.wiki.makeWidget($tw.wiki.parseTiddler(title));
    var container = new DomBuilder('div', this.document).toDOM();
    widgetNode.render(container, null);
    return this.add(container);
  };

  /**
   * Render TiddlyWiki text and add it as a text node.
   *
   * @method renderText
   * @param {String} text the tiddlywiki text to render
   * @return {DomBuilder} a wrapped DomBuilder with the rendered nodes within
   * @chainable
   * @public
   */
  DomBuilder.prototype.renderText = function renderText(text) {
    var rendered =
      $tw.wiki.renderText('text/plain', 'text/vnd.tiddlywiki', text);
    return this.text(rendered);
  };

  $tw.utils.DomBuilder = DomBuilder;
})();
