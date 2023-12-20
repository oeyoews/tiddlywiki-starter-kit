// node 自带
const crypto = require('crypto');

const characters = Array.from({ length: 62 }, (_, i) =>
  i < 26
    ? String.fromCharCode(i + 65)
    : i < 52
      ? String.fromCharCode(i + 71)
      : String.fromCharCode(i - 4),
).join('');

const defaultLength = 10;

const generateRandomString = (length = defaultLength) => {
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

const generateRandomStringBrowser = (length = defaultLength) => {
  const charactersLength = characters.length;
  const randomValues = new Uint8Array(length);

  crypto.getRandomValues(randomValues);

  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += characters[randomValues[i] % charactersLength];
  }
  return randomString;
};

module.exports = {
  generateRandomString,
  generateRandomStringBrowser,
};
