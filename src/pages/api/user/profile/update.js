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

  console.log(`req.body`, req.body);

  const uid = req.cookies.uid;
  const data = req.body.data;

  await updateAuthUser(uid, data)
    .then(response => {
      return updateUser(uid, response)
        .then(() => {
          res.status(200).json({ data });
        })
        .catch(error => {
          console.log(`updateUser error`, error);
          return res.status(401).json(error);
        });
    })
    .catch(error => {
      console.log(`updateAuthUser error`, error);
      res.status(401).json(error);
    });
}
