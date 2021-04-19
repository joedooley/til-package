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

/**
 * Get cookie value from document.cookie string.
 *
 * @param {string} key - Cookie name.
 * @returns {string} - Cookie value.
 */
export const getCookieValue = key => {
  const cookies = document.cookie;
  const pieces = cookies
    .split(';')
    .map(cookie => cookie.replace(/[ ]/g, ''))
    .filter(cookie => cookie.includes(`${key}=`))
    .join();

  return pieces.split('=')[1];
};

/**
 * Create search keywords for typeahead components to enable Firestore
 * search by keyword queries.
 *
 * @param {string} value - Keyword
 * @returns {array} - Keyword array
 */
export const createSearchKeywords = value => {
  let prevKey = '';
  const keywords = [];
  const wordArr = value.toLowerCase().replace(/ /g, '').split(' ');

  for (const word of wordArr) {
    const charArr = word.toLowerCase().split('');

    for (const char of charArr) {
      const keyword = prevKey + char;

      keywords.push(keyword);
      prevKey = keyword;
    }

    prevKey = '';
  }

  return keywords;
};
