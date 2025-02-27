/*\
title: $:/plugins/oeyoews/neotw-reading-time/lib.js
type: application/javascript
module-type: library

\*/

/**
 * 估算阅读时间
 * @param {string} text - 需要阅读的文本
 * @param {number} chineseSpeed - 每分钟中文阅读速度（默认 400 字）
 * @param {number} englishSpeed - 每分钟英文阅读速度（默认 200 词）
 * @returns {string} 预估阅读时间和字数统计（格式："阅读时间: 3 分钟，字数: 1200"）
 */
function estimateReadingTime(text, chineseSpeed = 400, englishSpeed = 200) {
  if (!text) return '阅读时间: 0 分钟，字数: 0';

  // 统计中文字符数量（汉字、标点等）
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;

  // 统计英文单词数量（按空格分隔）
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;

  // 计算总字数
  const totalWords = chineseChars + englishWords;

  // 计算阅读时间（分钟）
  const time = chineseChars / chineseSpeed + englishWords / englishSpeed;

  // 向上取整，至少 1 分钟
  return `阅读时间: ${Math.max(Math.ceil(time), 1)} 分钟，字数: ${totalWords}`;
}

module.exports = estimateReadingTime;
