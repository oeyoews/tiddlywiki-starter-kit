import qrcode from 'qrcode';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';

dotenv.config();

// 搞成一个promise, 确保before startup tiddlywiki
export const generateqrcode = (data, filename) => {
  return new Promise((resolve, reject) => {
    const wikiLocation = process.env.wikiLocation;
    const imagetitle = `tiddlywiki-starter-kit-qrcode.png`;
    const qrcodefilename = filename || imagetitle;

    const location = `${wikiLocation}/tiddlers/${qrcodefilename}`;
    const address = data || 'https://tiddlywiki-starter-kit.vercel.app';

    // generate qrcode image
    qrcode.toFile(location, address, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log(chalk.green.bold(`\ngenerated ${qrcodefilename}`));
        resolve();
      }
    });
    // generate meta file
    if (!fs.existsSync(`${location}.meta`)) {
      !fs.existsSync(location) && fs.mkdirSync(location, { recursive: true });
      fs.writeFileSync(`${location}.meta`, `title: ${imagetitle}`);
    }
  });
};