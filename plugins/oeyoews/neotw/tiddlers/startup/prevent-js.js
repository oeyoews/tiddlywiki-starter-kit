/*\
title: $:/plugins/oeyoews/neotw/prevent-edit.js
type: application/javascript
module-type: startup

退出网页不提示
https://talk.tiddlywiki.org/t/prevent-prevent-leave-you-have-unsaved-changes/8192
\*/

exports.startup = function () {
  $tw.unloadTasks = $tw.unloadTasks.filter(
    (task) => !task.toString().includes('confirmationMessage')
  );
};
