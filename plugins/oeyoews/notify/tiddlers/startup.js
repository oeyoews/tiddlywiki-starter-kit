/*\
title: $:/plugins/oeyoews/notify/startup.js
type: application/javascript
module-type: startup

\*/
exports.name = 'notify-startup-hook';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;
exports.startup = () => {
  // debugger;
  // if (!('Notification' in window)) {
  //   alert('This browser does not support desktop notification');
  // }
  // if (Notification.permission !== 'denied') {
  //   //判断是否授权,没授权先授权在通知
  //   Notification.requestPermission(function (permission) {
  //     // 如果用户同意，就可以向他们发送通知
  //     if (permission === 'granted') {
  //       var notice_ = new Notification('通知', {
  //         body: '你有一条信息',
  //       });
  //       notice_.onclick = function () {
  //         //单击消息提示框，进入浏览器页面
  //         window.focus();
  //       };
  //     }
  //   });
  // }
  // if (Notification.permission === 'denied') {
  //   //已授权直接通知
  //   Notification.requestPermission(function (permission) {
  //     // 如果用户同意，就可以向他们发送通知
  //     if (permission === 'granted') {
  //       var notice_ = new Notification('通知', {
  //         body: '你手动了一条新的一条信息for tiddlywiki',
  //       });
  //       notice_.onclick = function () {
  //         //单击消息提示框，进入浏览器页面
  //         window.focus();
  //       };
  //     }
  //   });
  // }
  $tw.rootWidget.addEventListener('om-notify', (event) => {
    const { paramObject = {} } = event;
    new $tw.Notify().display(paramObject);
  });
};
