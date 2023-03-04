(function () {
  var id = '2916766519';
  var server = 'netease';
  var order = 'random';
  var metingjs = document.createElement('meting-js');
  metingjs.setAttribute('id', id);
  console.log('🚀');
  metingjs.setAttribute('server', server);
  metingjs.setAttribute('order', order);
  metingjs.setAttribute('type', 'playlist');
  metingjs.setAttribute('loop', 'all');
  metingjs.setAttribute('preload', 'auto');
  metingjs.setAttribute('mutex', 'true');
  metingjs.setAttribute('fixed', 'true');
  metingjs.setAttribute('lrc-type', '0');
  metingjs.setAttribute('list-olded', 'true');
  document.body.appendChild(metingjs);
})();
