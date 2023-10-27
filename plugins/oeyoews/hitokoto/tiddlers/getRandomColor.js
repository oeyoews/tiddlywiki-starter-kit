/*\
title: $:/plugins/oeyoews/hitokoto/getRandomColor.js
type: application/javascript
module-type: library

\*/

/**
 * Returns a random color from the given array of colors.
 *
 * @param {Array} colors - An array of colors.
 * @return {string} - A randomly selected color.
 */
module.exports = () => {
  const colors = [
    // 'slate',
    // 'gray',
    // 'zinc',
    // 'neutral',
    // 'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
