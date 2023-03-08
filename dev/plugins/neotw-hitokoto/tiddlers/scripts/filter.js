const fs = require('fs');

const sentencesFile = 'sentences.txt';
const data = fs.readFileSync(sentencesFile, 'utf-8');
const lines = data.split('\n');

const uniqueHitokotos = new Set(); // 用于存储唯一 hittokoto 的 Set

for (let line of lines) {
  const hitokoto = line.split('@')[0].trim(); // 提取 hittokoto 的值
  if (uniqueHitokotos.has(hitokoto)) {
    // 如果已存在，则跳过
    continue;
  }
  uniqueHitokotos.add(hitokoto); // 否则添加到 Set 中
}

// 将所有唯一的 hittokoto 值拼接成字符串
const uniqueHitokotosString = [...uniqueHitokotos].join('\n');

// const outputFilename = 'sentences_unique.txt'; // 新的文件名
// fs.writeFileSync(outputFilename, uniqueHitokotosString);
fs.writeFileSync(sentencesFile, uniqueHitokotosString);

console.log(`Finished ${sentencesFile}`);
