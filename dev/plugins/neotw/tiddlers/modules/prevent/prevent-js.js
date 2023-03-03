exports.startup = function () {
  $tw.unloadTasks = $tw.unloadTasks.filter(
    task => !task.toString().includes('confirmationMessage'),
  );
};
