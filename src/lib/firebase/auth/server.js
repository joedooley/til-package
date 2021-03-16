import { serialize } from 'cookie';
import { getFirebaseAdmin } from '@lib/firebase/firebase-admin';

const isLocalhost = req => req.headers.host.includes('localhost');

export const setSessionCookie = (req, value, exp) => {
  const secure = !isLocalhost(req);
  const maxAge = exp ?? Number(process.env.SESSION_EXP);

  return serialize('session', value, { httpOnly: true, secure, path: '/', maxAge });
};

export const clearSessionCookie = req => {
  const secure = !isLocalhost(req);

  return serialize('session', '', { httpOnly: true, secure, path: '/', maxAge: 0 });
};

export const validateCookie = async function (cookie) {
  const admin = await getFirebaseAdmin();
  const nullResponse = { uid: '' };

  if (!cookie) return nullResponse;

  return admin
    .auth()
    .verifySessionCookie(cookie, true)
    .then(decodedClaims => ({ uid: decodedClaims.uid }))
    .catch(error => {
      console.log(`Unable to validate the session cookie:`, JSON.stringify(error));

      return nullResponse;
    });
};
