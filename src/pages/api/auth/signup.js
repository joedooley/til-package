import { auth } from '@lib/firebase/firebase-admin';
import { setSessionCookies } from '@lib/firebase/auth/server';
import { createUser } from '@lib/db/service/user';
import { normalizeUser } from '@lib/db/models/user';

export default async function signup(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to POST',
      },
    });
  }

  const expiresIn = Number(process.env.SESSION_EXP);

  const user = normalizeUser(req.body.user);
  const token = req.body.token;

  await auth.verifyIdToken(token).then(decodedIdToken => {
    if (new Date().getTime() / 1000 - decodedIdToken.auth_time >= 10) {
      return res.status(401).json({ data: 'Recent sign in required!' });
    }

    return auth
      .createSessionCookie(token, { expiresIn: expiresIn * 1000 })
      .then(authCookie => {
        const { uid } = decodedIdToken;
        const sessionCookies = setSessionCookies(uid, authCookie);

        return createUser(user).then(response => {
          res.setHeader('Set-Cookie', sessionCookies);
          return res.status(200).json({ data: { user: response.user } });
        });
      })
      .catch(error => {
        console.error(`createSessionCookie error:`, error);
        return res.status(401).json({ data: 'Invalid authentication' });
      });
  });
}
