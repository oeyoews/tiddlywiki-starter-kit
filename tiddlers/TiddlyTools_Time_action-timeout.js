/*\
title: action-timeout.js
type: application/javascript
module-type: widget
author: Eric Shulman elsdesign@gmail.com
revision: 1.6

$action-timeout invokes actions once after a specified delay, or repeatedly at a specified interval.
The timeoutID can be saved to a tiddler and used later to cancel an active timeout or interval.

\*/

(function(){
/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";
var Widget = require("$:/core/modules/widgets/widget.js").widget;
var TimeoutWidget= function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};
TimeoutWidget.prototype = new Widget();
TimeoutWidget.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};
TimeoutWidget.prototype.execute = function() {
	this.tid       = this.getAttribute("tid",     "");
    this.field     = this.getAttribute("field",   "text");
	this.clear     = this.getAttribute("clear",   "");
	this.delay     = this.getAttribute("delay",   "");
	this.interval  = this.getAttribute("interval","");
	this.actions   = this.getAttribute("actions", "");
	if (this.getAttribute("autostart")) this.invokeAction();
};
TimeoutWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(Object.keys(changedAttributes).length > 0) { this.refreshSelf(); return true; }
	return this.refreshChildren(changedTiddlers);
};
TimeoutWidget.prototype.allowActionPropagation = function() { return false; };
TimeoutWidget.prototype.invokeAction = function(triggeringWidget,event) {
    var id;
	var self=this;
	if (self.clear)     { self.invokeActionString(self.actions,self,event); return clearTimeout(self.clear); }
	if (self.delay)     { id=setTimeout( function() { self.invokeActionString(self.actions,self,event); }, self.delay); }
	if (self.interval)  { id=setInterval(function() { self.invokeActionString(self.actions,self,event); }, self.interval); }
	if (self.tid && id) { $tw.wiki.setText(self.tid,self.field,null,id.toString()); }
	return true; // Action was invoked
};
exports["action-timeout"] = TimeoutWidget;
})();