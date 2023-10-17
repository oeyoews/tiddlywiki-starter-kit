import fs from 'fs';
import plugins from './config/plugins.mjs';
import build from './config/build.mjs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const wikiLocation = process.env.wikiLocation;

/** @description generate latest tiddlywiki.info file from config folder */
export default function generateTiddlyWikiInfo() {
  /** @type {import('tw5-typed').ITiddlyWikiInfoJSON} */
  const tiddlywikiConfig = {
    description:
      'A modern style and elegant notebook built with Tiddlywiki5 and Tailwindcss',
    themes: [
      'tiddlywiki/vanilla', // vanilla 主题, 必选
      'nico/notebook', // nico 主题, 必选
    ],
    includeWikis: [{ 'read-only': false, path: wikiLocation }], // wiki need .info file to like a wiki folder
    plugins,
    build,
    /** @type {import('tw5-typed').ITiddlyWikiInfoJSONConfig} */
    config: {
      'retain-original-tiddler-path': false,
      // NOTE: 注意不再兼容tiddlers文件
      'default-tiddler-location': `${wikiLocation}/tiddlers`, // 不是读取tiddler文件夹的地方, 而是保存到的文件夹
    },
  };

  // process.cwd()
  const tiddlywikiInfoPath = path.join('tiddlywiki.info');

  fs.writeFileSync(
    tiddlywikiInfoPath,
    JSON.stringify(tiddlywikiConfig, null, 2),
  );
}
