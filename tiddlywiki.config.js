const fs = require("fs");
const path = require("path");
const JSON5 = require("json5");

const configFilePath = path.join(__dirname, "tiddlywiki.json5");
const tiddlywikiInfoPath = path.join(__dirname, "tiddlywiki.info");

const cofnigFile = fs.readFileSync(configFilePath, "utf-8");
const configData = JSON5.parse(cofnigFile);

fs.writeFileSync(tiddlywikiInfoPath, JSON.stringify(configData, null, 2));

console.log("新的tiddlywiki.info配置文件已生成！");