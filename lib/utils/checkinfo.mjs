import fs from 'fs';
import chalk from 'chalk';
import config from '../../config/index.mjs';

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
    fs.writeFileSync(infoFile, JSON.stringify(config.info, null, 2));
    console.log(
      chalk.yellow(
        `tiddlywiki.info file does not exist in ${wikiLocation} directory. Created a new file.`,
      ),
    );
  }
};

export default checkinfo;
