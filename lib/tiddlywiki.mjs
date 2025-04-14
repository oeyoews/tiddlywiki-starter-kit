import { TiddlyWiki } from 'tiddlywiki';

export const tiddlywiki = (args = [], preloadTiddlers = [], callback) => {
  const $tw = TiddlyWiki();
  $tw.boot.argv = [...args];
  if (preloadTiddlers.length > 0) {
    $tw.preloadTiddlerArray(preloadTiddlers);
  }
  if (typeof callback === 'function') {
    callback($tw);
  }
  $tw.boot.boot();
  return $tw;
};
