const fs = require('fs');

// 读取style.min.css文件
const cssText = fs.readFileSync('styles.min.css', 'utf-8');

// 匹配所有的类名
// TODO
// const classNames = cssText.match(/\.[\w-]+/g);
// const classNames = cssText.match(/\.[a-z]+(?:-[a-z\d]+)*(?::[a-z-]+)?/g);
const classNames = cssText.match(
  // /\.[a-z]+(?:-[a-z\d]+)*(?::[a-z-]+(?:\([^\)]+\)))?(?=:[a-z-]+)?/g,
  /(?<=\.)[a-z]+(?:-[a-z\d]+)*(?::[a-z-]+(?:\([^\)]+\)))?(?=:[a-z-]+)?/g, //weired sometime not useful
  // /\.[a-z]+(?:-[a-z\d]+)*(?::[a-z-]+(?:\([^\)]+\)))?(?=:[a-z-]+)?|\b[a-z]+(?:-[a-z\d]+)*(?::[a-z-]+(?:\([^\)]+\)))?(?=:[a-z-]+)?/g,
);
/* const classNames = cssText.match(
  /\.[a-z]+(?:-[a-z\d]+)*(?::[a-z-]+(?:\([^\)]+\)))?/g,
); */

// 去重并排序
const uniqueClassNames = [...new Set(classNames)].sort();

// 去除伪类（如:hover）和点，并去除数字开头的类名
const filteredClassNames = uniqueClassNames
  .map(name => name.split(':')[0].replace('.', ''))
  .filter(name => isNaN(name[0]));

// 每个表格不超过10行
const tableRows = [];
for (let i = 0; i < filteredClassNames.length; i += 20) {
  tableRows.push(filteredClassNames.slice(i, i + 20));
}

// 生成example HTML代码
function generateExampleHtml(className) {
  return `<div class="${className}">${className}</div>`;
}

// 写入表格到markdown文件
fs.writeFileSync(
  'documentation.txt',
  tableRows
    .map(
      rows => `
| Class Name | Example |
| --- | --- |
${rows.map(name => `| ${name} | ${generateExampleHtml(name)} |`).join('\n')}
`,
    )
    .join('\n'),
);

// 计算总类数并写入markdown文件
const totalClasses = filteredClassNames.length;
console.log(`Total classes is ${totalClasses}`);
fs.appendFileSync(
  'documentation.txt',
  `\n Total classes: <span class="font-bold">${totalClasses}</span>`,
);
