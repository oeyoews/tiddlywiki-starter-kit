import QRCode from 'qrcode';
import config from '../config/index';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// deprecated, use tiddlywiki qrcode plugins instead
export const generateqrcode = (data, filename) => {
  return new Promise((resolve, reject) => {
    const imagetitle = `tiddlywiki-starter-kit-qrcode.svg`;
    const qrcodefilename = filename || imagetitle;

    const prefix = path.join(config.wiki, 'tiddlers');
    const location = `${prefix}/${qrcodefilename}`;
    const address = data || 'https://tiddlywiki-starter-kit.vercel.app';

    !fs.existsSync(prefix) && fs.mkdirSync(prefix, { recursive: true });

    // generate qrcode image
    QRCode.toFile(location, address, { type: 'svg' }, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log(chalk.green.bold(`\ngenerated ${qrcodefilename}`));
        // generate meta file
        if (!fs.existsSync(`${location}.meta`)) {
          fs.writeFileSync(`${location}.meta`, `title: ${imagetitle}`);
        }
        resolve();
      }
    });
  });
};
