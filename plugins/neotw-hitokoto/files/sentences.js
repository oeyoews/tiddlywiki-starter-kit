/* to generate sentences.json
comments by @chatgpt
*/
const fs = require('fs');

// Read the contents of 'sentences.txt' file synchronously and store it in the 'data' variable as a string
const data = fs.readFileSync('sentences_unique.txt', 'utf-8');

// Split the string into an array of lines using the newline character '\n'
const lines = data.split('\n');

// Create an empty array to store the result
const result = [];

let uniqueItems = {}; // 空对象，用来存储已存在的组合
let id = 1; // 计数器变量，用于为每个项分配唯一 ID

for (let line of lines) {
  // Split the line into two parts using the colon ':' separator
  const parts = line.split('@');

  // If there are less than two parts, skip to the next line
  if (parts.length < 2) {
    continue;
  }

  // Trim any leading or trailing white space from the 'from' and 'hitokoto' parts
  const hitokoto = parts[0].trim();
  const from = parts[1].trim();

  const comboObject = {
    // 组合的对象，包含 'hitokoto' 和 'from'
    hitokoto: hitokoto,
    from: from,
  };

  const comboString = JSON.stringify(comboObject); // 转换为 JSON 字符串

  if (uniqueItems[comboString]) {
    console.log(`Removed duplicate hitokoto: ${hitokoto}`); // 打印重复的 'hitokoto' 的值
    // 使用字符串化的对象作为 Set 中的 key
    continue; // 如果存在，则跳过将该项添加到 'result' 数组中
  }

  // 将当前组合存储到结果和唯一组合中
  const item = {
    id: id.toString(),
    hitokoto: hitokoto,
    from: from,
  };

  uniqueItems[comboString] = true; // 使用字符串化的对象作为 Set 中的 key
  result.push(item);
  id++; // 增加计数器
}

// Convert the 'result' array to a formatted JSON string and store it in the 'jsonResult' variable
// const jsonResult = JSON.stringify(result, null, 2);
const jsonResult = JSON.stringify(result);

const sentencesName = 'sentences.json';
// Write the 'jsonResult' string to a new file called 'sentences.json'
fs.writeFileSync(sentencesName, jsonResult);

// Print a message to the console to confirm that the data has been written to the new file
console.log(
  `JSON data written to ${sentencesName} and have ${id - 1} sentences`,
);
