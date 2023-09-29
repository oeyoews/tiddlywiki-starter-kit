const fs = require('fs');

const data = fs.readFileSync('sentences.txt', 'utf-8');
// const lines = data.split('\n').map(line => line.trim());
const lines = data
  .split('\n')
  .map(line => line.trim())
  .filter(line => line && line.includes('@'));

const uniqueHitokotos = new Map();
const duplicateHitokotos = [];

for (let i = 0; i < lines.length; i++) {
  const hitokotoFrom = lines[i].split('@');
  const hitokoto = hitokotoFrom.length >= 1 ? hitokotoFrom[0] : '';
  const from = hitokotoFrom.length >= 2 ? hitokotoFrom[1] : '';
  if (hitokoto.length > 80) {
    continue;
  }
  if (uniqueHitokotos.has(hitokoto)) {
    duplicateHitokotos.push(i);
  } else {
    uniqueHitokotos.set(hitokoto, from);
  }
}

let uniqueHitokotosString = '';
for (const [hitokoto, from] of uniqueHitokotos) {
  uniqueHitokotosString += `${hitokoto} @ ${from}\n`;
}

const outputFilename = 'sentences_unique.txt';
fs.writeFileSync(outputFilename, uniqueHitokotosString);

console.log(`无重复项已写入文件 '${outputFilename}'`);
if (duplicateHitokotos.length > 0) {
  console.log(`以下行出现重复 'hitokoto' 值: ${duplicateHitokotos.join(', ')}`);
}
