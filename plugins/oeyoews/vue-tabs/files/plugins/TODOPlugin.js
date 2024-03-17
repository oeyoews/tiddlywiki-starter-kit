const { VueDraggable, vDraggable } = require('draggableplus.js');

module.exports = {
  install(app, options) {
    app.component('VueDraggable', VueDraggable);
    app.directive('draggable', vDraggable);
  }
};
