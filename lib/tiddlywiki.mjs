import { TiddlyWiki } from 'tiddlywiki';
import { consola } from 'consola';
import chalk from 'chalk';

export const tiddlywiki = (args = [], preloadTiddlers = [], callback) => {
  return new Promise((resolve, reject) => {
    const $tw = TiddlyWiki();
    $tw.boot.argv = [...args];
    if (preloadTiddlers.length > 0) {
      $tw.preloadTiddlerArray(preloadTiddlers);
    }
    if (typeof callback === 'function') {
      callback($tw);
    }
    consola.info(chalk.gray('Booting TiddlyWiki (loading plugins & wiki)...'));
    $tw.boot.boot(() => {
      resolve($tw);
    });
  });
};
