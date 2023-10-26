/*\
title: $:/plugins/oeyoews/neotw/prevent-edit.js
type: application/javascript
module-type: startup

prevent-edit
\*/

exports.startup = () => {
  $tw.unloadTasks = $tw.unloadTasks.filter(
    (task) => !task.toString().includes('confirmationMessage'),
  );
};
