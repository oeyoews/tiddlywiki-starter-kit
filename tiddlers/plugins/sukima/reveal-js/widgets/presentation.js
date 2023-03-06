/*\
title: $:/plugins/sukima/reveal-js/widgets/presentation
type: application/javascript
module-type: widget

Embedded Reveal.js presentation

\*/
(function(){
	
	if(!$tw.browser) return;

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

const Widget = require('$:/core/modules/widgets/widget.js').widget;
const { assignDataset } = require('$:/plugins/sukima/reveal-js/libs/utils.js');

function loadReveal() {
	return [
		require('$:/plugins/sukima/reveal-js/reveal.js'),
		[
			require('$:/plugins/sukima/reveal-js/reveal-highlight.js'),
			require('$:/plugins/sukima/reveal-js/reveal-zoom.js')
		]
	];
}

class PresentationWidget extends Widget {

	render(parent, nextSibling) {
		let [Reveal, revealPlugins] = loadReveal();
		this.parentDomNode = parent;
		this.computeAttributes();
		this.execute();
		let revealNode = this.document.createElement('DIV');
		let slidesNode = this.document.createElement('DIV');
		revealNode.classList.add('reveal');
		revealNode.style.height = this.getHeight();
		slidesNode.classList.add('slides');
		this.renderChildren(slidesNode);
		this.pruneErroneousWrappings(slidesNode);
		revealNode.appendChild(slidesNode);
		parent.insertBefore(revealNode,nextSibling);
		this.domNodes.push(revealNode);
		this.revealInstance = new Reveal(revealNode, {
			embedded: true,
			keyboardCondition: 'focused',
			plugins: revealPlugins
		});
		this.revealInstance.initialize(assignDataset({}, this.attributes));
	}

	refresh(changedTiddlers) {
		let shouldRerender = this.refreshChildren(changedTiddlers);
		if (shouldRerender) { this.refreshSelf(); }
		return shouldRerender;
	}

	getHeight() {
		let height = this.getAttribute('$height', '400');
		if (/[0-9]$/.test(height)) {
			height = `${height}px`;
		}
		return height;
	}

	pruneErroneousWrappings(root) {
		let sections = root.querySelectorAll('section');
		for (let section of sections) {
			if (section.parentNode.tagName !== 'P') { continue; }
			this.pruneErroneousWrapping(section.parentNode);
		}
	}

	pruneErroneousWrapping(el) {
		let parent = el.parentNode;
		while (el.firstChild) { parent.insertBefore(el.firstChild, el); }
		parent.removeChild(el);
	}

}

exports.presentation = PresentationWidget;

})();
