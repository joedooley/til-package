import { getCollection } from '@lib/firebase/db-admin';

export default async function getHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to POST',
      },
    });
  }

  const data = req.body.data;
  const user = req.body.user;

  await getCollection(data, user)
    .then(response => {
      console.log(`getCollection response`, JSON.stringify(response));

      return res.status(200).json({ data });
    })
    .catch(error => {
      console.log(`getCollection error`, JSON.stringify(error));

      return res.status(405).json({
        code: error.code || 'server/unknown_error',
        message: error.message,
      });
    });
}
