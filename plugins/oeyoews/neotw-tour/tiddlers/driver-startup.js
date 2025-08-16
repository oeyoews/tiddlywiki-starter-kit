/*\
title: $:/plugins/oeyoews/neotw-tour/driver-startup.js
type: application/javascript
module-type: startup

module

\*/

exports.name = 'driver-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  require('./driver.min.js');
  window.driver = window.driver.js.driver;

  const { tour } = require('./tour.js');
  // TODO
  $tw.rootWidget.addEventListener('om-tours', tour);
};
