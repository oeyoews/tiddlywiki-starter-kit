const fs = require('fs');

// 读取CSV文件的内容
let csv_data = fs.readFileSync('voc.csv', 'utf-8');
const lastChar = csv_data.slice(-1);

// 如果最后一个字符是换行符，则将其从CSV数据中删除
if (lastChar === '\n') {
  csv_data = csv_data.slice(0, -1);
}

// 去掉CSV文件中的回车符
const cleaned_csv_data = csv_data.replace(/\r/g, '');

// 翻译表头
const headerTranslationTable = {
  '#': 'id',
  单词: 'word',
  读音: 'pronunciation',
  释义: 'definition',
  '例句/翻译': 'example',
  添加时间: 'add_time',
};

// 将CSV文件中的每一行转换为一个对象，并存储在数组中
// or sub one
const lines = cleaned_csv_data.split('\n');
const headers = lines[0]
  .split(',')
  .map(header => headerTranslationTable[header]);

const result = lines
  .slice(1)
  .map(line => {
    const values = line.split(',');
    // 忽略id为空的行
    // if (!values[0]) return null;

    // 对最后一个值进行处理，确保反斜杠不会被JSON解析器识别为转义字符
    const last_value = values[values.length - 1].replace(/\\/g, '\\\\');

    return headers.reduce((obj, header, i) => {
      obj[header] = i === values.length - 1 ? last_value : values[i];
      return obj;
    }, {});
  })
  .filter(line => line !== null);

// 输出JSON格式的结果
console.log(JSON.stringify(result, null, 2));

// 将结果写入文件
fs.writeFileSync('voc.json', JSON.stringify(result, null, 2), 'utf-8');
