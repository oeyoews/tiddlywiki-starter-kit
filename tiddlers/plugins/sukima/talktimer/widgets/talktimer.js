/*\
title: $:/plugins/sukima/talktimer/widgets/talktimer.js
type: application/javascript
module-type: widget

A Toast Master compatible talk timer

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";
	
if(!$tw.browse) return;

const Widget = require('$:/core/modules/widgets/widget.js').widget;
const Ticker = require('$:/plugins/sukima/talktimer/libs/ticker.js').ticker;
const {
  tDehumanize,
  tHumanize,
  tISODuration
} = require('$:/plugins/sukima/talktimer/libs/time-utils.js');

class TalkTimer extends Widget {

  render(parent, nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();
    let timerNode = this.document.createElement('BUTTON');
    timerNode.className = this.getAttribute('class', 'talktimer');
    timerNode.setAttribute('type', 'button');
    timerNode.setAttribute('title', 'LeftClick to start/pause; Alt+LeftClick to reset');
    timerNode.appendChild(this.document.createElement('TIME'));
    parent.insertBefore(timerNode,nextSibling);
    this.domNodes.push(timerNode);
    timerNode.addEventListener('click', e => this._handleClick(e));
    this._ticker.start();
  }

  execute() {
    console.log(this.attributes);
    this._ticker = new Ticker({
      oktime: tDehumanize(this.attributes.oktime),
      warntime: tDehumanize(this.attributes.warntime),
      overtime: tDehumanize(this.attributes.overtime),
      onTick: status => this._updateDomNode(status)
    });
  }

  removeChildDomNodes() {
    this._ticker.destory();
    super.removeChildDomNodes();
  }

  _handleClick(event) {
    if (event.altKey) {
      this._ticker.reset();
    } else {
      this._ticker.toggle();
    }
  }

  _updateDomNode({ state, elapsedTime }) {
    let [timerNode] = this.domNodes;
    let [timeNode] = timerNode.children;
    timerNode.dataset.state = state;
    timeNode.innerText = tHumanize(elapsedTime);
    timeNode.setAttribute('datetime', tISODuration(elapsedTime));
  }

}

exports.talktimer = TalkTimer;

})();
