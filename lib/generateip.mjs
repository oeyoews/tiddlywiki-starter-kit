import dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

dotenv.config();

const InfoTID = process.env.InfoTID;

// deprecated, use $tw.preloadTiddler instead
export const generateinfotid = async (ip, filename = InfoTID) => {
  const wikiLocation = process.env.wikiLocation;
  const targetdir = path.join(wikiLocation, 'tiddlers');
  if (!fs.existsSync(targetdir)) fs.mkdirSync(targetdir);
  try {
    const content = `title: ${filename}\n\n${ip}`;
    fs.writeFileSync(path.join(targetdir, `${filename}.tid`), content);
    console.log(chalk.green.bold(`generate ${filename} file`));
    return Promise.resolve();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
