/*\
created: 20141229142330769
creator: Jim
modified: 20160426001500000
modifier: Sukima
module-type: macro
tags: 
title: $:/plugins/dullroar/atomfeed/md5hashToGuid.js
type: application/javascript

Macro to create an MD5 hash of a string and format it as a GUID.

\*/
var md5 = require("$:/plugins/dullroar/atomfeed/md5");

(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";
 
exports.name = "md5hashToGuid";

exports.params = [
	{name: "input"}
];

/*
Run the macro.
*/
exports.run = function(input) {
    if(!input) {
        return "";
    }
    var md5hash = md5.hash(input);
    // This is a special use case where we use the 128 bits conveniently returned by a MD5
    // hash and format it as a pseudo-GUID for use in things like an ATOM feed id field.
    // The idea being MD5 should have no collisions on tiddler titles, and yet will always
    // return the same hash for the same title string, which then gives us the persistent
    // id semantics that the ATOM spec requires. Other crypto hashes like SHA return too
    // many bits for this.
    return md5hash.substring(0,8) + "-" + md5hash.substring(8,12) + "-" + md5hash.substring(12,16) + "-" + md5hash.substring(16,20) + "-" + md5hash.substring(20);
};

})();
