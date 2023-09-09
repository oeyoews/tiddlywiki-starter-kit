/*\
title: $:/plugins/oeyoews/neotw/prevent-edit.js
type: application/javascript
module-type: startup

prevent-edit
\*/

(function () {
  exports.startup = function () {
    $tw.unloadTasks = $tw.unloadTasks.filter(
      (task) => !task.toString().includes('confirmationMessage'),
    );
  };
})();
