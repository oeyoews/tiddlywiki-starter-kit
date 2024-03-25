module.exports = {
  arrowParens: 'always', // 在箭头函数参数周围加上括号
  bracketSameLine: false, // 将多行 HTML、JSX、Vue、Angular 元素的 > 放在最后一行的末尾
  bracketSpacing: true, // 在对象字面量的大括号之间打印空格
  embeddedLanguageFormatting: 'auto', // 控制 Prettier 是否格式化嵌入式语言
  endOfLine: 'lf', // 换行符使用 LF
  htmlWhitespaceSensitivity: 'css', // HTML 文件的全局空白符敏感度
  insertPragma: false, // 是否在文件顶部插入 @format 标记
  jsxSingleQuote: false, // 在 JSX 中使用单引号而不是双引号
  printWidth: 80, // 每行的最大字符数
  proseWrap: 'preserve', // 控制 Prettier 是否在 markdown 文件中打包文本
  quoteProps: 'as-needed', // 对象属性是否需要引号
  requirePragma: false, // 是否需要在文件顶部包含特殊注释才能格式化
  semi: true, // 是否在语句末尾打印分号
  singleAttributePerLine: false, // 强制 HTML、Vue 和 JSX 中的单个属性占据一行
  singleQuote: true, // 是否使用单引号而不是双引号
  tabWidth: 2, // 每个缩进级别的空格数
  // trailingComma: "none", // 在多行结构末尾打印逗号
  useTabs: false // 是否使用制表符进行缩进
};
