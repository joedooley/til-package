/**
 * Formats phone number into E.164 format (e.g. +16505550101).
 *
 * @param {String} str
 * @returns {String}
 */
export const normalizePhone = str => {
  let value = str.replace(/[- )(]/g, '');

  return `+1${value}`;
};
