const fs = require('fs');

const data = fs.readFileSync('sentences.txt', 'utf-8');
const lines = data.split('\n');

const uniqueHitokotos = new Set(); // 用于存储唯一 hittokoto 的 Set
const duplicateHitokotos = []; // 用于存储重复的 hittokoto 的行号

for (let i = 0; i < lines.length; i++) {
  const hitokoto = lines[i].split('@')[0].trim(); // 提取 hittokoto 的值
  if (uniqueHitokotos.has(hitokoto)) {
    // 如果已存在，则添加到“重复列表”中
    duplicateHitokotos.push(i + 1); // 需要加 1，因为数组的索引从 0 开始
  } else {
    uniqueHitokotos.add(hitokoto); // 否则添加到 Set 中
  }
}

// 将所有唯一的 hittokoto 值拼接成字符串
const uniqueHitokotosString = [...uniqueHitokotos].join('\n');

const outputFilename = 'sentences_unique.txt'; // 新的文件名
fs.writeFileSync(outputFilename, uniqueHitokotosString);

console.log(`无重复项已写入文件 '${outputFilename}'`);
if (duplicateHitokotos.length > 0) {
  console.log(`以下行出现重复 'hitokoto' 值: ${duplicateHitokotos.join(', ')}`);
}
