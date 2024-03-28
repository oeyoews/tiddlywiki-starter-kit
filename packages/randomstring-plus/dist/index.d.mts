/**
 * Generates a random string of a specified length.
 *
 * @param {number} length 10 - The length of the random string. Defaults to defaultLength.
 * @return {string} The randomly generated string.
 */
declare const getRandomString: (length?: number) => string;
/**
 * Generates a random lowercase string of the specified length.
 *
 * @param {number} length maxLength=11 - The length of the string to generate. Defaults to the value of `defaultLength`.
 * @return {string} - The randomly generated lowercase string.
 */
declare const getRandomLowercaseString: (length?: number) => string;

export { getRandomLowercaseString, getRandomString };
