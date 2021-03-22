import { auth } from '@lib/firebase/firebase-admin';
import { setSessionCookies } from '@lib/firebase/auth/server';
import { getUser } from '@lib/firebase/db-admin';

export default async function login(req, res) {
  if (req.method !== 'POST') {
    res.status(401).json({ data: 'Invalid HTTP method' });
  }

  const expiresIn = Number(process.env.SESSION_EXP);

  if (req.method === 'POST') {
    var idToken = req.body.token;

    await auth.verifyIdToken(idToken).then(decodedIdToken => {
      if (new Date().getTime() / 1000 - decodedIdToken.auth_time >= 10) {
        res.status(401).json({ data: 'Recent sign in required!' });
      }

      return auth
        .createSessionCookie(idToken, { expiresIn: expiresIn * 1000 })
        .then(authCookie => {
          const { uid } = decodedIdToken;
          const sessionCookies = setSessionCookies(uid, authCookie);

          return getUser(uid).then(response => {
            console.log(`login endpoint getUser response:`, response);

            res.setHeader('Set-Cookie', sessionCookies);
            res.status(200).json({ data: { user: response.user } });
          });
        })
        .catch(error => {
          console.error(`createSessionCookie error:`, error);
          res.status(401).json({ data: 'Invalid authentication' });
        });
    });
  }
}
