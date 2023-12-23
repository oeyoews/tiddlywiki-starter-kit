import { defaultLength } from './lib/config';
import characters from './lib/characters';

/**
 * Generates a random string of a specified length.
 *
 * @param {number} length 10 - The length of the random string. Defaults to defaultLength.
 * @return {string} The randomly generated string.
 */
const getRandomString = (length = defaultLength) => {
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

export default getRandomString;
