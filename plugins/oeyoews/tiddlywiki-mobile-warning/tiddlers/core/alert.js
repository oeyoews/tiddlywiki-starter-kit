/* alert mobile */
(function () {
  var alertTiddler = '$:/plugins/oeyoews/tiddlywiki-mobile-warning/alert-text';

  var isMobileTiddler = '$:/info/browser/is/mobile';

  var isMobileTiddlerGet = $tw.wiki.getTiddlerText(isMobileTiddler);

  var alertTiddlerGet = $tw.wiki.getTiddlerText(alertTiddler);

  /* if ($tw.wiki.getTiddlerText('$:/info/browser/is/ios') === 'yes') {
    alert(
      'IOS not supported setInterval(maybe), this will cause some script error warning',
    );
    return;
  } */
  // console.log('🐛alert test');
  if (isMobileTiddlerGet === 'yes') {
    alert(alertTiddlerGet);
    return;
  }
})();
