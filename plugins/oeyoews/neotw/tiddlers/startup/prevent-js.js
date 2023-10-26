/*\
title: $:/plugins/oeyoews/neotw/prevent-edit.js
type: application/javascript
module-type: startup

退出网页不提示??.
\*/

exports.startup = () => {
  $tw.unloadTasks = $tw.unloadTasks.filter(
    (task) => !task.toString().includes('confirmationMessage'),
  );
};
