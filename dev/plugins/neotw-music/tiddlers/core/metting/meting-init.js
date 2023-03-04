(function () {
  var twmTiddler = '$:/plugins/oeyoews/neotw-music/config';
  var twmTiddlerGet = $tw.wiki.getTiddler(twmTiddler);
  var config = twmTiddlerGet ? twmTiddlerGet.fields : {};
  var {
    id,
    server,
    order,
    type,
    loop,
    preload,
    mutex,
    fixed,
    lrc_type,
    list_olded,
  } = config;
  var metingjs = document.createElement('meting-js');
  metingjs.setAttribute('id', id);
  metingjs.setAttribute('server', server);
  metingjs.setAttribute('order', order);
  metingjs.setAttribute('type', type);
  metingjs.setAttribute('loop', loop);
  metingjs.setAttribute('preload', preload);
  metingjs.setAttribute('mutex', mutex);
  metingjs.setAttribute('fixed', fixed);
  metingjs.setAttribute('lrc-type', lrc_type);
  metingjs.setAttribute('list-olded', list_olded);
  document.body.appendChild(metingjs);
  console.log('🚀 Twm initialization successful');
})();
