import config from '../../neotw.config.mjs';
import chalk from 'chalk';
import fs from 'fs';
import info from '../../config/info.mjs';

/** @description 检查tiddlywiki.info文件 */
const checkinfo = () => {
  const { wiki: wikiLocation } = config;
  const infoFile = `${wikiLocation}/tiddlywiki.info`;

  if (!fs.existsSync(wikiLocation)) {
    console.log(
      chalk.yellow(
        `${wikiLocation} folder does not exist Created this folder.`,
      ),
    );
    fs.mkdirSync(wikiLocation);
  }
  if (!fs.existsSync(infoFile)) {
    fs.writeFileSync(infoFile, JSON.stringify(info, null, 2));
    console.log(
      chalk.yellow(
        `tiddlywiki.info file does not exist in ${wikiLocation} directory. Created a new file.`,
      ),
    );
  }
};

export default checkinfo;
