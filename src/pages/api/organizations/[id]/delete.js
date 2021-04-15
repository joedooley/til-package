import { deleteOrganization } from '@lib/db/service/organization';

export default async function deleteOrgHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to POST',
      },
    });
  }

  if (!req.cookies.uid || !req.cookies.session) {
    return res.status(402).json({
      error: {
        code: 'server/unauthenticated_request',
        message: 'Unauthenticated user',
      },
    });
  }

  const uid = req.cookies.uid;
  const id = req.query.id;

  await deleteOrganization(uid, id)
    .then(response => {
      return res.status(200).json({ data: response });
    })
    .catch(error => {
      return res.status(502).json({
        code: 'firestore/delete_account',
        message: error.message,
      });
    });
}
