import { deleteUser } from '@lib/firebase/db-admin';
import { deleteAuthUser, setSessionCookies } from '@lib/firebase/auth/server';

export default async function deleteAccount(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to POST',
      },
    });
  }

  const uid = req.body.uid;

  if (!req.cookies.uid || !req.cookies.session) {
    return res.status(402).json({
      error: {
        code: 'server/unauthenticated_request',
        message: 'Unauthenticated user',
      },
    });
  }

  if (req.cookies.uid !== uid) {
    return res.status(401).json({
      error: {
        code: 'server/unauthenticated_request',
        message: 'Users must be logged in to delete their account',
      },
    });
  }

  await deleteUser(uid)
    .then(() => deleteAuthUser(uid))
    .then(() => {
      res.setHeader('Set-Cookie', setSessionCookies('', '', 0));
      return res.status(200).json({ data: 'success' });
    })
    .catch(error => {
      return res.status(502).json({
        code: 'firestore/delete_account',
        message: error.message,
      });
    });
}
