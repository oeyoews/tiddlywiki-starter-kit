import fs from 'fs';
import path from 'path';

import config from '../config/index.mjs';

const { wiki, themes, build, plugins, description } = config;

const tiddlywikiInfoPath = path.join('tiddlywiki.info');

/** @type {import('tw5-typed').ITiddlyWikiInfoJSON} */
const tiddlywikiConfig = {
  description,
  themes,
  includeWikis: [{ 'read-only': false, path: wiki }],
  plugins,
  build,
  /** @type {import('tw5-typed').ITiddlyWikiInfoJSONConfig} */
  config: {
    'retain-original-tiddler-path': false,
    'default-tiddler-location': `${wiki}/tiddlers`, // new tiddlers will be saved here
  },
};

/** @description generate latest tiddlywiki.info file from config folder */
export default function generateTiddlyWikiInfo() {
  // 生成 tiddlywiki.info
  fs.writeFileSync(
    tiddlywikiInfoPath,
    JSON.stringify(tiddlywikiConfig, null, 2),
  );
}
