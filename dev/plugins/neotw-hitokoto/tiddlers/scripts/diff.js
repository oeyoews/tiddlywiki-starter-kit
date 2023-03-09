/* to generate a unique txt file */
const fs = require('fs');

const data = fs.readFileSync('sentences.txt', 'utf-8');
const lines = data.split('\n');

const uniqueHitokotos = new Map(); // 用于存储唯一 hittokotos 的 Map
const duplicateHitokotos = []; // 用于存储重复的 hittokotos 的行号

for (let i = 0; i < lines.length; i++) {
  const hitokoto = lines[i].split('@')[0].trim(); // 提取 hittokoto 的值
  const from = lines[i].split('@')[1]; // 提取 from 的值
  if (hitokoto.length > 80) {
    // 如果 hittokoto 的长度大于 80，则跳过该行
    continue;
  }
  if (uniqueHitokotos.has(hitokoto)) {
    // 如果已存在，则添加到“重复列表”中
    duplicateHitokotos.push(i); // 需要加 1，因为数组的索引从 0 开始
  } else {
    uniqueHitokotos.set(hitokoto, from); // 否则添加到 Map 中
  }
}

// 将所有唯一的 hittokoto 值和 from 值拼接成字符串
let uniqueHitokotosString = '';
for (const [hitokoto, from] of uniqueHitokotos) {
  uniqueHitokotosString += `${hitokoto} @ ${from}\n`;
}

const outputFilename = 'sentences_unique.txt'; // 新的文件名
fs.writeFileSync(outputFilename, uniqueHitokotosString);

console.log(`无重复项已写入文件 '${outputFilename}'`);
if (duplicateHitokotos.length > 0) {
  console.log(`以下行出现重复 'hitokoto' 值: ${duplicateHitokotos.join(', ')}`);
}
