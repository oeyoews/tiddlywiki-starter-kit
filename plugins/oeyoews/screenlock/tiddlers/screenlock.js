/*\
title: $:/plugins/oeyoews/screenlock/screenlock.js
type: application/javascript
module-type: startup
\*/

exports.name = 'screenlock-startup';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;

exports.startup = function () {
  var storedPassword = $tw.wiki.getTiddlerText(
    '$:/plugins/oeyoews/screenlock/password',
  );
  if (!storedPassword) return;
  // 注册解锁消息处理器
  $tw.rootWidget.addEventListener('tw-unlock-screen', function (event) {
    var password = event.param || event.paramObject.password;

    if (password === storedPassword) {
      $tw.wiki.setText(
        '$:/plugins/oeyoews/screenlock/state',
        'text',
        null,
        'unlocked',
      );
      $tw.wiki.deleteTiddler('$:/temp/screenlock/password');
      $tw.wiki.deleteTiddler('$:/temp/screenlock/error');
    } else {
      $tw.wiki.setText('$:/temp/screenlock/error', 'text', null, '密码错误');
    }
    return false;
  });

  // 注册锁屏消息处理器
  $tw.rootWidget.addEventListener('tw-lock-screen', function (event) {
    $tw.wiki.setText(
      '$:/plugins/oeyoews/screenlock/state',
      'text',
      null,
      'locked',
    );
    $tw.wiki.deleteTiddler('$:/temp/screenlock/password');
    $tw.wiki.deleteTiddler('$:/temp/screenlock/error');
    return false;
  });

  // 检查是否应该自动锁屏
  var autoLock = $tw.wiki.getTiddlerText(
    '$:/plugins/oeyoews/screenlock/autolock',
  );
  if (autoLock === 'yes' && storedPassword) {
    $tw.wiki.setText(
      '$:/plugins/oeyoews/screenlock/state',
      'text',
      null,
      'locked',
    );
  }
};
