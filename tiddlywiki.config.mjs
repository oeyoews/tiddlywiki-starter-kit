import fs from 'fs';
import plugins from './config/plugins.mjs';
import build from './config/build.mjs';
import path from 'path';

/** @description generate latest tiddlywiki.info file from config folder */
export default function generateTiddlyWikiInfo() {
  // process.cwd()
  const tiddlywikiInfoPath = path.join('tiddlywiki.info');

  /** @type {import('tw5-typed').ITiddlyWikiInfoJSON} */
  const tiddlywikiConfig = {
    description:
      'A modern style and elegant notebook built with Tiddlywiki5 and Tailwindcss',
    themes: [
      'tiddlywiki/vanilla', // vanilla 主题, 必选
      'nico/notebook', // nico 主题, 必选
    ],
    plugins,
    build,
    /** @type {import('tw5-typed').ITiddlyWikiInfoJSONConfig} */
    /* config: {
      'retain-original-tiddler-path': false,
      'default-tiddler-location': 'tiddlers', // 不建议修改, 如果修改了filesystem
    }, */
  };

  fs.writeFileSync(
    tiddlywikiInfoPath,
    JSON.stringify(tiddlywikiConfig, null, 2),
  );
}
