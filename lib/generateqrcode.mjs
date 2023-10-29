import QRCode from 'qrcode';
import dotenv from 'dotenv';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

dotenv.config();

export const generateqrcode = (data, filename) => {
  return new Promise((resolve, reject) => {
    const wikiLocation = process.env.wikiLocation;
    const imagetitle = `tiddlywiki-starter-kit-qrcode.svg`;
    const qrcodefilename = filename || imagetitle;

    const prefix = path.join(wikiLocation, 'tiddlers');
    const location = `${prefix}/${qrcodefilename}`;
    const address = data || 'https://tiddlywiki-starter-kit.vercel.app';

    // generate qrcode image
    QRCode.toFile(location, address, { type: 'svg' }, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log(chalk.green.bold(`\ngenerated ${qrcodefilename}`));
        // generate meta file
        if (!fs.existsSync(`${location}.meta`)) {
          !fs.existsSync(prefix) && fs.mkdirSync(prefix, { recursive: true });
          fs.writeFileSync(`${location}.meta`, `title: ${imagetitle}`);
        }
        resolve();
      }
    });
  });
};
