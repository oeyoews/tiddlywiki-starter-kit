/*\
title: $:/plugins/oeyoews/neotw-info/info.js
type: application/javascript
module-type: library

\*/

const getdata = require('./data.js');
module.exports = () => {
  const createElement = $tw.utils.domMaker;
  const baseURL = 'https://img.shields.io/badge';

  const createImg = (msg, text, logo = '') => {
    return createElement('img', {
      class: 'rounded-none',
      attributes: {
        src: logo
          ? `${baseURL}/${msg}-${text}-green?style=social&logo=${logo}`
          : `${baseURL}/${msg}-${text}-green?style=social`,
      },
    });
  };

  const children = [];
  const data = getdata();
  data.forEach(({ msg, text, logo }) => {
    children.push(createImg(msg, text, logo));
  });

  return createElement('div', {
    class: 'space-x-2',
    children,
  });
};
