import fs from "fs";
import plugins from "./config/plugins.mjs";
import build from "./config/build.mjs";

export default function generateTiddlyWikiInfo() {
  const tiddlywikiInfoPath = "./tiddlywiki.info";
  const tiddlywikiConfig = {
    description:
      "A modern style and elegant notebook built with Tiddlywiki5 and Tailwindcss",
    themes: [
      // vanilla 主题, 必选
      "tiddlywiki/vanilla",
      "nico/notebook",
    ],
    plugins,
    build,
    // 命令
    config: {
      "retain-original-tiddler-path": false,
      // 不建议修改, 如果修改了filesystem
      "default-tiddler-location": "tiddlers",
    },
  };

  fs.writeFileSync(tiddlywikiInfoPath, JSON.stringify(tiddlywikiConfig));
}