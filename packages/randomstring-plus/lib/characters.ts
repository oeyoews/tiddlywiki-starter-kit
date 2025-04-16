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

export default characters;
