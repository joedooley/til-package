/**
 * Normalize phone number.
 *
 * @param {string} str - User phone number.
 * @returns {string} - E.164 format (e.g. +16505550101).
 */
export const normalizePhone = str => {
  let value = str.replace(/[- )(]/g, '');

  return `+1${value}`;
};

/**
 * Create username from email address.
 *
 * @param {string} str - Email address.
 * @returns {string} - Username.
 */
export const emailToUsername = str => {
  return str.replace(/[.]/g, '').replace('@', '-');
};

/**
 * Create username from phone number.
 *
 * @param {string} str - Phone number.
 * @returns {string} - Username.
 */
export const phoneToUsername = str => {
  return str.replace('+', '');
};

/**
 * Create slug from alphanumeric name.
 *
 * @param {string} str - Alphanumeric name.
 * @returns {string} - Slug.
 */
export const toSlug = str => {
  return str.toLowerCase().replace(/[ ]/g, '-');
};
