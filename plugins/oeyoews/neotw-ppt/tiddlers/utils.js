/*\
title: $:/plugins/oeyoews/neotw-ppt/utils.js
type: application/javascript
module-type: library

Common utils for this plugin

\*/

exports.isNumeric = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

exports.isBooleanTrue = function (value) {
  return value === 'true';
};

exports.isBooleanFalse = function (value) {
  return value === 'false';
};

exports.isEmpty = function (value) {
  return value === '';
};

exports.convertDataValue = function (value) {
  if (exports.isEmpty(value)) {
    return null;
  }
  if (exports.isBooleanFalse(value)) {
    return null;
  }
  if (exports.isBooleanTrue(value)) {
    return true;
  }
  if (exports.isNumeric(value)) {
    return Number(value);
  }
  return value;
};

exports.assignDataset = function (dataset, attributes) {
  $tw.utils.each(attributes, function (value, attr) {
    if (!attr.startsWith('$') && !attr.startsWith('data-')) {
      let convertedValue = exports.convertDataValue(value);
      if (convertedValue !== null) {
        dataset[attr] = convertedValue;
      }
    }
  });
  return dataset;
};
