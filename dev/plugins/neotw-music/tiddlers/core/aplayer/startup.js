// load aplayer min .js
// WIP
exports.startup = function () {
  if (!$tw.browser) return;
  $tw.modules.execute('$:/plugins/oeyoews/neotw-music/aplayer.min.js');
};
