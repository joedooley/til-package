import { overSome } from 'lodash';
import { createCookie } from '@util/cookies';
import { auth } from '@lib/firebase/firebase-admin';
import { sendEmail } from '@lib/email';

/**
 * Creates function that checks for the following properties.
 */
const includesAuthProps = overSome([
  'email',
  'phoneNumber',
  'displayName',
  'photoURL',
  'emailVerified',
  'disabled',
  'password',
]);

/**
 * Creates `uid` and `session` HTTP cookies for a Set-Cookie header.
 *
 * @param {string} uid User ID.
 * @param {string} session Firebase session cookie.
 * @param {number} exp Http Max-Age value.
 *
 * @returns {Array} Cookie array.
 */
export const setSessionCookies = (uid, session, exp) => {
  const cookies = [];
  const uidCookie = createCookie('uid', uid, false, exp);
  const sessionCookie = createCookie('session', session, true, exp);

  cookies.push(uidCookie, sessionCookie);

  return cookies;
};

/**
 * Validates session cookie with Firebase api method.
 *
 * @param {string} cookie - Session cookie.
 *
 * @return {string} - User ID.
 */
export const validateCookie = async function (cookie) {
  if (!cookie) {
    throw new Error('Missing session cookie.');
  }

  return auth.verifySessionCookie(cookie, true).then(decodedClaims => ({ uid: decodedClaims.uid }));
};

export const updateAuthUser = async (uid, data) => {
  if (!includesAuthProps(data)) {
    return Promise.resolve(data);
  }

  return auth.updateUser(uid, data).then(() => Promise.resolve(data));
};
