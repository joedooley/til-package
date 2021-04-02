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

export const validateEmail = email => {
  const actionCodeSettings = {
    url: 'http://localhost:4002/dashboard/account',
    handleCodeInApp: false,
  };

  return auth
    .generateEmailVerificationLink(email, actionCodeSettings)
    .then(response => {
      const subject = 'Verify your email address';
      const message = `Paste the url at the bottom of the email into a web browser to verify your email address.\n\n${response}`;
      const html = `<a href=${response}>Click here</a> to verify your email address.`;

      console.log('validateEmail response', response);

      return sendEmail(email, subject, message, html);
    })
    .catch(error => {
      console.error('validateEmail error', error);
    });
};

export const updateAuthUser = async (uid, data) => {
  if (!includesAuthProps(data)) {
    return Promise.resolve(data);
  }

  await validateEmail('joe@developingdesigns.com')
    .then(response => {
      console.log('validateEmail response', response);
    })
    .catch(error => {
      console.error('validateEmail error', error);
    });

  return auth.updateUser(uid, data).then(() => Promise.resolve(data));
};
