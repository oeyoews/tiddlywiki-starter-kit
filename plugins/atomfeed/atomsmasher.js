/*\
title: $:/plugins/dullroar/atomfeed/atomsmasher.js
type: application/javascript
module-type: library

Encapsulating class for constructing atom feeds

\*/

/**
 * @module Atomfeed
 */
(function() { // jshint ignore:line
  var uuidHasher = require('$:/plugins/dullroar/atomfeed/md5hashToGuid');

  // jshint ignore:start
  var LAST_UPDATED_FILTER =
    '[!is[system]!has[draft.of]!untagged[]!tag[static]!is[tag]!sort[modified]limit[1]]';
  // jshint ignore:end

  function toISODate(twDateString) {
    if (!twDateString) { return ''; }
    var twDate = $tw.utils.parseDate(twDateString);
    return $tw.utils.formatDateString(twDate, "YYYY-0MM-0DDT0hh:0mm:0ss");
  }

  function pathJoin(parts){
    return parts.join('/').replace(/(:\/)*\/{1,}/g, '$1/');
  }

  function domBuilderToXml(domBuilder) {
    var _htmlVoidElements = $tw.config.htmlVoidElements;
    $tw.config.htmlVoidElements = [];
    var output = domBuilder.toString();
    $tw.config.htmlVoidElements = _htmlVoidElements;
    return output;
  }

  function toPermalink(title) {
    return '#' + encodeURIComponent(title);
  }

  function toFileName(title) {
    return encodeURIComponent(encodeURIComponent(title)) + '.html';
  }

  /**
   * Manage the creation and stringification of a list of tiddler titles.
   *
   * @class AtomSmasher
   * @constructor
   * @param {Object} options hash of options to provide context
   * @param {Wiki} options.wiki the $tw.wiki instance
   * @param {DOMDocument} [options.document=window.document] pass in a fake DOM
   * when `$tw.browser` is false (running in Node.JS)
   * @public
   */
  function AtomSmasher(options) {
    this.wiki = options.wiki;
    this.document = options.document || window.document;
    this.metadata = this.lookupMetadata();
  }

  /**
   * Lookup site information for caching
   * @method lookupMetadata
   * @return {Object} hash of metadata
   * @private
   */
  AtomSmasher.prototype.lookupMetadata = function lookupMetadata() {
    var atomserver = this.wiki.getTiddlerText('$:/config/atomserver');
    var lastUpdatedTiddler =
      this.wiki.getTiddler(this.wiki.filterTiddlers(LAST_UPDATED_FILTER)[0]);
    var sitetitle = this.wiki.getTiddlerText('$:/SiteTitle');
    return {
      title:    sitetitle,
      subtitle: this.wiki.getTiddlerText('$:/SiteSubtitle'),
      feedhref: pathJoin([atomserver, 'atom.xml']),
      sitehref: atomserver,
      author:   lastUpdatedTiddler.fields.creator,
      updated:  toISODate(lastUpdatedTiddler.fields.modified),
      uuid:     uuidHasher.run(sitetitle),
    };
  };

  /**
   * Lookup tiddler information for building an atom entry.
   * @method lookupMetadata
   * @return {Object} hash of data
   * @private
   */
  AtomSmasher.prototype.lookupEntryData = function lookupEntryData(tiddler) {
    var title = tiddler.getFieldString('title');
    return {
      title: title,
      updated: toISODate(tiddler.getFieldString('modified')),
      uuid: uuidHasher.run(title),
      href: pathJoin([this.metadata.sitehref, toPermalink(title)]),
      statichref: pathJoin([
        this.metadata.sitehref, 'static', toFileName(title)
      ]),
      summary: tiddler.getFieldString('summary'),
      author: tiddler.getFieldString('modifier') ||
        tiddler.getFieldString('creator') ||
        this.metadata.author
    };
  };

  /**
   * Return a DomBuilder for the ATOM feed with headers.
   *
   * @method atomFeed
   * @return {DomBuilder}
   * @private
   */
  AtomSmasher.prototype.atomFeed = function atomHeader() {
    return $tw.utils.DomBuilder('feed', this.document)
      .attr('xmlns', 'http://www.w3.org/2005/Atom')
      .add('title').renderText(this.metadata.title).end()
      .add('subtitle').renderText(this.metadata.subtitle).end()
      .add('link')
        .attr('href', this.metadata.feedhref)
        .attr('rel', 'self')
      .end()
      .add('link')
        .attr('href', this.metadata.sitehref)
      .end()
      .add('author')
        .add('name')
          .text(this.metadata.author)
        .end()
      .end()
      .add('id').text(this.metadata.uuid).end()
      .add('updated').text(this.metadata.updated).end();
  };

  /**
   * Return a DomBuilder for a specific ATOM entry from a Tiddler.
   *
   * @method atomEntry
   * @param {Tiddler} tiddler the tiddler to use to create the ATOM entry
   * @return {DomBuilder}
   * @private
   */
  AtomSmasher.prototype.atomEntry = function atomEntry(tiddler) {
    var data = this.lookupEntryData(tiddler);
    return $tw.utils.DomBuilder('entry', this.document)
      .add('title').text(data.title).end()
      .add('link')
        .attr('href', data.href)
      .end()
      .add('link')
        .attr('rel', 'alternative')
        .attr('type', 'text/html')
        .attr('href', data.statichref)
      .end()
      .add('id').text(data.uuid).end()
      .add('updated').text(data.updated).end()
      .bind(function() {
        if (data.summary) {
          this.add('summary').text(data.summary);
        }
      })
      .add('content')
        .attr('type', 'xhtml')
        .renderTiddler(data.title)
          .attr('xmlns', 'http://www.w3.org/1999/xhtml')
        .end()
      .end()
      .add('author')
        .add('name').text(data.author).end()
      .end();
  };

  /**
   * Construct and stringify the list of tiddler titles.
   *
   * @method feedify
   * @param {Array} titles the list of tiddlers to process
   * @return {String} the XML of a feed file as a String
   * @public
   */
  AtomSmasher.prototype.feedify = function feedify(titles) {
    var feed = this.atomFeed();
    titles.forEach(function(title) {
      feed.add(this.atomEntry(this.wiki.getTiddler(title)));
    }, this);
    return '<?xml version="1.0" encoding="utf-8"?>\n' + domBuilderToXml(feed);
  };

  module.exports = AtomSmasher;
})();
