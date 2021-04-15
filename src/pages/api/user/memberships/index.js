import { getUserCollection } from '@lib/db/service/user'

export default async function getHandler(req, res) {
  if (req.method !== 'GET') {
    return res.status(501).json({
      error: {
        code: 'server/bad_request',
        message: 'This endpoint only responds to GET',
      },
    });
  }

  const uid = req.cookies.uid;

  await getUserCollection(uid, 'memberships')
    .then(response => res.status(200).json({ data: response.entries }))
    .catch(error => {
      console.log(`getUserCollection error`, JSON.stringify(error));

      return res.status(405).json({
        code: error.code || 'server/unknown_error',
        message: error.message,
      });
    });
}
