/*\
title: $:/plugins/oeyoews/neotw-tiddlers-view/RandomPicker.js
type: application/javascript
module-type: library

\*/
class RandomIndexPicker {
  constructor(length) {
    this.length = length;
    this.indexes = this.shuffle(Array.from({ length }, (_, i) => i)); // 生成随机索引数组
    this.current = 0;
  }

  // Fisher-Yates 洗牌算法
  shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换位置
    }
    return arr;
  };

  getRandomIndex = () => {
    if (this.current >= this.length) {
      this.indexes = this.shuffle([...this.indexes]); // 重新洗牌
      this.current = 0;
    }
    return this.indexes[this.current++];
  };
}

module.exports = RandomIndexPicker;
