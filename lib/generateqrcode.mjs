import qrcode from 'qrcode';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';

dotenv.config();

// 搞成一个promise, 确保before startup tiddlywiki
export const generateqrcode = (data, filename) => {
  const wikiLocation = process.env.wikiLocation;
  const imagetitle = `tiddlywiki-starter-kit-qrcode.png`;
  const qrcodefilename = filename || imagetitle;

  const location = `${wikiLocation}/tiddlers/${qrcodefilename}`;
  const address = data || 'https://tiddlywiki-starter-kit.vercel.app';

  // generate qrcode image
  qrcode.toFile(location, address, () => {
    console.log(chalk.green.bold(`\ngenerated ${qrcodefilename}`));
  });
  // generate meta file
  fs.writeFileSync(`${location}.meta`, `title: ${imagetitle}`);
};
