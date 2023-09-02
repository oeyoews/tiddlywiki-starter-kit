const fs = require("fs");
const path = require("path");

const plugins = require("./config/plugins");
const build = require("./config/build");
const tiddlywikiInfoPath = path.join(__dirname, "tiddlywiki.info");
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

console.log("新的tiddlywiki.info配置文件已生成！");