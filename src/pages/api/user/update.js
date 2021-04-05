import { updateUser } from '@lib/firebase/db-admin';
import { updateAuthUser } from '@lib/firebase/auth/server';

export default async function updateUserProfile(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to POST',
      },
    });
  }

  const uid = req.cookies.uid;
  const data = req.body.data;

  await updateAuthUser(uid, data)
    .then(response =>
      updateUser(uid, response)
        .then(() => {
          res.status(200).json({ data });
        })
        .catch(error => {
          return res.status(405).json({
            code: 'firestore/duplicate_property',
            message: error.message,
          });
        })
    )
    .catch(error => {
      console.log(`updateAuthUser error`, error);
      return res.status(401).json({
        code: error.code || 'auth',
        message: error.message,
      });
    });
}
