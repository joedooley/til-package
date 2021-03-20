const isLocalhost = process.env.NEXT_PUBLIC_BASE_API_URL.includes('localhost');

/**
 * Creates an HTTP cookie for a Set-Cookie header.
 *
 * @param {String} name Cookie name.
 * @param {String} value Cookie value.
 * @param {Boolean} isHttpOnly HttpOnly option to determ.
 * @param {Number} exp Cookies expiration in seconds for Max-Age option.
 *
 * @returns {String} Cookie string to be used in Set-Cookie header.
 */
export const createCookie = (name, value, isHttpOnly, exp) => {
  const maxAge = exp ?? Number(process.env.SESSION_EXP);
  const secure = !isLocalhost ? 'Secure; ' : '';
  const httpOnly = isHttpOnly ? 'HttpOnly; ' : '';

  return `${name}=${value}; Path=/; Max-Age=${maxAge}; ${secure}${httpOnly}`;
};
