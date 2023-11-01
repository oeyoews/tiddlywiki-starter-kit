/*\
title: $:/plugins/oeyoews/book-status/mergeObj.js
type: application/javascript
module-type: library

\*/
// TODO: Object.assign
module.exports = function mergeObjects(target, ...sources) {
  for (const source of sources) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
          // 如果属性值是对象，则递归地合并子对象
          if (!target.hasOwnProperty(key) || typeof target[key] !== 'object') {
            target[key] = {};
          }
          mergeObjects(target[key], source[key]);
        } else {
          // 否则直接复制属性值
          target[key] = source[key];
        }
      }
    }
  }
  return target;
};
