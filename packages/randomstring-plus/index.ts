import { defaultLength } from './lib/config';
import characters from './lib/characters';

/**
 * Generates a random string of a specified length.
 *
 * @param {number} length 10 - The length of the random string. Defaults to defaultLength.
 * @return {string} The randomly generated string.
 */
export const getRandomString = (length = defaultLength) => {
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

// export const getRandomStringLower = (length = defaultLength) =>
//   getRandomString(length).toLowerCase();

/**
 * Generates a random lowercase string of the specified length.
 *
 * @param {number} length maxLength=11 - The length of the string to generate. Defaults to the value of `defaultLength`.
 * @return {string} - The randomly generated lowercase string.
 */
export const getRandomLowercaseString = (length = defaultLength) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};
