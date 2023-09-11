import fs from 'fs';
import plugins from './config/plugins.mjs';
import build from './config/build.mjs';

/**
 * @description generate latest tiddlywiki.info file from config folder
 */
export default function generateTiddlyWikiInfo() {
  const tiddlywikiInfoPath = './tiddlywiki.info';

  /** @type {import('tw5-typed').ITiddlyWikiInfoJSON} */
  const tiddlywikiConfig = {
    description:
      'A modern style and elegant notebook built with Tiddlywiki5 and Tailwindcss',
    themes: [
      // vanilla 主题, 必选
      'tiddlywiki/vanilla',
      // nico 主题, 必选
      'nico/notebook',
    ],
    plugins,
    build,
    /** @type {import('tw5-typed').ITiddlyWikiInfoJSONConfig} */
    config: {
      'retain-original-tiddler-path': false,
      // 不建议修改, 如果修改了filesystem
      'default-tiddler-location': 'tiddlers',
    },
  };

  fs.writeFileSync(
    tiddlywikiInfoPath,
    JSON.stringify(tiddlywikiConfig, null, 2),
  );
}
