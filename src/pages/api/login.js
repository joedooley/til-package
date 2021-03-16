import { getFirebaseAdmin } from '@lib/firebase/firebase-admin';
import { setSessionCookie } from '@lib/firebase/auth/server';

export default async function login(req, res) {
  const admin = await getFirebaseAdmin();
  const expiresIn = Number(process.env.SESSION_EXP);

  if (req.method === 'POST') {
    var idToken = req.body.token;

    await admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedIdToken => {
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time >= 10) {
          res.status(401).send('Recent sign in required!');
        }

        return admin
          .auth()
          .createSessionCookie(idToken, { expiresIn: expiresIn * 1000 })
          .then(authCookie => {
            const appSessionCookie = setSessionCookie(req, authCookie);

            res.setHeader('Set-Cookie', appSessionCookie);
            res.status(200).json({ data: 'ok' });
          })
          .catch(error => {
            console.log(`createSessionCookie error:`, error);
            res.status(401).send('Invalid authentication');
          });
      });
  }
}
