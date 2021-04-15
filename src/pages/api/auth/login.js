import { auth } from '@lib/firebase/firebase-admin';
import { setSessionCookies } from '@lib/firebase/auth/server';
import { getUser, createUser } from '@lib/db/service/user';
import { normalizeUser } from '@lib/db/models/user';

export default async function login(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to POST',
      },
    });
  }

  const expiresIn = Number(process.env.SESSION_EXP);

  const token = req.body.token;
  const user = normalizeUser(req.body.user);

  await auth.verifyIdToken(token).then(decodedIdToken => {
    if (new Date().getTime() / 1000 - decodedIdToken.auth_time >= 10) {
      res.status(401).json({ data: 'Recent sign in required!' });
    }

    return auth
      .createSessionCookie(token, { expiresIn: expiresIn * 1000 })
      .then(authCookie => {
        const { uid } = decodedIdToken;
        const sessionCookies = setSessionCookies(uid, authCookie);

        return getUser(uid)
          .then(response => {
            res.setHeader('Set-Cookie', sessionCookies);
            res.status(200).json({ data: { user: response.user } });
          })
          .catch(error => {
            if (error.message !== 'User not found') {
              console.error(`login endpoint getUser error:`, error);

              throw error;
            }

            return createUser(user).then(response => {
              res.setHeader('Set-Cookie', sessionCookies);
              res.status(200).json({ data: { user: response.user } });
            });
          });
      })
      .catch(error => {
        console.error(`createSessionCookie error:`, error);
        res.status(401).json({ data: 'Invalid authentication' });
      });
  });
}
