/* alert mobile */
(function () {
  var isMobileTiddler = '$:/info/browser/is/mobile';
  var twmTiddler = '$:/plugins/oeyoews/tiddlywiki-mobile-warning/alert-text';
  var isMobileTiddlerGet = $tw.wiki.getTiddlerText(isMobileTiddler);
  var twmTiddlerGet = $tw.wiki.getTiddlerText(twmTiddler);
  // console.log('🐛alert test');
  if (isMobileTiddlerGet === 'yes') {
    alert(twmTiddlerGet);
  }
})();
