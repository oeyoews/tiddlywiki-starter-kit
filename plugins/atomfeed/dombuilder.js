/*\
title: $:/plugins/dullroar/atomfeed/dombuilder.js
type: application/javascript
module-type: library

Micro DSL for DOM creation and stringification.

\*/

/**
 * @module Atomfeed
 * @author Devin Weaver
 */
/*jshint node: true, browser: true */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.DomBuilder = factory();
  }
})(this, function() {
  /**
   * Helper utility to construct complex DOM nodes easily.
   *
   * @class DomBuilder
   * @constructor
   * @param {DomBuilder|DOMElement|String} [root=div] A DOM element or string.
   * If `root` is a DomBuilder it will become `root` instead
   * @param {DOMDocument} [document=window.document] the document object used
   * to create elements
   * @public
   */
  function DomBuilder(root, document) {
    if (root instanceof DomBuilder) {
      return root;
    }
    if (!(this instanceof DomBuilder)) {
      return new DomBuilder(root, document);
    }
    this.document   = document || window.document;
    this.tag        = root || 'div';
    this.elements   = [];
    this.attributes = {};
    this.namespace  = null;
    this.parent     = null;
  }

  DomBuilder.prototype._addElement = function(element) {
    var el = new DomBuilder(element, this.document);
    el.parent = this;
    this.elements.push(el);
    return el;
  };

  /**
   * @method add
   * @param {DomBuilder|DOMElement|String} element the element to add to this
   * DomBuilders elements list
   * @return {DomBuilder} the new child element (DomBuilder) unless `element`
   * is a DomBuilder in which case `this` is returned
   * @chainable
   * @public
   */
  DomBuilder.prototype.add = function add(element) {
    var el = this._addElement(element);
    return (element instanceof DomBuilder) ? this : el;
  };

  /**
   * @method text
   * @param {String} the text to append
   * @chainable
   * @public
   */
  DomBuilder.prototype.text = function text(content) {
    var node = this.document.createTextNode(content);
    this._addElement(node);
    return this;
  };

  /**
   * @method attr
   * @param {String} name the attribute name
   * @param {String} value the attribute value
   * @chainable
   * @public
   */
  DomBuilder.prototype.attr = function attr(name, value) {
    this.attributes[name] = $tw.utils.htmlEncode(value);
    return this;
  };

  /**
   * @method end
   * @return {DomBuilder} the parent DomBuilder in the hierarchy
   * @chainable
   * @public
   */
  DomBuilder.prototype.end = function end() {
    return this.parent || this;
  };

  /**
   * Execute a callback and add it's result to the chain.
   *
   * Within the callback you can use `this` as if the chain was continuing
   * inside. However, the return vaue is ignorred and the DomBuilder that
   * `bind` was called on will be returned meaning `end()` wil not need to end
   * this node.
   *
   * @method bind
   * @param {Function} callback called with `this` as the current DomBuilder
   * node. Return value is ignored.
   * @return {DomBuilder} this DomBuilder in the hierarchy `.end()` not needed.
   * @chainable
   * @public
   */
  DomBuilder.prototype.bind = function bind(callback) {
    callback.call(this);
    return this;
  };

  /**
   * @method toDOM
   * @param {DOMDocument} [document=this.document] the document object to
   * propagate down the recursion chain
   * @return {DOMElement} the compiled DOMElement with its child hierarchy
   * @public
   */
  DomBuilder.prototype.toDOM = function toDOM(document) {
    var node, name;
    document = document || this.document;
    if (typeof this.tag === 'string') {
      node = (this.namespace) ?
        document.createElementNS(this.namespace, this.tag) :
        document.createElement(this.tag);
    } else {
      node = this.tag;
    }
    for (name in this.attributes) {
      node.setAttribute(name, this.attributes[name]);
    }
    this.elements.forEach(function(element) {
      node.appendChild(element.toDOM(document));
    });
    return node;
  };

  /**
   * @method toString
   * @return {String} the HTML for this DomBuilder's hierarchy
   * @public
   */
  DomBuilder.prototype.toString = function toString() {
    return this.toDOM().outerHTML;
  };

  /**
   * The tag (or DOMElement) for this node.
   * @property tag
   * @type {String|DOMElement}
   * @default div
   * @private
   */

  /**
   * List of child elements for this DomBuilders hierarchy level.
   * @property elements
   * @type {Array}
   * @private
   */

  /**
   * List of attributes to apply to this DOMElement.
   * @property attributes
   * @type {Object}
   * @private
   */

  /**
   * The namespace for this DOMElement.
   * @property namespace
   * @type {String}
   * @default null
   * @private
   */

  /**
   * The parent DomBuilder in the hierarchy.
   * @property parent
   * @type {DomBuilder}
   * @default null
   * @private
   */

  return DomBuilder;
});
