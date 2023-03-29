// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
! function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(i) {
    "use strict";
    i.defineOption("fullScreen", !1, function(e, t, o) {
        var r, l;
        o == i.Init && (o = !1), !o != !t && (t ? (l = (r = e).getWrapperElement(), r.state.fullScreenRestore = {
            scrollTop: window.pageYOffset,
            scrollLeft: window.pageXOffset,
            width: l.style.width,
            height: l.style.height
        }, l.style.width = "", l.style.height = "auto", l.className += " CodeMirror-fullscreen rounded-lg shadow-lg mt-2 z-[999]", document.documentElement.style.overflow = "", r.refresh()) : function(e) {
            var t = e.getWrapperElement();
            t.className = t.className.replace(/\s*CodeMirror-fullscreen\b/, ""), document.documentElement.style.overflow = "";
            var o = e.state.fullScreenRestore;
            t.style.width = o.width, t.style.height = o.height, window.scrollTo(o.scrollLeft, o.scrollTop), e.refresh()
        }(e))
    })
	i.toggleFullscreen = function(e) {
		e.setOption("fullScreen", !e.getOption("fullScreen"))
	},
	i.commands.togglefullscreen = i.toggleFullscreen
});

