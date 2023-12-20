const crypto = require('crypto');

/**
 * Generates a string representing all alphanumeric characters.
 *
 * This string contains all uppercase and lowercase English letters (A-Z, a-z)
 * and digits (0-9). Characters are generated using their char codes and
 * concatenated into a single string.
 *
 * @returns {string} A string of all alphanumeric characters.
 */
const characters = Array.from({ length: 75 }, (_, i) =>
  String.fromCharCode(i + 48),
)
  .filter((c) => /[A-Za-z0-9]/.test(c))
  .join('');

const defaultLength = 10;

/**
 * Generates a random string of a specified length.
 *
 * @param {number} length - The length of the random string. Defaults to defaultLength.
 * @return {string} The randomly generated string.
 */
const generateRandomString = (length = defaultLength) => {
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

/**
 * Generates a random string of the specified length using the crypto.getRandomValues() method.
 *
 * @param {number} length - The length of the random string to generate. Default value is `defaultLength`.
 * @return {string} - The randomly generated string.
 */
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
